import express from "express";
// import db from "@repo/db/client";

const app = express();
import prisma from "@repo/db/client";
app.use(express.json());
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
          status: "Processing",
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({ message: "capture", data: req.body, success: true });
  } catch (error) {
    res.status(200).json({
      message: "Errow while processing the web hook",
      error,
      success: false,
    });
  }
});

app.listen(5000, () => {
  console.log("application is listening on the port 5000");
});
