<template>
  <div class="enquete">
    <div v-if="$route.path === '/investigations'">
      <h2 class="text-black">🔍 {{ enquete.titre }}</h2>
    </div>
    <div v-else>
      <h2>🔍 {{ enquete.titre }}</h2>

      <div v-if="etape === 1">
        <p>{{ enquete.description }}</p>
        <ul>
          <li v-for="(indice, key) in enquete.indices" :key="key" @click="revelerIndice(key)">
            🔹 {{ indice.label }}
          </li>
        </ul>

        <div v-if="indicesTrouves.length > 0">
          <h4>Indices récoltés :</h4>
          <ul>
            <li v-for="key in indicesTrouves" :key="key">
              {{ enquete.indices[key].description }}
            </li>
          </ul>
        </div>

        <button v-if="indicesTrouves.length === Object.keys(enquete.indices).length" @click="etape++">
          Passer aux suspects
        </button>
      </div>

      <div v-else-if="etape === 2">
        <p>Interrogez un suspect :</p>
        <ul>
          <li v-for="suspect in enquete.suspects" :key="suspect.nom" @click="choisirSuspect(suspect.nom)">
            {{ suspect.nom }} - {{ suspect.description }}
          </li>
        </ul>
      </div>

      <div v-else-if="etape === 3">
        <h3>🎯 Résultat de votre enquête</h3>
        <p>{{ resultat }}</p>
        <button @click="reset">Recommencer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnqueteComponent',
  props: {
    enquete: Object
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
      if (nom === this.enquete.coupable) {
        this.resultat = "✅ Bien joué ! Vous avez trouvé le coupable.";
      } else {
        this.resultat = `❌ Mauvais choix. Le coupable était ${this.enquete.coupable}.`;
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
.enquete {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 12px;
  max-width: 600px;
  margin: auto;
}

li {
  cursor: pointer;
  margin: 8px 0;
}

li:hover {
  color: darkblue;
}

button {
  margin-top: 20px;
}
</style>