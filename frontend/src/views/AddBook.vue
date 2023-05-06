<template lang="">
  <v-container>
    <v-alert
      border="left"
      close-text
      dismissible
      dark
      color="green accent-4"
      v-if="show"
    >
      Thêm thành công!
    </v-alert>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title
            class="justify-content-center pt-5 bg-primary white--text"
            color="text--darken-2"
          >
            <h3>Thêm Sản Phẩm</h3>
          </v-card-title>
          <v-form
            ref="form"
            @submit.prevent="submitForm"
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

            <v-file-input
              label="Chọn file"
              filled
              @change="selectFile"
              :rules="rules"
            >
            </v-file-input>
            <!-- <div class="btn"> -->
            <v-btn type="submit" class="bg-primary white--text float-right"
              >Thêm</v-btn
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
  methods: {
    selectFile(file) {
      this.img = file;
    },
    
    async submitForm() {
      const formData = new FormData();
      formData.append("img", this.img);
      formData.append("name", this.book.name);
      formData.append("author", this.book.author);
      formData.append("price", this.book.price);
      formData.append("desc", this.book.desc);
      console.log(this.img);
      if (this.$refs.form.validate()) {
        const res = await API.create(formData);
        if (res) {
          this.show = true;
          this.$refs.form.reset();
        }
      }
    },
  },
};
</script>
