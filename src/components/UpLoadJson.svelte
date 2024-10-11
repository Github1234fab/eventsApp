<script>
    import { collection, getDocs } from "firebase/firestore";
    import { db } from "../lib/firebase.js";
    import { jsonDataByDate } from "../lib/store.js"; // Importer le store

    async function fetchJsonData() {
        try {
            const jsonDataCollection = collection(db, "BDDjson");

            const querySnapshot = await getDocs(jsonDataCollection);
            let tempJsonDataByDate = {}; // Utiliser une variable temporaire pour stocker les données

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(data);
                
                // Utiliser la date directement du format YYYY/MM/DD
                const eventDate = new Date(data.date); // On attend un format valide

                if (isNaN(eventDate)) {
                    console.error("Invalid date format:", data.date);
                    return;
                } else {
                    console.log("Parsed date:", eventDate); // Vérifier l'objet Date
                }

                // Obtenir la date au format ISO (YYYY-MM-DD)
                const dateKey = eventDate.toISOString().slice(0, 10);

                if (!tempJsonDataByDate[dateKey]) {
                    tempJsonDataByDate[dateKey] = [];
                }

                tempJsonDataByDate[dateKey].push(data);
            });

            jsonDataByDate.set(tempJsonDataByDate); // Mettre à jour le store
        } catch (error) {
            console.error("Error fetching JSON data:", error);
        }
    }

    // Appeler la fonction pour récupérer les données au chargement du composant
    fetchJsonData();
</script>
