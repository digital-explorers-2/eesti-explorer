"use client"

import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { readBilling } from "@/app/billing/actions"
import { createClient } from "@/utils/supabase/client"

const asyncStripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
)

export default function CheckoutBtn(): JSX.Element {
  const router = useRouter()
  const [destinationFee, setDestinationFee] = useState<number>(0)
  const [tourGuideFee, setTourGuideFee] = useState<number>(0)
  const serviceFee = 5
  const grandTotal = destinationFee + tourGuideFee + serviceFee
  const [isMounted, setIsMounted] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    setIsMounted(true)
    const handleReadBilling = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          throw new Error(error.message)
        }
        const response = await readBilling(data.user.id)
        if (response) {
          setDestinationFee(response.sum)
          setTourGuideFee(response.guide)
        }
      } catch (error) {
        console.log("Error fetching billing")
      }
    }
    handleReadBilling()
  }, [])

  const handler = async () => {
    if (!isMounted) return // Ensure the handler runs only on client side
    try {
      const stripe = await asyncStripe
      const res = await fetch("/api/stripe/session", {
        method: "POST",
        body: JSON.stringify({ amount: grandTotal }),
        headers: { "Content-Type": "application/json" },
      })
      const { sessionId } = await res.json()

      if (stripe) {
        console.log("stripe yes")
        const stripeResult = await stripe.redirectToCheckout({ sessionId })
        if (stripeResult?.error) {
          throw new Error(stripeResult.error.message)
        }
      }
    } catch (err) {
      console.log(err)
      router.push("/error")
    }
  }

  if (!isMounted) {
    return <></>
    console.log("Error") // Render nothing until the component is mounted
  }
// checkout button
  return (
    <button
    type="button"
      onClick={handler}
      className="bg-[#F57906] w-full py-3 rounded-lg text-sm text-white font-bold">
      Checkout €{grandTotal}
    </button>
  )
}

