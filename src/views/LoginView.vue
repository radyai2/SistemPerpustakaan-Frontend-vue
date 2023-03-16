<template>
    <!-- <div class="login-box"> -->
    <div class="card card-outline card-primary mt-1">
        <div class="card-header text-center">
            <h2>LOGIN Perpustakaan Sekolah</h2>
        </div>
        <div class="card-body">
            <p class="login-box-msg">Masukkan Email dan Password</p>

            <form @submit.prevent="login">
                <div class="input-group mb-3">
                    <input type="email" class="form-control" required autocomplete="off" placeholder="Email"
                        v-model="email">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control" required autocomplete="off" placeholder="Password"
                        v-model="password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <input type="submit" class="btn btn-primary">
            </form>
        </div>
    </div>
    <!-- </div> -->
</template>
    
<script>
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'

Vue.use(axios)

export default {
    data() {
        return {
            account: {},
            email: '',
            password: ''
        }
    },
    created() {
        if (this.$store.state.token !== '') {
            this.axios.post('http://localhost:8000/api/checkToken', { header: { 'Authorization': 'bearer' + this.$store.state.token } })
                .then(
                    (response) => {
                        console.log(response)
                        this.$router.push('/')
                    })
                .catch(
                    (err) => {
                        console.log(err)
                        this.$store.commit('clearToken')
                    }
                )
        }
    },
    methods: {
        login() {
            var data = {
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:8000/api/login', data)
                .then(
                    (response) => {

                            // localStorage.setItem('token', response.data.token)
                            // localStorage.setItem('status', true)
                            // this.$emit('authenticated', true)
                            this.$store.commit('setToken',response.data.token)
                            location.href = '/'
                        
                    }
                )
                .catch(
                    (err) => {
                        console.log(err)
                        swal('Email atau password salah', {
                            icon: 'error'
                        })
                    }
                )
        }
    },
    mounted() {
        this.$emit('aunthenticated', false)
    }
}
</script>