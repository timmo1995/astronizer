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
      <div class="SettingsPage">
        <div class="comingSoonHeader">
          <div class="constLogo">
            <span class="material-icons">engineering</span>
            <h2>Contribution</h2>
          </div>
        </div>
        <div class="boxText">
          <div class="boxBoarder">
            <div class="textInBox">
              <h3>We love your input!</h3>
              <p> <br> We want to make contributing to this project as easy <br> and transparent as possible, whether it's: </p>
                  <ul class="listContr">
                    <li class="listEntry">Reporting a bug</li>
                    <li class="listEntry">Discussing the current state of the code</li>
                    <li class="listEntry">Submitting a fix</li>
                    <li class="listEntry">Proposing new features</li>
                    <li class="listEntry">Becoming a maintainer</li>
                  </ul>
              <p> Find more infos <a href="https://github.com/timmo1995/astronizer">here</a></p>
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
  
    name: 'SettingsPage',
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
  
  .SettingsPage {
  display: flex;
  justify-content: top;
  margin-top: 8rem;
  align-items: center;
  flex-basis: 100%;
  flex-direction: column;
  color: var(--light);
  
    .comingSoonHeader {
      font-size: 2rem;
      padding-bottom: 5rem;
      color: var(--light);
  
        .material-icons {
          padding-left: 7rem;
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
        text-align: center;

        a:link {
          color: var(--light);
          background-color: transparent;
          text-decoration: underline;
        }

        a:visited {
          color: var(--light);
          background-color: transparent;
          text-decoration: none;
        }

        a:hover {
          color: var(--hoverButton);
          background-color: transparent;
          text-decoration: underline;
        }

        a:active {
          color: var(--light);
          background-color: transparent;
          text-decoration: underline;
        }

        .listContr {
          align-items: center;
          align-content: center;
          text-align: left;
          padding-top: 3rem;
          padding-bottom: 2.7rem;
          padding-left: 5rem;

          .listEntry {
            
          }
        }
      }
      background-color: var(--dark);
      border: 0.15rem solid;
      border-color: var(--hoverButton);
      border-radius: 5rem;
    }
  
  }
  
  </style> 

