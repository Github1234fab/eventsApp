<script>
    import { onMount } from 'svelte';

    let videoStream = null;
    let geolocation = null;

    onMount(() => {
        // Demander l'accès à la caméra
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoStream = stream;
                const videoElement = document.getElementById('video');
                videoElement.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing the camera:', err);
            });

        // Demander l'accès au GPS
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                geolocation = position;
                console.log('Geolocation:', position);
            }, err => {
                console.error('Error accessing geolocation:', err);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });
</script>

<main>
    <h1>PWA Demo with Svelte and Firebase</h1>
    <p>Camera Access:</p>
    <video controls>
        <source src="/chemin/vers/video.mp4" type="video/mp4" />
        <track src="/chemin/vers/sous-titres.vtt" kind="captions" srclang="fr" label="Français">
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    <p>Geolocation Access:</p>
    <pre>{JSON.stringify(geolocation, null, 2)}</pre>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    video {
        border: 1px solid #ccc;
    }

    pre {
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>
