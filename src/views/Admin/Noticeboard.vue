<template>
  <v-container grid-list-xs class="py-8">
    <h1>Nástěnka</h1>
    <v-row justify="space-around">
      <v-col cols="12" md="6" class="px-200">
        <v-card
          elevation="4"
          class="pa-4 mb-5"
          >
            <div >          
              <h2>Implementované funkce</h2>          
              <v-card
                v-for="(item, index) in features.done" :key="index"
                elevation="2"
                class="my-1"
              >
                <v-card-subtitle>
                  <span> ✔️  {{item.popis}} ({{getDate(item.updatedAt)}})</span>
                </v-card-subtitle>
              </v-card>

              <br>

              <h2>Plánované funkce</h2>          
              <v-card
                v-for="(item, index) in features.notdone" :key="index"
                elevation="2"
                class="my-1"
              >
                <v-card-subtitle>
                  <span> ❌  {{item.popis}}</span>
                </v-card-subtitle>
              </v-card>
            </div>
        </v-card>
      </v-col>


      <v-col cols="12" md="6">
        <v-card
          elevation="4"
          class="pa-4 mb-5"
          >
          <h2>Instruktážní video</h2>
          <p>
            V tomto videu najdete všechny základní funkce týkající se skautského webu. 
          </p>
          <section class="video-container">
            <iframe class="video" src="https://www.youtube.com/embed/SBjQ9tuuTJQ" frameborder="0" height="200px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> 
          </section>
        </v-card>
        <v-card
          elevation="4"
          class="pa-4 my-5"
          >
          <h2>Administrátor</h2>
          <v-card-subtitle>
            Tyto webové stránky vytvořil Dominik Jašek (Šíša). V případě jakýchkoliv dotazů mě kontaktujte.
          </v-card-subtitle>
          <v-card-actions>
            <div>
              <v-btn icon href='https://www.facebook.com/dominikjasekk'>
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>
          
            <div>
              <v-btn icon>
                <v-icon class="ml-1 mr-3">mdi-phone</v-icon>
                732 181 317
              </v-btn>
            </div>
          
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Noticeboard",

  data() {
    return {
      features: {
        done: [],
        notdone: []
      },
    }
  },

  methods: {
    getDate(updatedAt)  {
      const date = new Date(updatedAt);
      return date.toLocaleDateString('cs-CS');
    }
  },

  created() {
    axios.get("/features").then((res) => {
      console.log("features", res.data);
      res.data.forEach(f => {
        if (f.done) {
          this.features.done.push(f);
        }
        else {
          this.features.notdone.push(f);
        }
      });
    })
  }
};
</script>

<style scoped>
h1  {
  font-family: "skautbold";
  font-size: 2.5rem;
}

.crossed {
  text-decoration: line-through;
  color:black;
  font-size: 16px;
}

.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
