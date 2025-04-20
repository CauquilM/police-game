<template>
    <div>
        <h3>{{ mission.title }}</h3>
        <p>Status : <strong>{{ statusLabelComputed }}</strong></p>
        <div class="grid-container-2">
            <div class="grid-items" v-for="(agent) in agents" :key="agent.id">
                <button v-if="agent.busy" :disabled="patrolStatus !== ''" class="agent-selected" @click="assignAgent({ agentId: agent.id, missionId: mission.id })">
                    {{ agent.radio }}
                </button>
                <button v-else class="agent-not-selected" @click="assignAgent({ agentId: agent.id, missionId: mission.id })">
                    {{ agent.radio }}
                </button>
            </div>
        </div>
        <div v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending'">
            <p class="mb-5">Engaged units:</p>
            <ul class="list">
                <li class="list-car text-left" v-for="(agentId, index) in mission.assignedAgentsId" :key="index">
                    {{ getAgentName(agentId) }}
                </li>
            </ul>
        </div>
        <p v-if="patrolStatus !== ''">ETA: {{ patrolStatus }}</p>
        <div class="d-flex justify-content-space-around">
            <button class="button-green" v-if="mission.assignedAgentsId.length > 0 && mission.status === 'pending' && patrolStatus === ''"
                @click="resolve(mission.id)">
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
            patrolStatus: '',
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
        assignAgent({ agentId: agentId, missionId: missionId }) {
            console.log("agentId front: " + agentId + " mission: " + missionId);
            this.SET_ASSIGN_AGENT({ agentId, missionId });
        },
        resolve(missionId) {
            this.patrolStatus = "🚓💨 En route";
            setTimeout(() => { this.patrolStatus = "👮🚧 On scene" }, "10000"); // 1000 ms = 1 seconde
            setTimeout(() => { 
                this.resolveMission(missionId);
                this.patrolStatus = '';
            }, "20000"); // 1000 ms = 1 seconde

        },
        getAgentName(id) {
            const agent = this.agents.find(a => a.id === id);
            return agent.radio;
        }
    }
}
</script>