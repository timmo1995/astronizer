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
        <div class="row">
          <div class="chartBox" v-if="fetchFlag">
            <h2>Task Bucket Assignment</h2>
            <apexchart class="topLeftChart" width="400" height="400" :key="stuff"  type="donut" :options="optionsTopLeftChart"  :series="stuff"></apexchart >
          </div>
          <div class="chartBox" v-if="fetchFlag">
            <h2 class="taskColorAssignmentHeader">Task Color Assignement</h2>
            <apexchart type="bar" height="350" width="650" :options="chartOptionsTopRight" :series="topRightExampleSeries"></apexchart >
          </div>
        </div>
        <div class="row">
          <div class="chartBox" v-if="fetchFlag">
            <h2>Tasks Trend Last 30 Working Days</h2>
            <apexchart class="topRightChart" width="800" height="350" type="line" :options="chartOptionsBottomLeft" :series="bottomLeftSeries"></apexchart >
          </div>
          <div class="todaysTaskBox">
            <h2 class="todaysTaskHeader">Tasks For Today</h2>
            <div v-for="item in itemsWithNextDueDate">
              <div class="taskForToday">
                {{ item }}  
              </div>    
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>

  import mainSidebar from '~/components/mainSidebar.vue';
  import { VueApexCharts } from "vue3-apexcharts";
  import { getBuckets, getHistory } from '@/utils/tauriStoreAPI'

var stuff = ref([])
stuff.value =  []
var buckets = ref([])
var fetchFlag = ref(false)
fetchFlag.value = true
var itemsWithNextDueDate = ref(true)
itemsWithNextDueDate.value = []

const COLORS = {
    lighterGrey: '#2c2c2c',
    orange: '#FFA500',
    red: '#ff0000',
    darkBlue: '#00039b',
    blue: '#3a36fa',
    green: '#006400',
}



buckets.value = await getBuckets();




var optionsTopLeftChart  = {
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true
                      }
                    }
                  }
                },
                labels: [],
                chart: {

                  foreColor: '#f1f5f9'
                },
                legend: {
                  position: 'bottom',
                  fontSize: '20px',
                }
              }



//ToDo: Tooltip Hover does not show any Info in a few diagrams
var  chartOptionsTopRight = {

            chart: {
              
              type: 'bar',
              hight: 550,
              foreColor: '#f1f5f9'
            },
            plotOptions: {
              bar: {
                distributed: true,
                borderRadius: 4,
                horizontal: true,
              }
            },
            xaxis: {
              categories: [],
               labels: {
                show: true,
                style: {
                  
                  fontSize: '17px',
                },
                offsetY: 7,
              }
              
            },
            yaxis: {
              categories: [],
               labels: {
                show: true,
                style: {
                  
                  fontSize: '17px',
                },
              }
              
            },
            legend: {
                  show:false,
                },

            colors: [],

            tooltip: {
              enabled: true,
              theme: 'dark'
            },
            dataLabels: {
              enabled: true
            },
          }
    
var topRightExampleSeries = [{
        name: "Tasks",
        data: []
        }]


var bottomLeftSeries = [{
              name: "Tasks",
              data: []
          }]


