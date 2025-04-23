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
    investigations: [],
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
        console.log("enter");
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
      console.log("mutation: " + state.interventionsStore[index].title);
      state.lastInterventionsTitle = state.interventionsStore[index].title;
      console.log('test title: ' + state.interventionsStore[index].title);
      console.log('test include: ' + state.interventionsCurrent.includes(state.interventionsStore[index]));
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
    }
  },
  actions: {
    startApp({ dispatch }) {
      dispatch("getAgentsFromApi");
    },
    getAgentsFromApi({ commit }) {
      axios.get("http://localhost:3000/agents")
        .then((res) => {
          commit("SET_AGENTS", res.data)
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
        axios.put("http://localhost:3000/agents/healAgent",
          { id: agent.id }
        )
        .then((res) => {
          console.log("heal: " + res.data);
        })
        .catch((err) => {
          console.log("heal: " + err);
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
      console.log("index: " + index);
      if (index != -1) {
        commit("SET_CHOSEN_INTERVENTIONS", index);
      }
    },
    chancesOfInjured(_, { agent, interventions }) {
      let index;
      console.log('injured interventions: ' + interventions);
      console.log("enter injured");
      switch (interventions.difficulty) {
        case 1:
          index = Math.round(Math.random() * 10)
          console.log('index: ' + index);
          agent.health -= 10
          break;

        case 2:
          index = Math.round(Math.random() * 20)
          console.log('index: ' + index);
          agent.health -= 20
          break;

        case 3:
          index = Math.round(Math.random() * 30)
          console.log('index: ' + index);
          agent.health -= 30
          break;

        case 4:
          index = Math.round(Math.random() * 40)
          console.log('index: ' + index);
          agent.health -= 40
          break;

        case interventions.difficulty >= 5:
          index = Math.round(Math.random() * 50)
          console.log('index: ' + index);
          agent.health -= 50
          break;

        default:
          break;
      }
      console.log("agent injured: " + agent);
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
      console.log("totalForce: " + totalForce);

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
