import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

/* ── Types ── */

export interface UserAvatarProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Full user name — used for initials fallback and tooltip */
  name: string;
  /** Optional avatar image URL */
  src?: string;
  /** Optional secondary line (email, role…) — only shown when `showDetails` is true */
  email?: string;
  /** Online / busy / away indicator dot */
  status?: "online" | "offline" | "busy" | "away";
  /** Show name + email next to the avatar */
  showDetails?: boolean;
  /** Visual size */
  size?: "sm" | "md" | "lg";
  /** Make it interactive (adds hover ring + button semantics). Defaults to true. */
  interactive?: boolean;
}

/* ── Helpers ── */

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const sizeMap = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
} as const;

const statusColorMap = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
  away: "bg-warning",
} as const;

/* ── Component ── */

const UserAvatar = React.forwardRef<HTMLButtonElement, UserAvatarProps>(
  (
    {
      name,
      src,
      email,
      status,
      showDetails = false,
      size = "md",
      interactive = true,
      className,
      ...props
    },
    ref,
  ) => {
    const initials = getInitials(name);

    const avatarBlock = (
      <span className="relative shrink-0 inline-flex">
        <Avatar
          className={cn(
            sizeMap[size],
            "ring-0 transition-all duration-200",
            interactive &&
              "group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2 group-hover:ring-offset-sidebar",
          )}
        >
          {src && <AvatarImage src={src} alt={name} />}
          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-sidebar",
              statusColorMap[status],
            )}
            aria-label={status}
          />
        )}
      </span>
    );

    const content = (
      <>
        {avatarBlock}
        {showDetails && (
          <div className="flex flex-1 min-w-0 flex-col text-left">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              {name}
            </p>
            {email && (
              <p className="truncate text-xs text-sidebar-foreground/70">{email}</p>
            )}
          </div>
        )}
      </>
    );

    if (!interactive) {
      return (
        <span
          className={cn(
            "inline-flex items-center gap-2.5",
            showDetails && "w-full",
            className,
          )}
        >
          {content}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group inline-flex items-center gap-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
          showDetails && "w-full px-2 py-1.5 hover:bg-sidebar-accent/50",
          className,
        )}
        title={name}
        aria-label={name}
        {...props}
      >
        {content}
      </button>
    );
  },
);
UserAvatar.displayName = "UserAvatar";

export { UserAvatar };
