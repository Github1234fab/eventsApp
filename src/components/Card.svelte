<script>
        export let image;
        export let catégorie;
        export let titre;
        export let description;
        export let date;
        export let début;
        export let fin;
        export let tarif;
        export let lien;
        export let lieu;
        export let id;
</script>

<a href={`/event/${id}`} class="card">
        <img src={image} alt="" />
        <p class="date">{new Date(date).toLocaleDateString("fr-FR")}</p>
        <p class="id">{id}</p>
        <p class="cat">{catégorie}</p>
        <p class="lieu">{lieu}</p>
        <p class="title">"{titre}"</p>
        <p class="description">{description}</p>
        <div class="wrapper-horaire-tarif">
                <p class="p">Début: {début}</p>
                <p class="p">Fin: {fin}</p>
                <p class="p">Tarif: {tarif}</p>
        </div>
        <a class="informations" href={lien} target="_blank">informations/réservation</a>
</a>

<style>
        .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background-color: white;
                border: none;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                text-decoration: none;
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
                font-size: 1em;
                font-weight: 400;
                color: var(--ardoise);
                letter-spacing: -0.9px;
                margin-top: -10px;
        }

        .cat {
                font-size: 1.5em;
                font-weight: 900;
                color: var(--ardoise);
                text-transform: uppercase;
        }
        .description {
                font-size: 1em;
                font-weight: 400;
                letter-spacing: 3.9px;
                color: var(--ardoise);
                text-transform: uppercase;
        }

        .title {
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: -0.9px;
        }

        .date {
                font-size: 1em;
                text-transform: uppercase;
                font-weight: 900;
                background-color: white;
                color: rgb(212, 17, 17);
                border: 1px solid grey;
                padding: 8px 12px;
                border-radius: 5px;
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
                font-weight: 200;
                color: var(--ardoise);
                letter-spacing: -0.9px;
        }
        .informations{
                background-color: var(--ardoise);
                color: var(--whiteGrey);
                padding: 8px 13px;
                border-radius: 8px;
                cursor: pointer;
                border: 1px solid var(--secondary);
                margin-top: 10px;
                margin-bottom: 10px;
                text-decoration: none;
                font-size: 0.7rem;
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
