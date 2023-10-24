<template>
  <div>
    <v-container>
      <v-card width="400">
        <v-card-item>
          <v-card-title>Nome: {{ data.name }}</v-card-title>
          <v-card-subtitle>ID: {{ data.id }}</v-card-subtitle>
        </v-card-item>
      </v-card>
      <v-btn @click="comMascara" color="success">Com Mascara</v-btn>
      <v-btn @click="semMascara" color="red">Sem Mascara</v-btn>
      <v-btn @click="abrirPorta" color="">Abrir porta</v-btn>
    </v-container>
    
    <v-container>
      <h1 class="text-center">Registro</h1>
      <div v-if="msgSucess">{{ msgSucess }}</div>
      <v-form @submit.prevent="registrar">
        <v-text-field v-model="nome" label="Nome" required></v-text-field>
        <v-text-field v-model="id" label="ID" required></v-text-field>
        <v-btn type="submit" color="primary">Registrar</v-btn>
      </v-form>
    </v-container>
    
    <v-container class="mt-10">
      <v-card>
        <v-card-title class="text-center text-red">IMPORTANTE: só é possível enviar imagem após ter criado um registro de usuário</v-card-title>
      </v-card>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
      <v-btn id="enviarimg" @click="openFileInput" > Enviar Imagem</v-btn>
      <v-btn @click="enviarImagemBase64" color="success">Enviar</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Principal",
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
    async registrar() {
      try {
        const pass = "12345678";
        const createPersonData = {
          name: this.nome,
          id: this.id,
        };
        const createPersonQueryString = `pass=${pass}&person=${encodeURIComponent(
          JSON.stringify(createPersonData)
          )}`;
          
        const createPersonResponse = await fetch(
          `http://192.168.15.34:8090/person/create?${createPersonQueryString}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
          );
          
          if (!createPersonResponse.ok) {
            throw new Error("Erro na solicitação POST");
          }
          
          this.msgSucess = `Usuário ${this.nome}  (ID: ${this.id}) adicionado com suceeso.`;
          this.nome = "";
          this.id = "";
        const createPersonResult = await createPersonResponse.json();
        console.log(createPersonResult);
      } catch (error) {
        console.error(error);
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imagem = file;
    },
    async enviarImagemBase64() {
      try {
        if (!this.imagem) {
          console.error("Por favor, selecione uma imagem.");
          return;
        }

        const personId = this.data.id;

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(",")[1]; 

          const formData = new FormData();
          formData.append("pass", this.pass);
          formData.append("personId", personId);
          formData.append("imgBase64", base64String); 

          const response = await fetch("http://192.168.15.34:8090/face/create", {
            method: "POST",
            body: formData,
          });

          const responseData = await response.json();
          console.log("Resposta da API:", responseData);

          if (response.ok) {
            console.log("Imagem enviada com sucesso!");
          } else {
            console.error("Erro ao enviar imagem:", responseData.error);
          }
        };

        reader.readAsDataURL(this.imagem);
      } catch (error) {
        console.error("Erro durante o registro da face", error);
      }
    },
  },


  async mounted() {
    try {
      const pass = "12345678";
      const id = '1';

      const findResponse = await fetch(
        `http://192.168.15.34:8090/person/find?pass=${pass}&id=${id}`
      );

      if (!findResponse.ok) {
        throw new Error("Erro na solicitação GET");
      }

      const findData = await findResponse.json();
      this.data = findData.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
#enviarimg{
  border-style: dotted;
  border: 1px dotted #ffffff;
  background-color: rgba(255, 255, 255, 0.144);
  width: 300px;
  height: 300px;
}
</style>