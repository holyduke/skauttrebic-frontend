<template>
  <div class="team py-2">
    <v-container grid-list-xs my-2>
      <h2 class="mb-5">{{oddilNazev[oddil]}}</h2>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="isContributor"
            class="mb-5 editBtn"
            fab
            dark
            v-bind="attrs"
            v-on="on"
            color="#174085"            
            :to="{name: 'CreateVedouciView', params: {oddil: oddil}}"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Vytvořit nového vedoucího</span>
      </v-tooltip>
      <!-- <h1>There are {{vedouci.length}} vedoucis.</h1> -->
      <v-layout row wrap justify-space-around align-center temporary>
        <template v-if="loading">
          <v-flex  xl3 lg4 md6 sm6 xs12 mt-1 v-for="index in 5" :key="index">
            <PersonCardLoader />
          </v-flex>    
        </template>        

        <template v-else>
          <v-flex xl3 lg4 md6 sm6 xs12 mt-1 v-for="person in vedouci" :key="person._id">
            <PersonCard
              :fotkaUrl="person.fotka[0] ? person.fotka[0].url : ''"
              :jmeno="person.jmeno"
              :prezdivka="person.prezdivka ? person.prezdivka : ''"
              :funkce="person.funkce ? person.funkce : ''"
              :popis="person.popis ? person.popis : ''"
              :email="person.email ? person.email : ''"
              :telefon="person.telefon ? person.telefon : ''"
              :facebook="person.facebook ? person.facebook : ''"
              :_id="person._id"
              showPossibleEditBtn="isContributor"
              @deleteItem="deleteItem(person._id)"
            ></PersonCard>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import PersonCard from "./PersonCard";
import PersonCardLoader from "./PersonCardLoader";
import Constants from "@/constants.js";

export default {
  name: "Kontakt",

  props: ["oddil"],

  data: function () {
    return {
      vedouci: [],
      oddilNazev: {
        skauti: "2. oddíl skautů",
        skautky: "2. oddíl skautek",
        vlcata: "2. smečka vlčat",
        svetlusky: "2. roj světlušek",
        roveri: "2. oddíl roverů a rangers",
        oldskauti: "Rikitanova dvojka",
      },
      oddilDiacritics: Constants.oddilDiacriticsObj,
      loading: true
    };
  },

  methods: {
    setLoading: function (value) {
      this.$store.commit("setLoading", value);
    },

    getVedoucis: function (oddil_nazev) {
      axios
        .get(`/vedoucis?oddil.nazev=` + oddil_nazev + '&_sort=updatedAt:desc')
        .then((response) => {
          // JSON responses are automatically parsed.
          this.vedouci = response.data;
          console.log("vedoucis loaded",this.vedouci);
          this.loading = false;
        })
        .catch((e) => {
          this.errors.push(e);
          this.loading = false;
        });
    },

    deleteItem(_id)  {
      this.setLoading(true);
      console.log("deleting item",_id);
      axios.put('/vedoucis/' + _id,  {
          "oddil": {
            "_id": null
          }
        })
        .then((response) => {
          console.log('vedouci deleted',response);
          this.getVedoucis(this.oddilDiacritics[this.oddil]);
          this.setLoading(false);
        })
        .catch(function(e){
          console.log('error while deleting dulezity vedouci',e);
        })
    }
  },

  computed: {
    isContributor() {
      return this.$store.getters.isContributor;
    },
  },

  watch: {
    oddil: function (newVal) {
      this.getVedoucis(this.oddilDiacritics[newVal]);
    },
  },

  created() {
    this.getVedoucis(this.oddilDiacritics[this.oddil]);
  },

  components: {
    PersonCard,
    PersonCardLoader
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: "skautbold";
}
</style>
