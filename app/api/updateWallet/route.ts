import { db } from "@/db";

export default async function GET() {
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
  } catch {}
}
