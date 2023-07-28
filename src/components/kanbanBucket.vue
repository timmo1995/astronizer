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
          <span class="material-icons" @click="openSettings">settings</span>
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
import bucketSettingsModal from './bucketSettingsModal.vue'
import { getTasksOfBucket, addTaskToBucket, deleteTask, updateTasksOfBucketsAfterDragAndDrop } from '@/utils/tauriStoreAPI'
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'

//var taskTitles = [];
const props = defineProps(['bucketData'])
const renderComponent = ref(true);

var tasks = ref(null)
tasks.value = await getTasksOfBucket(props.bucketData.id);

const emit = defineEmits(['openSettingsOfBucket','triggerReloadFromBucket'])


//length to check if change via drag and drop occured
var numOfTasks = tasks.value.length;



onMounted(async () => {
   // if(tasks!=undefined || tasks == []) {
    if(tasks.value==undefined) {
    //tasks = await getTasksOfBucket(props.bucketData.id);
    //console.log(tasks);
    tasks.value = []
    }
   // updateTaskTitles();
   // triggerRender();

})




async function openSettings() {
  //$parent.deleteBucket(props.bucketData.id);
  emit('openSettingsOfBucket', props.bucketData.id)
  //showBucketModal.value = true;
}


async function AddTask() {
  let taskPos = 0;
  if (tasks.value.length != 0) {
    for (const task of tasks.value) {
      if (task['position'] > taskPos) {
        taskPos = task['position']
      }
    }
  }
  //add one
  taskPos = taskPos + 1;

  //create new task
  let newTask = { position: taskPos, title: "This is a task in " + props.bucketData.id, bucket: props.bucketData.id }
  tasks.value.push(newTask)

  //update
  await addTaskToBucket(newTask);
  triggerRender();
  return true;
}


async function deleteTaskFromBoard(taskId) {

  console.log("hi back")
  //delete from RAM
  tasks.value = tasks.value.filter(function (task) {
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

//check if drag and drop was inside bucket. If yes handle new positions and update database. If not, other callbacks will overtake :)
await updateTaskPositions();
if(tasks.value.length==numOfTasks) {
  await updateTasksOfBucket(tasks.value,props.bucketData.id);
}
//triggerRender();

}


async function removedTaskFromBucket(e) {

  //EMPTY CALLBACK - it would be nice to call function here to update positions in NVM storage
  //, but this call would conflict with updateDragAndDrag as it isn´t a database and "textfile" instead
}

async function addedTaskToBucket(e) {
  await updateTasksOfBucketsAfterDragAndDrop(e.item.__draggable_context.element.id, props.bucketData.id);
  await updateTaskPositions();

  updateTasksOfBucket(tasks.value,props.bucketData.id);
 // triggerRender();
}

async function checkTaskMove(e) {

}


async function startTaskDrag(e) {
  numOfTasks = tasks.value.length;
}


function updateTaskPositions() {
  for(let i = 0;i<tasks.value.length;i++) {
    tasks.value.at(i).position = i+1;
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