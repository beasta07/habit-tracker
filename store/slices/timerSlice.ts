import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name:"timer",
    initialState:{
        isRunning:false,
        secondsLeft: 1500,
        duration:1500
    },
    reducers:{
     startTimer:(state)=>{
        state.isRunning = true
     } ,
     pauseTimer:(state)=>{
        state.isRunning=false
     },
     resetTimer:(state)=>{
        state.secondsLeft = state.duration
        state.isRunning = false
     },
     tick:(state)=>{
        state.secondsLeft=state.secondsLeft-1 
     }
    }
})
export default timerSlice.reducer
export const {startTimer,pauseTimer,resetTimer,tick}= timerSlice.actions