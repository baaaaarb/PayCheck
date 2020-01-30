<template>
    <div class="container">
        <div class="profile-job">
            <div class="jbs" v-for="job in jobs" :key="job.id">
                <div class="bold">Job name: {{job.jobname}} </div>
                <div class="bold">Hourly payment: {{job.pay}} kn</div>
                <button class="delete" @click.prevent="deletejob(job.id)">Delete</button>
                <div >
                    <router-link class="edit" :to="{name: 'editjob', params: {id: job.id}}">Edit</router-link>
                </div>
                <div >
                    <router-link class="report" :to="{name: 'report', params: {id: job.id}}">Paycheck report</router-link>
                </div>
                <div >
                    <router-link class="input" :to="{name: 'paycheck', params: {id: job.id, pay: job.pay}}">Input</router-link>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import baza from '@/DataBase/firestore'
import Swal from 'sweetalert2'
import firebase from 'firebase'

export default {
    data(){
        return{
            data:'',
            jobs: []
        }
    },
    created(){
        var id = this.$store.state.idoflogged

        var ref = baza.collection('users').doc(id).collection('jobs')
        ref.onSnapshot(snapshot =>{
            snapshot.docChanges().forEach( change =>{
                  if (change.type === "added"){
                        let doc = change.doc
                        let job = doc.data()
                        job.id = doc.id
                        this.jobs.push(job)
                    }
                    else if(change.type === "removed"){
                        this.jobs = this.jobs.filter(job => {
                        return job.id != change.doc.id
                        })
                    }
            })
        })
       
    },
    methods:{
        deletejob(id){
            Swal.fire({
                title: 'By deleting the job you will delete all salary reports',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {
                if (result.value) {

                    var userid = this.$store.state.idoflogged
                    var job = baza.collection('users').doc(userid).collection('jobs').doc(id)
                    job.collection('pays').get()
                        .then((querySnapshot) =>{
                            querySnapshot.forEach((doc) =>{
                                doc.ref.delete()
                            })
                        })
                    job.delete()
                Swal.fire(
                    'Deleted'
                )
                }
            })
            
        }
    }
    
}
</script>

<style scoped>

.container {
    padding-top: 25px;
}

.profile-job {
    
    width: 70%;
    height: auto;
    margin: 0 auto;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    line-height: 25px;
    
}

.jbs {
    border: 2px #F2921D solid;
    padding: 20px 20px;
    margin-top: 20px;
    background-color: #f7f7f7;
}

.edit, .report, .input {
    float: right;
    padding-right: 5px;
    line-height: 10px;
    padding-right:25px;
    
}

.delete {
    border: 1px #F2921D solid;
    border-radius: 15px;
    width:80px;
    background-color: #fff;
    
}

div .edit, div .report, div .input {
    text-decoration: none;
    color: black;

}

.bold {
    font-weight: 600;
}

.edit:hover, .report:hover, .input:hover {
    opacity: 0.7;
}

</style>

