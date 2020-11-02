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
          <v-list-item-subtitle class="text mt-5">{{text}}</v-list-item-subtitle>
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

    _removeMarkDown: function (markdown)  {
      const removeMd = require('remove-markdown');
      return removeMd(markdown);
    }
  },

  computed: {
    // getBackendAPI()  {
    //   return this.$store.getters.getBackendAPI;
    // },

    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  created() {
    this.text = this._removeMarkDown(this.aktualita.text);
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

</style>
