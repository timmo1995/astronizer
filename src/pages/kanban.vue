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

        <draggable :list="buckets" :animation="200" group="bucket" item-key="id" @start="drag=true"  @end="endBucketDrag" class="kanbanBoard" :move="checkMove">
          <template #item="{element}" class="kanbanBucketArea">
            <div>
              <!-- <transition name="pop">
                <Modal v-if="showBucketModal" >
                  <bucketSettingsModal :bucketData="element" @closeBucketModal="closeBucketModalCallback" @closeBucketModalAndDelete="closeBucketModalAndDeleteCallback"/>
                </Modal>
              </transition> -->
              <kanbanBucket :bucketData="element" @openSettingsOfBucket="openBucketSettingsCallback" @triggerReloadFromBucket="triggerUpdate"/>
            </div>
          </template>
        </draggable>
        <div class="addKanbanBoardButton">
          <span class="material-icons" @click="addBucket">add</span>
        </div>
      </div>
      </div>
      <Teleport to="body">
        <transition name="pop">
                <Modal v-if="showBucketModal" >
                  <bucketSettingsModal :bucketData="buckets.at(bucketIndexForModal)" @closeBucketModal="closeBucketModalCallback" @closeBucketModalAndDelete="closeBucketModalAndDeleteCallback"/>
                </Modal>
         </transition>
        </Teleport>
      <!-- <transition name="pop">
        <Modal v-if="showBucketModal" >
          <bucketSettingsModal @closeBucketModal="closeBucketModalCallback"/>
        </Modal>
      </transition> -->
    </div>
</template>
  
  <script setup>


/** 
 * ToDo: shift the logic of modal component in bucket class fir bucket modal and teleport it afterwards to this frame
 * **/


  import mainSidebar from '~/components/mainSidebar.vue'
  import kanbanBucket from '~/components/kanbanBucket.vue'
  import { emit, listen } from '@tauri-apps/api/event'
  import { getBuckets, updateBuckets, deleteAllTaskFromOneBucket } from '@/utils/tauriStoreAPI'
  import { Store } from "tauri-plugin-store-api";
import draggable from 'vuedraggable'
import bucketSettingsModal from '~/components/bucketSettingsModal.vue';

  var buckets = ref(true);
  //buckets.value = [];
  var bucketNames =  [];
  var draggedBucket = {}
  const rendComponent = ref(true);
  var bucketIndexForModal = 0;

  var showBucketModal = ref(false);
  showBucketModal.value = false;

  
  onMounted(async () => {
      let result =  await getBuckets();
      buckets.value = result;
      console.log(buckets.value);
      updateBucketNames();
      triggerRender();
    })


    async function closeBucketModalCallback(bucketData) {
    for(let bucket of buckets.value) {
      if(bucketData.id == bucket.id ) {
        bucket = bucketData
      }
    }  

     await updateBuckets(buckets.value);
      showBucketModal.value = false;
      
    }

    function openBucketSettingsCallback(openedBucket) {
      console.log(openedBucket);
      for(let i=0; i<buckets.value.length; i++) {
        if(buckets.value.at(i).id == openedBucket) {
          bucketIndexForModal = i;
        }
      }
      
      showBucketModal.value = true;
    }

async function closeBucketModalAndDeleteCallback(bucket) {
    await deleteBucket(bucket.id);
    showBucketModal.value = false;
}
    

  function openURL (url) {
        window.open(url);
      }

  async function addBucket() {
        //get highest current id of buckets and highest position
        let highID =  0;
        var highPos = 0;
        if(buckets.value.length != 0) {
          console.log("Inside");
          for (const bucket of buckets.value) {
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

        buckets.value.push({id: highID, name: 'New Bucket', position: highPos});
        await updateBuckets(buckets.value);
        updateBucketNames();
        console.log(buckets.value);
        await triggerRender();
        return true;
      }

  async function deleteBucket(bucketId) {
        buckets.value = buckets.value.filter(function(bucket) {
          return bucket.id != bucketId;
        })

        //update positions and store
        updateBucketPosition();

        await updateBuckets(buckets.value);
       // await triggerRender();


       //Delete all Tasks from the bucket
        await deleteAllTaskFromOneBucket(bucketId);

        return true;

      }

  function updateBucketNames() {
        let names = []
        for (const bucket of buckets.value) {
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
        buckets.value = buckets.value.sort(function(a, b) { 
        return a.position - b.position;
        })
      }

 async function checkMove(e) {
       console.log("Dragging " + e);

    }


 async function endBucketDrag(e) {
        console.log("Dropped");
      await triggerRender();
      console.log(buckets.value);
      updateBucketPosition();
      await updateBuckets(buckets.value);
 }


 function updateBucketPosition() {
  for(let i = 0;i<buckets.value.length;i++) {
    buckets.value.at(i).position = i+1;
  }
 }

 async function triggerUpdate() {
  triggerRender();
 }


  </script>
  
  <css lang="scss">
  @import "../assets/global.scss";

  .pop-enter-active,
  .pop-leave-active {
       transition: all 0.25s ease;
     }

    .pop-enter-from,
    .pop-leave-to {
    opacity: 0;

    //ToDO: Transform does not work as the board height is too low (increase to bottom and create card in subdiv)
    transform: translateY(100rem);
    
    }

//    .pop-enter-active {
//   animation: bounce-in 0.5s;
// }
// .pop-leave-active {
//   animation: bounce-in 0.5s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.25);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
  

// .sidebar {
//   position:fixed;
// }

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
        color: var(--blue);
        transition: 0.1s ease;
        transform: scale(1.2);
      }
  }
  
  .window {
      color: var(--light)
  }
  

  
  </css>