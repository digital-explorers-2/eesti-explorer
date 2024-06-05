"import client"
import Navbar from "@/components/Navbar"    
import Heading from "@/components/Heading"
import LargeButton from "@/components/LargeButton"


export default function Billing(){
const billingData=[
    {
        fee_type:"Destination Fees",
        fee_description:"Includes entry fee charges, and activity charges",
        fee_cost:"10 euros"
    },

    {
        fee_type:"Tour Guide Fees",
        fee_description:"Includes entry fee charges, and activity charges",
        fee_cost:"20 euros"
    },

    {
        fee_type:"Service Fees",
        fee_description:"Includes entry fee charges, and activity charges",
        fee_cost:"5 euros"
    },
]

return(
<>
<Navbar />

<div className="text-center">
<Heading
 underlinedText="Billing"
 otherText=" Summary"
 />
</div>

<div className="mx-72 pt-20 flex flex-col gap-10 border-b-4 pb-16">
    {billingData.map((data)=>(
          <div className=" flex justify-between">
          <div className="">
           <h1 className="text-lg font-semibold">
              {data.fee_type}
           </h1>
           <p className= " text-sm pt-5 text-gray-500">{data.fee_description} </p>
          </div>
          <div>
              <h1 className="font-bold text-xl pt-2">{data.fee_cost}</h1>
          </div>
      </div>

    ))}
  
</div>

<div className="flex justify-between mx-72 pt-10 pb-10 ">
    <div>
        <h1 className="text-2xl font-bold">Grand Total</h1>
    </div>
    <div>
        <h1 className="text-xl font-bold ">35 euros</h1>
    </div>
</div>

<div className="flex justify-center pb-20">
<LargeButton> Proceed to Payment </LargeButton>
</div>



</>

)
}