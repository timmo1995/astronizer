<template>
    <div class="kanbanWindow">
        <div class="kanbanBucketModal">
            <h3>This is some Crazy Modal Slot</h3>
            <button class="modalButton" @click="closeBucketModal">
                Close
            </button>
        </div>
    </div>
</template>


<script setup>

const emit = defineEmits(['closeBucketModal'])

function closeBucketModal(e) {
    emit('closeBucketModal')
}

</script>


<style scoped lang="scss">
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
    background-color: white;
    height: 500px;
    width: 500px;
    margin-top: 7%;
    //padding: 60px 0;
    border-radius: 20px;
    .modalButton {
        background-color: #ac003e;
        width: 150px;
        height: 40px;
        color: white;
        font-size: 14px;
        border-radius: 16px;
        margin-top: 50px;
}
}
 }



</style>