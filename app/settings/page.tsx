"use client"

import React from "react"
import Link from "next/link"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import SearchBar from "@/components/Search"
import Sidebar from "@/components/Sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "../AuthContext"
import { Button } from "@/components/ui/button"

function SettingsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 h-[100vh] overflow-y-auto overflow-x-hidden">
      <SearchBar />
      <Skeleton className="h-12 w-48 mb-2" />
      <div className="mt-5 pt-4 border-t border-gray-400">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="mt-5 pt-4 border-t border-gray-400">
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-8 w-48 mb-2" />
      </div>
    </div>
  )
}

function Settings() {
  const {user ,  userData, loading, setIsAuthModalOpen } = useAuth()

  if (loading) {
    return (
      <main className="flex gap-7">
        <Sidebar />
        <SettingsSkeleton />
      </main>
    )
  }

  return (
    <main className="flex gap-7">
      <Sidebar />
      <div className="container mx-auto px-4 py-8 h-[100vh] overflow-y-auto overflow-x-hidden">
        <SearchBar />
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        {user ? <>
          <div className="mt-5 pt-4 border-t border-gray-400">
          <h2 className="text-xl font-semibold mb-2">
            Your Subscription Plan
          </h2>
          <p className="text-base mb-2">{userData?.plan.toUpperCase() || "BASIC"}</p>
          {userData?.plan === "basic" && (
            <Link href="/plans">
              <button className="bg-purple-500 flex gap-1 font-bold items-center text-white px-4 py-2 rounded-md">
                Upgrade <LightningBoltIcon className="w-4 h-4 ml-2" />
              </button>
            </Link>
          )}
        </div>
        <div className="mt-5 pt-4 border-t border-gray-400">
          <h2 className="text-base font-semibold mb-2">Email</h2>
          <p className="text-xl mb-2">{userData?.email || "guest1234@gmail.com"}</p>
        </div>
        </> : <div className="flex flex-col gap-4 justify-center items-center">
          <img src="/images/login.png" alt="login" className="w-[50%]" />
          <p className="text-xl font-semibold mb-2">Login To See Your Settings</p>
          <Button onClick={()=>{setIsAuthModalOpen(true)}} variant="outline" className="bg-purple-500 flex gap-1 font-bold items-center text-white px-4 py-2 rounded-md">
              Login <LightningBoltIcon className="w-4 h-4 ml-2" />
          </Button>
          </div>}
      </div>
    </main>
  )
}

export default Settings