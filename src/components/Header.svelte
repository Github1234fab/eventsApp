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
                "Chazelle",
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
                <a href="/"><h1>. ... ....</h1></a>
                <button class="button-menu" on:click={openCloseMenu}>
                        <img class="svg-menu" src={svgMenu} alt="Menu" />
                </button>
        </div>
        <div class="menu-container">
                {#if menuVisible}
                        <div class="menu" in:fly={{ x: 400, duration: 1000 }} out:fly={{ x: 400, duration: 1000 }}>
                                <a href="/CardPubSpace">Commerces</a>
                                <a href="/">Nous contacter</a>
                                <!-- Ajoutez d'autres éléments de menu ici -->
                        </div>
                {/if}
        </div>
        <div class="filter-controls">
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
                <button class="reset-filter btn-grad" on:click={resetFilters}>Annuler les filtres</button>
        </div>
</header>

<!-- Contenu du menu -->

<style>
        header {
                display: flex;
                flex-direction: column;
                padding: 20px;
                background-color: rgb(249, 241, 242);
                height: auto;
                width: 100%;
                position: fixed;
        }

        .wrapper-header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
        }
        .menu-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                z-index: 20;
                position: relative;
        }
        .button-menu {
                border: none;
                background-color: transparent;
                transition: 0.3s ease-in-out;
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
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                background-color: rgba(255, 255, 255, 0.6);
                backdrop-filter: blur(15px);
                padding: 30px 40px;
                border-radius: 10px;
                width: 300px;
                height: 100%;
                position: fixed;
                top: 70px;
                right: 0;
                overflow: auto;
        }

        .svg-menu {
                height: 30px;
                cursor: pointer;
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
                gap: 10px;
                z-index: 10;
                height: 100px;
        }
        select {
                padding: 5px 5px;
                margin: 0px;
                border-radius: 5px;
                border: none;
                max-width: 100px;
                max-height: 50px;
                text-align: center;
        }
        select:hover {
                box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.526);
        }

        .reset-filter {
                box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.526);
                background-color: rgb(26, 26, 25);
                border: none;
                color: var(--whiteGrey);
                padding: 7px 10px;
                max-height: 50px;
                border-radius: 5px;
                transition: 0.3s ease-in-out;
                text-align: center;
                margin-left: 5px;
                font-weight: 500;
                font-family: Jost;
        }

        .btn-grad {
                background-size: 200% auto;
                display: block;
                background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
        }

        .btn-grad:hover {
                background-position: right center; /* change the direction of the change here */
        }

        @media screen and (max-width: 768px) {
                header {
                        padding: 20px;
                        background-color: rgb(249, 241, 242);
                        height: auto;
                        width: 100%;
                        position: fixed;
                }
                .filter-controls {
                        display: flex;
                        justify-content: first baseline;
                        flex-wrap: wrap;
                        z-index: 10;
                        height: 100px;
                }
                .reset-filter {
                        margin-left: 0px;
                }
        }
</style>
