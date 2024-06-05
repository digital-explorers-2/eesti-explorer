"use client"

import Footer from "@/components/Footer"
import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { BiWorld } from "react-icons/bi"
import { RiMoneyEuroBoxLine } from "react-icons/ri"
import { billingRead } from "./actions"
import error from "next/error"

const PaymentPage = () => {
  const [billing, setBilling] = useState<any>(null)

  useEffect(() => {
    fetchBilling()
  }, [])

  const fetchBilling = async () => {
    try {
      const billing = await billingRead({ id: 1 })
      setBilling(billing)
    } catch (error) {
      console.error("Error fetching billing:", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="text-center mt-5">
        <Heading
          underlinedText="Payment"
          otherText=" Details"
        />
      </div>
      <div className="flex justify-center mt-8">
        <form
          action="/charge"
          method="post"
          id="payment-form">
          <div className="form-row">
            <label htmlFor="card-element">Credit or debit card</label>
            <div id="card-element"></div>
            <div
              id="card-errors"
              role="alert"></div>
          </div>
          <button
           className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center">Submit Payment</button>
        </form>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center">
          Pay €{billing?.amount}
        </button>
      </div>

      <Footer />
    </>
  )

}
export default PaymentPage
