<template>
    <div id="Nav">
         <!-- Navigation -->
        <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo_canary.png" width="autor" height="30" class="d-inline-block align-top" alt="">
                </a>
                <ul class="nav navbar-nav flex-row float-right">
                    <li class="nav-item">
                        <router-link class="btn btn-success mr-2" to="/">logout</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
  name: 'Nav'
}
</script>