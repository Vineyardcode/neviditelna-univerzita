<template>
  <v-app id="inspire">
    <v-app-bar
        color="blue"
        dark
      >
        <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

        <v-toolbar-title>Ferda</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
        class="ma-2"
      >
        <v-icon
          start
          icon="mdi-account-circle"
        ></v-icon>
        {{userName}}
      </v-btn>



      </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-title>
                    List Item {{ n }}
                  </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey-lighten-4"
                >
                  <v-list-item-title>
                    Refresh
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
             MAIN aaa
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      userName: 'Jan Musílek',
    };
  },
  methods: {
    logout() {
      // odlogovat usera
    },
  },
};
</script>
