<template>
    <div class="map-container">
        <div class="zone commissariat" @click="afficherLieu('Commissariat')">🏢 Commissariat</div>
        <div class="zone maison" @click="afficherLieu('Maison Cambriolée')">🏠 Maison</div>
        <div class="zone rue" @click="afficherLieu('Rue Principale')">🛣 Rue</div>
        <div class="zone parc" @click="afficherLieu('Parc')">🌳 Parc</div>

        <div v-if="lieuActuel" class="info-box">
            <strong>{{ lieuActuel }}</strong> sélectionné.
        </div>
    </div>
</template>

<script>
export default {
    name: "CarteVilleComponent",
    data() {
        return {
            lieuActuel: ''
        }
    },
    methods: {
        afficherLieu(nom) {
            this.lieuActuel = nom;
        }
    }
}
</script>

<style scoped>
.map-container {
    position: relative;
    width: 400px;
    height: 300px;
    background-color: #cce3ff;
    border: 2px solid #000;
    border-radius: 10px;
    margin: 20px auto;
}

/* Zones (quartiers, bâtiments) */
.zone {
    position: absolute;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.8);
    transition: transform 0.2s;
}

.zone:hover {
    transform: scale(1.05);
}

/* Emplacement personnalisé de chaque lieu */
.commissariat {
    top: 20px;
    left: 30px;
    background-color: #a6c8ff;
}

.maison {
    top: 200px;
    left: 250px;
    background-color: #ffe0b2;
}

.rue {
    top: 130px;
    left: 100px;
    background-color: #b0bec5;
}

.parc {
    top: 60px;
    left: 250px;
    background-color: #c8e6c9;
}

.info-box {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: navy;
    color: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>