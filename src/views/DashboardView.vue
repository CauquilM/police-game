<template>
    <div class="dashboard">
        <h1>Commissariat Central</h1>
        <div class="section agents">
            <h2 class="mb-25">👮 Available units</h2>
            <div v-if="agents.length > 3">
                <div v-if="screenWidth > 800" class="grid-container-4">
                    <AgentComponent class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else-if="screenWidth > 670" class="grid-container-3">
                    <AgentComponent class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else class="d-flex flex-direction-column align-items-center">
                    <AgentComponent class="agent-card grid-item mb-15" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
            </div>
            <div v-else>
                <div v-if="screenWidth > 800" class="grid-container-3">
                    <AgentComponent class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else-if="screenWidth > 670" class="grid-container-2">
                    <AgentComponent class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else class="d-flex flex-direction-column align-items-center">
                    <AgentComponent class="agent-card grid-item mb-15" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
            </div>
        </div>
        <div class="section interventions">
            <h2>📋 Interventions actuelles</h2>
            <div v-if="screenWidth > 800" class="grid-container-3">
                <InterventionsComponent v-for="(interventions, index) in interventionsCurrent" :key="index"
                    class="interventions-card grid-item" :interventions="interventions" />
            </div>
            <div v-else-if="screenWidth > 500" class="grid-container-2">
                <InterventionsComponent v-for="(interventions, index) in interventionsCurrent" :key="index"
                    class="interventions-card grid-item" :interventions="interventions" />
            </div>
            <div v-else class="d-flex flex-direction-column align-items-center">
                <InterventionsComponent v-for="(interventions, index) in interventionsCurrent" :key="index"
                    class="interventions-card grid-item mb-10" :interventions="interventions" />
            </div>
        </div>
        <!-- <CarteVilleComponent/>  -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AgentComponent from '../components/AgentComponent'
import InterventionsComponent from '../components/InterventionsComponent'
// import CarteVilleComponent from '../components/CarteVilleComponent'

export default {
    name: "DashboardView",
    components: {
        InterventionsComponent,
        AgentComponent,
        // CarteVilleComponent
    },
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
        screenWidth() {
            return this.$store.getters.screenWidth;
        }
    },
    methods: {
        ...mapActions(['updateScreenWidth']),
        handleResize() {
            this.updateScreenWidth();
        },
    }
}
</script>