<template>
  <v-container>
    <v-row>
      <v-col>

        <h1 class="text-center mb-1">Registro</h1>

        <v-alert class="mb-10 mt-10" v-if="msgSucess" color="success" icon="$success" title="Usuario Criado com Sucesso"
          :value=msgSucess>{{ msgSucess }}</v-alert>
        <v-alert class="mb-10 mt-10" v-if="msgInvalid" density="compact" type="warning" title="Erro no cadastro!">{{
          msgInvalid }}</v-alert>

        <v-form @submit.prevent="registrar">
          <v-text-field v-model="nome" label="Nome" required></v-text-field>
          <!-- <v-text-field v-model="id" label="ID" required></v-text-field> -->
          <div class="d-flex justify-center">
            <v-btn class="" type="submit" color="green">Registrar</v-btn>
          </div>
        </v-form>
        <div>
          
            <h1 class="text-center mt-10">Deletar</h1>
            <v-divider></v-divider>
            <v-alert class="mb-10 mt-10" v-if="msgSucess1" color="success" icon="$success" title="Usuario Excluido com Sucesso"
          :value=msgSucess1>{{ msgSucess1 }}</v-alert>
          <v-alert class="mb-10 mt-10" v-if="msgInvalid1" density="compact" type="warning" title="Erro na Exclusão!">{{
          msgInvalid1 }}</v-alert>
            <v-form @submit.prevent="deletePerson">
              <!-- <v-text-field v-model="nomeParaExcluir" label="Nome"></v-text-field> -->
              <v-text-field v-model="idParaExcluir" label="ID"></v-text-field>
              <div class="d-flex justify-center">
                <v-btn class="" type="submit" color="red">Excluir</v-btn>
              </div>
            </v-form>
          
        </div>
      </v-col>
      <v-col>
        <v-container>
          <h1 class="text-center"> Adicionar Face</h1>
          <v-text-field v-model="idParaEnvio" label="ID para Envio de Imagem"></v-text-field>
          <v-card class="mb-5">
            <!-- <v-text-field v-model="id" label="Digite o ID"></v-text-field> -->
            <v-card-title style=" font-size: 14px;" class="text-center text-red">IMPORTANTE: só é possível
              enviar imagem após ter criado um registro de usuário </v-card-title>

          </v-card>
          <div class="d-flex align-center justify-center flex-column">
            <v-img class="text-center" width="300" src="../../public/img/avataranonimo.jpg"></v-img>
            <div style="width: 300px;" class=" mt-5 d-flex justify-space-between">
              <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
              <v-btn id="enviarimg" @click="openFileInput"> Enviar Imagem</v-btn>
              <v-btn @click="enviarImagemBase64" color="success">Enviar</v-btn>
              
            </div>
          </div>
          <div><v-btn @click="teste"></v-btn>
            <img :src="imageteste" >
          </div>
        </v-container>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Registro',
  data() {
    return {
      pass: "12345678",
      nome: "",
      id: "",
      msgSucess: "",
      msgSucess1: "",
      imagem: null,
      msgInvalid: "",
      msgInvalid1: "",
      idParaEnvio: "",
      nomeParaExcluir: "",
      idParaExcluir: "",
      imageteste: ""

    };
  },
  watch: {
    id(newId) {

      this.idParaEnvio = newId;
    },
  },

  methods: {
    async registrar() {
      try {
        const pass = "12345678";
        if (this.nome.trim() === "") {
          this.msgInvalid = "Por favor, o Id é gerado automaticamente, mas insira um nome válido."
          this.msgSucess = ''
          return;
        }
        const createPersonData = {
          name: this.nome,
          id: this.id

        };

        const createPersonQueryString = `?pass=${pass}&person=${encodeURIComponent(
          JSON.stringify(createPersonData)
        )}`;

        const createPersonResponse = await fetch(
          `http://192.168.15.34:8090/person/create${createPersonQueryString}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        if (!createPersonResponse.ok) {
          throw new Error("Erro na solicitação POST");
        }

        const createPersonResult = await createPersonResponse.json();
        this.msgSucess = `Usuário: ${this.nome} (ID: ${this.id ? this.id : createPersonResult.data.id}) adicionado com sucesso.`;
        this.nome = ""
        this.msgInvalid = '',
        this.id = ''
        console.log(createPersonResult.data.id);

      } catch (error) {
        console.error(error);
      }
    }, openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imagem = file;
    },
    async enviarImagemBase64() {
      try {
        if (!this.imagem || !this.idParaEnvio) {
          console.error("Por favor, selecione uma imagem e insira um ID válido.");
          return;
        }

        const personId = this.idParaEnvio;

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(",")[1];

          const formData = new FormData();
          formData.append("pass", this.pass);
          formData.append("personId", personId);
          formData.append("imgBase64", base64String);
          console.log(base64String)
          this.imageteste = 'data:image/png;base64, ' + base64String
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
      // ---------------------------------------------------------------------------------//
    },
    async deletePerson() {
  try {
    const pass = "12345678";
    const personId = this.idParaExcluir;

    if (!personId) {
      this.msgInvalid1 = "Por favor, insira um ID para excluir.";
      this.msgSucess1 = ""
      return;
    }

    const paramsPassado = `pass=${pass}&id=${personId}`;

    const response = await fetch(`http://192.168.15.34:8090/person/delete?${paramsPassado}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (response.ok) {
      this.msgSucess1 = `Usuário: ${this.nomeParaExcluir} (ID: ${this.idParaExcluir}) excluído com sucesso.`;
      this.nomeParaExcluir = "";
      this.idParaExcluir = "";
      this.msgInvalid1 = "";
      console.log("Pessoa excluída com sucesso!");
    } else {
      const errorData = await response.json();
      console.error("Erro ao excluir pessoa:", errorData.error);
    }
  } catch (error) {
    console.error("Erro durante a exclusão da pessoa", error);
  }
    },
  async teste(){
   const response = await fetch(`http://192.168.15.34:8090/face/find?pass=12345678&personId=10`,{
    method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
   })
   const base64 = await( await  response.json()).data[0] ;
      console.log("Ola msg->",  base64.feature)
      this.imageteste = 'data:image/png;base64, ' + base64.feature;

  }}
}
</script>