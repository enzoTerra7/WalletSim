import { MainCryptoData } from "./_components/main";

export default async function CryptoCurrencyPage({
  params,
}: {
  params: Promise<{ ticket: string }>;
}) {
  const { ticket } = await params;

  return (
    <main className="w-full flex items-start justify-start flex-col gap-8 py-16 xl:px-28">
      <MainCryptoData ticket={ticket} />
    </main>
  );
}
