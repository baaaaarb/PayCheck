<template>
    <div class="main">
        <p>
            {{error}}
        </p>
        <div class="date">
            First date - <input v-model="firstDate" type="date" name="bday">
        </div>
        <div class="date">
            Second date - <input v-model="secondDate" type="date" name="bday">
        </div>
        <h1 class="paycheck" v-if="paycheck">Paycheck for this period: {{paycheck}} kn</h1>
        <button @click.prevent="getdates()">Choose</button>
        <button @click.prevent="save()">Save</button>

        <div v-for="date in datumi" :key="date.id">
            <div>
                <h1>{{date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()}}</h1>
                <div class="hours">Number of hours before 10pm: <input v-model="date.normalpay" type="number"></div>
                <div class="hours">Number of hours after 10pm: <input v-model="date.higherpay" type="number"></div>
            </div>
            
        </div>
        <button @click.prevent="calculate">Calculate</button>
        
    </div>
</template>

<script>
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import parseISO from 'date-fns/parseISO'
import baza from '@/DataBase/firestore'
import Swal from 'sweetalert2'
import moment from 'moment'



export default {
    data(){
        return{
            firstDate: '',
            secondDate: '',
            datumi: [],
            vrijeme:[],
            paycheck:'',
            error:'',
            totalhours:''
        }
    },
    methods:{
        getdates(){
            this.error = ''
            if(this.firstDate=='' || this.firstDate==''){
                this.error = "Enter dates"
            }else{
                var firstDate = moment(this.firstDate).toISOString()
                var secondDate = moment(this.secondDate).toISOString()
                this.datumi = eachDayOfInterval({start: parseISO(firstDate), end: parseISO(secondDate)})
            }
            
        },
        calculate(){
            this.paycheck = 0
            this.totalhours = 0
            this.datumi.forEach(date => {
                if(date.higherpay==null || date.normalpay==null){
                    this.error = 'Enter hours'
                }else{
                    this.totalhours += date.higherpay*1 + date.normalpay*1
                    if(date.getDay()==0){
                        this.paycheck += (date.normalpay * this.$route.params.pay * 1.5) + (date.higherpay * this.$route.params.pay * 1.5)
                    }else{
                        this.paycheck += (date.normalpay * this.$route.params.pay) + (date.higherpay * this.$route.params.pay * 1.5)
                    }
                    
                }
                
            });
            
        },
        save(){
            Swal.fire({
                title: 'Is everything entered correctly?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yep, save it!'
            }).then((result) => {
                if (result.value) {
                    var idofuser = this.$store.state.idoflogged
                    var idofjob = this.$route.params.id
                    baza.collection('users').doc(idofuser).collection('jobs').doc(idofjob).collection('pays')
                        .add({
                            firstDate : this.firstDate,
                            secondDate : this.secondDate,
                            paycheck : this.paycheck,
                            totalhours: this.totalhours
                        })
                            .then(() =>{
                                this.firstDate = '',
                                this.secondDate= '',
                                this.datumi = [],
                                this.vrijeme = [],
                                this.paycheck = '',
                                this.totalhours = '',
                                this.error= ''
                            })
                Swal.fire(
                    'OK!',
                    'Successfully added'
                )
                }
            })
            
        }
    }

}
</script>

<style scoped>

.main {
    width: 70%;
    height: 300px;
    margin: 0 auto;
    background-color: #f1f1f1; 
    padding-top: 27px;
    margin-top:40px;
}

h1, .hours {
    font-family: nunito;
    font-size: 22px;
}

h1 {
    padding-top: 50px;
    margin-left: 10px;
}

.paycheck{
    margin-top: 80px;
    border: 2px black solid;
    width: 320px;
    padding: 15px;
}

.hours{
   padding-top: 10px;
   font-size:18px;
   margin-left:30px;
}

.date{
    margin-left: 30px;
    width: 300px;
    height: 60px;
    margin-top: 40px;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
}

button {
    border: 1px #F2921D solid;
    border-radius: 15px;
    background-color: #fff;
    width: 100px;
    margin-left: 40px;
    margin-top: 20px;
    height:27px;
    font-family: nunito;
    font-size:18px;
    
}

button:hover{
    background-color: rgb(253, 179, 87);
}

.date input{
    border: 1px #F2921D solid;
    border-radius: 15px;
    background-color: #fff;
    width: 150px;
    height: 26px;
    padding-left:10px;
    font-family: nunito;
    
}

.hours input {
    border: 1px #F2921D solid;
    border-radius: 15px;
    background-color: #fff;
    width: 100px;
    height: 26px;
    padding-left:10px;
    font-family: nunito;
}

p{
    font-size: 20px;
    color: red;
    font-family: nunito;
    text-align: left;
}
</style>