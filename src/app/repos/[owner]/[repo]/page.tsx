import { octokit } from "@/app/octokit";
import { FC } from "react";

const Page: FC<{ params: { owner: string; repo: string } }> = async ({
  params,
}) => {
  const repoQuery = await octokit.repos.get({
    owner: params.owner,
    repo: params.repo,
  });

  return <pre>{JSON.stringify(repoQuery.data, null, 2)}</pre>;
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
