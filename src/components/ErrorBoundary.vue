<template>
  <v-container v-if="hasError">
    <v-row justify-center align-center>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card outlined class="error-card">
          <v-card-title class="error-title">Error</v-card-title>
          <v-card-text>
            <div>An error occurred: {{ error.message }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="resetError">Retry</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      hasError: false,
    };
  },
  errorCaptured(error) {
    this.error = error;
    this.hasError = true;
  },
  methods: {
    resetError() {
      this.error = null;
      this.hasError = false;
    },
  },
};
</script>
