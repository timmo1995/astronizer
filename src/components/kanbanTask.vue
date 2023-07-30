<template>
    <div class="kanbanTask"  @click="openTaskSettings" :style="{'background-color': 'var(--' + props.taskData.color + ')'}">
      <div class="kanbanTaskTitle">
        {{ taskData.title }}
      </div>
      <div class="kanbanTaskDeleteIcon">
        <span class="material-icons" @click="deleteTask" >close</span>
      </div>
      <Teleport to="body">
        <transition name="pop">
        <Modal v-if="showTaskModal">
            <taskSettingsModal :taskData="props.taskData" @closeTaskSettingModal="closeTaskSettingModalCallback"/>
        </Modal>
        </transition>
      </Teleport>
    </div>
  </template>
  
  <script setup>

import taskSettingsModal from './taskSettingsModal.vue';
  import { ref, onMounted } from 'vue'


import { updateTaskTitleAndColorInNVM } from '../utils/tauriStoreAPI'

  var showTaskModal = ref(false);
  showTaskModal.value = false;

    const props = defineProps(['taskData'])
    
    const emit = defineEmits(['deleteTask'])


    async function deleteTask() {
          //this.$parent.deleteTaskFromBoard(this.taskData.id);
      console.log("hi")
      emit('deleteTask',props.taskData.id);
    }

    function openTaskSettings() {
      showTaskModal.value = true;
      console.log("Opening Modal")
      console.log(showTaskModal.value)
    }


    async function closeTaskSettingModalCallback(task) {
      await updateTask(task);
      showTaskModal.value = false;
    }


    async function updateTask(task) {
      await updateTaskTitleAndColorInNVM(task);

      return true;

    }



  
  </script>
  
  <style lang="scss">
  
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

  .kanbanTask {
      display: flex;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      //background-color: var(--lighterGrey);
      border-style: 0.25rem solid;
      border-radius: 0.5rem;
      font-size: 0.98rem;
      flex-direction: row;
      column-gap: 1rem; //this param is not tuned yet
  
        .kanbanTaskDeleteIcon {
          font-size: 0.8rem;
          margin-left:auto;
  
          .material-icons {
            font-size: 1.1rem;
          }
  
          .material-icons:hover {
          color: var(--blue);
          transition: 0.1s ease;
          transform: scale(1.3);
          }
  
        }
  
      .kanbanTaskTitle {
          color: var(--white);
          display:flex;
          //overflow: visible;
  }
  
  }
  .kanbanTask:hover {
    cursor: pointer;
    transition: 0.1s ease;
    transform: scale(1.03);
  }
  
  </style>