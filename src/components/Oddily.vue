<template>
  <v-container class="oddily">
    <img src="@/assets/logo_bg.svg" alt="logo_bg" class="logo-bg" />
    <h1>Oddíly</h1>
    <h3>Patříme pod středisko Srdíčko Třebíč.</h3>
    <v-layout row wrap justify-space-around align-center temporary>
      <v-flex xl4 lg4 md6 sm6 xs12 mt-1 v-for="oddil in oddily" :key="oddil._id">
        <v-hover v-slot:default="{hover}">
          <v-card  class="my-5 mx-auto pt-3 card" max-width="344" :elevation="hover ? 12 : 7" raised>
            <div class="brambora">
              <img src="@/assets/brambora.svg" alt="brambora" rotate="5" />
            </div>
            <div class="logo">
              <img :src="oddil.icon" :alt="oddil.title" />
            </div>

            <div class="rest">
              <v-card-title style="display:block;">
                <h2>{{ oddil.title }}</h2>
              </v-card-title>

              <v-card-subtitle>{{ oddil.age }}</v-card-subtitle>

              <v-card-actions>
                <v-btn text color="#174085" router :to="{ name: 'Aktuality', params: {oddil: oddil.link} }">Aktuality</v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="oddil.show = !oddil.show">
                  <v-icon>{{ oddil.show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="oddil.show">
                  <v-divider></v-divider>
                  <v-card-text>{{ oddil.description }}</v-card-text>
                </div>
              </v-expand-transition>
            </div>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false,
    oddily: [
      {
        title: "skauti",
        age: "chlapci ve věku 12-16 let",
        show: false,
        description: "Do oddílu skautů přicházejí chlapci ve věku 12 let z vlčat. Scházíme se každý pátek od 16:00 v klubovně Trafo. Momentálně je kapacita oddílu naplněna.",
        icon: require("../assets/loga_oddilu/skauti.svg"),
        link: "skauti",
        rot: "0deg",
      },
      {
        title: "skautky",
        age: "dívky ve věku 12-16 let",
        show: false,
        description: "Popis oddílu skautek",
        icon: require("../assets/loga_oddilu/skautky.svg"),
        link: "skautky",
        rot: "60deg",
      },
      {
        title: "vlčata",
        age: "chlapci ve věku 7-11 let",
        show: false,
        description: "Popis oddílu vlčat",
        icon: require("../assets/loga_oddilu/vlcata.svg"),
        link: "vlcata",
        rot: "120deg",
      },
      {
        title: "světlušky",
        age: "dívky ve věku 6-12 let",
        show: false,
        description: "Popis oddílu světlušek",
        icon: require("../assets/loga_oddilu/svetlusky.svg"),
        link: "svetlusky",
        rot: "180deg",
      },
      {
        title: "roveři a rangers",
        age: "dívky a chlapci ve věku 16-18 let",
        show: false,
        description: "Neoficiální oddíl roverů a rangers je smíšený chlapecký a dívčí oddíl pro věk 16-18 let. Několikrát do roka jezdíme na výpravy a většina členů paralelně působí jako vedoucí v jiných oddílech.",
        icon: require("../assets/loga_oddilu/roveri.svg"),
        link: "roveri",
        rot: "240deg",
      },
      {
        title: "oldskauti",
        age: "dospělí",
        show: false,
        description: "Popis oddílu oldskautů",
        icon: require("../assets/loga_oddilu/oldskauti.svg"),
        link: "oldskauti",
        rot: "300deg",
      },
    ],
  }),

  methods:  {
  }
};
</script>

<style scoped>
.oddily {
  text-align: center;
  padding-top: 50px;
  position: relative;
}

h1 {
  font-family: "skautbold";
  font-size: 3rem;
}

h3 {
  font-family: "themix";
  font-weight: 200;
  font-size: 1rem;
}

h2 {
  font-family: "skautbold";
  font-size: 1.3rem;
  z-index: 4;
}

.card {
  position: relative;
  min-height: 260px;
  text-align: center;
}

.brambora img {
  width: 55%;
  transform: translate(-50%, 20%);
  position: absolute;
  z-index: 1;
  opacity: 0.65;
  transition: transform 0.5s ease-in-out;
  left: 50%
}

.card:hover .brambora img {
  transform: translate(-50%, 20%) rotate(80deg);
}

.logo img {
  width: 35%;
  position: absolute;
  z-index: 1;
  transition: transform 0.35s ease-in-out;
  transform: translate(-50%, 0);
  left: 50%
}

.card:hover .logo img {
  transform: translate(-50%, 0) scale(1.08);
}

.rest {
  padding-top: 120px;
  z-index: 5;
  position: relative;
}

.logo-bg {
  top: 265px;
  left: -200px;
  width: 300px;
  height: auto;
  position: absolute;
  pointer-events: none;
  opacity: 0.07;
  transform: rotate(20deg) scale(2);
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
