<script>
        import { headingsTab } from "../../lib/storeAdvertisement.js";
        import CardPub from "../../components/Card-pub.svelte";
        import Header3 from "../../components/Header3.svelte";

        let headings = [];
        $: headings = $headingsTab;
</script>

<Header3 />

{#each headings as heading}
<CardPub {heading} />
{/each}
