import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Text,
  Title,
} from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { Provider } from "vanellus";
import { useMediatorApi } from "./MediatorApiContext";

interface UnconfirmProviderModal extends ModalProps {
  provider: Provider;
}

export const UnconfirmProviderModal: React.FC<UnconfirmProviderModal> = ({
  provider,
  onClose,
}) => {
  const api = useMediatorApi();

  const doUnconfirmProvider = () => {
    api.unconfirmProvider(provider).then(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Title variant="h3" as="h2">
          <Trans id="mediator.providers.unconfirm-modal.title">
            Anbieter freischalten
          </Trans>
        </Title>
      </ModalHeader>

      <ModalContent>
        <Text>
          <Trans id="mediator.providers.unconfirm-modal.intro">
            Wollen Sie den Anbieter wirklich freischalten?
          </Trans>
        </Text>

        <table className="table striped">
          <thead>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.field">
                  Feld
                </Trans>
              </th>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.value">
                  Wert
                </Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.name">Name</Trans>
              </th>
              <td>{provider.name}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.street">
                  Straße
                </Trans>
              </th>
              <td>{provider.street}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.city">
                  Stadt
                </Trans>
              </th>
              <td>{provider.city}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.zip-code">
                  Postleitzahl
                </Trans>
              </th>
              <td>{provider.zipCode}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.email">
                  E-Mail
                </Trans>
              </th>
              <td>{provider.email}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.phone">
                  Telefonnummer
                </Trans>
              </th>
              <td>{provider.phone}</td>
            </tr>
            <tr>
              <th>
                <Trans id="mediator.providers.unconfirm-modal.description">
                  Beschreibung
                </Trans>
              </th>
              <td>{provider.description}</td>
            </tr>
          </tbody>
        </table>
      </ModalContent>

      <ModalFooter>
        <Button onClick={doUnconfirmProvider}>
          <Trans id="mediator.providers.unconfirm-modal.button-confirm">
            Anbieter sperren
          </Trans>
        </Button>
      </ModalFooter>
    </Modal>
  );
};
