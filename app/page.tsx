export default function Home() {
  return (
    <main className="w-dvw h-dvh flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl lg:text-4xl text-foreground/80 font-medium">
        <span className="tracking-tighter font-semibold text-primary ">
          Wallet
        </span>
        SIM
      </h1>
      <div className="flex items-center gap-2">
        <span className="animate-bounce [animation-delay:-0.3s] size-4 bg-primary/75 inline-block rounded-full"></span>
        <span className="animate-bounce [animation-delay:-0.15s] size-4 bg-primary/75 inline-block rounded-full"></span>
        <span className="animate-bounce size-4 mr-px bg-primary/75 inline-block rounded-full"></span>
      </div>
    </main>
  );
}
