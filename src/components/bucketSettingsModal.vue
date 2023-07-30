<template>
    <div class="kanbanWindow">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div class="kanbanBucketModal">
                <div class="bucketTitle">
                    <h2>Bucket Title</h2>
                    <div class="inputFieldForTitle">
                        <textarea v-model="bucket.name" placeholder="add Title Here"></textarea>
                    </div>
                </div>
                <button class="modalButton" @click="closeBucketModal">
                    <span class="material-symbols-outlined">
                    done
                    </span>
                </button>
                <button class="modalButtonClose" @click="closeBucketModalAndDelete">
                    <span class="material-symbols-outlined">
                    delete
                    </span>
                </button>
            </div>
    </div>
</template>


<script setup>

const emit = defineEmits(['closeBucketModal','closeBucketModalAndDelete'])

const props = defineProps(['bucketData'])

var bucket = props.bucketData;
console.log(bucket)




function closeBucketModal(e) {
    emit('closeBucketModal', bucket);
}

function closeBucketModalAndDelete(e) {
    emit('closeBucketModalAndDelete',bucket)
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


  .kanbanBucketModal {
    text-align: center;
    background-color: var(--dark);
    height: 500px;
    width: 500px;
    margin-top: 7%;
    padding: 40px 0;
    margin-left: var(--sidebar-width);
    border-radius: 20px;
    //border-style:dotted;
    border-width: 0.3rem;
    border-color: var(--lighterGrey);
    display:flex;
    flex-direction: column;
    align-items: center;

    h2 {
        color:var(--light);
    }


    .bucketTitle {

        .inputFieldForTitle {
            padding-top: 2rem;

            textarea {
                margin-top: 2rem;
                width: 20rem;
                height: 3rem;
                border-style: solid;
                border-color: var(--lighterGrey);
                background-color: var(--lighterGrey);
                font-size: 0.98rem;
                color:white;
                text-align: center;
                padding-top: 0.8rem;
            }



            textarea:focus {
                outline: none !important;
                border:0.15rem solid var(--darkBlue);
                
            }


        }

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


    .modalButtonClose {
        background-color: var(--lighterGrey);
        width: 150px;
        height: 40px;
        color: var(--orange);
        font-size: 14px;
        border-radius: 16px;
        margin-top: 10rem;
    }

    .modalButtonClose:hover {
        transition: 0.1s ease;
        transform: scale(1.1);
        color: var(--red);
        //color: var(--darkBlue);
    }

}


}



</style>