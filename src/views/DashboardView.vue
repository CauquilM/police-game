<template>
    <div class="dashboard">
        <h1>🎮 Commissariat Central</h1>

        <div class="section agents">
            <h2>👮 Agents disponibles</h2>
            <div class="agent-list">
                <div class="agent-card" v-for="agent in agents" :key="agent.id" :class="{ busy: agent.busy }">
                    <h3><span class="rank">{{ agent.rank }}</span> {{ agent.name }}</h3>
                    <!-- <p>Niveau : {{ agent.level }}</p> -->
                    <span v-if="agent.busy" class="status">🚨 En mission
                        <button @click="removeAgent(agent.id)">❌ Retirer de la mission</button>
                    </span>
                    <span v-else>🚔 En patrouille
                        <button @click="assignAgent(agent.id)">Assigner à la mission</button>
                    </span>
                    <div class="equipment-bag">
                        <img v-if="agent.equipment.includes('handcuffs')" class="equipment" src="../assets/handcuffs.svg" alt="handcuffs">
                        <img v-if="agent.equipment.includes('nightstick')" class="equipment" src="../assets/nightstick.svg" alt="nightstick">
                        <img v-if="agent.equipment.includes('police-vest')" class="equipment" src="../assets/police-vest.svg" alt="police-vest">
                        <img v-if="agent.equipment.includes('handgun')" class="equipment" src="../assets/handgun.svg" alt="handgun">
                        <img v-if="agent.equipment.includes('taser')" class="equipment" src="../assets/taser.svg" alt="taser">
                    </div>
                </div>
            </div>
        </div>

        <div class="section mission">
            <h2>📋 Mission actuelle</h2>
            <div class="mission-card">
                <h3>{{ mission.title }}</h3>
                <!-- <p>Difficulté : {{ mission.difficulty }}</p> -->
                <p>Status : <strong>{{ statusLabelComputed }}</strong></p>
                <button v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'" @click="resolve">
                    Résoudre la mission
                </button>
                <p v-if="patrolStatus !== ''">ETA: {{ patrolStatus }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: "DashboardView",
    data() {
        return {
            patrolStatus: ''
        }
    },
    created() {
        this.chooseMission();
    },
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
        ...mapActions(['resolveMission', 'chooseMission']),
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
            this.patrolStatus = "🚓💨 En route"
            setTimeout(() => { this.patrolStatus = "👮🚧 On scene" }, "1000"); // 1000 ms = 1 seconde
            setTimeout(() => { this.resolveMission() }, "2000"); // 1000 ms = 1 seconde

        }
    }
}
</script>

<style scoped>
.dashboard {
    background-color: #1e2a38;
    color: #fff;
    min-height: 100vh;
    font-family: 'Segoe UI', sans-serif;
}

.equipment-bag {
    display: flex;
    margin-top: 20px;
}

.equipment {
    width: 30px;
    margin: auto;
}

h1,
h2 {
    color: #00bcd4;
    margin-bottom: 10px;
}

.section {
    margin-bottom: 30px;
}

.agent-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.agent-card,
.mission-card {
    background: #2e3b4e;
    padding: 15px;
    border-radius: 10px;
    width: 220px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.agent-card h3 {
    margin: 0 0 5px;
}

.agent-card.busy {
    opacity: 0.6;
}

.status {
    color: #ff9800;
    font-weight: bold;
}

.rank {
    color: gold;
}

button {
    margin-top: 10px;
    padding: 6px 12px;
    background: #00bcd4;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #0097a7;
}
</style>