<script>
        import { onMount } from "svelte";
        import { jsonDataByDate } from "../lib/store.js";
        import { page } from "$app/stores";
        import Header from "./Header2.svelte";
        import Return from "../assets/retour.png";
        import Calendar from "../assets/calendar.png";
        import GoogleCal from "../assets/googleCal.png";
        import Outlook from "../assets/Outlook.png";

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
        <Header />
</div>

{#if event}
        <div class="wrapper-details">
                <!-- <div class="wrapper"> -->
                <img class="image" src={event.image} alt="" />

                <!-- </div> -->

                <p class="date">{event.date}</p>
                <p class="id">{event.id}</p>
                <p class="cat">{event.catégorie}</p>
                <p class="lieu">{event.lieu}</p>
                <p class="title">{event.titre}</p>
                <p class="details">{event.description}</p>
                <div class="wrapper-horaire-tarif">
                        <p class="p">Horaire début: <span>{event.début}</span></p>
                        <p class="p">Horaire fin:<span>{event.fin}</span></p>
                        <p class="p">Tarif: <span>{event.tarif}</span></p>
                </div>
                <a class="informations btn-grad" href={event.lien} target="_blank">Information - réservation</a>
        </div>

        <div class="wrapper-calendar">
                <h2 class="wrapper-calendar__h3">Ajoutez cet événement à votre calendrier préféré</h2>
                <div class="wrapper-calendar--link-button">
                        <div class="wrapper__button-link">
                                <button class="calendar--link-button" on:click={generateICS}><img class="img-button-cal" src={Calendar} alt="logo calendrier" /></button>
                                <h3>Fichier ICS</h3>
                        </div>
                        <div class="wrapper__button-link">
                                <a class="calendar--link-button" href={googleCalendarUrl} target="_blank"><img class="img-button-cal" src={GoogleCal} alt="logo google cal" /></a>
                                <h3>Google Cal</h3>
                        </div>
                        <div class="wrapper__button-link">
                                <a class="calendar--link-button" href={outlookCalendarUrl} target="_blank"><img class="img-button-cal" src={Outlook} alt="logo outlook" /></a>
                                <h3>Outlook</h3>
                        </div>
                        <!-- <a class="calendar--link-button btn-grad" href={yahooCalendarUrl} target="_blank">Yahoo</a> -->
                </div>
                <a class="btn-return-cal" href="/"><img class="return-img" src={Return} alt="" />Retour au calendrier</a>
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
                padding-top: 100px;
        }

        .id {
                display: none;
        }
        .image {
                max-width: 30%;
                max-height: 50%;
        }
        .btn-return-cal {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: whitesmoke;
                font-family: Jost;
                border-radius: 50%;
                height: 150px;
                width: 150px;
                padding: 15px 20px;
                background-color: var(--ardoise);
                box-shadow: 0px 0px 15px rgb(50, 50, 50);
                transition: 0.3s ease-in-out;
                margin: 40px;
                text-align: center;
                border: 2px solid white;
        }
        .btn-return-cal:hover {
                border: grey 3px solid;
        }
        .return-img {
                height: 50px;
                width: 50px;
        }
        .date {
                font-size: 2em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: rgb(212, 64, 1);
                color: white;
                border: none;
                padding: 20px 30px;
                border-radius: 5px;
                margin-top: 0px;
        }
        .cat {
                font-size: 1.5em;
                font-weight: 500;
                color: var(--ardoise);
                text-transform: uppercase;
                margin-top: 0px;
        }
        .lieu {
                font-size: 1.5em;
                font-weight: 400;
                color: var(--ardoise);
                letter-spacing: -0.9px;
                margin-top: -10px;
        }

        .title {
                font-size: 1.5rem;
                font-weight: 800;
                letter-spacing: 1.2px;
                margin-top: -10px;
        }

        .wrapper-horaire-tarif {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
        }
        .p {
                font-size: 1.2em;
                font-weight: 400;
                color: var(--ardoise);
                letter-spacing: -0.9px;
        }
        .p span {
                font-weight: 700;
        }
        .details {
                font-size: 1.2rem;
                font-weight: 300;
                color: var(--ardoise);
                letter-spacing: 0px;
                margin-top: 90px;
                padding: 50px;
                text-align: center;
                max-width: 60%;
                margin: 0 auto;
        }
        .informations {
                background-color: transparent;
                color: whitesmoke;
                padding: 40px 25px;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 30px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 1rem;
                text-transform: capitalize;
                font-family: Jost;
                font-weight: 500;
                box-shadow: 0px 0px 10px rgba(48, 48, 48, 0.577);
                transition: 0.2s ease-in-out;
        }

        .informations:hover {
                background-color: transparent;
                border-radius: 20px;

                box-shadow: none;
        }
        .wrapper-calendar {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: none;
                padding: 10px;
                border-radius: 10px;
                max-width: 90%;
                margin: 50px auto;
                gap: 30px;
        }
        .wrapper__button-link {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: "Inter";
                gap: 10px;
                font-size: 0.7rem;
        }

        .calendar--link-button {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--whiteGrey);
                text-align: center;
                height: 55px;
                width: 55px;
                padding: 35px;
                border-radius: 50%;
                cursor: pointer;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 0.8rem;
                text-transform: capitalize;
                font-family: Jost;
                font-weight: 700;
                border: white 2px solid;
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
                gap: 40px;
                margin-bottom: 20px;
        }
        .wrapper-calendar__h3 {
                font-family: "Inter";
                font-size: 1.5rem;
                font-weight: 300;
                color: var(--ardoise);
                margin-top: 0px;
                text-align: center;
        }
        .img-button-cal {
                height: 50px;
                width: 50px;
        }
        .btn-grad {
                background-size: 200% auto;
                background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
        }

        .btn-grad:hover {
                background-position: right center; /* change the direction of the change here */
        }

        @media screen and (max-width: 768px) {
                .image {
                        min-width: 95%;
                }
                .details {
                        max-width: 90%;
                        padding: 20px;
                }
                .wrapper-calendar--link-button {
                        gap: 40px;
                }
        }
</style>
