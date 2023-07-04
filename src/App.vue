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
    <v-main class="bg-grey-lighten-3 d-flex justify-center" >
      <v-container class="ma-1 pa-1 d-flex flex-column" >

          <v-card class="ma-2 bg-transparent elevation-0" width="300">
            <v-card-title>{{ domainDetail.fqdn }}</v-card-title>
            <v-switch color="info" v-model="verboseView" label="Verbose view" class="pl-3"></v-switch>
          </v-card>

            <!-- AUTH INFO -->
            <AuthInfo :domainDetail="domainDetail" :password="password"/>


            <!-- EVENTS -->
            <Events :domainDetail="domainDetail" />


            <!-- STATE FLAGS -->
            <StateFlags :verboseView="verboseView" :domainDetail="domainDetail" />


            <!-- OWNER -->
            <Owner :owner="owner" />


            <!-- ADMINISTRATIVE CONTACTS -->
            <AdministrativeContacts :verboseView="verboseView" :domainDetail="domainDetail" />


            <!-- NSS SET -->
            <NSSet :domainDetail="domainDetail" />


            <!-- KEYSET -->
            <KeySet :domainDetail="domainDetail" />


      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, computed } from 'vue';

  // data
  import domainDetail from './data/domain-detail.json';

  // components
  import AuthInfo from './components/AuthInfo.vue'
  import Events from '@/components/Events.vue';
  import StateFlags from '@/components/StateFlags.vue';
  import Owner from '@/components/Owner.vue';
  import AdministrativeContacts from '@/components/AdministrativeContacts.vue';
  import NSSet from '@/components/NSSet.vue';
  import KeySet from '@/components/KeySet.vue';

  const verboseView = ref(false);

  const menuItems = [
    { title: 'Menu item' },
    { title: 'Menu item' },
    { title: 'LogOut' },
  ];

  const password = 'Swordfish';
  const userName = 'Jan Musílek';

  const owner = computed(() => {
    const { organization, name, publish, handle } = domainDetail.owner;

    return {
      handle,
      name,
      organization,
      publish
    };
  });

</script>
