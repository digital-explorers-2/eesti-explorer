"use client"
import MainCharts from "@/components/Admin/MainCharts"
import SideBar from "@/components/Admin/SideBar"
import TopCards from "@/components/Admin/TopCards"
import TopNav from "@/components/Admin/TopNav"

export default function page() {
  return (
    <div className="flex">
      <SideBar />
      <div
        id="main"
        className="rounded-3xl -ml-5 bg-white w-full">
        <TopNav />
        <TopCards />
        <MainCharts />
        <div>
          
        </div>
      </div>
    </div>
  )
}
