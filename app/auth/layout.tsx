import { Header } from "@/components/header";
import { MaxWidthWrapper } from "@/components/maxWrapper";
import { maxHeightClass, minHeightClass } from "@/lib/style";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <Header />
        <div
          className={`h-full overflow-auto ${maxHeightClass} ${minHeightClass}`}
        >
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </div>
      </div>
    </>
  );
}
