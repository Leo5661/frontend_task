import Image from "next/image"
import logo from "../../public/assets/logo.svg"
import Link from "next/link"
import {VscSearch} from "react-icons/vsc"

function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex sm:justify-around gap-x-8 px-2 sm:px-36 py-3 bg-blue-800">
        <Image
            className="h-6 sm:h-9"
            src={logo}
            alt="logo" 
            />
        <div className="search hidden sm:flex grow justify-between items-center max-w-3xl bg-white rounded-md p-2">
            <input className="text-base grow text-black border-hidden outline-none" name="search" type="text" placeholder="Enter interests, keyword, company name, etc."/>     
            <VscSearch className="w-6" alt="search icon"/>
        </div>    
        <ul className="hidden sm:flex justify-around items-center gap-x-6">
            <li>
                <Link className="text-white text-base md:text-xl " href={"/"}>Home</Link>
            </li>
            <li>
                <Link className="text-white text-base md:text-xl " href={"/product"}>Product</Link>
            </li>
        </ul>
    </nav>
    
  )
}

export default Nav