"use client";

import Footer from "./_components/footer";
import { Heading } from "./_components/heading";
import Heroes from "./_components/heroes";


 const MarketingPage = () => {
  return (
   <div className="min-h-full dark:bg-[#1F1F1F]  flex flex-col">
    <div className="flex flex-col justify-center text-center items-center flex-1 md:justify-start gap-y-8 pb-10 px-6">
      <Heading/>
      <Heroes/>
    </div>
      <Footer/>
   </div>
  )
}
export default MarketingPage