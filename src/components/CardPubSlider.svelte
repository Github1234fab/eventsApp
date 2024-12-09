<script>
        import { headingsTab, filterCategorie, filterObject, filterLieu } from "../lib/storeAdvertisement.js";
        import CardPub from "../components/CardPub.svelte";
        import Header3 from "../components/Header3.svelte";

        let headings = [];
        $: headings = $headingsTab;
        console.log("Headings:", headings); // Log pour vérifier les données

        let filteredHeadings = [];
        $: filteredHeadings = headings.filter((heading) => {
                return (!$filterCategorie || (heading.catégorie && heading.catégorie.includes($filterCategorie))) && (!$filterObject || (heading.object && heading.object.includes($filterObject))) && (!$filterLieu || (heading.lieu && heading.lieu.includes($filterLieu)));
        });
        console.log("Filtered Headings:", filteredHeadings); // Log pour vérifier les données filtrées

        function resetFilters() {
                filterCategorie.set("");
                filterObject.set("");
                filterLieu.set("");
        }
</script>

<Header3 {resetFilters} />

<div class="wrapper-card-pub">
        {#each filteredHeadings.length > 0 ? filteredHeadings : headings as heading}
                <CardPub {heading} id={heading.id} />
        {/each}
</div>

<style>
        .wrapper-card-pub {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                margin-top: 0px;
                max-width: 100%;
                min-height: 100%;
                gap: 40px;
                padding-top: 200px;
        }

        @media screen and (max-width: 768px) {
                .wrapper-card-pub {
                        margin-top: 0px;
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 90%;
                        padding-top: 250px;
                }
        }
</style>
