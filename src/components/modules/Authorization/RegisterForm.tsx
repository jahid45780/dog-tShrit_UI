
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),

    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters.")
      .max(15, "Phone number must be at most 15 characters."),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

/* =====================================================
   TYPE
===================================================== */

type FormValues = z.infer<typeof formSchema>;

/* =====================================================
   REGISTER FORM
===================================================== */

const RegisterForm = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
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
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  /* ===================================================
     SUBMIT
  =================================================== */

  const onSubmit = async (data: FormValues) => {
    try {

      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

        //  REGISTER API


      const response = await registerUser(userInfo).unwrap();

      console.log("Register response:", response);

      toast.success(
        response?.message ||
          "Registration successful! Please login."
      );

      /* ================================================
         Login page-এ redirect
      ================================================ */

      navigate("/login");

      /* ================================================
         Form reset
      ================================================ */

      form.reset();
    } catch (error: any) {
      console.log("========== REGISTER ERROR ==========");
  console.log("Status:", error?.status);
  console.log("Data:", error?.data);
  console.log("Message:", error?.data?.message);
  console.log("====================================");
      console.error("Registration error:", error);

      toast.error(
        error?.data?.message ||
          error?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* =================================================
          NAME
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="name">
          Full name
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
            disabled={isLoading}
            className="h-11 pl-10"
          />
        </div>

        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* =================================================
          EMAIL
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="email">
          Email address
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
            className="h-11 pl-10"
          />
        </div>

        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* =================================================
          PHONE
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone number
        </Label>

        <div className="relative">
          <Phone
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
            {...form.register("phone")}
            id="phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            disabled={isLoading}
            className="h-11 pl-10"
          />
        </div>

        {form.formState.errors.phone && (
          <p className="text-sm text-destructive">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* =================================================
          PASSWORD
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
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
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="new-password"
            disabled={isLoading}
            className="h-11 pl-10 pr-11"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
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
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* =================================================
          CONFIRM PASSWORD
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm password
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
            {...form.register("confirmPassword")}
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm your password"
            autoComplete="new-password"
            disabled={isLoading}
            className="h-11 pl-10 pr-11"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
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

        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {
              form.formState.errors.confirmPassword
                .message
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



