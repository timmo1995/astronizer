<template>
    <div class="kanbanWindow">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div class="kanbanTaskModal">
                <div class="taskTitle">
                    <h2>Task Settings</h2>
                </div>
                <div class="inputFieldForTitle">
                        <textarea v-model="task.title" placeholder="add Task Title Here"></textarea>
                </div>
                <button class="modalButton" @click="closeSettings">
                    <span class="material-symbols-outlined">
                    done
                    </span>
                </button>
            </div>
    </div>
</template>


<script setup>
import "../pages/kanban.vue";
import { isProxy, toRaw } from 'vue';


const emit = defineEmits(['closeTaskSettingModal'])

const props = defineProps(['taskData'])

var task = props.taskData;

function closeSettings() {
    const rawTask = toRaw(task)
    emit('closeTaskSettingModal', rawTask);

}


</script>



<style scoped lang="scss">
@import "../assets/global.scss";


.kanbanWindow {
  position: fixed;
  top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 display: flex;
 justify-content: center;


 .kanbanTaskModal {
   text-align: center;
   background-color: var(--dark);
   height: 500px;
   width: 500px;
   margin-top: 7%;
   padding: 40px 0;
   margin-left: var(--sidebar-width);
   border-radius: 20px;
   border-style:dotted;
   border-width: 0.3rem;
   border-color: var(--lighterGrey);
   display:flex;
   flex-direction: column;
   align-items: center;

   h2 {
       color:var(--light);
   }

   .modalButton {
       background-color: var(--lighterGrey);
       width: 150px;
       height: 40px;
       color: white;
       font-size: 14px;
       border-radius: 16px;
       margin-top: 50px;
       
}

   .modalButton:hover {
       transition: 0.1s ease;
       transform: scale(1.1);
       //color: var(--darkBlue);
       color: var(--lightgreen);
   }


}


}



</style>
