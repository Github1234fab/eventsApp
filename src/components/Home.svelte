<!-- <script>
        import { jsonDataByDate } from "../lib/store.js"; // Importer le store
        import Card from "./Card.svelte"; // Importer ton composant Card
        import { onMount } from "svelte";

        let events = {}; // Variable pour stocker les événements à afficher

        onMount(() => {
                jsonDataByDate.subscribe((value) => {
                        events = value;
                        console.log(events);
                });
        });
</script>


<div class="wrapper-cards">
        {#each Object.keys(events) as date}
                {#each events[date] as event}
                        <Card catégorie={event.catégorie} titre={event.titre} description={event.description} date={event.date} début={event.début} fin={event.fin} tarif={event.tarif} lieu={event.lieu} image={event.image} lien={event.lien} />
                {/each}
        {/each}
</div>

<style>
        .wrapper-cards {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                padding: 20px;
                flex: 0 0 1;
                min-height: auto;
        }
</style> -->


<script>
        import { jsonDataByDate } from "../lib/store.js"; // Importer le store
        import Card from "./Card.svelte"; // Importer ton composant Card
        import { onMount } from "svelte";

        let events = {}; // Stocker les événements initiaux
        let filteredEvents = []; // Stocker les événements filtrés après l'affichage

        // Fonction pour trier les événements par date (du plus récent au plus lointain)
        function sortEventsByDate(events) {
                let allEvents = [];

                // Parcourir les dates et extraire tous les événements dans un tableau
                for (let date in events) {
                        allEvents = allEvents.concat(events[date]);
                }

                // Trier les événements par date (ordre décroissant)
                allEvents.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateB - dateA; // Du plus récent au plus lointain
                });

                return allEvents;
        }

        // Listes pour les filtres déroulants
        const lieux = [
                "Aveize", "Beauvallon", "Brindas", "Brignais", "Brullioles", "Brussieu", "Chabanière", "Chambost Longessaigne",
                "Chapelle sur Coise, La", "Châtelus", "Chaussan", "Chevrières", "Coise", "Craponne", "Duerne", "Grammond", 
                "Grézieu le Marché", "Haute Rivoire", "Larajasse", "Les Halles", "Longessaigne", "Maringes", "Messimy", "Meys",
                "Montromant", "Montrottier", "Mornant", "Orliénas", "Pomeys", "Pollionnay", "Riverie", "Rontalon", 
                "Saint André la Côte", "Saint Clément les Places", "Saint Denis sur Coise", "Saint Genis l’Argentière", 
                "Saint Laurent de Chamousset", "Saint Laurent d'Agny", "Saint Martin en Haut", "Saint Symphorien sur Coise",
                "Sainte Catherine", "Sainte Consorce", "Sainte Foy l’Argentière", "Soucieu-en-Jarrest", "Souzy", "Taluyers", 
                "Thurins", "Vaugneray", "Villechenève", "Viricelles", "Virigneux", "Yzeron"
        ];

        const categories = [
                "Cinema", "Musées et visites", "Loisirs et jeux", "Fête", "Atelier", "Activité sportive", "Baignade", 
                "Cours et stages", "Balades", "parcs", "Resto et goûter", "Brocante et foire", "Concert", "Conférence",
                "Concours", "Lecture", "Enfant", "Sortie", "Exposition", "Festival", "Marché", "Nature", "Spectacle", "Sports",
        ];

        const datesOptions = ["Aujourd'hui", "Cette semaine", "Ce week-end", "Ce mois-ci"];

        // Variables pour les filtres
        let filterLieu = "";
        let filterCategory = "";
        let filterDate = "";

        // Charger les événements au montage du composant
        onMount(() => {
                jsonDataByDate.subscribe((value) => {
                        events = value;

                        // Trier les événements par date et assigner à filteredEvents (sans filtre pour l'instant)
                        filteredEvents = sortEventsByDate(events);
                                console.log("Filtered Events:", filteredEvents); // Log pour vérifier les événements filtrés
                });
        });

        // Fonction pour filtrer dynamiquement après affichage
        function applyFilters() {
                filteredEvents = Object.keys(events).flatMap(date => events[date]).filter(event => {
                        return (!filterLieu || event.lieu === filterLieu) &&
                               (!filterCategory || event.catégorie === filterCategory) &&
                               (!filterDate || matchDate(event.date, filterDate));
                });

        

        //         // Après filtrage, trier les résultats par date (ordre décroissant)
        //         filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
        // }

            filteredEvents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
}


        // Fonction pour gérer la logique de filtrage des dates
        function matchDate(eventDate, filterDate) {
                const today = new Date();
                const event = new Date(eventDate);
                switch (filterDate) {
                        case "Aujourd'hui":
                                return event.toDateString() === today.toDateString();
                        case "Cette semaine":
                                const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                                const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
                                return event >= startOfWeek && event <= endOfWeek;
                        case "Ce week-end":
                                const weekendStart = new Date(today.setDate(today.getDate() + (6 - today.getDay())));
                                const weekendEnd = new Date(weekendStart);
                                weekendEnd.setDate(weekendStart.getDate() + 1);
                                return event >= weekendStart && event <= weekendEnd;
                        case "Ce mois-ci":
                                return event.getMonth() === today.getMonth() && event.getFullYear() === today.getFullYear();
                        default:
                                return true;
                }
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
</div>

<!-- Afficher les cartes d'événements -->
<div class="wrapper-cards">
        {#each filteredEvents as event}
                <Card 
                        catégorie={event.catégorie}
                        titre={event.titre}
                        description={event.description}
                        date={event.date}
                        début={event.début}
                        fin={event.fin}
                        tarif={event.tarif}
                        lieu={event.lieu}
                        image={event.image}
                        lien={event.lien} 
                />
        {/each}
</div>
