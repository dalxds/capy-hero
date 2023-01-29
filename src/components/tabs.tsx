"use client";

import * as React from "react";
import * as TabsPrimivite from "@radix-ui/react-tabs";

import { cn } from "../utils/merge";

const Tabs = TabsPrimivite.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimivite.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimivite.List>
>(({ className, ...props }, ref) => (
  <TabsPrimivite.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md bg-slate-100 p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimivite.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimivite.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimivite.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimivite.Trigger
    className={cn(
      "inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5  text-sm font-medium text-slate-700 transition-all  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
    ref={ref}
  />
));
TabsTrigger.displayName = TabsPrimivite.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimivite.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimivite.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimivite.Content
    className={cn("rounded-md border border-slate-200", className)}
    {...props}
    ref={ref}
  />
));
TabsContent.displayName = TabsPrimivite.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
