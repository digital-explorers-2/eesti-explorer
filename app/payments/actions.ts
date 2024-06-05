"use server"

import { createClient } from "@/utils/supabase/server"

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
