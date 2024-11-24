<template >
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
                 <button @click="store.showModel2 = true , store.spaceText = item , store.indexSpace = index , checkUpdate = true">
                  <span>edit</span>
                 </button>
                 <button @click="store.deleteSpace(index , item)">
                  <span> delete </span>
                 </button>
              </div>
            </div>
          </div>

          <Dialog v-model:visible="store.showModel2" modal header="create new space" class="min-h" :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <span> space name</span>
                <input type="text" v-model="store.spaceText" placeholder="enter the name" class="border outline-none p-2 rounded-lg">
              </div>
              <div class="flex justify-center">
                <button @click="createOrUpdate()" class="bg-green-500 px-10 text-white rounded-lg py-2"> {{ checkUpdate ? 'update' : 'create' }}</button>
              </div>
            </div>
        </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { ref, onMounted , onBeforeUnmount } from 'vue';
import { useTasksStore } from "@/stores/index";
import {useSpace} from '@/composables/spaceLogic'
const {createOrUpdate , closeAllDropdowns , checkUpdate , toggleCheckBtn , checkBtns} = useSpace();
let store = useTasksStore();

onMounted(() => {
  document.addEventListener("click", closeAllDropdowns);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeAllDropdowns);
});
</script>
<style lang="">
    
</style>