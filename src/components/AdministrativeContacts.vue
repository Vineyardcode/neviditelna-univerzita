<template>
  <div>
    <v-card v-if="!verboseView" class="ma-4" elevation="2">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contacts:</v-card-title>
      <v-card-text class="pa-4">
        <div v-for="contact in administrativeContacts" :key="contact.handle" class="d-flex">
          <v-row>
            <v-col cols="4">
              <div class="font-weight-bold ma-1 pa-1">
                {{ contact.name }}:
              </div>
            </v-col>
            <v-col cols="6">
              <div class="ma-1 pa-1">
                <a href="#" class="ma-1 pa-1 text-decoration-none text-info">
                  {{ contact.handle }}
                </a>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <div v-if="verboseView">
    <v-card v-for="(contact, index) in administrativeContacts" :key="index" class="ma-4" elevation="2">
      <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contact:</v-card-title>
      <v-card-text class="pa-4">
        <div >
          <v-row>
            <v-col cols="4">
              <div class="font-weight-bold ma-1 pa-1">
                <v-icon icon="mdi-eye" color="transparent"></v-icon>
                Handle:
              </div>
              <div class="font-weight-bold ma-1 pa-1">
                <v-icon :color="contact.publish.organization ? 'green' : 'red'">
                  {{ contact.publish.organization ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Organization:
              </div>
              <div class="font-weight-bold ma-1 pa-1">
                <v-icon :color="contact.publish.name ? 'green' : 'red'">
                  {{ contact.publish.name ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Name:
              </div>
            </v-col>
            <v-col cols="8">
              <div class="ma-1 pa-1">
              <a href="#" class="text-decoration-none text-info">
                {{ contact.handle }}
              </a>
              </div>
              <div class="ma-1 pa-1">{{ contact.organization }}</div>
              <div class="ma-1 pa-1">{{ contact.name }}</div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    verboseView: {
      type: Boolean,
      required: true
    },
    domainDetail: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const administrativeContacts = computed(() => {
      return props.domainDetail.administrative_contacts.map(contact => {
        const { handle, organization, name, publish } = contact;
        return { handle, organization, name, publish };
      });
    });

    return {
      administrativeContacts
    };
  }
};
</script>
