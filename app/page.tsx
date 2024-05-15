import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/LandingPage/Navbar";
import MediumButton from "@/components/MediumButton";
import Image from "next/image";
import HeroImage from "@/components/images/hero-image.png";


export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
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
        <main className="px-24 flex justify-between">
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
          <div id="words_left" className="w-[50%] pt-24">
              <h1 className="text-6xl font-bold leading-normal"><span className="underline underline-offset-4 decoration-[#F57906]">Let's</span> Create A Memorable Journey</h1>
              <div className="pr-10">
                <p className="text-sm leading-loose pt-5">Eestie Explorer helps you discover magical places in Estonia and allows you to customize the places you would like to visit.</p>
              </div>
              <div className="pt-5">
                <MediumButton >Learn more</MediumButton>
              </div>
          </div>
          <div className="w-[45%]">
            <Image src={HeroImage} alt="snow"/>
          </div>
        </main>
      </div>
    </div>
  );
}
