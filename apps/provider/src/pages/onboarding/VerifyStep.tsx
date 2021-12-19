// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Button, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { Link } from "components/Link";
import { useRouter } from "next/router";
import { useProviderApi } from "pages/ProviderApiContext";
import { ChangeEventHandler } from "react";
import { ProviderDataSummary } from "../ProviderDataSummary";
import { useOnboardingState } from "./OnboardingStateProvider";

/*
Here the user has a chance to review all data that was entered before confirming
the setup. Once the button gets clicked, the system generates the QR
codes, encrypts the contact data and stores the settings in the storage backend.
*/
export const VerifyStep: React.FC = () => {
  const api = useProviderApi();
  const { state } = useOnboardingState();
  const router = useRouter();

  const submit: ChangeEventHandler<HTMLButtonElement> = () => {
    api.register(state.data).then(() => {
      router.push("/onboarding/secret");
    });
  };

  return (
    <main className="content">
      <div className="lg:w-2/3">
        <Title>Bitte überprüfen Sie ihre Daten</Title>

        {state.data && <ProviderDataSummary provider={state.data} />}

        <div className="flex justify-between">
          <Link href="/onboarding/data" type="button" variant="secondary">
            <Trans id="provider.onboarding.verify.edit-data">Anpassen</Trans>
          </Link>

          <Button onClick={submit}>
            <Trans id="provider.onboarding.verify.button">Weiter</Trans>
          </Button>
        </div>
      </div>
    </main>
  );
};
