<template>
  <v-container grid-list-xs class="my-3">
    <h1 class="mb-0" id="Aktuality">Schválení registrace vedoucích</h1>
    <v-divider class="mb-4"></v-divider>
    <p>Zde můžete schválit registraci jiných vedoucích, kteří se zaregistrovali na web. Schválení proveďte až po <strong>důkladném ověření</strong> totožnosti zaregistrovaného účtu. (jméno, email, přihlašovací jméno musí patřit skutečně danému vedoucímu). Pokud náhodou schválíte nesprávnou registraci, ihned kontaktujte správce webu.</p>

    <br>

    <!-- Main Data Table -->
    <v-data-table
      :loading="loading" loading-text="Načítám registrace..."
      :headers="headers"
      :items="users"
      loader-height="6"
      sort-by="id"
      class="elevation-3"
      hide-default-footer
    >   
      <template v-slot:[`item.createdAt`]="{ item }">
        <span>{{ item.createdAtFormated }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="!item.blocked"> 
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{item.approvedAtFormated}}
              </div>
            </template>
            <span>schváleno uživatelem {{item.approvedBy.jmeno}}</span>
          </v-tooltip>
          
        </div>
        <div v-else>
          <v-btn color="primary" class="mr-3" @click="approveDialog(item)">Schválit</v-btn>
          <v-btn color="error" @click="deleteDialog(item)">Zrušit</v-btn>
        </div>
      </template>
    </v-data-table>   
    <Confirm ref="confirm"></Confirm>
  </v-container>
</template>

<script>
import axios from "axios";
import Confirm from "@/components/Confirm";

export default {
  name: 'ManageVedoucisRights',

  data() {
    return {
      loading: false,

      headers: [
      {
        text: "Jméno",
        align: "start",
        value: "jmeno",
      },
      { text: "Přezdívka", value: "prezdivka" },
      { text: "Email", value: "email" },
      { text: "Datum registrace", value: "createdAt" , },
      { text: "Schválení registrace", value: "actions", sortable: false },
    ],

      users: [],
    }
  },

  computed: {
    getPostObject() {
      const date = new Date();
      console.log("today date is", date);
      return {
        blocked: false,
        approvedAt: date,
        approvedBy: {
            _id: this.get_id,
          }
        }
    },

    get_id() {
      return this.$store.getters.get_id;
    },
  },

  watch: {
    
  },

  methods: {
    approveDialog(item) {
      this.$refs.confirm
        .open(
          "Schválit registraci",
          "Opravdu chcete schválit registraci nového vedoucího - " + item.jmeno + "?",
          { color: "primary" }
        )
        .then((confirm) => {
          if (confirm) {
            this.loading=true;
            axios.put("/users/" + item.id, this.getPostObject)
              .then((res) =>  {
                console.log("OU YEAH, member put successfully", res);
                this.loadVedoucis();
              })
              .catch((e) => {
                console.log("error while putting a member", e.response)
              })
          }
        });
    },

    deleteDialog(item) {
      this.$refs.confirm
        .open(
          "Smazat registraci",
          "Opravdu chcete smazat registraci nového vedoucího - " + item.jmeno + "?",
          { color: "error" }
        )
        .then((confirm) => {
          if (confirm) {
            this.loading=true;
            axios.delete("/users/" + item.id, this.getPostObject)
              .then((res) =>  {
                console.log("OU YEAH, member deleted successfully", res);
                this.loadVedoucis();
              })
              .catch((e) => {
                console.log("error while deleting a member", e.response)
              })
          }
        });
    },

    loadVedoucis()  {
      this.loading=true;
      //get users
      axios({
        url: "/graphql",
        method: "post",
        data: {
          query: `
          {
            users(where: { role: { name: "Contributor" }}) {
              id,
              username,
              email,
              jmeno,
              prezdivka,
              blocked,
              createdAt,
              approvedAt,
              approvedBy  {
                jmeno
              },
            }
          }`,
        },
      })
        .then((result) => {
          console.log("all users loaded successfully", result)
          this.users = result.data.data.users;
          this.switches = [];
          this.users.forEach(user => {
            //created At date to printable
            const createdAt = new Date(user.createdAt)
            user.createdAtFormated = `${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()}`
            
            //approvedAt date to printable
            const approvedAt = new Date(user.approvedAt)
            user.approvedAtFormated = `${approvedAt.getDate()}.${approvedAt.getMonth() + 1}.${approvedAt.getFullYear()}`
            
            //variable for usecase in v-model 
            user.activeAccount = !user.blocked;
          });
          this.loading = false;        
        })
        .catch((e) => {
          console.log("error while loading user", e.result)
          this.loading = false;
        })
      }
  },

  created() {
    this.loadVedoucis();
  },

  components: {
    Confirm,
  }
};
</script>

<style scoped>
h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}
</style>
