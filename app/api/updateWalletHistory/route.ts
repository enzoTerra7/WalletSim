import { db } from "@/db";
import { formatDate } from "date-fns";

export async function GET() {
  try {
    const wallets = await db.wallet.findMany();

    if (!wallets) {
      return Response.json({ message: "No wallet's found" }, { status: 404 });
    }

    for (const wallet of wallets) {
      await db.walletHistory.create({
        data: {
          walletId: wallet.id,
          price: wallet.currentAmount,
          day: formatDate(new Date(), "yyyy-MM-dd"),
        },
      });
    }

    return Response.json(
      { message: "Wallet history updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generate wallet history:", error);
    return Response.json(
      { message: "Wallet history not updated", error: error },
      { status: 500 }
    );
  }
}
