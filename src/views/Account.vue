<template>
  <div class="account">
    <v-row class="mt-3">
      <v-col cols="12" class="col-12 text-center">
        <h1>Account</h1>
      </v-col>
      <v-col cols="10" class="col-xl-6  col-lg-6 col-md-6 col-sm-6 text-center offset-xl-3 offset-lg-3 offset-md-3">
        
        <v-card
          elevation="24"
          class="pt-6 pb-6 justify-space-around d-flex"
          

        >
          <v-btn @click="logOut">Log out</v-btn>
          <v-btn @click="isDeviceCreateOpenForm=true">add device</v-btn>
          <div v-show="isDeviceCreateOpenForm">
              <input type="text" v-model="name" placeholder="Имя устройства">
              <input type="text" v-model="serialNumber" placeholder="Серийный номер">
              <v-btn @click="tryCreateDevice">Создать</v-btn>
          </div>
            <v-btn @click="refreshDevices">Refresh</v-btn>
        </v-card>
      </v-col>
      <v-col cols="10" class="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-center">
        
        <v-card
          elevation="24"
        >
          <date-picker v-model="time1" valueType="format"></date-picker>
          <v-menu
            offset-y
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                color="deep-purple"
                
                class="white--text ma-5"
                v-bind="attrs"
                v-on="on"
              >
                sensor type
              </v-btn>
            </template>

            <v-list>
              <v-list-item
      
                v-for="item in sensorTypes"
                :key="item"
                link
              >
                <v-list-item-title v-text="item" @click="sensorType=item"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card>      
      </v-col>
      <v-col cols="10" class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <v-card
          elevation="24"
          class="pt-6 pb-6"
        >
        
          <v-card class="device pa-3 ma-3" v-for="device in getDevices" :key="device.id" elevation="12">
            <v-card-title>Name: {{device.name}}</v-card-title>
           
              
              <v-card-subtitle>
                <v-row>
                  <v-col cols="8" class="col-xl-8 col-lg-8 col-md-8 col-sm-8" >
                    <div>
                      Imei: {{device.serial_number}}
                    </div>  
                    <div>
                      Last connection: {{device.updatedAt}}
                    </div>  
                    <div>
                      Time of created: {{device.createdAt}}
                    </div>  
                  </v-col>
                  <v-col cols="4" class="col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex align-end justify-space-around " >
                    <v-btn small @click="getOpenCharts(device.id, device.name)" :disabled="time1==null || sensorType==''">Open charts</v-btn>
                  </v-col>
                </v-row>
               
              </v-card-subtitle>


             
            
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Account',

  components: {  
    DatePicker
  },
  
  data:()=>({
    time1: null,
    name:'',
    serialNumber:'',
    isDeviceCreateOpenForm:false,
    sensorTypes:['Temperature', 'Humidity','Pressure'],
    sensorType:''
  
  }), 
  methods:{
    ...mapActions(['createDevice','getAllDevices', 'getDeviceSensorData']),
    ...mapMutations(['log_Out', 'setChart']),
    logOut(){
      localStorage.clear()
       this.$router.push('Login')
      this.log_Out()
    },
    async getOpenCharts(deviceId, deviceName){
      const body ={
        DeviceId: deviceId,
        token:this.getToken,
        date: this.time1,
        sensorType:this.sensorType
      }
      console.log(body)

      await this.getDeviceSensorData(body)
      .then(data=>{
        console.log(data)
        const result_data = data
        .map(res=>{
          return {
            x:res.createdAt,
            y:JSON.parse(res.data).state
          }
        })
        const dt = {
            type:this.sensorType,
            deviceName:deviceName,
            data:result_data
        }
        this.setChart(dt)
        this.$router.push('Charts')
       // console.log(result_data)
      })
      return
      console.log(deviceId)
      
    },
    async tryCreateDevice(){
      
        const body ={
          name: this.name,
          serialNumber: this.serialNumber,
          token: this.getToken
        }
        console.log(body)
        try{
            await this.createDevice(body)
        this.name = ''
        this.serialNumber = ''
        this.isDeviceCreateOpenForm = false
         await this.refreshDevices() 
        }catch(err){

        } 
    },
    async refreshDevices(){
      const body ={
        token: this.getToken
      }
      console.log(body)
      await this.getAllDevices(body)
    },
    async getDeviceData(DeviceId){
      const body ={
        DeviceId: DeviceId,
        token:this.getToken
      }
      console.log(body)
      await this.getDeviceSensorData(body)
    }
  },
  computed:{
    ...mapGetters(['getToken', 'getDevices']),
    logiValidation(){
        if (this.email.length > 2 && this.password.length > 2){
            return false
        } else{
            return true
        }

    } 
  }, 
  async mounted(){// обьект после создания приложения(destroed- противоположное)
    await this.refreshDevices()
  }
}
</script>