using WebApi_courtbook.Controllers;
using WebApi_courtbook.Services;
using WebApi_courtbook.Models;
using Moq;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver.Core.Configuration;
using Microsoft.AspNetCore.Mvc;


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