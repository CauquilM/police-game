<template>
    <div class="dashboard">
        <h1>Commissariat Central</h1>

        <div class="section agents">
            <h2>👮 Agents disponibles</h2>
            <div class="grid-container-4">
                <div class="agent-card grid-item" v-for="agent in agents" :key="agent.id" :class="{ busy: agent.busy }">
                    <h3 class="d-flex justify-content-flex-start"><img class="w-30" src="../assets/police-badge.svg"
                            alt="police-badge">
                        <span class="rank ml-5 mr-5">{{ agent.rank }}
                        </span> <span>{{ agent.name }}</span>
                    </h3>
                    <h3 class="d-flex justify-content-flex-start">
                        <img class="w-30" src="../assets/police-radio.svg" alt="police-radio">
                        <span class="ml-5">{{ agent.radio }}</span>
                    </h3>
                    <p>Niveau : {{ agent.level }}</p>
                    <div v-if="agent.busy" class="d-flex flex-direction-column">
                        <div class="d-flex">
                            <img class="w-30" src="../assets/crime-scene.svg" alt="crime-scene">
                            <span class="ml-5">En mission</span>
                        </div>
                        <button @click="removeAgent(agent.id)">❌ Retirer de la mission</button>
                    </div>
                    <div class="d-flex flex-direction-column" v-else>
                        <div class="d-flex">
                            <img class="w-30" src="../assets/police-car-patroling.svg" alt="police-car-patroling">
                            <span class="ml-5">En patrouille</span>
                        </div>
                        <button @click="assignAgent(agent.id)">Assigner à la mission</button>
                    </div>
                    <div class="equipment-bag">
                        <img v-if="agent.equipment.includes('handcuffs')" class="equipment"
                            src="../assets/handcuffs.svg" alt="handcuffs">
                        <img v-if="agent.equipment.includes('nightstick')" class="equipment"
                            src="../assets/nightstick.svg" alt="nightstick">
                        <img v-if="agent.equipment.includes('police-vest')" class="equipment"
                            src="../assets/police-vest.svg" alt="police-vest">
                        <img v-if="agent.equipment.includes('handgun')" class="equipment" src="../assets/handgun.svg"
                            alt="handgun">
                        <img v-if="agent.equipment.includes('taser')" class="equipment" src="../assets/taser.svg"
                            alt="taser">
                    </div>
                </div>
            </div>
        </div>

        <div class="section mission">
            <h2>📋 Missions actuelles</h2>
            <div class="mission-card">
                <h3>{{ mission.title }}</h3>
                <p>Difficulté : {{ mission.difficulty }}</p>
                <p>Status : <strong>{{ statusLabelComputed }}</strong></p>
                <div v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'">
                    <p class="mb-5">Engaged units:</p>
                    <ul class="list">
                        <li class="list-car" v-for="(agentId, index) in mission.assignedAgentsId" :key="index">
                            {{ getAgentName(agentId) }}
                        </li>
                    </ul>
                </div>
                <p v-if="patrolStatus !== ''">ETA: {{ patrolStatus }}</p>
                <div class="d-flex justify-content-space-around">
                    <button class="button-green"
                        v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'" @click="resolve">
                        Accepter
                    </button>
                    <button class="button-red"
                        v-if="mission.assignedAgentsId.length == 0 && mission.status === 'pending'" @click="resolve">
                        Refuser
                    </button>
                </div>
            </div>
        </div>
        <div class="section mission">
            <h2>📋 Missions TEMP actuelles</h2>
            <div class="grid-container-3">
                <div v-for="(mission, index) in missionsCurrent" :key="index" class="mission-card grid-item">
                    <h3>{{ mission.title }} / index {{ index }}</h3>
                    <p>Difficulté : {{ mission.difficulty }}</p>
                    <p>Status : <strong>{{ statusLabelComputed }}</strong></p>
                    <div v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'">
                        <p class="mb-5">Engaged units:</p>
                        <ul class="list">
                            <li class="list-car" v-for="(agentId, index) in mission.assignedAgentsId" :key="index">
                                {{ getAgentName(agentId) }}
                            </li>
                        </ul>
                    </div>
                    <button>Test id</button>
                    <div class="d-flex justify-content-space-around">
                        <button class="button-green"
                            v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'" @click="resolve">
                            Accepter
                        </button>
                        <button class="button-red"
                            v-if="mission.assignedAgentsId.length == 0 && mission.status === 'pending'"
                            @click="refuseMission">
                            Refuser
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button @click="chooseTempMission">Test</button>
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
        ...mapState(['agents', 'missionsCurrent', 'mission']),
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
        ...mapActions(['resolveMission', 'chooseMission', 'chooseTempMission', 'refuseMission']),
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

        },
        getAgentName(id) {
            const agent = this.agents.find(a => a.id === id);
            return agent.radio;
        }
    }
}
</script>

<style scoped>
.ml-5 {
    margin-left: 5px;
}

.mr-5 {
    margin-right: 5px;
}

.mb-5 {
    margin-bottom: 5px;
}

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

.w-30 {
    width: 30px;
}

.d-flex {
    display: flex;
}

.justify-content-flex-start {
    justify-content: flex-start;
}

.flex-direction-column {
    flex-direction: column;
}

.justify-content-space-around {
    justify-content: space-around;
}

.justify-content-space-between {
    justify-content: space-between;
}

.grid-container-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 3 colonnes */
    gap: 10px;
    /* espace entre les divs */
}

.grid-container-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 3 colonnes */
    gap: 10px;
    /* espace entre les divs */
}

.grid-item {
    background-color: lightblue;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
}

.list {
    padding: 0;
    margin: 0;
    list-style-type: none;
}

.list-car {
    background: url('../assets/police-car-patroling.svg') no-repeat left top;
    height: 34px;
    padding-top: 7px;
    padding-left: 48px;
    padding-right: 5px;
}

h1,
h2 {
    text-align: center;
    color: whitesmoke;
    margin-bottom: 10px;
}

.section {
    margin-bottom: 30px;
}

.agent-card,
.mission-card {
    background: #2e3b4e;
    padding: 15px;
    border-radius: 10px;
    width: 250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.agent-card h3 {
    margin: 0 0 5px;
}

.agent-card.busy {
    opacity: 0.8;
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

.button-green {
    background-color: green;
}

.button-green:hover {
    background-color: darkgreen;
}

.button-red {
    background-color: red;
}

.button-red:hover {
    background-color: darkred;
}
</style>