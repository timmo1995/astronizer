<template>
    <aside>
      <div class="headingSidebar">
        <div class="logo">
          <img src="../assets/logo.png">
        </div>
        <div class="headingTextSidebar">
          <p>T.I.M.O</p>
        </div>
      </div>
  
      <h3 class="headingMenu">Menu</h3>
      <div class="menu">
        <NuxtLink class="button" to="/">
          <span class="material-icons">home</span>
          <span class="text">Home</span>
        </NuxtLink>
        <NuxtLink class="button" to="/kanban">
          <span class="material-icons">view_kanban</span>
          <span class="text">Kanban</span>
        </NuxtLink>
      </div>
      <div class="flex" />
      <div class="menu">
        <NuxtLink to="/settings" class="button">
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
        </NuxtLink>
      </div>
    </aside>
  </template>
  
  <script lang="ts">
  
  </script>
  
  <style lang="scss">
  
  aside{
    display: flex;
    flex-direction: column;
    background-color: var(--dark);
    color: var(--light);
    width: var(--sidebar-width);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    transition: 0.2s ease-out;
  
    @media (max-width: 768px) {
      position: fixed;
      z-index: 99;
    }
  
    .flex {
      flex: 1 1 0;
    }
  }
  
  .logo {
    margin-bottom: 1rem;
    img {
      width: 4rem;
    }
    float: left;
  }
  
  .headingMenu, .button .text {
    opacity: 1;
    transition: 0.3s ease-out;
  }
  
  .menu {
    margin: 0 -1rem;
  
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
  
      padding: 0.5rem 1rem;
  
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        margin-right: 1rem;
      }
  
      &:hover {
      background-color: var(--dark-alt);
  
      .material-icons, .text {
        color: var(--hoverButton)
      }
  
      &.router-link-exact-active {
        background-color: var(--dark-alt);
        color: var(--hoverButton);
      }
  
    }
  
    .text {
      color: var(--light);
    }
  
    &.router-link-exact-active {
      border-right: 5px solid var(--hoverButton);
    }
  
    }
  
  }
  
  .headingMenu {
    color: var(--light);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  
  .headingSidebar {
    width: 80%;
    padding: 1%;
  }
  
  .headingTextSidebar {
    font-size: 1.2rem;
    margin-top: 1.3rem;
    text-align: center;
  }
  
  </style>