<script>

        import UpLoadJson from "../components/UpLoadJson.svelte";
        import UpLoadJsonPub from "../components/UpLoadJsonPub.svelte";
        import Home from "../components/Home.svelte";
        import "../routes/styles.css";
</script>

<main>
        <!-- <Calendar /> -->
         <!-- <Filter /> -->
         <Home />
        <UpLoadJson />
        <UpLoadJsonPub />

</main>

<style>
        main {
                height: auto;
                        background-color: rgb(139, 104, 110);
        }
</style>
