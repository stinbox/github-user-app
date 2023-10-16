import { octokit } from "@/app/octokit";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerParam = searchParams.get("owner");
  const repoParam = searchParams.get("repo");

  if (!ownerParam || !repoParam) {
    return new Response("Missing owner or repo", { status: 400 });
  }

  console.log("Checking if repo exists", ownerParam, repoParam);
  const repoQuery = await octokit.repos
    .get({
      owner: ownerParam,
      repo: repoParam,
    })
    .catch(() => null);

  if (repoQuery === null) {
    return new Response("Invalid owner or repo", { status: 401 });
  }

  draftMode().enable();
  redirect(`/repos/${ownerParam}/${repoParam}`);
}
