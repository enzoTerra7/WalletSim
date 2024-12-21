import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function EmptyStocks() {
  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
        <Image
          src={"/empty-stocks.svg"}
          alt="Nenhum ativo encontrado"
          width={1200}
          height={1200}
          className="h-96 object-contain object-center"
        />
        <h1 className="text-lg text-foreground text-center font-medium">
          Nenhum ativo encontrado
        </h1>
        <Link href={"/market"} className={buttonVariants({className: "mt-4 w-full"})}>
          Começar a investir
        </Link>
      </div>
    </>
  );
}
