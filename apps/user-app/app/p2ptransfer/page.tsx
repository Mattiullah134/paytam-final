"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import TextInput from "@repo/ui/textInput";
import React, { useState } from "react";
import sendMoney from "../lib/actions/sendMoney";

const page = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmouont] = useState("");
  const handleSendMoney = async () => {
    try {
      if (number && amount) {
        const data = await sendMoney(Number(amount) * 100, number);
        console.log("send money", data);
        if (data && data?.success) {
          alert(data.message);
        } else {
          alert(data?.message);
        }
        setAmouont("");
        setNumber("");
      } else {
        alert("Please fill all the required filed");
      }
    } catch (error) {
      console.log("error whiel send the money", error);
    }
  };
  return (
    <div className="w-1/2 mx-auto">
      <Card title="Send Money">
        <div>
          <TextInput
            label="Number"
            placeholder="123456789"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            value={number}
          />
        </div>
        <div>
          <TextInput
            label="Amount"
            placeholder="1000"
            onChange={(e) => {
              setAmouont(e.target.value);
            }}
            value={amount}
          />
        </div>
        <div>
          <Button onClick={() => handleSendMoney()}>Send</Button>
        </div>
      </Card>
    </div>
  );
};

export default page;
