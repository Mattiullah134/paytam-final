"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function sendMoney(amount: number, number: string) {
  const session = await getServerSession(authOptions);
  if (!session.user || !session.user.id) {
    return {
      success: false,
      message: "Unauthorized request",
    };
  } else {
    try {
      const user = await prisma.user.findFirst({
        where: {
          number: number,
        },
      });

      if (user) {
        await prisma.$transaction(async (tsx) => {
          await tsx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;
          const fromBlance = await tsx.balance.findFirst({
            where: {
              userId: Number(session.user.id),
            },
          });

          if (!fromBlance || amount > fromBlance.amount) {
            console.log("main yahan pr hoon", fromBlance, user);

            throw new Error("Insufficient funds");
          } else {
            console.log("update from blance");

            await tsx.balance.update({
              where: {
                userId: Number(fromBlance.userId),
              },
              data: {
                amount: {
                  decrement: Number(amount),
                },
              },
            });
            console.log("updated from blance");
            console.log("update to blance");
            await tsx.balance.update({
              where: {
                userId: user.id,
              },
              data: {
                amount: {
                  increment: Number(amount),
                },
              },
            });
            await tsx.p2pTransfer.create({
              data: {
                fromUserId: Number(session.user.id),
                toUserId: Number(user.id),
                amount: amount,
                timeStamp: new Date(),
              },
            });
            console.log("updated to blance");
          }
        });
        return {
          success: true,
          message: "Amount Transfer successfully",
        };
      } else {
        return {
          success: false,
          message: "User Not exists",
        };
      }
    } catch (error: any) {
      console.log("error while send the amount", error);

      return {
        message: error.toString(),
        success: false,
      };
    }
  }
}
