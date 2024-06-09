import { useEffect, useState } from "react"
import {IoLocationOutline} from "react-icons/io5"
import {FaArrowTrendUp} from "react-icons/fa6"
import {FaArrowTrendDown} from "react-icons/fa6"
import {BsGraphUpArrow} from "react-icons/bs"
import {IoDocumentOutline} from "react-icons/io5"
import {BsFillPeopleFill} from "react-icons/bs"
import { readDataCounts } from "@/app/admin/action"

export default function () {
  const [countDestinations, setCountDestinations] = useState<number>(0)
  const [countUsers, setCountUsers] = useState<number>(0)
  const [countTourGuides, setCountTourGuides]= useState<number>(0)
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0)

  useEffect(()=>{
    const fetchCount = async () =>{
      try{
        const response = await readDataCounts();
        if(response?.totalDestinations, response?.totalTourGuides, response?.totalUsers){
          setCountDestinations(response.totalDestinations)
          setCountUsers(response.totalUsers)
          setCountTourGuides(response.totalTourGuides)
          setTotalPaymentAmount(response.totalPaymentAmount)
        }
      }
      catch(error){
        console.log("Could not fetch counts ", error)
      }
    }
    fetchCount();
  },[])
  const cardDetails = [
    {
      id: 1,
      name: "Destinations",
      value: countDestinations,
      color: "#B5FFCE",
      icon: <IoLocationOutline className="mt-2 text-lg" />,
      trendIcon: <FaArrowTrendUp className="text-[#43BE83] text-sm" />,
      trendValue: "+15%",
      trendColor: "#6AD2A0",
    },
    {
      id: 2,
      name: "Payments",
      value: "€ "+ totalPaymentAmount,
      color: "#FFD9D7",
      icon: <BsGraphUpArrow className="mt-2 text-lg" />,
      trendIcon: <FaArrowTrendDown className="text-[#EA8F95] text-sm" />,
      trendValue: "-5%",
      trendColor: "#EA8F95",
    },
    {
      id: 3,
      name: "Users",
      value: countUsers,
      color: "#B5FFCE",
      icon: <IoDocumentOutline className="mt-2 text-lg" />,
      trendIcon: <FaArrowTrendUp className="text-[#43BE83] text-sm" />,
      trendValue: "+15%",
      trendColor: "#6AD2A0",
    },
    {
      id: 4,
      name: "Tour Guides",
      value: countTourGuides,
      color: "#B5FFCE",
      icon: <BsFillPeopleFill className="mt-2 text-lg" />,
      trendIcon: <FaArrowTrendUp className="text-[#43BE83] text-sm" />,
      trendValue: "+10%",
      trendColor: "#6AD2A0",
    },
  ]
  return (
    <div
      id="cards"
      className="flex gap-7 px-5">
      {cardDetails.map(card => (
        <div
          className="border-[1.3px] rounded-xl px-7 py-3 border-[#D3CBFB]"
          key={card.id}>
          <div className="flex align-middle justify-between gap-20">
            <div>
              <p className="text-xs text-gray-500">{card.name}</p>
              <h3 className="text-xl font-semibold mt-1">{card.value}</h3>
            </div>
            <div>{card.icon}</div>
          </div>
          <div className="flex gap-3 mt-1">
            <div
              className="opacity-100 rounded-full p-1"
              style={{backgroundColor: card.color}}>
              {card.trendIcon}
            </div>
            <div>
              <p
                className="text-xs mt-1  text-[#6AD2A0] font-semibold"
                style={{color: card.trendColor}}>
                {card.trendValue}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
