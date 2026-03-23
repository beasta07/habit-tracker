"use server";

import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function fetchTasks() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    const payload = await verifyToken(token as string);

    if (!payload) {
      return {
        success: false,
        message: "User is not authenticated",
      };
    }

    const userId = payload.userId;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return {
      success: true,
      tasks,
      message: "Successfully fetched tasks",
    };
  } catch (err) {
    console.log(err, "Task err in server");
    return {
      success: false,
      message: "Error fetching tasks.",
    };
  }
}
