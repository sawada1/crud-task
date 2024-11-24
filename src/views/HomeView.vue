<script setup lang="ts">
import taskModel from '@/components/taskModel.vue';
import Dialog from 'primevue/dialog';
import { ref, onMounted , onBeforeUnmount } from 'vue';
import { useTasksStore } from "@/stores/index";
let store = useTasksStore();
let showSidebar = ref<boolean>(false);
const checkSpace = ()=>{
  if(store.spaces.length == 0){
    return 'you must create space first';
  }
}
const checkModal = ()=>{
  if(store.spaces.length >= 1){
    store.showModel = true
  }
}
  const checkBtns = ref(new Array(store.spaces.length).fill(false));
function toggleCheckBtn(index: number) {
  checkBtns.value = checkBtns.value.map((_, i) => i === index ? !checkBtns.value[i] : false);
}
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}


function closeAllDropdowns() {
  checkBtns.value = new Array(store.spaces.length).fill(false);
}

onMounted(() => {
  document.addEventListener("click", closeAllDropdowns);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeAllDropdowns);
});
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
          <div class="mb-2 flex flex-col gap-4 relative">
            <div v-for="item , index in store.spaces" :key="index" class="flex relative items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                <span> {{ item }} </span>
              </div>
              <button @click.stop="toggleCheckBtn(index)" class="text-[18px] font-bold">...</button>
              <div v-if="checkBtns[index]"  class=" bg-white p-4 rounded-lg z-10 flex items-center gap-3 flex-col shadow-lg absolute right-0 top-[100%]">
                 <span>list settings</span>
                  <div class="w-full h-[1px] bg-[#ccc]"></div>
                 <button @click="store.task = undefined , store.status = undefined , store.indexTask = undefined , store.showModel = true" class="">
                  <span>add task</span>
                 </button>
                 <button>
                  <span>edit</span>
                 </button>
                 <button @click="store.deleteSpace(index , item)">
                  <span> delete </span>
                 </button>
              </div>
            </div>
          </div>
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
      <aside v-if="showSidebar" class="fixed top-0 left-0 w-2/3 bg-gray-100 border-r h-screen z-10">
        <div class="p-4">
          <h2 class="text-lg font-bold mb-4">Spaces</h2>
          <button @click="store.showModel2 = true" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full">
            + New Space
          </button>
          <div class="mb-2 flex flex-col gap-4 relative">
            <div v-for="item , index in store.spaces" :key="index" class="flex relative items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                <span> {{ item }} </span>
              </div>
              <button @click.stop="toggleCheckBtn(index)" class="text-[18px] font-bold">...</button>
              <div v-if="checkBtns[index]"  class=" bg-white p-4 rounded-lg z-10 flex items-center gap-3 flex-col shadow-lg absolute right-0 top-[100%]">
                 <span>list settings</span>
                  <div class="w-full h-[1px] bg-[#ccc]"></div>
                 <button @click="store.task = undefined , store.status = undefined , store.indexTask = undefined , store.showModel = true" class="">
                  <span>add task</span>
                 </button>
                 <button>
                  <span>edit</span>
                 </button>
                 <button @click="store.deleteSpace(index , item)">
                  <span> delete </span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </transition>

    <main @click="showSidebar = false" class="flex-1 bg-white">
      <header class="p-4 flex flex-wrap justify-between items-center border-b">
        <h1 class="text-lg font-bold">Everything View</h1>
  
      </header>

      

      <div class="p-4">
        <!-- Columns -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <!-- Dynamically render columns -->
          <div v-for="(taskList, column) in store.tasks" :key="column" class="bg-gray-50 p-4 border rounded"
            @dragover="store.onDragOver" @drop="() => store.onDrop(column)">
            <h2 class="text-lg font-bold mb-4 border-b pb-2" :class="{
              'text-green-600': column === 'complete',
              'text-yellow-600': column === 'review',
              'text-purple-600': column === 'ready',
              'text-red-600': column === 'unassigned',
              'text-gray-600': column === 'archive',
            }">
              {{ column }} ({{ taskList.length }})
            </h2>

            <!-- Drag Items -->
            <div v-for="task, index in taskList" :key="index" @click="store.task = task , store.indexTask = index , store.status = column , store.showModel = true" draggable="true"
              class="bg-white dragItem p-2 rounded flex items-center justify-between  shadow cursor-pointer mb-2"
              @dragstart="() => store.onDragStart(task, column , index)">
              <div class="flex flex-col gap-2">
                <span class="text-[12px]"> {{ task.space }} </span>
                <span class="line-clamp-1">{{ task.name }}</span>
              </div>
              <button @click.stop="store.deleteTask(column , index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </button>
            </div>
           {{ column }}
            <button v-tooltip.bottom="checkSpace()" @click="store.status = column , store.task = undefined , store.indexTask = undefined , checkModal()" class="bg-gray-200 text-sm px-4 py-2 rounded w-full">
              + Add Task
            </button>

            <taskModel :task="store.task" :index="store.indexTask" :statusText="store.status"></taskModel>
          </div>
        </div>

      </div>
    </main>

    <Dialog v-model:visible="store.showModel2" modal header="create new space" class="min-h" :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <span> space name</span>
                <input type="text" v-model="store.spaceText" placeholder="enter the name" class="border outline-none p-2 rounded-lg">
              </div>
              <div class="flex justify-center">
                <button @click="store.addSpace()" class="bg-green-500 px-10 text-white rounded-lg py-2"> create</button>
              </div>
            </div>
        </Dialog>
  </div>


</template>


<style lang="scss">

</style>
