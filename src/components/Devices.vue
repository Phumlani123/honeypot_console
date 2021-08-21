<template>
    <div id="Devices"> 
        <div class="row" >
            {{getDeviceCount()}}
            <div class="col-md-4 p-1 " v-for="device in devices" :key="device.device_id">
                <div class="card p-3 h-100" :class="[device.device_live == 'True' ? 'active' : 'inactive']">
                    <span class="p1 fa-stack fa-1x has-badge">
                        <i class=" fa fa-circle fa-stack-2x"></i>
                        <i class=" fa fa-exclamation fa-stack-1x fa-inverse"></i>
                    </span>
                    <p>{{device.name}}</p>
                    <p>{{device.node_id}}</p>
                    <p>{{device.description}}</p>
                    <p>{{device.ip_address}}</p>
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
            }
            
        }
    }
</script>