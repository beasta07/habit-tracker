'use server'
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function fetchRoutines(){
    try{
        const cookieStore =await cookies()
        const token = cookieStore.get('jwt_token')?.value
                console.log('Token:', token)  // See if token exists

        const payload = await verifyToken(token as string)
                console.log('Payload:', payload)  // See if verify works

        if (!payload){
                        console.log('No payload or userId')

            return {
                success:false,
                message:'User is not authorized'
            }
        }
            const userId = payload.userId
        console.log('UserId:', userId)

        const routine = await prisma.routineItem.findMany({
            where:{
                userId
            }
        })
                console.log('Routines fetched:', routine)

        return{
            routine,
           success:true, 
           message:'Successfully  fetched Routine'
        }

    }
   catch(err){
    console.log(err)
    return{
        success:false,
        message:'Error fetching routines.Please try again'
    }
   }
}