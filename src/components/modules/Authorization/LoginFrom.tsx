
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, LockKeyhole, Mail, Loader2 } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// // Change this import according to your project structure
// // import { useLoginMutation } from "@/redux/features/auth/authApi";

// const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email address"),

//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const [login, { isLoading }] = useLoginMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       const response = await login(data).unwrap();

//       if (response?.success) {
//         toast.success(response?.message || "Login successful!");

//         // Change this route according to your project
//         navigate("/dashboard");
//       }
//     } catch (error: any) {
//       toast.error(
//         error?.data?.message ||
//           error?.message ||
//           "Invalid email or password"
//       );
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-full space-y-5"
//     >
//       {/* Email */}
//       <div className="space-y-2">
//         <label
//           htmlFor="email"
//           className="text-sm font-medium"
//         >
//           Email address
//         </label>

//         <div className="relative">
//           <Mail
//             className="pointer-events-none absolute left-3 top-1/2
//             h-4 w-4 -translate-y-1/2 text-muted-foreground"
//           />

//           <Input
//             id="email"
//             type="email"
//             autoComplete="email"
//             placeholder="you@example.com"
//             disabled={isLoading}
//             {...register("email")}
//             className={`h-12 rounded-xl pl-10 transition-all ${
//               errors.email
//                 ? "border-destructive focus-visible:ring-destructive"
//                 : ""
//             }`}
//           />
//         </div>

//         {errors.email && (
//           <p className="text-xs font-medium text-destructive">
//             {errors.email.message}
//           </p>
//         )}
//       </div>

//       {/* Password */}
//       <div className="space-y-2">
//         <div className="flex items-center justify-between gap-2">
//           <label
//             htmlFor="password"
//             className="text-sm font-medium"
//           >
//             Password
//           </label>

//           <Link
//             to="/forgot-password"
//             className="text-xs font-medium text-primary hover:underline sm:text-sm"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         <div className="relative">
//           <LockKeyhole
//             className="pointer-events-none absolute left-3 top-1/2
//             h-4 w-4 -translate-y-1/2 text-muted-foreground"
//           />

//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             autoComplete="current-password"
//             placeholder="Enter your password"
//             disabled={isLoading}
//             {...register("password")}
//             className={`h-12 rounded-xl pl-10 pr-11 transition-all ${
//               errors.password
//                 ? "border-destructive focus-visible:ring-destructive"
//                 : ""
//             }`}
//           />

//           {/* Show / Hide Password */}
//           <button
//             type="button"
//             aria-label={
//               showPassword
//                 ? "Hide password"
//                 : "Show password"
//             }
//             onClick={() =>
//               setShowPassword((previous) => !previous)
//             }
//             disabled={isLoading}
//             className="absolute right-3 top-1/2
//             -translate-y-1/2 text-muted-foreground
//             transition-colors hover:text-foreground
//             disabled:pointer-events-none disabled:opacity-50"
//           >
//             {showPassword ? (
//               <EyeOff className="h-4 w-4" />
//             ) : (
//               <Eye className="h-4 w-4" />
//             )}
//           </button>
//         </div>

//         {errors.password && (
//           <p className="text-xs font-medium text-destructive">
//             {errors.password.message}
//           </p>
//         )}
//       </div>

//       {/* Remember Me */}
//       <div className="flex items-center gap-2">
//         <input
//           id="remember"
//           type="checkbox"
//           disabled={isLoading}
//           className="h-4 w-4 cursor-pointer rounded border-input accent-primary"
//         />

//         <label
//           htmlFor="remember"
//           className="cursor-pointer select-none text-sm text-muted-foreground"
//         >
//           Remember me
//         </label>
//       </div>

//       {/* Login Button */}
//       <Button
//         type="submit"
//         disabled={isLoading}
//         className="h-12 w-full rounded-xl text-sm font-semibold
//         shadow-lg shadow-primary/20 transition-all
//         hover:-translate-y-0.5 sm:text-base"
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Signing in...
//           </>
//         ) : (
//           "Sign in"
//         )}
//       </Button>

//       {/* Divider */}
//       <div className="relative py-2">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>

//         <div className="relative flex justify-center">
//           <span className="bg-background px-3 text-xs text-muted-foreground">
//             OR
//           </span>
//         </div>
//       </div>

//       {/* Google Login UI */}
//       <Button
//         type="button"
//         variant="outline"
//         disabled={isLoading}
//         className="h-12 w-full rounded-xl text-sm sm:text-base"
//       >
//         <svg
//           className="mr-2 h-5 w-5"
//           viewBox="0 0 24 24"
//           aria-hidden="true"
//         >
//           <path
//             fill="currentColor"
//             d="M21.35 12.27c0-.72-.06-1.41-.18-2.07H12v3.92h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.24Z"
//           />
//           <path
//             fill="currentColor"
//             d="M12 21.75c2.63 0 4.83-.87 6.44-2.34l-3.14-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.72 9.72 0 0 0 12 21.75Z"
//           />
//           <path
//             fill="currentColor"
//             d="M6.53 13.85A5.84 5.84 0 0 1 6.22 12c0-.64.11-1.27.31-1.85V7.62H3.29A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.38l3.24-2.53Z"
//           />
//           <path
//             fill="currentColor"
//             d="M12 6.12c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.2 14.63 2.25 12 2.25a9.72 9.72 0 0 0-8.71 5.37l3.24 2.53C7.3 7.84 9.46 6.12 12 6.12Z"
//           />
//         </svg>

