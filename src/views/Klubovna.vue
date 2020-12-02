<template>
  <v-container grid-list-xs>  
    <h1 class="mb-0">Stavba nové klubovny</h1>
    <v-divider class="mb-5"></v-divider>
    <div>
      <div class="subheading">
        Skauti v Třebíči mají kolem 300 dětí a 50 dospělých členů
      </div>
      <div>
        <p>
          Skauti v Třebíči působí od roku 1923, kdy byl založen první chlapecký oddíl pod vedením Antonína Hobzy přezdívaného Srdíčko. Podle něj bylo později pojmenováno celé středisko, které bylo oficiálně založeno v roce 1938 a v té době mělo osm oddílů.
          Dnes už má středisko oddílů dvanáct. Dohromady má celé středisko kolem 350 členů. Nechybí v něm oddíly chlapecké i dívčí, smíšené, oddíl benjamínků (předškolních dětí), nebo oddíl oldskautů (dospělých členů).
        </p>
      </div>
      <img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
      <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
    </div>
    <v-divider class="mt-2 mb-7"></v-divider>

    <div>
      <div class="subheading">
        Stará klubovna na Ruské
      </div>
      <div>
        <p>
          Klubovna na Ruské ulici byla Třebíčských skautů od roku ….. Původně sloužila jako …… S narůstajícími oddíly a rozmachem skautingu začala být původní budova pro naše potřeby nedostatečná. Velmi špatný byl i její stav, kdy dokonce byla označena jako staticky nebezpečná. Nosná konstrukce klubovny byla ze dřeva, které vlivem stáří bylo často prohnilé.
        </p>
      </div>
      <img class="image" v-for="(image, i) in images2" :src="image" :key="i" @click="index2 = i">
      <vue-gallery-slideshow :images="images2" :index="index2" @close="index2 = null"></vue-gallery-slideshow>
    </div>
    <v-divider class="mt-2 mb-7"></v-divider>

    <!-- <div>
      <div class="subheading">
        Příprava nového projektu a začátek realizace
      </div>
      <div>
        <p>
          První návrhy a zpracování projektu nové klubovny začalo v roce …. Od té doby prošel návrh mnoha změnami, protože i potřeba jednotlivých oddílů se v průběhu těchto let měnila. Nakonec byla schválena konečná varianta, kterou vypracoval Radek Holík – Cvrček a s architektonických zpracováním mu pomohl Přemysl Zhoř – Harry. Od města jsme odkoupili pozemek na kterém klubovna stála a celý velký projekt začal!
        </p>
      </div>
      <img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
      <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
    </div>
    <v-divider class="mt-2 mb-7"></v-divider> -->

    <!-- <div>
      <div class="subheading">
        Stavba klubovny
      </div>
      <div>
        <p>
          Od začátku roku 2020 intenzivně probíhá výstavba klubovny. Na začátku bylo třeba vyztužit původní základovou desku budovy a rozšířit půdorysný tvar objektu. Následovala celá hrubá stavba – vyzdívání nosných zdí obou pater, stropy z betonových panelů, plochá střecha, vnitřní příčky, kanalizace, rozvod vody, elektroinstalace a osazení oken. Do konce roku budou hotové vnitřní omítky a hrubé podlahy.
          V roce 2021 nás čeká ještě spousta práce. Mezi hlavní patří zateplení objektu a povrchová úprava fasády, vnitřní a vnější dveře, rozvod topení, dokončení podlah a elektroinstalací.
          Stavbu zajišťuje, organizuje a máme brigády.
        </p>
      </div>
      <img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
      <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
    </div>
    <v-divider class="mt-2 mb-7"></v-divider>

    <div>
      <div class="subheading">
        Financování klubovny
      </div>
      <div>
        <p>
          Nová klubovna není kvůli své velikosti malým peněžním soustem. Celá výstavba byla rozpočtována asi za 11 miliónů korun. Po vstřícném jednání s městem Třebíč jsme dostali od města dar tři milióny korun. Dále máme značkou podporu i jiných dárců. V neposlední řadě nás finančně podpořili i mnozí rodičové při registracích prostřednictvím donátorských kategorií. I třebíčské farnosti se rozhodli podpořit náš projekt skrze kostelní sbírky.
          V současné chvíli dle našich odhadů chybí 1,5 milionu. Jsme velmi vděční za vaše dary a důvěru. Jestli máte zájem podpořit nás ještě více, můžete tak učinit na <a target="_blank" href="https://ib.fio.cz/ib/transparent?a=2101617105">transparentní účet</a> 2101617105/2010.
          Chcete-li nám poskytnout finanční dar a máte zájem o sepsání Darovací smlouvy, prosíme, kontaktujte nás na e-mailu junak.srdicko@skaut.cz nebo na tel. 739 563 274.
        </p>
      </div>
      <img class="image" v-for="(image, i) in images" :src="image" :key="i" @click="index = i">
      <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
    </div>
    <v-divider class="mt-2 mb-7"></v-divider> -->

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
    images2: [
      'https://placekitten.com/801/800',
      'https://placekitten.com/802/800',
      'https://placekitten.com/803/800',
      'https://placekitten.com/804/800',
      'https://placekitten.com/805/800',
      'https://placekitten.com/806/800',
      'https://placekitten.com/807/800',
      'https://placekitten.com/808/800',
      'https://placekitten.com/809/800',
      'https://placekitten.com/810/800'
    ],
    index: null,
    index2: null,
    }
  },

  components: {
    VueGallerySlideshow
  },
};
</script>

<style>

.subheading  {
  font-family: "skautbold" !important;
  font-size: 1.5rem !important;
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
