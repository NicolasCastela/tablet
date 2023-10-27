<template>
  <v-container fluid class="page-container">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-btn @click="comMascara" color="success" class="action-button">
          <v-icon left>mdi-face-mask</v-icon> Com Máscara
        </v-btn>
        <v-btn @click="semMascara" color="error" class="action-button">
          <v-icon left>mdi-face-mask-off</v-icon> Sem Máscara
        </v-btn>
        <v-btn @click="abrirPorta" class="action-button">
          <v-icon left>mdi-door-open</v-icon> Abrir Porta
        </v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <div id="enviarimg" class="camera-feed"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Portaria",
  data() {
    return {
      data: {},
      pass: "12345678",
      nome: "",
      id: "",
      msgSucess: "",
      imagem: null,
    };
  },
  methods: {
    async comMascara() {
      try {
        const pass = "12345678";
        const status = "1";
        const response = await fetch(
          "http://192.168.15.34:8090/maskDetection/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `pass=${pass}&status=${status}`,
          }
        );

        if (!response.ok) {
          throw new Error("Erro na solicitação POST");
        }
      } catch (error) {
        console.error("Erro na solicitação POST:", error);
      }
    },
    async semMascara() {
      try {
        const pass = "12345678";
        const status = "0";
        const response = await fetch(
          "http://192.168.15.34:8090/maskDetection/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `pass=${pass}&status=${status}`,
          }
        );

        if (!response.ok) {
          throw new Error("Erro na solicitação POST");
        }
      } catch (error) {
        console.error("Erro na solicitação POST:", error);
      }
    },
    async abrirPorta() {
      const pass = "12345678";
      const res = await fetch(
        "http://192.168.15.34:8090/device/openDoorControl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `pass=${pass}`,
        }
      );
    },
  },
};
</script>

<style scoped>
.page-container {
  background-color: #f5f5f5; /* Cor de fundo da página */
  min-height: 100vh;
}

.action-button {
  margin-bottom: 20px;
  width: 100%;
}

.camera-feed {
  border: 2px dashed #2196F3; /* Cor da borda do espaço reservado para a câmera */
  background-color: #E3F2FD; /* Cor de fundo do espaço reservado para a câmera */
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2196F3; /* Cor do texto dentro do espaço reservado para a câmera */
  font-size: 24px;
  text-align: center;
}
</style>
