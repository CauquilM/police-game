<template>
  <div id="app">
    <nav class="d-flex justify-content-space-around">
      <router-link to="/" class="d-flex align-items-center">
        <img class="w-30 mr-5" src="./assets/police-car-patroling.svg" alt="">
        <p>Patrol</p>
      </router-link>
      <router-link to="/traffic-control" class="d-flex align-items-center">
        <img class="w-30 mr-5" src="./assets/traffic-lights.svg" alt="">
        <p>Traffic Control</p>
      </router-link>
      <router-link to="/investigations" class="d-flex align-items-center">
        <img class="w-30 mr-5" src="./assets/detectives-badge.svg" alt="">
        <p>Investigations Bureau</p>
      </router-link>
      <router-link to="/office" class="d-flex align-items-center">
        <img class="w-30 mr-5" src="./assets/police-station.svg" alt="">
        <p>Office</p>
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
    this.startApp();
    this.interventionsInterval = setInterval(() => {
      if (this.interventionsCurrent.length < 4) {
        this.chooseInterventions();
        this.notify({
          title: "A new radio call",
          message: this.lastInterventionsTitle,
          type: "radio"
        })
      }
    }, 60000); // toutes les 60 secondes
  },
  beforeDestroy() {
    clearInterval(this.interventionsInterval);
  },
  computed: {
    ...mapState(["lastInterventionsTitle", "interventionsCurrent"]),
  },
  methods: {
    ...mapActions(['startApp', 'chooseInterventions', 'notify']),
  }
}
</script>
