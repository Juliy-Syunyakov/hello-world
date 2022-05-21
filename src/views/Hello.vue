<template>
  <div>
    <h1>
      Hello, {{name}},{{age}},{{surname}}
    </h1>
    <input type="text" placeholder="enter your name" v-model="name">
  </div>
</template>
<script>
export default {
  name: 'Hello',

  components: {  
  },
  
  data:()=>({
    name:'Juliy',
    age:14,
    surname:'Syunyakov'
  
  }), 
  created(){// обьект после создания приложения(destroed- противоположное)
  //  this.name = 'Juliy'
    console.log('created')
  //   this.age = '14'
    console.log('created')
   // this.surname = 'Syunyakov'
    console.log('created')
  }
}
</script>

<style  scoped>
h1{
  color: red;
}

</style>