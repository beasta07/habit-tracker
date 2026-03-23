"use server";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function fetchRoutines() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    console.log("Token:", token); // See if token exists

    const payload = await verifyToken(token as string);
    console.log("Payload:", payload); // See if verify works

    if (!payload) {
      console.log("No payload or userId");

      return {
        success: false,
        message: "User is not authorized",
      };
    }
    const userId = payload.userId;
    console.log("UserId:", userId);

    const routine = await prisma.routineItem.findMany({
      where: {
        userId,
      },
    });
    console.log("Routines fetched:", routine);

    return {
      routine,
      success: true,
      message: "Successfully  fetched Routine",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error fetching routines.Please try again",
    };
  }
}
export async function createRoutines(formData:FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);

    if (!payload) {
      return {
        success: false,
        message: "User is not authorized",
      };
    }
    const activity = formData.get("activity") as string
 
const time = formData.get("time") as string
const duration = parseInt(formData.get("duration") as string)
    const userId = payload.userId;

    await prisma.routineItem.create({
      data: {
        activity,
        time,
        duration,
        userId,
      },
    });
    return {
      success: true,
      message: "Routine created successfully",
    };
  } catch (err) {
    console.log(err, "Error creating routines");
  }
}
export async function updateRoutines(formData:FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);
const id = parseInt(formData.get("id") as string)
    if (!payload) {
      return {
        success: false,
        message: "User is not authorized",
      };
    }
    const activity = formData.get("activity") as string
;
const time = formData.get("time") as string
const duration = parseInt(formData.get("duration") as string)
    const userId = payload.userId;
    const routine = await prisma.routineItem.findUnique({ where: { id } });
    if (!routine || routine.userId !== userId) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.routineItem.update({
      where: { id },
      data: { activity, time, duration },
    });

    return {
      success: true,
      message: "Routine updated successfully",
    };
  } catch (err) {
    console.log(err, "Error updating routines");
    return { success: false, message: "Error updating routine" };
  }
}
export async function deleteRoutines(id:number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    const payload = await verifyToken(token as string);
    ;
    if (!payload) {
      return {
        success: false,
        message: "User is not authorized",
      };
    }

    const userId = payload.userId;
    const routine = await prisma.routineItem.findUnique({ where: { id } });
    if (!routine || routine.userId !== userId) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.routineItem.delete({
      where: { id },
      
    });
 
    return {
      success: true,
      message: "Routine deketed successfully",
    };
  } catch (err) {
    console.log(err, "Error deleting routines");
    return { success: false, message: "Error updating routine" };
  }
}
