<script>
  import Home from "../components/Home.svelte";
  import UpLoadJson from "../components/UpLoadJson.svelte";
  import UpLoadJsonPub from "../components/UpLoadJsonPub.svelte";
  import './styles.css';
</script>


<main>
        <!-- {#if accessGranted}  -->
        <!-- {#if accessGranted}  -->
    <!-- Votre application -->



        <Home/>
        <UpLoadJson/>
        <UpLoadJsonPub/>
        <!-- {:else}  -->
        <!-- {:else}  -->


    <!-- Formulaire de protection -->
  <!-- <div style="text-align: center; margin-top: 50px;"> -->
  <!-- <div style="text-align: center; margin-top: 50px;">
        <h1>Protection par mot de passe</h1>
        <input
            type="password"
            placeholder="Entrez le mot de passe"
            bind:value={passwordInput}
        />
        <button on:click={checkPassword}>Valider</button>
    </div> 
 {/if}
    </div>  -->
 <!-- {/if} -->
</main>

<style>
        main {
                height: auto;
    
        }
</style>