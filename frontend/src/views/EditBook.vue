<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title
            class="justify-content-center pt-5 bg-primary white--text"
            color="text--darken-2"
          >
            <h3>Cập nhật sách</h3>
          </v-card-title>
          <v-form
            ref="form"
            @submit.prevent="editForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              v-model="book.name"
              label="Tên sách"
              filled
              :rules="rules"
            >
            </v-text-field>
            <v-text-field
              v-model="book.author"
              label="Tác giả"
              filled
              :rules="rules"
            >
            </v-text-field>

           

            <v-text-field
            type="number"
              :value="myValue"
              @input="myValue = $event !== '' ? $event : null"
              v-model="book.price"
              label="Giá"
              filled
              :rules="rules"
            >
            </v-text-field>

            <v-textarea
              v-model="book.desc"
              filled
              label="Chi tiết"
            ></v-textarea>
            <v-img :src="`/${book.img}`" width="120px"></v-img>

            <v-file-input filled label="Chọn file" @change="selectFile">
            </v-file-input>

            <v-btn type="submit" class="bg-primary white--text float-right"
              >Cập nhật</v-btn
            >
            <!-- </div> -->
            <div class="mb-10"></div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      rules: [(value) => !!value || "this field is required"],
      book: {
        name: "",
        author: "",
        desc: "",
        price: "",
        img: "",
      },
      img: "",
      show: false,
    };
  },
  async created() {
    const response = await API.oneBook(this.$route.params.id);
    this.book = response;
    console.log(response);
  },
  methods: {
    selectFile(file) {
      this.img = file;
    },

    async editForm() {
      const formData = new FormData();

      formData.append("img", this.img);
      formData.append("name", this.book.name);
      formData.append("author", this.book.author);
      formData.append("price", this.book.price);
      formData.append("desc", this.book.desc);
      formData.append("old_img", this.book.img);
      // console.log(this.book);
      if (this.$refs.form.validate()) {
        const response = await API.update(this.$route.params.id, formData);
        this.$router.push({
          name: "home",
          params: { message: "Cập nhật thành công!" },
        });
      }
    },
  },
};
</script>
