"use client"


import CheckoutBtn from "@/components/Checkout";
import React, { useEffect, useState, useRef } from "react"
import Navbar from "@/components/Navbar"
import Heading from "@/components/Heading"
import { readBilling } from "@/app/billing/actions"
import { createClient } from "@/utils/supabase/client"

export default function PaymentPage() {
const paymentFormRef = useRef(null)
const supabase = createClient()

const [destinationFee, setDestinationFee] = useState<number>(0)
    const [tourGuideFee, setTourGuideFee] = useState<any>(0)
    const serviceFee = 5
    const grandTotal = destinationFee + tourGuideFee + serviceFee

  const billingData = [
    {
      fee_type: "Destination Fees",
      fee_description: "Includes entry fee charges, and activity charges",
      fee_cost: destinationFee + " euros",
    },

    {
      fee_type: "Tour Guide Fees",
      fee_description: "Includes entry fee charges, and activity charges",
      fee_cost: tourGuideFee + " euros",
    },

    {
      fee_type: "Service Fees",
      fee_description: "Includes entry fee charges, and activity charges",
      fee_cost: serviceFee + " euros",
    },
  ]


useEffect(() => {
  const handleReadBilling = async () => {
      try {
          const { data, error } = await supabase.auth.getUser()
          if (error) {
              throw new Error(error.message)
          }
          const response = await readBilling(data.user.id)
          if(response){
             setDestinationFee(response.sum)
             setTourGuideFee(response.guide)
          }
      } catch (error) {
          console.log("Error fetching billing")
      }
  }
  handleReadBilling()
}, [])

  return (
    <>
    <Navbar />
    <div className="text-center mt-5">
      <Heading
        underlinedText="Payment"
        otherText=" Details"
      />
    </div>
    <div className="mx-72 pt-20 flex flex-col gap-10 border-b-4 pb-16">
        {billingData.map(data => (
          <div className=" flex justify-between">
            <div className="">
              <h1 className="text-lg font-semibold">{data.fee_type}</h1>
              <p className=" text-sm pt-5 text-gray-500">
                {data.fee_description}{" "}
              </p>
            </div>
            <div>
              <h1 className="font-bold text-xl pt-2">{data.fee_cost}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mx-72 pt-10 pb-10 ">
        <div>
          <h1 className="text-2xl font-bold">Grand Total</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold ">{grandTotal} euros</h1>
        </div>
      </div>
    <div className="flex justify-center mt-8">
      <form  method="post" id="payment-form" ref={paymentFormRef}>
        <div className="form-row">
          <div id="card-element"></div>
          <div id="card-errors" role="alert"></div>
        </div>
        <CheckoutBtn/>
      </form>
    </div>
  </>
  );
}


{/*"use client"

import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState, useRef } from "react"
import { billingRead, googlePayments } from "./actions"

const PaymentPage = () => {
  const [billing, setBilling] = useState<any>(null)
  const paymentFormRef = useRef(null)

  useEffect(() => {
    fetchBilling()
    initializeGooglePayments()
  }, [])

  const fetchBilling = async () => {
    try {
      const billing = await billingRead({ id: 1 })
      setBilling(billing)
    } catch (error) {
      console.error("Error fetching billing:", error)
    }
  }

  const initializeGooglePayments = () => {
    googlePayments()
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
        <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
        <form action=" " method="post" id="payment-form" ref={paymentFormRef}>
          <div className="form-row">
            <label htmlFor="card-element">Credit or debit card</label>
            <div id="card-element"></div>
            <div id="card-errors" role="alert"></div>
          </div>
          <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center">
            Buy with
            <img
              src="https://img.icons8.com/?size=100&id=Z5pgoU6ueRre&format=png&color=000000"
              alt="Google Pay"
              className="w-6 h-6 ml-2"
              width= "20px"
              height= "20px"
            />
            €{billing ? billing[0].amount : 0}
          </button>
        </form>
      </div>
    </>
  )
}
export default PaymentPage */}



{/*"use client"

import { google } from "googleapis"
import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState, useRef } from "react"
import { billingRead } from "./actions"


const PaymentPage = () => {
  const [billing, setBilling] = useState<any>(null)
  const paymentFormRef = useRef(null)

  useEffect(() => {
    fetchBilling()
    initializeGooglePayments()
  }, [])

  const fetchBilling = async () => {
    try {
      const billing = await billingRead({ id: 1 })
      setBilling(billing)
    } catch (error) {
      console.error("Error fetching billing:", error)
    }
  }

  const initializeGooglePayments = async () => {
    try {
      const response = await fetch("/api/google-pay")
      const googlePaymentRequest = await response.json()

      const paymentsClient = new google.payments.api.PaymentsClient({
        environment: "TEST",
      })

      const isReadyToPayRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: googlePaymentRequest.allowedPaymentMethods,
      }

      paymentsClient
        .isReadyToPay(isReadyToPayRequest)
        .then(function (response: any) {
          if (response.result) {
            // add a Google Pay payment button
            const button = paymentsClient.createButton({
              onClick: () => {
                paymentsClient
                  .loadPaymentData(googlePaymentRequest)
                  .then(function (paymentData: any) {
                    // if using gateway tokenization, pass this token without modification
                    const paymentToken =
                      paymentData.paymentMethodData.tokenizationData.token
                    console.log("Payment Token:", paymentToken)
                  })
                  .catch(function (err: any) {
                    // show error in developer console for debugging
                    console.error(err)
                  })
              },
              allowedPaymentMethods: googlePaymentRequest.allowedPaymentMethods,
            })
            if (paymentFormRef.current) {
              ;(paymentFormRef.current as HTMLFormElement).appendChild(button)
            }
          }
        })
        .catch(function (err: any) {
          // show error in developer console for debugging
          console.error(err)
        })
    } catch (error) {
      console.error("Error initializing Google Payments:", error)
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
        <script
          async
          src="https://pay.google.com/gp/p/js/pay.js"></script>
        <form
          action=""
          method="post"
          id="payment-form"
          ref={paymentFormRef}>
          <div className="form-row">
            <label htmlFor="card-element">Credit or debit card</label>
            <div id="card-element"></div>
            <div
              id="card-errors"
              role="alert"></div>
          </div>
          <button
            type="submit"
            className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center">
            Submit Payment
          </button>
        </form>
      </div>
      <div className="flex justify-center mt-8">
        <button className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center">
          Pay €{billing ? billing[0].amount : 0}
        </button>
      </div>
    </>
  )
}

export default PaymentPage*/}




