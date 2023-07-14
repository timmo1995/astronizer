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
      <div class="IndexPage">
        <div class="comingSoonHeader">
          <div class="constLogo">
            <span class="material-icons">engineering</span>
          </div>
          <h1>Coming Soon</h1>
        </div>
        <div class="boxText">
          <div class="boxBoarder">
            <div class="textInBox">
              <p>This site is under contruction. Idea:  Start Dashboard </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import SystemInformation from '@/components/SystemInformation.vue'
  import mainSidebar from '~/components/mainSidebar.vue'
  
  export default {
  
    name: 'IndexPage',
    components: {
      // SystemInformation
      mainSidebar
    },
    data () {
      return {
        externalContent: ''
      }
    },
    methods: {
      openURL (url) {
        window.open(url)
      }
    }
  }
  </script>
  
  <style lang="scss">
  @import "../assets/global.scss";
  
  .window {
    display:flex;
  }
  
  .IndexPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  flex-direction: column;
  
    .comingSoonHeader {
      font-size: 2rem;
      padding-bottom: 5rem;
      color: var(--light);
  
        .material-icons {
          padding-left: 10rem;
          font-size: 6rem;
          color: var(--light);
          margin-right: 1rem;
  
        }
    }
  
    .boxBoarder {
  
      .textInBox {
        color: var(--light);
        font-size: 1.5rem;
        padding: 2rem;
      }
  
      border: 0.15rem solid;
      border-color: var(--hoverButton)
    }
  
  }
  
  </style>