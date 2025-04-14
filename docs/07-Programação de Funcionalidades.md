# Programação de Funcionalidades

### **RF-012: Deve Permitir ao usuário agendar o espaço**

Descrição:
Permite que o usuário agende um espaço (como uma quadra de esportes) em um horário específico.

Artefatos Criados:

    Código Fonte: Implementado no serviço ReservationsService com método create

    Estrutura de Dados:

    interface Reservation {
      _id: string;
      userId: string;
      courtId: string;
      date: string;
      reservationPrice: number;
      time: string;
      status: string;
    }

Instruções para Verificação:

    Acessar a API: Testar a criação de uma reserva via Postman ou ferramenta similar --> POST--> /reservations.

    Testes Implementados:

        Teste de Criação: Verifica se o agendamento é feito corretamente.

        Teste de Erro: Verifica se erros são tratados corretamente (ex. espaço ocupado).


### **RF-007: Deve permitir, na interface de gerência, visualizar os agendamentos realizados.**

Descrição:
Permite listar todas as reservas existentes ou buscar reservas por usuário, data ou status.

Artefatos Criados:

    Código Fonte: Método findAll e findById no ReservationsService

Instruções para Verificação:

    Acessar a API:
        - GET /reservations → Lista todas as reservas
        - GET /reservations/:id → Retorna detalhes de uma reserva específica

Testes Implementados:

    Teste de Listagem: Verifica se todas as reservas são retornadas corretamente.
    Teste de Busca por ID: Verifica se os dados de uma reserva específica são retornados.


### **RF-008: Deve permitir ao gerente confirmar o pagamento após aluguel**

Descrição:
Permite alterar informações de uma reserva, como horário, status ou data.

Artefatos Criados:

    Código Fonte: Método update no ReservationsService

Instruções para Verificação:

    Acessar a API: PATCH /reservations/:id → Atualiza dados de uma reserva existente

Testes Implementados:

    Teste de Atualização: Verifica se as alterações são salvas corretamente.
    Teste de Validação: Verifica se campos inválidos não são atualizados.

