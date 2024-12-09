<script>
        import { onMount } from "svelte";
        import { headingsTab } from "../../../lib/storeAdvertisement.js"; // Remplacez par le chemin correct
        import { get } from "svelte/store";
        import Header2 from "../../../components/Header2.svelte";

        let id;
        let selectedHeading;

        onMount(() => {
                const url = window.location.href; // Obtenir l'URL complète
                id = url.substring(url.lastIndexOf("/") + 1); // Obtenir la chaîne après le dernier slash
                console.log(id); // Log pour vérifier l'ID

                const allHeadings = get(headingsTab); // Obtenir toutes les données du store
                selectedHeading = allHeadings.find((item) => item.id === id); // Chercher les données correspondantes
                console.log(selectedHeading); // Log pour vérifier les données récupérées
        });
</script>

<Header2 />
{#if selectedHeading}
        <div class="card-detail">
                <h1 class="nom">{selectedHeading.nom}</h1>
                <img class="image" src="https://images.pexels.com/photos/696205/pexels-photo-696205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                   <p class="description">{selectedHeading.description}</p>
                <p class="object">{selectedHeading.object}</p>
                <p class="lieu">{selectedHeading.lieu}</p>
                <p class="text-description">{selectedHeading.txt}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim fugiat, ipsum distinctio sit cupiditate expedita beatae illo magnam, minima, possimus alias consequatur sed? Error ducimus dolorum, deleniti sunt voluptatem excepturi!
                Vel inventore in sequi iste minus fugit sit, reprehenderit impedit perferendis nulla laboriosam tenetur dolor dolore a adipisci earum unde. Soluta reprehenderit fugit, eveniet consequatur dolorem veritatis deleniti quisquam laboriosam!</p>
                <a class="informations" href={selectedHeading.lien} target="_blank">Site du commerçant</a>
        </div>
{:else}
        <p>Chargement...</p>
{/if}

<style>
        .card-detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 10px;
                border-radius: 8px;
                background-color: white;
                border: none;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                text-decoration: none;
           height: 100vh;
                /* margin-top: 200px; */
        }
        .image {
                width: 90%;
                height: 100%;
                border-radius: 0px;
        }

        img {
                width: 90%;
                height: 100%;
                border-radius: 0px;
        }
        .lieu {
                font-size: 1.3em;
                font-weight: 600;
                color: var(--ardoise);
                letter-spacing: -0.9px;
        }

        .nom {
                font-size: 2.5rem;
                font-weight: 900;
                letter-spacing: -0.9px;
                color: var(--ardoise);
                margin-top: 10px;
        }
        .object {
                font-size: 1.6rem;
                font-weight: 500;
                letter-spacing: -0.9px;
                color: var(--ardoise);
        }

        .description {
                font-size: 1em;
                font-weight: 300;
                letter-spacing: 0px;
                color: var(--ardoise);
        }

        .informations {
                background-color: var(--blue);
                color: var(--whiteGrey);
                padding: 15px 20px;
                border-radius: 8px;
                cursor: pointer;
                border: 1px solid var(--secondary);
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 1rem;
                text-transform: capitalize;
                font-family: Inter;
                font-weight: 300;
                margin-bottom: 100px;
        }

        .informations:hover {
                background-color: var(--secondary);
                color: var(--whiteGrey);
        }
        .text-description {
                font-size: 1em;
                font-weight: 400;
                letter-spacing: 0px;
                color: var(--ardoise);
                line-height: 30px;
                padding: 10px;  
        }

        @media screen and (max-width: 768px) {
                .card-detail {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 30px;
                        padding: 10px;
                        background-color: white;
                        height: auto;
                }
                img {
                        min-width: 95%;
                        border-radius: 0px;
                }
        }
</style>
