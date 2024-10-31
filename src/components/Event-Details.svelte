<script>
        import { onMount } from "svelte";
        import { jsonDataByDate } from "../lib/store.js";
        import { page } from "$app/stores";
        import Header2 from "./Header2.svelte";
        import Return from "../assets/retour.png";

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

<div class="wrapper-header">
        <Header2 />
</div>

{#if event}
        <div class="wrapper-details">
                <div class="wrapper">
                        <img class="image" src={event.image} alt="" />
                        <a href="/"> <img src={Return} alt="" class="return" /></a>
                </div>
                <p class="date">{event.date}</p>

                <p class="id">{event.id}</p>
                <p class="cat">{event.catégorie}</p>
                <p class="lieu">{event.lieu}</p>

                <p class="title">{event.titre}</p>
                <p class="description">{event.description}</p>
                <div class="wrapper-horaire-tarif">
                        <p class="p">Horaire début: {event.début}</p>
                        <p class="p">Horaire fin: {event.fin}</p>
                        <p class="p">Tarif: {event.tarif}</p>
                </div>
        </div>

        <p class="details">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis quia eveniet magni dolor rerum dolorum ad, facilis amet recusandae, ullam placeat provident laudantium iusto, vitae cumque necessitatibus voluptates eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt accusamus distinctio recusandae iusto consectetur doloremque harum esse, veniam atque neque quibusdam inventore explicabo dolores commodi ipsum perferendis ducimus hic quidem.</p>

        <div class="wrapper-calendar">
                <!-- <p>+ calendrier</p> -->
                <a class="informations" href={event.lien} target="_blank">Information - réservation</a>
                <div class="wrapper-calendar--link-button">
                        <button class="calendar--link-button" on:click={generateICS}>ICS</button>
                        <a class="calendar--link-button" href={googleCalendarUrl} target="_blank">Google</a>
                        <a class="calendar--link-button" href={outlookCalendarUrl} target="_blank">Outlook</a>
                        <a class="calendar--link-button" href={yahooCalendarUrl} target="_blank">Yahoo</a>
                </div>
        </div>
{:else}
        <p>Chargement...</p>
{/if}

<style>
        .wrapper-details {
                background-color: transparent;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 20px;
                min-height: 100%;
        }
        .wrapper {
                position: relative;
        }

        .id {
                display: none;
        }
        .image {
                width: 100%;
                height: 100%;
        }
        .return {
                position: absolute;
                bottom: -50px; /* Ajuster l'espacement sous l'image */
                left: 80%;
                /* transform: translateX(-90%); */
                height: 40px;
                width: 40px;
                border-radius: 50%;
                padding: 5px;
                background-color: var(--ardoise);
                box-shadow: 0px 0px 5px 1px rgb(130, 130, 130);
                transition: 0.3s ease-in-out;
                margin-top: 20px;
        }
        .return:hover {
                border: grey 3px solid;
        }
        .date {
                font-size: 2em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: transparent;
                color: rgb(212, 17, 17);
                border: none;
                padding: 8px 12px;
                border-radius: 5px;
                position: relative;
                margin-top: 50px;
        }
        .cat {
                font-size: 1.9em;
                font-weight: 900;
                color: var(--ardoise);
                text-transform: uppercase;
                margin-top: -30px;
        }
        .lieu {
                font-size: 1.5em;
                font-weight: 400;
                color: var(--ardoise);
                letter-spacing: -0.9px;
                margin-top: 0px;
        }

        .description {
                font-size: 1em;
                font-weight: 400;
                letter-spacing: 3.9px;
                color: var(--ardoise);
                text-transform: uppercase;
                margin-top: 10px;
        }

        .title {
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: 1.2px;
                margin-top: -20px;
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
                font-weight: 400;
                color: var(--ardoise);
                letter-spacing: -0.9px;
        }
        .details {
                font-size: 1rem;
                font-weight: 300;
                color: var(--ardoise);
                letter-spacing: 0px;
                margin-top: 20px;
                padding: 10px;
                text-align: center;
        }
        .informations {
                background-color: transparent;
                color: var(--ardoise);
                padding: 15px 13px;
                border-radius: 8px;
                cursor: pointer;
                border: 1px solid var(--secondary);
                margin-top: 30px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 1rem;
                text-transform: capitalize;
                font-family: Inter;
                font-weight: 300;
                box-shadow: 0px 0px 5px rgba(48, 48, 48, 0.37);
                transition: 0.2s ease-in-out;
        }

        .informations:hover {
                background-color: transparent;
                color: var(--ardoise);
                border-radius: 20px;

                box-shadow: none;
        }
        .wrapper-calendar {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                gap: 10px;
                margin-top: 20px;
                border: none;
                padding: 10px;
                border-radius: 10px;

                max-width: 90%;
                margin: 0 auto;
        }
        /* .wrapper-calendar p {
                font-size: 1rem;
                text-transform: capitalize;
                color: var(--ardoise);
        } */
        .calendar--link-button {
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(45deg, var(--blue), var(--cta2));
                color: var(--whiteGrey);
                text-align: center;
                height: 60px;
                width: 60px;
                padding: 35px;
                border-radius: 50%;
                cursor: pointer;
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 0.8rem;
                text-transform: capitalize;
                font-family: Inter;
                font-weight: 700;
                border: none;
                box-shadow: 0px 0px 5px rgb(48, 48, 48);
                text-transform: capitalize;
                transition: 0.8s ease;
        }
        .calendar--link-button:hover {
                transform: rotate(360deg);
        }
        .wrapper-calendar--link-button {
                display: flex;
                flex-direction: rows;
                gap: 20px;
                margin-bottom: 100px;
        }

        @media screen and (max-width: 768px) {
                /* .wrapper-details{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        background-color: white;
                } */
                .image {
                        min-width: 95%;
                }
        }
</style>
