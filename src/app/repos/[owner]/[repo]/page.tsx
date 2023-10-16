import { octokit } from "@/app/octokit";
import { draftMode } from "next/headers";
import { FC } from "react";

const Page: FC<{ params: { owner: string; repo: string } }> = async ({
  params,
}) => {
  const { isEnabled } = draftMode();

  const repoQuery = await octokit.repos.get({
    owner: params.owner,
    repo: params.repo,
  });

  return (
    <div>
      {isEnabled && (
        <p className="text-xl text-red-500 font-medium">
          Draft Mode is enabled.
        </p>
      )}
      <pre>{JSON.stringify(repoQuery.data, null, 2)}</pre>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const reposQuery = await octokit.repos.listForUser({
    username: "facebook",
  });

  return reposQuery.data.map((repo) => ({
    owner: repo.owner.login,
    repo: repo.name,
  }));
}
