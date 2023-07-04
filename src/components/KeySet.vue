<template>
  <div>
    <v-card class="ma-4" elevation="2" width="500">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3 font">KeySet:</v-card-title>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="4">
            <div class="font-weight-bold ma-1 pa-1">Handle:</div>
            <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
            <div class="font-weight-bold ma-1 pa-1 pt-2">DNS Keys:</div>
          </v-col>
          <v-col cols="8">
            <div class="ma-1 pa-1">
              <a href="#" class="text-decoration-none text-info">
                {{ domainDetail.keyset.handle }}
              </a>
            </div>
            <div class="ma-1 pa-1">
              <a href="#" class="text-decoration-none text-info">
                {{ domainDetail.keyset.registrar }}
              </a>
            </div>
            <div class="ma-1 pa-1" v-for="key in domainDetail.keyset.dns_keys" :key="key">{{ key }}</div>
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
