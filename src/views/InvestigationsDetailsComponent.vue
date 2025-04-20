<template>
  <div class="investigation-card">
    <h2 class="title">🔍 {{ investigation.titre }}</h2>

    <div v-if="etape === 1" class="etape etape-indices">
      <p class="description">{{ investigation.description }}</p>
      <h3>🧩 Indices disponibles :</h3>
      <ul class="list">
        <li
          v-for="(indice, key) in investigation.indices"
          :key="key"
          class="list-item clickable"
          @click="revelerIndice(key)"
        >
          🔹 {{ indice.label }}
        </li>
      </ul>

      <div v-if="indicesTrouves.length > 0" class="collected">
        <h4>📝 Indices récoltés :</h4>
        <ul class="list collected-list">
          <li v-for="key in indicesTrouves" :key="key">
            {{ investigation.indices[key].description }}
          </li>
        </ul>
      </div>

      <button
        class="next-button"
        v-if="indicesTrouves.length === Object.keys(investigation.indices).length"
        @click="etape++"
      >
        👉 Passer aux suspects
      </button>
    </div>

    <div v-else-if="etape === 2" class="etape etape-suspects">
      <h3>🕵️ Interrogez un suspect :</h3>
      <ul class="list">
        <li
          v-for="suspect in investigation.suspects"
          :key="suspect.nom"
          class="list-item clickable suspect"
          @click="choisirSuspect(suspect.nom)"
        >
          <strong>{{ suspect.nom }}</strong> — {{ suspect.description }}
        </li>
      </ul>
    </div>

    <div v-else-if="etape === 3" class="etape etape-resultat">
      <h3>🎯 Résultat de votre enquête</h3>
      <p class="result">{{ resultat }}</p>
      <button class="retry-button" @click="reset">🔄 Recommencer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestigationsDetailsComponent',
  props: {
    investigation: Object
  },
  data() {
    return {
      etape: 1,
      indicesTrouves: [],
      suspectChoisi: null,
      resultat: ''
    };
  },
  methods: {
    revelerIndice(key) {
      if (!this.indicesTrouves.includes(key)) {
        this.indicesTrouves.push(key);
      }
    },
    choisirSuspect(nom) {
      this.suspectChoisi = nom;
      if (nom === this.investigation.coupable) {
        this.resultat = "✅ Bien joué ! Vous avez trouvé le coupable.";
      } else {
        this.resultat = `❌ Mauvais choix.`;
      }
      this.etape++;
    },
    reset() {
      this.etape = 1;
      this.indicesTrouves = [];
      this.suspectChoisi = null;
      this.resultat = '';
    }
  }
}
</script>

<style scoped>
.investigation-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.description {
  font-size: 18px;
  margin-bottom: 16px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #f9f9f9c8;
  transition: all 0.3s ease;
}

.list-item.clickable:hover {
  background-color: #e0f7fa;
  cursor: pointer;
}

.suspect {
  border-left: 4px solid #ff9800;
}

.collected {
  margin-top: 24px;
}

.collected-list li {
  padding-left: 10px;
  font-style: italic;
  color: #4a4a4a;
}

.next-button,
.retry-button {
  display: block;
  margin: 24px auto 0;
  padding: 12px 24px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: background 0.3s ease;
}

.next-button:hover,
.retry-button:hover {
  background: #1565c0;
}

.result {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #2e7d32;
}
</style>
