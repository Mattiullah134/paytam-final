"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Select from "@repo/ui/select";
import TextInput from "@repo/ui/textInput";
import React, { useState } from "react";
import createOnRampTransaction from "../app/lib/actions/createOnRampTransaction";
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
const AddMoney = ({ amount, locked }: { amount: number; locked: number }) => {
  // const [redirectUrl, setRedirectUrl] = useState(
  //   SUPPORTED_BANKS[0]?.redirectUrl
  // );
  const [userAmount, setUserAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  console.log("amount", amount, provider);

  return (
    <Card title="Add Money">
      <TextInput
        label={"Amount"}
        placeholder={"Amount"}
        onChange={(e) => {
          setUserAmount(e.target.value);
        }}
      />
      <div className="py-4 text-left font-normal">Bank</div>
      <Select
        onSelect={(e) => {
          console.log("hi", e.target.value);

          setProvider(e.target.value);
        }}
        options={SUPPORTED_BANKS}
      />
      <div className="mt-5 text-center">
        <Button
          onClick={async () => {
            if (userAmount > 0 && provider) {
              if (userAmount <= amount) {
                let data = await createOnRampTransaction(
                  provider,
                  userAmount * 100
                );
                console.log(data, "--->");
              }
            } else {
              alert("Amount should be greater than 0");
            }
            // window.location.href = redirectUrl || "";
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
};

export default AddMoney;
