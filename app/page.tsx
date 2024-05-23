'use client'
import React from "react"
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/LandingPage/Navbar";
import Home from "@/components/LandingPage/Home";
import Destinations from "@/components/LandingPage/Destinations";
import About from "@/components/LandingPage/About";
import Testimonial from "@/components/LandingPage/Testimonial";
import Subscribe from "@/components/LandingPage/Subscribe";


export default function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };  
  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <div>
      <Navbar/>
      <div >
        <main >
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
          <Home/>
          <Destinations/>
          <About/>
          <Testimonial/>
          <Subscribe/>
        </main>
      </div>
    </div>
  );
}
