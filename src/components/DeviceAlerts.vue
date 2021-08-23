<template>
    <div id="DeviceAlerts"> 
        <div class="row" >
            <div class="col-md-4" :class="{ 'col-md-12': index === activeItem}" v-for="(value, name, index) in groupedAlerts" :key="name" @click="viewDetail(index)">
                <span class="p1 fa-stack fa-1x has-badge"
                      :data-count="value.length">
                </span>
                <div class="card p-3 alert-bg shadow">
                    <small class="alert-count">Critical {{value.length === 1 ? "alert" : "alerts"}}</small>
                    <div class="card-body alert-body">{{getDeviceById(name).description}}  </div>
                </div>
                <div class="card d-none card-detail" :class="{'d-block': index === activeItem}">
                    <div class="row">
                        <div class="col-md-3 card-body px-4" v-for="val in value" :key="val.alert_id" >
                            <p >Detected on {{getDeviceById(val.node_id).description}}</p>
                            <p ><small>Ip: {{val.src_host}}</small></p>
                            <p ><small>Time: {{formatDate(val.created) }}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'DeviceAlerts',
        data() {
            return {
                devices: [],
                groupedAlerts: {},
                fullPage: true,
                activeItem: true
            }
        },
        created() {
            let loader = this.$loading.show();
            this.axios
                .get("https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json")
                .then(response => {
                    this.groupedAlerts = this.groupByDevice(response.data.alerts);
                    this.devices = response.data.device_list;
                    loader.hide()
                })
                .catch(err => {
                    loader.hide();
                    console.warn("error", err);
                });
        },
        methods:{
            getDeviceById: function(id){
                return this.devices.filter(device => {
                    if(device.device_id == id){
                        return device.description;
                    }
                })[0];
            },
            groupByDevice: function(alerts){
                let groups = {};
                alerts.forEach(alert => {
                    if(!groups[alert.node_id]){
                        groups[alert.node_id] = [];
                    }
                    groups[alert.node_id].push(alert);
                });
                return groups;
            },
            formatDate: function(created) {
                let date = new Date(0);
                date.setSeconds(created); // specify value for SECONDS here
                // Stack overflow solution to convert to readable date
                let timeString = date.toISOString().substr(0, 22).replace(/T/g, " at ");
                return timeString;
            },
            viewDetail: function(i) {
                // Toggle active item 
                if (!this.activeItem) {
                   this.activeItem = i
                } else {
                    this.activeItem = false;
                }
        
            }
        }
    }
</script>