<script>
        import { jsonDataByDate } from "../lib/store.js"; // Importer le store
        import Card from "./Card.svelte"; // Importer ton composant Card
        import { onMount } from "svelte";

        let events = {}; // Stocker les événements initiaux
        let filteredEvents = []; // Stocker les événements filtrés après l'affichage

        // Listes pour les filtres déroulants
        const lieux = [
                "Aveize",
                "Beauvallon",
                "Brindas",
                "Brignais",
                "Brullioles",
                "Brussieu",
                "Chabanière",
                "Chambost Longessaigne",
                "Chapelle sur Coise, La",
                "Châtelus",
                "Chaussan",
                "Chevrières",
                "Coise",
                "Craponne",
                "Duerne",
                "Grammond",
                "Grézieu le Marché",
                "Haute Rivoire",
                "Larajasse",
                "Les Halles",
                "Longessaigne",
                "Maringes",
                "Messimy",
                "Meys",
                "Montromant",
                "Montrottier",
                "Mornant",
                "Orliénas",
                "Pomeys",
                "Pollionnay",
                "Riverie",
                "Rontalon",
                "Saint André la Côte",
                "Saint Clément les Places",
                "Saint Denis sur Coise",
                "Saint Genis l’Argentière",
                "Saint Laurent de Chamousset",
                "Saint Laurent d'Agny",
                "Saint Martin en Haut",
                "Saint Symphorien sur Coise",
                "Sainte Catherine",
                "Sainte Consorce",
                "Sainte Foy l’Argentière",
                "Soucieu-en-Jarrest",
                "Souzy",
                "Taluyers",
                "Thurins",
                "Vaugneray",
                "Villechenève",
                "Viricelles",
                "Virigneux",
                "Yzeron",
        ];

        const categories = ["Cinema", "Musées et visites", "Loisirs et jeux", "Fête", "Atelier", "Activité sportive", "Baignade", "Cours et stages", "Balades", "Parcs", "Resto et goûter", "Brocante et foire", "Concert", "Conférence", "Concours", "Lecture", "Enfant", "Sortie", "Exposition", "Sports", "Culture"];

        const datesOptions = ["Aujourd'hui", "Cette semaine", "Ce week-end", "Ce mois-ci"];

        // Variables pour les filtres
        let filterLieu = "";
        let filterCategory = "";
        let filterDate = "";

        // Charger les événements au montage du composant
        onMount(() => {
                jsonDataByDate.subscribe((value) => {
                        events = value;
                        // Initialement, afficher tous les événements
                        // filteredEvents = Object.keys(events).flatMap(date => events[date]);
                        filteredEvents = Object.keys(events)
                                .flatMap((date) => events[date])
                                // Trier par date (du plus récent au plus lointain)
                                .sort((a, b) => new Date(a.date) - new Date(b.date));
                });
        });

        // Fonction pour filtrer dynamiquement après affichage
        // function applyFilters() {
        //         filteredEvents = Object.keys(events).flatMap(date => events[date]).filter(event => {
        //                 return (!filterLieu || event.lieu === filterLieu) &&
        //                        (!filterCategory || event.catégorie === filterCategory) &&
        //                        (!filterDate || matchDate(event.date, filterDate));
        //         });
        // }
        function applyFilters() {
                // Commence avec tous les événements
                let filtered = Object.keys(events).flatMap((date) => events[date]);

                // Filtre par lieu si sélectionné
                if (filterLieu) {
                        filtered = filtered.filter((event) => event.lieu === filterLieu);
                }

                // Filtre par catégorie si sélectionné
                if (filterCategory) {
                        filtered = filtered.filter((event) => event.catégorie === filterCategory);
                }

                // Filtre par date si sélectionné
                if (filterDate) {
                        filtered = filtered.filter((event) => matchDate(event.date, filterDate));
                }

                // Met à jour les événements filtrés
                filteredEvents = filtered;
        }

        // Fonction pour gérer la logique de filtrage des dates
        function matchDate(eventDate, filterDate) {
                const today = new Date();
                console.log("Today:", today);
                const event = new Date(eventDate);
                console.log("Event:", event);

                // Remettre l'heure de l'événement à 00:00 pour faciliter la comparaison
                event.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                switch (filterDate) {
                        case "Aujourd'hui":
                                return event.toDateString() === today.toDateString();

                        case "Cette semaine":
                                const startOfWeek = new Date(today);
                                startOfWeek.setDate(today.getDate() - today.getDay()); // Commence lundi
                                const endOfWeek = new Date(startOfWeek);
                                endOfWeek.setDate(startOfWeek.getDate() + 6); // Dimanche
                                return event >= startOfWeek && event <= endOfWeek;

                        case "Ce week-end":
                                const weekendStart = new Date(today);
                                weekendStart.setDate(today.getDate() + (6 - today.getDay())); // Samedi
                                const weekendEnd = new Date(weekendStart);
                                weekendEnd.setDate(weekendStart.getDate() + 1); // Dimanche
                                return event >= weekendStart && event <= weekendEnd;

                        case "Ce mois-ci":
                                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                                return event >= startOfMonth && event <= endOfMonth;

                        default:
                                return true; // Si aucun filtre de date n'est appliqué
                }
        }
        function resetFilters() {
                filterLieu = ""; // Réinitialise le filtre de lieu
                filterCategory = ""; // Réinitialise le filtre de catégorie
                filterDate = ""; // Réinitialise le filtre de date
                applyFilters(); // Réapplique les filtres (sans filtres dans ce cas)
        }
</script>

<!-- Interface utilisateur pour les filtres -->
<div class="filter-controls">
        <select bind:value={filterLieu} on:change={applyFilters}>
                <option value="">Ou ?</option>
                {#each lieux as lieu}
                        <option value={lieu}>{lieu}</option>
                {/each}
        </select>

        <select bind:value={filterCategory} on:change={applyFilters}>
                <option value="">Quoi ?</option>
                {#each categories as category}
                        <option value={category}>{category}</option>
                {/each}
        </select>

        <select bind:value={filterDate} on:change={applyFilters}>
                <option value="">Quand ?</option>
                {#each datesOptions as dateOption}
                        <option value={dateOption}>{dateOption}</option>
                {/each}
        </select>
        <button on:click={resetFilters}>Réinitialiser les filtres</button>
</div>

<!-- Afficher les cartes d'événements (avec ou sans filtres) -->
<div class="wrapper-cards">
        {#each filteredEvents as event}
                <Card catégorie={event.catégorie} titre={event.titre} description={event.description} date={event.date} début={event.début} fin={event.fin} tarif={event.tarif} lieu={event.lieu} image={event.image} lien={event.lien} />
        {/each}
</div>

<style>
        .filter-controls {
                display: flex;
                justify-content: first baseline;
                flex-wrap: wrap;
                position: fixed;
                background-color: whitesmoke;
                margin-top: -150px;
 
        }
        select {
                padding: 5px 10px;
                margin: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
        }
        button {
                padding: 10px;
                margin: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
                background-color: #e3d2d2;
        }
        .wrapper-cards {
                display: flex;
        flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 200px;
        }
</style>
