"use client";

import { NumericFormat } from "react-number-format";
import { InputProps } from "./type";
import { InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { withMask } from "use-mask-input";
import { AlertCircle, Eye, EyeClosed } from "lucide-react";

export function Input({
  isNumeric = false,
  classNames,
  name,
  label,
  required,
  type,
  id,
  mask,
  disabled,
  leftIcon,
  rightIcon,
  methods,
  onChange: InputOnChange,
  onValueChange: InputOnValueChange,
  customMessage,
  ...props
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Comp = isNumeric ? NumericFormat : "input";

  const customRef = mask
    ? withMask(mask, {
        showMaskOnHover: false,
        showMaskOnFocus: false,
        autoUnmask: true,
        clearMaskOnLostFocus: true,
        removeMaskOnSubmit: true,
      })
    : undefined;

  const hasError = methods?.formState.errors[name]?.message;

  const inputClassName: InputHTMLAttributes<HTMLInputElement>["className"] = cn(
    "flex-1 px-2 py-1 min-w-0 bg-transparent border-none rounded-none focus:outline-none",
    classNames?.input
  );

  const inputContainerClassName: InputHTMLAttributes<HTMLInputElement>["className"] =
    cn(
      "w-full overflow-hidden h-12 flex items-center gap-1 border border-input bg-transparent text-base text-foreground rounded-lg px-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      hasError && "border-destructive text-destructive bg-destructive/10",
      disabled && "opacity-80 pointer-events-none",
      classNames?.mainWrapper
    );

  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col gap-1 items-start justify-start",
          classNames?.innerWrapper
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-lg font-medium",
              hasError && "text-destructive",
              classNames?.label
            )}
          >
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className={inputContainerClassName}>
          {leftIcon && (
            <leftIcon.element
              className={cn("shrink-0", leftIcon.className)}
              onClick={leftIcon.event}
            />
          )}
          {methods ? (
            <Controller
              name={name}
              control={methods.control}
              disabled={disabled}
              render={({
                field: { name, value, onChange, onBlur, ref, disabled },
              }) => (
                <Comp
                  className={inputClassName}
                  value={value || ""}
                  name={name}
                  id={id}
                  onChange={(e) => {
                    if (!isNumeric) {
                      onChange(e);
                    }
                    if (InputOnChange) {
                      InputOnChange(e);
                    }
                  }}
                  {...(isNumeric && {
                    onValueChange: (e, i) => {
                      if (isNumeric) {
                        onChange(e.floatValue);
                      }
                      if (InputOnValueChange) {
                        InputOnValueChange(e, i);
                      }
                    },
                  })}
                  onBlur={onBlur}
                  ref={customRef || ref}
                  disabled={disabled}
                  required={required}
                  // @ts-expect-error Type is always valid
                  type={
                    type === "password" ? (isOpen ? "text" : "password") : type
                  }
                  {...props}
                />
              )}
            />
          ) : (
            <Comp
              className={inputClassName}
              id={id}
              name={name}
              ref={customRef || undefined}
              disabled={disabled}
              required={required}
              onChange={InputOnChange}
              {...(isNumeric && {
                onValueChange: (e, i) => {
                  if (InputOnValueChange) {
                    InputOnValueChange(e, i);
                  }
                },
              })}
              // @ts-expect-error Type is always valid
              type={type === "password" ? (isOpen ? "text" : "password") : type}
              {...props}
            />
          )}

          {type === "password" ? (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="shrink-0"
              >
                {isOpen ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeClosed className="size-4" />
                )}
              </button>
            </>
          ) : (
            rightIcon && (
              <rightIcon.element
                className={cn("shrink-0", rightIcon.className)}
                onClick={rightIcon.event}
              />
            )
          )}
        </div>

        {hasError && (
          <p className="text-destructive text-sm text-start">
            <AlertCircle className="inline-block mr-1" />
            {hasError as string}
          </p>
        )}
        {customMessage && (
          <p
            className={cn(
              "text-start text-foreground/85 text-xs font-medium",
              classNames?.customMessage
            )}
          >
            {customMessage}
          </p>
        )}
      </div>
    </>
  );
}
