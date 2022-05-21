<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="10" class="col-xl-8 col-lg-10 col-md-10 text-center ">
        <h1>
          {{getChartData}}
        </h1>
        <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
      </v-col>
    </v-row>
  </div>
</template>
<script>
 import { Plotly } from 'vue-plotly'
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Charts',
    
  components: {  
      Plotly
  },
  
  data:()=>({
    data:[{
      x: [],
      y: [],
      type:"scatter"
    }],
    layout:{
      title: ""
    }
  
  }), 
  methods:{
   
  },
  computed:{
   ...mapGetters(['getChart','getChartData'])

  }, 
  async mounted(){// обьект после создания приложения(destroed- противоположное)
    if (this.getChart == null){
      this.$router.push('Account')
      return 
    }
    this.getChart.data.forEach(element => {

      this.data[0].x.push(element.x)
      this.data[0].y.push(element.y)
    });
   
  }
}
</script>

