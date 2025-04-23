<template>
    <div>
        <h1 class="mb-25">Investigations Bureau</h1>
        <div :class="screenWidth > 500 ? 'grid-container-2' : 'd-flex flex-direction-column align-items-center mb-15'">
            <div :class="screenWidth > 500 ? 'investigation-card grid-item' : 'investigation-card grid-item mb-15'"
                v-for="investigation in investigationsStore" :key="investigation.id" :investigation="investigation"
                @click="openInvestigation(investigation)">
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
        ...mapState(['investigationsStore'])
    },
    methods: {
        openInvestigation(investigation) {
            this.$router.push({ name: 'InvestigationsDetailsComponent', params: { investigation: investigation } })
        }
    }
}
</script>