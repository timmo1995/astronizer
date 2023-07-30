<template>
    <div class="kanbanWindow">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div class="kanbanTaskModal" :style="{'border-color': 'var(--' + task.color + ')'}">
                <div class="taskTitle">
                    <h2>Task Settings</h2>
                </div>
                <div class="inputFieldForTitle">
                        <textarea v-model="task.title" placeholder="add Task Title Here"></textarea>
                </div>
                <div class="inputForColors">
                    <h3>Color</h3>
                    <div class="circleButtons">
                        <span class="lighterGreyDot" @click="clickColorCallback('lighterGrey')"></span>
                        <span class="orangeDot" @click="clickColorCallback('orange')"></span>
                        <span class="redDot" @click="clickColorCallback('red')"></span>
                        <span class="darkBlueDot" @click="clickColorCallback('darkBlue')"></span>
                        <span class="blueDot" @click="clickColorCallback('blue')"></span>
                        <span class="greenDot" @click="clickColorCallback('green')"></span>
                    </div>
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

function clickColorCallback(selectedColor) {
    task.color = selectedColor;
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
   //border-color: var(--lighterGrey);
   display:flex;
   flex-direction: column;
   align-items: center;


   textarea {
                margin-top: 2rem;
                width: 20rem;
                height: 3rem;
                border-style: solid;
                border-color: var(--lighterGrey);
                background-color: var(--lighterGrey);
                font-size: 0.98rem;
                color:var(--light);
                text-align: center;
                padding-top: 0.8rem;
            }

    textarea:focus {
                outline: none !important;
                border:0.15rem solid var(--darkBlue);
                
            }

    .inputForColors {
        color: var(--light);
        padding-top: 2rem;
        display:flex;
        flex-direction: column;


    .circleButtons {
        padding-top: 1rem;
        display:flex;
        flex-direction: row;
        column-gap: 1rem;

        

        .lighterGreyDot {
            height: 25px;
            width: 25px;
            background-color: var(--lighterGrey);
            border-radius: 50%;
            display: flex;
            column-gap: 5rem;
        }

        .lighterGreyDot:hover {
            transition: 0.1s ease;
            transform: scale(1.1);
        }

        .orangeDot {
            height: 25px;
            width: 25px;
            background-color: var(--orange);
            border-radius: 50%;
            display: flex;
        }

        .orangeDot:hover {
            transition: 0.1s ease;
            transform: scale(1.1);
        }

        .redDot {
            height: 25px;
            width: 25px;
            background-color: var(--red);
            border-radius: 50%;
            display: flex;
        }

        
        .redDot:hover {
            transition: 0.1s ease;
            transform: scale(1.1);
        }

        .darkBlueDot {
            height: 25px;
            width: 25px;
            background-color: var(--darkBlue);
            border-radius: 50%;
            display: flex;
        }


        .darkBlueDot:hover {
            transition: 0.1s ease;
            transform: scale(1.1);
        }

        .blueDot {
            height: 25px;
            width: 25px;
            background-color: var(--blue);
            border-radius: 50%;
            display: flex;
        }

        .blueDot:hover {
            transition: 0.1s ease;
            transform: scale(1.1);
        }

        .greenDot {
            height: 25px;
            width: 25px;
            background-color: var(--green);
            border-radius: 50%;
            display: flex;
        }

        .greenDot:hover {
            transition: 0.1s ease;
            transform: scale(1.2);
        }

      }
      
    }

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
