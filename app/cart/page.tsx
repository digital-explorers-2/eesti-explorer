"use client"
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"
import { supabase } from "@/lib/supabaseClient"
import Navbar from "@/components/Navbar"
import { FaTrash } from "react-icons/fa"
import Heading from "@/components/Heading"

type Destination = {
  id: number
  description: string
  name: string
  location: string
  price: string
  image: string
}

const CartPage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const response = await axios.get("/api/destinations", {
        params: { user_id: supabase.auth.getUser() },
      })

      setDestinations(response.data)
    } catch (error) {
      console.error("Error fetching destinations:")
    }
  }

  const handleRemove = async (id: number) => {
    try {
      await axios.delete("/api/destinations", {
        params: { id, user_id: supabase.auth.getUser() },
      })

      setDestinations(destinations.filter(destination => destination.id !== id))
    } catch (error) {
      console.error("Error removing destination:")
    }
  }

  const handleCheckout = () => {
    // Redirect to the checkout page
    window.location.href = "/checkout"
  }

  const handleAddDestination = () => {
    // Redirect to the add destination page
    window.location.href = "/add-destination"
  }

  const cartData = [
    {
      cart_image: "",
      cart_name: "Old Town",
      cart_description: "Kiek in de Kök: Tallinn's medieval tower offering panoramic views and historical insights into the city's fortifications and defense strategies.",
      cart_location: "Tallinn",
      cart_price: "Free",
    },

    {
      cart_image: "",
      cart_name: "Kiek In de Kok Museum",
      cart_description: "Kiek in de Kök: Tallinn's medieval tower offering panoramic views and historical insights into the city's fortifications and defense strategies.",
      cart_location: "Old Town",
      cart_price: "10 €",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="p-6 ">
        <div className="text-center mb-10">
          <Heading underlinedText="Cart" otherText=" Destinations" />
        </div>
        {cartData.map(data => (
          <div className="mx-32 p-6 mb-10 bg-white border border-white-500 rounded-lg shadow-lg dark:bg-white-800 dark:border-gray-100 flex">
            <div className="py-3 pl-1 ">
              <Image
                src="/images/DestinationsPage/gates.png"
                className="rounded-full w-35 h-35"
                alt="Old Town gates"
                width={150}
                height={96}
              />
            </div>

          <div className="flex">
            <div className="pl-4 mt-5">
              <h2 className="text-sm font-bold">{data.cart_name}</h2>
              <p className="text-xs pt-3">{data.cart_description}</p>
              <p className="text-xs text-black-500 font-bold pt-3">Location: {data.cart_location}</p>
              <div className="flex gap-3 mt-3">
                <p className="text-black-500 font-bold text-sm">Price of Entry:</p>
                <p className="text-orange-500 font-bold text-sm">{data.cart_price}</p>
              </div>
            </div>

            <div className="mt-14 ml-5">
              <FaTrash className="text-orange-500 text-lg content-center justify-items-end " />
            </div>
          </div>
          </div>
        ))}
        <br />

        <div className="flex justify-center mt-4">
          <a href="/destinations">
          <button className="text-white bg-orange-500 hover:bg-orange-600 font-bold p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          </a>
        </div>

        <div className="flex justify-center mt-8">
          <a href="/tour-guide">
          <button
            className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Choose Tour Guide and Checkout
          </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default CartPage