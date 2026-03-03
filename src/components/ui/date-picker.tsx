import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ── Calendar helpers ── */

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns a 42-cell grid (6 rows × 7 cols) for the given month. */
function buildGrid(year: number, month: number): Date[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const grid: Date[] = [];

  // Trailing days from previous month
  for (let i = firstWeekday - 1; i >= 0; i--) {
    grid.push(new Date(year, month - 1, prevMonthDays - i));
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push(new Date(year, month, d));
  }
  // Leading days from next month
  const trailing = 42 - grid.length;
  for (let d = 1; d <= trailing; d++) {
    grid.push(new Date(year, month + 1, d));
  }

  return grid;
}

/* ── Types ── */

export interface DatePickerProps {
  /** Label displayed above the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Visual state */
  state?: "default" | "error" | "success";
  /** Controlled selected date */
  value?: Date;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date;
  /** Called when a date is selected */
  onChange?: (date: Date) => void;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

/* ── Component ── */

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      helperText,
      state = "default",
      value,
      defaultValue,
      onChange,
      placeholder = "Select a date",
      minDate,
      maxDate,
      disabled,
      required,
      id,
      className,
    },
    ref,
  ) => {
    const inputId = id || React.useId();
    const today = new Date();

    /* ── Value (controlled / uncontrolled) ── */
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(
      defaultValue,
    );
    const isControlled = value !== undefined;
    const selectedDate = isControlled ? value : internalValue;

    /* ── Popover ── */
    const [open, setOpen] = React.useState(false);

    /* ── Calendar view state ── */
    const [viewYear, setViewYear] = React.useState(
      selectedDate?.getFullYear() ?? today.getFullYear(),
    );
    const [viewMonth, setViewMonth] = React.useState(
      selectedDate?.getMonth() ?? today.getMonth(),
    );

    /* Sync view to value when controlled value changes externally */
    React.useEffect(() => {
      if (value) {
        setViewYear(value.getFullYear());
        setViewMonth(value.getMonth());
      }
    }, [value]);

    /* Reset view to selected (or today) when popover opens */
    const handleOpenChange = (next: boolean) => {
      if (next) {
        const base = selectedDate ?? today;
        setViewYear(base.getFullYear());
        setViewMonth(base.getMonth());
      }
      setOpen(next);
    };

    /* ── Navigation ── */
    const prevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const nextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    /* ── Day selection ── */
    const handleSelect = (day: Date) => {
      if (!isControlled) setInternalValue(day);
      onChange?.(day);
      setOpen(false);
    };

    const isDayDisabled = (day: Date) => {
      if (minDate) {
        const min = new Date(minDate);
        min.setHours(0, 0, 0, 0);
        if (day < min) return true;
      }
      if (maxDate) {
        const max = new Date(maxDate);
        max.setHours(23, 59, 59, 999);
        if (day > max) return true;
      }
      return false;
    };

    const grid = buildGrid(viewYear, viewMonth);

    /* ── Trigger border styles ── */
    const triggerBorderClass = cn(
      state === "error" && "border-destructive focus-visible:border-destructive",
      state === "success" && "border-success focus-visible:border-success",
      state === "default" && "border-input focus-visible:border-ring",
    );

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <Label htmlFor={inputId} className="font-semibold">
            {label}
            {required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}

        <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
          {/* Trigger — styled as a text input */}
          <PopoverPrimitive.Trigger asChild>
            <button
              ref={ref}
              id={inputId}
              type="button"
              disabled={disabled}
              className={cn(
                "flex h-10 w-full items-center rounded-md border bg-white px-3 py-2 text-sm transition-colors",
                "focus-visible:outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                triggerBorderClass,
                className,
              )}
            >
              <span
                className={cn(
                  "flex-1 text-left truncate",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                {selectedDate ? formatDate(selectedDate) : placeholder}
              </span>
              <CalendarBlank className="h-4 w-4 shrink-0 text-muted-foreground ml-2" />
            </button>
          </PopoverPrimitive.Trigger>

          {/* Calendar popover */}
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={4}
              className="z-50 w-72 rounded-md border border-border bg-white p-3 shadow-lg animate-in fade-in-0 zoom-in-95"
            >
              {/* Month / year navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <CaretLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold select-none">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <CaretRight className="h-4 w-4" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground select-none"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {grid.map((day, i) => {
                  const isCurrentMonth = day.getMonth() === viewMonth;
                  const isSelected = selectedDate
                    ? isSameDay(day, selectedDate)
                    : false;
                  const isToday = isSameDay(day, today);
                  const dayDisabled = isDayDisabled(day);

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={dayDisabled}
                      onClick={() => !dayDisabled && handleSelect(day)}
                      className={cn(
                        "flex h-8 w-full items-center justify-center rounded-md text-sm transition-colors select-none",
                        // Days outside current month
                        !isCurrentMonth && "text-muted-foreground/35",
                        // Normal hoverable day
                        isCurrentMonth &&
                          !isSelected &&
                          !dayDisabled &&
                          "hover:bg-accent",
                        // Today indicator
                        isToday &&
                          !isSelected &&
                          "font-semibold ring-1 ring-inset ring-primary/50",
                        // Selected
                        isSelected && "bg-primary text-white font-semibold",
                        // Disabled
                        dayDisabled && "cursor-not-allowed opacity-30",
                      )}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

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
DatePicker.displayName = "DatePicker";

export { DatePicker };
