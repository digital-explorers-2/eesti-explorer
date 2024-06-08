"use client"
import Destinations from "@/components/Admin/Destinations/destinations"
import SideBar from "@/components/Admin/SideBar"
import TopCards from "@/components/Admin/TopCards"
import TopNav from "@/components/Admin/TopNav"

export default function page() {

  return (
    <div className="flex">
      <SideBar />
      <div
        id="main"
        className="rounded-3xl -ml-5 bg-white w-full pl-5">
        <TopNav />
        <TopCards/>
        <Destinations/>
      </div>
    </div>
  )
}
