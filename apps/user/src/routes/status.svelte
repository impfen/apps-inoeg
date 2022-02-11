<script lang="ts">
  import { goto } from "$app/navigation";
  import { cancelBooking, checkBookingStatus } from "$lib/api";
  import { AppointmentCard } from "$lib/components";
  import { booking } from "$lib/stores";
  import {
    addNotification,
    Content,
    Page,
    vaccines,
    type VaccineData,
  } from "@impfen/common";
  import { locale, t } from "svelte-intl-precompile";
  import { BookingStatus } from "vanellus";
  import GeneratePdf from "~icons/carbon/edit";

  const vaccine: VaccineData = vaccines[$locale]["mrna"]; // vaccines[locale][booking.appointment.vaccine as Vaccine];

  $: if (!$booking) {
    goto("/").catch((error) => {
      console.error(error);
      addNotification("BOOKING NOT FOUND");
    });
  }

  let status: BookingStatus;

  checkBookingStatus($booking)
    .then((newStatus) => {
      status = newStatus;

      return status;
    })
    .catch(async (error) => {
      console.error(error);

      $booking = null;

      await goto("/");
      addNotification("APPOINTMENT NOT FOUND");
    });

  const handleCancel: svelte.JSX.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (confirm($t("user.finder.success.cancelation-confirm"))) {
      await cancelBooking($booking);

      await goto("/");
    }
  };
</script>

{#if $booking}
  <Page title={$t("user.status.page-title")}>
    <Content>
      <article class="stack-v gap-m max-w-m">
        <h1 class="mx-4 mb-4 md:mx-0">
          {#if status === BookingStatus.VALID}
            Ihr Termin ist gebucht!
          {:else if status === BookingStatus.PROVIDER_CANCELED}
            Ihr Termin ist abgesagt!
          {:else if status === BookingStatus.USER_CANCELED}
            Du hast den Termin abgesagt!
          {:else}
            Fishy!
          {/if}
        </h1>

        {#if status}
          <section class="stack-v gap-m">
            <div class="booking-details">
              <div class="flex flex-col flex-1">
                <h2 class="book">Ihr Termin</h2>

                <AppointmentCard appointment={$booking.appointment} border />
              </div>

              <div class="flex flex-col flex-1">
                <h2 class="book">Ihr Buchungscode</h2>

                <div class="appointment-code">
                  {$booking.token.code.toUpperCase().slice(0, 4)}
                </div>
              </div>
            </div>

            <p class="text-2 mx-4 md:mx-0">
              <strong>Wichtig:</strong> Bitte notieren Sie sich den untenstehenden
              Code und bringen ihn unbedingt zur Impfung mit.
            </p>

            <div class="flex flex-col gap-4 mx-4 md:mx-0">
              <p class="text-2">
                Sollte Sie Ihren Termin nicht wahrnehmen können, stornieren Sie
                ihn bitte mit nachstehendem Button.
              </p>

              <div class="stack-h gap-s">
                <button
                  class="button tertiary m"
                  on:click|preventDefault={handleCancel}
                >
                  Termin absagen
                </button>

                <a class="button tertiary m" href="/logout">
                  Abschließen und weiteren Termin buchen
                </a>
              </div>
            </div>
          </section>

          <section class="stack-v gap-m">
            <h3>Das müssen Sie zur Impfung gegen COVID-19 mitbringen:</h3>

            <ul class="stack-v gap-s">
              <li>
                <strong>Ein amtliches Ausweisdokument</strong>
                <br />
                <i>(Personalausweis, Reisepass)</i>
              </li>

              <li>
                <strong>Impfpass</strong>
                <br />
                <i>
                  (wenn nicht vorhanden, erhalten Sie eine Ersatzbescheinigung.)
                </i>
              </li>

              <li>
                <strong>FFP2-Maske</strong>
                <br />
                <i>(zur Einhaltung der Hygienemaßnahmen)</i>
              </li>
            </ul>
          </section>

          <section class="stack-v gap-m">
            <h3 class="h2">Impfvorbereitungen</h3>

            <ul class="grid grid-flow-row gap-4 pb-6">
              {#each vaccine.pdfs as pdf}
                <li>
                  <a href={pdf.url} class="button tertiary m external">
                    <GeneratePdf aria-hidden />
                    <span class="break-all">{pdf.label}</span>
                  </a>
                </li>
              {/each}
            </ul>

            <p class="text-2">
              {vaccine.pdfDescription}
            </p>
          </section>

          <section class="stack-v gap-m">
            <h3 class="h4">
              Mit den folgenden Schritten können Sie sich zusätzlich auf Ihren
              Impftermin vorbereiten:
            </h3>

            <ul class="flex flex-col gap-4">
              <li>An- und Rückfahrt planen und organisieren</li>

              <li>
                Zeit für <strong>Nachbeobachtung</strong> einplanen.
                <br />
                <i>
                  (ca. 15 Minuten, bei bestimmten Vorerkrankungen gegebenenfalls
                  auch etwas länger)
                </i>
              </li>

              <li>
                Gedanken zur eigenen <strong>Krankheitsgeschichte</strong>{" "}
                <i>(zum Beispiel Allergien, Ohnmachtsanfälle)</i> machen, um diese
                der Ärztin oder dem Arzt bei der Impfung mitteilen und mögliche Risiken
                der Impfung abwägen zu können.
              </li>
            </ul>
          </section>
        {/if}
      </article>
    </Content>
  </Page>
{/if}