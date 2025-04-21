<template>
    <div class="dashboard">
        <h1>Commissariat Central {{ screenWidth }}</h1>
        <div class="section agents">
            <h2 class="mb-25">👮 Available units</h2>
            <div v-if="agents.length > 3"
                :class="screenWidth > 500 ? 'grid-container-4' : 'd-flex flex-direction-column align-items-center'">
                <AgentComponent :class="screenWidth > 500 ? 'agent-card grid-item' : 'agent-card grid-item mb-15'"
                    v-for="agent in agents" :key="agent.id" :agent="agent" />
            </div>
            <div v-else
                :class="screenWidth > 500 ? 'grid-container-3' : 'd-flex flex-direction-column align-items-center'">
                <AgentComponent :class="screenWidth > 500 ? 'agent-card grid-item' : 'agent-card grid-item mb-15'"
                    v-for="agent in agents" :key="agent.id" :agent="agent" />
            </div>
        </div>
        <div class="section mission">
            <h2>📋 Missions actuelles</h2>
            <div :class="screenWidth > 500 ? 'grid-container-3' : 'd-flex flex-direction-column align-items-center'">
                <MissionComponent v-for="(mission, index) in missionsCurrent" :key="index"
                :class="screenWidth > 500 ? 'mission-card grid-item' : 'mission-card grid-item mb-15'" 
                :mission="mission"></MissionComponent>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AgentComponent from '../components/AgentComponent'
import MissionComponent from '../components/MissionComponent'

export default {
    name: "DashboardView",
    components: {
        MissionComponent,
        AgentComponent
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
        ...mapState(['agents', 'missionsCurrent']),
        screenWidth() {
            return this.$store.getters.screenWidth;
        }
    },
    methods: {
        ...mapMutations(['SET_ASSIGN_AGENT']),
        ...mapActions(['updateScreenWidth']),
        assignAgent(agentId) {
            if (!this.mission.assignedAgentId) {
                this.SET_ASSIGN_AGENT(agentId)
            }
        },
        removeAgent(agentId) {
            if (!this.mission.assignedAgentId) {
                this.SET_ASSIGN_AGENT(agentId)
            }
        },
        handleResize() {
            this.updateScreenWidth();
        }
    }
}
</script>