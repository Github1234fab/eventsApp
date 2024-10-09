<script>
        export let annonceur;
        export let date;
        export let début;
        export let fin;
        export let lieu;
        export let tarif;
        export let img;

        // export let type;
</script>

<div class="card">
        <!-- <h2>{type}</h2> -->
             <img src={img} alt="">
        <p class="p">Date: {date}</p>
        <p class="p">Horaire début: {début}</p>
        <p class="p">Horaire fin: {fin}</p>
        <p class="p">Tarif: {tarif}</p>
        <p class="p">Lieu: {lieu}</p>
        <p class="p">debut: {début}</p>
        <p class="p">Annonceur: {annonceur}</p>
    
</div>

<style>
        .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                max-width: 50%;
        }
        
         img {
                width: 100%;
                height: 200px;
                border-radius: 10px;
        } 

        /* h1 {
                font-size: 1.5em;
        } */

        /* h2 {
                font-size: 1.2em;
        } */

        /* h4 {
                font-size: 1em;
        } */
</style>
