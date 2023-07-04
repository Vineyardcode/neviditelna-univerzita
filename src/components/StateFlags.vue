<template>
  <div>
    <v-card class="ma-4" elevation="2">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">State flags:</v-card-title>
      <div class="d-flex pa-2">
        <v-row>
          <v-col cols="12" v-if="!verboseView">
            <div v-for="flag in filteredStateFlags.activeStateFlags" :key="flag.name" :class="{ 'text-green-lighten-1': flag.active, 'text-red-lighten-1': !flag.active }" class="ma-1 pa-1">
              <v-icon :color="flag.active ? 'green' : 'red'">{{ flag.active ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
              {{ flag.description }}
            </div>
          </v-col>
          <template v-else>
            <v-col cols="4">
              <div v-for="flag in filteredStateFlags.left" :key="flag.name" :class="{ 'text-green-lighten-1': flag.active, 'text-red-lighten-1': !flag.active }" class="ma-1 pa-1">
                <v-icon :color="flag.active ? 'green' : 'red'">{{ flag.active ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                {{ flag.description }}
              </div>
            </v-col>
            <v-col cols="4">
              <div v-for="flag in filteredStateFlags.middle" :key="flag.name" :class="{ 'text-green-lighten-1': flag.active, 'text-red-lighten-1': !flag.active }" class="ma-1 pa-1">
                <v-icon :color="flag.active ? 'green' : 'red'">{{ flag.active ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                {{ flag.description }}
              </div>
            </v-col>
            <v-col cols="4">
              <div v-for="flag in filteredStateFlags.right" :key="flag.name" :class="{ 'text-green-lighten-1': flag.active, 'text-red-lighten-1': !flag.active }" class="ma-1 pa-1">
                <v-icon :color="flag.active ? 'green' : 'red'">{{ flag.active ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                {{ flag.description }}
              </div>
            </v-col>
          </template>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    verboseView: {
      type: Boolean,
      required: true
    },
    filteredStateFlags: {
      type: Object,
      required: true
    }
  }
}
</script>
