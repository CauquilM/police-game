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
    ],
    investigations: [{
      id: 0,
      titre: 'Enquête : Cambriolage de nuit',
      description: 'Une effraction a été signalée cette nuit. Que voulez-vous examiner ?',
      indices: {
        vitre: {
          label: 'Vitre brisée',
          description: '🪟 Vitre : Brisée de l’extérieur à 2h.'
        },
        empreinte: {
          label: 'Empreinte de chaussure',
          description: '👟 Empreinte : Taille 44, basket populaire.'
        },
        temoin: {
          label: 'Témoin',
          description: '👤 Témoin : Personne avec capuche noire.'
        }
      },
      suspects: [
        {
          nom: 'Lucas',
          description: 'Taille 44, capuche, alibi'
        },
        {
          nom: 'Yanis',
          description: 'Pas d’alibi, taille 42'
        },
        {
          nom: 'Samira',
          description: 'Vit à côté, n’a rien vu'
        }
      ],
      coupable: 'Yanis'
    },
    {
      id: 1,
      titre: 'Enquête : Vol au musée',
      description: 'Un tableau célèbre a été volé cette nuit au musée des Beaux-Arts. Explore les indices pour découvrir le voleur.',
      indices: {
        camera: {
          label: 'Caméra de surveillance',
          description: '📹 Caméra : Coupée à 3h du matin.'
        },
        badge: {
          label: 'Badge trouvé au sol',
          description: '🪪 Badge : Appartient à un employé du service de nettoyage.'
        },
        empreinte: {
          label: 'Empreinte digitale',
          description: '🧤 Empreinte : Gants portés, mais trace de parfum.'
        }
      },
      suspects: [
        {
          nom: 'Claire',
          description: 'Agent de sécurité, était en pause à 3h.'
        },
        {
          nom: 'Michel',
          description: 'Nettoyeur, a perdu son badge hier.'
        },
        {
          nom: 'Leila',
          description: 'Restauratrice d’art, porte un parfum fort.'
        }
      ],
      coupable: 'Leila'
    },
    {
      id: 2,
      titre: 'Enquête : Incendie volontaire',
      description: 'Un incendie s’est déclaré dans une maison abandonnée. Les pompiers soupçonnent un acte criminel.',
      indices: {
        briquet: {
          label: 'Briquet retrouvé',
          description: '🔥 Briquet : Gravé aux initiales "J.T."'
        },
        voisin: {
          label: 'Témoignage du voisin',
          description: '👀 Voisin : A vu une silhouette avec une capuche rouge.'
        },
        historique: {
          label: 'Historique du téléphone',
          description: '📱 Téléphone : Recherche sur "comment faire un incendie".'
        }
      },
      suspects: [
        {
          nom: 'Julien',
          description: 'Capuche rouge, initiales J.T.'
        },
        {
          nom: 'Thomas',
          description: 'Amateur de feu, capuche bleue'
        },
        {
          nom: 'Emma',
          description: 'Passait dans le quartier par hasard'
        }
      ],
      coupable: 'Julien'
    },
    {
      id: 3,
      titre: 'Enquête : Vélo disparu',
      description: 'Un vélo de course très cher a disparu du local à vélos. À vous de résoudre ce mystère !',
      indices: {
        cadenas: {
          label: 'Cadenas coupé',
          description: '🔓 Cadenas : Coupé proprement avec une pince.'
        },
        empreinte: {
          label: 'Empreinte de pneu',
          description: '🚴‍♂️ Pneu : Pneu lisse, compétition, modèle rare.'
        },
        alarme: {
          label: 'Alarme déclenchée',
          description: '🚨 Alarme : Signal activé à 5h15, puis silence.'
        }
      },
      suspects: [
        {
          nom: 'Nico',
          description: 'Cycliste amateur, possède des pinces'
        },
        {
          nom: 'Sophie',
          description: 'Ex-propriétaire du vélo, connaît le local'
        },
        {
          nom: 'Ali',
          description: 'Travaille dans l’immeuble, présent à 5h15'
        }
      ],
      coupable: 'Sophie'
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
    SET_MISSION_STATUS(state, { mission, status }) {
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
        commit("SET_MISSION_STATUS", { mission: mission, status: success ? 'success' : 'fail' })
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
