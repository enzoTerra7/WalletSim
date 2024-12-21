import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
    return decoded as JWTBasic;
  } catch {
    return undefined;
  }
}

export async function getToken() {
  const usableCookies = await cookies();

  const authenticatedCookie = usableCookies.get("token");

  if (
    authenticatedCookie?.value &&
    authenticatedCookie?.value.split(" ")[0] === "Bearer"
  ) {
    const token = authenticatedCookie.value.split(" ")[1];
    return token;
  }
  return null;
}

export async function generateJwt(obj: JWTBasic) {
  const token = jwt.sign(obj, process.env.NEXT_PUBLIC_JWT_SECRET!);
  return token;
}

export type JWTBasic = {
  id: number;
  email: string;
  name: string;
  wallets?: {
    name: string;
    id: number;
    currentAmount: number;
    profits: number;
    profitPercentage: number;
    Stocks: {
      id: number;
      ticket: string;
    }[];
  }[];
  activeWallet?: number;
  hasWallet?: boolean;
};
