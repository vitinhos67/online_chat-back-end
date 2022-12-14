# Sobre

<h3>Um bate-papo para todas pessoas passarem seu tempo e interagirem com diversas outras pessoas conectadas simultaneamente.</h3>

<br />

## Sobre o projeto

O projeto foi construido utilizando as tecnologias:

<ul>

<li> <code>Node</code> </li>

<p>O node como ambiente de execução no server-side
</p>
<li> <code>Express</code> </li>

<p> Utilizado para gerenciar rotas, como comunicação unidirecional (HTTP) e também interagindo com o database retornando é inserindo informações e servindo como base para o servidor.</p>

<li><code>Postgres</code></li>

<p>Utilizado para recuperar a mensagem entre 2 entidades e guardar dados do usuario (  suas chaves primarias, email e id e suas informações como username, description e senha)</p>

<li><code>Redis</code></li>

<p>O papel do redis e armazenar o valores dos usuarios ativos e comunicar com o cliente quais são eles.</p>

<li><code>Docker</code></li>

<p>Roda as imagem do redis e também do postgres e a dockerizam em um container.</p>

Por fim,

<li><code>Socket.io</code></li>

<p>O mais importante para que a comunicação entre os dois usuarios se comuniquem em tempo real, utilizando uma comunicação bidirecional. </p>

</ul>


<p> Desenvolvida para metodo de estudo do protocolo de comunicação WebSockets. Assim, foi possivel ter uma previa de conhecimento da comunicação bidirecional e a biblioteca  <code>Socket.io</code>
</p>


O lado do cliente foi construido através do Vue.js, você pode ver <a href="https://github.com/vitinhos67/online_chat-front-end">aqui</a>

## Rodar o projeto

Para rodar o projeto é necessario que voce tenha instalado o npm em seu conputador. E também o postgres e o redis na sua maquina ou em um container


#### Variaveis de ambiente

configure o arquivo <strong>.env.example</strong> com os respectivos valores e depois renomei ele <strong>.env</strong>

### Sem o docker 

Instale as dependencias:

```
npm install --save
```
</br>



Ademais, basta utilizar o comando

```
npm run dev
```
E pronto, o codigo estará funcionando!


### Com Docker

Com o .env configurado voce pode rodar o docker compose e subi os dois servidores necessarios do postgres e redis.

Rodar o docker compose

```
docker compose up -d
```

Logo,
```
npm run dev
```

Assim, o servidor estará funcionando.


## Endpoints

| METHOD 	| ENDPOINT          	| body                                                        	|
|:------:	|-------------------	|-------------------------------------------------------------	|
|  POST  	| /user             	| (email,password,username)*                                  	|
|  POST  	| /login            	| (email,password)*                                           	|
|  POST  	| /add/message      	| (from_id, for_id,  message,  for_username,  from_username)* 	|
| POST   	| /add/description  	| (id, description)*                                          	|
|   GET  	| /usersOnChat      	|                                                             	|
| POST   	| /messages/restore 	| (from_id, for_id)*                                          	|
| GET    	| '/user/:id        	|                                                             	|












