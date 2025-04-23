# Testes Unitários no Backend

## Por que são Importantes?

Testes unitários ajudam a:

- Identificar problemas de maneira precoce no ciclo de desenvolvimento.
- Garantir que o código continue funcionando após alterações (regressões).
- Facilitar o processo de refatoração.
- Melhorar a confiabilidade e a qualidade do software.

## Configuração do Ambiente

Para começar a escrever testes unitários em um projeto backend utilizando C#, siga os passos abaixo:

1. **Instale o .NET SDK**: Certifique-se de ter o [.NET SDK](https://dotnet.microsoft.com/download) instalado.

2. **Crie um projeto de testes**: No terminal, navegue até o diretório do seu projeto e execute o seguinte comando para criar um projeto de testes usando xUnit (um framework popular de testes unitários para .NET):

    ```bash
    dotnet new xunit -o tests
    ```

3. **Adicione uma referência ao seu projeto principal**: No diretório do projeto de testes, adicione uma referência ao seu projeto principal:

    ```bash
    dotnet add reference ../src/MyProject.csproj
    ```

4. **Organize sua estrutura de diretórios**: Uma estrutura comum de projeto é a seguinte:

    ```
    MyProject/
    ├── src/
    │   └── MyProject.cs
    └── tests/
        └── MyProject.Tests.cs
    ```

## Exemplo de Teste Unitário

Aqui está um exemplo simples de um teste unitário em C# usando xUnit. Vamos supor que temos um método na classe `Calculator` que soma dois números.

```csharp
// src/MyProject.cs

namespace MyProject
{
    public class Calculator
    {
        public int Add(int a, int b)
        {
            return a + b;
        }
    }
}
```


## Teste Unitário no NestJS

Este documento descreve vários testes unitários para o `ReservationService` no NestJS.

## 📌 Objetivo

1.Verificar se o serviço ReservationsService está sendo instanciado corretamente:

    Objetivo: Garantir que a instância do serviço ReservationsService seja criada sem erros.

    Teste: should be defined.

2.Testar a criação de uma reserva:

    Objetivo: Verificar se o método create cria uma reserva corretamente no banco de dados, com base nos dados recebidos e chama o método create do modelo.

    Teste: should create a reservation.

3.Testar falha na criação de uma reserva:

    Objetivo: Garantir que um erro de banco de dados seja tratado corretamente quando a criação da reserva falhar.

    Teste: should throw an error when reservation creation fails.

4.Verificar a recuperação de todas as reservas:

    Objetivo: Confirmar se o método findAll retorna todas as reservas corretamente.

    Teste: should return all reservations.

5.Verificar o comportamento ao não haver reservas:

    Objetivo: Garantir que o método findAll retorne um array vazio quando não houver reservas.

    Teste: should return an empty array if no reservations exist.

6.Recuperar uma reserva específica pelo ID:

    Objetivo: Verificar se o método findOne retorna a reserva correta ao buscar por ID.

    Teste: should return one reservation.

7.Testar erro ao não encontrar a reserva:

    Objetivo: Garantir que o serviço lance um NotFoundException quando a reserva não for encontrada pelo ID.

    Teste: should throw NotFoundException when reservation not found.

8.Testar erro inesperado ao buscar uma reserva:

    Objetivo: Confirmar que o serviço lida corretamente com erros inesperados ao buscar uma reserva.

    Teste: should throw an error if an unexpected error occurs.

9.Atualizar uma reserva com sucesso:

    Objetivo: Verificar se o método update atualiza corretamente os dados de uma reserva.

    Teste: should be return a updated Reservation.

10.Testar erro ao tentar atualizar uma reserva não encontrada:

    Objetivo: Garantir que um erro NotFoundException seja lançado quando tentar atualizar uma reserva inexistente.

    Teste: should throw NotFoundException when reservation not found.

11.Testar erro inesperado ao tentar atualizar uma reserva:

    Objetivo: Verificar que o serviço lida com erros inesperados ao tentar atualizar uma reserva.

    Teste: should throw an error if an unexpected error occurs.

12.Deletar uma reserva com sucesso:

    Objetivo: Garantir que o método remove exclua corretamente uma reserva e retorne uma mensagem de sucesso.

    Teste: should return a success message when reservation is deleted.

13.Testar erro ao tentar deletar uma reserva não encontrada:

    Objetivo: Confirmar que o serviço lança um erro NotFoundException ao tentar deletar uma reserva que não existe.

    Teste: should throw NotFoundException when reservation not found.

14.Testar erro inesperado ao tentar deletar uma reserva:

    Objetivo: Garantir que o serviço lida com erros inesperados ao tentar deletar uma reserva.

    Teste: should throw an error if an unexpected error occurs.

## 🛠️ Configuração do Teste

1. **Criar um módulo de testes** com `Test.createTestingModule`
2. **Mockar** todos os metodos do service com `jest.fn()`
3. Instanciar cada teste com suas respectivas dependencias
4. Executar o comando npm run test ou npm run test:cov para rodar todos os métodos e verificar a saída esperada

## 📝 Código do Teste

```ts
import { Test, TestingModule } from '@nestjs/testing'
import { ReservationsService } from './reservations.service'
import { Reservation } from './schemas/reservation.schema' 
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { NotFoundException } from '@nestjs/common'
import { UpdateReservationDto } from './dto/update-reservation.dto'

const mockReservationModel = {
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn(),
}

describe('ReservationsService', () => {
  let reservationService: ReservationsService
  let reservationModel: Model<Reservation>

  const mockObjectReservation = {
    _id: '123',
    userId: '1',
    courtId: '10',
    date: '10/03/2025',
    reservationPrice: 100,
    time: '16:00',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel,
        },
      ],
    }).compile()

    reservationService = module.get<ReservationsService>(ReservationsService)
    reservationModel = module.get<Model<Reservation>>(
      getModelToken(Reservation.name),
    )
  })

  afterEach(() => jest.clearAllMocks())

  it('should be defined', () => {
    expect(reservationService).toBeDefined()
  })

  it('should create a reservation', async () => {
    // Arrange
    const reservationDto: CreateReservationDto = {
      userId: '1',
      courtId: '10',
      date: '10/03/2025',
      reservationPrice: 100,
      time: '16:00',
    }

    const mockCreatedReservation = {
      _id: '123',
      ...reservationDto,
    }

    mockReservationModel.create.mockResolvedValue(mockCreatedReservation)

    // Act
    const result = await reservationService.create(reservationDto)

    // Assert
    expect(mockReservationModel.create).toHaveBeenCalledWith(reservationDto)
    expect(result).toEqual(mockCreatedReservation)
  })

  it('should throw an error when reservation creation fails', async () => {
    // Arrange
    const reservationDto: CreateReservationDto = {
      userId: '1',
      courtId: '10',
      date: '10/03/2025',
      reservationPrice: 100,
      time: '16:00',
    }
  
    mockReservationModel.create.mockRejectedValue(new Error('Database Error'))
  
    // Act & Assert
    await expect(reservationService.create(reservationDto)).rejects.toThrow('Database Error')
    expect(mockReservationModel.create).toHaveBeenCalledWith(reservationDto)
  })

  it('should return all reservations', async () => {
    // Arrange
    const mockReservations: Reservation[] = [
      {
        userId: '1',
        courtId: '10',
        date: '10/03/2025',
        reservationPrice: 100,
        time: '16:00',
        status: 'agendado'
      },
      {
        userId: '2',
        courtId: '15',
        date: '12/03/2025',
        reservationPrice: 150,
        time: '18:00',
        status: 'cancelado'
      },
    ]

    mockReservationModel.find.mockResolvedValue(mockReservations)

    // Act
    const result = await reservationService.findAll()

    // Assert
    expect(mockReservationModel.find).toHaveBeenCalled()
    expect(result).toEqual(mockReservations)
  })

  it('should return an empty array if no reservations exist', async () => {
    // Arrange
    mockReservationModel.find.mockResolvedValue([])

    // Act
    const result = await reservationService.findAll()

    // Assert
    expect(mockReservationModel.find).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('should return one reservation', async () => {
    // Arrange
    const reservationId = '123'

    mockReservationModel.findById.mockResolvedValue(mockObjectReservation)

    // Act
    const result = await reservationService.findOne(reservationId)

    // Assert
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId)
    expect(result).toEqual(mockObjectReservation)
  })

  it('should throw NotFoundException when reservation not found', async () => {
    // Arrange
    const reservationId = 'non-existent-id'

    mockReservationModel.findById.mockResolvedValue(null)

    // Act and Assert --> Rejects Deve ser utilizado junto ao expect
    await expect(reservationService.findOne(reservationId)).rejects.toThrow(
      new NotFoundException(`Reserva com ID ${reservationId} não encontrada.`),
    )
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId)
  })

  it('should throw an error if an unexpected error occurs', async () => {
    //Arrange
    const reservationId = '123'

    mockReservationModel.findById.mockRejectedValue(new Error('database error'))

    //Act and Assert
    await expect(reservationService.findOne(reservationId)).rejects.toThrow(
      new Error('database error'),
    )
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId)
  })

  it('should be return a updated Reservation', async () => {
    //Arrange
    const reservationId = '123'
    const updateReservationDto: UpdateReservationDto = {
      reservationPrice: 150,
    }
    const mockUpdatedReservation = {
      _id: reservationId,
      userId: '1',
      courtId: '10',
      date: '10/03/2025',
      reservationPrice: 150,
      time: '16:00',
    }

    mockReservationModel.findByIdAndUpdate.mockResolvedValue(
      mockUpdatedReservation,
    )

    //Act
    const result = await reservationService.update(
      reservationId,
      updateReservationDto,
    )

    //Assert
    expect(result).toEqual(mockUpdatedReservation)
    expect(mockReservationModel.findByIdAndUpdate).toHaveBeenCalledWith(
      reservationId,
      updateReservationDto,
      { new: true },
    )
  })

  it('should throw NotFoundException when reservation not found', async () => {
    //Arrange
    const reservationId = 'non-existent-id'
    const updateReservationDto: UpdateReservationDto = {
      reservationPrice: 150,
    }

    mockReservationModel.findByIdAndUpdate.mockResolvedValue(null)

    //Act and Assert
    await expect(
      reservationService.update(reservationId, updateReservationDto),
    ).rejects.toThrow(
      new NotFoundException(`Reserva com ID ${reservationId} não encontrada.`),
    )
    expect(mockReservationModel.findByIdAndUpdate).toHaveBeenCalledWith(
      reservationId,
      updateReservationDto,
      { new: true },
    )
  })

  it('should throw an error if an unexpected error occurs', async () => {
    //Arrange
    const reservationId = '123'
    const updateReservationDto: UpdateReservationDto = {
      reservationPrice: 150,
    }

    mockReservationModel.findByIdAndUpdate.mockRejectedValue(
      new Error('database error'),
    )

    //Act and Assert
    await expect(
      reservationService.update(reservationId, updateReservationDto),
    ).rejects.toThrow(new Error('database error'))
    expect(mockReservationModel.findByIdAndUpdate).toHaveBeenCalledWith(
      reservationId,
      updateReservationDto,
      { new: true },
    )
  })

  it('should return a success message when reservation is deleted', async () => {
    // Arrange
    const reservationId = '123'
    const mockDeletedReservation = { _id: reservationId }

    mockReservationModel.findByIdAndDelete.mockResolvedValue(
      mockDeletedReservation,
    )

    // Act
    const result = await reservationService.remove(reservationId)

    // Assert
    expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith(
      reservationId,
    )
    expect(result).toEqual({ message: 'Reserva deletada com sucesso' })
  })

  it('should throw NotFoundException when reservation not found', async () => {
    //Arrange
    const reservationId = 'non-existent-id'

    mockReservationModel.findByIdAndDelete.mockResolvedValue(null)

    //Act and Assert
    await expect(reservationService.remove(reservationId)).rejects.toThrow(
      new NotFoundException(`Reserva com ID ${reservationId} não encontrada.`),
    )
    expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith(
      reservationId,
    )
  })

  it('should throw an error if an unexpected error occurs', async () => {
    //Arrange
    const reservationId = '123'

    mockReservationModel.findByIdAndDelete.mockRejectedValue(
      new Error('database error'),
    )

    //Act and Assert
    await expect(reservationService.remove(reservationId)).rejects.toThrow(
      new Error('database error'),
    )
    expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith(
      reservationId,
    )
  })
})
```

## Teste Unitário no .Net

Este documento descreve vários testes unitários para o `UsuarioController` no .Net.

## 📌 Objetivo

1.Testa a consulta a todos os usuários:

    Objetivo: Verificar se o metodo Get() para todos os usuários esta funcionando corretamente, retornando os usuários.

    Teste:  DeveRetornarTodosOsUsuarios.

2.Testar a consulta de um usuário:

    Objetivo: Verificar se o método Get(id) retorna um usuário específico.

    Teste: DeveRetornarUmUsuarioPesquisadoComSucesso.

3.Testar a criaçaõ de um usuário:

    Objetivo: Garantir que a criaçção de um usuário e retorno do OK Http esta funcionando corretamente.

    Teste: DeveCriarUmNovoUsuarioComSucesso.

4.Testar a atualização de um usuário:

    Objetivo: Garantir que a atualização de um usuário esta funcionando corretamente.

    Teste: DeveAtualizarUmUsuarioComSucesso.

5.Testar a deleção de um usuário:

    Objetivo: Garantir que a deleção de um usuário esta funcionando corretamente.

    Teste: DeveDeletarUmUsuarioComSucesso.


## 🛠️ Configuração do Teste

1. Executar o projeto Courtbook_xUnitTests

## 📝 Código do Teste

```C#
namespace Courtbook_xUnitTests
{
    public class UsuariosControllerTests
    {
        private readonly Mock<IMongoService<Usuario>> _mockMongoService;
        private readonly UsuariosController _controller;

        public UsuariosControllerTests()
        {
            _mockMongoService = new Mock<IMongoService<Usuario>>();
            _controller = new UsuariosController(_mockMongoService.Object);
        }

        [Fact(DisplayName = "Deve Retornar Todos Os Usuários")]
        public async Task DeveRetornarTodosOsUsuarios()
        {
            // arrange
            var usuarios = new List<Usuario>
            {
                new Usuario { Id = "123456789012345678901234", NomeUsuario = "Teste 1" },
                new Usuario { Id = "123456789012345678901235", NomeUsuario = "Teste 2" }
            };

            _mockMongoService.Setup(s => s.GetAsync()).ReturnsAsync(usuarios);

            // act

            var result = await _controller.Get();

            // assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Equal("123456789012345678901234", result[0].Id);
            Assert.Equal("Teste 1", result[0].NomeUsuario);
            Assert.Equal("123456789012345678901235", result[1].Id);
            Assert.Equal("Teste 2", result[1].NomeUsuario);

        }


        [Fact(DisplayName = "Deve Retornar Um Usuario Pesquisado Com Sucesso")]
        public async Task DeveRetornarUmUsuarioPesquisadoComSucesso()
        {

            // arrange
            var usuarioEsperado = new Usuario { Id = "123456789012345678901234", NomeUsuario = "Teste 1" };
            _mockMongoService.Setup(s => s.GetAsync("123456789012345678901234")).ReturnsAsync(usuarioEsperado);

            // act
            var result = await _controller.Get("123456789012345678901234");

            // assert
            var actionResult = Assert.IsType<ActionResult<Usuario>>(result); // GARANTE QUE É UM ActionResult<Usuario>
            var usuario = Assert.IsType<OkObjectResult>(actionResult.Result); // GARENTE QEU RETORNA UM OkObjectResult
            var usuarioRetornado = Assert.IsType<Usuario>(usuario.Value); // OBTÉM O USUÁRIO RETORNADO
            Assert.NotNull(usuarioRetornado);
            Assert.Equal("Teste 1", usuarioRetornado.NomeUsuario);
        }

        [Fact(DisplayName = "Deve Criar Um Novo Usuario Com Sucesso")]
        public async Task DeveCriarUmNovoUsuarioComSucesso()
        {
            // arrange
            var novoUsuario = new Usuario { Id = "123456789012345678901236", NomeUsuario = "Novo Teste" };
            _mockMongoService.Setup(s => s.CreateAsync(novoUsuario)).Returns(Task.CompletedTask);

            // act
            var result = await _controller.Create(novoUsuario);

            // assert
            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            var usuarioRetornado = Assert.IsType<Usuario>(actionResult.Value);
            Assert.Equal(novoUsuario.Id, usuarioRetornado.Id);
            Assert.Equal(novoUsuario.NomeUsuario, usuarioRetornado.NomeUsuario);
        }

        [Fact(DisplayName = "Deve Atualizar Um Usuario Com Sucesso")]
        public async Task DeveAtualizarUmUsuarioComSucesso()
        {
            // arrange
            var id = "123456789012345678901234";
            var usuarioExistente = new Usuario { Id = id, NomeUsuario = "Antigo Nome" };
            var usuarioAtualizado = new Usuario { Id = id, NomeUsuario = "Novo Nome" };

            _mockMongoService.Setup(s => s.GetAsync(id)).ReturnsAsync(usuarioExistente);
            _mockMongoService.Setup(s => s.UpdateAsync(id, usuarioAtualizado)).Returns(Task.CompletedTask);

            // act
            var result = await _controller.Update(id, usuarioAtualizado);

            // assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact(DisplayName = "Deve Deletar Um Usuario Com Sucesso")]
        public async Task DeveDeletarUmUsuarioComSucesso()
        {
            // arrange
            var id = "123456789012345678901234";
            var usuario = new Usuario { Id = id, NomeUsuario = "Deletar" };

            _mockMongoService.Setup(s => s.GetAsync(id)).ReturnsAsync(usuario);
            _mockMongoService.Setup(s => s.RemoveAsync(id)).Returns(Task.CompletedTask);

            // act
            var result = await _controller.Delete(id);

            // assert
            Assert.IsType<NoContentResult>(result);
        }
    }
}
```
