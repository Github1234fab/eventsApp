<script>
        import { fly } from "svelte/transition";
        import Flèche from "../assets/montagne.png";
        import svgMenu from "../assets/svg-menu.svg";
        let menuVisible = false;
        import ButtonSuscription from "../components/Suscription-button.svelte";
        import SuscriptionButton from "../components/Suscription-button.svelte";
        import { filterCategorie, filterObject, filterLieu } from "../lib/storeAdvertisement.js";
        export let resetFilters;
        // import { writable } from "svelte/store";

        function openCloseMenu() {
                menuVisible = !menuVisible;
        }

        const categories = ["Boucherie-charcuterie", "Mode et accessoires", "Maison et décoration ", "Loisirs et culture", "Technologie et matériel", "Automobile", "Santé et bien-être", "Tourisme et loisirs"];
        const objects = ["Antiquaire", "Bijoutier", "Boulanger", "Boucher", "Caviste (vins et spiritueux)", "Charcutier", "Décorateur d'intérieur", "Disquaire", "Épicier", "Esthéticien(ne)", "Fleuriste", "Fromager", "Glacier", "Herboriste", "Horloger", "Hôtelier", "Informatique (PC, smartphones)", "Libraire", "Loueur de véhicules", "Magasin de jeux vidéo", "Marchand de journaux", "Opticien", "Parfumeur", "Pâtissier", "Pharmacien", "Poissonnier", "Primeur (fruits et légumes)", "Quincailler", "Restaurateur", "Téléphonie mobile", "Traiteur", "Vendeur d'articles de sport", "Vendeur de chaussures", "Vendeur de meubles", "Vendeur de prêt-à-porter", "Vendeur d'électroménager"];

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
</script>

<header>
        <div class="wrapper-header">
                <a href="/"><h1>. ... ....</h1></a>
                <!-- <img class="logo" src={Flèche} alt="Logo" /> -->
                <SuscriptionButton />
                <button class="button-menu" on:click={openCloseMenu}>
                        <img class="svg-menu" src={svgMenu} alt="Menu" />
                </button>
        </div>

        <div class="menu-container">
                {#if menuVisible}
                        <div class="menu" in:fly={{ x: 300, duration: 1000 }} out:fly={{ x: 300, duration: 1000 }}>
                                <a href="/CardPubSpace">Publicités</a>
                                <a href="/">Nous contacter</a>
                        </div>
                {/if}
        </div>

        <div class="filters">
                <!-- <label>
                        <select bind:value={$filterCategorie}>
                                <option value="">Catégories de métier</option>
                                {#each categories as category}
                                        <option value={category}>{category}</option>
                                {/each}
                        </select>
                </label> -->
                <label>
                        <select bind:value={$filterObject}>
                                <option value="">Métier</option>
                                {#each objects as object}
                                        <option value={object}>{object}</option>
                                {/each}
                        </select>
                </label>
                <label>
                        <select bind:value={$filterLieu}>
                                <option value="">Lieu</option>
                                {#each lieux as lieu}
                                        <option value={lieu}>{lieu}</option>
                                {/each}
                        </select>
                </label>
                <button class="reset-filter btn-grad" on:click={resetFilters}>Réinitialiser les filtres</button>
        </div>
</header>

<!-- Contenu du menu -->

<style>
        .filters {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                background-color: #e2e2e2;
                height: auto;
                min-width: 100%;
                gap: 5px;
        }
        label {
                display: flex;
                flex-direction: column;
        }
        header {
                padding: 15px;
                margin-top: 0px;
                background-color: rgb(249, 241, 242);
                max-height: 100px;
                width: 100%;
                position: fixed;
                z-index: 0;
        }
        .menu-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                z-index: 20;
                position: relative;
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

        .wrapper-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
        }

        .svg-menu {
                height: 30px;
                cursor: pointer;
        }
        .button-menu {
                border: none;
                background-color: transparent;
                transition: 0.3s ease-in-out;
        }
        .button-menu:hover {
                transform: scale(1.1);
        }

        h1 {
                font-size: 2.9rem;
                padding: 10px;
                font-weight: 500;
                text-transform: capitalize;
                font-family: "Bebas Neue";
                margin-left: 0px;
        }
        a {
                text-decoration: none;
                color: #181818;
        }
        a:hover {
                color: #00bfff;
        }

        select {
                padding: 5px 10px;
                max-width: 100px;
                max-height: 30px;
                border-radius: 5px;
                border: 1px solid #ccc;
                margin-top: 10px;
        }
        .reset-filter {
                color: whitesmoke;
                padding: 10px;
                margin: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
                background-color: #1c1c1c;
                font-family: Jost;
                font-weight: 500;
        }
        .btn-grad {
                background-size: 200% auto;
                display: block;
                background-image: linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%);
        }

        .btn-grad:hover {
                background-position: right center; /* change the direction of the change here */
        }
</style>
