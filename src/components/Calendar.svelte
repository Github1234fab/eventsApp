<script>
        import Filter from "../components/Filter.svelte";
        import { onMount } from "svelte";
        import { jsonDataByDate, selectedDate } from "../lib/store.js";
        import { writable, get } from "svelte/store"; // Import de `writable` pour créer des stores réactifs, et de `get` pour accéder aux valeurs des stores
        import Collapse from "../components/Collapse.svelte";

        let startDate = ""; // Stockage de la date de début (pas encore utilisée ici)
        let endDate = ""; // Stockage de la date de fin (pas encore utilisée ici)
        let filterLieu = ""; // Filtre basé sur un lieu spécifique (pas encore utilisée ici)
        let type = ""; // Type d'événement filtré (pas encore utilisé ici)

        let currentDate = writable(new Date()); // Stockage de la date actuelle sous forme de store réactif
        let today = new Date(); // Date d'aujourd'hui
        let days = []; // Tableau des jours à afficher dans le calendrier
        let eventsForSelectedDay = writable([]); // Store qui contient les événements du jour sélectionné
        let filteredEvents = writable([]); // Store pour les événements filtrés
        let dataLoaded = writable(false); // Indicateur si les données ont été chargées
        let eventsByCategory = writable({}); // Store pour compter les événements par catégorie

        function loadDays(date) {
                // Récupère l'année et le mois de la date actuelle

                const year = date.getFullYear();
                const month = date.getMonth();
                // Obtenez le premier et dernier jour du mois
                const firstDayOfMonth = new Date(year, month, 1);
                const lastDayOfMonth = new Date(year, month + 1, 0);
                // Détermine quel jour de la semaine est le premier et dernier jour du mois

                const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
                const endDay = lastDayOfMonth.getDay() === 0 ? 6 : lastDayOfMonth.getDay() - 1;
                // Vide le tableau `days` à chaque appel

                days = [];
                // Ajoute les jours du mois précédent pour aligner le calendrier
                for (let i = startDay; i > 0; i--) {
                        days.push(new Date(year, month, 1 - i));
                }
                // Ajoute les jours du mois courant

                for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                        days.push(new Date(year, month, i));
                }
                // Ajoute les jours du mois suivant pour compléter la semaine

                for (let i = 1; i < 7 - endDay; i++) {
                        days.push(new Date(year, month + 1, i));
                }
        }

        function handleDayClick(day) {
                const adjustedDay = adjustForTimezone(day); // Ajuste la date pour tenir compte du fuseau horaire
                selectedDate.set(adjustedDay); // Met à jour la date sélectionnée
                const selectedDateISO = adjustedDay.toISOString().slice(0, 10); // Formate la date en ISO (YYYY-MM-DD)
                const events = get(jsonDataByDate)[selectedDateISO] || []; // Récupère les événements de cette date à partir du store
                eventsForSelectedDay.set(events); // Met à jour les événements du jour sélectionné
        }

        function goToNextMonth() {
                const date = get(currentDate); // Récupère la date actuelle
                date.setMonth(date.getMonth() + 1); // Passe au mois suivant
                currentDate.set(new Date(date)); // Met à jour la date actuelle dans le store
                loadDays(date); // Recharge les jours pour le nouveau mois
        }

        function goToPreviousMonth() {
                const date = get(currentDate); // Récupère la date actuelle
                date.setMonth(date.getMonth() - 1); // Passe au mois précédent
                currentDate.set(new Date(date)); // Met à jour la date actuelle dans le store
                loadDays(date); // Recharge les jours pour le nouveau mois
        }

        //fonction pour ajuster la date en fonction du fuseau horaire
        function adjustForTimezone(date) {
                const adjustedDate = new Date(date); // Crée une nouvelle date
                adjustedDate.setHours(adjustedDate.getHours() - adjustedDate.getTimezoneOffset() / 60); // Ajuste l'heure en fonction du fuseau horaire
                return adjustedDate; // Retourne la date ajustée
        }

        function countEventsByCategory(events) {
                const categoryCount = {}; // Initialise un objet pour stocker le nombre d'événements par catégorie
                events.forEach((event) => {
                        if (categoryCount[event.type]) {
                                categoryCount[event.type]++; // Incrémente si la catégorie existe déjà
                        } else {
                                categoryCount[event.type] = 1; // Initialise le compte si la catégorie n'existe pas encore
                        }
                });
                eventsByCategory.set(categoryCount); // Met à jour le store avec le compte des catégories
        }

        onMount(() => {
                loadDays(get(currentDate)); // Charge les jours pour le mois actuel au moment du montage du composant
                // S'abonne aux changements dans `jsonDataByDate`
                const unsubscribe = jsonDataByDate.subscribe((data) => {
                        if (Object.keys(data).length > 0) {
                                const todayISO = today.toISOString().slice(0, 10); // Date d'aujourd'hui au format ISO
                                const initialEvents = data[todayISO] || []; // Récupère les événements d'aujourd'hui
                                eventsForSelectedDay.set(initialEvents); // Met à jour les événements pour aujourd'hui
                                filteredEvents.set(initialEvents); // Met à jour les événements filtrés
                                countEventsByCategory(initialEvents); // Met à jour le compteur des catégories
                                dataLoaded.set(true); // Indique que les données ont été chargées
                                unsubscribe(); // Désabonne une fois que les données ont été chargées
                        }
                });
        });

        $: if (dataLoaded) {
                selectedDate.subscribe((date) => {
                        const selectedDateISO = date.toISOString().slice(0, 10); // Formate la date sélectionnée en ISO
                        const events = get(jsonDataByDate)[selectedDateISO] || []; // Récupère les événements pour cette date
                        console.log(events);
                        eventsForSelectedDay.set(events); // Met à jour les événements pour ce jour
                        filteredEvents.set(events); // Met à jour les événements filtrés
                        countEventsByCategory(events); // Met à jour le compteur des catégories
                });
        }
