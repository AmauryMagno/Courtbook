# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

|            | Carlos Eduardo                      | Ingrid Andrade                     | Ginásio Agilize                       |
|------------|-----------------------------------|------------------------------------|---------------------------------------|
|            | <div align="center"><img src="./img/carlos.jpg" width="300" title="Carlos Eduardo"></div> | <div align="center"><img src="./img/ingrid.webp" width="300" title="Ingrid Andrade"></div> | <div align="center"><img src="./img/ginasio.webp" width="300" title="Escola Aprender"></div> |
| Idade      | 48                                | 24                                | 10+                                  |
| Ocupação   | Pizzaiolo e empreendedor, sócio da Pizza Prime | Enfermeira                         | Ginásio                 |
| Aplicativos | ● Instagram <br> ● Flipboard <br> ● Linkedin | ● Instagram <br> ● Tiktok <br> ● Linkedin | ● Email <br> ● Google Drive <br> ● Instagram |
| Motivações | ● Busca eficiência em todos os aspectos da vida, incluindo o lazer. <br> ● Quer garantir que o tempo gasto com os amigos seja aproveitado ao máximo, sem complicações. | ● Apaixonada por enfermagem e esportes, especialmente futsal. <br> ● Quer otimizar seu tempo livre sem se preocupar com a desorganização nas reservas de quadras. | ● Proporcionar atividades recreativas para os clientes. <br> ● Precisa de uma solução eficiente para locação de quadras que minimize o tempo de gestão e maximize a utilização dos espaços. |
| Frustrações | ● A dificuldade em reunir amigos suficientes para jogar, muitas vezes levando ao cancelamento da reserva. <br> ● Lidar com atrasos nas reservas, impactando seu tempo livre limitado. | ● Dificuldade em organizar jogos de futsal com amigos devido a atrasos nas quadras. | ● A dificuldade em coordenar múltiplas reservas e garantir a disponibilidade das quadras para todos os interessados. |
| Hobbies | ● Jogos eletrônicos <br> ● Viagens <br> ● Corrida | ● Jogar futsal <br> ● Assistir Tiktok | ● Organizar eventos <br> ● Parcerias comunitárias |
| História | Carlos Eduardo quer um aplicativo para alugar quadras e jogar com seus amigos, mas enfrenta o desafio de cancelar reservas quando não consegue reunir pessoas suficientes. Ele busca um sistema que permita ajustar as reservas facilmente ou encontrar outros jogadores para evitar frustrações e aproveitar melhor seu tempo livre. | Ingrid deseja um sistema que facilite a reserva de quadras, permitindo que ela e seus amigos joguem futsal sem complicações. Um sistema eficiente ajudaria a eliminar frustrações e garantir que ela aproveite ao máximo seu tempo livre. | O Ginásio Agilize precisa de um sistema para locar quadras de forma organizada, garantindo que os eventos e outras atividades esportivas sejam realizados sem complicações. Um sistema eficiente ajudaria a otimizar o uso dos espaços e a facilitar a comunicação com os clientes. |

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

<strong>Crie no mínimo 12 Requisitos funcionais, 6 não funcionais e 3 restrições</strong>
<strong>Cada aluno será responsável pela execução completa (back, web e mobile) de pelo menos 2 requisitos que será acompanhado pelo professor</strong>
### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | Responsável |
|------|-----------------------------------------|----|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | Pedro |
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA | João |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

<img src="./img/caso-uso.png">

# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo
Na imagem abaixo é possível visualizar todas as tarefas com suas respectivas datas de início, término e duração, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

<div align="center"><img src="./img/Gerenciamento%20de%20Tempo.jpg"  title=" Planilha de Gerenciamento de Tempo"></div>

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

<div align="center"><img src="./img/Gerenciamento%20de%20Tempo%20Grafico.png"  title=" Gráfico de Gerenciamento de Tempo"></div>

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

<div align="center"><img src="./img/Gerenciamento%20de%20Equipe.jpg"  title=" Gráfico de Gantt"></div>
