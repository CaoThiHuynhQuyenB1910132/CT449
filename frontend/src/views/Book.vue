<template>
    <v-container>
        <v-row>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img :src="`/${book.img}`"></v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from "../api";
export default {
  name: "Details",
  data() {
    return {
      books: [],
    };
  },
//   async created() {
//     const response = await
//     this.books = await API.detail();
//   },
};
</script>