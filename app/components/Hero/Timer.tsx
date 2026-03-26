import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pauseTimer, resetTimer, startTimer, tick } from "@/store/slices/timerSlice";
import { useEffect } from "react";

export default function Timer() {
  // You'll add hooks here
  const dispatch = useAppDispatch();
  const { secondsLeft, isRunning } = useAppSelector((state) => state.timer);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
 
  useEffect(()=>{
    if(!isRunning)return

    const interval = setInterval(()=> {
        dispatch(tick())
    },1000)
    return()=> clearInterval(interval)
  },[isRunning,dispatch])


  return (
    <div className="bg-white/3 lg:w-fit border border-white/8 rounded-2xl p-8 backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-lg font-light text-white">Focus Timer</h2>
        <p className="text-zinc-500 text-sm mt-1">Pomodoro session</p>
      </div>

      <div
        className={`text-center mb-8 transition-all ${isRunning ? "text-indigo-400" : "text-white"}`}
      >
        <div className="text-7xl font-mono font-bold tracking-tighter">
          {display}
        </div>
      </div>

      <div className="flex gap-3 ">
        <button
          onClick={() => dispatch(startTimer())}
          disabled={isRunning}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          Start
        </button>
        <button
          onClick={() => dispatch(pauseTimer())}
          disabled={!isRunning}
          className="px-6 py-2 bg-white/5 border border-white/8 hover:bg-white/8 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          Pause
        </button>
        <button
          onClick={() => dispatch(resetTimer())}
          className="px-6 py-2 bg-white/5 border border-white/8 hover:bg-white/8 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
