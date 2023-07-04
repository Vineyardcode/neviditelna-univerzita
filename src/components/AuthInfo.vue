<template>
  <div>
    <v-card class="ma-4" elevation="2" >
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <div class="ma-2 pa-2 font-weight-bold">AuthInfo:</div>
            <div class="ma-2 pa-2 font-weight-bold">Expires at:</div>
          </v-col>
          <v-col cols="8">
            <div class="d-flex align-center">
              <span class="ma-1 pa-1 me-auto">
                <v-btn color="info" @click="showPass = !showPass">
                  {{ showPass ? "secret password: " + password : 'SHOW' }}
                </v-btn>
              </span>
            </div>
            <div class="d-flex">
              <span class="ma-1 pa-1 me-auto">
                {{ new Date(domainDetail.expires_at).toLocaleString('en-US', options) }}
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    domainDetail: {
      type: Object,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const showPass = ref(false);

    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    return {
      showPass,
      options
    };
  }
};
</script>
