
import { Link } from "react-router-dom";
import { ArrowLeft, PawPrint, Sparkles } from "lucide-react";

import { Card} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/modules/Authorization/LoginFrom";
import Logo from "@/share/Logo";


const Login = () => {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">

        <Card className="w-full max-w-5xl overflow-hidden rounded-3xl border-border/60 bg-background shadow-xl">
          <div className="grid min-h-[650px] md:grid-cols-2">

            {/* ================= LEFT ================= */}
            <div className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground md:flex md:flex-col md:justify-between lg:p-14">

              {/* Background Shapes */}
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
              <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/10" />

           
           {/* Logo */}
<div className="relative z-10"> <Link to="/" className="group inline-flex items-center gap-3" > <div className=" flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-1.5 backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/20 group-hover:shadow-lg group-hover:shadow-white/20 " > <Logo imageClassName=" h-full w-full object-contain rounded-lg transition-all duration-300 ease-out group-hover:scale-110 " /> </div> <span className=" text-xl font-bold transition-all duration-300 group-hover:tracking-wide " > Atnamira </span> </Link> </div>

{/* <div className="relative z-10">
  <Link to="/" className="inline-flex items-center gap-3">
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 p-2">
      <Logo imageClassName="h-full w-full object-contain" />
    </div>

    <span className="text-xl font-bold">
      Atnamira
    </span>
  </Link>
</div> */}

              {/* Center Content */}
              <div className="relative z-10 max-w-md">
                <Badge
                  variant="secondary"
                  className="mb-6 border-0 bg-white/15 px-4 py-2 text-primary-foreground backdrop-blur"
                >
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Premium Pet Care
                </Badge>

                <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
  Everything your
  <span className="block opacity-70">
    pet needs.
  </span>
</h1>

                <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/70 lg:text-base">
                  A better way to discover, manage and care for
                  the pets you love.
                </p>

                {/* Mini Stats */}
                <div className="mt-10 flex gap-8">
                  <div>
                    <p className="text-2xl font-bold">10K+</p>
                    <p className="mt-1 text-xs text-primary-foreground/60">
                      Happy Users
                    </p>
                  </div>

                  <div className="h-10 w-px bg-white/20" />

                  <div>
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="mt-1 text-xs text-primary-foreground/60">
                      User Rating
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
             <p className="text-xs text-primary-foreground/50">
  © 2026 Atnamira. All rights reserved.
</p>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

              <div className="w-full max-w-sm">

                {/* Back */}
                <Link
                  to="/"
                  className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>

                {/* Header */}
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <PawPrint className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight">
                    Welcome back
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
  Sign in to continue your Paw Mark journey.
</p>
                </div>

                {/* Separate Login Form */}
                <LoginForm />

                {/* Bottom */}
                <p className="mt-8 text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-foreground hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-foreground hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

              </div>
            </div>

          </div>
        </Card>
      </div>
    </main>
  );
};

export default Login;

