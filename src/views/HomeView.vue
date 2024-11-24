<script setup lang="ts">
import mainCrud from '@/components/mainCrud.vue';
import spaceList from '@/components/spaceList.vue';
import { ref, onMounted , onBeforeUnmount } from 'vue';
import { useTasksStore } from "@/stores/index";
let store = useTasksStore();
let showSidebar = ref<boolean>(false);

const toggleSidebar = () => {
  store.showSidebar = !store.showSidebar
}



</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <aside class="w-full md:w-1/4 bg-gray-100 border-r md:block hidden">
      <div class="p-4">
        <h2 class="text-lg font-bold mb-4">Spaces</h2>
        <button @click="store.showModel2 = true" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full">
          + New Space
        </button>
        <div>
         <spaceList></spaceList>
          <div>
        
          </div>
        </div>
      </div>
    </aside>

    <div class="block md:hidden bg-gray-100 border-b p-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded w-full" @click="toggleSidebar">
        Toggle Spaces
      </button>
    </div>
    <transition name="slide">
      <aside v-if="store.showSidebar" class="fixed top-0 left-0 w-2/3 bg-gray-100 border-r h-screen z-10">
        <div class="p-4">
          <h2 class="text-lg font-bold mb-4">Spaces</h2>
          <button @click="store.showModel2 = true" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full">
            + New Space
          </button>
          <spaceList></spaceList>
        </div>
      </aside>
    </transition>

      <mainCrud></mainCrud>

   
  </div>


</template>


<style lang="scss">

</style>
