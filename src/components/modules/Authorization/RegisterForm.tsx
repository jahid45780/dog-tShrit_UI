import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { User, Mail, Lock, Phone } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import { useRegisterMutation } from "@/redux/features/auth/auth.api";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// =====================================================
// ZOD VALIDATION
// =====================================================

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),

    email: z
      .string()
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

// =====================================================
// TYPE
// =====================================================

type FormValues = z.infer<typeof formSchema>;

// =====================================================
// REGISTER FORM
// =====================================================

const RegisterForm = () => {
//   const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  // ===================================================
  // REACT HOOK FORM
  // ===================================================

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

  // ===================================================
  // SUBMIT
  // ===================================================

  const onSubmit = async (data: FormValues) => {
    // confirmPassword শুধু frontend validation-এর জন্য।
    // Backend/API-তে এটা পাঠানোর প্রয়োজন নেই।

    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    try {
      // ================================================
      // REDUX RTK QUERY API CALL
      // ================================================

    //   await register(userInfo).unwrap();

      toast.success(
        "Registration successful! Please login to continue."
      );

      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error);

      toast.error(
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
            className="h-11 pl-10"
          />
        </div>

        {/* Name Error */}
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
            className="h-11 pl-10"
          />
        </div>

        {/* Email Error */}
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
            className="h-11 pl-10"
          />
        </div>

        {/* Phone Error */}
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
            type="password"
            placeholder="Create a password"
            className="h-11 pl-10"
          />
        </div>

        {/* Password Error */}
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
            type="password"
            placeholder="Confirm your password"
            className="h-11 pl-10"
          />
        </div>

        {/* Confirm Password Error */}
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* =================================================
          SUBMIT BUTTON
      ================================================= */}

      {/* <Button
        type="submit"
        disabled={isLoading}
        className="h-11 w-full"
      >
        {isLoading
          ? "Creating account..."
          : "Create account"}
      </Button> */}
    </form>
  );
};

export default RegisterForm;