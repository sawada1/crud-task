import { useTasksStore } from "@/stores/index";
import { ref } from 'vue';
export const useSpace = () => {
    let store = useTasksStore();
    const checkUpdate = ref(false);
    const createOrUpdate = () =>{
        if(checkUpdate.value){
            store.editSpace();
            checkUpdate.value = false;
        } else{
            store.addSpace();
        }
    }
    const checkBtns = ref(new Array(store.spaces.length).fill(false));
    function toggleCheckBtn(index: number) {
      checkBtns.value = checkBtns.value.map((_, i) => i === index ? !checkBtns.value[i] : false);
    }
    function closeAllDropdowns() {
      checkBtns.value = new Array(store.spaces.length).fill(false);
    }
    
    return {
        createOrUpdate,
        checkUpdate,
        checkBtns
        ,toggleCheckBtn,
        closeAllDropdowns


    }
  }