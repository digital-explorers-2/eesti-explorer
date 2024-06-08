"use client"
import Footer from "@/components/Footer"
import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Kadriog from "@/components/images/DestinationsPage/kadriog.png"
import Gates from "@/components/images/DestinationsPage/gates.png"
import KumuArt from "@/components/images/DestinationsPage/kumu_art.png"
import NarvaBog from "@/components/images/DestinationsPage/narva_bog.png"
import ParnuTower from "@/components/images/DestinationsPage/parnu_tower.png"
import TallinnCityMuseum from "@/components/images/DestinationsPage/tallinn_city_museum.png"
import { FaMap } from "react-icons/fa"


const DestinationsDetails = [
  {
    id: 1,
    image: Kadriog,
    title: "Old Town",
    description:
      "Old Town: Historic charm, cobblestone streets, quaint shops, and cultural delights lure visitors to its timeless embrace. Nestled within ancient city walls, Old Town offers a mesmerizing journey through history with its medieval architecture, vibrant markets, and cozy cafes.",
    location: "Tallinn",
  },
  {
    id: 2,
    image: Gates,
    title: "Gates",
    description:
      "Gates: The Gates of Alexander Nevsky Cathedral are a must-see for any visitor to Tallinn. The cathedral is one of the most iconic landmarks in the city, and the gates are a beautiful example of Russian architecture.",
    location: "Tallinn",
  },
  {
    id: 3,
    image: KumuArt,
    title: "Kumu Art Museum",
    description:
      "Kumu Art Museum: Kumu is the largest and most impressive art museum in Estonia. It is home to an extensive collection of Estonian art, from the 18th century to the present day.",
    location: "Tallinn",
  },
  {
    id: 4,
    image: NarvaBog,
    title: "Narva Bog",
    description:
      "Narva Bog: Narva Bog is a beautiful natural area in northeastern Estonia. It is home to a diverse range of plant and animal species, and is a popular destination for nature lovers and hikers.",
    location: "Narva",
  },
  {
    id: 5,
    image: ParnuTower,
    title: "Parnu Tower",
    description:
      "Parnu Tower: Parnu Tower is a historic landmark in the city of Parnu, Estonia. It is one of the oldest surviving buildings in the city, and is a popular destination for tourists and history buffs.",
    location: "Parnu",
  },
  {
    id: 6,
    image: TallinnCityMuseum,
    title: "Tallinn City Museum",
    description:
      "Tallinn City Museum: The Tallinn City Museum is a must-see for anyone interested in the history and culture of the city. The museum is home to a wide range of exhibits, including artifacts from the medieval period to the present day.",
    location: "Tallinn",
  },
]
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default function Page() {
  const [destinations, setDestinations] = useState<any>([])
  const [alert, setAlert] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  })
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await destinationsRead()
        setDestinations(response)
        console.log(response)
      } catch (error) {
        console.error("Error fetching destinations", error)
      }
    }
    fetchData()
  }, [])

  // function to add destination to cart
  const addToCart = async (destination_id: number) => {
    const { data, error } = await supabase.auth.getUser()
    if (data.user) {
      try {
        await addCart({
          destination_id,
          user_id: data.user.id,
          tour_guide_id: 0,
        })
        setAlert({ visible: true, message: "Added to cart successfully!" })
        setTimeout(() => {
          setAlert({ visible: false, message: "" })
        }, 5000) // Hide alert after 5 seconds
      } catch (error) {
        console.error("Error adding to cart", error)
      }
    } else {
      console.error("User not authenticated", error)
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
            key={destination.destinations_id}
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
            <div className="pt-5">
              <button className="bg-[#F57906] w-full py-2 rounded-md text-sm text-white font-bold">
                Read More
              </button>
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
                      <MediumButton onClick={() => {addToCart(destination.destinations_id)}}>Add to cart</MediumButton>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      {alert.visible && (
        <div className="fixed bottom-5 right-5 z-50">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {alert.message}
              <br />
              <a
                href="/cart"
                className="text-orange-500">
                Proceed to Cart
              </a>
              <br />
              <a
                href="/destinations"
                className="text-gray-500">
                Continue Shopping
              </a>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Footer />
    </>
  )
}
