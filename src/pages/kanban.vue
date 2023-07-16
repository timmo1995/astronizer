<template>
    <div class="kanbanWindow" v-if="renderComponent">
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
            <kanbanBucket :bucketData="item" draggable="true" @dragstart="startDragBucket($event,item)" @dragenter="onDragEnterBucket($event,item)" @deleteBucket="deleteBucket"/>
          </div>
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

  var buckets= [];
  var bucketNames =  [];
  var draggedBucket = {}
  const renderComponent = ref(true);

  
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
        renderComponent.value = false;

        // Then, wait for the change to get flushed to the DOM
        await nextTick();

        // Add MyComponent back in
        renderComponent.value = true;
      };

    function startDragBucket(event,bucket) {
      console.log("Started Dragging");
      console.log(bucket);
      event.dataTransfer.dropfEffect = "move";
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('dragBucket', bucket )
      draggedBucket = bucket;
    }



    //Muss noch persistet werden
   function onDragEnterBucket(event,enterBucket) {
      

      if(enterBucket.id != undefined && enterBucket.id !== draggedBucket.id) {
        console.log("Dragged over: ")
        event.preventDefault();
        
        //get indexes in array for the elements to be changed
        let indexDragged = -1;
        let indexEntered = -1;

        for(let i=0; i < buckets.length; i++) {
          if(buckets.at(i).id == enterBucket.id) {
            indexEntered = i;
            console.log(indexEntered);
          }
          if(buckets.at(i).id == draggedBucket.id) {
            indexDragged = i;
            console.log(indexDragged)
          }
        }
        
        console.log(buckets);
        let tempPos = buckets.at(indexDragged).position;
        buckets.at(indexDragged).position = buckets.at(indexEntered).position
        buckets.at(indexEntered).position = tempPos;
        

        orderBucketsByPosition();


        //persistenting
        updateBuckets(buckets);

        triggerRender();
    }
  }

 function orderBucketsByPosition() {
        buckets = buckets.sort(function(a, b) { 
        return a.position - b.position;
        })
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