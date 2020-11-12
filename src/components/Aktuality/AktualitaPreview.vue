<template>
  <v-hover v-slot:default="{hover}">
    <v-card class="mx-auto" outlined :elevation="hover ? 8 : 4" raised>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-avatar v-if="aktualita.obrazek" tile max-height="150px" max-width="150px" size="150" color="grey" class="hidden-sm-and-up">
            <v-img :src="aktualita.obrazek.url"></v-img>
          </v-list-item-avatar>
          <div class="mb-4 rubrika">            
            <v-chip
              v-for="(oddil, index) in aktualita.oddils"
              :key="index"
              :color="inSelected(oddil.nazev) ? colors[oddil.nazev] : 'default'"
              :dark="inSelected(oddil.nazev) ? true : false"
              class="chip"
              small
            >{{oddil.nazev}}</v-chip>
          </div>
          <div class="nadpis headline">{{aktualita.nadpis}}</div>
          <div class="infoBox mt-2">
            <span
              class="datum mb-4"
            >{{aktualita.createdAtCET.getDate()}}. {{aktualita.createdAtCET.getMonth()}}. {{aktualita.createdAtCET.getFullYear()}}, {{aktualita.createdAtCET.getHours()}}:{{getMinutes(aktualita)}}</span>
            <v-chip class="ml-2 autorChip" color="default" text-color="#555" small>
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{aktualita.autor.jmeno}}
              <span
                class="ml-1"
                v-show="aktualita.autor.prezdivka"
              >({{aktualita.autor.prezdivka}})</span>
            </v-chip>
          </div>
          <v-list-item-subtitle class="text mt-5" v-html="aktualita.text"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar v-if="aktualita.obrazek" tile size="160" class="d-none d-sm-flex" color="grey">
          <v-img :src="aktualita.obrazek.url"></v-img>
        </v-list-item-avatar>
        
      </v-list-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          large
          class="px-4 mx-2 mb-2 white--text"          
          v-if="isContributor"
          color="#174085"
          :to="{name: 'EditPost', params: {_id: aktualita._id}}"
        ><v-icon  class="mr-1">mdi-pencil</v-icon>Upravit</v-btn>
        <v-btn
          large
          class="px-5 mx-2 mb-2"
          dark
          color="#174085"
          :to="{name: 'Post', params: {_id: aktualita._id}}"
        >Zobrazit</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
// import backendAPI from "@/constants";

export default {
  data: () => {
    return {
      // backendAPI: backendAPI.backendAPI,
    };
  },
  name: "AktualitaPreview",
  props: ["aktualita", "selected", "colors"],

  methods: {
    inSelected: function (oddil) {
      return this.selected.includes(oddil);
    },

    getMinutes(aktualita) {
      return (
        (aktualita.createdAtCET.getMinutes() < 10 ? "0" : "") +
        aktualita.createdAtCET.getMinutes()
      );
    },
  },

  computed: {
    thumbnail_url() {
      var xss = require("xss");
      var list = [];
      xss(this.aktualita.text, {
        onTagAttr: function (tag, name, value) {
          if (tag === 'img' && name === 'src') {
            list.push(xss.friendlyAttrValue(value));
          }
        }
      });
      console.log("filtered image from html text for aktualita", this.aktualita.nadpis, list );
      //https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
      var n = list[0].lastIndexOf('/');
      return list[0].slice(0, n+1) + "small_" + list[0].substring(n + 1);
      // return list[0];
    },

    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  created() {
    // while (!this.aktualita.text)  {console.log("waiting")}
    // console.log("this.aktualita.text available",this.aktualita.text);
    // console.log(this.thumbnail_url);
  }
};
</script>

<style scoped>
.text {
  color: black !important;
}

.datum {
  font-size: 0.8rem;
}

.infoBox {
  display: inline;
}

.nadpis {
  font-size: 1.9rem !important;
  font-family: "skautbold" !important;
  font-weight: bold;
}

.rubrika .chip {
  margin-bottom: 3px;
  margin-right: 5px;
}

.text >>> .image {
  display: none;
}

.text >>> .media {
  display: none;
}

</style>
