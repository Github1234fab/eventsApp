<!-- <script context="module">
    export async function load({ params }) {
        const id = params.id;
        const response = await fetch('/path/to/your/api/or/data/source');
        const data = await response.json();
        const heading = data.find(item => item.id == id);
        return { props: { heading } };
    }
</script>

<script>
    export let heading;
</script>

<div class="card-detail">
    <img class="image" src="https://images.pexels.com/photos/696205/pexels-photo-696205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
    <p class="id">{heading.id}</p>
    <p class="nom">{heading.nom}</p>
    <p class="object">{heading.object}</p>
    <p class="lieu">{heading.lieu}</p>
    <p class="description">{heading.description}</p>
    <a class="informations" href={heading.lien} target="_blank">Site de l'annonceur</a>
</div>

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
    }
    .image {
        width: 90%;
        height: 100%;
        border-radius: 0px;
    }
</style> -->