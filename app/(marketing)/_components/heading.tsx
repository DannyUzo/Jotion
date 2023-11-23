import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl ">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>{" "}
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium ">
        Jotion is the connected workspace where <br />
        better, faster work happens
      </h3>
      <div className="w-full flex items-center justify-center">
        {isLoading && <Spinner />}
      </div>
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Jotion Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
      
      {isAuthenticated &&
        !isLoading && (
          <Button asChild>
            <Link href="/documents">
              Enter Jotion
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
    </div>
  );
};
