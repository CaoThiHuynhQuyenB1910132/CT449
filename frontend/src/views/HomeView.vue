<template>
  <v-container>
    <v-alert
      border="left"
      close-text
      dismissible
      dark
      color="green accent-4"
      v-if="this.$route.params.message"
    >
      {{ this.$route.params.message }}
    </v-alert>

    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      placeholder="Tìm kiếm"
      single-line
      hide-details
    >
    </v-text-field>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th class="text-left">Price</th>
            <th class="text-left">Description</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id">
            <td>
              <v-img height="50px" width="50px" :src="`/${book.img}`"></v-img>
            </td>
            <td>{{ book.name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.desc }}</td>

            <td>
              <v-btn text :to="{ name: 'edit', params: { id: book._id } }">
                <v-icon aria-hidden="false"> mdi-pencil-box </v-icon>
              </v-btn>

              <v-btn text @click="remove(book._id)"
                ><v-icon aria-hidden="false" @click="reloadPage">
                  mdi-delete</v-icon
                ></v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  name: "home",
  data() {
    return {
      search: "",
      books: {},
    };
  },

  async created() {
    this.books = await API.allBook();
  },

  methods: {
    async remove(id) {
      console.log(id);
      const response = await API.delete(id);
      this.show = true;
    },
    reloadPage() {
      location.reload();
    },
    search(){}
  },

  computed: {
    filtered() {
      
      return this.items.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
          || item.category.toLowerCase().includes(this.search.toLowerCase());
      });
   
    }
  
  },

  
};
</script>
