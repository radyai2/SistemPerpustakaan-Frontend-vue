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
    import axios from 'axios'
    export default{
        methods: {
            logout(){
                axios.post('http://localhost:8000/api/logout', {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    (response) => {
                        // localStorage.removeItem('token')
                        // localStorage.removeItem('user')
                        this.$store.commit('clearToken')
                        console.log(response);

                        this.$router.push('/login')
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