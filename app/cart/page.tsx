"use client"
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"
import { supabase } from "@/lib/supabaseClient"
import Navbar from "@/components/Navbar"
import { FaTrash } from "react-icons/fa"

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

  const cartData=[
    {
      cart_image:"",
      cart_name:"Old Town",
      cart_description:"The city gates of Tallinn",
      cart_location:"Tallinn",
      cart_price:"Free",
    },

    {
      cart_image:"",
      cart_name:"Kiek In de Kok Museum",
      cart_description:"Old Towns historic museum",
      cart_location:"Old Town",
      cart_price:"Free",
    }


  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-8 text-center">My Destinations</h1>
      {cartData.map((data)=>(
      <div
        className="container
         max-w-2xl
         mx-auto
        p-6 
        mb-10
        bg-white 
        border
        border-white-500 
        rounded-lg 
        shadow-lg 
        dark:bg-white-800 
        dark:border-gray-100
        flex 
       ">
            <div className="py-3 pl-1 ">
              <Image
                src="/images/DestinationsPage/gates.png"
                className=" border-2 border-orange-500 rounded-full w-35 h-35"
                alt="Old Town gates"
                width={96}
                height={96}
              />
            </div>

            <div className="pl-4 ">
              <h2 className="text-xl font-bold">{data.cart_name}</h2>
              <p>{data.cart_description}</p>
              <p className="text-black-500 font-bold">{data.cart_location}</p>
              <p className="text-black-500 font-bold">Price of Entry:</p>
              <p className="text-orange-500 font-bold">{data.cart_price}</p>
            </div>

            <div className="mt-12 ml-72">
              <FaTrash className="  content-center justify-items-end " />
            </div>
          </div>   
      ))}
      <br />

      <div
        className="container

        max-w-2xl
        mx-auto
        p-6 
        bg-white 
        border
         border-white-500 
         rounded-lg 
         shadow-lg 
         dark:bg-white-800
        dark:border-gray-100
        flex

       ">
        <div className="py-3 pl-1 ">
          <Image
            src="/images/DestinationsPage/gates.png"
            className=" border-2 border-orange-500 rounded-full w-35 h-35"
            alt="Old Town gates"
            width={96}
            height={96}
          />
        </div>

        <div className="pl-4">
          <h2 className="text-xl font-bold">Kiek In de Kok Museum</h2>
          <p>Old Towns historic museum</p>
          <p className="text-black-500  font-bold">Location: Old Town</p>
          <p className="text-black-500 font-bold">Price of Entry:</p>{" "}
          <h4 className="text-orange-500 font-bold">Free</h4>
        </div>
      </div>

      {/* <div className="space-y-6">
        {destinations.map(destination => (
          <div
            key={destination.id}
            className="flex items-center p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
              <Image
                src={destination.image}
                alt={destination.name}
                width={96}
                height={96}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Old Town</h2>
              <p>The city gates of Tallinn</p>
              <p className="text-gray-500">Location: Tallinn</p>
              <p className="text-gray-500">
                Price of Entry: free
              </p>
            </div>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleRemove(destination.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div> */}

      <div className="flex justify-center mt-8">
        <button
          className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-full"
          onClick={handleAddDestination}>
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
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-lg flex items-center"
          onClick={handleCheckout}>
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
      </div>
    </div>
    </>
  )
}

export default CartPage
