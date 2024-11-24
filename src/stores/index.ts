import { ref, onMounted, watch } from "vue";
import { defineStore } from "pinia";
interface taskData {
    name: string,
    space?: string,
    date: string,
    status?: string;
    description: string
}
type TaskColumn = 'complete' | 'review' | 'ready' | 'unassigned' | 'archive';
export const useTasksStore = defineStore("tasks", () => {
    let showModel = ref(false);
    let showModel2 = ref(false);
    const spaces = ref<string[]>([]);
    const spaceText = ref('');
    const tasks = ref<Record<TaskColumn, taskData[]>>({
        complete: [],
        review: [],
        ready: [],
        unassigned: [],
        archive: [],
    });
    
    const task = ref<taskData | undefined>()
    const indexTask = ref<number | undefined>();
    const status = ref<string | undefined>();


    // Dragging state
    const draggingItem = ref<taskData | null>(null);
    const draggingFrom = ref<TaskColumn | null>(null);
    const indexFrom = ref<number | null>(null);

    // Handlers for drag-and-drop events
    function onDragStart(task: taskData, column: TaskColumn , num:number) {
        draggingItem.value = task;
        draggingFrom.value = column;
        indexFrom.value = num;
    }

    function onDrop(targetColumn: TaskColumn) {
        if (draggingItem.value && draggingFrom.value) {
            const fromTasks = tasks.value[draggingFrom.value];
            const taskIndex = fromTasks.indexOf(draggingItem.value);
            if (taskIndex !== -1) fromTasks.splice(taskIndex, 1);      
            tasks.value[targetColumn].push(draggingItem.value);
            tasks.value[targetColumn][indexFrom.value as number].status = targetColumn;
            draggingItem.value = null;
            draggingFrom.value = null;
        }
    }

    function onDragOver(event: DragEvent) {
        event.preventDefault(); // Allow drop
    }
     
    const addSpace = () =>{
        if(spaceText.value != ''){
            spaces.value.push(spaceText.value)
            spaceText.value = '';
            showModel2.value = false;
        }
    }

    const deleteSpace = (index:number , text:string)=>{
    spaces.value.splice(index , 1);
    for (const column in tasks.value) {
        tasks.value[column as TaskColumn] = tasks.value[column as TaskColumn].filter((task) => task.space !== text);
        // if (Object.prototype.hasOwnProperty.call(tasks.value, column)) {
        // }
      }
    }

    return {
        showModel,
        onDragStart,
        onDrop,
        onDragOver,
        showModel2,
        indexTask,
        tasks,
        status,
        spaceText,
        deleteSpace,
        addSpace,
        spaces,
        task
    };
});