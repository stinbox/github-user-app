import { FC } from "react";

const Page: FC<{
  searchParams: {
    username: string | string[] | undefined;
  };
}> = async ({ searchParams }) => {
  const githubUser = await fetch(
    `https://api.github.com/users/${searchParams.username ?? "hanetsuki"}`
  ).then((res) => res.json());

  return (
    <main className="p-16">
      <div className="flex space-x-4">
        <img
          src={githubUser.avatar_url}
          alt={githubUser.name}
          className="rounded-full w-32 h-32"
        />
        <div>
          <p className="text-xl text-gray-700">{githubUser.login}</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            {githubUser.name}
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Page;
