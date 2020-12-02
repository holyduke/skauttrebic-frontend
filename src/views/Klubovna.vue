<template>
  <v-container grid-list-xs>  
    <h1 class="mb-0">Stavba nové klubovny</h1>
    <v-divider class="mb-5"></v-divider>
    <div>
      Klubovna
    </div>
    <img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
    <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
  </v-container>
</template>

<script>
import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {
  name: 'Klubovna',

  data() {
    return {
      images: [
      'https://placem.at/places?w=800&h=800&random=1',
      'https://placem.at/places?w=800&h=600&random=1',
      'https://placem.at/places?w=1200&h=400&random=2',
      'https://placem.at/places?w=800&h=800&random=3',
      'https://placem.at/places?w=600&h=800&random=4',
      'https://placem.at/places?w=400&h=800&random=5',
      'https://placem.at/places?w=800&h=800&random=6',
      'https://placem.at/places?w=800&h=800&random=7',
      'https://placem.at/places?w=800&h=800&random=8',
      'https://placem.at/places?w=800&h=800&random=9',
      'https://placem.at/places?w=800&h=800&random=10'
    ],
    index: null
    }
  },

  components: {
    VueGallerySlideshow
  },
};
</script>

<style>
.image {
  width: 100px;
  height: 100px;
  background-size: cover;
  cursor: pointer;
  margin: 5px;
  border-radius: 3px;
  border: 1px solid lightgray;
  object-fit: contain;
}
</style>
