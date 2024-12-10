<script>
  import { db } from "../lib/firebase.js"; // Assure-toi que le chemin est correct
  import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Importe les méthodes nécessaires

  // Fonction pour supprimer tous les documents d'une collection
  async function deleteAllDocuments() {
    try {
      const collectionRef = collection(db, 'BDDPub'); // Référence à la collection
      const snapshot = await getDocs(collectionRef); // Récupérer les documents

      // Vérifie s'il y a des documents à supprimer
      if (snapshot.empty) {
        console.log("Aucun document à supprimer.");
        return;
      }

      // Supprimer chaque document un par un
      for (let document of snapshot.docs) {
        await deleteDoc(doc(db, 'BDDPub', document.id)); // Utilisation de await pour attendre la suppression
        console.log(`Document ${document.id} supprimé.`);
      }
      console.log("Tous les documents ont été supprimés.");
    } catch (error) {
      console.error("Erreur lors de la suppression des documents:", error);
    }
  }

  // Gestionnaire pour le bouton de suppression
  function handleDelete() {
    // Ajouter un message de confirmation
    if (confirm("Es-tu sûr de vouloir supprimer tous les documents ?")) {
      deleteAllDocuments();
    }
  }
</script>

<!-- Bouton pour déclencher la suppression -->
<button on:click={handleDelete}>
  Effacer tous les documents
</button>

<!-- 
règles  pour permettre l'effacement, mais très permissive -->


<!-- rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Permet la lecture pour tout le monde (authentification non requise)
    match /{document=**} {
      allow read: if true;
      
      // Permet de créer, mettre à jour ou supprimer des documents
      allow create, update, delete: if true;
    }
  }
}
 
 sinon, écrire cette règle:


rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Permet la lecture pour tout le monde (authentification non requise)
    match /{document=**} {
      allow read: if true;
      
      // Permet de créer ou de mettre à jour des documents, mais uniquement si certaines conditions sont respectées
      // Par exemple, tu peux limiter cela à des règles spécifiques ou laisser ouvert
      allow create, update: if true; 

      // Interdit la suppression pour tout le monde
      allow delete: if false;
    }
  }
} -->
