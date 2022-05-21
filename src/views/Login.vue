<template>
  <div class="account" v-show="isOldUser">
    <v-row align="center" justify="center" class="mt-12">
      <v-col cols="8" class="col-xl-2 col-lg-3 col-md-4 col-sm-5 text-center">
        <v-card elevation="24" class="pt-5 pb-5 pl-5 pr-5" >
          <h1>Login</h1>
          <div>
          <v-text-field  label="email" v-model="email" ></v-text-field>
        
          
          <v-text-field label="password" v-model="password"></v-text-field>
          
          <v-btn @click="tryLogin" :disabled="logiValidation" color="error">Enter</v-btn>
          </div>
        </v-card>
        
      </v-col>
    </v-row>
  
  </div>
</template>
<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'
export default {
  name: 'Login',

  components: {  
  },
  
  data:()=>({
    email:'',
    password:'',
    isOldUser:false
  
  }), 
  methods:{
    ...mapActions(['login', 'auth']),
    ...mapMutations(['log_Out']),
    async  tryLogin(){
        console.log(this.email)
        console.log(this.password)
        const body ={
          email: this.email,
          password: this.password
        }
        try{
            await this.login(body)
            localStorage.setItem('access_token', this.getToken)
            this.$router.push('Account')
        }catch(err){

        } 
    }
  },
  computed:{
    ...mapGetters(['getToken', 'getUser']),
    logiValidation(){
        if (this.email.length > 2 && this.password.length > 2){
            return false
        } else{
            return true
        }

    } 
  }, 
  async mounted(){
    if (localStorage.getItem('access_token') && !this.getToken){
      await this.auth({
        token: localStorage.getItem('access_token')
      })
      if (this.getUser){
         this.$router.push('Account')
      }
    } else{
      this.isOldUser = true
    }
  }
}
</script>