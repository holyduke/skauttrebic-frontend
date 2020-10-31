<template>
  <v-container grid-list-xs> 
    <h1 class="mb-0">Přehled odeslaných emailů</h1>
    <v-divider class="mb-5"></v-divider>

    <!-- graf -->
    <h2>Události za posledních 10 dnů</h2>
    <Graph :days="10"/>

    <br>

    <!-- detaily -->
    <h2>Události podrobně</h2>
    <Events />

  </v-container>
</template>

<script>
// import axios from "axios";
import Graph from "@/components/Email/Graph";
import Events from "@/components/Email/Events";


export default {
  name: 'EmailOverview',

  data() {
    return {
      sliderValue: 7,
      days: 7,
    }
  },

  computed: {
    parameters(){
      let parameters = {
        limit:100
      }
      return parameters;
    },

    // getBreadcrumbs() {
    //   return this.$store.getters.getBreadcrumbs;
    // },
  },

  methods: {
    getSentEmails() {
      // console.log("getting sent emails");
      // axios.get("/email-event-report/?limit=" + this.parameters.limit)
      //   .then((res) => {
      //     console.log("received a response", res);
      //   })
      //   .catch((e) => {
      //     console.log("error while loading emails", e.response)
      //   })
    },

    sliderchange()  {
      console.log("slider value changed");
      this.days = this.sliderValue;
    }
  },

  created() {
    this.getSentEmails();
  },

  components: {
    Graph,
    Events
  }
};
</script>

<style>
h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}
</style>
