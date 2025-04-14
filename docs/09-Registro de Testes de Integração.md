# Testes de Integração no Backend

## O que são Testes de Integração?

Testes de integração são testes automatizados que verificam se diferentes módulos ou componentes de um sistema funcionam corretamente quando integrados. Ao contrário dos testes unitários, que testam pequenas unidades isoladas de código, os testes de integração focam na interação entre várias partes do sistema, como classes, bancos de dados, APIs externas, entre outros.

## Por que são Importantes?

Testes de integração ajudam a:

- Garantir que os diferentes componentes do sistema funcionem bem juntos.
- Detectar problemas que possam surgir da interação entre módulos, como erros de comunicação ou incompatibilidades.
- Validar cenários de uso realistas, onde múltiplas partes do sistema precisam interagir.

## Configuração do Ambiente

Para começar a escrever testes de integração em um projeto backend utilizando C#, siga os passos abaixo:

1. **Instale o .NET SDK**: Certifique-se de ter o [.NET SDK](https://dotnet.microsoft.com/download) instalado.

2. **Crie um projeto de testes**: No terminal, navegue até o diretório do seu projeto e execute o seguinte comando para criar um projeto de testes usando xUnit:

    ```bash
    dotnet new xunit -o tests
    ```

3. **Adicione uma referência ao seu projeto principal**: No diretório do projeto de testes, adicione uma referência ao seu projeto principal:

    ```bash
    dotnet add reference ../src/MyProject.csproj
    ```

4. **Configure um banco de dados para testes**: Se seu projeto interage com um banco de dados, considere usar um banco de dados em memória (como o SQLite in-memory) ou configurar um ambiente de banco de dados separado para os testes.

5. **Organize sua estrutura de diretórios**: Uma estrutura comum de projeto é a seguinte:

    ```
    MyProject/
    ├── src/
    │   └── MyProject.cs
    └── tests/
        └── MyProject.IntegrationTests.cs
    ```

## Exemplo de Teste de Integração

Vamos supor que temos um método na classe `UserService` que adiciona um usuário a um banco de dados. Queremos testar se esse método funciona corretamente ao interagir com o banco de dados.

### Código de Exemplo

Aqui está a implementação da classe `UserService`:

```csharp
// src/MyProject.cs

using System.Data.SqlClient;

namespace MyProject
{
    public class UserService
    {
        private readonly string _connectionString;

        public UserService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(string name, string email)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("INSERT INTO Users (Name, Email) VALUES (@Name, @Email)", connection);
                command.Parameters.AddWithValue("@Name", name);
                command.Parameters.AddWithValue("@Email", email);
                command.ExecuteNonQuery();
            }
        }

        public int GetUserCount()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var command = new SqlCommand("SELECT COUNT(*) FROM Users", connection);
                return (int)command.ExecuteScalar();
            }
        }
    }
}
```

Testes de Integração no NestJS

📌 Objetivo

O objetivo principal dos testes de integração é garantir que o ReservationsService funcione corretamente em conjunto com o banco de dados MongoDB, verificando se os endpoints da aplicação se comunicam adequadamente com o serviço e que todas as operações CRUD retornam os resultados esperados.

✅ Casos de Teste

1. Criar uma reserva com sucesso

Objetivo: Testar a criação de uma reserva e garantir que os dados sejam persistidos corretamente no banco de dados.

Rota: POST /reservations

Teste: should create a reservation successfully.

2. Tentar criar uma reserva com dados inválidos

Objetivo: Validar que o sistema retorne erro quando os dados fornecidos forem inválidos ou incompletos.

Rota: POST /reservations

Teste: should return a validation error for invalid data.

3. Recuperar todas as reservas

Objetivo: Verificar se o método GET /reservations retorna todas as reservas corretamente.

Rota: GET /reservations

Teste: should return all reservations.

4. Recuperar uma reserva específica pelo ID

Objetivo: Testar se a busca por ID retorna a reserva correta.

Rota: GET /reservations/:id

Teste: should return one reservation by ID.

5. Atualizar uma reserva

Objetivo: Garantir que a atualização de uma reserva funcione adequadamente e persista os dados modificados.

Rota: PATCH /reservations/:id

Teste: should update a reservation successfully.

6. Deletar uma reserva

Objetivo: Verificar que uma reserva possa ser removida corretamente e que a resposta da API seja adequada.

Rota: DELETE /reservations/:id

Teste: should delete a reservation successfully.

🛠️ Configuração do Teste

Criar um módulo de testes com Test.createTestingModule.

Utilizar um banco de dados real ou em memória para simular operações reais.

Instanciar o módulo principal da aplicação para garantir a integração adequada entre os componentes.

Utilizar requests HTTP (como supertest) para interagir com as rotas da aplicação.

Executar o comando npm run test:e2e para rodar todos os testes de integração.

```
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ReservationsModule } from './reservations.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { getConnectionToken } from '@nestjs/mongoose'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { config } from 'dotenv'

config()

describe('ReservationsController (e2e)', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ReservationsModule,
        MongooseModule.forRoot(process.env.MONGO_URL_TESTE),
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    connection = moduleFixture.get<Connection>(getConnectionToken())
    await app.init()
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.collection('reservations').deleteMany({})
  })

  const createReservationDto: CreateReservationDto = {
    userId: 'user123',
    courtId: 'court123',
    date: '2025-04-02',
    time: '14:00',
    reservationPrice: 100,
  }

  it('/reservations (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)
      .expect(201)

    expect(response.body).toHaveProperty('_id')
    expect(response.body.userId).toBe(createReservationDto.userId)
  })

  it('/reservations (GET)', async () => {
    await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    const response = await request(app.getHttpServer())
      .get('/reservations')
      .expect(200)

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(1)
  })

  it('/reservations/:id (GET)', async () => {
    const { body: createdReservation } = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    const response = await request(app.getHttpServer())
      .get(`/reservations/${createdReservation._id}`)
      .expect(200)

    expect(response.body.userId).toBe(createReservationDto.userId)
  })

  it('/reservations/:id (PATCH)', async () => {
    const { body: createdReservation } = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    const updateReservationDto: UpdateReservationDto = { reservationPrice: 150 }

    const response = await request(app.getHttpServer())
      .patch(`/reservations/${createdReservation._id}`)
      .send(updateReservationDto)
      .expect(200)

    expect(response.body.reservationPrice).toBe(
      updateReservationDto.reservationPrice,
    )
  })

  it('/reservations/:id (DELETE)', async () => {
    const { body: createdReservation } = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    await request(app.getHttpServer())
      .delete(`/reservations/${createdReservation._id}`)
      .expect(200)

    const response = await request(app.getHttpServer())
      .get(`/reservations/${createdReservation._id}`)
      .expect(404)

    expect(response.body.message).toBe(
      `Reserva com ID ${createdReservation._id} não encontrada.`,
    )
  })
})
```
