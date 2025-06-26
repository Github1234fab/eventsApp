<script>
  import { jsonDataByDate } from "../lib/store.js";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import { writable } from "svelte/store";

  let filterLieu = writable("");
  let filterCategory = writable("");
  let filterDate = writable("");
  $: console.log("Contenu du store jsonDataByDate:", $jsonDataByDate);
$: console.log("Clés disponibles (dates) dans jsonDataByDate:", Object.keys($jsonDataByDate));

  let events = {};
  let filteredEvents = [];

  onMount(() => {
    jsonDataByDate.subscribe((value) => {
      events = value;
      applyFilters();
    });

    filterLieu.subscribe(() => applyFilters());
    filterCategory.subscribe(() => applyFilters());
    filterDate.subscribe(() => applyFilters());
  });

  $: console.log("Contenu brut de jsonDataByDate:", JSON.stringify($jsonDataByDate, null, 2));
  console.log("Données avant filtrage:", jsonDataByDate);


  function applyFilters() {
    console.log("Événement: ", JSON.stringify(event, null, 2));

    let today = new Date();
    today.setHours(0, 0, 0, 0); // Mettre l'heure à minuit pour comparaison

    let filtered = Object.keys(events)
      .flatMap((date) => events[date])
      // Filtrer les événements pour exclure ceux avant aujourd'hui
      .filter((event) => new Date(event.date) >= today);

    // Appliquer les autres filtres
    if ($filterLieu) {
      filtered = filtered.filter((event) => event.lieu === $filterLieu);
    }

    if ($filterCategory) {
      filtered = filtered.filter(
        (event) => event.catégorie === $filterCategory
      );
    }

    if ($filterDate) {
      filtered = filtered.filter((event) => matchDate(event.date, $filterDate));
    }

    filteredEvents = filtered.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  function matchDate(eventDate, filterDate) {
    const today = new Date();
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    switch (filterDate) {
      case "Aujourd'hui":
        return event.toDateString() === today.toDateString();
      case "Cette semaine":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return event >= startOfWeek && event <= endOfWeek;
      case "Ce week-end":
        const weekendStart = new Date(today);
        weekendStart.setDate(today.getDate() + (6 - today.getDay()));
        const weekendEnd = new Date(weekendStart);
        weekendEnd.setDate(weekendStart.getDate() + 1);
        return event >= weekendStart && event <= weekendEnd;
      case "Ce mois-ci":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        return event >= startOfMonth && event <= endOfMonth;
      default:
        return true;
    }
  }
</script>

<Header {filterLieu} {filterCategory} {filterDate} />

<div class="wrapper-cards">
  {#each filteredEvents as event}
    <Card {...event} />
  {/each}
</div>

<style>
  .wrapper-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    min-height: 100%;
    gap: 50px;
    padding-top: 250px;
    background-color: rgb(255, 77, 0);
    margin: 0px auto;
  }
  @media screen and (max-width: 768px) {
    .wrapper-cards {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;
      gap: 50px;
      padding-top: 250px;
      background-color: rgb(255, 77, 0);
      padding-bottom: 100px;
    }
  }
</style>


<!-- =========================================================== -->







<!-- ============================================== -->

<!-- <script>
  import { jsonDataByDate } from "../lib/store.js";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";

  let events = {}; // Stocke les événements

  onMount(() => {
    jsonDataByDate.subscribe((value) => {
      events = value;
    });
  });
</script>


<div class="wrapper-cards">
  {#if Object.keys(events).length > 0}
    {#each Object.keys(events) as date}
      <h2>{date}</h2>
      {#each events[date] as event}
        <Card {...event} />
      {/each}
    {/each}
  {:else}
    <p>Aucun événement disponible.</p>
  {/if}
</div> -->

<!-- <style>
  .wrapper-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    min-height: 100%;
    gap: 50px;
    padding-top: 250px;
    background-color: rgb(255, 77, 0);
    margin: 0px auto;
  }
</style> -->



















<!-- ============================================================ -->


<!-- 
<script>
  import { jsonDataByDate } from "../lib/store.js";
  import Card from "./Card.svelte";
  import { onMount, onDestroy } from "svelte";
  import Header from "./Header.svelte";
  import { writable } from "svelte/store";

  // ✅ Déclaration des stores avec `export let`
  export let filterLieu = writable("");
  export let filterCategory = writable("");
  export let filterDate = writable("");

  let events = {};
  let filteredEvents = [];

  onMount(() => {
    // ✅ Stocker les abonnements pour les annuler ensuite
    const unsubscribeJson = jsonDataByDate.subscribe((value) => {
      events = value;
      applyFilters();
    });

    const unsubscribeLieu = filterLieu.subscribe(() => applyFilters());
    const unsubscribeCategory = filterCategory.subscribe(() => applyFilters());
    const unsubscribeDate = filterDate.subscribe(() => applyFilters());

    // ✅ Annuler les abonnements quand le composant est détruit
    onDestroy(() => {
      unsubscribeJson();
      unsubscribeLieu();
      unsubscribeCategory();
      unsubscribeDate();
    });
  });

  function applyFilters() {
    // ✅ Vérifier que `events` est bien un objet
    if (!events || typeof events !== "object") {
      filteredEvents = [];
      return;
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0); // Mettre l'heure à minuit pour comparaison

    let filtered = Object.keys(events)
      .flatMap((date) => events[date] || []) // ✅ Vérifier que `events[date]` existe
      .filter((event) => new Date(event.date) >= today);

    // ✅ Utiliser `$filterLieu`, `$filterCategory`, `$filterDate`
    if ($filterLieu) {
      filtered = filtered.filter((event) => event.lieu === $filterLieu);
    }

    if ($filterCategory) {
      filtered = filtered.filter((event) => event.catégorie === $filterCategory);
    }

    if ($filterDate) {
      filtered = filtered.filter((event) => matchDate(event.date, $filterDate));
    }

    // ✅ Trier les événements par date
    filteredEvents = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  function matchDate(eventDate, filterDate) {
    const today = new Date();
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    switch (filterDate) {
      case "Aujourd'hui":
        return event.toDateString() === today.toDateString();
      case "Cette semaine":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return event >= startOfWeek && event <= endOfWeek;
      case "Ce week-end":
        const weekendStart = new Date(today);
        weekendStart.setDate(today.getDate() + (6 - today.getDay()));
        const weekendEnd = new Date(weekendStart);
        weekendEnd.setDate(weekendStart.getDate() + 1);
        return event >= weekendStart && event <= weekendEnd;
      case "Ce mois-ci":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return event >= startOfMonth && event <= endOfMonth;
      default:
        return true;
    }
  }

  // ✅ Rendre `filteredEvents` réactif
  $: filteredEvents;
</script>

<Header {filterLieu} {filterCategory} {filterDate} />

<div class="wrapper-cards">
  {#each filteredEvents as event}
    <Card {...event} />
  {/each}
</div>

<style>
  .wrapper-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    min-height: 100%;
    gap: 50px;
    padding-top: 250px;
    background-color: rgb(255, 77, 0);
    margin: 0px auto;
  }
  @media screen and (max-width: 768px) {
    .wrapper-cards {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;
      gap: 50px;
      padding-top: 250px;
      background-color: rgb(255, 77, 0);
      padding-bottom: 100px;
    }
  }
</style> -->
