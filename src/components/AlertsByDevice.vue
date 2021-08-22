<template>
    <div id="AlertsByDevice"> 
        <div class="row" >
            <div class="col-md-4 my-2 " v-for="alert in filteredAlerts" :key="alert.alert_id">
                <div class="card p-3 alert-bg h-100 shadow" >
                    <div class="card-body alert-body ">
                        <p>{{ alert.description }} on {{device.name}}</p>
                        <p class="m-1"><small>Ip: {{alert.src_host}}</small></p>
                        <p class="m-1"><small>Time: {{formatDate(alert.created) }}</small></p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'AlertsByDevice',
        data() {
            return {
                device: {},
                alerts: [],
                filteredAlerts: [],
                fullPage: true
            }
        },
        created() {
            let loader = this.$loading.show();
            this.device = this.$route.params;
            console.log(this.device)
            this.axios
                .get("https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json")
                .then(response => {
                    this.alerts = this.filterAlertByDevice(response.data.alerts);
                    loader.hide()
                })
                .catch(err => {
                    loader.hide();
                    console.warn("error", err);
                });
        },
        watch: {
            '$route.params': 'getData'
        },
        methods: {
            filterAlertByDevice: function(alerts) {
                alerts.filter((item) => {
                    if(item.node_id == this.device.id ){
                        console.log(item)
                        this.filteredAlerts.push(item);
                    }
                });
            },
            formatDate: function(created) {
                let date = new Date(0);
                date.setSeconds(created); // specify value for SECONDS here
                let timeString = date.toISOString().substr(0, 22).replace(/T/g, " at ");
                return timeString;
            },
            getData () {
                location.reload();
            }
        }
    }
</script>