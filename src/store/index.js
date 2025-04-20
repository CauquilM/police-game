import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [
      { id: 1, name: 'Dupont', level: 3, busy: false, radio: "Sierra 1", rank: "Sergeant", equipment: ["handgun", "police-vest", "handcuffs", "taser", "nightstick"] },
      { id: 2, name: 'Moreau', level: 2, busy: false, radio: "Oscar 1", rank: "Officer", equipment: ["handgun", "police-vest", "handcuffs", "taser", "nightstick"] },
      { id: 3, name: 'Nguyen', level: 1, busy: false, radio: "India 1", rank: "Intern Officer ", equipment: ["handgun", "police-vest", "handcuffs", "taser", "nightstick"] }
    ],
    lastMissionTitle: String,
    missionsCurrent: [],
    missionStore: [
      {
        id: 1,
        title: "Cambriolage à la banque",
        difficulty: 4,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 2,
        title: "Vol de voiture en centre-ville",
        difficulty: 2,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 3,
        title: 'Dispute domestique',
        difficulty: 1,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 4,
        title: 'Tag sur bâtiment public',
        difficulty: 1,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 5,
        title: 'Rixe entre bandes rivales',
        difficulty: 5,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 6,
        title: 'Cambriolage de nuit dans une bijouterie',
        difficulty: 6,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 7,
        title: 'Manifestation non déclarée',
        difficulty: 3,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 8,
        title: 'Prise d’otages dans une école',
        difficulty: 8,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 9,
        title: 'Appel anonyme pour colis suspect',
        difficulty: 4,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 10,
        title: 'Poursuite de suspect en fuite',
        difficulty: 5,
        assignedAgentsId: [],
        status: 'pending'
      },
      {
        id: 11,
        title: 'Falsification de documents officiels',
        difficulty: 3,
        assignedAgentsId: [],
        status: 'pending'
      }
    ]
  },
  mutations: {
    SET_ASSIGN_AGENT(state, { agentId: agentId, missionId: missionId }) {
      const agent = state.agents.find(a => a.id === agentId)
      const indexMission = state.missionsCurrent.findIndex(m => m.id === missionId);
      const mission = state.missionsCurrent[indexMission];
      if (agent && !mission.assignedAgentsId.includes(agentId)) {
        console.log("enter");
        agent.busy = true
        mission.assignedAgentsId.push(agentId)
      }
      else {
        agent.busy = false;
        var indexAgent = mission.assignedAgentsId.indexOf(agentId);
        if (indexAgent !== -1) {
          mission.assignedAgentsId.splice(indexAgent, 1);
        }
      }
    },
    SET_MISSION_STATUS(state, {mission, status}) {
      mission.status = status
    },
    FREE_ASSIGNED_AGENTS(state, mission) {
      mission.assignedAgentsId.forEach(id => {
        const agent = state.agents.find(a => a.id === id)
        if (agent) agent.busy = false
      })
      mission.assignedAgentsId = []
    },
    SET_CHOSEN_MISSION(state, index) {
      console.log("mutation: " + state.missionStore[index].title);
      state.lastMissionTitle = state.missionStore[index].title;
      state.missionsCurrent.push(state.missionStore[index]);
    },
    SET_REFUSE_MISSION(state, index) {
      state.missionsCurrent.splice(index, 1);
    }
  },
  actions: {
    refuseMission({ commit }, index) {
      commit("SET_REFUSE_MISSION", index);
    },
    chooseMission({ state, commit }) {
      let index = Math.round(Math.random() * state.missionStore.length - 1);
      console.log("index: " + index);
      commit("SET_CHOSEN_MISSION", index);
    },
    resolveMission({ state, commit, dispatch }, missionId) {
      this.patrolStatus = "🚓💨 En route"
      setTimeout(() => { this.patrolStatus = "👮🚧 On scene" }, "10000"); // 1000 ms = 1 seconde

      const indexMission = state.missionsCurrent.findIndex(m => m.id === missionId);
      const mission = state.missionsCurrent[indexMission];

      const assignedIds = mission.assignedAgentsId
      const assignedAgents = state.agents.filter(a => assignedIds.includes(a.id))

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
        difficulty: mission.difficulty
      })

      Promise.resolve(chance).then(probability => {
        const success = Math.random() < probability
        commit("SET_MISSION_STATUS", {mission: mission,status: success ? 'success' : 'fail'})
        commit("FREE_ASSIGNED_AGENTS", mission)
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
  }
})
