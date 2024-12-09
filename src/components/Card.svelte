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
        <p class="date">{new Date(date).toLocaleDateString("fr-FR")}</p>
        <p class="cat">{catégorie}</p>
        <img src={image} alt="" />

        <p class="title">"{titre}"</p>
        <p class="id">{id}</p>

        <p class="lieu">{lieu}</p>
        <a class="info-button" href={`/event/${id}`}>i</a>
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
                flex: 1 1 calc(50% - 20px); /* Chaque carte occupe 50% de la largeur moins l'espacement */
                max-width: calc(40% - 20px);
                height: 500px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.276);
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
                width: auto;
                height: 50%;
                border-radius: 20px;
                padding: 10px;
        }
        .lieu {
                font-size: 1.3em;
                font-weight: 500;
                color: var(--ardoise);
                letter-spacing: -0.9px;
                text-align: center;
        }

        .cat {
                font-size: 1em;
                font-weight: 700;
                color: var(--ardoise);
                text-transform: uppercase;
                text-align: center;
        }
        .description {
                font-size: 1em;
                font-weight: 700;
                letter-spacing: 4.9px;
                color: var(--ardoise);
                text-transform: uppercase;
                display: none;
                text-align: center;
        }

        .title {
                font-size: 1.3rem;
                font-weight: 600;
                color: var(--ardoise);
                text-transform: uppercase;
                width: 100%;
                word-break: keep-all;
                text-align: center;
        }

        .date {
                font-family: Roboto;
                font-size: 2em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: rgb(255, 77, 0);
                color: white;
                padding: 10px 15px;
                border-radius: 10px;
                margin-top: 5px;
                box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.394);
                text-align: center;
        }

        @media screen and (max-width: 768px) {
                .card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        background-color: rgb(255, 255, 255);
                        min-width: 90%;
                        min-height: 400px;
                }
                img {
                        width: 70%;
                        height: 50%;
                        border-radius: 20px;
                        padding: 10px;
                }
                .date {
                        font-size: 1.5em;
                }
        }
</style>