</script>

<!-- wrapper de selection du mois -->
<div class="wrapper-month-display">
        <button class="button-mont-select" on:click={goToPreviousMonth}><i class="fa-solid fa-angle-left"></i></button>
        <p class="currentMonth">
                {$currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </p>
        <button class="button-mont-select" on:click={goToNextMonth}><i class="fa-solid fa-angle-right"></i></button>
</div>
<Filter jsonDataByDate={$jsonDataByDate} {startDate} {endDate} {type} {filterLieu} bind:filteredEvents />

<!-- boucle pour les jours de la semaine -->
{#if $dataLoaded}
        <div class="calendar">
                {#each ["L", "M", "M", "J", "V", "S", "D"] as day}
                        <p class="days-of-week">{day}</p>
                {/each}

                <!-- boucle pour les jours du mois -->
                {#each days as day}
                        <button
                                class="day
          {day.getMonth() !== $currentDate.getMonth() ? 'other-month' : ''}
          {adjustForTimezone(day).toISOString().slice(0, 10) === $selectedDate.toISOString().slice(0, 10) ? 'selected' : ''}
          {day.toDateString() === today.toDateString() ? 'today' : ''}
          {get(jsonDataByDate) && get(jsonDataByDate)[adjustForTimezone(day).toISOString().slice(0, 10)] ? 'tag-data' : ''}"
                                on:click={() => handleDayClick(day)}
                        >
                                {day.getDate()}
                        </button>
                {/each}
        </div>

        <!-- obtenir les événements par catégorie -->
        <div class="category-list">
                <h3>Événements par catégorie :</h3>
                {#each Object.entries($eventsByCategory) as [category, count]}
                        <button on:click={() => filterByCategory(category)}>
                                {category}: {count} événement(s)
                        </button>
                {/each}
        </div>

        <!-- Interface utilisateur pour les filtres   -->
        <div class="event-info">
                <div class="wrapper-collapse">
                        {#each $filteredEvents as event}
                                <Collapse annonceur={event.annonceur} date={event.date} lieu={event.lieu} tarif={event.tarif} fin={event.fin} début={event.début} type={event.type} />
                        {/each}
                </div>
                <p class="current-date-display">
                        <!-- Date selectionnée: {$selectedDate.toISOString().slice(0, 10)} -->
                </p>
                <!-- <p class="number-events">{$filteredEvents.length} événement(s) prévu(s) pour cette date.</p> -->
        </div>
{:else}
        <!-- <p>Chargement des données...</p> -->
{/if}

<style>
        .wrapper-collapse {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
                max-width: 60%;
        }
        .button-mont-select {
                background-color: var(--colorA);
        }
        button.tag-data::after {
                position: absolute;
                content: "*";
                background-color: var(--primary);
                width: 30%;
                height: 30%;
                transform: rotate(45deg);
                top: -20%;
                left: 82%;
                z-index: 2;
        }
        button {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: center;
                cursor: pointer;
                position: relative;
                z-index: 0;
                overflow: hidden;
        }
        .wrapper-month-display {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-bottom: 0.5rem;
                gap: 40px;
                margin-top: 20px;
        }
        .currentMonth {
                color: var(--primary);
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                text-transform: capitalize;
        }
        .button-mont-select {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: transparent;
                height: 30px;
                width: 30px;
                border: 1px solid var(--primary);
                cursor: pointer;
                color: var(--primary);
                padding: 0px;
                border-radius: 50%;
        }

        .event-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                max-height: auto;
                padding: 20px;
                margin-top: 0px auto;
                width: auto;
                border-radius: 8px;
                /* background: linear-gradient(25deg, rgb(180, 152, 167), rgb(228, 197, 213)); */
        }

        .calendar {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
                padding: 10px;
                min-width: 70%;
        }
        .days-of-week {
                padding: 10px;
                text-align: center;
                cursor: pointer;
                background-color: transparent;
                color: var(--primary);
                font-weight: 200;
                font-size: 0.7rem;
        }
        .days-of-week:nth-child(7n + 6),
        .days-of-week:nth-child(7n + 7) {
                color: var(--primary);
                font-weight: 500;
        }
        .day {
                padding: 10px;
                text-align: center;
                cursor: pointer;
                background-color: transparent;
                color: var(--primary);
                font-weight: 700;
        }
        .selected {
                background-color: var(--cta); /* Vert pour la date sélectionnée */
                color: white;
        }
        .other-month {
                color: #ccc;
        }
        .today {
                background-color: var(--cta2);
                color: var(--whiteGrey);
                font-weight: bold;
                border: 1px solid grey;
        }
        /* .calendar .day:nth-child(7n + 6),
        .calendar .day:nth-child(7n + 7) {
                background-color: transparent;
                color: var(--primary);
                font-weight: 600;
        } */
</style>
