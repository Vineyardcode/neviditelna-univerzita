<template>
  <v-app id="inspire">
    <v-app-bar
        color="info"

      >
        <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

        <v-toolbar-title>Ferda</v-toolbar-title>

        <v-spacer></v-spacer>

    <v-btn color="white" >
      <v-icon
          start
          icon="mdi-account-circle"
        ></v-icon>
      {{userName}}

      <v-menu activator="parent">
          <v-list>
            <v-list-item title prepend-icon="mdi-account-circle" subtitle="admin">
                <v-list-item-title>{{ userName }}</v-list-item-title>
              </v-list-item>
          </v-list>
          <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-btn>


    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-navigation-drawer
        permanent
        location="left"
      >
      <v-col>
        <v-sheet >
          <v-list >
            <v-list-item
              v-for="n in 5"
              :key="n"
              link
              color="yellow-darken-2"
            >
              <v-list-item-title>
                List Item {{ n }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-navigation-drawer>

        <v-container >
          <v-col >
            <v-switch
              color="info"
              :model-value="true"
              label="Verbose view"
            ></v-switch>


            <v-card class="mx-auto" max-width="400">
              <v-toolbar>
                <v-card-title>Events: </v-card-title>
              </v-toolbar>
              <v-card-text>
                <div>Whitehaven Beach</div>
                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-container>

    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'LogOut' },
      ],
      drawer: true,
      userName: 'Jan Musílek',
    }),
  methods: {
    logout() {
      // odlogovat usera
    },
  },
};
</script>
