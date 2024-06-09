"use server"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient();

// reads one tourguide for search functionality
export async function tourGuideRead({ id }: { id: number }) {
  const { data, error } = await supabase
    .from("tour_guides")
    .select()
    .eq("tourGuides_id", id)
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}

// a function to read all tourguides
export async function tourGuidesRead() {
  const { data, error } = await supabase.from("tour_guides").select("*")
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}
