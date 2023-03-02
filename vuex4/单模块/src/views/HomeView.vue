<template>
  <div class="home">
    {{ store.test() }}
  </div>
</template>

<script lang="ts">
import { RootState } from '../store/rootState';
import { defineComponent } from 'vue';
import { useStore } from '../vuex/indexSingle';
export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore<RootState>()
    return {
      store
    }
  }
});
</script>
