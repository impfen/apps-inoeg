import { Divider, Link, Message, Section, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { LoginForm } from "components/LoginForm";
import type { NextPage } from "next";
import { useSearchParam } from "react-use";

const ProviderStartPage: NextPage = () => {
  const notice = useSearchParam("notice");

  return (
    <main className="content">
      <Title variant="h1">
        <Trans id="provider.welcome.title">Impstellen</Trans>
      </Title>

      {notice === "thankyou" && (
        <Message variant="success">
          <Trans id="provider.welcome.loggedout-.notice">
            Sie wurden erfolgreich abgemeldet. Sie können Ihre Daten jederzeit
            mit Ihrem Datenschlüssel und Ihrer Sicherheitsdatei
            wiederherstellen.
          </Trans>
        </Message>
      )}

      <Section className="mt-10 w-full sm:mt-0">
        <Title variant="h2">Als neue Impfstelle registrieren</Title>

        <Link type="button" variant="primary" href="/onboarding">
          Registrierung starten
        </Link>
      </Section>

      <Divider className="my-12" />

      <Section className="mt-10 w-full sm:mt-0">
        <Title variant="h2">Mit bestehendem Account einloggen</Title>

        <LoginForm className="mt-5 w-full md:col-span-2 md:mt-0" />
      </Section>
    </main>
  );
};

export default ProviderStartPage;
