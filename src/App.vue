<template>
  <v-app>

    <!-- NAVBAR -->
    <v-app-bar color="info">
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>
      <v-toolbar-title>Ferda</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white">
        <v-icon start icon="mdi-account-circle"></v-icon>
        {{ userName }}
        <v-menu activator="parent">
          <v-list>
            <v-list-item title prepend-icon="mdi-account-circle" subtitle="admin">
              <v-list-item-title>{{ userName }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-app-bar>

    <!-- SIDEBAR -->
    <v-navigation-drawer permanent location="left">
      <v-col>
        <v-sheet>
          <v-list>
            <v-list-item v-for="n in 5" :key="n" link color="yellow darken-2">
              <v-list-item-title>List Item {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-navigation-drawer>

    <!-- MAIN -->
    <v-main class="bg-grey-lighten-3">

      <v-container >
        <v-card-title>{{ domainDetail.fqdn }}</v-card-title>

        <v-switch color="info" v-model="verboseView" class="max-width-" label="Verbose view"></v-switch>

        <!-- AUTH INFO -->
        <div>
          <v-card class="ma-4">
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <div class="ma-2 pa-2 font-weight-bold">AuthInfo:</div>
                  <div class="ma-2 pa-2 font-weight-bold">Expires at:</div>
                </v-col>
                <v-col cols="8">
                  <div class="d-flex align-center">
                    <span class="ma-1 pa-1 me-auto">
                      <v-btn color="info" class="" @click="showPass = !showPass">SHOW</v-btn>
                    </span>
                  </div>
                  <div class="d-flex">
                    <span class="ma-1 pa-1 me-auto">
                      {{ new Date(domainDetail.expires_at).toLocaleString('en-US', options) }}
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <!-- EVENTS -->
        <div>
          <v-card class="ma-4" elevation="2">
            <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Events:</v-card-title>
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="3">
                  <div class="font-weight-bold ma-1 pa-1">Create date:</div>
                  <div class="font-weight-bold ma-1 pa-1">Update date:</div>
                  <div class="font-weight-bold ma-1 pa-1">Transfer date:</div>
                  <div class="font-weight-bold ma-1 pa-1">Delete date:</div>
                </v-col>
                <v-col cols="3">
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
                    {{ domainDetail.events.transferred.timestamp }}
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
                  <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
                  <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
                  <div v-if="domainDetail.events.unregistered" class="font-weight-bold ma-1 pa-1">Registrar:</div>
                </v-col>
                <v-col cols="3">
                  <div class="date ma-1 pa-1" color="info">
                    {{ domainDetail.events.registered.registrar_handle }}
                  </div>
                  <div class="date ma-1 pa-1" color="info">
                    {{ domainDetail.events.updated.registrar_handle }}
                  </div>
                  <div class="date ma-1 pa-1" color="info">
                    {{ domainDetail.events.transferred.registrar_handle }}
                  </div>
                  <div v-if="domainDetail.events.unregistered" class="date ma-1 pa-1" color="info">
                    {{ domainDetail.events.unregistered.registrar_handle }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <!-- STATE FLAGS -->
        <div>
          <v-card class="ma-4 ">
            <div class="pa-2 bg-grey-lighten-2 font-weight-bold">State flags:</div>
            <div class="d-flex">
              <ul>
                <li v-for="flag in filteredStateFlags" :key="flag.name" :class="{ 'text-green-lighten-1': flag.active, 'text-red-lighten-1': !flag.active }" class="ma-1">
                  <v-icon :color="flag.active ? 'green' : 'red'">{{ flag.active ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                  {{ flag.description }}
                </li>
              </ul>
            </div>
          </v-card>
        </div>

        <!-- OWNER -->
        <div>
          <v-card class="ma-4" elevation="2">
            <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Owner:</v-card-title>
            <v-card-text class="pa-4">
              <div>
                <v-row>
                  <v-col cols="4">
                    <div class="font-weight-bold ma-1 pa-1">
                      <v-icon icon="mdi-eye" color="transparent">
                      </v-icon>
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

        <!-- ADMINISTRATIVE CONTACTS -->
        <div>
          <v-card v-if="!verboseView" class="ma-4" elevation="2">
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
        </div>
        <div v-if="verboseView">
          <v-card class="ma-4" elevation="2">
            <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contacts:</v-card-title>
            <v-card-text class="pa-4">
              <div>
                <v-row>
                  <v-col cols="4">
                    <div class="font-weight-bold ma-1 pa-1">
                      <v-icon icon="mdi-eye" color="transparent">
                      </v-icon>
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
          <v-card class="ma-4" elevation="2">
            <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3">Administrative Contacts:</v-card-title>
            <v-card-text class="pa-4">
              <div>
                <v-row>
                  <v-col cols="4">
                    <div class="font-weight-bold ma-1 pa-1">
                      <v-icon icon="mdi-eye" color="transparent">
                      </v-icon>
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

        <!-- NSS SET -->
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
                  <div class="ma-1 pa-1">{{ domainDetail.nsset.handle }}</div>
                  <div class="ma-1 pa-1">{{ domainDetail.nsset.registrar }}</div>
                  <div v-for="dns in domainDetail.nsset.dns" :key="dns.name">
                    <div class="d-flex">
                      <div class="font-weight-bold pl-2">{{ dns.ip_address }}</div>
                      <div class="font-weight-bold pl-2">{{ dns.name }}</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <!-- KEYSET -->
        <div>
          <v-card class="ma-4" elevation="2">
            <v-card-title class="pa-2 font-weight-bold bg-grey-lighten-3 font">KeySet:</v-card-title>
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="4">
                  <div class="font-weight-bold ma-1 pa-1">Handle:</div>
                  <div class="font-weight-bold ma-1 pa-1">Registrar:</div>
                  <div class="font-weight-bold ma-1 pa-1 pt-2">DNS Keys:</div>
                </v-col>
                <v-col cols="8">
                  <div class="ma-1 pa-1">{{ domainDetail.keyset.handle }}</div>
                  <div class="ma-1 pa-1">{{ domainDetail.keyset.registrar }}</div>
                  <div class="ma-1 pa-1" v-for="key in domainDetail.keyset.dns_keys" :key="key">{{ key }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <!-- PASSWORD WINDOW -->
        <div>
          <v-dialog v-model="showPass" >
            <v-card class="mx-auto custom-card" elevation="16">
              <v-toolbar dense color="primary" class="mb-4">
                <v-btn icon color="grey" class="mr-0 custom-close-btn" @click="showPass = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-h6 font-weight-bold">
                  Hesla
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text class="py-6 text-center custom-card-text">
                <div class="text-h6 font-weight-bold">{{ password }}</div>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn color="primary" text @click="showPass = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed} from 'vue';
import domainDetail from './data/domain-detail.json';

const showPass = ref(false);
const verboseView = ref(false);

const menuItems = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'LogOut' },
];

const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

const password = "Swordfish"
const userName = 'Jan Musílek';

const filteredStateFlags = computed(() => {
  if (verboseView.value) {
    return domainDetail.state_flags.flags
  } else {
    return domainDetail.state_flags.flags.filter(flag => flag.active);
  }
});

const owner = computed(() => {
  const { organization, name, publish, handle } = domainDetail.owner;


  return {
    handle,
    name,
    organization,
    publish
  };
});


const administrativeContacts = computed(() => {
  return domainDetail.administrative_contacts.map(contact => {
    const { handle, organization, name, publish } = contact;

    return { handle, organization, name, publish };
  });
});



</script>
