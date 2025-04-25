<template>
    <div>
        <h1>Traffic Control</h1>
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
                // status: status,
                driver: {
                    name: this.generateName(),
                    age: `${Math.floor(Math.random() * 41) + 20}`,
                    numberOfPoints: `${Math.floor(Math.random() * 12) + 1}`,
                    // isWanted: `${Math.floor(Math.random() * 10) > 4    ? "true" : "false"}`,
                }
            };
            this.addVehicle(vehicle);
        },
        autoGenerateVehicles() {
            setInterval(() => {
                if (this.vehicles.length < 4) {
                    this.generateVehicle();
                }
            }, 2000); // Generate a new vehicle every 2 seconds
        },
    },
}
</script>