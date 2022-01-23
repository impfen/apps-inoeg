import { Loading } from "@impfen/common";
import { ProviderData } from "components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { decodeBase64url } from "vanellus";

const ProviderShowPage: NextPage = () => {
  const router = useRouter();
  const id = decodeBase64url(router.query?.id as string);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ProviderData id={id} />
      </Suspense>
    </main>
  );
};

export default ProviderShowPage;
