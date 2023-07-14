<template>
    <div class="kanbanWindow">
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
      <div class="kanbanPage">
        <div class="kanbanHeader">
          <h2>Kanban Board</h2>
        </div>
        <div class="kanbanBoard">
          <div v-for="item in buckets" :key="item" class="kanbanBucketArea">
            <kanbanBucket :bucketData="item" />
          </div>
          <div class="addKanbanBoardButton">
            <span class="material-icons" @click="addBucket">add</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mainSidebar from '~/components/mainSidebar.vue'
  import kanbanBucket from '~/components/kanbanBucket.vue'
  import { emit, listen } from '@tauri-apps/api/event'
  import { getBuckets, updateBuckets } from '@/utils/tauriStoreAPI'
  import { Store } from "tauri-plugin-store-api";


  export default {
  
    name: 'KanbanBoard',
    components: {
      // SystemInformation
      mainSidebar,
      kanbanBucket
    },

    data () {
        
      return {
        //kanbanTestItems: ['Input', 'ToDo', 'Done'],
        buckets: [],
        bucketNames: [],
        status: false,
      }
    },
  
    async mounted () {
      let result =  await getBuckets();
      this.buckets = result;
      this.updateBucketNames();
    },

    
    async created () {

    },

    methods: {
      openURL (url) {
        window.open(url);
      },

      async addBucket() {
        //get highest current id of buckets and highest position
        let highID =  0;
        var highPos = 0;
        if(this.buckets.length != 0) {
          console.log("Inside");
          for (const bucket of this.buckets) {
            if(bucket['position']> highPos) {
              highPos = bucket['position']
            }
            if(bucket['id']>highID) {
              highID = bucket['id']
            }
          }
        }
        console.log(highID);
        console.log(highPos);
        //Add One to HighID
        highID= highID + 1;
        highPos= highPos + 1;

        this.buckets.push({id: highID, name: 'New Bucket', position: highPos});
        await updateBuckets(this.buckets);
        this.updateBucketNames();
        console.log(this.buckets);
        await this.triggerRender();
        return true;
      },

      async deleteBucket(bucketId) {
        this.buckets = this.buckets.filter(function(bucket) {
          return bucket.id != bucketId;
        })
        await updateBuckets(this.buckets);
        await this.triggerRender();
        return true;
      },

      updateBucketNames() {
        let names = []
        for (const bucket of this.buckets) {
          names.push(bucket['name'])
        }
        this.bucketNames = names;
        return true;
    }, 

    triggerRender(){
        this.$forceUpdate();
      }
  }

}
  </script>
  
  <css lang="scss">
  @import "../assets/global.scss";
  
  .kanbanWindow {
      display: flex;
  }
  
  .kanbanPage {
  display: flex;
  flex-direction:column;
  padding-left: 5rem;
  
  }
  
  .kanbanHeader {
      color: var(--hoverButton);
      font-size: 1.5rem;
      column-gap: 2rem;
      padding: 1rem;
  }
  
  .kanbanBoard {
      display: flex;
      flex-direction: row;
      display: flex;
      column-gap: 3rem;
      color: var(--light);
      padding-top: 1.5rem;
  
      .addKanbanBoardButton {
        .material-icons {
          font-size:2rem;
        }
  
        height: 10%;
        cursor: pointer;
      }
  
      .addKanbanBoardButton:hover {
        color: var(--blue)
      }
  }
  
  .window {
      color: var(--light)
  }
  
  .kanbanBucketArea {
  flex-grow: 0;     /* do not grow   - initial value: 0 */
  flex-shrink: 0;   /* do not shrink - initial value: 1 */
  flex-basis: 16rem; /* width/height  - initial value: auto */
  overflow-wrap: anywhere;
  }
  
  </css>