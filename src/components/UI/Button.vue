<template>
    <div>
        <button type="button"
            class="focus:outline-none text-white bg-[#50B053] hover:bg-[#319c4b] focus:ring-4 focus:ring-green-300 font-medium 
            rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-[#50B053] dark:focus:ring-[#319c4b]">
            <slot></slot>
        </button>
    </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
    props: {
        // label: { type: String }
    },
    components:{
        Icon
    },
    data() {
        return {

        }
    }
}
</script>