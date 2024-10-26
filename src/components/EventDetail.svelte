<script>
        import { onMount } from "svelte";
        import { jsonDataByDate } from "../lib/store.js";
        import { page } from "$app/stores";
        import Header from "./Header.svelte";

        let id;
        let event;
        let googleCalendarUrl;
        let outlookCalendarUrl;
        let yahooCalendarUrl;

        $: id = $page.params.id;

        onMount(() => {
                console.log("ID de l'événement:", id); // Log pour vérifier l'ID
                jsonDataByDate.subscribe((value) => {
                        console.log("Données des événements:", value); // Log pour vérifier les données
                        const allEvents = Object.keys(value).flatMap((date) => value[date]);
                        console.log("Tous les événements:", allEvents); // Log pour vérifier tous les événements
                        event = allEvents.find((e) => e.id == id); // Utilisation de == pour comparer les types différents
                        console.log("Événement trouvé:", event); // Log pour vérifier l'événement trouvé
                        if (event) {
                                // Mettre à jour les URLs de calendrier
                                googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.titre)}&dates=${formatDateForURL(event.date)}/${formatDateForURL(event.date)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.lieu)}`;
                                outlookCalendarUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(event.titre)}&startdt=${formatDateForURL(event.date)}&enddt=${formatDateForURL(event.date)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.lieu)}`;
                                yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(event.titre)}&st=${formatDateForURL(event.date)}&dur=0100&desc=${encodeURIComponent(event.description)}&in_loc=${encodeURIComponent(event.lieu)}`;
                        } else {
                                console.error("Événement non trouvé, redirection vers la page d'accueil");
                                // Rediriger vers la page d'accueil si l'événement n'est pas trouvé
                                setTimeout(() => {
                                        window.location.href = "/";
                                }, 3000); // Ajout d'un délai pour éviter les redirections intempestives
                        }
                });
        });

        function generateICS() {
                const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Product//EN
BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}
DTSTART:${new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0]}
DTEND:${new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0]}
SUMMARY:${event.titre}
DESCRIPTION:${event.description}
LOCATION:${event.lieu}
END:VEVENT
END:VCALENDAR
        `.trim();

                const blob = new Blob([icsContent], { type: "text/calendar" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${event.titre}.ics`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
        }

        function formatDateForURL(date) {
                return new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0];
        }
</script>

<Header />

{#if event}
        <div class="card">
                <div class="wrapper-calendar">
                        <button class="calendar" on:click={generateICS}>Fichier ICS</button>
                        <a class="calendar" href={googleCalendarUrl} target="_blank">Google</a>
                        <a class="calendar" href={outlookCalendarUrl} target="_blank">Outlook</a>
                        <a class="calendar" href={yahooCalendarUrl} target="_blank">Yahoo</a>
                </div>
 
        <img src={event.image} alt="" />
        <p class="id">{event.id}</p>
        <p class="cat">{event.catégorie}</p>
        <p class="lieu">{event.lieu}</p>
        <p class="date">{event.date}</p>
        <p class="title">{event.titre}</p>
        <p class="description">{event.description}</p>
        <div class="wrapper-horaire-tarif">
                <p class="p">Horaire début: {event.début}</p>
                <p class="p">Horaire fin: {event.fin}</p>
                <p class="p">Tarif: {event.tarif}</p>
        </div>
          <a class="informations" href={event.lien} target="_blank">informations/réservation</a>
          </div>

      
{:else}
        <p>Chargement...</p>
{/if}
     
<style>
        .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background-color: white;
                border: none;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                text-decoration: none;
                margin-top: 200px;
                min-height: 100vh;
        }
        .wrapper-calendar {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                margin-top: 20px;
        }
        .calendar {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgb(103, 103, 240);
                color: var(--whiteGrey);
                padding: 10px;
                text-align: center;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 0.6rem;
                text-transform: capitalize;
                font-family: Inter;
                font-weight: 500;
                border: none;
        }
        .id {
                display: none;
        }
        img {
                width: 90%;
                height: 100%;
                border-radius: 8px;
        }
        .lieu {
                font-size: 1em;
                font-weight: 400;
                color: var(--ardoise);
                letter-spacing: -0.9px;
                margin-top: -10px;
        }

        .cat {
                font-size: 1.5em;
                font-weight: 900;
                color: var(--ardoise);
                text-transform: uppercase;
        }
        .description {
                font-size: 1em;
                font-weight: 400;
                letter-spacing: 3.9px;
                color: var(--ardoise);
                text-transform: uppercase;
        }

        .title {
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: -0.9px;
        }

        .date {
                font-size: 1em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: white;
                color: rgb(212, 17, 17);
                border: 1px solid grey;
                padding: 8px 12px;
                border-radius: 5px;
        }
        .wrapper-horaire-tarif {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0px;
        }
        .p {
                font-size: 0.9em;
                font-weight: 200;
                color: var(--ardoise);
                letter-spacing: -0.9px;
        }
        .informations {
                background-color: var(--ardoise);
                color: var(--whiteGrey);
                padding: 8px 13px;
                border-radius: 8px;
                cursor: pointer;
                border: 1px solid var(--secondary);
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 0.7rem;
                text-transform: capitalize;
                font-family: Inter;
                font-weight: 300;
        }

        .informations:hover {
                background-color: var(--secondary);
                color: var(--whiteGrey);
        }

        @media screen and (max-width: 768px) {
                .card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        background-color: white;
                }
                img {
                        min-width: 95%;
                        border-radius: 10px;
                }
        }
</style>
