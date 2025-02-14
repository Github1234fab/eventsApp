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
        let canvas = null;
        let videoElement = null;
        let marker = null;
    
        onMount(() => {
            if (typeof window !== 'undefined' && window.navigator) {
                // Demander l'accès à la caméra (frontale ou arrière selon la plateforme)
                navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: "environment" } // Utilise la caméra arrière si disponible
                    }
                })
                    .then(stream => {
                        videoStream = stream;
                        videoElement = document.getElementById('video');
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
    
                        // Utiliser les tuiles de Mapbox
                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                            maxZoom: 18,
                            id: 'mapbox/streets-v11',
                            tileSize: 512,
                            zoomOffset: -1,
                            accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN' // Remplacez par votre token Mapbox
                        }).addTo(map);
    
                        // Ajouter un marqueur à la position GPS
                        marker = L.marker([latitude, longitude]).addTo(map)
                            .bindPopup('Vous êtes ici!')
                            .openPopup();
    
                        // Mettre à jour la position en temps réel
                        navigator.geolocation.watchPosition(position => {
                            latitude = position.coords.latitude;
                            longitude = position.coords.longitude;
                            accuracy = position.coords.accuracy;
                            marker.setLatLng([latitude, longitude]);
                            map.setView([latitude, longitude], 13);
                        }, err => {
                            console.error('Error accessing geolocation:', err);
                        });
                    }, err => {
                        console.error('Error accessing geolocation:', err);
                    });
                } else {
                    console.error('Geolocation is not supported by this browser.');
                }
            } else {
                console.error('Window or navigator is not defined.');
            }
        });
    
        function captureImage() {
            if (videoElement && canvas) {
                const context = canvas.getContext('2d');
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            }
        }
    </script>
    
    <main>
        <h1>Camera and GPS Access</h1>
        <video id="video" width="320" height="240" autoplay aria-hidden="true"></video>
        <button on:click={captureImage}>Capture Image</button>
        <canvas id="canvas" width="320" height="240"></canvas>
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
    
        video, canvas {
            border: 1px solid #ccc;
            margin-bottom: 1em;
        }
    
        #map {
            margin-top: 20px;
        }
    </style>
    