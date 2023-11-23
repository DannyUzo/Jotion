"use client";

import React, { ElementRef,useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { useMediaQuery } from "usehooks-ts";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";

import UserItem from "./user-item";
import Item from "./item";
import { toast } from "sonner";
import DocumentList from "./document-list";
import TrashBox from "./trashBox";
import { useSearch } from "@/Hooks/use-search";
import { useSettings } from "@/Hooks/use-settings";
import Navbar from "./navbar";

const Navigation = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();

    const create = useMutation(api.documents.create);

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const search = useSearch();
    const settings = useSettings();

    useEffect(() => {
      if(isMobile){
        collapse();
      }else{
        resetWidth();
      }
    },[isMobile]);

    useEffect(() => {
      if(isMobile){
        collapse();
      }
    },[pathname, isMobile])

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      isResizingRef.current = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = event.clientX;

      if(newWidth < 240) newWidth = 240;
      if(newWidth > 450) newWidth = 450;


      if(sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
        navbarRef.current.style.setProperty("left", `${newWidth}px`);
        navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
      }
      
    }

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
      if(sidebarRef.current && navbarRef.current) {
        setIsCollapsed(false);
        setIsResetting(true);

        sidebarRef.current.style.width = isMobile ? "100%" : "240px";
        navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
        navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");

        setTimeout(() => setIsResetting(false), 300)
      }
    }
    
    const collapse = () => {
      if(sidebarRef && navbarRef){
        setIsCollapsed(true);
        setIsResetting(true);

        if(sidebarRef.current)  sidebarRef.current.style.width = "0"
        navbarRef.current?.style.setProperty("width", "100%");
        navbarRef.current?.style.setProperty("left", "0");
        setTimeout(() => setIsResetting(false), 300)
      }
    } 


    const handleCreate = () => {
      const promise = create({title: "Untitled"})
      .then((documentId) => router.push(`/documents/${documentId}`))

      toast.promise(promise,{
        loading: "Creating a new Note...",
        success: "New note Created!",
        error: "Failed to create a new note.",
      })
    }

  return (
    <>
      <aside ref={sidebarRef} className={cn("group/sidebar h-full bg-secondary overflow-y-auto flex relative flex-col w-60 z-[99999] ", isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0" )}>
        <div onClick={collapse} role="button" className={cn("w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100")}>
            <ChevronsLeft className="h-6 w-6"/>
        </div>
        <div>
            <UserItem/>
            <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
            <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
            <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList/>
          <Item onClick={handleCreate} label="Add a page" icon={Plus} />
          <Popover>
            <PopoverTrigger className="w-full mt-2">
                <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent className="p-0 w-72" side={isMobile ? "bottom" : "right"}>
              <TrashBox/>
            </PopoverContent>
          </Popover>
        </div>
        <div 
        onMouseDown={handleMouseDown}
        onClick={resetWidth}
         className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"/>
      </aside>
      <div ref={navbarRef} className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]", isResetting && "transition-all ease-in-out duration-300", isMobile && "left-0 w-full" )}>
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth}/>
        ) : (
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground"/> }
        </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;