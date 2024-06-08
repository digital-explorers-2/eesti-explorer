'use client'
import {useEffect, useState} from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { readDestinations } from "@/app/admin/destinations/actions"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"

export default function Destinations() {
  const [destinations, setdestinations] = useState<any[]>([])
  useEffect(()=>{
    const fetchCount = async () =>{
      try{
        const response = await readDestinations();
        if(response){
          setdestinations(response)
        }
      }
      catch(error){
        console.log("Could not fetch counts ", error)
      }
    }
    fetchCount();
  },[])

  return (
    <div
      id="tour-guides-section"
      className="mx-5">
      <div className="mt-10 flex flex-col gap-4">
        {destinations.map(destination => (
          <div key={destination.destinations_id} className="border-[1.3px] rounded-lg px-7 py-2  border-[#D3CBFB] w-[96%] flex gap-20 align-middle justify-center">
            <div className="w-10 flex justify-center align-middle">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={destination.image_path}
                  alt="@shadcn"
                />
                <AvatarFallback>{destination.name}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-5 mt-1 gap-12 text-left">
                <p className="text-xs font-bold">{destination.name}</p>
                <p className="text-[#797D8C] text-xs text-start">{destination.description.slice(0,5)}</p>
                <p className="text-[#797D8C] text-xs">{destination.price} €/hour</p>
                <p className="text-[#797D8C] text-xs">{destination.location}</p>
                <p className="text-[#797D8C] text-xs">rating: {destination.rating}</p>
            </div>
            <div className="flex items-center align-middle gap-4">
                <EditButton>Edit</EditButton>
                <DeleteButton>Delete</DeleteButton>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}
