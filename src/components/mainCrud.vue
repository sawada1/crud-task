<template>

        <main @click="store.showSidebar = false" class="flex-1 bg-white">
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
           
            <button v-tooltip.bottom="checkSpace()" @click="store.status = column , store.task = undefined , store.indexTask = undefined , checkModal()" class="bg-gray-200 text-[#333] text-sm px-4 py-2 rounded w-full">
              + Add Task
            </button>

            <taskModel :task="store.task" :index="store.indexTask" :statusText="store.status"></taskModel>
          </div>
        </div>

      </div>
    </main>
  
</template>
<script lang="ts" setup>
import taskModel from '@/components/taskModel.vue';
import { useTasksStore } from "@/stores/index";
let store = useTasksStore();
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
</script>
<style lang="">
    
</style>