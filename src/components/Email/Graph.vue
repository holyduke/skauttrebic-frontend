
<script>
import axios from "axios";
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,

  props: ["days"],

  data () {
    return {      
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Odesláné emaily',
            backgroundColor: '#003f5c',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',            
            data: [],
            hidden: false,
          },
          {
            label: 'Doručené emaily',
            backgroundColor: '#7a5195',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: false,
          },
          {
            label: 'Otevřené emaily',
            backgroundColor: '#ef5675',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: false,
          },
          {
            label: 'Kliknuto na odkaz v emailu',
            backgroundColor: '#ffa600',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [],
            hidden: true,
          }
        ]
      },
      options: {
        // onClick: function(e, legendItem) {
        //   var index = legendItem.datasetIndex;
        //   // var ci = this.chart;
        //   var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

        //   ci.data.datasets.forEach(function(e, i) {
        //     var meta = ci.getDatasetMeta(i);

        //     if (i !== index) {
        //       if (!alreadyHidden) {
        //         meta.hidden = meta.hidden === null ? !meta.hidden : null;
        //       } else if (meta.hidden === null) {
        //         meta.hidden = true;
        //       }
        //     } else if (i === index) {
        //       meta.hidden = null;
        //     }
        //   });
        //   this.renderChart(this.datacollection, this.options)
        //   // ci.update();
        // },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false,
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  

  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },

    addEmptyDays(reports) {
      const daysInPast = this.days;
      let today = new Date();
      let weekAgo = new Date();
      weekAgo.setDate(today.getDate()-daysInPast)
      // console.log("today", today);
      // console.log("weekAgo", weekAgo);
      console.log("adding empty days to reports for daysinpast",daysInPast, reports);
      let dateLater = today;
      let lastDateNotExisting = false;
      let dateEarlier = null;
      for (let index = 0; index <= daysInPast-1; index++) {
        try {
          console.log("resolving with index ", index ," date", reports[index].date)
          dateEarlier = new Date(reports[index].date);
        } catch (error) {
          console.log("catching exception", error);
          lastDateNotExisting = true;
        }        
        if (lastDateNotExisting || dateLater - dateEarlier > 86400000) { //there is bigger gap than one days = 86400000ms
          var dayBefore = new Date(dateLater.getTime());
          dayBefore.setDate(dateLater.getDate() - 1);
          let emptyDayReport = {
            date: dayBefore.getFullYear() + "-" + (dayBefore.getMonth() + 1) + "-" + dayBefore.getDate()
          }
          if (index == reports.length) { //last item
            reports.push(emptyDayReport);
          }
          else  { //insert into middle of list
            reports.splice(index, 0, emptyDayReport);
          }          
          dateLater = dayBefore;
        }
        else  {
          dateLater = dateEarlier;
        }
        if (reports.length == daysInPast+1) { //we reached the amnount of desired days
          reports.pop();
          break;
        }
      }
      console.log("returning new reports added with empty days", reports);
      return reports
    },

    updateVisibility()  {
      // this.datacollection.controller.getDatasetMeta(1).hidden=true;
      // this.datacollection.update();
      // this.datacollection.datasets.forEach((dataSet, i) => {
      // var meta = this.datacollection.getDatasetMeta(i);

      // meta.hidden = true;
    // });
    },

    updateLabels(reports)  {
      this.datacollection.labels = [];
      console.log("updating labels...");
      reports.forEach(element => {
        const date = new Date(element.date);
        this.datacollection.labels.push(date.toLocaleDateString('cs-CS'));
      });
    },

    getSmtpReport() {
      console.log("getting sent emails");
      axios
        .get("/smtp-report?days=" + this.days)
        .then((res) => {
          console.log("received a response for graph for last ", this.days ," days.", res);
          let reports = res.data.reports;  

          reports = this.addEmptyDays(reports);

          //clear old data
          this.datacollection.datasets.forEach((dataset) => {
            dataset.data = [];
          });

          //set new data
          console.log("setting new data");
          reports.reverse().forEach((report) => {
            this.datacollection.datasets[0].data.push(report.requests);
            this.datacollection.datasets[1].data.push(report.delivered);
            this.datacollection.datasets[2].data.push(report.uniqueOpens);
            this.datacollection.datasets[3].data.push(report.uniqueClicks);
          });

          //update visibility
          this.updateVisibility();
          

          //update date labels
          this.updateLabels(reports);
          this.renderChart(this.datacollection, this.options)
        })
        .catch((e) => {
          console.log("error while loading smtp report", e);
        });
    },
  },

  computed: {
  },  

  watch: { 
    days: function() { // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.getSmtpReport();
    },

    datacollection() {
      console.log("datacollection changed");
      this.$data._chart.update()
    }
  },

  created() {
    this.getSmtpReport();
  },

  components: {
    // GChart,
  },
};
</script>

<style scoped>
</style>
