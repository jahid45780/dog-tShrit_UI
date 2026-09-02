import { cn } from "@/lib/utils";
import type { LogoProps } from "@/types/logoTypes";



const Logo = ({ className, imageClassName }: LogoProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center shrink-0",
        className
      )}
    >
      <img
        src="https://i.ibb.co.com/PvwkMyg2/logoweb-removebg-preview.png"
        alt="Paw Mark"
        className={cn(
          "h-12 w-auto object-contain",
          "transition-transform duration-300",
          "group-hover:scale-105",
          imageClassName
        )}
      />
    </div>
  );
};

export default Logo;