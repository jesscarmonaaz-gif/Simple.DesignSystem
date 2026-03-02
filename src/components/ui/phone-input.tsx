import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ── Country data ── */
export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dial: string; // e.g. "+1"
}

const countries: Country[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "VE", name: "Venezuela", dial: "+58" },
  { code: "CR", name: "Costa Rica", dial: "+506" },
  { code: "PA", name: "Panama", dial: "+507" },
  { code: "DO", name: "Dominican Republic", dial: "+1" },
  { code: "GT", name: "Guatemala", dial: "+502" },
  { code: "PR", name: "Puerto Rico", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "UA", name: "Ukraine", dial: "+380" },
];

/** Convert ISO country code to flag emoji */
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

/* ── Component ── */
export interface PhoneInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "type"> {
  label?: string;
  helperText?: string;
  state?: "default" | "error" | "success";
  defaultCountry?: string;
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (country: Country) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      label,
      helperText,
      state = "default",
      defaultCountry = "US",
      value,
      onChange,
      onCountryChange,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      () =>
        countries.find((c) => c.code === defaultCountry) ?? countries[0],
    );
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);

    const filtered = React.useMemo(() => {
      if (!search) return countries;
      const q = search.toLowerCase();
      return countries.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.dial.includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }, [search]);

    /* Close dropdown on outside click */
    React.useEffect(() => {
      if (!open) return;
      function handleClick(e: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    /* Focus search when dropdown opens */
    React.useEffect(() => {
      if (open) {
        // Reset highlighted index and search
        setHighlightedIndex(0);
        setSearch("");
        setTimeout(() => searchRef.current?.focus(), 0);
      }
    }, [open]);

    /* Reset highlight when filtered list changes */
    React.useEffect(() => {
      setHighlightedIndex(0);
    }, [filtered.length]);

    /* Scroll highlighted item into view */
    React.useEffect(() => {
      if (!open || !listRef.current) return;
      const items = listRef.current.querySelectorAll("[data-country-item]");
      const item = items[highlightedIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }, [highlightedIndex, open]);

    function selectCountry(country: Country) {
      setSelectedCountry(country);
      onCountryChange?.(country);
      setOpen(false);
    }

    function handleSearchKeyDown(e: React.KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[highlightedIndex]) {
          selectCountry(filtered[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label htmlFor={inputId} className="font-semibold">
            {label}
            {props.required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}

        {/* Input row */}
        <div className="relative flex" ref={dropdownRef}>
          {/* Country selector trigger */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "flex h-10 shrink-0 items-center gap-1 rounded-l-md border border-r-0 bg-white px-2.5 text-sm transition-colors",
              "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
              state === "error" && "border-destructive",
              state === "success" && "border-success",
              state === "default" && "border-input",
            )}
            aria-label="Select country code"
            aria-expanded={open}
          >
            <span className="text-base leading-none">
              {countryFlag(selectedCountry.code)}
            </span>
            <span className="text-foreground font-medium">
              {selectedCountry.dial}
            </span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
            />
          </button>

          {/* Phone number input */}
          <input
            type="tel"
            id={inputId}
            ref={ref}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              "flex h-10 w-full rounded-r-md border bg-white px-3 py-2 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              state === "error" &&
                "border-destructive focus-visible:border-destructive",
              state === "success" &&
                "border-success focus-visible:border-success",
              state === "default" &&
                "border-input focus-visible:border-ring",
              className,
            )}
            {...props}
          />

          {/* Country dropdown */}
          {open && (
            <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-md border border-border bg-white shadow-lg animate-in fade-in-0 zoom-in-95">
              {/* Search */}
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="h-8 w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              {/* List */}
              <div
                ref={listRef}
                className="max-h-56 overflow-y-auto py-1"
                role="listbox"
              >
                {filtered.length === 0 && (
                  <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                    No country found.
                  </p>
                )}
                {filtered.map((country, i) => (
                  <button
                    key={country.code}
                    type="button"
                    data-country-item
                    role="option"
                    aria-selected={
                      country.code === selectedCountry.code
                    }
                    onClick={() => selectCountry(country)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                      i === highlightedIndex && "bg-accent",
                      country.code === selectedCountry.code &&
                        "font-medium text-primary",
                    )}
                  >
                    <span className="text-base leading-none">
                      {countryFlag(country.code)}
                    </span>
                    <span className="flex-1 text-left">
                      {country.name}
                    </span>
                    <span className="text-muted-foreground">
                      {country.dial}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            className={cn(
              "text-sm",
              state === "error" && "text-destructive",
              state === "success" && "text-success",
              state === "default" && "text-muted-foreground",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput, countries, countryFlag };
