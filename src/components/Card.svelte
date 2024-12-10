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
        <p class="date">{new Date(date).toLocaleDateString("fr-FR")}</p>
        <p class="cat">{catégorie}</p>

        <p class="title">"{titre}"</p>
        <p class="id">{id}</p>

        <p class="lieu">{lieu}</p>
        <a class="info-button btn-grad" href={`/event/${id}`}>i</a>
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
                max-width: 40%;
                max-height: 600px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.276);
        }
        .info-button {
                min-height: 40px;
                min-width: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-decoration: none;
                font-family: inter;
                box-shadow: 0px 0px 5px 1px rgba(158, 158, 158, 0.599);
                margin-top: 20px;
                text-align: center;
                font-weight: bold;
                font-size: 1rem;
                margin-bottom: 20px;
        }
        .btn-grad {
                background-size: 200% auto;
                background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
        }

        .btn-grad:hover {
                background-position: right center; /* change the direction of the change here */
        }

        .id {
                display: none;
        }
        img {
                /* max-width: 100%;
                height: 200px; */
                width: auto;
                max-height: 200px;
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
                font-size: 1.4em;
                font-weight: 500;
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
                font-size: 1rem;
                font-weight: 400;
                color: var(--ardoise);
                text-transform: uppercase;
                width: 100%;
                word-break: keep-all;
                text-align: center;
        }

        .date {
                font-family: Jost;
                font-size: 2em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: rgb(212, 64, 1);
                color: white;
                max-width: 100%;
                /* border: 3px solid rgb(208, 205, 205); */
                /* color: red; */
                padding: 20px 20px;
                border-radius: 10px;
                margin-top: 5px;
                /* box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.492); */
                text-align: center;
                margin-bottom: 10px;
                letter-spacing: -3px;
        }

        @media screen and (min-width: 1400px) {
                .card {
                        max-width: 30%;
                }
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
                        min-height: 500px;
                }
                img {
                        min-width: auto;
                        height: auto;
                        border-radius: 20px;
                        padding: 10px;
                }
                .date {
                        font-size: 2.2em;
                }
        }
</style>
