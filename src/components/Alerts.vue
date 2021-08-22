<template>
    <div id="Alerts"> 
        <div class="row" >
            <div class="col-md-4 " v-for="(value, name) in groupedAlerts" :key="name">
                
                <span class="p1 fa-stack fa-1x has-badge"
                      :data-count="value.length"> 
                    </span>
                <div class="card p-3 alert-bg shadow">
                    <small class="alert-count">Critical {{value.length === 1 ? "alert" : "alerts"}}</small>
                    <div class="card-body alert-body">{{ name }} </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'Alerts',
        data() {
            return {
                alerts: [],
                devices: [],
                groupedAlerts: {},
                fullPage: true
            }
        },
        created() {
            let loader = this.$loading.show();
            this.axios
                .get("https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json")
                .then(response => {
                    this.groupedAlerts = this.groupByDesc(response.data.alerts);
                    this.devices = response.data.device_list;
                    loader.hide()
                })
                .catch(err => {
                    loader.hide();
                    console.warn("error", err);
                });
        },
        methods:{
            latestAlerts: function(date){
                // console.log(date)
                // Get the latest alerts up to one week
                return (new Date().getTime())-(new Date(date).getTime())> (86400);
            },

            getDeviceById: function(id){
                return this.devices.filter(device => {
                    if(device.device_id == id){
                        return device.description;
                    }
                })[0];
            },

            groupByDesc: function(alerts){
                let groups = {};
                alerts.forEach(alert => {
                    if(!groups[alert.description]){
                        groups[alert.description] = [];
                    }
                    groups[alert.description].push(alert);
                });
                this.groupedAlerts = groups;
                return this.groupedAlerts;
            },
        }
    }
</script>