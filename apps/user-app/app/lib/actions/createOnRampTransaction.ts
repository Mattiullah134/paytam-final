"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session.user || !session.user.id) {
      return {
        message: "Unauthorized request",
        success: false,
      };
    } else {
      let token = Math.random().toString();
      let tran = await prisma.onRampTransaction.create({
        data: {
          amount: Number(amount),
          provider: provider,
          status: "Processing",
          startTime: new Date(),
          token: token,
          userId: Number(session.user.id),
        },
      });
      return {
        tranaction: tran,
        success: true,
        message: "On ramp transaction created successfully",
      };
    }
  } catch (error) {
    console.log("error while create the on ramp transaction", error);

    return {
      message: error,
      success: false,
    };
  }
}
