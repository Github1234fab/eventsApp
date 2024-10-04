<script>
        import { writable } from "svelte/store";
        import { fly } from "svelte/transition";

        export let jsonDataByDate;
        export let startDate = "";
        export let endDate = "";
        export let filterLieu = "";
        export let type = ""; // Champ pour le type d'évènement
        export let filteredEvents = writable([]);

        let OpenFilter = false;
        let showInputs = true;

        function removeWrapper() {
                showInputs = false;
        }

        const types = ["brocante", "foire", "fêtes", "café philo", "concert", "conférence", "concours photo", "lecture contes"];

        function applyFilter() {
                let filtered = [];
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                for (const [date, events] of Object.entries(jsonDataByDate)) {
                        const currentDate = new Date(date);
                        if ((start && currentDate < start) || (end && currentDate > end)) {
                                continue;
                        }

                        events.forEach((event) => {
                                const matchesLieu = filterLieu ? event.lieu?.toLowerCase().includes(filterLieu.toLowerCase()) : true;
                                const matchesType = type ? event.type?.toLowerCase() === type.toLowerCase() : true;

                                if (matchesLieu && matchesType) {
                                        filtered.push(event);
                                }
                        });
                }

                filteredEvents.set(filtered);
        }

        function resetFilters() {
                startDate = "";
                endDate = "";
                filterLieu = "";
                type = "";
                applyFilter(); // Réapplique le filtre avec les valeurs réinitialisées
        }
</script>

<section>
        <button class="setUp-button" on:click={() => (OpenFilter = !OpenFilter)}><i class="fa-solid fa-sliders"></i></button>

        {#if OpenFilter}
           {#if showInputs}
                <div class="wrapper-inputs" in:fly={{ x: -300, duration: 1300, opacity: 0.5 }} out:fly={{ x: 1800, duration: 900, opacity: 0.5 }}>
                        <div class="wrapper-label">
                             
                                        <button on:click={removeWrapper}><i class="fa-solid fa-circle-xmark erase-button"></i></button>
                            
                                <label>
                                        Lieu :
                                        <input type="text" bind:value={filterLieu} placeholder="Filtrer par lieu" />
                                        <button class="effacer-button" on:click={() => (filterLieu = "")}>Effacer</button>
                                </label>
                                <label>
                                        Type :
                                        <select bind:value={type}>
                                                <option value="">Tous les types</option>
                                                {#each types as t}
                                                        <option value={t}>{t}</option>
                                                {/each}
                                        </select>
                                        <button class="effacer-button" on:click={() => (type = "")}>Effacer</button>
                                </label>
                                <label>
                                        Date de début :
                                        <input type="date" bind:value={startDate} />
                                        <button class="effacer-button" on:click={() => (startDate = "")}>Effacer</button>
                                </label>
                                <label>
                                        Date de fin :
                                        <input type="date" bind:value={endDate} />
                                        <button class="effacer-button" on:click={() => (endDate = "")}>Effacer</button>
                                </label>
                        </div>
                        <div class="wrapper-buttons-apply">
                                <button class="buttons-apply" on:click={resetFilters}>Réintialiser</button>
                                <button class="buttons-apply" on:click={applyFilter}>Appliquer </button>
                        </div>
                </div>
                    {/if}
        {/if}
</section>

<style>
        section {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: auto;
        }

        .wrapper-inputs {
                display: flex;
                min-width: 30%;
                height: auto;
                flex-direction: column;
                align-items: baseline;
                justify-content: center;
                align-content: center;
                margin: 20px auto;
                border: 1px solid pink;
                border-radius: 8px;
                padding: 20px 30px;
                gap: 30px;
                background-color: var(--primary);
                box-shadow: 0px 0px 10px 0px grey;
        }
        .wrapper-label {
                display: flex;
                flex-direction: column;
                align-items: baseline;
                justify-content: center;
                gap: 3px;
                position: relative;
                margin-top: 40px;
        }
        label {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                color: var(--whiteGrey);
        }
        .erase-button {
                position: absolute;
                color: var(--whiteGrey);
                font-size: 1.3rem;
                font-weight: 300;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                top: -40px;
                left: 98%;
                box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.446);
                transition: 0.3s ease-in-out;
        }
        .erase-button:hover {
                transform: scale(1.1);
        }

        input::placeholder {
                font-family: "Roboto Flex";
        }
        input,
        select {
                flex-grow: 1;
                padding: 10px 14px;
                min-width: auto;
                padding: 5px 5px;
                border-radius: 8px;
                border: 1px solid var(--secondary);
                background-color: var(--whiteGrey);
        }
        .setUp-button {
                color: var(--primary);
                padding: 10px 15px;
                border-radius: 8px;
                border: none;
                background-color: transparent;
                font-weight: 800;
                font-size: 1.3rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
        }
        .setUp-button:hover {
                transform: scale(1.1);
        }

        .wrapper-buttons-apply {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                padding: 20px;
                align-self: center;
        }
        .buttons-apply {
                color: white;
                min-width: auto;
                padding: 10px 15px;
                border-radius: 8px;
                border: none;
                background-color: var(--cta);
                font-weight: 600;
                cursor: pointer;
                transition: 0.3s ease-in-out;
        }
        .buttons-apply:hover {
                transform: scale(1.1);
        }
        .effacer-button {
                color: var(--whiteGrey);
                padding: 5px 10px;
                border-radius: 8px;
                border: none;
                background-color: var(--cta2);
                font-weight: 500;
                letter-spacing: 1px;
                cursor: pointer;
                transition: 0.3s ease-in-out;
        }
        .effacer-button:hover {
                transform: scale(0.9);
        }
</style>
