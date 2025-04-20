<template>
    <div>
        <h1>Investigations Bureau</h1>
        <div class="grid-container-3">
            <EnqueteCambriolage class="grid-items" v-for="enquete in enquetes" :key="enquete" :enquete="enquete" />
        </div>
    </div>
</template>

<script>
import EnqueteCambriolage from "../components/investigations/EnqueteCambriolage.vue"
export default {
    name: "InvestigationsView",
    components: {
        EnqueteCambriolage
    },
    data() {
        return {
            enquetes: [{
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
        }
    }
}
</script>