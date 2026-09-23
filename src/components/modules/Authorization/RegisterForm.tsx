import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterMutation } from "@/redux/features/auth/auth.api";

/* =====================================================
   ZOD VALIDATION
===================================================== */

const formSchema = z
  .object({
    /* =========================
       NAME
    ========================= */

    name: z
      .string()
      .trim()
      .min(1, "Full name is required.")
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),

    /* =========================
       EMAIL
    ========================= */

    email: z
      .string()
      .trim()
      .min(1, "Email address is required.")
      .email("Please enter a valid email address."),

    /* =========================
       PASSWORD
    ========================= */

    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least 1 uppercase letter."
      ),

    /* =========================
       CONFIRM PASSWORD
    ========================= */

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password.")
      .min(
        6,
        "Confirm password must be at least 6 characters."
      ),
  })

  /* =========================
     PASSWORD MATCH
  ========================= */

  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

/* =====================================================
   TYPE
===================================================== */

type FormValues = z.infer<typeof formSchema>;

/* =====================================================
   REGISTER FORM
===================================================== */

const RegisterForm = () => {
  const navigate = useNavigate();

  /* ===================================================
     REGISTER API
  =================================================== */

  const [registerUser, { isLoading }] =
    useRegisterMutation();

  /* ===================================================
     PASSWORD VISIBILITY
  =================================================== */

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /* ===================================================
     REACT HOOK FORM
  =================================================== */

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  /* =====================================================
     SUBMIT
  ===================================================== */

  const onSubmit = async (data: FormValues) => {
    try {
      /* ================================================
         API PAYLOAD
      ================================================ */

      const userInfo = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      };

      console.log(
        "Register Payload:",
        userInfo
      );

      /* ================================================
         REGISTER API
      ================================================ */

      const response =
        await registerUser(userInfo).unwrap();

      console.log(
        "Register response:",
        response
      );

      /* ================================================
         SUCCESS TOAST
      ================================================ */

      toast.success(
        response?.message ||
          "Registration successful! Please login."
      );

      /* ================================================
         RESET FORM
      ================================================ */

      form.reset();

      /* ================================================
         LOGIN PAGE
      ================================================ */

      navigate("/login");

    } catch (error: any) {
      console.log(
        "========== REGISTER ERROR =========="
      );

      console.log(
        "Status:",
        error?.status
      );

      console.log(
        "Data:",
        error?.data
      );

      console.log(
        "Message:",
        error?.data?.message
      );

      console.log(
        "===================================="
      );

      /* =================================================
         BACKEND ZOD ERROR

         Example:

         {
           success: false,
           message: "Zod Error",
           err: {
             issues: [...]
           }
         }

         OR

         {
           success: false,
           message: "Zod Error",
           err: [...]
         }
      ================================================= */

      const backendIssues =
        error?.data?.err?.issues ||
        error?.data?.err;

      if (Array.isArray(backendIssues)) {
        let hasFieldError = false;

        backendIssues.forEach(
          (issue: any) => {
            /*
             * Backend path:
             *
             * ["body", "password"]
             *
             * ["body", "email"]
             *
             * ["body", "name"]
             */

            const fieldName =
              issue?.path?.[1];

            const validFields: Array<
              keyof FormValues
            > = [
              "name",
              "email",
              "password",
              "confirmPassword",
            ];

            if (
              fieldName &&
              validFields.includes(
                fieldName as keyof FormValues
              )
            ) {
              form.setError(
                fieldName as keyof FormValues,
                {
                  type: "server",
                  message:
                    issue?.message ||
                    "Invalid value.",
                }
              );

              hasFieldError = true;
            }
          }
        );

        /*
         * If backend Zod errors are
         * assigned to inputs,
         * don't show generic toast.
         */

        if (hasFieldError) {
          return;
        }
      }

      /* =================================================
         FALLBACK ERROR
      ================================================= */

      toast.error(
        error?.data?.message ||
          error?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >

      {/* =================================================
          NAME
      ================================================= */}

      <div className="space-y-2">

        <Label htmlFor="name">
          Full name{" "}
          <span className="text-destructive">
            *
          </span>
        </Label>

        <div className="relative">

          <User
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            {...form.register("name")}
            id="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            disabled={isLoading}
            aria-invalid={
              !!form.formState.errors.name
            }
            className={`h-11 pl-10 ${
              form.formState.errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />

        </div>

        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.name
                .message
            }
          </p>
        )}

      </div>

      {/* =================================================
          EMAIL
      ================================================= */}

      <div className="space-y-2">

        <Label htmlFor="email">
          Email address{" "}
          <span className="text-destructive">
            *
          </span>
        </Label>

        <div className="relative">

          <Mail
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            {...form.register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isLoading}
            aria-invalid={
              !!form.formState.errors.email
            }
            className={`h-11 pl-10 ${
              form.formState.errors.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />

        </div>

        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.email
                .message
            }
          </p>
        )}

      </div>

      {/* =================================================
          PASSWORD
      ================================================= */}

      <div className="space-y-2">

        <Label htmlFor="password">
          Password{" "}
          <span className="text-destructive">
            *
          </span>
        </Label>

        <div className="relative">

          <Lock
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            {...form.register("password")}
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Create a password"
            autoComplete="new-password"
            disabled={isLoading}
            aria-invalid={
              !!form.formState.errors.password
            }
            className={`h-11 pl-10 pr-11 ${
              form.formState.errors.password
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (prev) => !prev
              )
            }
            disabled={isLoading}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>

        </div>

        {form.formState.errors.password && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.password
                .message
            }
          </p>
        )}

        {!form.formState.errors.password && (
          <p className="text-xs text-muted-foreground">
            Minimum 6 characters with at least
            1 uppercase letter.
          </p>
        )}

      </div>

      {/* =================================================
          CONFIRM PASSWORD
      ================================================= */}

      <div className="space-y-2">

        <Label htmlFor="confirmPassword">
          Confirm password{" "}
          <span className="text-destructive">
            *
          </span>
        </Label>

        <div className="relative">

          <Lock
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            {...form.register(
              "confirmPassword"
            )}
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm your password"
            autoComplete="new-password"
            disabled={isLoading}
            aria-invalid={
              !!form.formState.errors
                .confirmPassword
            }
            className={`h-11 pl-10 pr-11 ${
              form.formState.errors
                .confirmPassword
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (prev) => !prev
              )
            }
            disabled={isLoading}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>

        </div>

        {form.formState.errors
          .confirmPassword && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors
                .confirmPassword.message
            }
          </p>
        )}

      </div>

      {/* =================================================
          SUBMIT BUTTON
      ================================================= */}

      <Button
        type="submit"
        disabled={isLoading}
        className="h-11 w-full"
      >

        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            Creating account...
          </>
        ) : (
          "Create account"
        )}

      </Button>

    </form>
  );
};

export default RegisterForm;