<template>
    <div>
        <h3 class="d-flex justify-content-flex-start"><img class="w-30" src="../assets/police-badge.svg"
                alt="police-badge">
            <span class="rank ml-5 mr-5">{{ agent.rank }}
            </span> <span>{{ agent.name }}</span>
        </h3>
        <div v-if="!officeOpen">
            <h3 class="d-flex justify-content-flex-start">
                <img class="w-30" src="../assets/police-radio.svg" alt="police-radio">
                <span class="ml-5">{{ agent.radio }}</span>
            </h3>
            <div v-if="agent.health > 50" class="d-flex align-items-center">
                <img @click="healAgent(agent.id)" class="w-30" src="../assets/health.svg" alt="health">
                <span class="ml-5">Good {{ agent.health }}</span>
            </div>
            <div v-else class="d-flex align-items-center">
                <img @click="healAgent(agent.id)" class="w-30" src="../assets/health.svg" alt="health">
                <span class="ml-5">Bad {{ agent.health }}</span>
            </div>
            <div v-if="agent.isInHospital" class="d-flex align-items-center">
                <img class="w-30" src="../assets/hospital.svg" alt="hospital">
                <span class="ml-5">In hospital</span>
            </div>
            <div v-else-if="agent.busy" class="d-flex align-items-center">
                <img class="w-30" src="../assets/crime-scene.svg" alt="crime-scene">
                <span class="ml-5">Busy</span>
            </div>
            <div class="d-flex align-items-center" v-else>
                <img class="w-30" src="../assets/police-car-patroling.svg" alt="police-car-patroling">
                <span class="ml-5">On patrol</span>
            </div>
        </div>
        <div class="equipment-bag">
            <img v-if="agent.equipment.includes('handcuffs')" class="equipment" src="../assets/handcuffs.svg"
                alt="handcuffs">
            <img v-if="agent.equipment.includes('nightstick')" class="equipment" src="../assets/nightstick.svg"
                alt="nightstick">
            <img v-if="agent.equipment.includes('police-vest')" class="equipment" src="../assets/police-vest.svg"
                alt="police-vest">
            <img v-if="agent.equipment.includes('handgun')" class="equipment" src="../assets/handgun.svg" alt="handgun">
            <img v-if="agent.equipment.includes('taser')" class="equipment" src="../assets/taser.svg" alt="taser">
        </div>
        <div v-if="officeOpen" class="d-flex justify-content-space-around">
            <button @click="manageEquipment">Manage equipment</button>
            <button @click="fireAgent(agent.id)">Fire</button>
        </div>
        <h3 class="mt-10" v-if="officeOpen && manage">Budget: {{ budget }}</h3 >
        <div v-if="officeOpen && manage">
            <div v-for="equipment in equipments" :key="equipment" class="d-flex justify-content-flex-start mt-10">
                <label>
                    <input type="checkbox" :value="equipment" v-model="agentEquipment">
                    {{ equipment }}
                </label>
            </div>
            <button @click="validateEquipement({agentId: agent.id, equipments: agentEquipment})">Validate</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "AgentComponent",
    data() {
        return {
            agentEquipment: [],
            manage: false

        }
    },
    mounted() {
        this.agentEquipment = this.agent.equipment
    },
    props: {
        agent: Object,
        officeOpen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(["equipments", "budget"])
    },
    methods: {
        ...mapActions(["healAgent", "fireAgent", "validateEquipement"]),
        manageEquipment(){
            this.manage = !this.manage;
        }
    }
}
</script>