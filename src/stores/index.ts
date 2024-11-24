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
    const showSidebar = ref(false);
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

    const draggingItem = ref<taskData | null>(null);
    const draggingFrom = ref<TaskColumn | null>(null);
    const indexFrom = ref<number | null>(null);
    const indexSpace = ref<number | undefined>();

    function onDragStart(task: taskData, column: TaskColumn, num: number) {
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

    const addSpace = () => {
        let checkSpace = spaces.value.includes(spaceText.value.toLowerCase())
        if (spaceText.value != '') {
            if (checkSpace) {
                console.log('exist item');

            } else {
                spaces.value.push(spaceText.value.toLowerCase())
                spaceText.value = '';
                showModel2.value = false;
            }
        }
    }
    const editSpace = ()=>{
        spaces.value[indexSpace.value as number] = spaceText.value;
        indexSpace.value = undefined;
        spaceText.value = '';
        showModel2.value = false;
    }

    const deleteSpace = (index: number, text: string) => {
        spaces.value.splice(index, 1);
        for (const column in tasks.value) {
            tasks.value[column as TaskColumn] = tasks.value[column as TaskColumn].filter((task) => task.space !== text);
        }
    }
    const deleteTask = (targetColumn: TaskColumn, index: number) => {
        tasks.value[targetColumn].splice(index, 1);
    }

    return {
        showModel,
        onDragStart,
        onDrop,
        onDragOver,
        showModel2,
        indexTask,
        editSpace,
        indexSpace,
        showSidebar,
        tasks,
        status,
        deleteTask,
        spaceText,
        deleteSpace,
        addSpace,
        spaces,
        task
    };
});