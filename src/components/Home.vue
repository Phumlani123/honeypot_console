<template>
    
    <div id="home"> 
        <Nav/>
        <div class="page-content page-container " id="page-content">
            <div class="padding mt-8">
                
                <div class="row  ">
                    <div class="col-md-10 mx-auto">
                        <h4 class="mb-4 text-success">Critical Incidents</h4>
                        <nav class=" navbar-expand-lg mb-4 navbar-light bg-light">
                            <div class="card p-3">
                                <div class="display-inline-flex navbar-collapse">
                                    <div class="navbar-nav ">
                                        <router-link to="/dashboard" class="nav-item nav-link">All Incidents</router-link>
                                        <router-link to="/dashboard/device" class="nav-item nav-link">Incidents by Device</router-link>
                                        <router-link to="/dashboard/attacker" class="nav-item nav-link">Incidents by Attacker</router-link>
                                        <router-link to="/dashboard/recent" class="nav-item nav-link">Recent Incidents</router-link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div class="col-md-10 mx-auto ">
                        <router-view/>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-10 mx-auto"><h4 class="mb-4 text-success">You have {{deviceCount}} {{deviceCount === 1 ? "Canary" : "Canaries"}}  currently live</h4></div>
                    <div class="col-md-10 mx-auto">
                        <Devices @deviceCount="getCount($event)"/>  
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>
 
<script>
    import Devices from './Devices.vue';
    import Nav from './Nav.vue';
    export default {
        name: 'Home',
        data() {
            return {
                deviceCount: 0
            }
        },
        components: {
            Devices,
            Nav
        },
        methods: {
            getCount (value) {
                this.deviceCount = value;
            }
        }
    }
</script>
