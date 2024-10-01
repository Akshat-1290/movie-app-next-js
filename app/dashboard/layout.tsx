import React from "react";
import Sidebar from "../../components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard to manage your movie summaries.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <main className="flex gap-7 overflow-x-hidden">
  <Sidebar/>
   {children}
  </main>
  </>
}
