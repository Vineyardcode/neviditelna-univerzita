<template>
  <v-app-bar color="info">
    <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>
    <v-toolbar-title>Ferda</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white">
      <v-icon start icon="mdi-account-circle"></v-icon>
      {{ userName }}
      <v-menu activator="parent">
        <v-list>
          <v-list-item title prepend-icon="mdi-account-circle">
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>admin</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index">
            <v-list-item-title>
              {{ item.title }}
              <v-icon v-if="index === menuItems.length - 1" class="pl-3">mdi-logout</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    userName: {
      type: String,
      required: true
    },
    menuItems: {
      type: Array,
      required: true
    }
  }
};
</script>
