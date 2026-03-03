import * as React from "react";
import { UploadSimple, CloudArrowUp } from "@phosphor-icons/react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ── Component ── */
export interface FileUploadProps
  extends Omit<React.ComponentProps<"input">, "type" | "onChange"> {
  /** "compact" = single-line zone, "full" = tall zone with browse button */
  variant?: "compact" | "full";
  label?: string;
  helperText?: string;
  state?: "default" | "error" | "success";
  /** Accepted file types label shown to the user */
  acceptLabel?: string;
  /** Max file size label shown to the user */
  maxSizeLabel?: string;
  onChange?: (files: FileList | null) => void;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      variant = "compact",
      label,
      helperText,
      state = "default",
      acceptLabel = "PNG, JPG, GIF",
      maxSizeLabel = "up to 5MB",
      onChange,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();
    const [isDragging, setIsDragging] = React.useState(false);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge forwarded ref with internal ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    function handleFiles(files: FileList | null) {
      if (files && files.length > 0) {
        setFileName(
          files.length === 1
            ? files[0].name
            : `${files.length} files selected`,
        );
      } else {
        setFileName(null);
      }
      onChange?.(files);
    }

    function handleDragOver(e: React.DragEvent) {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    }

    function handleDragLeave(e: React.DragEvent) {
      e.preventDefault();
      setIsDragging(false);
    }

    function handleDrop(e: React.DragEvent) {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      handleFiles(e.target.files);
    }

    function openFilePicker() {
      if (!disabled) inputRef.current?.click();
    }

    const borderColor = cn(
      state === "error" && "border-destructive",
      state === "success" && "border-success",
      state === "default" && "border-border",
    );

    const dragHighlight = isDragging && "border-primary bg-primary/5";

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

        {/* Hidden native file input */}
        <input
          ref={inputRef}
          type="file"
          id={inputId}
          className="sr-only"
          onChange={handleInputChange}
          disabled={disabled}
          {...props}
        />

        {variant === "compact" ? (
          /* ── Compact variant ── */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-6 py-5 transition-colors",
              borderColor,
              dragHighlight,
              disabled && "cursor-not-allowed opacity-50",
              !disabled && "cursor-pointer",
              className,
            )}
            onClick={openFilePicker}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openFilePicker();
              }
            }}
            aria-label="Upload a file"
          >
            <UploadSimple className="h-6 w-6 text-primary" />
            <div className="text-sm">
              {fileName ? (
                <span className="font-medium text-foreground">{fileName}</span>
              ) : (
                <>
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline"
                    tabIndex={-1}
                    disabled={disabled}
                  >
                    Upload a file
                  </button>
                  <span className="text-foreground"> or drag and drop</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {acceptLabel} {maxSizeLabel}
            </p>
          </div>
        ) : (
          /* ── Full variant ── */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 transition-colors",
              borderColor,
              dragHighlight,
              disabled && "cursor-not-allowed opacity-50",
              className,
            )}
          >
            <CloudArrowUp className="h-10 w-10 text-primary" />

            {fileName ? (
              <span className="text-sm font-medium text-foreground">
                {fileName}
              </span>
            ) : (
              <p className="text-sm font-semibold text-primary">
                Drag and drop a file to upload
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              {acceptLabel} {maxSizeLabel}
            </p>

            <div className="flex w-full items-center gap-3 px-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold text-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={openFilePicker}
              disabled={disabled}
              className={cn(
                "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              <UploadSimple className="h-4 w-4" />
              Browse Files
            </button>
          </div>
        )}

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
FileUpload.displayName = "FileUpload";

export { FileUpload };
