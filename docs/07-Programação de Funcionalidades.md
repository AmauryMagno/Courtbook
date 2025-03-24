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

    Acessar a API: Testar a criação de uma reserva via Postman ou ferramenta similar --> POST--> /reservatios.

    Testes Implementados:

        Teste de Criação: Verifica se o agendamento é feito corretamente.

        Teste de Erro: Verifica se erros são tratados corretamente (ex. espaço ocupado).
