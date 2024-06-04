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
import { destinationsRead } from "./actions"

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

export default function page() {
  const [destinations, setDestinations] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await destinationsRead()
        setDestinations(response)
        console.log(response)
      } catch (error) {
        throw new Error("Error fetching destinations")
      }
    }
    fetchData()
  }, [])
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
                <button className="rounded-full w-10 h-10 bg-[#F57906] text-white text-3xl text-center">
                  +
                </button>
              </div>
            </div>
            <div className="pt-5">
              <button className="bg-[#F57906] w-full py-2 rounded-md text-sm text-white font-bold">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
