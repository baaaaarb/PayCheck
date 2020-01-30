<template>
    <div class="box">
        <div class="add">
            <div>
                {{success}}
            </div>
            <p>Please, enter the following info:</p>
            <ul>
                <li>Job name:</li>
                <input v-model="jobname" type="text" class="job-name" required>
                <li>Hourly pay (kn):</li>
                <input v-model="pay" type="number" class="job-pay" required>
            
                <button @click.prevent="addjob()" class="submit">Submit</button>
            </ul>
        </div>
    </div>
</template>


<script>
import baza from '@/DataBase/firestore'
import firebase from 'firebase'
export default {
    data(){
        return{
            pay:'',
            jobname:'',
            success: ''
        }
    },
    methods:{
        addjob(){
            var id = this.$store.state.idoflogged
            baza.collection('users').doc(id).collection('jobs').add({
                jobname: this.jobname,
                pay: this.pay
            })
                .then(() =>{
                    this.success = 'Success'
                    this.jobname = '',
                    this.pay = ''
                    setTimeout(() =>
                        { this.$router.push('/profile') }
                        , 1000);
                })
        }
    },
    created(){
    }
}
</script>


<style scoped>
    .box {
        padding-top: 50px;
    }

    .add {
        border: 3px #F2921D solid;
        height: auto;
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

    .nts {
        padding-top: 40px;
    }

    .notes {
        border: 1px #F2921D solid;
        border-radius: 15px;
        height: 100px;
        width: 300px;
    }

    input .sbmt {
        padding-top: 30px;
        width:30px;
    }
    
    p {
        font-family: 'Nunito', sans-serif;
        font-size: 18px;
        margin-left: 43px;
    }

    .submit {
        border: 1px #F2921D solid;
        border-radius: 15px;
        margin-top: 20px;
        width:150px;
    }


    /* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */
    input::-webkit-outer-spin-button, 
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


</style>