<template>
    <div>
        <h1>Investigations Bureau</h1>
        <div class="grid-container-3" >
            <div class="grid-item investigation-card" v-for="investigation in investigations" :key="investigation.id"
            :investigation="investigation" @click="openInvestigation(investigation)">
                {{ investigation.titre }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "InvestigationsView",
    data() {
        return {}
    },
    computed: {
        ...mapState(['investigations'])
    },
    methods: {
        openInvestigation(investigation) {
            this.$router.push({ name: 'InvestigationsDetailsComponent', params: { investigation: investigation } })
        }
    }
}
</script>