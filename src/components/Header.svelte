<script>
        import { fly } from "svelte/transition";
        import Flèche from "../assets/montagne.png";
        import svgMenu from "../assets/svg-menu.svg";
        // import { slide } from "svelte/transition";
        let menuVisible = false;
        import ButtonSuscription from "../components/Suscription-button.svelte";
        import SuscriptionButton from "../components/Suscription-button.svelte";
        function openCloseMenu() {
                menuVisible = !menuVisible;
        }

        import { writable } from "svelte/store";
        export let filterLieu = writable("");
        export let filterCategory = writable("");
        export let filterDate = writable("");

        const lieux = [
                "Aveize",
                "Beauvallon",
                "Brindas",
                "Brignais",
                "Brullioles",
                "Brussieu",
                "Chabanière",
                "Chambost Longessaigne",
                "Chapelle sur Coise, La",
                "Châtelus",
                "Chaussan",
                "Chevrières",
                "Coise",
                "Craponne",
                "Duerne",
                "Grammond",
                "Grézieu le Marché",
                "Haute Rivoire",
                "Larajasse",
                "Les Halles",
                "Longessaigne",
                "Maringes",
                "Messimy",
                "Meys",
                "Montromant",
                "Montrottier",
                "Mornant",
                "Orliénas",
                "Pomeys",
                "Pollionnay",
                "Riverie",
                "Rontalon",
                "Saint André la Côte",
                "Saint Clément les Places",
                "Saint Denis sur Coise",
                "Saint Genis l’Argentière",
                "Saint Laurent de Chamousset",
                "Saint Laurent d'Agny",
                "Saint Martin en Haut",
                "Saint Symphorien sur Coise",
                "Sainte Catherine",
                "Sainte Consorce",
                "Sainte Foy l’Argentière",
                "Soucieu-en-Jarrest",
                "Souzy",
                "Taluyers",
                "Thurins",
                "Vaugneray",
                "Villechenève",
                "Viricelles",
                "Virigneux",
                "Yzeron",
        ];

        const categories = ["Cinema", "Musées et visites", "Loisirs et jeux", "Fête", "Atelier", "Activité sportive", "Baignade", "Cours et stages", "Balades", "Parcs", "Resto et goûter", "Brocante et foire", "Concert", "Conférence", "Concours", "Lecture", "Enfant", "Sortie", "Exposition", "Sports", "Culture"];

        const datesOptions = ["Aujourd'hui", "Cette semaine", "Ce week-end", "Ce mois-ci"];

        // Fonction pour réinitialiser les filtres
        function resetFilters() {
                filterLieu.set("");
                filterCategory.set("");
                filterDate.set("");
        }
</script>

<header>
        <div class="wrapper-header">
                <a href="/"><h1>C mon coin</h1></a>
                <!-- <img class="logo" src={Flèche} alt="Logo" /> -->
                <!-- <SuscriptionButton /> -->
                <!-- <a href="/CardPubSpace" class="button-link-pub">publicité</a> -->
                <button class="button-menu" on:click={openCloseMenu}>
                        <img class="svg-menu" src={svgMenu} alt="Menu" />
                </button>
        </div>

        <div class="filter-controls">
                <div class="menu-container">
                        {#if menuVisible}
                                <div class="menu" in:fly={{ x: 200, duration: 1000 }} out:fly={{ x: 200, duration: 1000 }}>
                                        <a href="/CardPubSpace">Commerces</a>
                                        <a href="/">Nous contacter</a>
                                        <!-- Ajoutez d'autres éléments de menu ici -->
                                </div>
                        {/if}
                </div>

                <select bind:value={$filterLieu}>
                        <option value="">Ou ?</option>
                        {#each lieux as lieu}
                                <option value={lieu}>{lieu}</option>
                        {/each}
                </select>

                <select bind:value={$filterCategory}>
                        <option value="">Quoi ?</option>
                        {#each categories as category}
                                <option value={category}>{category}</option>
                        {/each}
                </select>

                <select bind:value={$filterDate}>
                        <option value="">Quand ?</option>
                        {#each datesOptions as dateOption}
                                <option value={dateOption}>{dateOption}</option>
                        {/each}
                </select>
                <button class="reset-filter" on:click={resetFilters}>Annuler les filtres</button>
        </div>
</header>

<!-- Contenu du menu -->

<style>
        header {
                padding: 20px;
                background-color: rgb(249, 241, 242);
                max-height: 350px;
                width: 100%;
                position: fixed;
                margin-bottom: 300px;
        }
        .menu-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 10px;
                z-index: 3;
                position: fixed; /* Utilisez position: fixed pour que le menu soit au-dessus des autres éléments */
        }
        .button-menu {
                background-color: transparent;
                transition: 0.3s ease-in-out;
                /* box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.429); */
        }
        .button-menu:hover {
                transform: scale(1.1);
        }

        .menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
                gap: 30px;
                padding: 30px 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                background-color: var(--whiteGrey);
        }

        .wrapper-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
        }

        /* .logo {
                height: 100px; 
        }  */

        .svg-menu {
                height: 30px; /* Ajustez la taille de l'icône du menu */
                cursor: pointer;
        }
        button {
                background-color: grey;
                border: none;
                padding: 10px;
                cursor: pointer;
                margin-right: 10px;
        }
        button:hover {
                background-color: rgb(211, 211, 213);
        }

        h1 {
                font-size: 2.4rem;
                padding: 0px;
                font-weight: 500;
                text-transform: capitalize;
                font-family: "Bebas Neue";
                margin-left: 0px;
                z-index: 3;
        }
        a {
                text-decoration: none;
                color: #181818;
        }
        a:hover {
                color: #00bfff;
        }

        .filter-controls {
                display: flex;
                justify-content: first baseline;
                flex-wrap: wrap;
                margin-top: 10px;
                gap: 5px;
        }
        select {
                padding: 5px 0px;
                margin: 0px;
                border-radius: 5px;
                /* box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.253); */
                border: none;
                max-width: 100px;
                max-height: 30px;
        }

        .reset-filter {
                box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.526);
                background-color: rgb(26, 26, 25);
                border: none;
                color: var(--whiteGrey);
                margin-top: 4px;
                padding: 7px;
        }

        @media screen and (max-width: 768px) {
                /* .logo {
                        width: 200px;
                        z-index: 0;
                } */
        }
</style>
