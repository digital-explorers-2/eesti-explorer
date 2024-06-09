"use server"

import { createClient } from "@/utils/supabase/server"
// function display one payment for search functionality


const supabase = createClient()
export async function paymentRead({ id }: { id: number }) {

  const { data, error } = await supabase
    .from("payments")
    .select()
    .eq("payment_id", id)
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}
// function to display all payments 
export async function paymentsRead() {
  const { data, error } = await supabase.from("payments").select("*")
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}

// function to display user name of specific billing id from supabase auth
export async function userRead({ id }: { id: number }) {
  const { data, error } = await supabase
    .from("payments" && "user_metadata")
    .select("Display Name")
    .eq("user_id", id)
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}

