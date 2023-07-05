<template>
  <v-app>


    <!-- NAVBAR -->
    <NavBar :userName="userName" :menuItems="menuItems"/>


    <!-- SIDEBAR -->
    <SideBar />


    <!-- MAIN -->
    <v-main class="bg-grey-lighten-3 d-flex justify-center" >


      <v-container class="ma-1 pa-4" >


          <v-card class="ma-1 bg-transparent elevation-0">
            <v-card-title>{{ domainDetail.fqdn }}</v-card-title>
            <div width="200">
            <v-switch color="info" v-model="verboseView" label="Verbose view" class="pl-3 d-inline-block"></v-switch>
            </div>
          </v-card>


        <v-row>
          <v-col>

            <!-- AUTH INFO -->
            <AuthInfo :domainDetail="domainDetail" :password="password"/>


            <!-- EVENTS -->
            <Events :domainDetail="domainDetail" />


            <!-- STATE FLAGS -->
            <StateFlags :verboseView="verboseView" :domainDetail="domainDetail" />

          </v-col>

          <v-col>

            <!-- OWNER -->
            <Owner :domainDetail="domainDetail" />


            <!-- ADMINISTRATIVE CONTACTS -->
            <AdministrativeContacts :verboseView="verboseView" :domainDetail="domainDetail" />


            <!-- NSS SET -->
            <NSSet :domainDetail="domainDetail" />


            <!-- KEYSET -->
            <KeySet :domainDetail="domainDetail" />

          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';

  // data
  import domainDetail from './data/domain-detail.json';

  // components
  import NavBar from '@/components/NavBar.vue';
  import SideBar from '@/components/SideBar.vue';
  import AuthInfo from '@/components/AuthInfo.vue';
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


</script>
