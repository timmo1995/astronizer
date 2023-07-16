<template>
    <div class="kanbanTask" v-if="renderComponent">
      <div class="kanbanTaskTitle">
        {{ taskData.title }}
      </div>
      <div class="kanbanTaskDeleteIcon">
        <span class="material-icons" @click="deleteTask" >close</span>
      </div>
    </div>
  </template>
  
  <script setup>

    const props = defineProps(['taskData'])
    const renderComponent = ref(true);
    const emit = defineEmits(['deleteTask'])


    async function deleteTask() {
          //this.$parent.deleteTaskFromBoard(this.taskData.id);
      console.log("hi")
      emit('deleteTask',props.taskData.id);
    }

  
  </script>
  
  <style lang="scss">
  
  @import "../assets/global.scss";
  
  .kanbanTask {
      display: flex;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      background-color: var(--lighterGrey);
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
          }
  
        }
  
      .kanbanTaskTitle {
          color: var(--light);
          display:flex;
          //overflow: visible;
  }
  
  }
  .kanbanTask:hover {
    cursor: pointer;
  }
  
  </style>