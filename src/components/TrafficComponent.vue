<template>
    <div>
        <h3 class="d-flex justify-content-flex-start">
            <img class="w-30" src="../assets/license-plate-1.svg" alt="">
            <span class="ml-5">
                {{ vehicle.plate }}
            </span>
        </h3>
        <h3 class="d-flex justify-content-flex-start">
            <img class="w-30" src="../assets/speedometer.svg" alt="">
            <span class="ml-5">
                {{ vehicle.speed }} km/h
            </span>
        </h3>
        <h3 class="d-flex justify-content-flex-start">
            <span class="ml-5">
                Status: {{ vehicle.status }}
            </span>
        </h3>
        <div class="d-flex justify-content-space-around">
            <button @click="handleAction(vehicle, 'stop')">Stop</button>
            <button @click="vehicleLeaves(vehicle.id)">Let Pass</button>
        </div>
        <h3 class="d-flex justify-content-flex-start">
            <img class="w-30" src="../assets/steering-wheel.svg" alt="">
            <span class="ml-5">
                Driver:
            </span>
        </h3>
        <ul v-if="stopped" class="text-left">
            <li class="list-driver">
                Name: {{ vehicle.driver.name }}
            </li>
            <li class="list-driver">
                Number of points: {{ vehicle.driver.numberOfPoints }}
            </li>
            <li class="list-driver">
                Wanted: {{ vehicle.driver.isWanted ? "Yes" : "No" }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "TrafficControlView",
    data(){
        return {
            stopped: false
        }
    },
    props: {
        vehicle: Object
    },
    methods: {
        ...mapActions(["vehicleLeaves"]),
        handleAction() {
            this.stopped = !this.stopped;
        }
    }
}
</script>