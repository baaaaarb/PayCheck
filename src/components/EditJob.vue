<template>
    <div class="edit1">
        <input type="text" v-model="job.jobname">
        <input type="text" v-model="job.pay">
        <button class="editbtn" @click.prevent="update">Submit</button>
    </div>
</template>

<script>

import baza from '@/DataBase/firestore'

export default {
    data(){
        return{
            job:{}
        }
    },
    created(){
        var id = this.$store.state.idoflogged
        baza.collection('users').doc(id).collection('jobs').doc(this.$route.params.id).get()
            .then((doc)=>{
                this.job=doc.data()
            })
    },
    methods:{
        update(){
            var id = this.$store.state.idoflogged
            baza.collection('users').doc(id).collection('jobs').doc(this.$route.params.id)
                .update({
                    jobname: this.job.jobname,
                    pay: this.job.pay,
                })
                .then( ()=>{
                    this.$router.go(-1)
                })
        }
    }
}
</script>

<style >

.edit1 {
    width: 70%;
    margin: 0 auto;
    margin-top: 40px;
}

.edit1 input{
    width:120px;
    height: 20px;
    font-family: nunito;
    padding-left: 20px;
    margin-right: 10px;
    border-color: orange;
}

.editbtn{
    border: 1px #F2921D solid;
    border-radius: 15px;
    margin-top: 20px;
    width: 100px;
    height: 22px;
    background-color:rgb(253, 179, 87);
}
    
.editbtn:hover{
    background-color:rgb(250, 140, 60);
    opacity: 0.7;
}
</style>