"use client";

import JournalPreview from "../components/Hero/JournalPreview";
import RoutinesPreview from "../components/Hero/RoutinesPreview";
import TasksPreview from "../components/Hero/TasksPreview";
import Timer from "../components/Hero/Timer";



const page = () => {
  return (
    <section className=" ">
      <main className="lg:px-20 px-4 ">
      <div className="  flex lg:flex-row flex-col  gap-10   py-5">
        <Timer />
        <RoutinesPreview/>
        <TasksPreview/>
      </div>
       <JournalPreview/>
      </main>
    </section>
  );
};

export default page;
