<template>
  <v-container grid-list-xs class="main-center-limitwidth">  
    <h1 class="mb-0">Stavba nové klubovny</h1>
    <v-divider class="mb-5"></v-divider>
    <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <div class="subheading">
        {{section.title}}
      </div>
      <div v-for="(paragraph, paragraphIndex) in section.paragraphs" :key="paragraphIndex">
        <p>{{paragraph}}</p>
      </div>
      <vue-picture-swipe :items="section.images"></vue-picture-swipe>
    </div>
    <v-divider class="mt-2 mb-7"></v-divider>
  </v-container>
</template>

<script>

export default {
  name: 'Klubovna',

  

  data() {
    return {
    //   value: 12,
    //   percent: 60,
    //   show: true,
    //   interval: 0,
    //   images: [
    //   'https://placem.at/places?w=800&h=800&random=1',
    //   'https://placem.at/places?w=800&h=600&random=1',
    //   'https://placem.at/places?w=1200&h=400&random=2',
    //   'https://placem.at/places?w=800&h=800&random=3',
    //   'https://placem.at/places?w=600&h=800&random=4',
    //   'https://placem.at/places?w=400&h=800&random=5',
    //   'https://placem.at/places?w=800&h=800&random=6',
    //   'https://placem.at/places?w=800&h=800&random=7',
    //   'https://placem.at/places?w=800&h=800&random=8',
    //   'https://placem.at/places?w=800&h=800&random=9',
    //   'https://placem.at/places?w=800&h=800&random=10'
    // ],
    // images2: [
    //   'https://placekitten.com/801/800',
    //   'https://placekitten.com/802/800',
    //   'https://placekitten.com/803/800',
    //   'https://placekitten.com/804/800',
    //   'https://placekitten.com/805/800',
    //   'https://placekitten.com/806/800',
    //   'https://placekitten.com/807/800',
    //   'https://placekitten.com/808/800',
    //   'https://placekitten.com/809/800',
    //   'https://placekitten.com/810/800'
    // ],
    // index: null,
    // index2: null,
    items: [{
          src: 'http://via.placeholder.com/600x400',
          thumbnail: 'http://via.placeholder.com/64x64',
          w: 600,
          h: 400,
          alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
        },
        {
          src: 'http://via.placeholder.com/1200x900',
          thumbnail: 'http://via.placeholder.com/64x64',
          w: 1200,
          h: 900,
          alt: '22222 numbers on a grey background',
          title: 'titlesss'
        }
      ],
    sections: [
      {
        title: "Skauti v Třebíči mají kolem 300 dětí a 50 dospělých členů",
        paragraphs: [
          "Skauti v Třebíči působí od roku 1923, kdy byl založen první chlapecký oddíl pod vedením Antonína Hobzy přezdívaného Srdíčko. Podle něj bylo později pojmenováno celé středisko, které bylo oficiálně založeno v roce 1939 (tehdy se ještě nejmenovalo Srdíčko) a v té době mělo osm oddílů.",
          "Dnes už má středisko oddílů dvanáct. Dohromady má celé středisko kolem 350 členů. Nechybí v něm oddíly chlapecké i dívčí, smíšené, oddíl benjamínků (předškolních dětí), nebo oddíl oldskautů (dospělých členů).",
        ],
        images: [
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/DSC_0112_01_b85c9b40b2.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/small_DSC_0112_01_b85c9b40b2.jpg',w: 4496, h: 3000, title:'My alt text'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_DSC_0578_92635078f3.jpg",thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/thumbnail_DSC_0578_92635078f3.jpg',w: 1200, h: 900, title:'My 2 text'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_DSC_0582_9907872ef6.jpg",thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/thumbnail_DSC_0112_01_b85c9b40b2.jpg',w: 1200, h: 900, title:'My 3 text'},
          // {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_u_javora_1958_b675279f1d.jpg",},
          // {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_Scan19_ae8685a732.jpg",},
          // {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_18359456_177757556082971_7221119800253454159_o_95c1818785.jpg",},
          // {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_43236090_442469869611737_7622921438290247680_o_5184ac6a69.jpg",},
          // {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/large_Scan3_d1865c31a7.jpg"},
        ],
        index: null,
      }

    ]
    }
  },

  computed: {
    currentPosition() {
      return this.percent - 5;
    }
  },

};
</script>

<style>

.subheading  {
  font-family: "skautbold" !important;
  font-size: 1.5rem !important;
  margin-bottom: 0.5rem;
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

.labels {
  position: relative;
}

.zero {

}

.current  {
  position: absolute;
  
}

.target {

}


</style>
