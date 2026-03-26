"use client";
import Link from "next/link";
import { logout } from "../actions/auth";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar = () => {
  const handleLogout = async () => {
    await logout();
  };
  const pathname = usePathname()
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
    <nav className=" border-white/10 hidden lg:block border-b pb-4 ">
      <section className="lg:px-20 lg:flex lg:flex-row flex-col gap-5 px-4   lg:justify-between   py-5">
        <Link className={pathname === '/' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/"}>
          <h1 className="text-3xl  font-light  text-white">FocusFlow 🎯</h1>
        </Link>
        <ul className="flex items-center gap-5">
          <li><Link className={pathname === '/dashboard/routines' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/dashboard/routines"}>Routines</Link> </li>
          <li><Link className={pathname === '/dashboard/tasks' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/dashboard/tasks"}>Tasks</Link> </li>
          <li><Link className={pathname === '/dashboard/journal' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/dashboard/journal"}>Journals</Link> </li>

        </ul>
        <button
          onClick={handleLogout}
          className="px-6 py-2  bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          Logout
        </button>
      </section>
    </nav>
       
    <nav className=" border-white/10   lg:hidden block border-b pb-4 ">
       {panelOpen && (
        <div onClick={()=>setPanelOpen(false)} className="fixed inset-0 bg-black/50 z-10" />
      )}
      <section className="lg:px-20 px-4  flex justify-between   py-5">
        <Link className={pathname === '/' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/"}>
          <h1 className="text-xl  font-light  text-white">FocusFlow 🎯</h1>
        </Link>
        <GiHamburgerMenu onClick={()=>setPanelOpen(!panelOpen)} className="text-2xl" />


      </section>
          {/* Slide-in panel */}
            <div
              className={`fixed top-0 right-0 h-full w-fit bg-[#111116] border-l border-white/8 px-4 py-8 z-20 flex flex-col transition-transform duration-300 ${panelOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                        <h1 className="text-2xl  font-light  text-white">FocusFlow 🎯</h1>

<ul className="flex flex-col  gap-3 mt-5">
          <li><Link onClick={()=>setPanelOpen(false)} className={pathname === '/dashboard/routines' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/dashboard/routines"}>Routines</Link> </li>
          <li><Link onClick={()=>setPanelOpen(false)} className={pathname === '/dashboard/tasks' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/dashboard/tasks"}>Tasks</Link> </li>
          <li><Link onClick={()=>setPanelOpen(false)} className={pathname === '/dashboard/journal' ? 'text-white' : 'text-zinc-500 hover:text-white'} href={"/dashboard/journal"}>Journals</Link> </li>

        </ul>
        <button
          onClick={handleLogout}
          className="px-6 py-2 mt-5 w-fit  bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          Logout
        </button>
            </div>
    </nav>
    
    </>
  );
};

export default Navbar;
