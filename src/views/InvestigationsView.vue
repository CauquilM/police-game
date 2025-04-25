<template>
    <div class="text-black">
        <h1 class="mb-25">Investigations Bureau</h1>
        <div v-if="screenWidth >= 670" class="grid-container-2">
            <div class="investigation-card grid-item" v-for="investigation in investigationsStore"
                :key="investigation.id" :investigation="investigation" @click="openInvestigation(investigation)">
                {{ investigation.titre }}
            </div>
        </div>
        <div v-else class="d-flex flex-direction-column align-items-center mb-15">
            <div class="investigation-card grid-item mb-15" v-for="investigation in investigationsStore"
                :key="investigation.id" :investigation="investigation" @click="openInvestigation(investigation)">
                {{ investigation.titre }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "InvestigationsView",
    data() {
        return {}
    },
    mounted() {
        this.handleResize(); // initial
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        ...mapState(['agents', 'interventionsCurrent']),
        ...mapState(['investigationsStore', 'screenWidth']),
        screenWidth() {
            return this.$store.getters.screenWidth;
        }
    },
    methods: {
        ...mapActions(['updateScreenWidth']),
        handleResize() {
            this.updateScreenWidth();
        },
        openInvestigation(investigation) {
            this.$router.push({ name: 'InvestigationsDetailsComponent', params: { investigation: investigation } })
        }
    }
}
</script>