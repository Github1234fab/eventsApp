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
</script>

<div class="card">
        <img src={image} alt="" />
        <div class="wrapper-infos">
                <p class="cat">{catégorie}</p>
                <p class="title">{titre}</p>
                <p class="p">{description}</p>
                <p>Date : {new Date(date).toLocaleDateString("fr-FR")}</p>
                <p class="p">Horaire début: {début}</p>
                <p class="p">Horaire fin: {fin}</p>
                <p class="p">Tarif: {tarif}</p>
                <p class="p">Lieu: {lieu}</p>
                <a href={lien} target="_blank">informations/réservation</a>
        </div>
</div>

<style>
        .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 0px;
                border-bottom: 1px solid var(--secondary);
                margin-top: 5px;
                /* box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%); */
        }
        .wrapper-infos {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                padding: 10px;

                /* box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%); */
        }

        img {
                width: 300px;
                height: 300px;
                border-radius: 0px;
        }

        .cat {
                font-size: 2em;
                font-weight: 400;
                color: red;
                text-transform: uppercase;
        }

        .title {
                font-size: 1.5em;
                font-weight: 700;
        }

        .date {
                font-size: 1em;
                text-transform: uppercase;
        }
        a {
                background-color: var(--transparent);
                color: var(--secondary);
                padding: 10px;
                border-radius: 10px;
                cursor: pointer;
                border: 1px solid var(--secondary);
                margin-top: 10px;
                margin-bottom: 10px;
        }
        a:hover {
                background-color: var(--secondary);
                color: var(--whiteGrey);
        }
</style>
