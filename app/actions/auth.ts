'use server'

import { hashPassword, verifyPassword } from "@/lib/auth";
import { createToken, verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(prevState:unknown, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const hashedPassword = await hashPassword(password);
    if (!email || !hashedPassword) {
      return {
        success: false,
        message: "Both emails and password is required",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    const user = await prisma.user.create({
      data: {
        email,
        password:hashedPassword,
        name: email.split("@")[0],
      },
    });
    const token = await createToken(user.id);

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  } catch (err) {
    console.error("Sign up error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again ",
    };
  }
      redirect("/");

}
export async function signIn(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      return {
        success: false,
        message: "Email doesnot exist",
      };
    }
    if (!(await verifyPassword(password, userExists.password))) {
      return {
        success: false,
        message: "Email or password is incorrect",
      };
    }
    const token = await createToken(userExists.id);

    await prisma.session.create({
      data: {
        userId: userExists.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  } catch (err) {
    console.error(err, "Error during signing in");
    return {
      success: false,
      message: "Error during signing in",
    };
  }
      redirect("/");

}
export async function logout(){
  try{
    const cookieStore = await cookies()
    const token = cookieStore.get('jwt_token')?.value
    
    const payload=  await verifyToken(token)

    if (!payload){
      return null 
    }
    await prisma.session.delete({
      where:{
        token:token
      }
    })
    cookieStore.delete('jwt_token')
  }
  catch(err){
    console.log(err,'Error loggint out')
    return{
      success:false,
      message:'Error logging out '
    }
  }
 redirect('/login')
}
