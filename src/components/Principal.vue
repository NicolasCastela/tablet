<template>
  <div>
    <v-container>
      <v-row align="start" no-gutters style="height: 300px">
        <v-col>
          <v-card width="400">
            <v-card-item >
              <v-card-title>Nome:  </v-card-title>
              <v-card-subtitle>ID: </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col>
          <v-card width="400">
            <v-card-item>
              <v-card-title>Nome:</v-card-title>
              <v-card-subtitle>ID:</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
       <v-row  align="start" no-gutters style="height: 300px">
        <v-col>
        <v-btn @click="comMascara" color="success">Com Mascara</v-btn>
        <v-card>
          
        </v-card>
        </v-col>
        <v-col>
        <v-btn @click="semMascara" color="red">Sem Mascara</v-btn>

        </v-col>
       </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Principal",
  data(){
    return {
      status: null,
      
    }
  },


  methods: {
      async comMascara(){
          const pass = '12345678';
          const status = '1';
        const response = await fetch('http://192.168.15.34:8090/maskDetection/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `pass=${pass}&status=${status}` 
        });
      
        },
              
            

      async semMascara(){
        const pass = '12345678';
        const status = '0';
        const response  = await fetch('http://192.168.15.34:8090/maskDetection/',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
          },
          body: `pass=${pass}&status=${status}`
        });
        
        
      },
      
  },
  

}
</script>



  
