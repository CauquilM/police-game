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
        <!-- <h3 class="d-flex justify-content-flex-start">
            <span class="ml-5">
                Status: {{ vehicle.status }}
            </span>
        </h3> -->
        <div v-if="stopped">
            <h3 class="d-flex justify-content-flex-start">
                <img class="w-30" src="../assets/steering-wheel.svg" alt="">
                <span class="ml-5">
                    Driver:
                </span>
            </h3>
            <ul class="text-left pl-0">
                <li class="list-driver d-flex justify-content-space-between">
                    <div>
                        Name: {{ vehicle.driver.name }}
                    </div>
                    <div>
                        Age: {{ vehicle.driver.age }}
                    </div>
                </li>
                <li class="list-driver d-flex justify-content-space-between">
                    <div>
                        Valid license: {{ vehicle.driver.licenseValid ? 'Yes' : 'No' }}
                    </div>
                    <div>
                        Wanted: {{ vehicle.driver.isWanted ? 'Yes' : 'No' }}
                    </div>
                </li>
                <li class="list-driver">
                    Number of points: {{ vehicle.driver.numberOfPoints }}
                </li>
                <li class="list-driver">
                    Previously fined: {{ vehicle.driver.previouslyFined ? 'Yes' : 'No' }}
                </li>
                <li class="list-driver">
                    Behaviour: {{ vehicle.driver.behavior }}
                </li>
                <li class="list-driver">
                    Vehicle condition: {{ vehicle.driver.vehicleCondition }}
                </li>
            </ul>
        </div>
        <div v-if="!stopped" class="d-flex justify-content-space-around">
            <button @click="handleAction(vehicle, 'stop')">Stop</button>
            <button @click="vehicleLeaves(vehicle.id)">Let Pass</button>
        </div>
        <div v-if="fined">
            <div v-for="offense in bookOfOffenses" :key="offense" class="d-flex justify-content-flex-start mt-10">
                <label>
                    <input type="checkbox" :value="offense" v-model="driverOffenses">
                    {{ offense }}
                </label>
            </div>
        </div>
        <div v-if="stopped && !fined" class="d-flex justify-content-space-around">
            <button @click="showFine">Fine</button>
            <button disabled>Arrest</button>
            <button @click="vehicleLeaves(vehicle.id)">Give warning</button>
        </div>
        <div v-if="stopped && fined">
            <button v-if="driverOffenses.length > 0" @click="fineDriver({vehicleId: vehicle.id, amount: fineAmount})">Validate</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "TrafficControlView",
    data() {
        return {
            stopped: false,
            bookOfOffenses: ["Speeding", "Car in bad condition"],
            driverOffenses: [],
            fined: false,
            fineAmount: 0,
            lastSize: 0
        }
    },
    watch: {
        driverOffenses: {
            handler() {
                if (this.driverOffenses.length > this.lastSize) {
                    this.fineAmount += 30;
                }
                else if (this.driverOffenses.length < this.lastSize) {
                    this.fineAmount -= 30;
                }
                this.lastSize = this.driverOffenses.length;
            },

            deep: true
        }
    },
    props: {
        vehicle: Object
    },
    methods: {
        ...mapActions(["vehicleLeaves", "fineDriver"]),
        handleAction() {
            this.stopped = !this.stopped;
        },
        showFine() {
            this.fined = !this.fined;
        }
    }
}
</script>