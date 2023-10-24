<template>
    <v-container>
        <v-row>
            <v-col>

                <h1 class="text-center">Registro</h1>
                <v-alert class="mb-10 mt-10" v-if="msgSucess" color="success" icon="$success"
                    title="Usuario Criado com Sucesso" :value=msgSucess>{{ msgSucess }}</v-alert>
                <v-alert class="mb-10 mt-10" v-if="msgInvalid" density="compact" type="warning" title="Erro no cadastro!">{{
                    msgInvalid }}</v-alert>

                <v-form @submit.prevent="registrar">
                    <v-text-field v-model="nome" label="Nome" required></v-text-field>
                    <v-text-field v-model="id" label="ID" required></v-text-field>
                    <v-sheet class="d-flex align-end">
                        <v-btn class="me-auto" type="submit" color="green">Registrar</v-btn>
                    </v-sheet>
                </v-form>
                <v-card class="mt-10" width="400">
                <v-card-item class="">
                    <v-card-title>Nome: {{ data.name }}</v-card-title>
                    <v-card-subtitle>ID: {{ data.id }}</v-card-subtitle>
                </v-card-item>
                </v-card>
            </v-col>
            <v-col>
                <v-container>
                    <h1 class="text-center"> Adicionar Face</h1>
                    <v-card>

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
            imagem: null,
            msgInvalid: "",
            data:{}
        };
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

                this.nome = "";
                this.id = "";
                this.msgInvalid = ''
                const createPersonResult = await createPersonResponse.json();
                console.log(createPersonResult);
                this.nome = createPersonResult.data.name;
                this.id = createPersonResult.data.id;
                this.msgSucess = `Usuário: ${this.nome} (ID: ${this.id}) adicionado com sucesso.`;
                this.id = ''

                this.nome = ''
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
            const id = '';

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
    }
};
</script>