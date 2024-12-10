<script>
  import { db } from '../../lib/firebase.js'; // Assurez-vous que le chemin est correct
  import { collection, doc, writeBatch } from 'firebase/firestore';
  import DeleteBdd from "../../components/deleteBdd.svelte";

  let file;

  const handleFileChange = (event) => {
    file = event.target.files[0];
    console.log('File selected:', file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const fileContent = e.target.result;
        console.log('File content:', fileContent);
        const data = JSON.parse(fileContent);
        console.log('Parsed data:', data);

        const batch = writeBatch(db);
        data.forEach((docData) => {
          // Convert fields to correct types if necessary
          if (typeof docData.id === 'string' && !isNaN(docData.id)) {
            docData.id = Number(docData.id); // Ensure id is a number
          }
          console.log('Processing document:', docData);
          const docRef = doc(collection(db, 'BDDPub'), docData.id.toString()); // Firestore requires document IDs to be strings
          batch.set(docRef, docData);
        });

        await batch.commit();
        alert('File successfully uploaded and imported to Firestore!');
      } catch (error) {
        console.error('Error reading or uploading file:', error);
        alert('Error uploading file.');
      }
    };

    reader.readAsText(file);
  };
</script>

<input type="file" accept=".json" on:change={handleFileChange} />
<button on:click={handleFileUpload}>Upload and Import JSON</button>

<DeleteBdd />



<!-- règles restreintes -->

<!-- rules_version = '2';
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
} 



règles ouvertes


rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Permet la lecture et l'écriture pour tout le monde (authentification non requise)
      allow read, write: if true;
    }
  }
} -->