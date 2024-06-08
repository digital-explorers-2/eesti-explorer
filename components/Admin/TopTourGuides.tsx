import {useEffect, useState} from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { topTourGuides } from "@/app/admin/action"

export default function TopTourGuides() {
  const [tourGuides, setTourGuides] = useState<any[]>([])
  useEffect(()=>{
    const fetchCount = async () =>{
      try{
        const response = await topTourGuides();
        if(response){
          setTourGuides(response)
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
      <h1 className="text-sm font-bold">Top tour guides</h1>
      <div className="mt-3 flex flex-col gap-4">
        {tourGuides.map(tourGuide => (
          <div key={tourGuide.tourGuides_id} className="border-[1.3px] rounded-lg px-7 py-2  border-[#D3CBFB] w-[96%] flex gap-20 align-middle justify-center">
            <div>
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src={tourGuide.image_path}
                  alt="@shadcn"
                />
                <AvatarFallback>{tourGuide.firstname}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex mt-1 gap-20">
              <p className="text-[#797D8C] text-sm">{tourGuide.firstname} {tourGuide.lastname}</p>
              <p className="text-sm font-bold">rating: {tourGuide.rating}</p>
              <p className="text-[#797D8C] text-sm">{tourGuide.fee} euros/hour</p>
              <p className="text-[#797D8C] text-sm">{tourGuide.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
