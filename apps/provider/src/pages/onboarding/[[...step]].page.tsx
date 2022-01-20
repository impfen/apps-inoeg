import {
  DataStep,
  OnboardingStateProvider,
  SecretStep,
  VerifyStep,
} from "components/onboarding";
import { useApp } from "lib/AppProvider";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

enum Steps {
  data = "data",
  secret = "secret",
  verify = "verify",
}

const defaultStep = Steps.data;

const StepRenderer: React.FC<{ step: string }> = ({ step }) => {
  switch (step) {
    case Steps.data: {
      return <DataStep />;
    }

    case Steps.secret: {
      return <SecretStep />;
    }

    case Steps.verify:
    default: {
      return <VerifyStep />;
    }
  }
};

const OnboardingPage: NextPage<{ step?: Steps }> = ({ step = defaultStep }) => {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  if (isAuthenticated) {
    router.push("/account");

    return null;
  }

  return (
    <OnboardingStateProvider>
      <StepRenderer step={step} />
    </OnboardingStateProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      step: params?.step?.[0] || defaultStep,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      "/onboarding/",
      "/onboarding/data",
      "/onboarding/secret",
      "/onboarding/verify",
    ],
    fallback: false,
  };
};

export default OnboardingPage;
