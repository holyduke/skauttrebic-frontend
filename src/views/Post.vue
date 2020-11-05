<template>
  <v-container v-if="aktualita" grid-list-xs class="my-5">
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="100"
        :width="10"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div
      :class="{
        'ma-0': $vuetify.breakpoint.mdAndDown,
        marginlg: $vuetify.breakpoint.lg,
        marginxl: $vuetify.breakpoint.xl,
      }"
      v-else
    >
      <v-layout row wrap justify-space-around class="heading">
        <v-flex xs12 sm8 md9 lg10 xl10>
          <div class="outer ml-5">
            <div>
              <h1>{{ aktualita.nadpis }}</h1>
              <v-divider class="mb-2"></v-divider>
              <h4>Publikováno: {{ getCETDate }}</h4>
              <h4>
                Autor:
                <v-chip
                  class="ml-1 autorChip"
                  color="default"
                  text-color="#555"
                  small
                >
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{ aktualita.autor.jmeno }}
                  <span class="ml-2" v-show="aktualita.autor.prezdivka"
                    >({{ aktualita.autor.prezdivka }})</span
                  >
                </v-chip>
              </h4>
              <h4>
                Oddíly:
                <v-chip
                  v-for="(oddil, index) in aktualita.oddils"
                  :key="index"
                  :color="colors[oddil.nazev]"
                  dark
                  class="chip ml-1"
                  small
                  >{{ oddil.nazev }}</v-chip
                >
              </h4>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 sm4 md3 lg2 xl2>
          <v-img
            class="cover"
            v-if="aktualita.obrazek"
            :src="aktualita.obrazek.url"
          ></v-img>
        </v-flex>
      </v-layout>
      <div class="pa-5 mt-2 zprava">
        <div v-html="aktualita.text"></div>
        <FilesToDownload
          v-if="aktualita.priloha.length"
          :priloha="aktualita.priloha"
          :showDeleteBtn="false"
        />
      </div>
      <v-btn
        large
        class="px-4 mx-2 my-5 white--text float-right"
        v-if="isContributor"
        color="#174085"
        :to="{ name: 'EditPost', params: { _id: aktualita._id } }"
      >
        <v-icon class="mr-1">mdi-pencil</v-icon>Upravit
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Constants from "@/constants.js";
import FilesToDownload from "@/components/Aktuality/FilesToDownload";

export default {
  name: "Post",

  data() {
    return {
      loading: false,
      colors: Constants.colors,
      backendAPI: Constants.backendAPI,
      aktualita: null,
      text: "",
    };
  },

  methods: {
    getMinutes(aktualita) {
      return (
        (aktualita.createdAtCET.getMinutes() < 10 ? "0" : "") +
        aktualita.createdAtCET.getMinutes()
      );
    },

    convertTimeToCET: function (aktualita) {
      aktualita.createdAtCET = new Date(aktualita.createdAt);
    },

    // convertToHTML: function (markdown) {
    //   var showdown = require("showdown");
    //   var converter = new showdown.Converter();
    //   converter.setOption("simpleLineBreaks", true); // makes sure that line end will make <br> tag
    //   return converter.makeHtml(markdown);
    // },
  },

  computed: {
    getCETDate: function () {
      try {
        // because of asynchronnous programming - it would require object which doesn´t exist yet
        return (
          this.aktualita.createdAtCET.getDate() +
          ". " +
          this.aktualita.createdAtCET.getMonth() +
          ". " +
          this.aktualita.createdAtCET.getFullYear() +
          ", " +
          this.aktualita.createdAtCET.getHours() +
          ":" +
          this.getMinutes(this.aktualita)
        );
      } catch {
        return "";
      }
    },

    // backendAPI() {
    //   return this.$store.getters.getBackendAPI;
    // },

    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  created() {
    this.loading = true;
    // this.slug = this.$route.params.slug.replace("+", "%2B");
    console.log("getting post with _id = " + this.$route.params._id);
    axios
      .get(`/aktualitas/` + this.$route.params._id)
      .then((response) => {
        console.log("received aktualita...", response);
        this.aktualita = response.data;
        this.convertTimeToCET(this.aktualita);
        // this.text = this.convertToHTML(this.aktualita.text);
        document.title = "Skaut" + " - " + this.aktualita.nadpis;
        console.log("response post", response);
        this.loading = false;
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
      });
  },

  components: {
    FilesToDownload,
  },
};
</script>

<style scoped>
.outer {
  display: flex;
  align-items: center;
  height: 100%;
}

.cover {
  float: right;
  height: 100%;
  width: auto;
  max-height: 200px;
}

@media only screen and (max-width: 600px) {
  .cover {
    float: initial;
  }
}

.heading {
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(224, 218, 208);
  border-radius: 7px;
}

.heading:hover {
  background-color: rgb(247, 244, 244);
}

h1 {
  font-size: 1.9rem;
  text-transform: uppercase;
  font-family: "skautbold";
}

h4 {
  font-weight: normal;
  margin-bottom: 5px;
}

.zprava {
  /* background-color: rgb(247, 247 , 247); */
  border: 1px solid rgb(245, 245, 245);
  border-radius: 7px;
  margin-left: -1px;
  margin-right: -1px;
  word-wrap: break-word;
}

.zprava:hover {
  border: 1px solid rgb(236, 236, 236);
  background-color: rgb(254, 254, 254);
}

.marginlg {
  margin: 0 70px 0 70px;
}

.marginxl {
  margin: 0 150px 0 150px;
}

.size {
  color: lightgray;
}

.zprava >>> .image  {
  padding-bottom: 30px;
}

.zprava >>> .image img {
  max-width: 100%;
}

.zprava >>> .image-style-side {
  float: right;
  margin: 10px;
  max-width: 50% !important;
}

.zprava >>> figcaption {
  text-align: center;
}

.zprava >>> .table table {
  border-spacing: 0;
  border-collapse: collapse;
  /* text-align: center; */
  margin: auto;
}

.zprava >>> .table th {
  border: solid;
  padding: 6.5px;
}

.zprava >>> .table td {
  padding: 6.5px;
  border: solid thin;
}

.zprava >>> .table table th {
  background: hsla(0, 0%, 0%, 5%);
}

.zprava >>> .media  {
  padding-top: 100px;
}
</style>
