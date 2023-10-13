import { FC } from "react";

const Page: FC = async () => {
  return (
    <h1 className="text-xl font-bold">
      {process.env.STATIC_EXPORT ? "S3 Provided" : "Vercel Provided"}
    </h1>
  );
};

export default Page;
