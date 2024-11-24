<template>
    <div>
        <Dialog v-model:visible="store.showModel" modal header="Header" :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <span> title </span>
                    <div class="title flex flex-col border p-3 rounded-lg">
                        <input v-model="name" type="text" placeholder="write the task"
                            class="bg-transparent placeholder:text-blac outline-none">
                    </div>
                    <div class="text-[tomato]">{{ errors.name }}</div>

                </div>
                <div class="flex flex-col gap-2">
                    <span> date </span>
                    <DatePicker v-model="date" dateFormat="mm/dd/yy" placeholder="choose date" showIcon fluid
                        iconDisplay="input" inputId="icondisplay" />
                    <div class="text-[tomato]">{{ errors.date }}</div>
                </div>
                <div class="flex flex-col gap-2">
                    <span> description </span>
                    <textarea v-model="description" class="w-full border outline-none p-2 rounded-lg"
                        placeholder="write description" style="resize: none;" name="" id="" cols="4"
                        rows="5"></textarea>
                    <div class="text-[tomato]">{{ errors.description }}</div>
                </div>

                <div class="flex flex-col gap-2">
                    <span>status</span>
                    <select v-model="status" name="" id="" class="border outline-none p-2 rounded-lg">
                        <option value="" :disabled="true"> status </option>
                        <option v-for="i in statusArr" :value="i"> {{ i }} </option>
                    </select>
                    <div class="text-[tomato]">{{ errors.status }}</div>
                </div>
                <div class="flex flex-col gap-2">
                    <span> space </span>
                    <select v-model="space" name="" id="" class="border outline-none p-2 rounded-lg">
                        <option value="" :disabled="true"> space </option>
                        <option v-for="i in store.spaces" :value="i"> {{ i }} </option>
                    </select>
                    <div class="text-[tomato]">{{ errors.space }}</div>
                </div>
                <button class="bg-green-500 rounded-lg p-3  text-white" @click="createTask()">{{ index ? 'update' : 'create' }}</button>
            </div>
        </Dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import DatePicker from 'primevue/datepicker';
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useTasksStore } from "@/stores/index";
interface taskData {
    name: string,
    space?: string,
    date: string,
    status?: string;
    description: string
}
type TaskColumn = "complete" | "review" | "ready" | "unassigned" | "archive";

let store = useTasksStore();
import Dialog from 'primevue/dialog';
let statusArr = ref(["complete", "review", "ready", "unassigned", "archive"]);
let props = defineProps({
    task: {
        required: false,
        type: Object,
        default: {} as taskData,
    },
    index: {
        required: false,
        type: Number
    },
    statusText: {
        required: false,
        type: String
    }
})
const { errors, handleSubmit, values, resetForm, defineField } = useForm({
    validationSchema: yup.object({
        name: yup.string().required(),
        space: yup.string().required(),
        date: yup.string().required(),
        status: yup.string().required().oneOf(["complete", "review", "ready", "unassigned", "archive"]),
        description: yup.string().required(),
    }),
});
const [name, nameAttrs] = defineField("name");
const [space, spaceAttrs] = defineField("space");
const [date, dateAttrs] = defineField("date");
const [status, statusAttrs] = defineField("status");
const [description, descriptionAttrs] = defineField("description");


watch(() => props.statusText, (val) => {
    if (val) {
        status.value = val;
    }
})
watch(() => props.task, (newTask) => {
    if (newTask) {
        resetForm({
            values: {
                name: newTask.name || "",
                space: newTask.space || "",
                date: newTask.date || "",
                status: newTask.status || "",
                description: newTask.description || "",
            },
        });
    } else {
        resetForm();
    }
},

);

const editTask = () => {
    const statusKey = values.status as TaskColumn;
    store.tasks[statusKey][props.index as number] = {
        name: values.name,
        description: values.description,
        status: statusKey,
        space: values.space || "",
        date: values.date,
    };
}

const createTask = handleSubmit(() => {
    if (props.index !== undefined) {
        const statusKey = values.status as TaskColumn;
        if (store.tasks[statusKey][props.index]) {
            console.log(store.tasks[statusKey][props.index]);
            editTask();
        }
        if (props.statusText) {
            store.tasks[props.statusText as TaskColumn].splice(props.index, 1);
            store.tasks[statusKey].push(props.task as taskData);
            editTask();
        }

    } else {
        const statusKey = values.status as TaskColumn;
        store.tasks[statusKey].push({
            name: values.name,
            description: values.description,
            status: statusKey,
            space: values.space || "",
            date: values.date,
        });

    }

    store.showModel = false;
    resetForm();
});

</script>
<style lang="">

</style>