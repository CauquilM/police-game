<template>
  <div class="notification-wrapper">
    <div v-for="n in notifications" :key="n.id" class="notification" :class="n.type">
      <h3 v-if="n.type === 'radio'" class="d-flex radio align-items-center">
        <span><img class="w-30" src="../assets/police-radio.svg" /></span>{{ n.title }}
      </h3>
      <h3 v-else-if="n.type === 'success'" class="d-flex radio align-items-center">
        <span><img class="w-30" src="../assets/police-radio.svg" /></span>{{ n.title }}
      </h3>
      <h3 v-else class="d-flex radio align-items-center">
        <span><img class="w-30" src="../assets/police-radio.svg" /></span>{{ n.title }}
      </h3>
      <p>{{ n.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NotificationComponent',
  computed: {
    ...mapState(['notifications'])
  }
}
</script>
