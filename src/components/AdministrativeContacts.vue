<template>
  <div>
    <v-card v-if="!verboseView" class="ma-4" elevation="2" width="500">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contacts:</v-card-title>
      <v-card-text class="pa-4">
        <div v-for="contact in administrativeContacts" :key="contact.handle" class="d-flex">
          <v-row>
            <v-col cols="4">
              <div class="font-weight-bold ma-1 pa-1">{{ contact.name }}:</div>
            </v-col>
            <v-col cols="6">
              <div class="ma-1 pa-1">{{ contact.handle }}</div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <div v-if="verboseView">
      <v-card class="ma-4" elevation="2" width="500">
        <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contact:</v-card-title>
        <v-card-text class="pa-4">
          <div>
            <v-row>
              <v-col cols="4">
                <div class="font-weight-bold ma-1 pa-1">
                  <v-icon icon="mdi-eye" color="transparent"></v-icon>
                  Handle:
                </div>
                <div class="font-weight-bold ma-1 pa-1">
                  <v-icon :color="administrativeContacts[0].publish.organization ? 'green' : 'red'">
                    {{ administrativeContacts[0].publish.organization ? 'mdi-eye' : 'mdi-eye-off' }}
                  </v-icon>
                  Organization:
                </div>
                <div class="font-weight-bold ma-1 pa-1">
                  <v-icon :color="administrativeContacts[0].publish.name ? 'green' : 'red'">
                    {{ administrativeContacts[0].publish.name ? 'mdi-eye' : 'mdi-eye-off' }}
                  </v-icon>
                  Name:
                </div>
              </v-col>
              <v-col cols="8">
                <div class="ma-1 pa-1">{{ administrativeContacts[0].handle }}</div>
                <div class="ma-1 pa-1">{{ administrativeContacts[0].organization }}</div>
                <div class="ma-1 pa-1">{{ administrativeContacts[0].name }}</div>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="ma-4" elevation="2" width="500">
        <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contact:</v-card-title>
        <v-card-text class="pa-4">
          <div>
            <v-row>
              <v-col cols="4">
                <div class="font-weight-bold ma-1 pa-1">
                  <v-icon icon="mdi-eye" color="transparent"></v-icon>
                  Handle:
                </div>
                <div class="font-weight-bold ma-1 pa-1">
                  <v-icon :color="administrativeContacts[1].publish.organization ? 'green' : 'red'">
                    {{ administrativeContacts[1].publish.organization ? 'mdi-eye' : 'mdi-eye-off' }}
                  </v-icon>
                  Organization:
                </div>
                <div class="font-weight-bold ma-1 pa-1">
                  <v-icon :color="administrativeContacts[1].publish.name ? 'green' : 'red'">
                    {{ administrativeContacts[1].publish.name ? 'mdi-eye' : 'mdi-eye-off' }}
                  </v-icon>
                  Name:
                </div>
              </v-col>
              <v-col cols="8">
                <div class="ma-1 pa-1">{{ administrativeContacts[1].handle }}</div>
                <div class="ma-1 pa-1">{{ administrativeContacts[1].organization }}</div>
                <div class="ma-1 pa-1">{{ administrativeContacts[1].name }}</div>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    verboseView: {
      type: Boolean,
      required: true
    },
    administrativeContacts: {
      type: Array,
      required: true
    }
  }
}
</script>
