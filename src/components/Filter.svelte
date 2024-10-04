<script>
        import { writable } from "svelte/store";
        import { slide } from "svelte/transition";

        export let jsonDataByDate;
        export let startDate = "";
        export let endDate = "";
        export let filterLieu = "";
        export let type = ""; // Champ pour le type d'évènement
        export let filteredEvents = writable([]);

        let OpenFilter = false;
        let showInputs = true;
        function toggleFilter() {
                OpenFilter = !OpenFilter;
                if (!OpenFilter) {
                        // Quand on ouvre le filtre, on réinitialise showInputs à true
                        showInputs = true;
                }
        }

        //     function removeWrapper() {
        //         showInputs = false;  // Cacher le wrapper-inputs
        //     }

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
        <button class="setUp-button" on:click={toggleFilter}><i class="fa-solid fa-sliders"></i></button>

        {#if OpenFilter && showInputs}
                <div class="wrapper-inputs" in:slide={{ x: -300, duration: 1300, opacity: 0.5 }} out:slide={{ x: 1200, duration: 900, opacity: 0.5 }}>
                        <div class="wrapper-label">
                                <button class="erase-button" on:click={toggleFilter}>
                                        <i class="fa-solid fa-circle-xmark"></i>
                                </button>

                                <label>
                                        Lieu :
                                        <input type="text" bind:value={filterLieu} placeholder="Filtrer par lieu" />
                                        <button class="effacer-button" on:click={() => (filterLieu = "")}><i class="fa-regular fa-circle-xmark"></i></button>
                                </label>
                                <label>
                                        Type :
                                        <select bind:value={type}>
                                                <option value="">Tous les types</option>
                                                {#each types as t}
                                                        <option value={t}>{t}</option>
                                                {/each}
                                        </select>
                                        <button class="effacer-button" on:click={() => (type = "")}><i class="fa-regular fa-circle-xmark"></i></button>
                                </label>
                                <label>
                                        Du :
                                        <input type="date" bind:value={startDate} />
                                        <button class="effacer-button" on:click={() => (startDate = "")}><i class="fa-regular fa-circle-xmark"></i></button>
                                </label>
                                <label>
                                        Au :
                                        <input type="date" bind:value={endDate} />
                                        <button class="effacer-button" on:click={() => (endDate = "")}><i class="fa-regular fa-circle-xmark"></i></button>
                                </label>
                        </div>
                        <div class="wrapper-buttons-apply">
                                <button class="buttons-apply" on:click={resetFilters}>Réintialiser</button>
                                <button class="buttons-apply apply" on:click={applyFilter}>Appliquer </button>
                        </div>
                </div>
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
                max-width: 90%;
                height: auto;
                flex-direction: column;
                align-items: baseline;
                justify-content: center;
                align-content: center;
                margin: 30px auto;
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
                align-items: center;
                justify-content: center;
                gap: 10px;
                position: relative;
                margin: 0px auto;
                margin-top: 30px;
        }
        label {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                color: var(--whiteGrey);
                font-weight: 900;
        }
        .erase-button {
                position: absolute;
                color: var(--whiteGrey);
                font-size: 1.3rem;
                font-weight: 300;
                cursor: pointer;
                top: -30px;
                left: 98%;
                box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.446);
                transition: 0.3s ease-in-out;
                background-color: transparent;
                border: none;
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
                color: var(--primary);
                min-width: auto;
                padding: 10px 15px;
                border-radius: 8px;
                border: none;
                background-color: var(--cta);
                font-weight: 400;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                font-size: 1rem;
                letter-spacing: 0px;
        }
        .apply {
                background-color: var(--green);
                color: white;
        }
        .buttons-apply:hover {
                transform: scale(1.1);
        }
        .effacer-button {
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--cta2);
                font-size: 1.4rem;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                border: none;
                background-color: transparent;
                font-weight: 900;
                cursor: pointer;
                transition: 0.3s ease-in-out;
        }
        .effacer-button:hover {
                transform: scale(0.9);
        }
        @media screen and (max-width: 768px) {
                label {
                        flex-direction: row;
                }
                .wrapper-inputs {
                        min-width: 98%;
                }
                .wrapper-label {
                        max-width: 100%;
                        gap: 20px;
                }
                .erase-button {
                        top: -40px;
                        left: 100%;
                }
        }
</style>
