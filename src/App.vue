<template>
  <v-app> 
    <Navbar />
    <v-main >
      <div :class="{ contributor: isContributor }">
        <v-container grid-list-xs>
          <router-view></router-view>
        </v-container>
      </div>
    </v-main>
    <Footer />
    <LoadingScreen />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbars/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";


export default {
  name: "App",

  computed: {
    isContributor() {
      return this.$store.getters.isContributor
    }
  },

  components: {
    Navbar,
    Footer,
    LoadingScreen,
    // SwitchIconsGroups
  },
};
</script>

<style>
@font-face {
  font-family: "themix";
  src: url("./fonts/themix/TheMix_LT_400.eot");
  src: url("./fonts/themix/TheMix_LT_400.eot? #iefix")
    format("embedded-opentype");
  src: url("./fonts/themix/TheMix_LT_400.woff") format("woff"),
    url("./fonts/themix/TheMix_LT_400.woff2") format("woff2"),
    url("./fonts/themix/TheMix_LT_400.otf") format("opentype"),
    url("./fonts/themix/TheMix_LT_400.svg#themix") format("svg");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "themix";
  src: url("./fonts/themix/TheMix_LT_400i.eot");
  src: url("./fonts/themix/TheMix_LT_400i.eot? #iefix")
    format("embedded-opentype");
  src: url("./fonts/themix/TheMix_LT_400i.woff") format("woff"),
    url("./fonts/themix/TheMix_LT_400i.woff2") format("woff2"),
    url("./fonts/themix/TheMix_LT_400i.otf") format("opentype"),
    url("./fonts/themix/TheMix_LT_400i.svg#themix") format("svg");
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: "themix";
  src: url("./fonts/themix/TheMix_LT_700.eot");
  src: url("./fonts/themix/TheMix_LT_700.eot? #iefix")
    format("embedded-opentype");
  src: url("./fonts/themix/TheMix_LT_700.woff") format("woff"),
    url("./fonts/themix/TheMix_LT_700.woff2") format("woff2"),
    url("./fonts/themix/TheMix_LT_700.otf") format("opentype"),
    url("./fonts/themix/TheMix_LT_700.svg#themix") format("svg");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "themix";
  src: url("./fonts/themix/TheMix_LT_700i.eot");
  src: url("./fonts/themix/TheMix_LT_700i.eot? #iefix")
    format("embedded-opentype");
  src: url("./fonts/themix/TheMix_LT_700i.woff") format("woff"),
    url("./fonts/themix/TheMix_LT_700i.woff2") format("woff2"),
    url("./fonts/themix/TheMix_LT_700i.otf") format("opentype"),
    url("./fonts/themix/TheMix_LT_700i.svg#themix") format("svg");
  font-weight: 700;
  font-style: italic;
}
@font-face {
  font-family: "skautbold";
  src: url("./fonts/skautbold/skaut-bold-webfont.eot");
  src: url("./fonts/skautbold/skaut-bold-webfont.eot? #iefix")
    format("embedded-opentype");
  src: url("./fonts/skautbold/skaut-bold-webfont.woff") format("woff"),
    url("./fonts/skautbold/skaut-bold-webfont.woff2") format("woff2"),
    url("./fonts/skautbold/skaut-bold-webfont.otf") format("opentype"),
    url("./fonts/skautbold/skaut-bold-webfont.svg#skautbold") format("svg");
  font-weight: normal;
  font-style: normal;
}
:root {
  --myblack: #0b0b0b;
  --myblue: #174085;
  --mygrey: #e8e8e8;
  --myorange: #f6a800;
}
#app {
  font-family: "themix", sans-serif;
  font-weight: 400;
  margin: 0px;
  padding: 0px;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}
/* body {
  padding: 0;
  margin: 0;
} */

h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.new5 {
  /* compatibility with Microsoft Edge, white line was added between components */
  display: none;
}

@media screen and (min-width: 1264px) {
  .contributor  {
    padding-left: 250px;
  }
}

.main-center-limitwidth {
  margin: auto;
  max-width: 1500px;
}
</style>
