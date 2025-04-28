<template>
    <div>
        <h1 class="d-flex align-items-center justify-content-center"><img class="w-45" src="../assets/50-speed-limit.svg" alt=""><span class="ml-5 mb-5"> Traffic Control</span></h1>
        <div>
            <div v-if="vehicles.length > 0 && screenWidth >= 670" class="grid-container-2">
                <div v-for="vehicle in vehicles" :key="vehicle.id" class="traffic-card grid-item">
                    <TrafficComponent :vehicle="vehicle" />
                </div>
            </div>
            <div v-else class="d-flex flex-direction-column align-items-center">
                <div v-for="vehicle in vehicles" :key="vehicle.id" class="traffic-card grid-item mb-15">
                    <TrafficComponent :vehicle="vehicle" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TrafficComponent from '../components/TrafficComponent'
import suspect_names_data from '../data/suspect_names.json'
export default {
    name: "TrafficControlView",
    components: {
        TrafficComponent
    },
    data() {
        return {}
    },
    created() {
        this.autoGenerateVehicles();
    },
    mounted() {
        this.handleResize(); // initial
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        ...mapState(['agents', 'interventionsCurrent', 'vehicles', 'vehicleIdCounter']),
        ...mapState(['investigationsStore', 'screenWidth']),
        screenWidth() {
            return this.$store.getters.screenWidth;
        }
    },
    methods: {
        ...mapActions(['updateScreenWidth', 'addVehicle', 'incrementVehicleIdCounter']),
        handleResize() {
            this.updateScreenWidth();
        },
        generateName() {
            const randomFirstName = suspect_names_data.firstName[Math.floor(Math.random() * suspect_names_data.firstName.length)];
            const randomLastName = suspect_names_data.lastName[Math.floor(Math.random() * suspect_names_data.lastName.length)];

            return `${randomFirstName} ${randomLastName}`;
        },
        generateVehicle() {
            const plate = 'ABC-' + Math.floor(Math.random() * 1000);
            const speed = Math.floor(Math.random() * 50) + 20; // Random speed between 20 and 140 km/h
            // const status = speed > 50 ? 'Speeding' : 'Normal';
            const vehicle = {
                id: this.vehicleIdCounter,
                plate: plate,
                speed: speed,
                driver: {
                    name: this.generateName(),
                    age: Math.floor(Math.random() * 41) + 20, // age entre 20 et 60
                    numberOfPoints: Math.floor(Math.random() * 12) + 1, // permis à points
                    licenseValid: Math.random() < 0.9, // 90% des conducteurs ont un permis valide
                    isWanted: Math.random() < 0.1, // 10% des conducteurs sont recherchés
                    previouslyFined: Math.random() < 0.1, // 10% ont des antécédents
                    vehicleCondition: [
                        "Good", "Good", "Good",
                        "Good", "Good",
                        "Good", "Damaged", "Damaged",
                        "Very Damaged", "Very Damaged"
                    ][Math.floor(Math.random() * 11)], // état du véhicule
                    behavior: ["Calm", "Calm", "Calm",
                        "Calm", "Calm",
                        "Calm", "Nervous", "Nervous",
                        "Aggressive", "Aggressive"][Math.floor(Math.random() * 11)], // comportement du conducteur
                }
            };
            this.addVehicle(vehicle);
        },
        autoGenerateVehicles() {
            setInterval(() => {
                if (this.vehicles.length < 4) {
                    this.generateVehicle();
                }
            }, 10000); // Generate a new vehicle every 2 seconds
        },
    },
}
</script>