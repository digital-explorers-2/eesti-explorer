"use server"
import { createClient } from "@/utils/supabase/server"
import { NextApiRequest, NextApiResponse } from "next"

type Cart = {
  cart_id: number
  destinations_id: number
  tour_guide_id: number
 
}

const supabase = createClient()

// Fetch destinations for a specific user
export const getDestinations = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { user_id } = req.query
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("user_id", user_id)

    if (error) {
      console.error("Error fetching record:", error.message)
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Error" })
  }
}

// Remove destination from cart
export const removeDestination = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id, user_id } = req.query
    const { error } = await supabase
      .from("destinations")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id)

    if (error) {
      throw error
    }

    res.status(200).json({ message: "Destination removed successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error" })
  }
}
