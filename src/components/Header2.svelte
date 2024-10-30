<script>
        import { fly } from "svelte/transition";
        import Flèche from "../assets/montagne.png";
        import svgMenu from "../assets/svg-menu.svg";
        let menuVisible = false;
        import ButtonSuscription from "../components/Suscription-button.svelte";
        import SuscriptionButton from "../components/Suscription-button.svelte";
        function openCloseMenu() {
                menuVisible = !menuVisible;
        }
</script>

<header>
        <div class="wrapper-header">
                <a href="/"><h1>...</h1></a>
                <img class="logo" src={Flèche} alt="Logo" />
                <SuscriptionButton />
                <button on:click={openCloseMenu}>
                        <img class="svg-menu" src={svgMenu} alt="Menu" />
                </button>
        </div>
        <div class="menu-container">
                {#if menuVisible}
                        <div class="menu" in:fly={{ x: 200, duration: 1000 }} out:fly={{ x: 200, duration: 1000 }}>
                                <a href="/Advertisement">Publicités</a>
                                <a href="/">Nous contacter</a>
                                <!-- Ajoutez d'autres éléments de menu ici -->
                        </div>
                {/if}
        </div>
</header>

<!-- Contenu du menu -->

<style>
        header {
                padding: 0px;
                background-color: rgb(249, 241, 242);
                max-height: 100px;
                width: 100%;
                z-index: 0;
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

        .logo {
                height: 100px; /* Ajustez la taille de l'image */
        }

        .svg-menu {
                height: 30px; /* Ajustez la taille de l'icône du menu */
                cursor: pointer;
        }
        button {
                background-color: transparent;
                border: none;
                padding: 10px;
                cursor: pointer;
                margin-right: 10px;
        }
        button:hover {
                background-color: rgb(211, 211, 213);
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

        button {
                padding: 10px;
                margin: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
                background-color: #e3d2d2;
        }

        @media screen and (max-width: 768px) {
                .logo {
                        height: 100px;
                }
        }
</style>
