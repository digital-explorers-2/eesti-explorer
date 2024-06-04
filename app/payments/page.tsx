"use client"
import Footer from "@/components/Footer"
import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { BiWorld } from "react-icons/bi"
import { RiMoneyEuroBoxLine } from "react-icons/ri"
import { guideRead } from "../tour-guide/actions"

export default function Payments() {
  return (
    <>
      <Navbar />
      <div className="text-center mt-5">
        <Heading
          underlinedText="Payment"
          otherText=" Details"
        />
      </div>
      {/*<div className="grid grid-cols-1 gap-x-10 gap-y-16 py-14">
        <div className="px-5 py-5 bg-white border-[1.5px] rounded-xl">
          <div className="flex align-middle  justify-center">
            <Image
              alt="payment"
              src="/images/payment.jpg"
              width={300} // Set the appropriate width
              height={100} // Set the appropriate height
            />
          </div>
          <h1 className="text-sm font-bold pt-5">Payment Details</h1>
          <div className="justify-between">
            <div className="flex gap-5 text-sm pt-3">
              <div className="pt-1">
                <RiMoneyEuroBoxLine />
              </div>
              <p>Payment details</p>
            </div>
          </div>
        </div>
  </div>*/}
      <div className="flex justify-center mt-8">
        <button className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Pay
        </button>
      </div>

      <Footer />
    </>
  )
}
