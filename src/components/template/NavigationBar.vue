<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <!-- <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a> -->
                <button class="btn" data-widget="pushmenu"><i class="fas fa-bars"></i></button>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <button class="btn btn-sm btn-warning" @click="logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script>
// import axios from 'axios'
import swall from 'sweetalert'
export default {
    methods: {
        logout() {
            // localStorage.removeItem('token')
            // localStorage.removeItem('user')
            swall({
                icon: "warning",
                title: "Ingin LogOut?",
                dangerMode: true,
                buttons: true,

            }).then(
                (logout) => {
                    if (logout) {
                        this.$store.commit('clearToken')
                        location.href = '/'
                    }
                }
            )

                .catch(
                    error => {
                        console.log(error.response.data);
                    }
                )
        }
    }
}
</script>