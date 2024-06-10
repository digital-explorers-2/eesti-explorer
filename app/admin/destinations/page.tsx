"use client"
import SideBar from "@/components/Admin/SideBar"
import TopCards from "@/components/Admin/TopCards"
import TopNav from "@/components/Admin/TopNav"
import Destinations from "@/components/Admin/Destinations/destinations"
import TourGuides from "@/components/Admin/Guides/TourGuides"

export default function guides() {
  return (
    <div className="flex">
      <SideBar />
      <div
        id="main"
        className="rounded-3xl -ml-5 bg-white w-full pl-5">
        <TopNav />
        <TopCards />
        <Destinations/>
      </div>
    </div>
  )
}
