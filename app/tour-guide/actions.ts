"use server"

import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export async function guideRead() {
  const { data, error } = await supabase.from("tour_guides").select("*")
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}
