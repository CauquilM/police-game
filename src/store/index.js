import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [
      { id: 1, name: 'Dupont', health: 50, level: 3, busy: false, radio: "Sierra 1", rank: "Sergeant", equipment: ["handgun", "police-vest", "handcuffs", "taser", "nightstick"] },
      { id: 2, name: 'Moreau', health: 100, level: 2, busy: false, radio: "Oscar 1", rank: "Officer", equipment: ["handgun", "police-vest", "handcuffs", "taser", "nightstick"] },
      { id: 3, name: 'Nguyen', health: 100, level: 1, busy: false, radio: "India 1", rank: "Intern Officer ", equipment: ["handgun", "police-vest", "handcuffs", "taser", "nightstick"] }
    ],
    lastMissionTitle: String,
    missionsCurrent: [],
    missionStore: [
      {
        "id": 1,
        "title": "Bank robbery",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 2,
        "title": "Car theft downtown",
        "difficulty": 2,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 3,
        "title": "Domestic dispute",
        "difficulty": 1,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 4,
        "title": "Graffiti on public building",
        "difficulty": 1,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 5,
        "title": "Gang fight",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 6,
        "title": "Nighttime jewelry store burglary",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 7,
        "title": "Unauthorized protest",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 8,
        "title": "Hostage situation at school",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 9,
        "title": "Anonymous call about suspicious package",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 10,
        "title": "Suspect on the run",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 11,
        "title": "Forgery of official documents",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 12,
        "title": "Armed robbery at gas station",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 13,
        "title": "Suspicious van parked near embassy",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 14,
        "title": "Burglary in residential neighborhood",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 15,
        "title": "Vandalism in subway station",
        "difficulty": 2,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 16,
        "title": "Child reported missing in park",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 17,
        "title": "Shots fired in residential area",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 18,
        "title": "Traffic accident with injuries",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 19,
        "title": "Illegal street race",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 20,
        "title": "Person spotted with firearm in mall",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 21,
        "title": "Suspicious behavior in airport terminal",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 22,
        "title": "Lost elderly person reported",
        "difficulty": 2,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 23,
        "title": "Explosion reported in warehouse",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 24,
        "title": "Illegal weapons deal suspected",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 25,
        "title": "Attempted kidnapping near school",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 26,
        "title": "Drug deal in progress",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },

      {
        "id": 27,
        "title": "Arson in abandoned warehouse",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 28,
        "title": "Pickpocketing at busy train station",
        "difficulty": 2,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 29,
        "title": "Armed suspect barricaded in apartment",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 30,
        "title": "Suspicious drone flying over secure zone",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 31,
        "title": "Fight at local bar",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 32,
        "title": "Explosion heard near industrial plant",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 33,
        "title": "Person impersonating police officer",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 34,
        "title": "Break-in at police evidence room",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 35,
        "title": "Stolen ambulance in circulation",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 36,
        "title": "Unattended child wandering downtown",
        "difficulty": 2,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 37,
        "title": "Illegal gambling operation",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 38,
        "title": "Attempted prison break",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 39,
        "title": "Report of gunshots in shopping mall",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 40,
        "title": "Drug lab discovered in apartment",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 41,
        "title": "Bus hijacked by armed individual",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 42,
        "title": "Smuggling operation at port",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 43,
        "title": "Buried body discovered in woods",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 44,
        "title": "Runaway train alert",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 45,
        "title": "VIP death threat report",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 46,
        "title": "Child locked in overheated car",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 47,
        "title": "Trespassing at military facility",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 48,
        "title": "Illegal fireworks causing fire hazard",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 49,
        "title": "Brawl at sports stadium",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 50,
        "title": "Cyberattack on hospital network",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 51,
        "title": "Threatening graffiti on school walls",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 52,
        "title": "Abandoned baby found in alley",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 53,
        "title": "Explosion in metro tunnel",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 54,
        "title": "Masked individuals robbing convenience store",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 55,
        "title": "Fight involving dangerous animal",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 56,
        "title": "Suspicious package on city bus",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 57,
        "title": "Clashes during political rally",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 58,
        "title": "Underground fight club discovered",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 59,
        "title": "Illegal dumping of toxic waste",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 60,
        "title": "Disappearance of journalist",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 61,
        "title": "Teen with weapon at school entrance",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 62,
        "title": "Train derailment reported",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 63,
        "title": "Riot inside prison",
        "difficulty": 10,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 64,
        "title": "Suspicious man filming children at park",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 65,
        "title": "Counterfeit currency in circulation",
        "difficulty": 5,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 66,
        "title": "Explosion in government building",
        "difficulty": 10,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 67,
        "title": "Dangerous hacker intercepted",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 68,
        "title": "Drunk driver causing multiple accidents",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 69,
        "title": "Children throwing objects from bridge",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 70,
        "title": "Smuggled animals found in luggage",
        "difficulty": 4,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 71,
        "title": "Thief caught in museum at night",
        "difficulty": 7,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 72,
        "title": "Group blocking emergency exit",
        "difficulty": 3,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 73,
        "title": "Drone crash near airport runway",
        "difficulty": 6,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 74,
        "title": "Hotel room filled with weapons",
        "difficulty": 8,
        "assignedAgentsId": [],
        "status": "pending"
      },
      {
        "id": 75,
        "title": "Explosives found under parked car",
        "difficulty": 9,
        "assignedAgentsId": [],
        "status": "pending"
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

    ],
    screenWidth: document.documentElement.clientWidth
  },
  mutations: {
    SET_SCREEN_WIDTH(state, width) {
      state.screenWidth = width;
    },
    SET_ASSIGN_AGENT(state, { agentId: agentId, missionId: missionId }) {
      const agent = state.agents.find(a => a.id === agentId)
      const indexMission = state.missionsCurrent.findIndex(m => m.id === missionId);
      const mission = state.missionsCurrent[indexMission];
      if (agent && !agent.busy && !mission.assignedAgentsId.includes(agentId)) {
        console.log("enter");
        agent.busy = true
        mission.assignedAgentsId.push(agentId)
      }
      else if (agent && agent.busy && !mission.assignedAgentsId.includes(agentId)) {
        return;
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
      console.log('test title: ' + state.missionStore[index].title);
      console.log('test include: ' + state.missionsCurrent.includes(state.missionStore[index]));
      if (!state.missionsCurrent.includes(state.missionStore[index])) {
        state.missionsCurrent.push(state.missionStore[index]);
      }
    },
    SET_REFUSE_MISSION(state, index) {
      state.missionsCurrent.splice(index, 1);
    },
    SET_HEAL_AGENT(state, agentId) {
      const agent = state.agents.find(a => a.id === agentId);
      agent.health = 100;
    }
  },
  actions: {
    healAgent({ commit }, agentId) {
      console.log("heal");
      commit("SET_HEAL_AGENT", agentId);
    },
    updateScreenWidth({ commit }) {
      commit('SET_SCREEN_WIDTH', document.documentElement.clientWidth);
    },
    refuseMission({ commit }, index) {
      commit("SET_REFUSE_MISSION", index);
    },
    chooseMission({ state, commit }) {
      let index = Math.round(Math.random() * state.missionStore.length - 1);
      console.log("index: " + index);
      if (index != -1) {
        commit("SET_CHOSEN_MISSION", index);
      }
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
  },
  getters: {
    screenWidth: state => state.screenWidth
  }
})
