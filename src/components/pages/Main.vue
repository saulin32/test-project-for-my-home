<template>
    <div class="px-8">
        <div class="py-[23px] mb-[27px] h-[71px] flex justify-between items-center">
            <p class="font-medium text-2xl">Список зявок</p>
            <v-btn color="#ff0000" class="!text-white !h-[26px] !text-[10px] !font-normal" @click="logout">Выйти из
                аккаунта</v-btn>
        </div>
        <div class="px-5 py-[10px]">
            <div class="!flex !justify-end">
                <create-appeals ref="createAppealModal" @update="getAppeals"></create-appeals>
            </div>
            <div class="flex gap-[15px]">
                <v-text-field label="Поиск (№ заявки, название)" append-icon="mdi-magnify" class="!h-[56px]"
                    v-model="filters.number"></v-text-field>
                <!-- <v-text-field label="Дом" append-icon="mdi-menu-down"></v-text-field> -->
                <v-autocomplete label="Дом" :items="premises" :search-input.sync="searchPremise"
                    item-text="full_address" return-object hide-no-data hide-selected
                    v-model="filters.house"></v-autocomplete>
            </div>
            <v-data-table :headers="headers" :items="filterAppeals" item-key="id" hide-default-footer :page.sync="page"
                :items-per-page="+countForShow">
                <!-- <template v-slot:column.headers="{ props }">
                    <th v-bind="props" class="text-#50B053">
                        {{ props.column.text }}
                    </th>
                </template> -->
                <template v-slot:item.number="{ item }">
                    <v-btn color="#50B053" class="!text-white !text-sm" @click="editAppeal(item)">
                        {{ item.number }}
                    </v-btn>
                </template>
                <template v-slot:item.address="{ item }">
                    {{ (item.premise?.full_address || '') + (item.apartment?.label || '') }}
                </template>
                <template v-slot:item.created_at="{ item }">
                    {{ dateFormat(item.created_at) }}
                </template>
                <template v-slot:item.name="{ item }">
                    {{ item.applicant.last_name + ' ' + item.applicant.first_name + ' ' +
                        item.applicant.patronymic_name }}
                </template>
                <template v-slot:item.description="{ item }">
                    <p class="!break-all">
                        {{ item.description }}
                    </p>
                </template>
                <template v-slot:item.due_date="{ item }">
                    {{ dateFormat(item.due_date) }}
                </template>
            </v-data-table>
            <div class="flex justify-between items-end" v-if="appeals?.results?.length">
                <div class="flex gap-3 items-end">
                    <p><b>1 - {{ countForShow }}</b> из <b>{{ appeals.results?.length }}</b> записей</p>
                    <v-text-field label="" append-icon="mdi-menu-down" class="!w-[89px] !h-10"
                        v-model="countForShow"></v-text-field>
                </div>
                <div>
                    <v-pagination v-model="page" :length="Math.ceil(appeals.results?.length / countForShow)" circle
                        :total-visible="7" color="#50B053"></v-pagination>
                </div>
            </div>
            <!-- <v-text-field :value="itemsPerPage" label="Items per page" type="number" min="-1" max="15"
                @input="itemsPerPage = parseInt($event, 10)"></v-text-field> -->
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import CreateAppeals from '../modals/CreateAppeals.vue';
import debounce from 'lodash/debounce'

export default
    {
        components: { CreateAppeals },
        data() {
            return {
                appeals: [],
                page: 1,
                countForShow: 10,
                premises: [],
                searchPremise: '',
                filters: {
                    house: null,
                    number: null,
                }
            }
        },
        methods: {
            logout() {
                if (confirm('Вы уверены что хотите выйти из аккаунта?')) {
                    this.$store.commit('setUser', null)
                    this.$router.push('/login')
                }
            },
            dateFormat(date) {
                if (date)
                    return dayjs(date).format('DD.MM.YYYY')
                return ''
            },
            getAppeals() {
                window.axios.get('appeals/v1.0/appeals/',).then(response => {
                    console.log(response)
                    this.appeals = response.data
                }).catch(error => console.error(error))
            },
            editAppeal(item) {
                this.$refs.createAppealModal.appeal = {
                    house: { ...item.premise },
                    flat: { ...item.apartment },
                    term: dayjs(item.due_date).format('YYYY-MM-DDTHH:mm'),
                    lastname: item.applicant.last_name,
                    firstname: item.applicant.first_name,
                    patronymic: item.applicant.patronymic_name,
                    phoneNumber: item.applicant.username,
                    description: item.description,
                    status: item.status.name,
                    title: 'Заявка № ' + item.number + ' (от ' + this.dateFormat(item.created_at) + ')',
                    id: item.id,
                }
                this.$refs.createAppealModal.showModal = true
            },
            debouncedGetPremise: debounce(function (e) {
                window.axios.get(`geo/v2.0/user-premises/?search=${e}`).then(response => {
                    this.premises = response.data.results;
                }).catch(error => console.error(error));
            }, 500),
        },
        computed: {
            headers() {
                return [
                    {
                        text: '№',
                        align: '',
                        sortable: false,
                        value: 'number',
                    },
                    {
                        text: 'Создана',
                        value: 'created_at',
                        // filter: value => {
                        //     if (!value) return true
                        //     // return value < parseInt(this.calories)
                        // },
                    },
                    { text: 'Адрес', value: 'address', sortable: false, },
                    { text: 'Заявитель', value: 'name', sortable: false, },
                    { text: 'Описание', value: 'description', sortable: false, },
                    { text: 'Срок', value: 'due_date', sortable: false, },
                    { text: 'Статус', value: 'status.name', sortable: false, },

                ]
            },
            filterAppeals() {
                // console.log(this.appeals?.results);
                let resultFiltered = this.appeals?.results
                if (this.filters.house)
                    resultFiltered = resultFiltered.filter(i => i.premise?.id === this.filters.house.id)
                if (this.filters.number)
                    resultFiltered = resultFiltered.filter(i => i?.number.toString().includes(this.filters.number))
                return resultFiltered
            }
        },
        created() {
            this.getAppeals()
        },
        // watch: {
        //     page(newVal, oldVal) {
        //         if (newVal && oldVal)
        //             if ((Math.floor(newVal * this.countForShow / 100)) > (Math.floor(oldVal * this.countForShow / 100))) this.getAppeals()
        //     },
        //     countForShow(newVal, oldVal) {
        //         if (newVal && oldVal)
        //             if ((Math.floor(newVal * this.page / 100)) > (Math.floor(oldVal * this.page / 100))) this.getAppeals()
        //     }
        // }
        watch: {
            searchPremise(val) {
                if (val?.length < 3) return
                this.debouncedGetPremise(val)
            },
        }
    }
</script>

<style scoped></style>