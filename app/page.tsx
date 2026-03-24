"use client";

import Timer from "./components/Hero/Timer";
import RoutinesPreview from "./components/Hero/RoutinesPreview";
import TasksPreview from "./components/Hero/TasksPreview";


const page = () => {
  return (
    <section className="bg-white/3 ">
      <main className="px-20 my-20">
      <div className="  flex  gap-10   py-5">
        <Timer />
        <RoutinesPreview/>
        <TasksPreview/>
      </div>
   
      </main>
    </section>
  );
};

export default page;
