<template>
  <v-container grid-list-xs align-center class="mt-3">
    <h1 class="mb-0">Registrace pro vedoucí</h1>
    <v-divider class="mb-5"></v-divider>
    <p>Následující formulář slouží k umožnění přístupu vedoucím pro administraci webu. Registrace slouží <strong>pouze pro vedoucí</strong>, nikoliv pro rodiče a členy. Každá registrace je manuálně ověřena správcem webu.</p>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Ověření členství
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Potvrzení vedoucího
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 3"
          step="3"
        >
          Registrace
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          Dokončení
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>        
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="grey lighten-4"
            elevation="1"            
          >
            <v-container grid-list-xs v-if="!isLoggedIn">
              <p class="pa-2">Jdeme na to! Nejdříve se prosím přihlas pod přihlašovacími údaji pro členy našich oddílů:</p>
              <v-col align="center">
                <LoginForm doNotApplyRedirect="true" class="my-5" />
                <v-dialog v-model="loginDialogLoader" width="500">
                <LoginLoader />
                </v-dialog>
              </v-col>              
            </v-container>

            <v-container grid-list-xs v-else>
              <p class="pa-2">Výborně, tvé členství v oddíle již bylo ověřeno.</p>              
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Pokračovat
            </v-btn>  
            </v-container>   
          </v-card>
        </v-stepper-content>



        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-4"
            elevation="1"            
          >
            <v-container grid-list-xs>
              <p class="pa-2">Registrace je určena <strong>pouze pro vedoucí</strong>. Jestliže jsi vedoucí, pokračuj dále.</p>              
              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Ano, jsem vedoucí
            </v-btn>  
            </v-container>   
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            class="mx-2"
            @click="e1 = 1"
          >
            Pokračovat
          </v-btn>

          <v-btn text class="mx-2">
            Zrušit
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import LoginForm from "../../components/Login/LoginForm";
import LoginLoader from "../../components/Login/LoginLoader";

export default {
  name: 'Register',

  components: {
    LoginForm,
    LoginLoader,
  },

  data () {
    return {
      e1: 1,
    }
  },

  computed: {
    loginDialogLoader: {
      set() {
        // this.$store.dispatch("toggleLoginDialog");
        this.$store.dispatch("closeLoginDialog");
      },
      get() {
        return this.$store.getters.getLoginDialogLoader;
      },
    },

    isLoggedIn: {
      set() {},
      get() {
        return this.$store.getters.isLoggedIn;
      },
    },
  },

  created()  {
    console.log("page loaded");
  }
};
</script>

<style scoped>
  h1  {
    font-family: "skautbold";
    font-size: 2.5rem;
  }

  h2  {
    font-family: "skautbold";
  }

  .cont {
    text-align: center;
  }
</style>
