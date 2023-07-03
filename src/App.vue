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
      <v-container>
        <v-card-title>{{ domainDetail.fqdn }}</v-card-title>

        <v-switch color="info" v-model="verboseView" class="max-width-" label="Verbose view"></v-switch>

        <!-- AUTH INFO -->
        <v-card class="ma-4">
          <v-card-text>
            <p class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">AuthInfo:</span>
              <v-btn color="info" class="" @click="showPass = !showPass">SHOW</v-btn>
            </p>
            <p class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">Expires at:</span>
              <span class="date ma-1 pa-1" color="gray-lighten-2">
                {{ new Date(domainDetail.expires_at).toLocaleString('en-US', options) }}
              </span>
            </p>
          </v-card-text>
        </v-card>

        <!-- EVENTS -->
        <div>
          <v-card class="ma-4 ">
            <div class="pa-2 bg-grey-lighten-2 font-weight-bold">Events:</div>
            <div class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">Create date: </span>
              <span class="date ma-1 pa-1" color="gray-lighten-2">
                {{ new Date(domainDetail.events.registered.timestamp).toLocaleString('en-US', options) }}
              </span>
              <span class="date ma-1 pa-1 me-auto font-weight-bold" color="gray-lighten-2">
                Registrar:
              </span>
              <a href="#" class="date ma-1 pa-1 " color="info">
                {{ domainDetail.events.registered.registrar_handle }}
              </a>
            </div>
            <div class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">Update date: </span>
              <span class="date ma-1 pa-1" color="gray-lighten-2">
                {{ new Date(domainDetail.events.updated.timestamp).toLocaleString('en-US', options) }}
              </span>
              <span class="date ma-1 pa-1 me-auto font-weight-bold" color="gray-lighten-2">
                Registrar:
              </span>
              <span class="date ma-1 pa-1" color="info">
                {{ domainDetail.events.updated.registrar_handle }}
              </span>
            </div>
            <div class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">Transfer date: </span>
              <span class="date ma-1 pa-1" color="gray-lighten-2">
                {{ new Date(domainDetail.events.transferred.timestamp).toLocaleString('en-US', options) }}
              </span>
              <span class="date ma-1 pa-1 me-auto font-weight-bold" color="gray-lighten-2">
                Registrar:
              </span>
              <span class="date ma-1 pa-1">
                {{ domainDetail.events.transferred.registrar_handle }}
              </span>
            </div>
            <div class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">Delete date: </span>
              <span class="date ma-1 pa-1" color="gray-lighten-2">
                {{

                }}
              </span>
            </div>
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
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-2 font-weight-bold">Owner:</div>
            <div class="d-flex">
              <div class="pa-2">
                Handle: {{ owner.handle }}
              </div>
              <div class="pa-2">
                <v-icon v-if="owner.organization" icon="mdi-eye" color="green"></v-icon>
                Organization: {{ owner.organization }}
              </div>
              <div class="pa-2">
                <v-icon v-if="owner.name" icon="mdi-eye" color="green"></v-icon>
                Name: {{ owner.name }}
              </div>
            </div>
          </v-card>
        </div>

        <!-- ADMINISTRATIVE CONTACTS -->
        <div v-if="!verboseView">
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-3 font-weight-bold">Administrative Contacts:</div>
            <div v-for="contact in administrativeContacts" :key="contact.handle" class="d-flex">
              <span class="ma-1 pa-1">{{ contact.name }}:</span>
              <span class="ma-1 pa-1">{{ contact.handle }}</span>
            </div>
          </v-card>
        </div>
        <div v-if="verboseView">
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-3 font-weight-bold">Administrative Contacts:</div>
            <div v-if="administrativeContacts.length >= 1" class="d-flex">
              <span class="ma-1 pa-1">Handle: {{ administrativeContacts[0].handle }}</span>
              <span class="ma-1 pa-1">
                <v-icon :color="administrativeContacts[0].publish.organization ? 'green' : 'red'">
                  {{ administrativeContacts[0].publish.organization ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Organization: {{ administrativeContacts[0].organization }}
              </span>
              <span class="ma-1 pa-1">
                <v-icon :color="administrativeContacts[0].publish.name ? 'green' : 'red'">
                  {{ administrativeContacts[0].publish.name ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Name: {{ administrativeContacts[0].name }}
              </span>
            </div>
          </v-card>
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-3 font-weight-bold">Administrative Contacts:</div>
            <div v-if="administrativeContacts.length >= 2" class="d-flex">
              <span class="ma-1 pa-1">Handle: {{ administrativeContacts[1].handle }}</span>
              <span class="ma-1 pa-1">
                <v-icon :color="administrativeContacts[1].publish.organization ? 'green' : 'red'">
                  {{ administrativeContacts[1].publish.organization ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Organization: {{ administrativeContacts[1].organization }}
              </span>
              <span class="ma-1 pa-1">
                <v-icon :color="administrativeContacts[1].publish.name ? 'green' : 'red'">
                  {{ administrativeContacts[1].publish.name ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                Name: {{ administrativeContacts[1].name }}
              </span>
            </div>
          </v-card>
        </div>

        <!-- NSS SET -->
        <div>
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-2 font-weight-bold">NSSet:</div>
            <div class="d-flex">
              <div>
                <span class="font-weight-bold">Handle:</span> {{ domainDetail.nsset.handle }}
              </div>
              <div>
                <span class="font-weight-bold">Registrar:</span> {{ domainDetail.nsset.registrar }}
              </div>
              <div v-for="dns in domainDetail.nsset.dns" :key="dns.name">
                <span class="font-weight-bold">DNS:</span>

                <span class="font-weight-bold flew-column">{{ dns.ip_address }}{{ dns.name }}</span>
              </div>
            </div>
          </v-card>
        </div>

        <!-- KEYSET -->
        <div>
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-2 font-weight-bold">KeySet:</div>
            <div class="d-flex">
              <div>
                <span class="font-weight-bold">Handle:</span> {{ domainDetail.keyset.handle }}
              </div>
              <div>
                <span class="font-weight-bold">Registrar:</span> {{ domainDetail.keyset.registrar }}
              </div>
              <div v-for="key in domainDetail.keyset.dns_keys" :key="key">
                <span class="font-weight-bold">DNS Key:</span> {{ key }}
              </div>
            </div>
          </v-card>
        </div>





      </v-container>

    <!-- PASSWORD WINDOW -->
    <v-fade-transition hide-on-leave>
      <v-card v-if="showPass" append-icon="$close" class="mx-auto" elevation="16" max-width="500" title="Hesla">
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="showPass = false"></v-btn>
        </template>
        <v-divider></v-divider>
        <div class="py-12 text-center">
          <div class="text-h6 font-weight-bold" >{{ domainDetail.keyset.dns_keys }}</div>
        </div>
        <v-divider></v-divider>
        <div class="pa-4 text-end">
          <v-btn class="text-none" color="medium-emphasis" min-width="48" rounded variant="outlined" @click="showPass = false">
            Close
          </v-btn>
        </div>
      </v-card>
    </v-fade-transition>


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
  const isOrganizationVisible = publish.organization;
  const isNameVisible = publish.name;

  return {
    handle,
    organization: isOrganizationVisible ? organization : '',
    name: isNameVisible ? name : ''
  };
});


const administrativeContacts = computed(() => {
  return domainDetail.administrative_contacts.map(contact => {
    const { handle, organization, name, publish } = contact;

    return { handle, organization, name, publish };
  });
});



</script>
