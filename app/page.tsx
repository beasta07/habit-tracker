"use client";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";

const page = () => {
  return (
    <section className="bg-white/3 ">
      <Navbar />
      <div className="my-20 px-20   py-5">
        <Timer />
        {/* Other widgets like Tasks, Routines, etc. */}
      </div>
    </section>
  );
};

export default page;
