<template>
  <div class="team py-2">
    <v-container grid-list-xs my-5>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="isContributor"
            class="mb-5 mt-n3 editBtn"
            fab
            dark
            v-bind="attrs"
            v-on="on"
            color="#174085"
            @click="pickDialog = true"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Přidat vedoucího</span>
      </v-tooltip>
      <v-layout row wrap justify-space-around align-center temporary>
          <template v-if="loading">
            <v-flex  xl3 lg4 md6 sm6 xs12 mt-1 v-for="index in 7" :key="index">
              <PersonCardLoader />
            </v-flex>    
          </template>   

        <template v-else>        
          <v-flex xl3 lg4 md6 sm6 xs12 mt-1 v-for="person in main_contacts" :key="person._id">
            <PersonCard
              :fotkaUrl="person.vedouci.fotka[0] ? person.vedouci.fotka[0].url : ''"
              :jmeno="person.vedouci.jmeno"
              :prezdivka="person.vedouci.prezdivka ? person.vedouci.prezdivka : ''"
              :funkce="person.vedouci.funkce ? person.vedouci.funkce : ''"
              :popis="person.vedouci.popis ? person.vedouci.popis : ''"
              :email="person.vedouci.email ? person.vedouci.email : ''"
              :telefon="person.vedouci.telefon ? person.vedouci.telefon : ''"
              :facebook="person.vedouci.facebook ? person.vedouci.facebook : ''"
              :_id="person.vedouci._id"
              showPossibleEditBtn="isContributor"
              @deleteItem="deleteItem(person.id)"
            ></PersonCard>
          </v-flex>
        </template>
      </v-layout>
    </v-container>

    <v-dialog
        v-model="pickDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Přidat veřejný kontakt
          </v-card-title>
          <v-card-text>
            <v-select
              :items="vedoucis"
              v-model="newVedouci"
              label="Vyberte vedoucího"
              item-text="jmeno"
              item-value="id"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              :to="{name: 'CreateVedouciView', params: {oddil: null}}"
            >
              Nový
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="add"
              :disabled="newVedouci==null"
            >
              Přidat
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import PersonCard from "./PersonCard";
import PersonCardLoader from "./PersonCardLoader";


export default {
  data: () => {
    return {
      newVedouci: null,
      pickDialog: false,
      vedoucis: [],
      oddily: [],
      errors: [],
      main_contacts: [],
      loading: true
    };
  },

  methods: {
    setLoading: function (value) {
      this.$store.commit("setLoading", value);
    },

    compare: function(a, b) {
      if (a.vedouci.updatedAt > b.vedouci.updatedAt) return -1;
      if (b.vedouci.updatedAt > a.vedouci.updatedAt) return 1;
      return 0;
    },

    getMainVedoucis() {      
      return new Promise((resolve) =>  {
        axios
          .get('/dulezity-vedoucis')
          .then((response) => {
            this.main_contacts= [];
            response.data.forEach((item) => {
              console.log(item);
              this.main_contacts.push(item)
            })
            this.main_contacts.sort(this.compare);
            this.getRestOfVedoucis();
            console.log("main_contacts", this.main_contacts);
            this.loading = false;
            resolve('OK');
          })
          .catch((e) => {
            this.errors.push(e);
            this.loading = false;
          });
      })
    },

    getRestOfVedoucis() {
      axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: `
        {
          vedoucis {
              jmeno,
              id
            }
            }
          `
      }})
      .then((result) => {      
        console.log("vedoucis", result.data.data.vedoucis);
        this.vedoucis = result.data.data.vedoucis;
        this.vedoucis = this.vedoucis.filter(x => this.search(x.id));
      })
      .catch((e) => {
        console.log(e);
        this.errors.push(e);
      });
    },

    add() {
      if (this.newVedouci!=null)  {
        this.pickDialog = false;
        this.setLoading(true);
        axios.post('/dulezity-vedoucis', {
            'vedouci': this.newVedouci
          })
          .then((response) => {
            console.log('new vedouci was added',response);
            this.getMainVedoucis()
            this.newVedouci=null;
            this.setLoading(false);
  
          })
          .catch(function(e){
            console.log('new vedouci was not added',e);
          })
      }
      console.log("Adding vedouci with id =", this.newVedouci);
    },

    isInArray: function(x) {
      this.main_contacts.forEach((contact) =>  {
        if (x.id == contact.vedouci.id)  {
          return true;
        }
      })
    },

    search(id) {
      for (var i=0; i < this.main_contacts.length; i++) {
          if (this.main_contacts[i].vedouci.id === id) {
              console.log("found");
              return false;
          }
      }
      return true;
    },

    deleteItem(id)  {
      this.setLoading(true);
      console.log("deleting item",id);
      console.log("main_leaders",this.main_contacts);
      axios.delete('/dulezity-vedoucis/' + id)
        .then((response) => {
          console.log('dulezity vedouci deleted',response);
          this.getMainVedoucis()
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

  created() {
    // get main vedouci-----------------------------------------
    this.getMainVedoucis();
  },

  components: {
    PersonCard,
    PersonCardLoader,
  },
};
</script>

<style scoped>
</style>
