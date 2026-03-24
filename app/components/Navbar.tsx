"use client";
import Link from "next/link";
import { logout } from "../actions/auth";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const handleLogout = async () => {
    await logout();
  };
  const pathname = usePathname()

  return (
    <nav className=" border-white/10 border-b pb-4 ">
      <section className="px-20 flex justify-between   py-5">
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
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          Logout
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
