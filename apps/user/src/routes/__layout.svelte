<script lang="ts" context="module">
  import { booking } from "$lib/stores";
  import de from "$locales/de";
  import { handleErrors, Layout, NavLink } from "@impfen/common";
  import dayjs from "dayjs";
  import "dayjs/locale/de.js";
  import "dayjs/locale/en.js";
  import localeData from "dayjs/plugin/localeData.js";
  import timezone from "dayjs/plugin/timezone.js";
  import utc from "dayjs/plugin/utc.js";
  import {
    addMessages,
    getLocaleFromNavigator,
    init,
    locale,
    register,
    t,
  } from "svelte-intl-precompile";
  import CalendarIcon from "~icons/carbon/calendar";
  import HelpIcon from "~icons/carbon/help";
  import LoginIcon from "~icons/carbon/login";
  import LogoutIcon from "~icons/carbon/logout";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localeData);

  addMessages("de", de);
  register("en", () => import("$locales/en"));
</script>

<script lang="ts">
  const defaultLocale = "de";

  const userLocale = getLocaleFromNavigator(defaultLocale).substring(0, 2);

  init({
    initialLocale:
      userLocale === "de" || userLocale === "en" ? userLocale : defaultLocale,
    fallbackLocale: defaultLocale,
  });

  dayjs.locale(defaultLocale);
  dayjs.tz.setDefault("Europe/Berlin");

  locale.subscribe((l) => {
    dayjs.locale(l);
  });
</script>

<svelte:window on:error={handleErrors} on:unhandledrejection={handleErrors} />

<Layout>
  <svelte:fragment slot="nav">
    {#if $booking}
      <NavLink href="/status"
        ><CalendarIcon aria-hidden />{$t("user.menu.booking-status")}</NavLink
      >
    {:else}
      <NavLink href="/finder"
        ><CalendarIcon aria-hidden />{$t("user.menu.book-appointment")}</NavLink
      >
    {/if}
    <NavLink href="/faq"><HelpIcon aria-hidden />{$t("user.menu.faq")}</NavLink>
    {#if $booking}
      <NavLink href="/logout"
        ><LogoutIcon aria-hidden />{$t("user.menu.logout")}</NavLink
      >
    {:else}
      <NavLink href="/login"
        ><LoginIcon aria-hidden />{$t("user.menu.booking-status")}</NavLink
      >
    {/if}
  </svelte:fragment>

  <slot />
</Layout>
