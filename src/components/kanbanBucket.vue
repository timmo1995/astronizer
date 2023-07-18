<template>
  <div class="kanbanBucket" v-if="renderComponent">
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
          <draggable :list="tasks" :animation="200" group="task" item-key="id"  @add="addedTaskToBucket" @remove="removedTaskFromBucket" @start="startTaskDrag"  @end="endTaskDrag" class="kanbanTaskList" :move="checkTaskMove">
          <!-- <div v-for="item in tasks" :key="item" class="kanbanTaskArea" >
            <kanbanTask :taskData="item" @deleteTask="deleteTaskFromBoard"/>
          </div> -->
            <template #item="{element}" class="kanbanTaskArea">
              <div class="kanbanTaskArea">
                <kanbanTask :taskData="element" @deleteTask="deleteTaskFromBoard"/>
              </div>
            </template>
          </draggable>
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
  

<script setup>

import kanbanTask from './kanbanTask.vue'
import { getTasksOfBucket, addTaskToBucket, deleteTask, updateTasksOfBucketsAfterDragAndDrop } from '@/utils/tauriStoreAPI'
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'

//var taskTitles = [];
const props = defineProps(['bucketData'])
const renderComponent = ref(true);
var tasks = await getTasksOfBucket(props.bucketData.id);

const emit = defineEmits(['deleteBucket','triggerReloadFromBucket'])


onMounted(async () => {
    if(tasks!=undefined || tasks == []) {
    tasks = await getTasksOfBucket(props.bucketData.id);
    console.log(tasks);
    }
   // updateTaskTitles();
    triggerRender();

})

async function deleteBucket() {
  //$parent.deleteBucket(props.bucketData.id);
  emit('deleteBucket', props.bucketData.id)
}


async function AddTask() {
  let taskPos = 0;
  if (tasks.length != 0) {
    for (const task of tasks) {
      if (task['position'] > taskPos) {
        taskPos = task['position']
      }
    }
  }
  //add one
  taskPos = taskPos + 1;

  //create new task
  let newTask = { position: taskPos, title: "This is a task in " + props.bucketData.id, bucket: props.bucketData.id }
  tasks.push(newTask)

  //update
  await addTaskToBucket(newTask);
  triggerRender();
  return true;
}


async function deleteTaskFromBoard(taskId) {

  console.log("hi back")
  //delete from RAM
  tasks = tasks.filter(function (task) {
    return task.id != taskId;
  })


  //delete from storage
  await deleteTask(taskId);
  await triggerRender();
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


async function endTaskDrag(e) {
// //   console.log(e);
  console.log(props.bucketData.id);
//  //emit('triggerReloadFromBucket');
//   // console.log("Dropped Task");
//   // await triggerRender();
//   // updateTaskPositions();

//   // //Delete old id from storage

//   // console.log(e.draggedContext);

//   // // await deleteTask(e.draggedContext);

//   // // await updateTasksOfBucket(tasks,bucketData.id);

//   // // console.log("Everything Done Triggering Rerender")

//   //  triggerRender();
//   console.log("ENDED");
//   console.log(e);
  triggerRender();
}


async function removedTaskFromBucket(e) {
  // console.log('REMOVED FROM ' + props.bucketData.id);
  // await updateTasksOfBucket(tasks, props.bucketData.id);
  // triggerRender();

  // console.log("DONE REMOVING")
}

async function addedTaskToBucket(e) {
  // console.log('ADDED TO  + ' + props.bucketData.id )
  // console.log(tasks);
  // await updateTasksOfBucketsAfterDragAndDrop(tasks,props.bucketData.id);
  // //triggerRender();

  await updateTasksOfBucketsAfterDragAndDrop(tasks, props.bucketData.id);
  await updateTaskPositions();

  // console.log("DONE Adding")
  //emit('triggerReloadFromBucket')
 // console.log(e)
  triggerRender();
}

async function checkTaskMove(e) {
  // console.log(e.draggedContext);
  // console.log(props.bucketData.id)

}


async function startTaskDrag(e) {
  
  //delete this bucket 
  await deleteTask(e.item.__draggable_context.element.id);
  await updateTaskPositions();



}


function updateTaskPositions() {
  for(let i = 0;i<tasks.length;i++) {
    tasks.at(i).position = i+1;
  }
 }

</script>
  
<style lang="scss">
@import "../assets/global.scss";

.kanbanBucket {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  border-radius: 0.75rem;
  row-gap: 1rem;
  width: 15rem;

  .bucketHeaderArea {

    font-size: 1rem;
    font-weight: bold;
    padding-bottom: 0.75rem;
    display: flex;

    .bucketDeleteBtnArea {
      display: flex;
      font-size: 0.8rem;
      margin-left: auto;

      .material-icons {
        font-size: 1.1rem;
      }

      .material-icons:hover {
        color: var(--blue);
        cursor: pointer;
      }
    }

  }



  .kanbanBucketProdArea {
    padding: 1rem;
  }

  .bucketBodyArea {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  .kanbanTaskList {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  .kanbanAddTaskArea:hover {
    cursor: pointer;
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
      display: flex;

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