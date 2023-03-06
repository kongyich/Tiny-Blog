<template>
  <div class="home">
    {{ store.test() }}
  </div>
</template>

<script lang="ts">
import { RootState } from '../store/rootState';
import { defineComponent } from 'vue';
import { useStore } from '../vuex/index';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore<RootState>()
    console.log(store, '<----store')
    console.log(store.getters['homeModule/showNavList'], '<---getters')
    return {
      store
    }
  }
});
</script>
