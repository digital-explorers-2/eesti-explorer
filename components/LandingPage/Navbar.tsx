import Logo from "@/components/images/LandingPage/logo.png"
import Image from "next/image";
import MediumButton from "@/components/MediumButton";

export default function () {
  return (
    <nav className="px-10 py-5 flex gap-[17%]">
        <div id="logo" className="flex align-middle">
          <div>
            <Image style={{width:"30px"}} src={Logo} alt="" />
          </div>
          <div>
            <p className="text-lg font-bold pt-1 pl-3">Eestie<span className="text-[#F57906]">Explorer</span></p>
          </div>
        </div>
        <div className="pt-3">
          <ul className="list-none flex gap-12 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#packages">Our Packages</a></li>
            <li><a href="#help">Help</a></li>
          </ul>
        </div>
        <div>
          <MediumButton>Sign Up</MediumButton>
        </div>
      </nav>
  )
}
