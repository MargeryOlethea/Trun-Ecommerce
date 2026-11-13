import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./db/utils/jose";
import { UserLoginPayload } from "./app/types/all.types";

export const middleware = async (request: NextRequest) => {
  if (request.url.includes("/api/wishlist")) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    // AUTHENTICATION
    if (!token) {
      return NextResponse.json(
        {
          status: 401,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // AUTHORIZATION

    try {
      const { payload }: { payload: UserLoginPayload } = await verifyToken(
        token.value,
      );

      const requestHeaders = new Headers(request.headers);

      if (payload) {
        requestHeaders.set("x-user-id", payload.userId.toString());
        requestHeaders.set("x-user-username", payload.username);

        return NextResponse.next({
          headers: requestHeaders,
        });
      }
    } catch {
      return NextResponse.json(
        {
          status: 401,
          error: "Invalid authentication token",
        },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
};
