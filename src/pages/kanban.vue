<template>
    <div class="kanbanWindow" v-if="rendComponent" >
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
        <draggable :list="buckets" :animation="200" group="bucket" ghost-class="ghost" item-key="id" @start="drag=true"  @end="endBucketDrag" class="kanbanBoard" :move="checkMove">
          <template #item="{element}" class="kanbanBucketArea">
            <div>
              <kanbanBucket :bucketData="element" @deleteBucket="deleteBucket"/>
            </div>
          </template>
        </draggable>
        <div class="addKanbanBoardButton">
          <span class="material-icons" @click="addBucket">add</span>
        </div>
      </div>
      </div>
    </div>
</template>
  
  <script setup>
  import mainSidebar from '~/components/mainSidebar.vue'
  import kanbanBucket from '~/components/kanbanBucket.vue'
  import { emit, listen } from '@tauri-apps/api/event'
  import { getBuckets, updateBuckets } from '@/utils/tauriStoreAPI'
  import { Store } from "tauri-plugin-store-api";
import draggable from 'vuedraggable'


  var buckets= [];
  var bucketNames =  [];
  var draggedBucket = {}
  const rendComponent = ref(true);

  
  onMounted(async () => {
      let result =  await getBuckets();
      buckets = result;
      console.log(buckets);
      updateBucketNames();
      triggerRender();
    })

    

  function openURL (url) {
        window.open(url);
      }

  async function addBucket() {
        //get highest current id of buckets and highest position
        let highID =  0;
        var highPos = 0;
        if(buckets.length != 0) {
          console.log("Inside");
          for (const bucket of buckets) {
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

        buckets.push({id: highID, name: 'New Bucket', position: highPos});
        await updateBuckets(buckets);
        updateBucketNames();
        console.log(buckets);
        await triggerRender();
        return true;
      }

  async function deleteBucket(bucketId) {
        buckets = buckets.filter(function(bucket) {
          return bucket.id != bucketId;
        })

        //update positions and store
        updateBucketPosition();

        await updateBuckets(buckets);
        await triggerRender();
        return true;
      }

  function updateBucketNames() {
        let names = []
        for (const bucket of buckets) {
          names.push(bucket['name'])
        }
        bucketNames = names;
        return true;
    }

    const triggerRender = async () => {
        // Here, we'll remove MyComponent
        rendComponent.value = false;

        // Then, wait for the change to get flushed to the DOM
        await nextTick();

        // Add MyComponent back in
        rendComponent.value = true;
      };

 function orderBucketsByPosition() {
        buckets = buckets.sort(function(a, b) { 
        return a.position - b.position;
        })
      }

 async function checkMove(e) {
       console.log("Dragging " + e);

    }


 async function endBucketDrag(e) {
        console.log("Dropped");
      await triggerRender();
      console.log(buckets);
      updateBucketPosition();
      await updateBuckets(buckets);
 }


 function updateBucketPosition() {
  for(let i = 0;i<buckets.length;i++) {
    buckets.at(i).position = i+1;
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
      .list-move {
          transition: all 0.5s ease;
      }

      .ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

      .kanbanBucketArea {
  flex-grow: 0;     /* do not grow   - initial value: 0 */
  flex-shrink: 0;   /* do not shrink - initial value: 1 */
  flex-basis: 16rem; /* width/height  - initial value: auto */
  overflow-wrap: anywhere;
}

  
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
  

  
  </css>