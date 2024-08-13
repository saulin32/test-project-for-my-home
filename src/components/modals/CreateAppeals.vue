<template>
    <div>
        <v-btn @click="showModal = true" color="#50B053" class="!text-white !h-[26px] !text-[10px] !font-normal">
            Создать
        </v-btn>
        <v-dialog v-model="showModal" width="738">
            <div class="bg-white px-8 py-6 flex flex-col gap-8">
                <div class="flex justify-between">
                    <p class="text-[#333333] text-base font-medium">{{ appeal.title }}</p>
                    <p>{{ appeal.status }}</p>
                </div>
                <div class="grid grid-cols-3 gap-[14px]">
                    <v-autocomplete label="Дом" v-model="appeal.house" :items="premises"
                        :search-input.sync="searchPremise" item-text="full_address" return-object hide-no-data
                        hide-selected require></v-autocomplete>
                    <v-autocomplete label="Квартира" v-model="appeal.flat" :items="apartments" item-text="label"
                        return-object hide-no-data hide-selected></v-autocomplete>
                    <v-text-field label="Срок" v-model="appeal.term" type="datetime-local"></v-text-field>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <v-text-field label="Фамилия" v-model="appeal.lastname"></v-text-field>
                    <v-text-field label="Имя" v-model="appeal.firstname"></v-text-field>
                    <v-text-field label="Отчество" v-model="appeal.patronymic"></v-text-field>
                    <v-text-field label="Телефон" v-model="appeal.phoneNumber"></v-text-field>
                    <v-textarea label="Описание заявки" class="!col-span-4" v-model="appeal.description"></v-textarea>
                </div>
                <div class="flex justify-end">
                    <v-btn class="!h-8 !text-white !text-[14px] !font-normal" color="#50B053" @click="createAppeal">{{
                        appeal.id ? 'Сохранить' :
                            'Создать' }}</v-btn>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import debounce from 'lodash/debounce'
export default {
    emits: ['update'],
    data() {
        return {
            premises: [],
            showModal: false,
            appeal: {
                house: null,
                flat: null,
                term: null,
                lastname: '',
                firstname: '',
                patronymic: '',
                phoneNumber: '',
                description: '',
                status: 'Новая',
                title: 'Создание заявки',
                id: null,
            },
            searchPremise: null,
            apartments: [],
        }
    },

    methods: {
        debouncedGetPremise: debounce(function (e) {
            window.axios.get(`geo/v2.0/user-premises/?search=${e}`).then(response => {
                this.premises = response.data.results;
            }).catch(error => console.error(error));
        }, 500),
        debouncedGetApartments: debounce(function () {
            window.axios.get(`geo/v1.0/apartments/?premise_id={${this.appeal.house.id}}&search=`).then(response => {
                this.apartments = response.data.results
            }).catch(error => console.error(error));
        }, 500),
        createAppeal() {
            console.log(this.appeal.term);
            // 2132-03-21T03:33
            let method = "POST"
            let data = {
                premise_id: this.appeal.house.id,
                apartment_id: this.appeal.flat.id,
                applicant: {
                    first_name: this.appeal.firstname,
                    last_name: this.appeal.lastname,
                    patronymic_name: this.appeal.patronymic,
                    username: this.appeal.phoneNumber,
                },
                description: this.appeal.description,
                due_date: dayjs(this.appeal.term, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                status_id: 1
            }
            let url = "appeals/v1.0/appeals/"
            if (this.appeal.id) {
                url += `${this.appeal.id}/`
                method = "PATCH"
                delete data.status_id
            }
            window.axios(url, { method: method, data: data })
                .then(response => {
                    this.showModal = false
                    this.$emit('update')
                })
                .catch(error => console.error(error))
        },
    },
    watch: {
        searchPremise(val) {
            if (val?.length < 3) return
            this.debouncedGetPremise(val)
        },
        'appeal.house'(val, oldVal) {
            if (!oldVal && val && !this.premises.length) {
                this.debouncedGetPremise(val.full_address)
                this.debouncedGetApartments()
                return
            }
            if (!val || !this.appeal.house?.id) return
            this.debouncedGetApartments()
        },
        showModal(val) {
            if (!val)
                this.appeal = {
                    house: null,
                    flat: null,
                    term: null,
                    lastname: '',
                    firstname: '',
                    patronymic: '',
                    phoneNumber: '',
                    description: '',
                    status: 'Новая',
                    title: 'Создание заявки',
                    id: null,
                }
        }
    }
}

</script>

<style scoped></style>
