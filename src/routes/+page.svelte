<script>
        import UpLoadJson from "../components/UpLoadJson.svelte";
        import UpLoadJsonPub from "../components/UpLoadJsonPub.svelte";
        import Home from "../components/Home.svelte";
        import "../routes/styles.css";

        let accessGranted = false;
        let passwordInput = "";
        const correctPassword = "cal"; // Remplacez par votre mot de passe.

        function checkPassword() {
                if (passwordInput === correctPassword) {
                        accessGranted = true;
                } else {
                        alert("Mot de passe incorrect !");
                }
        }
</script>

<main>
        <!-- {#if accessGranted}  -->
    <!-- Votre application -->
    

       <!-- <Calendar /> 
       <Filter />  -->
        <Home />
        <UpLoadJson />
        <UpLoadJsonPub />
        <!-- {:else}  -->


    <!-- Formulaire de protection -->
  <!-- <div style="text-align: center; margin-top: 50px;">
        <h1>Protection par mot de passe</h1>
        <input
            type="password"
            placeholder="Entrez le mot de passe"
            bind:value={passwordInput}
        />
        <button on:click={checkPassword}>Valider</button>
    </div>  -->
 <!-- {/if} -->
</main>

<style>
        main {
                height: auto;
        }
</style>
