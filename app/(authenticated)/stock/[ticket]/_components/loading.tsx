import { Skeleton } from "@/components/ui/skeleton";

export function StockByIdLoading() {
  return (
    <>
      <div className="w-full flex items-start flex-col gap-4">
        <div className="flex w-full mb-4 items-center gap-4 justify-between">
          <Skeleton className="size-10 rounded-md" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
        <div className="w-full flex items-start flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 xl:items-end">
          <Skeleton className="w-12 h-3.5" />
          <Skeleton className="w-20 h-6" />
        </div>
      </div>
      <Skeleton className="w-full h-64" />
      <Skeleton className="h-5 mt-6 w-16" />
      <div className="w-full rounded-md grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
      </div>
      <Skeleton className="h-5 mt-6 w-16" />
      <div className="w-full rounded-md grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
      </div>
    </>
  );
}
