import {
  handleStockTypes,
  handleStockTypesDescription,
} from "@/lib/formatters";
import { MainStocksList } from "../_components/lists";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoBackPage } from "@/components/ui/goBack";

export default function MarketPage({ params }: { params: { type: string } }) {
  return (
    <main className="w-full flex items-start justify-start flex-col gap-8 py-16 xl:px-28">
      <GoBackPage asChild>
        <Button variant={"outline"} size="icon">
          <ChevronLeft className="size-6" />
        </Button>
      </GoBackPage>
      <div className="space-y-1">
        <h1 className="text-2xl text-foreground font-medium">
          {handleStockTypes(params.type)}
        </h1>
        <p className="text-muted-foreground line-clamp-3 font-medium text-sm">
          {handleStockTypesDescription(params.type)}
        </p>
      </div>
      <MainStocksList type={params.type} />
    </main>
  );
}
