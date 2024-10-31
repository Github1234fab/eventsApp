<script>
        export let heading;
</script>

<div class="card">
         <!-- <a class="info-button" href={`/event/${id}`}>i</a> -->
            <a href={`/CardPub/${heading.id}`}>i</a>
        <img class="image" src="https://images.pexels.com/photos/696205/pexels-photo-696205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <!-- <a class="info-button" href={`/event/${id}`}>i</a> -->
        <p class="id">{heading.id}</p>
        <p class="nom">{heading.nom}</p>
        <p class="object">{heading.object}</p>
        <!-- <p class="cat">{heading.catégorie}</p> -->
        <p class="lieu">{heading.lieu}</p>
        <p class="description">{heading.description}</p>
        <a class="informations" href={heading.lien} target="_blank">Site de l'annonceur</a>
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
        }
        .image {
                width: 90%;
                height: 100%;
                border-radius: 0px;
        }
        /* .info-button {
                min-height: 30px;
                min-width: 30px;
                border-radius: 50%;
                background-color: var(--ardoise);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-decoration: none;
                font-family: "Times New Roman";
                box-shadow: 0px 0px 5px 1px rgb(158, 158, 158);
        } */
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
                font-size: 2.5rem;
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
        }

        .informations {
                background-color: var(--blue);
                color: var(--whiteGrey);
                padding: 8px 13px;
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
                        border-radius: 0px;
                }
        }
</style>
