import { Poppins } from "next/font/google";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image src="/logo.svg" width="40" height="40" alt="logo" className="dark:hidden" />
      <Image src="/logo-dark.svg" width="40" height="40" alt="logo" className="hidden dark:block" />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};

export default Logo;
