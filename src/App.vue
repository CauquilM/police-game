<template>
  <div id="app">
    <nav class="text-center">
      <router-link to="/">Front Office</router-link> |
      <router-link to="/investigations">Investigations Bureau</router-link>
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
    // this.showNotification("A new radio call ", this.lastMissionTitle, "radio")
    // this.missionInterval = setInterval(() => {
    //   this.chooseMission();
    //     this.showNotification("A new radio call ", this.lastMissionTitle, "radio")
    // }, 60000); // toutes les 15 secondes
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

      // Supprime la notif après 3s (sinon elle reste dans le DOM)
      setTimeout(() => {
        this.notification.message = ''
      }, 3000)
    },
  }
}
</script>
