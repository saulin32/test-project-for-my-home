<template>
    <font-awesome-icon :icon="name"/>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    components:{
        FontAwesomeIcon
    },
    props: {
        name: {
            type: String,
            required: true,
        }
    },
    data() {
        return {

        }
    }
}
</script>