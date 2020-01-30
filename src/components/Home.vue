<template> 
    <div class="space">
      <div class="home">
          Before you proceed, you must create an account. If you have already created an account, please log in.
      </div>
    </div>
</template>


<script>

    export default {
        data(){
            return {
                
            }
        },
        components:{
           
        }
    }
</script>

<style scoped>

    .space{
        padding-top: 25px;
    }

    div .home{
        
        width: 70%;
        height: 450px;
        text-align: center;
        background-color: #f2f2f2;
        margin: 0 auto;
        padding-top:40px;
        border: 1px black solid;
        letter-spacing: 2px;
        line-height: 20px;
        font-family: 'Nunito', sans-serif;
        color: #262626;
        font-size: 20px;
    }

</style>