<template>
  <div id="app">
    <nav class="d-flex justify-content-space-around">
      <router-link to="/" class="d-flex align-items-center"><img class="w-30 mr-5" src="./assets/police-car-patroling.svg" alt=""><p>Patrol</p></router-link>
      <router-link to="/investigations" class="d-flex align-items-center"><img class="w-30 mr-5" src="./assets/detectives-badge.svg" alt=""><p>Investigations Bureau</p></router-link>
    </nav>
    <router-view/>
    <div>
      <NotificationComponent v-if="notification.message" :title="notification.title" :message="notification.message" :type="notification.type" />
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
    this.chooseMission(); // mission initiale
    this.showNotification("A new radio call ", this.lastMissionTitle, "radio")
    this.missionInterval = setInterval(() => {
      this.chooseMission();
        this.showNotification("A new radio call ", this.lastMissionTitle, "radio")
    }, 15000); // toutes les 15 secondes
  },
  beforeDestroy() {
    clearInterval(this.missionInterval);
  },
  computed: {
    ...mapState(["lastMissionTitle"]),
  },
  methods: {
    ...mapActions(['chooseMission']),
    showNotification(title, message, type) {
      this.notification.title = title
      this.notification.message = message
      this.notification.type = type // info | success | error

      // Supprime la notif après 6s (sinon elle reste dans le DOM)
      setTimeout(() => {
        this.notification.message = ''
      }, 6000)
    },
  }
}
</script>
