<script>
        import { collection, getDocs } from "firebase/firestore";
        import { db } from "../lib/firebase.js";
        import { jsonDataByDate } from "../lib/store.js"; // Importer le store

        // Fonction pour convertir la date "DD/MM/YYYY" en objet Date
        function parseDate(dateString) {
                // Vérifie que la date n'est pas vide et bien une chaîne de caractères
                if (!dateString || typeof dateString !== "string") return null;

                // Split la date en jour, mois, année
                const [day, month, year] = dateString.split("/").map(Number);
                return new Date(year, month - 1, day); // Les mois sont indexés de 0 à 11 en JS
        }

        async function fetchJsonData() {
                try {
                        const jsonDataCollection = collection(db, "BDDjson");

                        const querySnapshot = await getDocs(jsonDataCollection);
                        let tempJsonDataByDate = {}; // Utiliser une variable temporaire pour stocker les données

                        querySnapshot.forEach((doc) => {
                                const data = doc.data();
                                console.log(data);
                                
                                // Convertir la date si elle est au format DD/MM/YYYY
                                const eventDate = parseDate(data.date); // Conversion de la date
                                if (!eventDate) {
                                        console.error("Invalid date format:", data.date);
                                        return;
                                }
                                else {
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
