<template>
  <v-container grid-list-xs class="my-3 px-4" >
    <div class="main-container">
      <h1 class="mb-0" id="Aktuality">Fotografie</h1>
      <v-divider class="mb-2"></v-divider>
      
      <iframe class="px-2" src="https://www.zonerama.com/Embed/Account/246290?color=gray-dark&autoplay=false&vertical=false" style="width: 100%; height: 330px;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
    </div>
    <!-- <p class="mt-5">Prosíme o nešíření odkazů dál.</p>
    <div class="mt-15 d-flex flex-wrap justify-space-around">
            <v-btn :color="colors['skauti']" rounded class="white--text my-2" href="https://www.zonerama.com/2oddilskautu" target="_blank">Skauti</v-btn>
            <v-btn :color="colors['skautky']" rounded class="white--text my-2" href="https://skautky2.rajce.idnes.cz/" target="_blank">Skautky</v-btn>
            <v-btn :color="colors['vlčata']" rounded class="white--text my-2" href="https://www.zonerama.com/KarelJanicek/795748" target="_blank">Vlčata</v-btn>
            <v-btn :color="colors['světlušky']" rounded class="white--text my-2" href="https://svetluskytrebic.rajce.idnes.cz/" target="_blank">Světlušky</v-btn>
            <v-btn :color="colors['roveři']" rounded class="white--text my-2" href="https://www.zonerama.com/RR2oddil/796874" target="_blank">Roveři</v-btn>
            <v-btn :color="colors['oldskauti']" rounded class="white--text my-2" href="https://www.zonerama.com/KatkaJanickova/837732" target="_blank">Oldskauti</v-btn>
    </div> -->
    

  </v-container>
</template>

<script>
import Constants from "@/constants.js";

export default {
  name: 'Photos',

  data() {
    return {
      colors: Constants.colors,
    }
  },

  methods: {
    iframeStyles() {
        this.frame = this.$refs.iframeContent.contentWindow;

        const style =
            '.pull-menu {display: none;} ' +
            'body {color:' + this.text + ';} '
        this.frame.postMessage(style, '*');
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.main-container >>> .pull-menu  {
  display: none !important;
}
</style>
