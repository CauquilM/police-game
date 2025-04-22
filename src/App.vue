<template>
  <div id="app">
    <nav class="d-flex justify-content-space-around">
      <router-link to="/" class="d-flex align-items-center"><img class="w-30 mr-5"
          src="./assets/police-car-patroling.svg" alt="">
        <p>Patrol</p>
      </router-link>
      <router-link to="/investigations" class="d-flex align-items-center"><img class="w-30 mr-5"
          src="./assets/detectives-badge.svg" alt="">
        <p>Investigations Bureau</p>
      </router-link>
    </nav>
    <router-view />
    <div>
      <NotificationComponent />
    </div>
  </div>
</template>

<script>
import NotificationComponent from './components/NotificationComponent'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    NotificationComponent
  },
  data() {
    return {
      notification: {
        title: '',
        message: '',
        type: ''
      }
    }
  },
  created() {
    this.missionInterval = setInterval(() => {
      this.chooseMission();
      this.notify({
        title: "A new radio call",
        message: this.lastMissionTitle,
        type: "radio"
      })
    }, 60000); // toutes les 60 secondes
  },
  beforeDestroy() {
    clearInterval(this.missionInterval);
  },
  computed: {
    ...mapState(["lastMissionTitle"]),
  },
  methods: {
    ...mapActions(['chooseMission', 'notify']),
  }
}
</script>
