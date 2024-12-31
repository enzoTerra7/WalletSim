import { db } from "@/db";

export async function GET() {
  try {
    const wallets = await db.wallet.findMany();

    if (!wallets) {
      return;
    }

    for (const wallet of wallets) {
      await db.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          currentAmount: {
            increment: wallet.monthlyAport,
          },
        },
      });
    }
    return Response.json(
      {
        message: "Wallet updated",
      },
      {
        status: 200,
      }
    );
  } catch {
    return Response.json(
      {
        message: "Wallet not updated",
      },
      { status: 500 }
    );
  }
}
