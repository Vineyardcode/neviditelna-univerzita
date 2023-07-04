<template>
  <div>
    <v-card class="ma-4" elevation="2">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Events:</v-card-title>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="2">
            <div class="font-weight-bold ma-1 pa-1">Create date:</div>
            <div class="font-weight-bold ma-1 pa-1">Update date:</div>
            <div class="font-weight-bold ma-1 pa-1">Transfer date:</div>
            <div class="font-weight-bold ma-1 pa-1">Delete date:</div>
          </v-col>
          <v-col cols="4">
            <div class="date ma-1 pa-1" color="gray-lighten-2">
              {{ new Date(domainDetail.events.registered.timestamp).toLocaleString('en-US', options) }}
            </div>
            <div class="date ma-1 pa-1" color="gray-lighten-2">
              {{ new Date(domainDetail.events.updated.timestamp).toLocaleString('en-US', options) }}
            </div>
            <div class="date ma-1 pa-1" color="gray-lighten-2">
              {{ new Date(domainDetail.events.transferred.timestamp).toLocaleString('en-US', options) }}
            </div>
            <div v-if="domainDetail.events.unregistered" class="date ma-1 pa-1" color="gray-lighten-2">
              {{ new Date(domainDetail.events.transferred.timestamp).toLocaleString('en-US', options) }}
            </div>
          </v-col>
          <v-col cols="3">
            <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
            <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
            <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
            <div v-if="domainDetail.events.unregistered" class="font-weight-bold ma-1 pa-1">Registrar:</div>
          </v-col>
          <v-col cols="3">
            <div class="ma-1 pa-1">
              <a href="#" class="ma-1 pa-1 text-decoration-none text-info">
                {{ domainDetail.events.registered.registrar_handle }}
              </a>
            </div>
            <div class="ma-1 pa-1">
              <a href="#" class="ma-1 pa-1 text-decoration-none text-info">
                {{ domainDetail.events.updated.registrar_handle }}
              </a>
            </div>
            <div class="ma-1 pa-1">
              <a href="#" class="ma-1 pa-1 text-decoration-none text-info">
                {{ domainDetail.events.transferred.registrar_handle }}
              </a>
            </div>
            <div v-if="domainDetail.events.unregistered" class="date ma-1 pa-1" color="info">
              {{ domainDetail.events.unregistered.registrar_handle }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    domainDetail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
    };
  }
}
</script>
