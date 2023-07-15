<template>
    <div class="kanbanBucket">
      <div class="kanbanBucketProdArea">
        <div class="bucketHeaderArea">
          <div class="bucketHeader">
            <h3>
            {{ bucketData.name }}
            </h3>
          </div>
          <div class="bucketDeleteBtnArea">
            <span class="material-icons" @click="deleteBucket">close</span>
          </div>
        </div>
        <div class="bucketBodyArea">
          <div class="kanbanTaskList">
            <div v-for="item in tasks" :key="item" class="kanbanTaskArea">
              <kanbanTask :taskData="item" />
            </div>
          </div>
          <div class="kanbanAddTaskArea" @click="AddTask">
            <div class="iconArea">
              <span class="material-icons">add</span>
            </div>
            <div class="textarea">
              Add Task
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  import kanbanTask from './kanbanTask.vue'
  import {getTasksOfBucket, updateTasksOfBucket  } from '@/utils/tauriStoreAPI'
  
  export default {
  
    components: {
      kanbanTask
    },
    props: {
      bucketData: {}
    },
    data () {
      return {
        //taskTestItems: ['First Input', 'Second Input', 'Extraordinary long long long input']
      tasks: [],
      taskTitles: []
      }
    },

    async mounted() {
      //Getting Tasks from Storage
      console.log("stuff")
      let res = await getTasksOfBucket(this.bucketData.id);
      if(res != null ) {
        this.tasks = res;
      }

      this.updateTaskTitles();
    },



    methods: {
      async deleteBucket() {
        console.log("Hello");
        this.$parent.deleteBucket(this.bucketData.id);
      },


      async AddTask() {
        let taskPos = 0;
        if(this.tasks.length != 0) {
          for(const task of this.tasks) {
            if(task['position'] > taskPos) {
              taskPos = task['position']
            }
          }
        }
          //add one
          taskPos = taskPos +1;

          //
          this.tasks.push({position: taskPos, title: "This is a task in " + this.bucketData.id , bucket: this.bucketData.id})

          console.log(this.tasks);

          //update
          await updateTasksOfBucket(this.bucketData.id, this.tasks);

          this.updateTaskTitles();

          this.triggerRender();

          return true;

      },

      updateTaskTitles() {

        let titles = []
        for (const task of this.tasks) {
          titles.push(task['title'])
        }
        this.taskTitles = titles;
        return true;
      },

      triggerRender(){
        this.$forceUpdate();
      }



    }
  
  }
  
  </script>
  
  <style lang="scss">
  @import "../assets/global.scss";
  
  .kanbanBucket {
      display:flex;
      flex-direction: column;
      background-color: var(--dark);
      border-radius: 0.75rem;
      row-gap: 1rem;
  
      .bucketHeaderArea {
  
          font-size: 1rem;
          font-weight: bold;
          padding-bottom: 0.75rem;
          display: flex;

          .bucketDeleteBtnArea {
            display:flex;
            font-size: 0.8rem;
            margin-left:auto;
    
            .material-icons {
              font-size: 1.1rem;
            }
    
            .material-icons:hover {
              color: var(--blue);
              cursor:pointer;
          }
        }
  
      }

  
  
      .kanbanBucketProdArea {
          padding: 1rem;
      }
  
      .bucketBodyArea {
        display:flex;
        flex-direction: column;
        row-gap: 1rem;
      }
  
      .kanbanTaskList {
        display:flex;
        flex-direction: column;
        row-gap: 1rem;
      }
  
      .kanbanAddTaskArea:hover {
        cursor:pointer;
      }
  
      .kanbanAddTaskArea {
        display: flex;
        flex-direction: row;
        //column-gap: 0.5rem;
  
        .textarea {
          padding-top: 0.1rem;
          padding-left: 1rem;
        }
  
        .iconArea {
          padding-top: 0.09rem;
          display:flex;
  
          .material-icons {
            font-size: 1.3rem;
          }
  
        }
  
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 0.5rem;
        width: 80%;
  
      }
  
      .kanbanAddTaskArea:hover {
          background-color: var(--lighterGrey);
        }
  
  }
  
  </style>