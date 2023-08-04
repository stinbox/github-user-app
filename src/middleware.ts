import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const domainPathMap: Record<string, string> = {
  "gh-y-hiraoka.stin.ink": "/y-hiraoka",
  "gh-uhyo.stin.ink": "/uhyo",
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = domainPathMap[url.hostname] ?? "";
  url.pathname = path + url.pathname;

  return NextResponse.rewrite(url);
}
