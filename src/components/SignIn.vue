<template>
    <div>
            <div class="box">
                <div>
                    {{error}}
                </div>
                <div class="add">
                    <p>Create an account:</p>
                        <ul>
                            <li>Email:</li>
                            <input v-model="email" type="email" class="enter-email" required>
                            <li>Password:</li>
                            <input v-model="password" type="password" class="enter-pw" required>
                            <button @click.prevent="register()" class="submit">Submit</button>
                        </ul>
                </div>
            </div>            
    </div>
</template>

<script>
import baza from '@/DataBase/firestore'
import firebase from 'firebase'

export default {
    data(){
        return{
            email: '',
            password:'',
            error:''
        }

    },
    methods:{
        register(){
            
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() =>{
                this.$store.commit("emailLogin", this.email);
                baza.collection('users').add({
                    email: this.email
                }).then((cred)=>{
                    this.$store.commit("idofLogged", cred.id);
                    setTimeout(() =>
                            { this.$router.push('/addjob') }
                        , 1000);
                })
                })
                .catch((error)=>{
                    this.error = error.message
                })
        }
    }

}
</script>

<style scoped>
    .box {
        padding-top: 50px;
    }

    .add {
        border: 3px #F2921D solid;
        height: 300px;
        width: 400px;
        padding-top: 30px;
        margin: 0 auto;
    }

    div ul li {
        list-style: none;
        padding-top: 20px;
        padding-bottom: 3px;
        font-family: 'Nunito', sans-serif;
    }

    input {
        border: 1px #F2921D solid;
        border-radius: 15px;
        width: 250px;
        height: 25px;
        padding-left: 10px;
        
    }

    .submit {
        border: 1px #F2921D solid;
        border-radius: 15px;
        margin-top: 20px;
        width: 100px;
        height: 22px;
        background-color:rgb(253, 179, 87);
        
    }
    
    .submit:hover {
        background-color:#F2921D;
    }

    p {
        font-family: 'Nunito', sans-serif;
        font-size: 18px;
        margin-left: 43px;
    }

</style>