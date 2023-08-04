import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const domainUsernameMap: Record<string, string> = {
  "gh-y-hiraoka.stin.ink": "y-hiraoka",
  "gh-uhyo.stin.ink": "uhyo",
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const username = domainUsernameMap[url.hostname];
  username && url.searchParams.set("username", username);

  return NextResponse.rewrite(url);
}
