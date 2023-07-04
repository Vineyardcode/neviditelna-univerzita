<template>
  <v-navigation-drawer permanent location="left">
    <v-col>
      <v-sheet>
        <v-list>
          <v-list-item-title class="font-weight-bold">Applications</v-list-item-title>
          <v-list-item v-for="n in 5" :key="n" link :active-class="'yellow--text text--darken-2'">
            <div class="d-flex align-center">
              <v-icon>mdi-earth</v-icon>
              <v-list-item-subtitle class="ml-5">Application {{ n }}</v-list-item-subtitle>
            </div>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar'
};
</script>
