"use server"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function hashPassword(password:string){
const saltRounds = 10 
return await bcrypt.hash(password,saltRounds)    
}

export async function verifyPassword(password:string,hashedPassword:string){
    return bcrypt.compare(password,hashedPassword)
}

export async function getUserId(){
    const cookieStore = await cookies()
    const token = cookieStore.get('jwt_token')?.value

    const payload =await verifyToken(token as string)

    if (!payload){
        return null
    
    }
    const userId = payload.userId 
    return userId
}