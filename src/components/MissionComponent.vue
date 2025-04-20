<template>
    <div>
        <h3>{{ mission.title }}</h3>
        <p>Status : <strong>{{ statusLabelComputed }}</strong></p>
        <div v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'">
            <p class="mb-5">Engaged units:</p>
            <ul class="list">
                <li class="list-car" v-for="(agentId, index) in mission.assignedAgentsId" :key="index">
                    {{ getAgentName(agentId) }}
                </li>
            </ul>
        </div>
        <div class="d-flex justify-content-space-around">
            <button class="button-green" v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'"
                @click="resolve">
                Accepter
            </button>
            <button class="button-red" v-if="mission.assignedAgentsId.length == 0 && mission.status === 'pending'"
                @click="refuseMission">
                Refuser
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: "MissionComponent",
    data() {
        return {
            patrolStatus: ''
        }
    },
    props: {
        mission: Object
    },
    computed: {
        ...mapState(['agents',]),
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
        ...mapActions(['resolveMission', 'refuseMission']),
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