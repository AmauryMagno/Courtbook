# Plano de Testes de Software

---

| **Caso de Teste** | **CT-01 – Login no aplicativo** |
|:---:|:---:|
| Requisitos Associados | RF-001 - O sistema deve permitir aos usuários fazerem login inserindo email e senha. |
| Objetivo do Teste | Verificar se a aplicação permite aos usuários fazer login com sucesso. |
| Passos | 1) Acessar a página de login<br>2) Inserir email<br>3) Inserir senha<br>4) Clicar em "Entrar" |
| Critério de Êxito | ⦁ O sistema deve verificar email e senha corretos e permitir o acesso.<br>⦁ Em caso de erro, uma mensagem de falha no login deve ser exibida. |

---

| **Caso de Teste** | **CT-02 – Cadastro de novos usuários** |
|:---:|:---:|
| Requisitos Associados | RF-002 - O sistema deve permitir que novos usuários se cadastrem no aplicativo. |
| Objetivo do Teste | Verificar se o sistema permite o cadastro de novos usuários corretamente. |
| Passos | 1) Acessar a página de cadastro<br>2) Preencher os campos (nome, email, senha, etc.)<br>3) Clicar em "Cadastrar"<br>4) Confirmar o email (se aplicável) |
| Critério de Êxito | ⦁ O sistema deve registrar o usuário e exibir uma mensagem de sucesso.<br>⦁ Caso de erro, o sistema deve notificar e orientar a correção. |

---

| **Caso de Teste** | **CT-03 – Reinicialização semanal do sistema de agendamento** |
|:---:|:---:|
| Requisitos Associados | RF-003 - O sistema de agendamento deve reiniciar semanalmente. |
| Objetivo do Teste | Verificar se o sistema limpa o histórico de agendamentos após o período de uma semana. |
| Passos | 1) Agendar um espaço para a semana<br>2) Esperar até o final da semana<br>3) Verificar se o sistema reinicia os agendamentos na semana seguinte |
| Critério de Êxito | ⦁ O sistema deve limpar automaticamente os agendamentos ao final de cada semana e permitir novos agendamentos para a semana seguinte. |

---

| **Caso de Teste** | **CT-04 – Visualizar dias e horários disponíveis** |
|:---:|:---:|
| Requisitos Associados | RF-004 - O sistema deve permitir que o cliente visualize os dias e horários disponíveis nas quadras. |
| Objetivo do Teste | Verificar se o cliente consegue visualizar os horários e dias disponíveis para reserva de quadras. |
| Passos | 1) Acessar o sistema<br>2) Navegar até a página de agendamento<br>3) Visualizar a disponibilidade das quadras |
| Critério de Êxito | ⦁ O sistema deve exibir corretamente os dias e horários vagos. |

---

| **Caso de Teste** | **CT-05 – Cancelamento de agendamento** |
|:---:|:---:|
| Requisitos Associados | RF-005 - O sistema deve permitir ao cliente cancelar um agendamento. |
| Objetivo do Teste | Verificar se o sistema permite que o cliente cancele um agendamento com sucesso. |
| Passos | 1) Acessar o sistema<br>2) Navegar até a área de agendamentos<br>3) Selecionar um agendamento existente<br>4) Clicar em "Cancelar agendamento" |
| Critério de Êxito | ⦁ O sistema deve cancelar o agendamento e exibir uma mensagem de confirmação. |

---

| **Caso de Teste** | **CT-06 – Alternar entre interfaces de cliente e gerência** |
|:---:|:---:|
| Requisitos Associados | RF-006 - O sistema deve ter duas interfaces: uma para os clientes e outra para a gerência. |
| Objetivo do Teste | Verificar se o sistema apresenta corretamente as interfaces de cliente e gerência, de acordo com o login. |
| Passos | 1) Acessar o sistema<br>2) Logar como cliente e visualizar a interface de cliente<br>3) Logar como gerente e visualizar a interface de gerência |
| Critério de Êxito | ⦁ O sistema deve exibir a interface correta com base no perfil de login. |

---

