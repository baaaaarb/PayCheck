<template>
    <div>
        <header class="nav-logo">
            <h1><a href="/">Pay</a> <img src="../assets/pchk.png" alt="check" id="icon"> </h1>
            <nav>
                <ul>
                     <li v-if="$store.state.email">
                        <router-link class="nav-link" to="/profile"><strong>Profile</strong></router-link>
                    </li>
                    <li v-if="$store.state.email">
                        <router-link class="nav-link" to="/addjob"><strong>Add a job +</strong></router-link>
                    </li>
                   
                </ul> 
                <ul class="right">
                    <li v-if="!$store.state.email" class="nav-item">
                        <router-link class="nav-link" to="/signin"><strong>Sign Up</strong></router-link>
                    </li>
                    <li v-if="!$store.state.email" class="nav-item">
                        <router-link class="nav-link" to="/login"><strong>Log In</strong></router-link>
                    </li>
                    <li v-if="$store.state.email" class="nav-item">
                        <button @click="signout()" class="nav-link" ><strong>Sign Out</strong></button>
                    </li>
                </ul>
                
            </nav>
        </header> 
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    methods:{
        signout(){
            firebase.auth().signOut()
            this.$store.commit("emailLogin", false);
            this.$store.commit("idofLogged", false);
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

    header {
        width: 100%;
        height: 80px;
        background-color: #f1f1f1 ;
        border-bottom: 2px #FFAF4A solid;
    }

    header h1 {
        font-family: open sans condensed;
        font-size: 30px;
        letter-spacing: 2px;
        line-height: 75px;
        padding: 0 20px 0 40px;
        display: block;
        margin: 0 auto;
        float: left;
    }

    header h1 a {
        text-decoration: none;
        color: #262626;

    }

     #icon {
        width: 25px;
    }

    header .signout {
        text-decoration: none;
        font-family: open sans condensed;
        letter-spacing: 2px;
        line-height: 20px;
        text-transform: uppercase;
        color: #262626;
        font-size: 20px;
        font-weight: 600;
        padding: 10px 20px;
        text-align: right;
        float: right;
        margin-right: 40px;
        margin-top: 20px;


    }

    header nav ul {
        margin: 20px 0 0 20px;
        float: left;
    }

    header nav ul li {
        line-height: 40px;
        font-family: open sans condensed;
        font-size: 20px;
        font-weight: 600;
        list-style: none;
        color: #262626;
        display: inline-block; 
        padding: 0px 26px;
        text-align: center;
        text-transform: uppercase;
        
    }

    header nav ul li a {
        height: 45px;
        padding: 0 10px;
        font-family: open sans condensed;
        font-size: 20px;
        font-weight: 600;
        color: #262626;
        letter-spacing: 1px;
        text-decoration: none;
        white-space: nowrap;

    }

    nav ul li:hover {
        background-color: #FFAF4A;
        opacity: 0.8;
    }

    h1:hover {
        opacity: 0.7;
    }

    button{
        border:none;
        text-decoration: none;
        font-family: open sans condensed;
        letter-spacing: 2px;
        line-height: 20px;
        text-transform: uppercase;
        color: #262626;
        font-size: 20px;
        font-weight: 600;
        padding: 10px 20px;
        text-align: right;
        float: right;
    }

    button:hover{
        background-color: #FFAF4A;
        opacity: 0.8;
    }
    
    ul .right {
        text-align: right;
        float: right;
    }

</style>
