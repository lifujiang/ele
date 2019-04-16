<template>
<div>
  <transition mode="out-in">
    <router-view/>
  </transition>
</div>
</template>

<style lang="scss">
  .v-enter {
    opacity: 0;
  }

  .v-leave-to {
    opacity: 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all .4s ease;
  }
</style>
