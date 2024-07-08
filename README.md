
<div align="center">
    
  <p>
    <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white">
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
  </p>
</div><br>

<section id="test-db" style="padding: 10px;">
<h2>Running and testing our project.</h2>
<p>Com tudo já configurado chegou de rodar nosso ambiente.</p>
<p>No seu terminal navegue até o diretório <code>/verzel_front/</code> e passe o comando para o docker-compose começar a construir os containers:</p>
<pre>
docker-compose build
</pre>
<p>Assim que a execução do comando for finalizada entre com o comando para começar a rodar os containers:</p>
<pre>
docker-compose up -d
</pre>
<p>Feito isso basta entrar no seu <a href="https://localhost">localhost</a> e pronto! </p>
<p>Quando voce rodar os comandos do docker ele ira rodar uma vesão build, entao caso queira alterar algo, 
  deverar ir a pasta do projeto em aluga-carros e rodar manualmente os comando npm run start para rodar o modo developer</p>
<p>Caso não receba nenhuma mensagem de erro sua conexão com o banco de dados está ok e você está pronto para começar!</p>
</section>



