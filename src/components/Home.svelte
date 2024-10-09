<script>
  import { jsonDataByDate } from "../lib/store.js"; // Importer le store
  import Card from "./Card.svelte"; // Importer ton composant Card
  import { onMount } from "svelte";


  let events = {}; // Variable pour stocker les événements à afficher

  onMount(() => {
    jsonDataByDate.subscribe((value) => {
      events = value;
      console.log(events);
    });
  });
</script>

<!-- Afficher les cartes d'événements -->
 <div class="wrapper-cards">
{#each Object.keys(events) as date} 
  {#each events[date] as event}
    <Card 
      annonceur={event.annonceur} 
      lieu={event.lieu} 
      date={event.date} 
      fin={event.fin} 
      tarif={event.tarif} 
      début={event.début} 
      img = {event.img}
    />
  {/each}
{/each}
</div>

<style>

.wrapper-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  flex: 0 0 1;
  min-height: auto;
}
</style>
