<template>
    <div class="mb-6">
        <!-- <div class="bg-blue-400 w-full h-52">asd</div> -->

        <!-- <div class="flex gap-1">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
            <span v-if="required" class="text-red-500">*</span>
        </div> -->
        <!-- <input v-maska="mask" :required="required" type="text" v-model="modelValue"
            class="bg-gray-50 border border-gray-300  text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> -->
        <div class="relative w-full min-w-[200px] h-14">
            <input class="peer w-full h-full bg-transparent text-blue-gray-700  
                outline outline-0 focus:outline-0 
                disabled:bg-blue-gray-50  transition-all  
                  -transparent   px-3 
                  rounded-[7px]   
                 border-b
                  border-b-gray-400" placeholder="" :value="value" @input="$emit('input', $event.target.value);" />
            <label class="flex w-full h-full select-none pointer-events-none
                 absolute left-3 font-normal !overflow-visible truncate
                  leading-normal peer-focus:leading-normal 
                   transition-all -top-0 peer-placeholder-shown:text-xs
                   text-xs peer-placeholder-shown:leading-[3.75]
                       text-gray-500 peer-focus:text-[#50B053]  
                         " :class="value ? 'text-[#50B053]' : ''">{{ label }}
            </label>
        </div>
    </div>
</template>

<script>
import { vMaska } from "maska/vue";

export default {
    name: "",
    props: {
        label: { type: String }, required: { type: Boolean, default: false },
        mask: {
            type: String,
            required: false,
        },
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    }
}
</script>