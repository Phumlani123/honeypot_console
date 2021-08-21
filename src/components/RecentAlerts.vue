<template>
    <div id="RecentAlerts"> 
        <div class="row" >
            <div class="col-md-4 my-2" v-for="alert in filteredAlerts" :key="alert.alert_id">
                <!-- <span class="p1 fa-stack fa-1x has-badge"
                      :data-count="value.length">
                    </span> -->
                <div class="card p-3 alert-bg h-100 " >
                    <div class="card-body alert-body">{{ alert.description }} on {{getDeviceById(alert.node_id).description}}</div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'RecentAlerts',
        data() {
            return {
                alerts: [],
                devices: [],
                filteredAlerts: [],
                fullPage: true
            }
        },
        created() {
            let loader = this.$loading.show();
            this.axios
                .get("https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json")
                .then(response => {
                    this.alerts = this.filterDates(response.data.alerts);
                    this.devices = response.data.device_list;
                    loader.hide()
                })
                .catch(err => {
                    loader.hide();
                    console.warn("error", err);
                });
        },
        methods: {
            filterDates: function(alerts) {
               let max = alerts.length ? alerts[alerts.length-1].created : "";
               alerts.filter((item) => {
                    if(item.created >= (max - 86400)){
                        this.filteredAlerts.push(item);
                        
                    }
                });
            },
            getDeviceById: function(id) {
                return this.devices.filter(device => {
                    if(device.device_id == id){
                        return device.description;
                    }
                })[0];
            }
        }
    }
</script>