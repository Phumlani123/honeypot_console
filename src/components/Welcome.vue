<template>
    <div id="Welcome"> 
       <div class="container-fluid">
            <div class="row no-gutter">
            
            <div class="col-md-8 col-lg-6">
                    <div class="login d-flex align-items-center py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9 col-lg-8 mx-auto">

                                    <h1 class="mb-5">Welcome to Canary</h1>
                                    <h3 class="login-heading mb-4">Please log in to your dashboard</h3>
                                    <router-link to="/dashboard" class="btn btn-block btn-success">Get started</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                    <img src="../assets/canary_logo_light@2x.png" class="d-inline-block align-top img-welcome" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: 'Welcome'
    }
</script>
