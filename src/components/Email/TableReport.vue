<template>
  <div>
    <v-data-table
      item-key="name" loading-text="Načítám emaily..."
      :headers="headers"
      :items="reports"
      loader-height="6"
      disable-sort
      class="elevation-3 row-pointer" 
      :items-per-page="25"
      :footer-props="{
        'showFirstLastPage': true,
        'items-per-page-text':'Záznamů na stránku',
        'items-per-page-all-text': 'Vše',
        'items-per-page-options': [10,25,50,100],
        'show-current-page': true,
      }"
      @click:row="handleClick"
    >
      <template v-slot:[`item.date`]="{ item }">
        {{printableDate(item.date)}}
      </template>
      <template v-slot:[`item.oddil`]="{ item }">
        {{idToOddil(item.templateId)}}
      </template>
      <template v-slot:[`footer.page-text`]="{ pageStart, pageStop , itemsLength}">
        {{ pageStart }} - {{ pageStop }} z {{itemsLength}}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "TableReport",

  data() {
    return {
      headers: [
        { text: "Datum", value: "date" },
        { text: "Předmět", value: "subject" ,},
        { text: "Od", value: "from"},
        { text: "Komu", value: "email" , },
        { text: "Oddíl", value: "oddil"},
      ],

      oddily: [],
    };
  },

  props: ["reports"],

  methods: {
    handleClick(par)  {
      console.log("row clicked", par)
    },

    idToOddil(id)  {     
      let nazev = ""; 
      this.oddily.forEach((oddil) => {
        if (oddil.sendinblue_templateID == id) {
          // console.log("yahooo found corresponding nazev:", oddil.nazev);
          nazev = oddil.nazev;
        }
      });
      return nazev;
    },

    getOddily() {
      return this.$store.getters.getOddily;
    },

    translatedEvent(event) {
      // console.log("finding translation for event " + event);
      let translated = this.events[event.toString()].translation;
      if (translated) {
        return translated;
      } else return event;
    },

    chipColor(event) {
      // console.log("finding color for event " + event);
      let translated = this.events[event.toString()].color;
      if (translated) {
        return translated;
      } else return "primary";
    },

    printableDate(date) {
      // console.log("printableDate");
      date = new Date(date);
      return (
        date.toLocaleDateString("cs-CS") +
        "; " +
        date.toLocaleTimeString("cs-CS")
      );
    },
  },

  created() {
    // console.log("TableEvenets components, reports:", this.reports);
    this.getOddily().then((oddily) =>  {
      // console.log("oddily from graphql", oddily);
      this.oddily = oddily;
    })
  },

  computed: {},
};
</script>

<style>
.row-pointer tbody:hover {
  cursor: pointer;
}
</style>
