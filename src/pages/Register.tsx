import { Link } from "react-router-dom";
import { PawPrint, Sparkles } from "lucide-react";

// import RegisterForm from "@/components/modules/Authorization/RegisterForm";
import Logo from "@/share/Logo";
import RegisterForm from "@/components/modules/Authorization/RegisterForm";

const Register = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <section className="relative hidden overflow-hidden bg-primary lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-16">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white/15 p-1">
                <Logo imageClassName="h-full w-full rounded-lg object-contain" />
              </div>

              <span className="text-xl font-bold text-primary-foreground">
                Atnamira
              </span>
            </Link>

            {/* Content */}
            <div className="max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                Join our pet-loving community
              </div>

              <h1 className="text-4xl font-bold leading-tight text-primary-foreground xl:text-5xl">
                Everything your furry friend needs.
              </h1>

              <p className="mt-5 max-w-md leading-7 text-primary-foreground/75">
                Create your account and discover premium products,
                adorable collections, and everything your pets need.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["🐶", "🐱", "🐰", "🐹"].map((emoji) => (
                    <div
                      key={emoji}
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-background text-xl"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-semibold text-primary-foreground">
                    Pet lovers are here
                  </p>
                  <p className="text-sm text-primary-foreground/65">
                    Join our growing community
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <PawPrint className="h-4 w-4" />
              Made with love for pets
            </div>
          </div>
        </section>

        {/* ================= RIGHT SIDE ================= */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link to="/">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border bg-background p-2 shadow-sm">
                  <Logo imageClassName="h-full w-full rounded-xl object-contain" />
                </div>
              </Link>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight">
                Create an account
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Sign up to start shopping for your favorite pets
              </p>
            </div>

            {/* Register Form */}
            <RegisterForm />

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Register;