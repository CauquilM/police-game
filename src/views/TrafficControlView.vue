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
export default {
    name: "TrafficControlView",
    components: {
        TrafficComponent
    },
    data() {
        return {
            vehicles: [],
            vehicleIdCounter: 1,
        }
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
        ...mapState(['agents', 'interventionsCurrent']),
        ...mapState(['investigationsStore', 'screenWidth']),
        screenWidth() {
            return this.$store.getters.screenWidth;
        }
    },
    methods: {
        ...mapActions(['updateScreenWidth']),
        handleResize() {
            this.updateScreenWidth();
        },
        generateVehicle() {
            const plate = 'ABC-' + Math.floor(Math.random() * 1000);
            const speed = Math.floor(Math.random() * 50) + 20; // Random speed between 20 and 140 km/h
            const status = speed > 50 ? 'Speeding' : 'Normal';
            const vehicle = {
                id: this.vehicleIdCounter++,
                plate: plate,
                speed: speed,
                status: status,
                driver: {
                    name: "Paul",
                    numberOfPoints: 12,
                    isWanted: false
                }
            };
            this.vehicles.push(vehicle);
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