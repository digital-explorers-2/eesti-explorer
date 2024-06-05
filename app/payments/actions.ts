"use server"

import { createClient } from "@/utils/supabase/server"
import StripeCardError from "stripe"

export async function Stripe() {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
  const express = require("express")
  const app = express()
  app.post("/charge", async (req: { body: { amount: any; token: any } }, res: { send: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any } } }) => {
    const { amount, token } = req.body

    try {
      const charge = await stripe.charges.create({
        amount,
        currency: "eur",
        source: token.id,
        description: "Charge for test@example.com",
      })

      res.send("Payment successful")
    } catch (err: any) {
      console.error("Error processing payment:", err)
      let message = "An error occurred while processing your payment."

      if (err?.type === "StripeCardError") {
        message = err.message
      }

      res.status(500).send(message)
    }
  })
}

// reads the billing amount for a specific id from the billing table
export async function billingRead({ id }: { id: number }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("billing")
    .select()
    .eq("billing_id", id)
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}
