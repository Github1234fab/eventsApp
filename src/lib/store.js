// src/lib/store.js
import { writable } from "svelte/store";

// Store pour les données JSON par date
export const jsonDataByDate = writable({});
// Store pour la date sélectionnée
export const selectedDate = writable(new Date());
// Store pour les filtres
export const filters = writable({
        type: "",
        location: "",
        startDate: "",
        endDate: "",
        organizer: "",
});

export const bonjour = writable([
        {
                name: "John",
                age: 30,
        },
        {
                name: "Jane",
                age: 25,
        },
]);

// Créer des stores pour chaque filtre
export const filterLieu = writable("");
export const filterCategory = writable("");
export const filterDate = writable("");
