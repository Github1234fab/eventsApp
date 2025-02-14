<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';

    let videoStream = null;
    let geolocation = null;
    let latitude = null;
    let longitude = null;
    let accuracy = null;
    let map = null;

    onMount(() => {
        // Demander l'accès à la caméra arrière
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { exact: "environment" }
            }
        })
            .then(stream => {
                videoStream = stream;
                const videoElement = document.getElementById('video');
                if (videoElement) {
                    videoElement.srcObject = stream;
                } else {
                    console.error('Video element not found');
                }
            })
            .catch(err => {
                console.error('Error accessing the camera:', err);
            });

        // Demander l'accès au GPS
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                geolocation = position;
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                accuracy = position.coords.accuracy;
                console.log('Geolocation:', position);

                // Initialiser la carte Leaflet
                map = L.map('map').setView([latitude, longitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Ajouter un marqueur à la position GPS
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup('Vous êtes ici!')
                    .openPopup();
            }, err => {
                console.error('Error accessing geolocation:', err);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });
</script>

<main>
    <h1>Camera and GPS Access</h1>
    <video id="video" width="320" height="240" autoplay aria-hidden="true"></video>
    <p>Geolocation Access:</p>
    <p>Latitude: {latitude}</p>
    <p>Longitude: {longitude}</p>
    <p>Accuracy: {accuracy} meters</p>
    <div id="map" style="width: 100%; height: 400px;"></div>
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

    #map {
        margin-top: 20px;
    }
</style>
