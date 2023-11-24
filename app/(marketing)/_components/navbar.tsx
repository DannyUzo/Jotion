"use client";

import { useScrollTop } from "@/Hooks/use-scroll-top";

import { useConvexAuth } from "convex/react"

import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return(
     <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm" )}>
    <Logo/>
    <div className="md:ml-auto md:justify-end justify-between w-full items-center gap-x-2 flex">
      {isLoading && ( <Spinner/> )}
      {!isAuthenticated && !isLoading  && (
        <>
        <SignInButton mode="modal" >
          <Button variant="ghost" size="sm" >Log in</Button>
        </SignInButton>
        <SignInButton mode="modal" >
          <Button size="sm" >Get Jotion free</Button>
        </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
        <Button asChild size="sm" variant="ghost">
          <Link href="/documents">
          Enter Jotion
          </Link>
        </Button>
        <UserButton afterSignOutUrl="/"/>
        </>
      )}
       <ModeToggle/>
    </div>
  </div>
  );
};

export default Navbar;
  