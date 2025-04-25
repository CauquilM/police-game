<template>
    <div class="dashboard">
        <h1>Commissariat Central</h1>
        <div class="section agents">
            <h2 class="mb-25">👮 Manage Units</h2>
            <div v-if="agents.length > 3">
                <div v-if="screenWidth > 800" class="grid-container-4">
                    <AgentComponent :officeOpen="true" class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else-if="screenWidth > 670" class="grid-container-3">
                    <AgentComponent :officeOpen="true" class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else class="d-flex flex-direction-column align-items-center">
                    <AgentComponent :officeOpen="true" class="agent-card grid-item mb-15" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
            </div>
            <div v-else>
                <div v-if="screenWidth > 800" class="grid-container-3">
                    <AgentComponent :officeOpen="true" class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else-if="screenWidth > 670" class="grid-container-2">
                    <AgentComponent :officeOpen="true" class="agent-card grid-item" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
                <div v-else class="d-flex flex-direction-column align-items-center">
                    <AgentComponent :officeOpen="true" class="agent-card grid-item mb-15" v-for="agent in agents" :key="agent.id"
                        :agent="agent" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import AgentComponent from '../components/AgentComponent'

export default {
    name: "OfficeView",
    components: {
        AgentComponent
    },
    computed: {
        ...mapState(["agents", "screenWidth"])
    }
}
</script>