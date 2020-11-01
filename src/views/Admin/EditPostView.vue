<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-xs>
      <h1 class="my-5" v-if="editView">Editovat příspěvek</h1>
      <h1 class="my-5" v-else>Vytvořit příspěvek</h1>
      <v-divider></v-divider>
      <h2 class="mt-5 nadpis">Název</h2>
      <v-text-field :rules="textRules" required label="Nadpis" v-model="post.nadpis"></v-text-field>
      <!-- <v-btn color="success" @click="getSelectedOddily">text</v-btn> -->

      <h2 class="mt-2 nadpis">oddíl(y)</h2>
      <v-chip-group class="mb-4" v-model="post.selectedIndexes" column multiple>
        <v-chip          
          filter
          outlined
          v-for="(oddil, index) in oddily"
          :key="index"          
        >{{oddil.nazev}}</v-chip>
      </v-chip-group>
      <v-alert dense v-show="showHintLbl" type="error">Zvolte alespoň jeden oddíl</v-alert>

      <h2 class="mt-5 nadpis">Náhledový obrázek</h2>
      <v-file-input show-size accept="image/*" v-model="post.thumbnail" label="Náhledový obrázek"></v-file-input>

      <h2 class="mt-0 nadpis">Text</h2>
      <tiptap-vuetify v-model="post.content" :extensions="extensions" />

      <template v-if="editView">
        <h2 class="mt-5 nadpis">Nahrát nové přílohy</h2>
        <v-file-input show-size multiple accept="*" v-model="post.newfiles" label="Soubory"></v-file-input>
      </template>

      <template v-else>
        <h2 class="mt-5 nadpis">Přílohy</h2>
        <v-file-input show-size multiple accept="*" v-model="post.files" label="Soubory"></v-file-input>
      </template>

      <FilesToDownload v-if="post.files != null" :priloha="post.files" :showDeleteBtn="true" />

      <v-divider class="my-4"></v-divider>
      <v-alert
        dense
        v-if="editView"
        border="top"
        colored-border
        type="info"
        elevation="2"
      >Emaily již byly odeslány a po uložení nebudou poslány znovu.</v-alert>
      <v-alert
        dense
        v-else
        large
        border="top"
        colored-border
        type="info"
        elevation="2"
      >Po uložení příspěvku se odešlou emaily rodičům.</v-alert>
      <v-btn :loading="loading" :disabled="!valid" color="#174085" class="white--text" @click="publish">Uložit</v-btn>
      <v-btn color="error" v-if="editView" class="white--text mx-5" @click="deletePost">Smazat</v-btn>
    </v-container>
    <Confirm ref="confirm"></Confirm>
  </v-form>
</template>

<script>
import axios from "axios";
import FilesToDownload from "@/components/Aktuality/FilesToDownload";
import Confirm from "@/components/Confirm";
import router from "@/router";

import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from "tiptap-vuetify";

