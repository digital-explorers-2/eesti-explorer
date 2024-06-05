"use server"

import { createClient } from "@/utils/supabase/server"
//import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
//import { Button } from "@/components/ui/button";

type Destination = {
  destinations_id: number
  name: string
  image_path: string
  description: string
  price: number
  location: string
}
const supabase = createClient()

// reads one destination for search functionality
export async function destinationRead({ id }: { id: number }) {
  const { data, error } = await supabase
    .from("destinations")
    .select()
    .eq("destination_id", id)
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}
// a function to read all destinations
export async function destinationsRead() {
  const { data, error } = await supabase.from("destinations").select("*")
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}
// a function that adds a destination to the cart after the user clicks the add button
export async function addCart({ id }: { id: number }) {
  const { error } = await supabase.from("cart").insert([{ destination_id: id }])
  if (error) {
    console.error("Error adding to cart:", error.message)
  } else {
    console.log("Added to cart successfully!")
  }
}
