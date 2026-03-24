"use server";

import { getUserId } from "@/lib/auth";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { Priority } from "@prisma/client";
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

export async function createTasks(formData: FormData) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const activity = formData.get("activity") as string;
    const priority = formData.get("priority") as Priority;
    const deadline = new Date(formData.get("deadline") as string);
    const completed = formData.get("completed") === "on";

    await prisma.task.create({
      data: {
        activity,
        priority,
        deadline,
        completed,
        userId,
      },
    });
    return {
      success: true,
      message: "Successfully created tasks",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating tasks",
    };
  }
}
export async function updateTasks(formData: FormData) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "Not authorized",
      };
    }

    const id = parseInt(formData.get("id") as string);
    const activity = formData.get("activity") as string;
    const priority = formData.get("priority") as Priority;
    const deadline = new Date(formData.get("deadline") as string);
    const completed = formData.get("completed") === "on";

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        activity,
        priority,
        deadline,
        completed,
        userId,
      },
    });
    return {
      success: true,
      message: "Tasks update successfully",
    };
  } catch (err) {
    console.log(err, "Error Updating tasks");
    return {
      success: false,
      message: "Error Updating tasks",
    };
  }
}
export async function deleteTasks(id: number) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId)
      return { success: false, message: "Unauthorized" };
    await prisma.task.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "Successfully deleted",
    };
  } catch (err) {
    console.log(err, "Error deleting data");
    return {
      success: false,
      message: "Error deleting data",
    };
  }
}
