import { db } from "@/db";
import { JWTBasic, verifyToken } from "@/lib/session";
import { defaultUsersSelect } from "@/trpc/routes/defaultsSelects";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

export type UserType = {
  email: string;
  name: string;
  id: number;
  activeWallet: number;
  Wallet: {
    name: string;
    id: number;
    currentAmount: number;
    profits: number;
    profitPercentage: number;
    invested: number;
    availableCash: number;
    Stocks: {
      id: number;
      ticket: string;
    }[];
  }[];
};

export function GetUserAuthentication() {
  async function fetchUser() {
    const token = await getCookie("token");
    if (token) {
      const verifiedToken = verifyToken(token) as JWTBasic;

      const user = await db.users.findUnique({
        where: {
          id: verifiedToken.id,
        },
        select: defaultUsersSelect,
      });

      setCookie("user", JSON.stringify(user));

      return user;
    }

    return null;
  }
  async function getUser() {
    const token = (await cookies()).get("token")?.value;
    const user = (await cookies()).get("user")?.value;

    if (token && user) {
      return JSON.parse(user) as UserType;
    }

    if (token) {
      return await fetchUser();
    }

    return null;
  }

  return {
    getUser,
    fetchUser,
  };
}
