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
                <img class="image" src={selectedHeading.img} alt="" />
                <p class="description">{selectedHeading.description}</p>
                <p class="object">{selectedHeading.object}</p>
                <p class="lieu">{selectedHeading.lieu}</p>
                <a class="informations btn-grad" href={selectedHeading.lien} target="_blank">Site du commerçant</a>
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
                /* margin-bottom: 100px; */
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

    
        .informations {
                color: var(--whiteGrey);

                padding: 30px 25px;
                border-radius: 10px;
                cursor: pointer;
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 1rem;
                text-transform: capitalize;
                font-family: Jost;
                font-weight: 500;
        }

        .informations:hover {
                background-color: var(--secondary);
                color: var(--whiteGrey);
        }
        .description {
                font-size: 1rem;
                font-weight: 400;
                letter-spacing: 0px;
                color: var(--ardoise);
                line-height: 30px;
                padding: 10px;
                text-align: center;
                min-width: 80%;
        }
              .btn-grad {
                background-size: 200% auto;
                background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
        }

        .btn-grad:hover {
                background-position: right center; /* change the direction of the change here */
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
                 padding-top: 100px;
                }
                img {
                        min-width: 95%;
                        border-radius: 0px;
                }
        }
</style>
