<template>
    <div class="window">
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
      <div class="NotesPage">
        <div class="header">
            <h3>My Notes</h3>
        </div>
        <div class="notesArea">
          <div class="notesHeader" v-for="item of notes">
            <div class="note">
              {{ item.title }}
            </div>
          </div>
          <div class="notesGeneralButtons">
            <span class="material-icons" @click="addBucket">add</span>
          </div>
        </div>
        <!-- <div class="NotesQuillFrame">
            <div class="NotesQuill">
              <ClientOnly>
                <QuillEditor theme="snow" toolbar="full" />
              </ClientOnly>
          </div>
        </div> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import mainSidebar from '~/components/mainSidebar.vue'
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { initNotesOnInitialStart, getNotes }  from '@/utils/tauriStoreAPI'


  //First init notes if not done so far
  initNotesOnInitialStart();

  var notes = await getNotes();


  


  


  </script>
  
  <style lang="scss">
  @import "../assets/global.scss";
  
  .window {
    display:flex;
  }
  
  .NotesPage {
  display: flex;
  justify-content: top;
  align-items: center;
  flex-basis: 100%;
  flex-direction: column;
  row-gap: 3rem;
 
  .header {
     // color: var(--hoverButton);
        margin-top: 1rem;
      font-size: 2rem;
      padding: 1rem;
  }

  .NotesQuillFrame {
    width: 85%;
    height: 80%;
    //overflow: hidden;
    background-color:rgb(241, 241, 241);
    color:black;
    border-color: var(--lighterGrey);
    border-style: solid;
    border-radius: 3rem;


    .NotesQuill {
    width: 95%;
    margin:auto;
    margin-top: 3rem;

    .ql-container.ql-snow {
    height: auto;
    border-color: black;
}

.ql-toolbar.ql-snow {
    border-color: black;
}
.ql-editor {
    height: 40rem;
    overflow-y: scroll;
    border-color: black;
}

    }    

  } 
  


  }
  
  </style> 

