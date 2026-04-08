"use server"
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET= process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET)

export async function createToken(userId:number){
    return await new SignJWT({userId})
    .setProtectedHeader({alg:'HS256'})
    .setExpirationTime('24h')
    .sign(secret)
}

export async function verifyToken(token:string){
    try{
        const {payload} = await jwtVerify(token,secret)
        return payload as {userId:number}
    } catch(err){
        console.log(err)
        return null
    }
}