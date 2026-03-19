import { logout } from "../actions/auth"

const Navbar = () => {
    const handleLogout= async ()=>{
        await logout()

    }
  return (
    <nav className=" border-white/10 border-b pb-4 ">
        <section className="px-20 flex justify-between   py-5">
   <h1 className="text-3xl  font-light  text-white">FocusFlow 🎯</h1> 

      <button onClick={handleLogout} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors">
        Logout
      </button>

        </section>
    </nav>
  )
}

export default Navbar
