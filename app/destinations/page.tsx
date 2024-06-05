"use client"
import Footer from "@/components/Footer"
import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { FaMap } from "react-icons/fa"
import { destinationsRead, addCart } from "./actions"
import { createClient } from "@/utils/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import MediumButton from "@/components/MediumButton"

export default function page() {
  const [destinations, setDestinations] = useState<any>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await destinationsRead()
        setDestinations(response)
      } catch (error) {
        throw new Error("Error fetching destinations")
      }
    }
    fetchData()
  }, [])

  //function to add destination to cart
  const addToCart = async (destination_id: number) => {
    const { data, error } = await supabase.auth.getUser()
    if (data.user) {
      try {
        await addCart({
          destination_id,
          user_id: data.user.id,
          tour_guide_id: 0,
        })
      } catch (error) {
        console.log(error)
        throw new Error("Error adding to cart")
      }
    } else {
      throw error
    }
  }

  return (
    <>
      <Navbar />
      <div className="text-center mt-5">
        <Heading
          underlinedText="Tourist"
          otherText=" Destinations"
        />
      </div>
      <div className="px-20 grid grid-cols-3 gap-x-10 gap-y-16 py-14">
        {destinations.map((destination: any) => (
          <div
            className="px-5 py-5 bg-white border-[1.5px] rounded-xl"
            key={destination.destinations_id}>
            <Image
              alt="place"
              src={destination.image_path}
              width={500} // Set the appropriate width
              height={300} // Set the appropriate height
            />
            <h1 className="text-sm font-bold pt-5">{destination.name}</h1>
            <p className="pt-3 text-[12.5px]">
              {destination.description.length > 160
                ? destination.description.substring(0, 160) + "..."
                : destination.description}
            </p>
            <div className="flex justify-between">
              <div className="flex gap-5 text-sm pt-3">
                <div className="pt-1">
                  <FaMap />
                </div>
                <p className="font-bold">Location: {destination.location}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    addToCart(destination.destinations_id)
                  }}
                  className="rounded-full w-10 h-10 bg-[#F57906] text-white text-3xl text-center">
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#F57906] font-bold">
                Cost: {destination.price}€ per person
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="pt-5">
                  <button className="bg-[#F57906] w-full py-2 rounded-md text-sm text-white font-bold">
                    Read More
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent
                style={{ backgroundColor: "white" }}
                className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    {destination.name}
                  </DialogTitle>
                  <DialogDescription className="pt-3">
                    <Image
                      alt="place"
                      src={destination.image_path}
                      width={500}
                      height={300}
                    />
                    <div className="flex gap-5 text-sm pt-3 text-black">
                      <div className="pt-1">
                        <FaMap />
                      </div>
                      <p className="font-bold">
                        Location: {destination.location}
                      </p>
                    </div>
                    <p className="text-base text-[#F57906] font-bold pt-2">
                      Cost: {destination.price}€ per person
                    </p>
                    <p className="mt-2 text-gray-700">
                      {destination.description}
                    </p>
                    <div className="flex justify-center align-middle mt-5">
                      <MediumButton>Add to cart</MediumButton>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
