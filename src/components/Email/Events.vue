<template>
  <div>
    <v-card-title primary-title class="mb-0 pb-0"> Filtrovat: </v-card-title>
    <v-card-text class="mt-0 pt-0">
      <v-row>
        <v-col cols="12" sm="12" lg="6">
          <!-- tags -->
          <v-chip-group v-model="selectedOddils" multiple column>
            <v-chip
              filter
              outlined
              v-for="(item, index) in oddilyTags"
              :key="index"
            >
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <!-- email -->
          <v-text-field
            label="Email příjemce"
            color="primary"
            class="ma-0 pa-0"
            v-model="email"  
            :error="errorMessage != ''"          
            :error-messages="errorMessage"
            @keypress.enter="searchByEmail"
          >
            <template v-slot:append>
              <v-btn depressed tile color="primary" class="ma-0" @click="searchByEmail">
                <v-icon class="ma-0 pa-0">mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <!-- date picker -->
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            class="mb-1 pa-0"
            max-width="290px"
            min-width="290px"
            @input="dateUpdated"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Začátek a konec"
                readonly
                class="mb-0 pa-0"
                prepend-icon="mdi-calendar"
                :value="dates"
                v-on="on"
              ></v-text-field>
            </template>
            <!-- /TODO: maximalni rozpeti musi byt 1 mesic -->
             <v-date-picker  
              locale="cs-in"
              :min="minDate"
              :max="maxDate"
              v-model="dates"
              range
              no-title
              @input="fromDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

    <v-divider class="mb-5"></v-divider>

    <!---------------------------- SAMOTNE REPORTY EMAILY --------------------------------->

    <TableReport v-if="reportComplete" :reports="reports" />


    </v-card-text>
  </div>
</template>

<script>
import axios from "axios";
import TableReport from "@/components/Email/TableReport";


export default {
  name: "Events",

  data() {
    return {
      oddilyTags: [
        "vlčata",
        "světlušky",
        "skauti",
        "skautky",
        "roveři",
        "oldskauti",
      ],
      selectedOddils: [0, 1, 2, 3, 4, 5],

      email: "",
      errorMessage:"",

      dates: [null, null],

      minDate: "2020-10-04",
      maxDate: null,
      dateUpdatedFlag: false,

      reports: [],
      reportComplete: false,
    };
  },

  computed: {
    today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },

    get10DaysAgo() {
      let daysAgo = new Date(); //today
      daysAgo.setDate(daysAgo.getDate() - 10);
      let dd = String(daysAgo.getDate()).padStart(2, "0");
      let mm = String(daysAgo.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = daysAgo.getFullYear();

      daysAgo = yyyy + "-" + mm + "-" + dd;
      return daysAgo;
    },    
  },

  methods: {
    getTemplateIDs() {
      return new Promise((resolve, reject) =>  {
        let IDs = [];
        this.$store.getters.getOddily
          .then((oddily) => {
            this.selectedOddils.forEach((element) => {
              oddily.forEach(oddil => {
                if (oddil.nazev == this.oddilyTags[element])  {
                  IDs.push(oddil.sendinblue_templateID);
                }
              })
            });
            console.log("returning these sendinblue_templateIDs", IDs);
            resolve(IDs);
          })
          .catch(e => {
            console.error(e);
            reject(e);
          })
        })
    },

    searchByEmail() {
      console.log("searching by email");
      this.getSelectedOddilsReport()
        .then(() =>  {
          // if (response == undefined) {
          //   throw 'No existing report!';
          // }
          console.log("yahooo, we found some reports by email");          
        })
        .catch((e) => {
          console.log("shame on you, there isnt any report for this email", e);
          this.errorMessage = e;
        })
    },

    dateUpdated() {
      if (this.dateUpdatedFlag) {
        console.log("date updated, refreshing reports");
        this.getSelectedOddilsReport();
        this.dateUpdatedFlag = false;
      }
    },

    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },

    sortByDate()  {
      console.log("sorting reports by date", this.reports);
      this.reports.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
    },

    async getSelectedOddilsReport() {
      this.reports = [];
      this.reportComplete = false;
      let selected_IDs = await this.getTemplateIDs();
      console.log("received selected_IDs", selected_IDs);
      selected_IDs.forEach((id, index) => {
        const templateReport = this.getTemplateReport(id)
        templateReport.then((res) =>  {
          console.log("received new report for id " + id + " ...", res);
          this.reports.push(...res);
          if (index === selected_IDs.length - 1){ 
            this.sortByDate();
            this.reportComplete = true;
          }
        });         
      });
    },

    getTemplateReport(templateID) {
      return new Promise((resolve, reject) =>  {
        axios.get(
            "/email-template-report?templateID=" +
              templateID +
              "&email=" +
              this.email +
              "&startDate=" +
              this.dates[0] +
              "&endDate=" +
              this.dates[1]
          )
          .then((res) => {
            // this.reports=[];
            // console.log("received a response for email events", res);
            this.errorMessage = "";
            if (res.data.transactionalEmails)  { //if not empty
              resolve(res.data.transactionalEmails);
            }
            else  {
              resolve([]);
            }
          })
          .catch((e) => {
            this.reports=[];
            console.log("error while loading event report", e);
            reject('Neplatný formát emailu');
          });
      });
    },
  },

  watch: {
    dates: function () {
      this.dateUpdatedFlag = true;
    },

    selectedOddils: function()  {
      this.getSelectedOddilsReport();
    }
  },

  created() {
    this.dates[0] = this.get10DaysAgo;
    this.dates[1] = this.today;
    this.maxDate = this.today;
    this.getSelectedOddilsReport();
  },

  components: {
    TableReport
  }
};
</script>

<style>
.cardTitle {
  font-family: "themix";
}

</style>
