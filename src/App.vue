<template>
  <v-app>
    <!-- NAVBAR -->
    <NavBar :userName="userName" :menuItems="menuItems" />

    <!-- SIDEBAR -->
    <SideBar />

    <!-- MAIN -->
    <v-main class="bg-grey-lighten-3 d-flex justify-center">
      <v-container class="ma-1 pa-4">
        <v-card class="mt-4 ml-4 bg-transparent elevation-0">
          <v-card-title>{{ domainDetail ? domainDetail.fqdn : 'Loading...' }}</v-card-title>
          <div width="200">
            <v-switch color="info" v-model="verboseView" label="Verbose view" class="pl-3 d-inline-block"></v-switch>
          </div>
        </v-card>

        <v-row>
          <v-col>
            <!-- AUTH INFO -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <AuthInfo :domainDetail="domainDetail" :password="password" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>

            <!-- EVENTS -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <Events :domainDetail="domainDetail" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>

            <!-- STATE FLAGS -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <StateFlags :verboseView="verboseView" :domainDetail="domainDetail" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>
          </v-col>

          <v-col>
            <!-- OWNER -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <Owner :domainDetail="domainDetail" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>

            <!-- ADMINISTRATIVE CONTACTS -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <AdministrativeContacts :verboseView="verboseView" :domainDetail="domainDetail" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>

            <!-- NSSET -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <NSSet :domainDetail="domainDetail" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>

            <!-- KEYSET -->
            <ErrorBoundary>
              <template #default="{ error, resetError }">
                <template v-if="error">
                  <div>An error occurred: {{ error.message }}</div>
                  <button @click="resetError">Retry</button>
                </template>
                <template v-else>
                  <Suspense>
                    <template #default>
                      <KeySet :domainDetail="domainDetail" />
                    </template>
                    <template #fallback>Loading...</template>
                  </Suspense>
                </template>
              </template>
            </ErrorBoundary>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, Suspense } from 'vue';

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
  import ErrorBoundary from '@/components/ErrorBoundary.vue';

  const verboseView = ref(false);

  const menuItems = [
    { title: 'Menu item' },
    { title: 'Menu item' },
    { title: 'LogOut' },
  ];

  const password = 'Swordfish';
  const userName = 'Jan Musílek';
</script>
