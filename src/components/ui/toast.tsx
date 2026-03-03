import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  X,
  CheckCircle,
  WarningCircle,
  XCircle,
  Info,
} from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Types ── */

export type ToastVariant = "default" | "success" | "warning" | "destructive" | "info";

export interface ToastConfig {
  /** Main heading */
  title?: string;
  /** Supporting text below the title */
  description?: string;
  /** Visual style */
  variant?: ToastVariant;
  /** Inline action link */
  action?: { label: string; onClick: () => void };
  /** Auto-dismiss duration in ms (default: 5000) */
  duration?: number;
}

type ToastState = ToastConfig & { id: string; open: boolean };

/* ── Module-level store ─────────────────────────────────────────────────────
   Allows `toast()` to be called from anywhere without needing a context.
   ── */

let _listeners: Array<(toasts: ToastState[]) => void> = [];
let _memory: ToastState[] = [];

function _dispatch(next: ToastState[]) {
  _memory = next;
  _listeners.forEach((l) => l(_memory));
}

/** Trigger a toast from anywhere in your app. Returns the toast id. */
export function toast(config: ToastConfig): string {
  const id = Math.random().toString(36).slice(2, 9);
  _dispatch([..._memory, { ...config, id, open: true }]);
  return id;
}

/** Programmatically dismiss a toast by id. */
export function dismissToast(id: string) {
  _dispatch(_memory.map((t) => (t.id === id ? { ...t, open: false } : t)));
  setTimeout(() => _dispatch(_memory.filter((t) => t.id !== id)), 400);
}

/* ── Internal hook (used by <Toaster />) ── */

function useToastStore() {
  const [toasts, setToasts] = React.useState<ToastState[]>(_memory);

  React.useEffect(() => {
    _listeners.push(setToasts);
    return () => {
      _listeners = _listeners.filter((l) => l !== setToasts);
    };
  }, []);

  const dismiss = (id: string) => {
    _dispatch(_memory.map((t) => (t.id === id ? { ...t, open: false } : t)));
    setTimeout(() => _dispatch(_memory.filter((t) => t.id !== id)), 400);
  };

  return { toasts, dismiss };
}

/* ── Variants ── */

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-md border p-4 pl-5 pr-8 shadow-lg transition-all duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=open]:fade-in-80 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-80",
  {
    variants: {
      variant: {
        default:     "border-primary/25     bg-primary/[0.08]    text-foreground",
        success:     "border-success/25     bg-success/[0.08]    text-foreground",
        warning:     "border-warning/25     bg-warning/[0.08]    text-foreground",
        destructive: "border-destructive/25 bg-destructive/[0.08] text-foreground",
        info:        "border-info/25        bg-info/[0.08]       text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/* ── Accent bar colors ── */

const ACCENT_BAR: Record<ToastVariant, string> = {
  default:     "bg-primary",
  success:     "bg-success",
  warning:     "bg-warning",
  destructive: "bg-destructive",
  info:        "bg-info",
};

/* ── Icons per variant ── */

const VARIANT_ICONS: Record<ToastVariant, React.ReactNode> = {
  default: <Info className="h-5 w-5 shrink-0 mt-0.5 text-primary" />,
  success: <CheckCircle weight="fill" className="h-5 w-5 shrink-0 mt-0.5 text-success" />,
  warning: <WarningCircle weight="fill" className="h-5 w-5 shrink-0 mt-0.5 text-warning" />,
  destructive: <XCircle weight="fill" className="h-5 w-5 shrink-0 mt-0.5 text-destructive" />,
  info: <Info weight="fill" className="h-5 w-5 shrink-0 mt-0.5 text-info" />,
};

/* ── ToastItem (single notification) ── */

interface ToastItemProps extends VariantProps<typeof toastVariants> {
  state: ToastState;
  onDismiss: (id: string) => void;
}

function ToastItem({ state, onDismiss }: ToastItemProps) {
  const variant = state.variant ?? "default";

  return (
    <ToastPrimitive.Root
      open={state.open}
      duration={state.duration ?? 5000}
      onOpenChange={(open) => {
        if (!open) onDismiss(state.id);
      }}
      className={toastVariants({ variant })}
    >
      {/* Left accent bar */}
      <span
        className={cn("absolute left-0 top-0 h-full w-1", ACCENT_BAR[variant])}
        aria-hidden="true"
      />

      {/* Leading icon */}
      {VARIANT_ICONS[variant]}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {state.title && (
          <ToastPrimitive.Title className="text-sm font-semibold leading-snug">
            {state.title}
          </ToastPrimitive.Title>
        )}
        {state.description && (
          <ToastPrimitive.Description
            className={cn(
              "text-sm",
              variant === "default" ? "text-muted-foreground" : "opacity-75",
              state.title && "mt-0.5",
            )}
          >
            {state.description}
          </ToastPrimitive.Description>
        )}
        {state.action && (
          <ToastPrimitive.Action
            altText={state.action.label}
            onClick={state.action.onClick}
            className="mt-2 text-xs font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {state.action.label}
          </ToastPrimitive.Action>
        )}
      </div>

      {/* Close button */}
      <ToastPrimitive.Close
        aria-label="Close"
        className={cn(
          "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-sm",
          "opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity",
          "text-foreground/60 hover:text-foreground",
        )}
      >
        <X className="h-3.5 w-3.5" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

/* ── Toaster (place once in your app root) ── */

export interface ToasterProps {
  /** Where toasts appear (default: "bottom-right") */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const POSITION_CLASSES: Record<NonNullable<ToasterProps["position"]>, string> = {
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
};

export function Toaster({ position = "bottom-right" }: ToasterProps) {
  const { toasts, dismiss } = useToastStore();

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((t) => (
        <ToastItem key={t.id} state={t} onDismiss={dismiss} />
      ))}
      <ToastPrimitive.Viewport
        className={cn(
          "fixed z-[100] flex flex-col gap-2 p-6 w-full max-w-sm pointer-events-none [&>*]:pointer-events-auto",
          POSITION_CLASSES[position],
        )}
      />
    </ToastPrimitive.Provider>
  );
}
