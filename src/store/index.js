import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [],
    lastInterventionsTitle: String,
    interventionsCurrent: [],
    interventionsStore: [
      
    ],
    investigations: [
      {
        id: 0,
        titre: 'Investigation: Nighttime Burglary',
        description: 'A break-in was reported last night. What would you like to examine?',
        indices: {
          vitre: {
            label: 'Broken window',
            description: '🪟 Window: Broken from the outside at 2 AM.'
          },
          empreinte: {
            label: 'Shoe print',
            description: '👟 Print: Size 44, popular brand sneaker.'
          },
          temoin: {
            label: 'Witness',
            description: '👤 Witness: Person wearing a black hoodie.'
          },
          gant: {
            label: 'Glove fiber',
            description: '🧵 Fiber: Black wool glove fibers found on the window.'
          },
          sac: {
            label: 'Dropped bag',
            description: '🎒 Bag: Contains snack wrappers and a receipt dated last night.'
          }
        },
        suspects: [
          {
            nom: 'Lucas',
            description: 'Size 44, hoodie, has an alibi.'
          },
          {
            nom: 'Yanis',
            description: 'No alibi, size 42.'
          },
          {
            nom: 'Samira',
            description: 'Lives nearby, saw nothing.'
          },
          {
            nom: 'Karim',
            description: 'Friend of Lucas, wears black hoodie, was out late.'
          },
          {
            nom: 'Inès',
            description: 'Carries a similar bag, claims she lost it.'
          }
        ],
        coupable: 'Yanis'
      },
      {
        id: 1,
        titre: 'Investigation: Museum Theft',
        description: 'A famous painting was stolen last night at the Museum of Fine Arts. Explore the clues to find the thief.',
        indices: {
          camera: {
            label: 'Security camera',
            description: '📹 Camera: Turned off at 3 AM.'
          },
          badge: {
            label: 'Badge found on the floor',
            description: '🪪 Badge: Belongs to a cleaning staff employee.'
          },
          empreinte: {
            label: 'Fingerprint',
            description: '🧤 Print: Gloves were worn, but a perfume trace was detected.'
          },
          alarme: {
            label: 'Disabled alarm system',
            description: '🔕 Alarm: Deactivated using an admin password.'
          },
          sol: {
            label: 'Scuff mark on the floor',
            description: '👞 Floor: Mark from high heels near the frame.'
          }
        },
        suspects: [
          {
            nom: 'Claire',
            description: 'Security guard, on break at 3 AM.'
          },
          {
            nom: 'Michel',
            description: 'Cleaner, lost his badge yesterday.'
          },
          {
            nom: 'Leila',
            description: 'Art restorer, wears strong perfume.'
          },
          {
            nom: 'Sylvain',
            description: 'IT staff, has alarm access.'
          },
          {
            nom: 'Nadia',
            description: 'Tour guide, wears heels and perfume.'
          }
        ],
        coupable: 'Leila'
      },
      {
        id: 2,
        titre: 'Investigation: Arson',
        description: 'A fire broke out in an abandoned house. Firefighters suspect criminal activity.',
        indices: {
          briquet: {
            label: 'Lighter found',
            description: '🔥 Lighter: Engraved with the initials "J.T."'
          },
          voisin: {
            label: 'Neighbor’s testimony',
            description: '👀 Neighbor: Saw a figure wearing a red hoodie.'
          },
          historique: {
            label: 'Phone history',
            description: '📱 Phone: Search for "how to start a fire".'
          },
          essence: {
            label: 'Fuel traces',
            description: '🛢️ Fuel: Smell of gasoline near the origin point.'
          },
          chaussures: {
            label: 'Burned shoe print',
            description: '👣 Print: Partially melted print, size 45.'
          }
        },
        suspects: [
          {
            nom: 'Julien',
            description: 'Red hoodie, initials J.T.'
          },
          {
            nom: 'Thomas',
            description: 'Fire enthusiast, blue hoodie.'
          },
          {
            nom: 'Emma',
            description: 'Was just passing through the neighborhood.'
          },
          {
            nom: 'Jade',
            description: 'Owns a red hoodie, size 45 shoes.'
          },
          {
            nom: 'Olivier',
            description: 'Works at gas station near scene.'
          }
        ],
        coupable: 'Julien'
      },
      {
        id: 3,
        titre: 'Investigation: Missing Bicycle',
        description: 'A very expensive racing bike disappeared from the bike storage. It’s up to you to solve this mystery!',
        indices: {
          cadenas: {
            label: 'Cut lock',
            description: '🔓 Lock: Cleanly cut with pliers.'
          },
          empreinte: {
            label: 'Tire print',
            description: '🚴‍♂️ Tire: Smooth, competition-grade, rare model.'
          },
          alarme: {
            label: 'Triggered alarm',
            description: '🚨 Alarm: Went off at 5:15 AM, then silence.'
          },
          clef: {
            label: 'Spare key found',
            description: '🗝️ Key: Found behind a loose tile.'
          },
          vidéo: {
            label: 'Hallway video',
            description: '📼 Video: Someone with a helmet and gloves entered at 5:10 AM.'
          }
        },
        suspects: [
          {
            nom: 'Nico',
            description: 'Amateur cyclist, owns pliers.'
          },
          {
            nom: 'Sophie',
            description: 'Former owner of the bike, knows the storage room.'
          },
          {
            nom: 'Ali',
            description: 'Works in the building, present at 5:15 AM.'
          },
          {
            nom: 'Bruno',
            description: 'Had access to spare keys.'
          },
          {
            nom: 'Lina',
            description: 'Competes in races, has same tire brand.'
          }
        ],
        coupable: 'Sophie'
      },
      {
        id: 4,
        titre: 'Enquête : Vol à la bibliothèque',
        description: 'Un manuscrit ancien a disparu de la bibliothèque municipale.',
        indices: {
          porte: {
            label: 'Porte arrière',
            description: '🚪 Porte : Forcée sans déclencher l’alarme.'
          },
          carnet: {
            label: 'Carnet trouvé',
            description: '📓 Carnet : Notes sur les manuscrits rares.'
          },
          empreinte: {
            label: 'Empreinte digitale',
            description: '🧤 Empreinte : Partiellement effacée.'
          },
          trace: {
            label: 'Trace de pas',
            description: '👣 Trace : Talon usé typique d’un bibliothécaire.'
          }
        },
        suspects: [
          { nom: 'Agathe', description: 'Étudiante en histoire, fan de manuscrits' },
          { nom: 'Bruno', description: 'Bibliothécaire, a oublié de fermer une porte récemment' },
          { nom: 'Martine', description: 'Visite souvent, connaît bien les lieux' },
          { nom: 'David', description: 'Conservateur, a un carnet similaire' }
        ],
        coupable: 'David'
      },
      {
        id: 5,
        titre: 'Enquête : Fraude au bureau',
        description: 'Des fonds ont disparu mystérieusement de la comptabilité.',
        indices: {
          logiciel: {
            label: 'Logiciel de gestion',
            description: '💻 Logiciel : Connexion à 2h du matin via un VPN.'
          },
          motdepasse: {
            label: 'Post-it retrouvé',
            description: '📝 Mot de passe : Ecrit sur un post-it collé sous un clavier.'
          },
          caméra: {
            label: 'Caméra de sécurité',
            description: '📹 Caméra : Image floue d’une silhouette.'
          },
          facture: {
            label: 'Facture modifiée',
            description: '🧾 Facture : Retouchée après validation.'
          }
        },
        suspects: [
          { nom: 'Isabelle', description: 'Travaille la nuit, accès complet aux comptes' },
          { nom: 'Kevin', description: 'Nouvel employé, passionné d’informatique' },
          { nom: 'Louise', description: 'Assistante, écrit souvent ses mots de passe' },
          { nom: 'Marc', description: 'Responsable, a repéré l’anomalie' }
        ],
        coupable: 'Isabelle'
      },
      {
        id: 6,
        titre: 'Enquête : Empoisonnement au café',
        description: 'Un employé a été victime d’un malaise après avoir bu un café.',
        indices: {
          tasse: {
            label: 'Tasse analysée',
            description: '☕ Tasse : Traces de somnifère.'
          },
          caméra: {
            label: 'Caméra de la salle de pause',
            description: '📹 Caméra : Quelqu’un a manipulé le plateau vers 10h.'
          },
          badge: {
            label: 'Badge d’accès',
            description: '🪪 Badge : Utilisation inhabituelle à 9h45.'
          },
          armoire: {
            label: 'Armoire à pharmacie',
            description: '🚪 Armoire : Manque une boîte de comprimés.'
          }
        },
        suspects: [
          { nom: 'Jules', description: 'Fatigué du bruit, a parlé de vengeance' },
          { nom: 'Sandra', description: 'Toujours au courant de tout' },
          { nom: 'Victor', description: 'A accès à l’armoire médicale' },
          { nom: 'Clémence', description: 'Partage le bureau avec la victime' }
        ],
        coupable: 'Victor'
      },
      {
        id: 7,
        titre: 'Enquête : Sabotage au garage',
        description: 'Un client a failli avoir un accident après une réparation.',
        indices: {
          boulons: {
            label: 'Boulons desserrés',
            description: '🔩 Boulons : Volontairement desserrés.'
          },
          outils: {
            label: 'Outils déplacés',
            description: '🛠️ Outils : Un jeu d’outils manquant.'
          },
          planning: {
            label: 'Planning de réparation',
            description: '📅 Planning : Modifié à la main.'
          },
          audio: {
            label: 'Enregistrement audio',
            description: '🎙️ Audio : On entend "faut qu’il paye".'
          }
        },
        suspects: [
          { nom: 'Luc', description: 'A eu un conflit avec le client' },
          { nom: 'Dina', description: 'Mécontente de son salaire' },
          { nom: 'Rachid', description: 'Chef d’atelier, très pointilleux' },
          { nom: 'Nina', description: 'Nouvelle embauchée, formation incomplète' }
        ],
        coupable: 'Luc'
      },
      {
        id: 8,
        titre: 'Enquête : Disparition d’un animal rare',
        description: 'Un singe rare a disparu du zoo pendant la nuit.',
        indices: {
          clôture: {
            label: 'Clôture sectionnée',
            description: '🔧 Clôture : Coupée avec des pinces spécifiques.'
          },
          véhicule: {
            label: 'Trace de pneu',
            description: '🚙 Pneu : Véhicule utilitaire stationné en dehors des heures.'
          },
          empreinte: {
            label: 'Empreinte de gant',
            description: '🧤 Gant : Utilisé pour éviter les morsures.'
          },
          fiche: {
            label: 'Fiche d’enclos',
            description: '📄 Fiche : Volée quelques jours avant.'
          }
        },
        suspects: [
          { nom: 'Laura', description: 'Ancienne soigneuse licenciée récemment' },
          { nom: 'Kévin', description: 'Livreur, a accès au parking' },
          { nom: 'Sarah', description: 'Militante animaliste' },
          { nom: 'Étienne', description: 'Gardien, a oublié de fermer un portillon' }
        ],
        coupable: 'Laura'
      },
      {
        id: 9,
        titre: 'Enquête : Dossier volé au commissariat',
        description: 'Un dossier confidentiel a disparu du commissariat.',
        indices: {
          tiroir: {
            label: 'Tiroir forcé',
            description: '🗄️ Tiroir : Crochetage discret.'
          },
          caméra: {
            label: 'Caméra désactivée',
            description: '📹 Caméra : Éteinte pendant 10 minutes.'
          },
          badge: {
            label: 'Accès avec badge',
            description: '🪪 Badge : Badge utilisé mais non reconnu.'
          },
          empreinte: {
            label: 'Empreinte sur le clavier',
            description: '🧤 Gants fins mais une empreinte partielle trouvée.'
          }
        },
        suspects: [
          { nom: 'Marc', description: 'Jeune stagiaire curieux' },
          { nom: 'Léna', description: 'Lieutenant, en désaccord avec le chef' },
          { nom: 'Yann', description: 'Ancien policier en conflit avec le service' },
          { nom: 'Sophie', description: 'Chargée de l’archivage' }
        ],
        coupable: 'Léna'
      },
      {
        id: 10,
        titre: 'Enquête : Pollution du lac',
        description: 'Des poissons morts ont été retrouvés dans le lac communal.',
        indices: {
          eau: {
            label: 'Analyse de l’eau',
            description: '💧 Eau : Taux élevé de produit chimique industriel.'
          },
          baril: {
            label: 'Baril abandonné',
            description: '🛢️ Baril : Marqué d’un logo d’entreprise.'
          },
          trace: {
            label: 'Trace de pneus',
            description: '🚛 Camion : Entrée illégale sur le site la nuit.'
          },
          photo: {
            label: 'Photo satellite',
            description: '📷 Satellite : Déchargement aperçu en pleine nuit.'
          }
        },
        suspects: [
          { nom: 'Entreprise X', description: 'A déjà eu des amendes pour pollution' },
          { nom: 'Ferme locale', description: 'Utilise des engrais chimiques' },
          { nom: 'Julien', description: 'Photographe amateur présent sur place' },
          { nom: 'Patricia', description: 'Employée municipale, responsable environnement' }
        ],
        coupable: 'Entreprise X'
      },



    ],
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
