<template>
    <div class="dashboard">
        <h1>🎮 Commissariat central</h1>

        <h2>Agents disponibles</h2>
        <ul>
            <li v-for="agent in agents" :key="agent.id">
                👮 {{ agent.name }} - Niveau {{ agent.level }}
                <span v-if="agent.busy"> - 🚨 En mission
                    <button @click="removeAgent(agent.id)">❌ Retirer de la mission</button>
                </span>
                <span v-else> - 🚔 En patrouille 
                    <button @click="assignAgent(agent.id)">Assigner à la mission</button>
                </span>
            </li>
        </ul>

        <h2>Mission actuelle</h2>
        <p><strong>{{ mission.title }}</strong> (Difficulté : {{ mission.difficulty }})</p>
        <p>Status : {{ statusLabelComputed }}</p>
        <button v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'" @click="resolve">
            Résoudre la mission
        </button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: "DashboardView",
    computed: {
        ...mapState(['agents', 'mission']),
        statusLabelComputed() {
            let statusLabelData;
            switch (this.mission.status) {
                case 'pending':
                    statusLabelData = '🕒 En attente';
                    break;
                case 'success':
                    statusLabelData = '✅ Réussie !';
                    break;
                case 'fail':
                    statusLabelData = '❌ Échec...';
                    break;
            }
            return statusLabelData;
        }
    },
    methods: {
        ...mapMutations(['SET_ASSIGN_AGENT']),
        ...mapActions(['resolveMission']),
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
        resolve() {
            this.resolveMission()
        }
    }
}
</script>

<style scoped>
.dashboard {
    font-family: sans-serif;
    padding: 20px;
}

button {
    margin-left: 10px;
}
</style>