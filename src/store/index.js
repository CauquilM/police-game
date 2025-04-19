import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [
      { id: 1, name: 'Dupont', level: 3, busy: false },
      { id: 2, name: 'Moreau', level: 2, busy: false },
      { id: 3, name: 'Nguyen', level: 1, busy: false },
    ],
    mission: {
      id: 101,
      title: 'Cambriolage à la banque',
      difficulty: 4,
      assignedAgentsId: [],
      status: 'pending'
    }
  },
  mutations: {
    SET_ASSIGN_AGENT(state, agentId) {
      const agent = state.agents.find(a => a.id === agentId)
      if (agent && !state.mission.assignedAgentsId.includes(agentId)) {
        agent.busy = true
        state.mission.assignedAgentsId.push(agentId)
        console.log("before: " + state.mission.assignedAgentsId);
      }
      else {
        agent.busy = false;
        var index = state.mission.assignedAgentsId.indexOf(agentId);
        if (index !== -1) {
          state.mission.assignedAgentsId.splice(index, 1);
        }
        console.log("after: " + state.mission.assignedAgentsId);
      }
    },
    SET_MISSION_STATUS(state, status) {
      state.mission.status = status
    },
    FREE_ASSIGNED_AGENTS(state) {
      state.mission.assignedAgentsId.forEach(id => {
        const agent = state.agents.find(a => a.id === id)
        if (agent) agent.busy = false
      })
      state.mission.assignedAgentsId = []
    }
  },
  actions: {
    resolveMission({ state, commit, dispatch }) {
      const assignedIds = state.mission.assignedAgentsId
      const assignedAgents = state.agents.filter(a => assignedIds.includes(a.id))

      const totalForce = assignedAgents.reduce((sum, agent) => sum + agent.level, 0)

      const chance = dispatch("estimateSuccessProbability", {
        totalForce,
        difficulty: state.mission.difficulty
      })

      Promise.resolve(chance).then(probability => {
        const success = Math.random() < probability
        commit("SET_MISSION_STATUS", success ? 'success' : 'fail')
        commit("FREE_ASSIGNED_AGENTS")
      })
    },
    estimateSuccessProbability(_, { totalForce, difficulty }) {
      const diff = totalForce - difficulty
      if (diff >= 2) return 0.9
      if (diff === 1) return 0.75
      if (diff === 0) return 0.5
      if (diff === -1) return 0.3
      if (diff === -2) return 0.15
      return 0.05
    }
  }
})
