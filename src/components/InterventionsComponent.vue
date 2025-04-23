<template>
    <div>
        <h3>{{ interventions.title }}</h3>
        <p>Difficulty: {{ interventions.difficulty }}</p>
        <p>Status : <strong>{{ statusLabelComputed }}</strong></p>
        <div class="grid-container-2">
            <div class="grid-items" v-for="(agent) in agents" :key="agent.id">
                <button v-if="agent.busy || agent.isInHospital" :disabled="patrolStatus !== '' || agent.isInHospital" class="agent-selected" @click="assignAgent({ agentId: agent.id, interventionsId: interventions.id })">
                    {{ agent.radio }}
                </button>
                <button v-else class="agent-not-selected" @click="assignAgent({ agentId: agent.id, interventionsId: interventions.id })">
                    {{ agent.radio }}
                </button>
            </div>
        </div>
        <div v-if="interventions.assignedAgentsId.length > 0 && interventions.status === 'pending'">
            <p class="mb-5">Engaged units:</p>
            <ul class="list">
                <li class="list-car text-left" v-for="(agentId, index) in interventions.assignedAgentsId" :key="index">
                    {{ getAgentName(agentId) }}
                </li>
            </ul>
        </div>
        <p v-if="patrolStatus !== ''">ETA: {{ patrolStatus }}</p>
        <div class="d-flex justify-content-space-around">
            <button class="button-green" v-if="interventions.assignedAgentsId.length > 0 && interventions.status === 'pending' && patrolStatus === ''"
                @click="resolve(interventions.id)">
                Accept
            </button>
            <button class="button-red" v-if="interventions.assignedAgentsId.length == 0 && interventions.status === 'pending'"
                @click="refuseInterventions">
                Refuse
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: "InterventionsComponent",
    data() {
        return {
            patrolStatus: '',
        }
    },
    props: {
        interventions: Object
    },
    computed: {
        ...mapState(['agents',]),
        statusLabelComputed() {
            let statusLabelData;
            switch (this.interventions.status) {
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
        ...mapActions(['resolveInterventions', 'refuseInterventions']),
        assignAgent({ agentId: agentId, interventionsId: interventionsId }) {
            console.log("agentId front: " + agentId + " interventions: " + interventionsId);
            this.SET_ASSIGN_AGENT({ agentId, interventionsId });
        },
        resolve(interventionsId) {
            this.patrolStatus = "🚓💨 En route";
            setTimeout(() => { this.patrolStatus = "👮🚧 On scene" }, "10000"); // 1000 ms = 1 seconde
            setTimeout(() => { 
                this.resolveInterventions(interventionsId);
                this.patrolStatus = '';
            }, "20000"); // 10000 ms = 10 seconde

        },
        getAgentName(id) {
            const agent = this.agents.find(a => a.id === id);
            return agent.radio;
        }
    }
}
</script>