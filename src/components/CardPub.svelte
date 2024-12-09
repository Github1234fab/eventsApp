
<script>
        import { headingsTab } from "../lib/storeAdvertisement.js"; // Remplacez par le chemin correct
        import { get } from "svelte/store";
        import { goto } from "$app/navigation"; // Importer goto pour la navigation

        export let heading;
        export let id;

        const handleClick = () => {
                // Récupérer les données de headingsTab
                const allHeadings = get(headingsTab);
                const selectedHeading = allHeadings.find((item) => item.id === id);

                // Rediriger vers la page de détails avec l'ID
                if (selectedHeading) {
                        // Ici, vous pouvez utiliser goto pour naviguer vers la page de détails
                        goto(`/CardPubDetails/${id}`);
                }
        };
</script>

<div class="card">
        <img class="image" src="https://images.pexels.com/photos/696205/pexels-photo-696205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <button class="button-infos btn-grad" on:click={handleClick}>i</button>
        <p class="id">{heading.id}</p>
        <p class="nom">{heading.nom}</p>
        <p class="object">{heading.object}</p>
        <p class="lieu">{heading.lieu}</p>
        <p class="description">{heading.description}</p>
        <!-- <a class="informations" href={heading.lien} target="_blank">Site de l'annonceur</a> -->
</div>

<style>
        .card {
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
                flex: 1 1 calc(50% - 20px);
                max-width: calc(40% - 20px);
                 min-height: 100%;
        }
        .image {
                width: 90%;
                height: 100%;
                border-radius: 0px;
        }

        .button-infos {
                min-height: 40px;
                min-width: 40px;
                border-radius: 50%;
                background-color: var(--ardoise);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                border: none;
                text-decoration: none;
                font-family: "Times New Roman";
                box-shadow: 0px 0px 5px 1px rgb(158, 158, 158);
        }
        .id {
                display: none;
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
                font-size: 2rem;
                font-weight: 900;
                letter-spacing: -0.9px;
                color: var(--ardoise);
        }
        .object {
                font-size: 1.6rem;
                font-weight: 500;
                letter-spacing: -0.9px;
                color: var(--ardoise);
        }

        /* .cat {
                font-size: 1.8em;
                font-weight: 500;
                color: var(--ardoise);
                text-transform: capitalize;
        } */
        .description {
                font-size: 1em;
                font-weight: 300;
                letter-spacing: 0px;
                color: var(--ardoise);
                margin-bottom: 10px;
        }
      .btn-grad {
                background-size: 200% auto;
                background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
        }

        .btn-grad:hover {
                background-position: right center; /* change the direction of the change here */
        }



        @media screen and (max-width: 768px) {
                .card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        background-color: white;
                        min-width: 90%;
                        min-height: 100%;
                }
                img {
                        min-width: 95%;
                        border-radius: 0px;
                }
        }
</style>
