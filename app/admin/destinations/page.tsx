"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  readDestinations,
  deleteDestination,
  updateDestination,
  createDestination
} from "@/app/admin/destinations/actions"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import LargeButton from "@/components/LargeButton"
import MediumButton from "@/components/MediumButton"

export default function Destinations() {
  const [destinations, setdestinations] = useState<any[]>([])
  const [destinationName, setDestinationName] = useState<string>("")
  const [destinationLocation, setDestinationLocation] = useState<string>("")
  const [destinationDescription, setDestinationDescription] = useState<string>("")
  const [destinationRating, setDestinationRating] = useState<number>(0)
  const [destinationImage, setDestinationImage] = useState<string>("")
  const [destinationPrice, setDestinationPrice] = useState<number>(0)

  //delete destination
  const handleDelete = async (id: number) => {
    try {
      const response = await deleteDestination(id)
      destinations.filter(destination => destination.destinations_id !== id)
      console.log("Destination deleted successfully")
    } catch (error) {
      console.log("Could not delete destination ", error)
    }
  }

  //create destination
  const handleCreate = async () => {
    try {
      const response = await createDestination(
        destinationName,
        destinationDescription,
        destinationRating,
        destinationImage,
        destinationPrice
      )
      console.log("Destination created successfully")
    } catch (error) {
      console.log("Could not create destination ", error)
    }
  }

  //update destinations
  const handleUpdate = async (destinationId:number) => {
    try {
      const response = await updateDestination(
        destinationId,
        destinationImage,
        destinationName,
        destinationDescription,
        destinationLocation,
        destinationRating,
        destinationPrice
      )
      console.log("Destination updated successfully")
    } catch (error) {
      console.log("Could not update destination ", error)
    }
  }

  //this fills the values of the input to allow for edits
  const handleEdit = (image:string, name: string, description: string, location:string, rating:number, price:number) => {
    setDestinationImage(image)
    setDestinationName(name)
    setDestinationLocation(location)
    setDestinationDescription(description)
    setDestinationRating(rating)
    setDestinationPrice(price)
  }

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await readDestinations()
        if (response) {
          setdestinations(response)
        }
      } catch (error) {
        console.log("Could not fetch counts ", error)
      }
    }
    fetchCount()
  }, [handleDelete])

  return (
    <div
      id="tour-guides-section"
      className="mx-5">
      <div className="mt-10 flex flex-col gap-4">
        {destinations.map(destination =>(
          <div
            key={destination.destinations_id}
            className="border-[1.3px] rounded-lg px-7 py-2  border-[#D3CBFB] w-[96%] flex gap-20 align-middle justify-center">
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
              <p className="text-[#797D8C] text-xs text-start">
                {destination.description.slice(0, 20)}
              </p>
              <p className="text-[#797D8C] text-xs">
                {destination.price} €/hour
              </p>
              <p className="text-[#797D8C] text-xs">{destination.location}</p>
              <p className="text-[#797D8C] text-xs">
                rating: {destination.rating}
              </p>
            </div>
            <div className="flex items-center align-middle gap-4">
              {/* edit dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <EditButton onClick={()=>handleEdit(destination.image_path, destination.name, destination.description, destination.location, destination.rating, destination.price)}>Edit</EditButton>
                  </div>
                </DialogTrigger>
                <DialogContent
                  style={{ backgroundColor: "white" }}
                  className="sm:max-w-[425px]">
                  <DialogHeader>
                    <h1 className="font-bold">Edit Destination</h1>
                    <DialogDescription className="pt-3">
                      <Image
                        alt="place"
                        src={destination.image_path}
                        width={500}
                        height={300}
                      />
                      <div className="mt-2">
                        <input className="w-full" type="file" accept="image/png" src={destinationImage} onChange={(e)=>{setDestinationImage(e.target.name)}} />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">Name</label>
                        <input className="border px-2 py-1 rounded-lg border-gray-700" type="text" value={destinationName} onChange={(e)=>{setDestinationName(e.target.value)}}  />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">Location:</label>
                        <input className="border px-2 py-1 rounded-lg border-gray-700" type="text" value={destinationLocation} onChange={(e)=>{setDestinationLocation(e.target.value)}} />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">Description</label>
                        <textarea className="border px-2 py-1 rounded-lg border-gray-700 w-full" value={destinationDescription} onChange={(e)=>{setDestinationDescription(e.target.value)}} />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">Rating</label>
                        <input className="border px-2 py-1 rounded-lg border-gray-700 w-full" type="number" value={destinationRating} onChange={(e)=>{setDestinationRating(parseInt(e.target.value))}} />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">Cost:</label>
                        <input className="border px-2 py-1 rounded-lg border-gray-700" type="number" value={destinationPrice} onChange={(e)=>{setDestinationPrice(parseInt(e.target.value))}} />
                      </div>
                      <div className="flex justify-center align-middle mt-5">
                        <EditButton onClick={()=>handleUpdate(destination.destinations_id)}>Edit</EditButton>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <DeleteButton
                onClick={() => {
                  handleDelete(destination.destinations_id)
                }}>
                Delete
              </DeleteButton>
            </div>
          </div>
        ))}
      </div>
      {/* create a destination */}
      <Dialog>
        <DialogTrigger asChild>
        <div className="mt-3 flex justify-center">
          <LargeButton>Add destination</LargeButton>
        </div>
        </DialogTrigger>
        <DialogContent
          style={{ backgroundColor: "white" }}
          className="sm:max-w-[425px]">
          <DialogHeader>
            <h1 className="font-bold">Create Destination</h1>
            <DialogDescription className="pt-3">
              {/* <Image
                alt="place"
                src={destinationImage}
                width={500}
                height={300}
              /> */}
              <div className="mt-2">
                <input className="w-full" type="file" accept="image/png" src={destinationImage} onChange={(e)=>{setDestinationImage(e.target.name)}} />
              </div>
              <div className="flex gap-5 text-sm pt-3 text-black">
                <label className="pt-1 text-[#F57906] font-bold">Name</label>
                <input className="border px-2 py-1 rounded-lg border-gray-700" type="text" value={destinationName} onChange={(e)=>{setDestinationName(e.target.value)}}  />
              </div>
              <div className="flex gap-5 text-sm pt-3 text-black">
                <label className="pt-1 text-[#F57906] font-bold">Location:</label>
                <input className="border px-2 py-1 rounded-lg border-gray-700" type="text" value={destinationLocation} onChange={(e)=>{setDestinationLocation(e.target.value)}} />
              </div>
              <div className="flex gap-5 text-sm pt-3 text-black">
                <label className="pt-1 text-[#F57906] font-bold">Description</label>
                <textarea className="border px-2 py-1 rounded-lg border-gray-700 w-full" value={destinationDescription} onChange={(e)=>{setDestinationDescription(e.target.value)}} />
              </div>
              <div className="flex gap-5 text-sm pt-3 text-black">
                <label className="pt-1 text-[#F57906] font-bold">Rating</label>
                <input className="border px-2 py-1 rounded-lg border-gray-700 w-full" type="number" value={destinationRating} onChange={(e)=>{setDestinationRating(parseInt(e.target.value))}} />
              </div>
              <div className="flex gap-5 text-sm pt-3 text-black">
                <label className="pt-1 text-[#F57906] font-bold">Cost:</label>
                <input className="border px-2 py-1 rounded-lg border-gray-700" type="number" value={destinationPrice} onChange={(e)=>{setDestinationPrice(parseInt(e.target.value))}} />
              </div>
              <div className="flex justify-center align-middle mt-5">
                <MediumButton onClick={()=>handleCreate()}>Add Destination</MediumButton>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
