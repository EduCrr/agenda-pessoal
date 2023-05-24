Algumas considerações sobre o projeto:

Faça o download dos arquivos e execute os seguintes comandos: npm install e, em seguida, npm start.

Encontrei alguns problemas nas requisições desta API e gostaria de destacar alguns casos de erro:

O token atual é removido quando o nome de usuário é alterado. Nesse caso, é necessário sair do sistema e fazer login novamente.
<div align="left">
<img src="https://github.com/EduCrr/chairs/assets/87316285/114976ad-3786-4f3b-8a83-12342c30bf43" width="700px" />
</div>

Houve um erro ao excluir uma pessoa e existem usuários com IDs duplicados.
<div align="left">
<img src="https://github.com/EduCrr/chairs/assets/87316285/03e07bbc-8784-4d6b-aee9-21f8847c9839" width="700px" />
</div>

A solicitação GET /api/foto/download/{id} não está retornando a foto da pessoa, como mostra a imagem abaixo. No momento, estou utilizando uma foto estática incorporada no código.
<div align="left">
<img src="https://github.com/EduCrr/chairs/assets/87316285/d6903a00-9b5f-4122-9a7b-ba7aad64845c" width="700px" />
</div>

Obs:
Implementada a API de CEP, ao digitar o CEP, os campos são preenchidos automaticamente.
<div align="left">
<img src="https://github.com/EduCrr/agenda-pessoal/assets/87316285/012d31e7-1827-4fd6-93b4-6e6448bcde25" width="700px" />
</div>

É possível retornar à página anterior usando a tecla Shift + Tab do teclado.


