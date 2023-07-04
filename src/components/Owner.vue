<template>
  <div>
    <v-card class="ma-4" elevation="2" width="500">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Owner:</v-card-title>
      <v-card-text class="pa-4">
        <div>
          <v-row>
            <v-col cols="4">
              <div class="font-weight-bold ma-1 pa-1">
                <v-icon icon="mdi-eye" color="transparent"></v-icon>
                Handle:
              </div>
              <div class="font-weight-bold ma-1 pa-1">
                <v-icon :color="owner.publish.organization ? 'green' : 'red'">
                  {{ owner.publish.organization ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Organization:
              </div>
              <div class="font-weight-bold ma-1 pa-1">
                <v-icon :color="owner.publish.name ? 'green' : 'red'">
                  {{ owner.publish.name ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Name:
              </div>
            </v-col>
            <v-col cols="8">
              <div class="ma-1 pa-1">{{ owner.handle }}</div>
              <div class="ma-1 pa-1">{{ owner.organization }}</div>
              <div class="ma-1 pa-1">{{ owner.name }}</div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    owner: {
      type: Object,
      required: true
    }
  }
}
</script>
