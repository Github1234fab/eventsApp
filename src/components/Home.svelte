<!-- <script>
    import { jsonDataByDate } from "../lib/store.js"; // Importer le store
    import Card from "./Card.svelte"; // Importer le composant Card
    import { onMount } from "svelte";
    import Header from "./Header.svelte"; // Importer Header pour les filtres
    import { writable } from "svelte/store";


    // Stores pour les filtres (qui seront partagés avec Header)
    let filterLieu = writable("");
    let filterCategory = writable("");
    let filterDate = writable("");

    let events = {}; // Stocker les événements initiaux
    let filteredEvents = []; // Stocker les événements filtrés après l'affichage

    // Charger les événements au montage du composant
    onMount(() => {
        jsonDataByDate.subscribe((value) => {
            events = value;
            applyFilters(); // Appliquer les filtres initialement
        });

        // Réappliquer les filtres à chaque changement des filtres
        filterLieu.subscribe(() => applyFilters());
        filterCategory.subscribe(() => applyFilters());
        filterDate.subscribe(() => applyFilters());
    });

    // Fonction pour appliquer les filtres
    function applyFilters() {
        let filtered = Object.keys(events).flatMap((date) => events[date]);

        // Filtrer par lieu
        if ($filterLieu) {
            filtered = filtered.filter((event) => event.lieu === $filterLieu);
        }

        // Filtrer par catégorie
        if ($filterCategory) {
            filtered = filtered.filter((event) => event.catégorie === $filterCategory);
        }

        // Filtrer par date
        if ($filterDate) {
            filtered = filtered.filter((event) => matchDate(event.date, $filterDate));
        }

        // Met à jour les événements filtrés
        filteredEvents = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Fonction pour gérer le filtrage des dates
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
</script>

<Header {filterLieu} {filterCategory} {filterDate} />

<!-- Affichage des événements -->


<!-- <div class="wrapper-cards">
    {#each filteredEvents as event}
        <Card {...event} />
    {/each}
</div>

<style>
   
    .wrapper-cards {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        min-height:100%;
    }
    @media screen and (max-width: 768px) {
        .wrapper-cards {
               margin-top:150px;
        }
    }
</style> --> -->


<script>
    import { jsonDataByDate } from "../lib/store.js";
    import Card from "./Card.svelte";
    import { onMount } from "svelte";
    import Header from "./Header.svelte";
    import { writable } from "svelte/store";

    let filterLieu = writable("");
    let filterCategory = writable("");
    let filterDate = writable("");

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

    function applyFilters() {
        let filtered = Object.keys(events).flatMap((date) => events[date]);

        if ($filterLieu) {
            filtered = filtered.filter((event) => event.lieu === $filterLieu);
        }

        if ($filterCategory) {
            filtered = filtered.filter((event) => event.catégorie === $filterCategory);
        }

        if ($filterDate) {
            filtered = filtered.filter((event) => matchDate(event.date, $filterDate));
        }

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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        min-height:100%;
    }
    @media screen and (max-width: 768px) {
        .wrapper-cards {
               margin-top:150px;
        }
    }
</style> 