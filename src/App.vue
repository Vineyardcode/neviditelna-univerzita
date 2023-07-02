<template>
  <v-app>
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

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-card-title>{{ domainDetail.fqdn }}</v-card-title>

        <v-switch color="info" v-model="verboseView" class="max-width-" label="Verbose view"></v-switch>

        <v-card class="ma-4">
          <v-card-text>
            <p class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">AuthInfo:</span>
              <v-btn color="info" class="" @click="showPass = !showPass">SHOW</v-btn>
            </p>
            <p class="d-flex">
              <span class="ma-1 pa-1 me-auto font-weight-bold">Expires at:</span>
              <span class="date ma-1 pa-1" color="gray-lighten-3">
                {{ new Date(domainDetail.expires_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                }) }}
              </span>
            </p>
          </v-card-text>
        </v-card>

        <div>
          <v-card class="ma-4">
            <div class="pa-2 bg-grey-lighten-3 font-weight-bold">Events:</div>
            <div>
              <div class="pa-2 font-weight-bold">{{ derivedData.events }}</div>
            </div>
          </v-card>
        </div>




      </v-container>

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

const userName = 'Jan Musílek';

const derivedData = computed(() => {
  const data = {};


  data.fqdn = domainDetail.fqdn;


  data.dnsServers = domainDetail.nsset.dns.map((dns) => ({
    name: dns.name,
    ipAddress: dns.ip_address
  }));


  data.dnsKeys = domainDetail.keyset.dns_keys;


  data.owner = {
    handle: domainDetail.owner.handle,
    organization: domainDetail.owner.organization,
    name: domainDetail.owner.name
  };


  data.adminContacts = domainDetail.administrative_contacts.map((contact) => ({
    handle: contact.handle,
    organization: contact.organization,
    name: contact.name
  }));


  data.expiresAt = new Date(domainDetail.expires_at);


  data.events = {};
  for (const eventKey in domainDetail.events) {
    const event = domainDetail.events[eventKey];
    if (event) {
      data.events[eventKey] = {
        timestamp: new Date(event.timestamp),
        registrarHandle: event.registrar_handle
      };
    }
  }


  data.stateFlags = domainDetail.state_flags.flags.map((flag) => ({
    name: flag.name,
    active: flag.active,
    description: flag.description
  }));

  return data;
});
</script>
