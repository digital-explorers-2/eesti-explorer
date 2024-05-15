import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/LandingPage/Navbar";


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
    <div className="">
      <Navbar/>

      <div className="">
        <main className="">
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

        </main>
      </div>

    </div>
  );
}
