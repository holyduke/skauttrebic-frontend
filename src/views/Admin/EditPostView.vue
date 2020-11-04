<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-xs>
      <h1 class="my-5" v-if="editView">Editovat příspěvek</h1>
      <h1 class="my-5" v-else>Vytvořit příspěvek</h1>
      <v-divider></v-divider>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <h2 class="mt-2 nadpis">Název</h2>
          <v-text-field
            :rules="textRules"
            required
            label="Nadpis"
            v-model="post.nadpis"
          ></v-text-field>
        </v-col>
        <!-- <v-btn color="success" @click="getSelectedOddily">text</v-btn> -->

        <v-col cols="12" sm="6" md="6">
          <h2 class="mt-2 nadpis">Oddíl(y)</h2>
          <v-chip-group
            class="mb-4"
            v-model="post.selectedIndexes"
            column
            multiple
          >
            <v-chip
              filter
              outlined
              v-for="(oddil, index) in oddily"
              :key="index"
              >{{ oddil.nazev }}</v-chip
            >
          </v-chip-group>
          <v-alert dense v-show="showHintLbl" type="error"
            >Zvolte alespoň jeden oddíl</v-alert
          >
        </v-col>
        <!-- <h2 class="mt-5 nadpis">Náhledový obrázek</h2>
      <v-file-input show-size accept="image/*" v-model="post.thumbnail" label="Náhledový obrázek"></v-file-input> -->

        <!-- <h2 class="mt-0 nadpis">Text</h2> -->
        <!-- all together now, and allow up to 20MB images -->
        <v-col cols="12">
          <TextEditor />
        </v-col>

        <v-col cols="12">
          <template v-if="editView">
            <h2 class="mt-5 nadpis">Nahrát nové přílohy</h2>
            <v-file-input
              show-size
              multiple
              accept="*"
              v-model="post.newfiles"
              label="Soubory"
            ></v-file-input>
          </template>

          <template v-else>
            <h2 class="mt-5 nadpis">Přílohy</h2>
            <v-file-input
              show-size
              multiple
              accept="*"
              v-model="post.files"
              label="Soubory"
            ></v-file-input>
          </template>

          <FilesToDownload
            v-if="post.files != null"
            :priloha="post.files"
            :showDeleteBtn="true"
          />

          <v-divider class="my-4"></v-divider>
        </v-col>

        <v-col cols="12">
          <v-alert
            dense
            v-if="editView"
            border="top"
            colored-border
            type="info"
            elevation="2"
            >Emaily již byly odeslány a po uložení nebudou poslány
            znovu.</v-alert
          >
          <v-alert
            dense
            v-else
            large
            border="top"
            colored-border
            type="info"
            elevation="2"
            >Po uložení příspěvku se odešlou emaily rodičům.</v-alert
          >
          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="#174085"
            class="white--text"
            @click="publish"
            >Uložit</v-btn
          >
          <v-btn
            color="error"
            v-if="editView"
            class="white--text mx-5"
            @click="deletePost"
            >Smazat</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <Confirm ref="confirm"></Confirm>
  </v-form>
</template>

<script>
import axios from "axios";
import FilesToDownload from "@/components/Aktuality/FilesToDownload";
import TextEditor from "@/components/Aktuality/TextEditor";
import Confirm from "@/components/Confirm";
import router from "@/router";

export default {
  name: "EditPostView",

  data: () => ({
    loading: false,
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
          return true;
        } else {
          return "Toto pole je povinné";
        }
      },
    ],
  }),

  methods: {
    publish() {
      console.log(
        "------------------------------- publishing ----------------------------------------------"
      );
      this.post.content = this.$store.getters.getPostContent;
      console.log("data read from Vuex store successfully", this.post.content);
      this.getSelectedOddily(); //this.post.selectedoddily gets updated
      if (this.validate()) {
        this.loading = true;
        // this.convertToMarkDown(); //this.post.md gets updated
        if (this.editView) {
          //editing existing post
          console.log("trying to update post", this.post);
          this.uploadNewFiles().then(() => {
            axios
              .put("/aktualitas/" + this.post._id, this.getDataObject)
              .then((result) => {
                this.loading = false;
                router.push("/aktuality/prispevek/" + result.data._id);
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

          this.uploadNewFiles().then(() => {
            axios
              .post("/aktualitas", this.getDataObject)
              .then((result) => {
                this.loading = false;
                console.log(result);
                router.push("/aktuality/prispevek/" + result.data._id);
              })
              .catch((e) => {
                this.loading = false;
                console.log("post FAILURE", e);
              });
          });
        }
      }
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
              console.log("uploading new thumbnail:", this.post.thumbnail);
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

    //return a promise that resolves with a File instance https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
    urltoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },

    uploadFile(file) {
      let formData = new FormData();
      console.log("uploading new file -", file);
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
      console.log(
        "Oddily:",
        this.oddily.map((a) => a.nazev)
      );
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
        text: this.post.content,
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

    if (this.$route.params._id) { //loading existing post
      this.editView = true;
      console.log("getting aktualita with _id", this.$route.params._id);
      promise2 = axios.get("/aktualitas/" + this.$route.params._id);
    }

    else  { //creating fresh new post
      this.$store.dispatch("setPostContent", "");
    }

    Promise.all([promise1, promise2]).then((values) => {
      this.oddily = values[0];
      const response = values[1];
      console.log("post received from axios", response);
      this.post.nadpis = response.data.nadpis;
      this.post._id = response.data._id;
      this.post.content = response.data.text;
      this.$store.dispatch("setPostContent", this.post.content);
      this.post.files = response.data.priloha;
      console.log("files", this.post.files);
      this.post.file_IDs = this.post.files.map((file) => {
        return file._id;
      });
      this.post.original.files = this.post.files;
      this.post.thumbnail = response.data.obrazek;
      if (this.post.thumbnail != null) {
        this.post.thumbnail_ID = response.data.obrazek._id;
        this.post.original.thumbnail = this.post.thumbnail;
      }
      response.data.oddils.forEach((oddil) => {
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
    // TiptapVuetify,
    FilesToDownload,
    TextEditor,
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
