<script lang="ts">
  import { goto } from "$app/navigation";
  import { login } from "$lib/api";
  import { keyPairs } from "$lib/stores";
  import { addNotification, Content, Page } from "@impfen/common";
  import { t } from "svelte-intl-precompile";
  import type { AESData } from "vanellus";

  let isValid: boolean;
  let secret: string;
  let files: FileList;
  let encryptedBackupData: AESData;

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = () => {
    if (files[0]) {
      const reader = new FileReader();

      reader.addEventListener("loadend", () => {
        try {
          encryptedBackupData = JSON.parse(reader.result.toString()) as AESData;
        } catch (error) {
          isValid = false;
          addNotification("JSON-ERROR...");
          console.error(error);
        }

        login(encryptedBackupData, secret)
          .then(() => goto("/schedule"))
          .catch((error: Error) => {
            isValid = false;
            addNotification("DECRYPTION-ERROR...");
            console.error(error);
          });
      });

      reader.readAsBinaryString(files[0]);
    } else {
      isValid = false;
    }
  };

  $: if ($keyPairs) {
    goto("/schedule").catch((error) => {
      addNotification("ERROR...");
      console.error(error);
    });
  }
</script>

<Page title={$t("provider.welcome.page-title")}>
  <Content class="stack-v gap-m m">
    <h1 class="h1">{$t("provider.welcome.title")}</h1>

    <p class="text-1">{$t("provider.welcome.intro")}</p>

    <form
      name="login"
      class="stack-v gap-m"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="field">
        <label for="secret" class="label"
          >{$t("provider.welcome.label-secret")}</label
        >
        <input
          type="text"
          id="secret"
          name="secret"
          required
          minlength={24}
          maxlength={24}
          pattern={`[a-zA-Z0-9]{24}`}
          style:width="100%"
          bind:value={secret}
        />
      </div>

      <div class="field">
        <label for="keyPairs" class="label"
          >{$t("provider.welcome.label-keypairs")}</label
        >
        <input
          type="file"
          id="keyPairs"
          name="keyPairs"
          class="upload"
          accept=".enc"
          required
          bind:files
        />
      </div>

      <button type="submit" class="button primary l"
        >{$t("provider.welcome.button-submit")}</button
      >
    </form>
  </Content>
</Page>