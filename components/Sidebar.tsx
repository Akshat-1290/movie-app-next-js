"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Star,
  Search,
  TrendingUp,
  HelpCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Sidebar({ className }: SidebarProps) {
  const { user, setIsAuthModalOpen , isMobileSidebarOpen , setIsMobileSidebarOpen } = useAuth();

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-72 bg-white border-r transition-all duration-300 ease-in-out",
        "md:relative md:translate-x-0",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "fixed top-0 left-0 z-50",
        className
      )}
    >
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo-dark.png"
            alt="logo"
            width={139}
            height={39}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <X size={24} />
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-wider uppercase text-gray-500">
            Links
          </h2>
          <div className="space-y-1">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              allowed={true}
              route="/dashboard"
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <NavItem
              icon={<Star size={20} />}
              label="Favourites"
              allowed={true}
              route="/favourites"
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <NavItem
              icon={<Search size={20} />}
              label="Search"
              allowed={false}
              route=""
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <NavItem
              icon={<TrendingUp size={20} />}
              label="Trending"
              allowed={false}
              route=""
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-wider uppercase text-gray-500">
            Extras
          </h2>
          <div className="space-y-1">
            <NavItem
              icon={<HelpCircle size={20} />}
              label="Help & Support"
              allowed={false}
              route=""
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              allowed={true}
              route="/settings"
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <NavItem
              icon={<LogOut size={20} />}
              label={user ? "Log Out" : "Log In"}
              onClick={() => {
                if(user){
                  signOut(auth)
                }
                else{
                  setIsAuthModalOpen(true)
                }
              }}
              allowed={true}
              route=""
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  allowed: boolean;
  onClick?: () => void;
  route: string;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

function NavItem({ icon, label, allowed , route, onClick , setIsMobileSidebarOpen}: NavItemProps) {
  return (
    <Link href={route}>
    <Button
      variant="ghost"
      className={cn(
        `w-full justify-start`,
        allowed ? "cursor-pointer" : "cursor-not-allowed"
      )}
      onClick={() => {
        onClick && onClick()
        setIsMobileSidebarOpen(false)
      }}
    >
      {icon}
        <span className="ml-3">{label}</span>
      </Button>
    </Link>
  );
}
