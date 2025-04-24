import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [],
    lastInterventionsTitle: String,
    interventionsCurrent: [],
    interventionsStore: [],
    investigationsStore: [],
    screenWidth: document.documentElement.clientWidth,
    notifications: []
  },
  mutations: {
    SET_SCREEN_WIDTH(state, width) {
      state.screenWidth = width;
    },
    SET_ASSIGN_AGENT(state, { agentId: agentId, interventionsId: interventionsId }) {
      const agent = state.agents.find(a => a.id === agentId)
      const indexInterventions = state.interventionsCurrent.findIndex(m => m.id === interventionsId);
      const interventions = state.interventionsCurrent[indexInterventions];
      if (agent && !agent.busy && !interventions.assignedAgentsId.includes(agentId)) {
        agent.busy = true
        interventions.assignedAgentsId.push(agentId)
      }
      else if (agent && agent.busy && !interventions.assignedAgentsId.includes(agentId)) {
        return;
      }
      else {
        agent.busy = false;
        var indexAgent = interventions.assignedAgentsId.indexOf(agentId);
        if (indexAgent !== -1) {
          interventions.assignedAgentsId.splice(indexAgent, 1);
        }
      }
    },
    SET_INTERVENTIONS_STATUS(state, { interventions, status }) {
      interventions.status = status
    },
    FREE_ASSIGNED_AGENTS(state, interventions) {
      interventions.assignedAgentsId.forEach(id => {
        const agent = state.agents.find(a => a.id === id)
        if (agent) agent.busy = false
      })
      interventions.assignedAgentsId = []
    },
    SET_CHOSEN_INTERVENTIONS(state, index) {
      state.lastInterventionsTitle = state.interventionsStore[index].title;
      if (!state.interventionsCurrent.includes(state.interventionsStore[index])) {
        state.interventionsCurrent.push(state.interventionsStore[index]);
      }
    },
    SET_REFUSE_INTERVENTIONS(state, index) {
      state.interventionsCurrent.splice(index, 1);
    },
    SET_HEAL_AGENT(state, agentId) {
      const agent = state.agents.find(a => a.id === agentId);
      if (agent) {
        agent.isInHospital = true;
      }
    },
    SHOW_NOTIFICATION(state, payload) {
      // On donne un id unique à chaque notification
      const id = Date.now() + Math.random();
      state.notifications.unshift({ id, ...payload }); // ajoute en haut
    },
    HIDE_NOTIFICATION(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    },
    SET_AGENTS(state, agentsApi) {
      state.agents = agentsApi;
    },
    SET_INTERVENTIONS(state, interventionsApi) {
      state.interventionsStore = interventionsApi;
    },
    SET_INVESTIGATIONS(state, investigationsApi) {
      state.investigationsStore = investigationsApi;
    }
  },
  actions: {
    startApp({ dispatch }) {
      dispatch("getAgentsFromApi");
      dispatch("getInterventionsFromApi");
      dispatch("getInvestigationsFromApi");
    },
    getAgentsFromApi({ commit }) {
      axios.get("https://police-api-ten.vercel.app/agents")
        .then((res) => {
          commit("SET_AGENTS", res.data)
        })
    },
    getInterventionsFromApi({ commit }) {
      axios.get("https://police-api-ten.vercel.app/interventions")
        .then((res) => {
          commit("SET_INTERVENTIONS", res.data)
        })
    },
    getInvestigationsFromApi({ commit }) {
      axios.get("https://police-api-ten.vercel.app/investigations")
        .then((res) => {
          commit("SET_INVESTIGATIONS", res.data)
        })
    },
    notify({ commit }, { title, message, type }) {
      const id = Date.now() + Math.random();
      commit('SHOW_NOTIFICATION', { id, title, message, type });
      setTimeout(() => {
        commit('HIDE_NOTIFICATION', id);
      }, 4000);
    },
    healAgent({ state, commit, dispatch }, agentId) {
      const agent = state.agents.find(a => a.id === agentId);
      if (!agent) return;

      commit("SET_HEAL_AGENT", agentId);

      setTimeout(() => {
        axios.put("https://police-api-ten.vercel.app/agents/healAgent",
          { id: agent.id }
        )
          .then(() => {
            dispatch("getAgentsFromApi");
          })
        agent.isInHospital = false;
        dispatch('notify', {
          title: `Agent ${agent.name} recovered from hospital`,
          message: '',
          type: "success"
        });
      }, 30000);
    },
    updateScreenWidth({ commit }) {
      commit('SET_SCREEN_WIDTH', document.documentElement.clientWidth);
    },
    refuseInterventions({ commit }, index) {
      commit("SET_REFUSE_INTERVENTIONS", index);
    },
    chooseInterventions({ state, commit }) {
      let index = Math.round(Math.random() * state.interventionsStore.length - 1);
      if (index != -1) {
        commit("SET_CHOSEN_INTERVENTIONS", index);
      }
    },
    chancesOfInjured({ dispatch }, { agent, interventions }) {
      let chances = Math.round(Math.random() * 100);
      console.log("chances: " + chances);
      if (chances <= 15) {
        let damage = interventions.difficulty * 5;
        axios.put("https://police-api-ten.vercel.app/agents/hurtAgent", { id: agent.id, damage: damage })
          .then(() => {
            dispatch("getAgentsFromApi");
          })
      }
    },
    resolveInterventions({ state, commit, dispatch }, interventionsId) {
      this.patrolStatus = "🚓💨 En route"
      setTimeout(() => { this.patrolStatus = "👮🚧 On scene" }, "10000"); // 1000 ms = 1 seconde

      const indexInterventions = state.interventionsCurrent.findIndex(m => m.id === interventionsId);
      const interventions = state.interventionsCurrent[indexInterventions];

      const assignedIds = interventions.assignedAgentsId
      const assignedAgents = state.agents.filter(a => assignedIds.includes(a.id))

      assignedAgents.forEach((agent) => {
        dispatch("chancesOfInjured", { agent, interventions })
      });

      const totalForce = assignedAgents.reduce((sum, agent) =>
        sum
        + agent.level
        + (agent.equipment.includes("handgun") ? 1 : 0)
        + (agent.equipment.includes("police-vest") ? 1 : 0)
        + (agent.equipment.includes("handcuffs") ? 1 : 0)
        + (agent.equipment.includes("taser") ? 1 : 0)
        + (agent.equipment.includes("nightstick") ? 1 : 0),
        0)

      const chance = dispatch("estimateSuccessProbability", {
        totalForce,
        difficulty: interventions.difficulty
      })

      Promise.resolve(chance).then(probability => {
        const success = Math.random() < probability
        commit("SET_INTERVENTIONS_STATUS", { interventions: interventions, status: success ? 'success' : 'fail' })
        commit("FREE_ASSIGNED_AGENTS", interventions)
      })
    },
    estimateSuccessProbability(_, { totalForce, difficulty }) {
      const diff = totalForce - difficulty
      if (diff >= 4) return 0.7
      if (diff === 2) return 0.6
      if (diff === 1) return 0.5
      if (diff === 0) return 0.4
      if (diff === -1) return 0.3
      if (diff === -2) return 0.15
      return 0.05
    }
  },
  getters: {
    screenWidth: state => state.screenWidth,
    notification: state => state.notification
  }
})
