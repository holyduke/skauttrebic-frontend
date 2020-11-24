<template>
  <v-container grid-list-xs class="my-3 px-4">
    <div class="main-container">
      <h1 class="mb-0" id="Aktuality">Fotografie</h1>
      <v-divider class="mb-2"></v-divider>
      <div class="zonerama">
        <iframe          
          src="https://www.zonerama.com/Embed/Account/246290?color=blue&autoplay=false&vertical=false"
          style="width: 100%; height: 350px"
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
        ></iframe>
      </div>
      <div class="zonerama">
        <iframe
          src="https://www.zonerama.com/Embed/Account/24898?color=orange&autoplay=false&vertical=false"
          style="width: 100%; height: 350px"
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
        ></iframe>
      </div>
      <!-- <div class="zonerama">
        <iframe src="https://www.zonerama.com/Embed/Account/260312?color=green&autoplay=false&vertical=false" style="width: 720px; height: 330px;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      </div> -->
    </div>
  </v-container>
</template>

<script>
import Constants from "@/constants.js";

export default {
  name: "Photos",

  data() {
    return {
      colors: Constants.colors,
    };
  },

  methods: {
    iframeStyles() {
      this.frame = this.$refs.iframeContent.contentWindow;

      const style =
        ".pull-menu {display: none;} " + "body {color:" + this.text + ";} ";
      this.frame.postMessage(style, "*");
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "skautbold";
  margin: 20px 0 20px 0;
  font-size: 2.5rem;
}

.zonerama {
  margin-top: 5px;
  padding: 0 15px;
}

.main-container >>> .pull-menu {
  display: none !important;
}
</style>
