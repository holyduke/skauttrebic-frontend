<template>
  <v-container grid-list-xs>  
    <h1 class="mb-0">Stavba nové klubovny</h1>
    <v-divider class="mb-5"></v-divider>
    <div>
      <div class="heading">
        Skauti v Třebíči mají kolem 300 dětí a 50 dospělých členů
      </div>
      <div>
        <p>
          Skauti v Třebíči působí od roku 1923, kdy byl založen první chlapecký oddíl pod vedením Antonína Hobzy přezdívaného Srdíčko. Podle něj bylo později pojmenováno celé středisko, které bylo oficiálně založeno v roce 1938 a v té době mělo osm oddílů.
          Dnes už má středisko oddílů dvanáct. Dohromady má celé středisko kolem 350 členů. Nechybí v něm oddíly chlapecké i dívčí, smíšené, oddíl benjamínků (předškolních dětí), nebo oddíl oldskautů (dospělých členů).
        </p>
      </div>
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

.heading  {
  font-family: "skautbold" !important;
  font-size: 1.9rem !important;
  margin: 10px 0px;
}

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
