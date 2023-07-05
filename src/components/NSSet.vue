<template>
  <div>
    <v-card class="ma-4" elevation="2">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">NSSet:</v-card-title>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="4">
            <div class="font-weight-bold ma-1 pa-1">Handle:</div>
            <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
            <div class="font-weight-bold ma-1 pa-1 pt-2">DNS:</div>
          </v-col>
          <v-col cols="8">
            <div class="ma-1 pa-1">
              <a href="#" class="text-decoration-none text-info">
                {{ domainDetail.nsset.handle }}
              </a>
            </div>
            <div class="ma-1 pa-1">
              <a href="#" class="text-decoration-none text-info">
                {{ domainDetail.nsset.registrar }}
              </a>
            </div>
            <div v-for="dns in domainDetail.nsset.dns" :key="dns.name">
              <div class="d-flex">
                <div class="pl-2">{{ dns.ip_address }}</div>
                <div class="pl-2">{{ dns.name }}</div>
              </div>
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
  }
}
</script>