export default {
  name: "EditPostView",

  data: () => ({
    loading:false,
    post: {
      nadpis: "",
      files: null,
      file_IDs: [],
      thumbnail: null,
      thumbnail_ID: "",
      original: {
        files: [],
        thumbnail: "",
      },
      selectedOddily: [],
      selectedIndexes: [],
      content: "",
      md: "",
    },
    oddily: [],
    showHintLbl: false,
    editView: false,

    valid: true,
    textRules: [
      (v) => {
        if (v) {
          // eslint-disable-next-line
          return (
            !/[.]/g.test(v) ||
            "Nadpis nesmí obsahovat tečku"
          );
        } else {
          return "Toto pole je povinné";
        }
      },
    ],

    extensions: [
      [
        Heading,
        {
          // Options that fall into the tiptap's extension
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Bold,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      Image,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak, // line break on Shift + Ctrl + Enter
    ],
  }),

  methods: {
    publish() {
      console.log("------------------------------- publishing ----------------------------------------------");
      this.getSelectedOddily(); //this.post.selectedoddily gets updated
      if (this.validate()) {
        if (this.editView) {
          //editing existing post
          console.log("trying to update post", this.post);
          this.loading = true;
          this.convertToMarkDown(); //this.post.md gets updated
          this.uploadNewFiles().then(() => {
            axios
              .put("/aktualitas/" + this.post._id, this.getDataObject)
              .then((result) => {
                this.loading = false;
                router.push("/aktuality/post/" + result.data.slug);
                console.log("put update successfull", result);
              })
              .catch((e) => {
                this.loading = false;
                console.log("put update FAILURE", e);
              });
          });
        } else {
          //creating new post
          console.log("trying to publish post");
          this.loading = true;
          this.convertToMarkDown(); //this.post.md gets updated
          this.uploadFiles() //this.post.file_IDs gets updated
            .then(() => {
              axios
                .post("/aktualitas", this.getDataObject)
                .then((result) => {
                  this.loading = false;
                  console.log(result);
                  router.push("/aktuality/post/" + result.data.slug);
                })
                .catch((e) => {
                  this.loading = false;
                  console.log("post FAILURE", e);
                });
            });
        }
      }
    },

    hasSpecialCharacters(str) {
      // eslint-disable-next-line
      return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
    },

    validate() {
      //validate nadpis
      const formValidation = this.$refs.form.validate();
      //validate oddily
      const oddilValidation = this.post.selectedOddily.length > 0;
      if (!oddilValidation) {
        this.showHintLbl = true;
      }
      if (oddilValidation && formValidation) {
        return true;
      } else return false;
    },

    // selectOddil() {
      // console.log("selecting oddil:", this.post.selectedIndexes);
      // this.showHintLbl = false;
    // },

    deletePost() {
      this.$refs.confirm
        .open(
          "Odstranit",
          "Opravdu chcete smazat tento příspěvek? Všechny jeho soubory budou také smazány",
          { color: "error" }
        )
        .then((confirm) => {
          if (confirm) {
            if (this.post.files) {
              this.post.files.forEach((file) => {
                this.$store.dispatch("deleteFile", file.id);
              });
            }
            if (this.post.thumbnail) {
              this.$store.dispatch("deleteFile", this.post.thumbnail.id);
            }
            this.$store.dispatch("deletePost", this.post._id).then(() => {
              router.push("/aktuality");
            });
          }
        });
    },

    uploadNewFiles() {
      return new Promise((resolve) => {
        let promises = [];
        //resolve new thumbnail
        if (this.post.thumbnail == undefined) {
          //deleting thumbnail
          if (this.post.original.thumbnail != "") {
            this.$store.dispatch("deleteFile", this.post.original.thumbnail.id);
            this.post.thumbnail_ID = null;
          }
        } else {
          if (this.post.original.thumbnail != "") {
            //there was previously already a thumbnail
            if (this.post.original.thumbnail.id != this.post.thumbnail.id) {
              //only if new thumbnail is different from previous -> delete and upload new
              this.$store.dispatch(
                "deleteFile",
                this.post.original.thumbnail.id
              );
              const promise = this.uploadFile(this.post.thumbnail).then(
                (res) => {
                  this.post.thumbnail_ID = res.id;
                }
              );
              promises.push(promise);
            }
          } else {
            //uploading new thumbnail
            const promise = this.uploadFile(this.post.thumbnail).then((res) => {
              this.post.thumbnail_ID = res.id;
            });
            promises.push(promise);
          }
        }

        //upload new files
        if (this.post.newfiles) {
          this.post.newfiles.forEach((file) => {
            console.log("trying to upload new file", file);
            const promise = this.uploadFile(file).then((res) => {
              console.log("res - new file uploaded", res);
              this.post.file_IDs.push(res.id);
            });
            promises.push(promise);
          });
        }

        Promise.all(promises).then(() => {
          console.log("all new files uploaded successfully");
          console.log(this.post);
          resolve();
        });
      });
    },

    uploadFiles() {
      return new Promise((resolve) => {
        let promises = [];

        //thumbnail
        if (this.post.thumbnail != null) {
          console.log("publishing thumbnail", this.post.thumbnail);
          // let formData = new FormData();
          // formData.append("files", this.post.thumbnail);
          const promise = this.uploadFile(this.post.thumbnail).then((res) => {
            console.log("res", res);
            this.post.thumbnail_ID = res.id;
            console.log("thumbnail_ID", this.thumbnail_ID);
          });
          promises.push(promise);
        }

        // attachments
        if (this.post.files != null) {
          this.post.files.forEach((element) => {
            // let formData = new FormData();
            // formData.append("files", element);
            const promise = this.uploadFile(element).then((res) => {
              console.log("res", res);
              this.post.file_IDs.push(res.id);
            });
            promises.push(promise);
          });
        }

        Promise.all(promises).then(() => {
          console.log("all successfull");
          console.log(this.post);
          resolve();
        });
      });
    },

    uploadFile(file) {
      let formData = new FormData();
      formData.append("files", file);
      return new Promise((resolve, reject) => {
        axios
          .post("/upload", formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((response) => {
            console.log("file upload successfull", response);
            // this.post.file_IDs.push(response.data[0].id);
            resolve(response.data[0]);
            // this.file_id = response.data[0]._id;
            // console.log('editedPerson',this.editedPerson);
            // console.log('file_id',this.file_id);
          })
          .catch(function (e) {
            console.log("upload image FAILURE!!");
            reject("image reject");
            console.log(e);
          });
      });
    },

    convertToMarkDown() {
      var TurndownService = require("turndown").default;
      var turndownService = new TurndownService();
      this.post.md = turndownService.turndown(this.post.content);
    },

    getSelectedOddily() {
      console.log("------------------------");
      console.log("Oddily:", this.oddily.map(a => a.nazev));
      console.log("selectedIndexes: ", this.post.selectedIndexes);      
      this.post.selectedOddily = [];
      for (const ind in this.post.selectedIndexes) {
        this.post.selectedOddily.push(
          this.oddily[this.post.selectedIndexes[ind]]
        );
      }
      console.log("vybrane oddily = ", this.post.selectedOddily);
      console.log("------------------------");
    },

    getOddily() {
      return this.$store.getters.getOddily;
    },

    generatePrilohaObj() {
      let arrayOfIDs = [];
      console.log("this.post.file_IDs", this.post.file_IDs);
      this.post.file_IDs.forEach((_id) => {
        console.log("_id", _id);
        arrayOfIDs.push({ _id: _id });
      });
      console.log("arrayOfIDs", arrayOfIDs);
      return arrayOfIDs;
    },

    generateOddilyObj() {
      let arrayOfOddils = [];
      this.post.selectedOddily.forEach((oddil) => {
        console.log("oddil", oddil);
        arrayOfOddils.push(oddil._id);
      });
      console.log("arrayOfOddils", arrayOfOddils);
      return arrayOfOddils;
    },

    generateObrazek() {
      console.log("generating obrazek");
      if (this.post.thumbnail == null) {
        return null;
      } else return { _id: this.post.thumbnail_ID };
    },

    // setLoading: function (value) {
      // this.$store.commit("setLoading", value);
    // },

    markdownToHTML: function (markdown) {
      const marked = require("marked");
      return marked(markdown);
    },
  },

  computed: {
    getDataObject() {
      const header = {
        nadpis: this.post.nadpis,
        text: this.post.md,
        oddils: this.generateOddilyObj(),
        priloha: this.generatePrilohaObj(),
        autor: {
          _id: this.$store.getters.get_id,
        },
        obrazek: this.generateObrazek(),
      };
      return header;
    },
  },

  created() {
    let promise1 = this.getOddily();
    let promise2;

    if (this.$route.params.slug) {
      //loading existing post
      this.editView = true;
      console.log("getting aktualita with slug", this.$route.params.slug.replace("+", "%2B"));
      promise2 = axios.get("/aktualitas?slug=" + this.$route.params.slug.replace("+", "%2B"));
    }

    Promise.all([promise1, promise2]).then((values) => {
      this.oddily = values[0];
      const response = values[1];
      console.log("post received from axios", response);
      this.post.nadpis = response.data[0].nadpis;
      this.post._id = response.data[0]._id;
      this.post.content = this.markdownToHTML(response.data[0].text);
      this.post.files = response.data[0].priloha;
      console.log("files", this.post.files);
      this.post.file_IDs = this.post.files.map((file) => {
        return file._id;
      });
      this.post.original.files = this.post.files;
      this.post.thumbnail = response.data[0].obrazek;
      if (this.post.thumbnail != null) {
        this.post.thumbnail_ID = response.data[0].obrazek._id;
        this.post.original.thumbnail = this.post.thumbnail;
      }
      response.data[0].oddils.forEach((oddil) => {
        const index = this.oddily.findIndex((it) => {
          return it._id == oddil._id;
        });
        console.log("index of selected oddil is", index);
        this.post.selectedIndexes.push(index);
      });
    });
  },

  watch: {
    $route(to, from) {
      console.log(to, from);
      this.$router.go(to.fullPath);
    },
  },

  components: {
    TiptapVuetify,
    FilesToDownload,
    Confirm,
  },
};
</script>

<style scoped>
.nadpis {
  font-size: 1.6rem !important;
  text-transform: uppercase;
  font-family: "skautbold";
}

h1 {
  font-size: 1.9rem !important;
  text-transform: uppercase;
  font-family: "skautbold";
}
</style>