| **Caso de Teste** | **CT-07 – Visualizar tipos de quadra por categoria** |
|:---:|:---:|
| Requisitos Associados | RF-007 - O sistema deve permitir que o cliente visualize os tipos de quadra pela categoria. |
| Objetivo do Teste | Verificar se o sistema exibe corretamente as quadras filtradas por categoria. |
| Passos | 1) Acessar o sistema<br>2) Navegar até a área de quadras<br>3) Filtrar quadras por categoria (ex.: futsal, vôlei, etc.) |
| Critério de Êxito | ⦁ O sistema deve listar as quadras conforme a categoria selecionada. |

---

| **Caso de Teste** | **CT-08 – Notificação de agendamento** |
|:---:|:---:|
| Requisitos Associados | RF-008 - O sistema deve informar ou avisar ao cliente sobre o agendamento. |
| Objetivo do Teste | Verificar se o sistema notifica o cliente sobre o agendamento realizado. |
| Passos | 1) Agendar um espaço<br>2) Verificar se o sistema envia uma notificação por email ou notificação interna |
| Critério de Êxito | ⦁ O sistema deve enviar uma notificação de confirmação do agendamento. |

---

| **Caso de Teste** | **CT-09 – Navegação entre páginas da aplicação** |
|:---:|:---:|
| Requisitos Associados | RF-009 - O sistema deve permitir ao cliente navegar entre as páginas da aplicação. |
| Objetivo do Teste | Verificar a navegabilidade entre as diferentes seções da aplicação. |
| Passos | 1) Acessar o sistema<br>2) Navegar entre as páginas (home, agendamentos, perfil, etc.) |
| Critério de Êxito | ⦁ O sistema deve permitir a navegação entre todas as páginas sem erros. |

---

| **Caso de Teste** | **CT-10 – Controle do sistema de agendamento pela gerência** |
|:---:|:---:|
| Requisitos Associados | RF-010 - A interface de gerência deve permitir visualizar e controlar o sistema de agendamento. |
| Objetivo do Teste | Verificar se a interface de gerência permite controlar e visualizar agendamentos. |
| Passos | 1) Logar como gerente<br>2) Acessar a área de controle de agendamentos<br>3) Visualizar e gerenciar agendamentos |
| Critério de Êxito | ⦁ O sistema deve permitir ao gerente visualizar e modificar os agendamentos. |

---

| **Caso de Teste** | **CT-11 – Qualificação do espaço utilizado** |
|:---:|:---:|
| Requisitos Associados | RF-011 - O sistema deve permitir ao usuário qualificar o espaço utilizado. |
| Objetivo do Teste | Verificar se o cliente pode dar uma nota ao espaço utilizado após a reserva. |
| Passos | 1) Acessar o sistema<br>2) Navegar até a área de qualificações<br>3) Avaliar o espaço utilizado |
| Critério de Êxito | ⦁ O sistema deve permitir que o cliente insira uma nota e comentários sobre o espaço. |

---

| **Caso de Teste** | **CT-12 – Visualizar o espaço a ser locado** |
|:---:|:---:|
| Requisitos Associados | RF-012 - O sistema deve permitir ao cliente visualizar o espaço a ser locado. |
| Objetivo do Teste | Verificar se o sistema permite visualizar as informações detalhadas do espaço antes de fazer o agendamento. |
| Passos | 1) Acessar a área de quadras<br>2) Visualizar informações de uma quadra específica (tamanho, tipo, etc.) |
| Critério de Êxito | ⦁ O sistema deve exibir detalhes completos do espaço a ser locado. |

---

| **Caso de Teste** | **CT-13 – Agendamento do espaço** |
|:---:|:---:|
| Requisitos Associados | RF-013 - O sistema deve permitir ao cliente agendar o espaço. |
| Objetivo do Teste | Verificar se o cliente pode agendar um espaço com sucesso. |
| Passos | 1) Acessar o sistema<br>2) Navegar até a área de agendamento<br>3) Selecionar uma quadra e horário disponíveis<br>4) Confirmar o agendamento |
| Critério de Êxito | ⦁ O sistema deve permitir o agendamento e exibir uma confirmação. |

---