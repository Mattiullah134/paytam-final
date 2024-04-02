import React from "react";
import OnRampTransaction from "../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";
async function getOnRampTransaction() {
  const session = await getServerSession(authOptions);
  try {
    const onRampTransaction = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    if (onRampTransaction) {
      return onRampTransaction.map((t) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
      }));
    } else {
      return {
        time: "",
        amount: 0,
        status: "",
        provider: "",
      };
    }
  } catch (error) {
    return {
      time: "",
      amount: 0,
      status: "",
      provider: "",
    };
  }
}
const page = async () => {
  const transacions = await getOnRampTransaction();

  return (
    <div className="p-5">
      {transacions && <OnRampTransaction transacions={transacions} />}
    </div>
  );
};

export default page;
