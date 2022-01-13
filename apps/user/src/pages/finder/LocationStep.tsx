import { CheckboxField, Text, Title } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import { ChangeEventHandler, useEffect, useState } from "react";
import type { PublicProvider } from "vanellus";
import { BackLink } from "../../components/BackLink";
import { Link } from "../../components/Link";
import { ProviderCard } from "../../components/ProviderCard";
import { useUserApi } from "../UserApiContext";
import { Types, useFinderState } from "./FinderStateProvider";

export const LocationStep: React.FC = () => {
  const [filterAccessible, setFilterAccessible] = useState<boolean>(false);
  const [providers, setProviders] = useState<PublicProvider[] | null>(null);
  const api = useUserApi();
  const { dispatch, state } = useFinderState();

  useEffect(() => {
    api.getProviders("10000", "99999").then((providers) => {
      setProviders(providers);
    });
  }, [api]);

  const setProvider = (provider: PublicProvider) => {
    dispatch({
      type: Types.SET_PROVIDER,
      payload: { provider },
    });
  };

  const onFilterAccessibleChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFilterAccessible(event.currentTarget.checked);
  };

  return (
    <main id="finder-location">
      <BackLink href="/">
        <Trans id="user.finder.location.back-link">
          Zurück zu den allgemeinen Informationen
        </Trans>
      </BackLink>

      <Title variant="h1" as="h2" className="ml-4 sm:ml-0">
        <Trans id="user.finder.location.title">Impfstellen</Trans>
      </Title>

      <Text variant="text1" className="mb-8 ml-4 sm:ml-0">
        <Trans id="user.finder.location.intro">
          Wählen Sie aus den möglichen Optionen, wo Sie geimpft werden möchten.
        </Trans>
      </Text>

      <div className="mx-4 mb-8 lg:mx-8">
        <CheckboxField
          label={t({
            id: "user.finder.location.accessible.label",
            message: "Nur barrierefreie Impfstellen",
          })}
          name="accessible"
          onChange={onFilterAccessibleChange}
        />
      </div>

      <ul className="grid grid-flow-row gap-4 md:px-0 md:max-w-2xl">
        {providers === null ? (
          <div>loading...</div>
        ) : (
          providers
            .filter((provider) =>
              filterAccessible ? provider.accessible : true
            )
            .map((provider) => (
              <li key={provider.id}>
                <Link
                  href="/finder/appointment"
                  onClick={() => setProvider(provider)}
                  data-id={provider.id}
                  className="block"
                >
                  <ProviderCard provider={provider} />
                </Link>
              </li>
            ))
        )}
      </ul>
    </main>
  );
};
