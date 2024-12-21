import { maxHeightClass, minHeightClass } from "@/lib/style";
import { Nav } from "./nav";
import { NavBottom } from "./nav-bottom";
import { ActiveWallet } from "./active-wallet";

export function Aside() {
  return (
    <>
      <aside
        className={`h-full ${maxHeightClass} ${minHeightClass} bg-card w-80 border-r flex flex-col gap-4 border-border`}
      >
        <ActiveWallet />
        <Nav className="pt-0" />
        <NavBottom />
      </aside>
    </>
  );
}
