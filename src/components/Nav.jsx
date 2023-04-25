import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import Link from "next/link";
import { VscSearch } from "react-icons/vsc";

function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex gap-x-8 bg-blue-800 px-2 py-3 sm:justify-around sm:px-36">
      <Image className="h-6 sm:h-9" src={logo} alt="logo" />
      <div className="search hidden max-w-3xl grow items-center justify-between rounded-md bg-white p-2 sm:flex">
        <input
          className="grow border-hidden text-base text-black outline-none"
          name="search"
          type="text"
          placeholder="Enter interests, keyword, company name, etc."
        />
        <VscSearch className="w-6" alt="search icon" />
      </div>
      <ul className="hidden items-center justify-around gap-x-6 sm:flex">
        <li>
          <Link className="text-base text-white md:text-xl " href={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className="text-base text-white md:text-xl " href={"/product"}>
            Product
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
