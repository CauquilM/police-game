<template>
    <div v-if="visible" class="notification" :class="type">
      <h3 v-if="type == 'radio'" class="d-flex radio align-items-center"><span><img class="w-30" src="../assets/police-radio.svg"></span>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotificationComponent',
    props: {
      title: String,
      message: String,
      type: {
        type: String,
        default: 'info' // info | success | error
      }
    },
    data() {
      return {
        visible: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.visible = false
      }, 5000) // Masque la notif après 5 secondes
    }
  }
  </script>
  