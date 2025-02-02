export function mapWalletHistory(
  walletHistory: {
    id: number;
    walletId: number;
    price: number;
    day: string;
  }[],
  day: "7d" | "14d" | "30d"
) {
  const days = parseInt(day.split("d")[0]);
  if (isNaN(days)) {
    throw new Error("Formato inválido. Use '7d', '14d' ou '30d'.");
  }

  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    result.push({
      day: date.toISOString().split("T")[0],
      price: 0,
    });
  }

  for (const item of walletHistory) {
    const index = result.findIndex((r) => r.day === item.day);
    if (index !== -1) {
      result[index].price = item.price;
    }
  }

  return result;
}
