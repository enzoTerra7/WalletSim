import { Aside } from "@/components/aside";
import { Header } from "@/components/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <Header />
        <div className={`h-full overflow-hidden flex w-dvw`}>
          <Aside />
          <main className={`w-full p-4 overflow-auto`}>{children}</main>
        </div>
      </div>
    </>
  );
}
