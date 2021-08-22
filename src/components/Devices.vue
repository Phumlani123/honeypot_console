<template>
    <div id="Devices"> 
        <div class="row" >
            {{getDeviceCount()}}
            <div class="col-lg-6 p-1 " v-for="device in devices" :key="device.device_id" >
                
                <div class="device m-2" >
                    
                    <div class="device-preview" :class="[device.device_live == 'True' ? 'active' : 'inactive']">
                        <h6>Personality: {{device.ippers}}</h6>
                        <h3>{{device.description}}</h3>
                    </div>
                    <div class="device-info">
                        <i class="fa fa-2x fa-exclamation-circle"></i>
                        <div v-if="device.device_live == 'True'">
                            <span class="circle-on"></span><small>  Online </small> 
                        </div>
                        <div v-else>
                            <span class="circle-off"></span> <small>  Offline </small> 
                        </div>
                        <h4>Name: {{device.name}}</h4>
                        <h5>IP:  {{device.ip_address}}</h5>
                        <button class="btn btn-success float-right" @click="viewDeviceAlerts(device.device_id, device.description)">View all alerts</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'Devices',
        data() {
            return {
                devices: [],
                fullPage: true
            }
        },
        created() {
            let loader = this.$loading.show();
            this.axios
                .get("https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json")
                .then(response => {
                    // console.log(response);
                    this.devices = response.data.device_list;
                    loader.hide()
                })
                .catch(err => {
                    loader.hide();
                    console.warn("error", err);
                });
        },
        
        methods: {
            getDeviceCount: function() {
                let liveCount = 0;
                this.devices.forEach(device => {
                    if(device.device_live == 'True'){
                        liveCount++;
                    }
                });
                this.$emit('deviceCount', liveCount)
            },

            viewDeviceAlerts: function(id, name) {
                this.$router.push({ path: `/dashboard/view/${id}/${name}`})
            }
            
        }
    }
</script>