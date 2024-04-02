import React from "react";

import AddMoney from "../../components/AddMoneyCard";
import BalanceCard from "../../components/BalanceCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import OnRampTransaction from "../../components/OnRampTransaction";

async function getAmount() {
  const session = await getServerSession(authOptions);
  try {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    if (balance) {
      return {
        amount: balance?.amount,
        locked: balance?.locked,
      };
    } else {
      return {
        amount: 0,
        locked: 0,
      };
    }
  } catch (error) {
    return {
      amount: 0,
      locked: 0,
    };
  }
}
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
      return [
        {
          time: "",
          amount: 0,
          status: "",
          provider: "",
        },
      ];
    }
  } catch (error) {
    return [
      {
        time: "",
        amount: 0,
        status: "",
        provider: "",
      },
    ];
  }
}
const page = async () => {
  const balance = await getAmount();
  const transacions = await getOnRampTransaction();
  return (
    <div className="py-10 px-4 font-bold w-full">
      <h1 className="text-[#6a51a6] text-2xl">Transfer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-gray-600 p-4">
        <div>
          <AddMoney amount={balance?.amount} locked={balance.locked} />
        </div>
        <div>
          <BalanceCard amount={balance?.amount} locked={balance.locked} />
          {transacions && <OnRampTransaction transacions={transacions} />}
        </div>
      </div>
    </div>
  );
};

export default page;
