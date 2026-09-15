"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  AlertCircleIcon,
  ImageUpIcon,
  XIcon,
} from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";

interface SingleImageUploaderProps {
  label?: string;
  onChange: (file: File | null) => void;
}

export default function SingleImageUploader({
  label,
  onChange,
}: SingleImageUploaderProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

  /*
   * Keep the latest onChange without making the
   * useEffect depend on the changing function reference.
   */
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept:
      "image/png,image/jpeg,image/jpg,image/webp,image/svg+xml",
    maxSize,
    multiple: false,
    maxFiles: 1,
  });

  /*
   * IMPORTANT:
   * Only depend on files.
   *
   * This prevents the infinite render loop caused by
   * the inline onChange function from AddProduct.tsx.
   */
  useEffect(() => {
    const file = files[0]?.file;

    if (file instanceof File) {
      onChangeRef.current(file);
    } else {
      onChangeRef.current(null);
    }
  }, [files]);

  const previewUrl = files[0]?.preview ?? null;

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}

      {label && (
        <label className="text-sm font-medium">
          {label}

          <span className="ml-1 text-destructive">
            *
          </span>
        </label>
      )}

      {/* Upload Area */}

      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="
            relative
            flex
            min-h-52
            w-full
            cursor-pointer
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-lg
            border-2
            border-dashed
            border-input
            bg-background
            p-6
            text-center
            transition-colors

            hover:border-ring
            hover:bg-muted/30

            data-[dragging=true]:border-ring
            data-[dragging=true]:bg-muted/50

            has-[input:focus]:border-ring
            has-[input:focus]:ring-2
            has-[input:focus]:ring-ring/20

            has-[img]:border-none
            has-[img]:p-0
          "
        >
          {/* Hidden File Input */}

          <input
            {...getInputProps()}
            className="sr-only"
            aria-label={`Upload ${
              label || "image"
            }`}
          />

          {/* Preview */}

          {previewUrl ? (
            <div className="absolute inset-0 h-full w-full">
              <img
                src={previewUrl}
                alt={label || "Uploaded image"}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <ImageUpIcon className="size-6 text-muted-foreground" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Click to upload
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  or drag and drop
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP or SVG
              </p>

              <p className="text-xs text-muted-foreground">
                Maximum size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>

        {/* Remove Button */}

        {previewUrl && (
          <div className="absolute right-3 top-3">
            <button
              type="button"
              className="
                flex
                size-8
                items-center
                justify-center
                rounded-full
                bg-background
                text-foreground
                shadow-md
                ring-1
                ring-border
                transition-colors
                hover:bg-destructive
                hover:text-destructive-foreground
              "
              onClick={(event) => {
                event.stopPropagation();

                const fileId = files[0]?.id;

                if (fileId) {
                  removeFile(fileId);
                }
              }}
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Errors */}

      {errors.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-destructive">
          <AlertCircleIcon className="size-4 shrink-0" />

          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}