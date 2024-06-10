"use client"

import MainCharts from "@/components/Admin/MainCharts"
import SideBar from "@/components/Admin/SideBar"
import TopCards from "@/components/Admin/TopCards"
import TopNav from "@/components/Admin/TopNav"
import Pay from "@/components/Admin/PaymentPage/Payments"

export default function Payments() {
  return (
    <div className="flex">
      <SideBar />
      <div
        id="main"
        className="rounded-3xl -ml-5 bg-white w-full pl-5">
        <TopNav />
        <TopCards />
        <Pay />
      </div>
    </div>
  )
}
