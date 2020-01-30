<template>
    <div>
        <div class="place" v-for="paycheck in paychecks" :key="paycheck.id">
            <div>From {{paycheck.firstDate.getDate()}} to {{paycheck.secondDate.getDate()}} {{monthNames[paycheck.secondDate.getMonth()]}} {{paycheck.secondDate.getFullYear()}} </div>
            <div>Work hours: <strong>{{paycheck.totalhours}} h</strong></div>
            <div>Salary for that period: <strong>{{paycheck.paycheck}} kn</strong></div>
        </div>
    </div>
</template>

<script>
import baza from '@/DataBase/firestore'

export default {
    data(){
        return{
            paychecks: [],
            monthNames: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ]
        }
    },
    created(){
        var idofuser = this.$store.state.idoflogged
        var idofjob = this.$route.params.id
        baza.collection('users').doc(idofuser).collection('jobs').doc(idofjob).collection('pays').get()
            .then((querySnapshot) =>{
                querySnapshot.forEach(doc => {
                    var paycheck =[]
                    var firstDate = new Date(doc.data().firstDate)
                    var secondDate = new Date(doc.data().secondDate)
                    paycheck.firstDate = firstDate
                    paycheck.secondDate = secondDate
                    paycheck.id = doc.id
                    paycheck.paycheck = doc.data().paycheck
                    paycheck.totalhours = doc.data().totalhours
                    this.paychecks.push(paycheck)
                });
            })
    }
}
</script>

<style>

.place{
    border: 1px solid black;
    margin: 20px auto;
    width: 70%;
    padding: 10px;
    font-family: nunito;
}
</style>