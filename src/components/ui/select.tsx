import * as React from "react";
import { CaretDown, MagnifyingGlass, X, Check } from "@phosphor-icons/react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ── Types ── */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Available options */
  options: SelectOption[];
  /** Enable multi-select (default: false) */
  multiple?: boolean;
  /** Enable search/filter within the dropdown (default: false) */
  searchable?: boolean;
  /** Show an X button to clear the current selection (default: false) */
  clearable?: boolean;
  /** Current value — string for single, string[] for multi (controlled) */
  value?: string | string[];
  /** Called when the value changes */
  onChange?: (value: string | string[]) => void;
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Label text above the select */
  label?: string;
  /** Helper text below the select */
  helperText?: string;
  /** Visual state */
  state?: "default" | "error";
  /** Mark as required (adds red asterisk) */
  required?: boolean;
  /** Disable the select */
  disabled?: boolean;
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Placeholder for the search input (default: "Search...") */
  searchPlaceholder?: string;
  /** Text shown when no options match the search (default: "No results found.") */
  noResultsText?: string;
  /** HTML id for the trigger element */
  id?: string;
  /** Additional className on the outer wrapper */
  className?: string;
}

/* ── Ref merge helper ── */
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref)
        (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

/* ── Component ── */
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      multiple = false,
      searchable = false,
      clearable = false,
      value,
      onChange,
      defaultValue,
      label,
      helperText,
      state = "default",
      required = false,
      disabled = false,
      placeholder,
      searchPlaceholder = "Search...",
      noResultsText = "No results found.",
      id,
      className,
    },
    ref,
  ) => {
    const triggerId = id || React.useId();
    const listboxId = React.useId();

    /* ── Refs ── */
    const containerRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    /* ── State ── */
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);

    // Internal value for uncontrolled mode
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      () => defaultValue ?? (multiple ? [] : ""),
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Normalise to array for unified logic
    const selectedValues: string[] = Array.isArray(currentValue)
      ? currentValue
      : currentValue
        ? [currentValue]
        : [];

    /* ── Filtered options ── */
    const filtered = React.useMemo(() => {
      if (!search) return options;
      const q = search.toLowerCase();
      return options.filter(
        (o) =>
          o.label.toLowerCase().includes(q) ||
          o.value.toLowerCase().includes(q),
      );
    }, [search, options]);

    /* ── Close on outside click ── */
    React.useEffect(() => {
      if (!open) return;
      function handleClick(e: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    /* ── Focus search on open ── */
    React.useEffect(() => {
      if (open) {
        setHighlightedIndex(0);
        setSearch("");
        if (searchable) {
          setTimeout(() => searchRef.current?.focus(), 0);
        }
      }
    }, [open, searchable]);

    /* ── Reset highlight on filter change ── */
    React.useEffect(() => {
      setHighlightedIndex(0);
    }, [filtered.length]);

    /* ── Scroll highlighted item into view ── */
    React.useEffect(() => {
      if (!open || !listRef.current) return;
      const items = listRef.current.querySelectorAll("[data-select-item]");
      const item = items[highlightedIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }, [highlightedIndex, open]);

    /* ── Handlers ── */
    function toggleOption(optionValue: string) {
      if (multiple) {
        const next = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      } else {
        if (!isControlled) setInternalValue(optionValue);
        onChange?.(optionValue);
        setOpen(false);
      }
    }

    function handleClear(e: React.MouseEvent) {
      e.stopPropagation();
      const empty = multiple ? [] : "";
      if (!isControlled) setInternalValue(empty);
      onChange?.(empty);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        setHighlightedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        if (filtered[highlightedIndex] && !filtered[highlightedIndex].disabled) {
          toggleOption(filtered[highlightedIndex].value);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    /* ── Render ── */
    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <Label htmlFor={triggerId} className="font-semibold">
            {label}
            {required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}

        {/* Trigger + dropdown container */}
        <div className="relative" ref={containerRef}>
          {/* Trigger button */}
          <button
            ref={mergeRefs(ref, triggerRef)}
            type="button"
            id={triggerId}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            disabled={disabled}
            onClick={() => !disabled && setOpen((o) => !o)}
            onKeyDown={!open || !searchable ? handleKeyDown : undefined}
            className={cn(
              "flex w-full items-center rounded-md border bg-white px-3 py-2 text-base transition-colors md:text-sm",
              "focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              multiple ? "min-h-10" : "h-10",
              state === "error" &&
                "border-destructive focus-visible:border-destructive",
              state !== "error" &&
                "border-input focus-visible:border-ring",
            )}
          >
            {/* Selected value display */}
            <span className="flex flex-1 items-center gap-1 overflow-hidden">
              {multiple && selectedValues.length > 0 ? (
                /* Multi-select chips */
                <span className="flex flex-wrap items-center gap-1 py-0.5">
                  {selectedValues.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    return (
                      <span
                        key={val}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {opt?.label ?? val}
                        {!disabled && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleOption(val);
                            }}
                            className="flex items-center text-primary/60 hover:text-primary"
                            aria-label={`Remove ${opt?.label ?? val}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    );
                  })}
                </span>
              ) : !multiple && selectedValues.length > 0 ? (
                /* Single-select display */
                <span className="truncate text-foreground">
                  {options.find((o) => o.value === selectedValues[0])?.label ??
                    selectedValues[0]}
                </span>
              ) : (
                /* Placeholder */
                <span className="truncate text-muted-foreground">
                  {placeholder ?? "Select..."}
                </span>
              )}
            </span>

            {/* Right-side icons */}
            <span className="flex shrink-0 items-center gap-1 ml-2">
              {clearable && selectedValues.length > 0 && !disabled && (
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={handleClear}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </span>
              )}
              <CaretDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
              />
            </span>
          </button>

          {/* Dropdown panel */}
          {open && (
            <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
              {/* Search input */}
              {searchable && (
                <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                  <MagnifyingGlass className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-8 w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
              )}

              {/* Options list */}
              <div
                ref={listRef}
                className="max-h-56 overflow-y-auto py-1"
                role="listbox"
                id={listboxId}
                aria-multiselectable={multiple || undefined}
              >
                {filtered.length === 0 && (
                  <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                    {noResultsText}
                  </p>
                )}
                {filtered.map((option, i) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled || undefined}
                      data-select-item
                      disabled={option.disabled}
                      onClick={() =>
                        !option.disabled && toggleOption(option.value)
                      }
                      onMouseEnter={() => setHighlightedIndex(i)}
                      className={cn(
                        "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                        i === highlightedIndex && "bg-accent",
                        isSelected && "font-medium text-primary",
                        option.disabled &&
                          "cursor-not-allowed opacity-50",
                      )}
                    >
                      {/* Checkbox indicator (multi) or Radio indicator (single) */}
                      {multiple ? (
                        <CheckboxPrimitive.Root
                          checked={isSelected}
                          tabIndex={-1}
                          aria-hidden
                          className={cn(
                            "pointer-events-none h-4 w-4 shrink-0 rounded border transition-colors",
                            isSelected
                              ? "border-success bg-success"
                              : "border-border bg-white",
                          )}
                        >
                          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </CheckboxPrimitive.Indicator>
                        </CheckboxPrimitive.Root>
                      ) : (
                        <div
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                            isSelected ? "border-success" : "border-border",
                          )}
                        >
                          {isSelected && (
                            <div className="h-2 w-2 rounded-full bg-success" />
                          )}
                        </div>
                      )}
                      <span className="flex-1 text-left">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            className={cn(
              "text-sm",
              state === "error" ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
