"use client";

import Navbar from "./components/Navbar";
import Timer from "./components/Hero/Timer";
import RoutinesPreview from "./components/Hero/RoutinesPreview";
import TasksPreview from "./components/Hero/TasksPreview";

const page = () => {
  return (
    <section className="bg-white/3 ">
      <Navbar />
      <div className="my-20 px-20 flex  gap-10   py-5">
        <Timer />
        <RoutinesPreview/>
        <TasksPreview/>
      </div>
    </section>
  );
};

export default page;