var chartOptionsBottomLeft = {
            chart: {
              foreColor: '#f1f5f9',
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            grid: {
              row: {
                colors: ['#2c2c2c', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: [],
              labels: {
                show:false,
              }
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '17px',
                }
              }
            },
            tooltip: {
              enabled: true,
              theme: 'dark',
             style: {
        fontSize: '12px',
             },
        x: {
          show: true,
      },
      y: {
          formatter: undefined,
          title: 'Hi',
      },
            },
            colors: ['#90EE90']
          }



await getDataForChartTopLeft();
await getDataForChartTopRight();
await getDataForChartBottomLeft();
await getTasksWithDueDate();



onMounted(async () => {
 
    })

async function getDataForChartTopLeft() {
  
  var seriesData  = []
  for(const bucket of buckets.value) {
    let length  = (await getTasksOfBucket(bucket.id)).length
    seriesData.push(length)
    optionsTopLeftChart.labels.push(bucket.name)
  }
 stuff.value = seriesData;
  
}

async function getDataForChartTopRight() {
  //define result dict
  var result = {
    lighterGrey: 0,
    orange: 0,
    red: 0,
    darkBlue: 0,
    blue: 0,
    green: 0,
  }
  for(const bucket of buckets.value) {
    let bucketTasks = await getTasksOfBucket(bucket.id)
    console.log(bucketTasks);
    for(const task of bucketTasks) {
      if(Object.hasOwn(task,'color')) {
        const color = task['color'];
        console.log(color)
        if(Object.hasOwn(result,color)) {
          result[color] = result[color] +1;
        }
      }
    }
  }

  for (const [key, value] of Object.entries(result)) 
  {
    if(value!=0) {
    topRightExampleSeries[0].data.push(value);
    chartOptionsTopRight.xaxis.categories.push(key)
    chartOptionsTopRight.colors.push(COLORS[key])

    }
  }
  console.log(chartOptionsTopRight.colors)

}

async function getDataForChartBottomLeft() {
    var history = await getHistory();
    console.log(history)
    //get todays date
    var todaysDate = new Date();
    var historyDate = new Date(history.lastUpdate)
    if(todaysDate.getDate() != historyDate.getDate() ||
    todaysDate.getMonth() !=  historyDate.getMonth() ||
    todaysDate.getFullYear() != historyDate.getFullYear()) {
      var tasks = await getAllTasks();
      console.log(tasks);
      if(tasks != null && tasks.length != null) {
      history.overallTasks.shift();
      history.overallTasks.push(tasks.length);
      }
      else {
        history.overallTasks.shift();
        
        history.overallTasks.push(0);
      }

      history.lastUpdate = todaysDate;

      //And Save to NVM
      setHistory(history);

    }


    bottomLeftSeries[0].data = history.overallTasks
      for(let i = -29; i <= 0; i++) {
        chartOptionsBottomLeft.xaxis.categories.push(i.toString());
      }
    console.log(chartOptionsBottomLeft.xaxis.categories)
    fetchFlag.value = true; 
}



//ToDo: Make the 2 days as parameter for settings
async function getTasksWithDueDate() {
  let tasks = await getAllTasks();
  let dateNow = new Date();
  let dateThreshold = new Date(dateNow.setDate(dateNow.getDate() + 2));

  tasks  = tasks.filter((task) => new Date(task.dueDate) != null && new Date(task.dueDate) < dateThreshold);

  tasks.sort(function(a,b){
  return new Date(b.dueDate) - new Date(a.dueDate);
});

let result = []
if(tasks.length==0) {
  result.push('No Open Tasks For Today')
}
else if(tasks.length <= 4) {
  for(let task of tasks) {
    result.push(task.title)
  }
}
else {
  for(let i=0;i<4;i++) {
    result.push(tasks.at(i).title)
  }
}
itemsWithNextDueDate.value  = result;

}




  </script>
  
  <style lang="scss">
  @import "../assets/global.scss";
  
  
  .IndexPage {
    display: flex;
  justify-content: top;
  align-items: center;
  flex-basis: 100%;
  flex-direction: column;
  color: var(--light);
  
  .row {

    display: flex;
    height: 50%;
    justify-content: center;
  align-items: center;
  width:100%;
  column-gap: 10%;

  }

  .chartBox {
    display:flex;
    column-width: 100%;
    flex-direction: column;
    text-align: center;
    row-gap: 1rem;
    align-content: center;
    justify-content: center;
    background-color: var(--dark);
    padding: 0.5rem;
    border-radius: 1.2rem;

    .topLeftChart {
      align-items: center;
    }

    .topRightChart {
      align-items: center;
      padding-left: 2rem;
    }

    .taskColorAssignmentHeader {
      text-align: center;
      padding-left: 5rem;
    }
    
}

.todaysTaskBox {

  display:flex;
  border-radius: 1.2rem;
  flex-direction:column;
  text-align: top;
  text-align: center;
  padding: 0.5rem;
  //margin-left: 5rem;
  height: 27rem;
  width: 25rem;
  background-color: var(--dark);
  align-content: center;
  .todaysTaskHeader {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }

  .taskForToday {
    padding: 1.5rem;
    background-color: var(--lighterGrey);
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 1rem;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
   

  }

  .taskForToday:hover {
    cursor: pointer;
    transition: 0.1s ease;
    transform: scale(1.03);
  }

}


  }
  
  </style>