<script>
        export let image;
        export let catégorie;
        export let titre;
        export let description;
        export let date;
        // export let début;
        // export let fin;
        // export let tarif;
        // export let lien;
        export let lieu;
        export let id;
</script>

<div class="card">
        <img src={image} alt="" />
        <a class="info-button" href={`/event/${id}`}>i</a>
        <p class="date">{new Date(date).toLocaleDateString("fr-FR")}</p>
        <p class="title">"{titre}"</p>
        <p class="id">{id}</p>
        <p class="cat">{catégorie}</p>
        <p class="lieu">{lieu}</p>
        <p class="description">{description}</p>

        <!-- <div class="wrapper-horaire-tarif">
                <p class="p">Début: {début}</p>
                <p class="p">Fin: {fin}</p>
                <p class="p">Tarif: {tarif}</p>
        </div> -->
        <!-- <a class="informations" href={lien} target="_blank">informations/réservation</a> -->
</div>

<style>
        .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;
                border-radius: 8px;
                background-color: white;
                border: none;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                text-decoration: none;
                min-width: 100%;
        }
        .info-button {
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
                margin-top: 20px;
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

        .cat {
                font-size: 1.2em;
                font-weight: 400;
                color: var(--ardoise);
                text-transform: uppercase;
        }
        .description {
                font-size: 1em;
                font-weight: 400;
                letter-spacing: 4.9px;
                color: var(--ardoise);
                text-transform: uppercase;
                display: none;
        }

        .title {
                font-size: 1.5rem;
                font-weight: 900;
                color: var(--ardoise);
                text-transform: uppercase;
                width: 100%;
                word-break:keep-all   ;
                text-align: center;

        }

        .date {
                font-size: 2em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: white;
                color: rgb(212, 17, 17);
                /* border: 1px solid grey; */
                padding: 8px 12px;
                border-radius: 5px;
        }
        /* .wrapper-horaire-tarif {
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
        } */
        /* .informations {
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
        } */

        /* .informations:hover {
                background-color: var(--secondary);
                color: var(--whiteGrey);
        } */

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
