import { Card } from "@repo/ui/card";
import React from "react";

const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between items-center border-b py-2">
        <p className="font-medium">Unlocked Balance</p>
        <p className="font-medium">{amount / 100} PKR</p>
      </div>
      <div className="flex justify-between items-center border-b py-2">
        <p className="font-medium">Total Locked Balance</p>
        <p className="font-medium">{locked / 100} PKR</p>
      </div>

      <div className="flex justify-between items-center border-b py-2">
        <p className="font-medium">Total Balance</p>
        <p className="font-medium">{(amount + locked) / 100} PKR</p>
      </div>
    </Card>
  );
};

export default BalanceCard;
