<template>
    <div class="window">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Icons"
        rel="stylesheet"
      >
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet">
      <div class="sidebar">
        <mainSidebar />
      </div>
      <div class="IndexPage">
        <div class="chart">
          <apexchart :key="series" width="500" height="100" type="bar" :options="options" :series="series"></apexchart >
        </div>
        <!-- <div class="comingSoonHeader">
          <div class="constLogo">
            <span class="material-icons">engineering</span>
          </div>
          <h1>Coming Soon</h1>
        </div>
        <div class="boxText">
          <div class="boxBoarder">
            <div class="textInBox">
              <p>This site is under contruction. Idea:  Start Dashboard </p>
            </div>
          </div>
        </div> -->

      </div>
    </div>
  </template>
  
  <script setup>
  // import SystemInformation from '@/components/SystemInformation.vue'
  import mainSidebar from '~/components/mainSidebar.vue';
  import { VueApexCharts } from "vue3-apexcharts";

  var options = {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    }


    var series = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]


//   export default {
  
//     name: 'IndexPage',
//     components: {
//     // SystemInformation
//     mainSidebar,
//     VueApexCharts,
    

// },
//     data () {
//       return {
//         el: '#appl',
//         externalContent: '',
//         options: {
//         chart: {
//           id: 'vuechart-example'
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
//         }
//       },
//       series: [{
//         name: 'series-1',
//         data: [30, 40, 45, 50, 49, 60, 70, 91]
//       }]
//       }
//     },
//     methods: {
//       openURL (url) {
//         window.open(url)
//       }
//     }
//   }
  </script>
  
  <style lang="scss">
  @import "../assets/global.scss";
  
  .window {
    display:flex;
  }
  
  .IndexPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  flex-direction: column;
  
    .chart {
      background-color: white;
    }

    .comingSoonHeader {
      font-size: 2rem;
      padding-bottom: 5rem;
      color: var(--light);
  
        .material-icons {
          padding-left: 10rem;
          font-size: 6rem;
          color: var(--light);
          margin-right: 1rem;
  
        }
    }
  
    .boxBoarder {
  
      .textInBox {
        color: var(--light);
        font-size: 1.5rem;
        padding: 2rem;
      }
  
      border: 0.15rem solid;
      border-color: var(--hoverButton)
    }
  
  }
  
  </style>