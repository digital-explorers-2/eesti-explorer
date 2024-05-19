'use client'
import React,{useRef} from "react"
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/LandingPage/Navbar";
import Home from "@/components/LandingPage/Home";
import Destinations from "@/components/LandingPage/Destinations";


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
        </main>
      </div>
    </div>
  );
}
