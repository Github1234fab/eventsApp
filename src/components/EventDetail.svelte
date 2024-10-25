<script>
    import { onMount } from 'svelte';
    import { jsonDataByDate } from "../lib/store.js";
    import { page } from '$app/stores';

    let id;
    let event;
    let googleCalendarUrl;
    let outlookCalendarUrl;
    let yahooCalendarUrl;

    $: id = $page.params.id;

    onMount(() => {
        console.log('ID de l\'événement:', id); // Log pour vérifier l'ID
        jsonDataByDate.subscribe((value) => {
            console.log('Données des événements:', value); // Log pour vérifier les données
            const allEvents = Object.keys(value).flatMap((date) => value[date]);
            console.log('Tous les événements:', allEvents); // Log pour vérifier tous les événements
            event = allEvents.find(e => e.id == id); // Utilisation de == pour comparer les types différents
            console.log('Événement trouvé:', event); // Log pour vérifier l'événement trouvé
            if (event) {
                // Mettre à jour les URLs de calendrier
                googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.titre)}&dates=${formatDateForURL(event.date)}/${formatDateForURL(event.date)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.lieu)}`;
                outlookCalendarUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(event.titre)}&startdt=${formatDateForURL(event.date)}&enddt=${formatDateForURL(event.date)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.lieu)}`;
                yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(event.titre)}&st=${formatDateForURL(event.date)}&dur=0100&desc=${encodeURIComponent(event.description)}&in_loc=${encodeURIComponent(event.lieu)}`;
            } else {
                console.error('Événement non trouvé, redirection vers la page d\'accueil');
                // Rediriger vers la page d'accueil si l'événement n'est pas trouvé
                setTimeout(() => {
                    window.location.href = '/';
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
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}
DTSTART:${new Date(event.date).toISOString().replace(/[-:]/g, '').split('.')[0]}
DTEND:${new Date(event.date).toISOString().replace(/[-:]/g, '').split('.')[0]}
SUMMARY:${event.titre}
DESCRIPTION:${event.description}
LOCATION:${event.lieu}
END:VEVENT
END:VCALENDAR
        `.trim();

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event.titre}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function formatDateForURL(date) {
        return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0];
    }
</script>

{#if event}
    <div class="event-detail">
        <img src={event.image} alt="" />
        <p class="id">{event.id}</p>
        <p class="cat">{event.catégorie}</p>
        <p class="title">{event.titre}</p>
        <p class="p">Horaire début: {event.début}</p>
        <p class="p">Horaire fin: {event.fin}</p>
        <p class="p">Tarif: {event.tarif}</p>
        <p class="p">Lieu: {event.lieu}</p>
        <a href={event.lien} target="_blank">informations/réservation</a>
        <button on:click={generateICS}>Enregistrer l'évènement dans votre calendrier</button>
        <a href={googleCalendarUrl} target="_blank">Ajouter à Google Calendar</a>
        <a href={outlookCalendarUrl} target="_blank">Ajouter à Outlook Calendar</a>
        <a href={yahooCalendarUrl} target="_blank">Ajouter à Yahoo Calendar</a>
    </div>
{:else}
    <p>Chargement...</p>
{/if}



<style>
        .event-detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 10px;
                border-bottom: 1px solid rgb(190, 190, 190);
                background-color: white;
                border: none;
                min-width: 100vw;
                margin-top: 400px;
             
        }
        .id {
                display: none;
        }
        img {
                max-width: 50%;
                height: 100%;
                border-radius: 0px;
                   margin-top: 100px;
        }

        .cat {
                font-size: 2em;
                font-weight: 400;
                color: red;
                text-transform: uppercase;
        }

        .title {
                font-size: 1.5em;
                font-weight: 700;
        }

        /* .date {
                font-size: 1em;
                text-transform: uppercase;
                font-weight: 700;
        } */
        a {
                background-color: var(--transparent);
                color: var(--secondary);
                padding: 10px;
                border-radius: 10px;
                cursor: pointer;
                border: 1px solid var(--secondary);
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
        }
        a:hover {
                background-color: var(--secondary);
                color: var(--whiteGrey);
        }

        @media screen and (min-width: 768px) {
                .event-detail {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        border-bottom: 1px solid var(--secondary);
                        background-color: white;
                        max-width: 50%;
                }
                img {
                        width: 80%;
                        border-radius: 0px;
                }
        }
</style>



<!-- 
<script>
    import { onMount } from 'svelte';
    import { jsonDataByDate } from "../lib/store.js";
    import { page } from '$app/stores';

    let id;
    let event;

    $: id = $page.params.id;

    onMount(() => {
        console.log('ID de l\'événement:', id); // Log pour vérifier l'ID
        jsonDataByDate.subscribe((value) => {
            console.log('Données des événements:', value); // Log pour vérifier les données
            const allEvents = Object.keys(value).flatMap((date) => value[date]);
            console.log('Tous les événements:', allEvents); // Log pour vérifier tous les événements
            event = allEvents.find(e => e.id == id); // Utilisation de == pour comparer les types différents
            console.log('Événement trouvé:', event); // Log pour vérifier l'événement trouvé
            if (!event) {
                console.error('Événement non trouvé, redirection vers la page d\'accueil');
                // Rediriger vers la page d'accueil si l'événement n'est pas trouvé
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000); // Ajout d'un délai pour éviter les redirections intempestives
            }
        });
    });
</script>

{#if event}
    <div class="event-detail">
        <img src={event.image} alt="" />
        <p class="id">{event.id}</p>
        <p class="cat">{event.catégorie}</p>
        <p class="title">{event.titre}</p>
        <p class="p">{event.description}</p>
        <p class="date">Date : {new Date(event.date).toLocaleDateString("fr-FR")}</p>
        <p class="p">Horaire début: {event.début}</p>
        <p class="p">Horaire fin: {event.fin}</p>
        <p class="p">Tarif: {event.tarif}</p>
        <p class="p">Lieu: {event.lieu}</p>
        <a href={event.lien} target="_blank">informations/réservation</a>
    </div>
{:else}
    <p>Chargement...</p>
{/if} -->