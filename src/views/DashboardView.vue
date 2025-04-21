<template>
    <div class="dashboard">
        <h1>Commissariat Central</h1>
        <div class="section agents">
            <h2 class="mb-25">👮 Available units</h2>
            <div v-if="agents.length > 3" class="grid-container-4">
                <AgentComponent class="agent-card grid-item" v-for="agent in agents" :key="agent.id" :agent="agent"
                    :class="{ busy: agent.busy }" />
            </div>
            <div v-else class="grid-container-3">
                <AgentComponent class="agent-card grid-item" v-for="agent in agents" :key="agent.id" :agent="agent"
                    :class="{ busy: agent.busy }" />
            </div>
        </div>
        <div class="section mission">
            <h2>📋 Missions actuelles</h2>
            <div class="grid-container-3">
                <MissionComponent v-for="(mission, index) in missionsCurrent" :key="index"
                    class="mission-card grid-item" :mission="mission"></MissionComponent>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
    computed: {
        ...mapState(['agents', 'missionsCurrent']),
    },
    methods: {
        ...mapMutations(['SET_ASSIGN_AGENT']),
        assignAgent(agentId) {
            if (!this.mission.assignedAgentId) {
                this.SET_ASSIGN_AGENT(agentId)
            }
        },
        removeAgent(agentId) {
            if (!this.mission.assignedAgentId) {
                this.SET_ASSIGN_AGENT(agentId)
            }
        }
    }
}
</script>