import { Title, Text, Button, Box, Spacer, Input } from "../../components/index";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Alert } from "react-native";
import InputLogin from "../../components/Input";
import { useState } from "react";
import { register } from "../../services/authService";

const Register = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRegister = () => {
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setMensagem('Atenção, insira todos os dados.');
      return;
    }
    if (password === confirmPassword) {
      register({
        name: name,
        email: email,
        password: password
      }).then(res => {
        console.log(res);

        if (res) {
          Alert.alert('Atenção', 'Usuário Cadastrado com sucesso!', [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setMensagem('');
        } else {
          Alert.alert('Atenção', 'Usuário não cadastrado!');
        }
      });
    } else {
      setMensagem('Atenção, as senhas não coincidem. Tente novamente.');
    }
  }

  return (
    <Box justify="center" align="center" background="light" hasPadding>
      <Title color="dark" bold>
        Crie sua conta.
      </Title>
      <Spacer />
      <Text align="center" color="muted">
        Insira seus dados abaixo:
      </Text>

      <Spacer size="50px" />

      <InputLogin label={"Nome"} value={name} setState={setName} error={error} />
      <Spacer size="30px" />
      <InputLogin label={"Email"} value={email} setState={setEmail} error={error} />
      <Spacer size="30px" />
      <InputLogin label={"Senha"} secureTextInput={true} iconEye value={password} setState={setPassword} error={error} />
      <Spacer size="30px" />
      <InputLogin 
        label={"Confirmar Senha"} 
        secureTextInput={true} 
        iconEye 
        value={confirmPassword}
        setState={setConfirmPassword} 
        error={error} 
        onFocus={() => setMensagem('')}
      />
      {mensagem ? (
        <Text style={mensagem.includes('Atenção') ? styles.error : styles.success}>
          {mensagem}
        </Text>
      ) : null}
      <Spacer size="50px" />

      <Button 
        block
        radius="12px"
        onPress={handleRegister}
      >
        <Text color="light" bold>Criar Conta</Text>
      </Button>
      <Spacer size="100px" />
      <Text
        underline
        color="dark"
        onPress={() => navigation.navigate("Login")}
      >
        Back to Home
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginTop: 20,
  },
  success: {
    color: 'green',
    marginTop: 20,
  },
});

export default Register;
