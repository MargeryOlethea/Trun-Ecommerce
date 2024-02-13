import { FetchResponse, UserLoginInput } from "@/app/types/all.types";
import { login } from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// post/api/login
const loginInputSchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
});
export const POST = async (request: NextRequest) => {
  try {
    const data: UserLoginInput = await request.json();
    const parsedData = loginInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const token = await login(parsedData.data);

    return NextResponse.json<FetchResponse<string>>({
      status: 201,
      message: `Successfully login`,
      data: token,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "InvalidCredentials") {
        return NextResponse.json<FetchResponse<never>>(
          {
            status: 400,
            error: "Invalid email/password",
          },
          { status: 400 },
        );
      }
    }
    if (error instanceof z.ZodError) {
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return NextResponse.json<FetchResponse<never>>(
        {
          status: 400,
          error: `${errorPath} - ${errorMessage}`,
        },
        { status: 400 },
      );
    }

    return NextResponse.json<FetchResponse<never>>(
      {
        status: 500,
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
};
