"use server"
import { getUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function fetchJournals() {
  try {
    const userId = (await getUserId()) as number;
    if (!userId) {
      return null;
    }
    const journals = await prisma.journal.findMany({
      where: {
        userId,
      },
    });

    return {
      success: true,
      message: "Succesfully fetched Journals",
      journals,
    };
  } catch (err) {
    console.log(err, "Error Fetching journals");
    return {
      success: false,
      message: "Error fetching journals",
    };
  }
}
export async function createJournal(formData: FormData) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }
    const mood = parseInt(formData.get("mood") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const prompt = formData.get("prompt") as string;

    await prisma.journal.create({
      data: {
        mood,
        title,
        content,
        prompt,
        userId,
      },
    });
    return {
      success: true,
      message: "Successfully created journal",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to create Journal",
    };
  }
}
export async function updateJournal(formData: FormData) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }
    const id = parseInt(formData.get("id") as string);
    const mood = parseInt(formData.get("mood") as string);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const prompt = formData.get("prompt") as string;

    const checkJournal = await prisma.journal.findUnique({
      where: {
        id,
      },
    });
    if (!checkJournal || checkJournal.userId !== userId) {
        console.log('User id doesnot match') 
        return {
    
        success: false,
        message: "Not authenticated",
      };
    }

    await prisma.journal.update({
      where: {
        id,
      },
      data: {
        mood,
        title,
        content,
        prompt,
        
      },
    });
    return {
      success: true,
      message: "Successfully updated journal",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to update Journal",
    };
  }
}
export async function deleteJournal(id: number) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    const checkJournal = await prisma.journal.findUnique({
      where: {
        id,
      },
    });
    if (!checkJournal || checkJournal.userId !== userId) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    await prisma.journal.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "Successfully deleted journal",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to delete Journal",
    };
  }
}