//         Continue with Google
//       </Button>

//       {/* Register */}
//       <p className="pt-2 text-center text-sm text-muted-foreground">
//         Don't have an account?{" "}
//         <Link
//           to="/register"
//           className="font-semibold text-primary hover:underline"
//         >
//           Create account
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;



import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Login API is not available yet
// import { useLoginMutation } from "@/redux/features/auth/authApi";


/* =========================
   Login Validation Schema
========================= */

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // API is not available yet
  // const navigate = useNavigate();

  // API is not available yet
  // const [login, { isLoading }] = useLoginMutation();

  // Temporary loading state
  const isLoading = false;


  /* =========================
     React Hook Form
  ========================= */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });


  /* =========================
     Submit Handler
  ========================= */

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login form data:", data);

    /*
    ========================================
    LOGIN API WILL BE ADDED HERE LATER
    ========================================

    try {
      const response = await login(data).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Login successful!"
        );

        navigate("/dashboard");
      }

    } catch (error: any) {
      toast.error(
        error?.data?.message ||
        error?.message ||
        "Invalid email or password"
      );
    }

    ========================================
    */
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-5"
    >

      {/* =========================
          Email
      ========================= */}

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            className="
              pointer-events-none
              absolute left-3 top-1/2
              h-4 w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isLoading}
            {...register("email")}
            className={`
              h-12
              rounded-xl
              pl-10
              transition-all
              ${
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            `}
          />
        </div>

        {errors.email && (
          <p className="text-xs font-medium text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>


      {/* =========================
          Password
      ========================= */}

      <div className="space-y-2">

        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>

          <Link
            to="/forgot-password"
            className="
              text-xs
              font-medium
              text-primary
              hover:underline
              sm:text-sm
            "
          >
            Forgot password?
          </Link>
        </div>


        <div className="relative">

          <LockKeyhole
            className="
              pointer-events-none
              absolute left-3 top-1/2
              h-4 w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />


          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={isLoading}
            {...register("password")}
            className={`
              h-12
              rounded-xl
              pl-10
              pr-11
              transition-all
              ${
                errors.password
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            `}
          />


          {/* Show / Hide Password */}

          <button
            type="button"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            onClick={() =>
              setShowPassword((previous) => !previous)
            }
            disabled={isLoading}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-muted-foreground
              transition-colors
              hover:text-foreground
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>

        </div>


        {errors.password && (
          <p className="text-xs font-medium text-destructive">
            {errors.password.message}
          </p>
        )}

      </div>


      {/* =========================
          Remember Me
      ========================= */}

      <div className="flex items-center gap-2">

        <input
          id="remember"
          type="checkbox"
          disabled={isLoading}
          className="
            h-4 w-4
            cursor-pointer
            rounded
            border-input
            accent-primary
          "
        />

        <label
          htmlFor="remember"
          className="
            cursor-pointer
            select-none
            text-sm
            text-muted-foreground
          "
        >
          Remember me
        </label>

      </div>


      {/* =========================
          Login Button
      ========================= */}

      <Button
        type="submit"
        disabled={isLoading}
        className="
          h-12
          w-full
          rounded-xl
          text-sm
          font-semibold
          shadow-lg
          shadow-primary/20
          transition-all
          hover:-translate-y-0.5
          sm:text-base
        "
      >

        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}

      </Button>


      {/* =========================
          Divider
      ========================= */}

      <div className="relative py-2">

        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center">
          <span
            className="
              bg-background
              px-3
              text-xs
              text-muted-foreground
            "
          >
            OR
          </span>
        </div>

      </div>


      {/* =========================
          Google Login
      ========================= */}

      <Button
        type="button"
        variant="outline"
        disabled={isLoading}
        className="
          h-12
          w-full
          rounded-xl
          text-sm
          sm:text-base
        "
      >

        <svg
          className="mr-2 h-5 w-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M21.35 12.27c0-.72-.06-1.41-.18-2.07H12v3.92h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.24Z"
          />

          <path
            fill="currentColor"
            d="M12 21.75c2.63 0 4.83-.87 6.44-2.34l-3.14-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.72 9.72 0 0 0 12 21.75Z"
          />

          <path
            fill="currentColor"
            d="M6.53 13.85A5.84 5.84 0 0 1 6.22 12c0-.64.11-1.27.31-1.85V7.62H3.29A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.38l3.24-2.53Z"
          />

          <path
            fill="currentColor"
            d="M12 6.12c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.2 14.63 2.25 12 2.25a9.72 9.72 0 0 0-8.71 5.37l3.24 2.53C7.3 7.84 9.46 6.12 12 6.12Z"
          />
        </svg>

        Continue with Google

      </Button>


      {/* =========================
          Register
      ========================= */}

      <p className="pt-2 text-center text-sm text-muted-foreground">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="
            font-semibold
            text-primary
            hover:underline
          "
        >
          Create account
        </Link>

      </p>

    </form>
  );
};

export default LoginForm;

