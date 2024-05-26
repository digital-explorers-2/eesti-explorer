"use client"
import Footer from '@/components/Footer'
import Heading from '@/components/Heading'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaMap } from "react-icons/fa";
import { destinationsRead } from '../destinations/actions'


export default function Guides() {
  const [guides, setGuides] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await destinationsRead();
        setGuides(response);
        console.log(response)
      }
      catch (error) {
        throw new Error('Error fetching tour guides')
      }
    }
    fetchData();
  }, [])
  return (
    <>
      <Navbar />
      <div className='text-center mt-5'>
        <Heading underlinedText='Tour' otherText=' Guides' />
      </div>
      <div className='px-20 grid grid-cols-3 gap-x-10 gap-y-16 py-14'>
        {guides.map((guides: any) => (
          <div className='px-5 py-5 bg-white border-[1.5px] rounded-xl' key={guides.tourGuides_id}>
            <Image alt='tour guide' src={guides.image_path} />
            <h1 className='text-sm font-bold pt-5'>{guides.first_name} {guides.last_name}</h1>
            <div className='flex justify-between'>
              <div className='flex gap-5 text-sm pt-3'>
                <div className='pt-1'>
                  <FaMap />
                </div>
                <p className='font-bold'>Langauges: {guides.languages}</p>
                <p className='font-bold'>Fee: {guides.fee}</p>

              </div>
            </div>
            <div className='pt-5'>
              <button className='bg-[#F57906] w-full py-2 rounded-md text-sm text-white font-bold'>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
