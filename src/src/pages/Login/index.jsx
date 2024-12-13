import { useState } from "react";
import {
  Button,
  Box,
  Spacer,
  Text,
} from "../../components/index";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet } from "react-native";
import InputLogin from "../../components/Input";
import logo from '../../assets/logo.png';
import { login } from "../../services/authService";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setSigned, setName, setId } = useUser()

  const handleLogin = () => {
    login({
      email: email,
      password: password
    })
      .then(res => {
        if (res) {
          setEmail('')
          setPassword('')
          AsyncStorage.setItem('@TOKEN_KEY', res.accessToken).then();
          setName(res.user.name)
          setId(res.user.id)
          setSigned(true)
        }
        else {
          setError(true)
        }
      })
  }

  return (
    <>
      <Box justify="center" align="center" background="light" hasPadding>
        <Image style={styles.img} source={logo} />
        <Spacer size="30px" />
        <InputLogin label={"Email"} value={email} setState={setEmail} error={error} />
        <Spacer size="30px" />
        <InputLogin label={"Senha"} secureTextInput={true} iconEye value={password} setState={setPassword} error={error} />
        <Spacer size="50px" />
        <Button
          block
          radius="12px"
          onPress={() =>
            handleLogin()
          }
        >
          <Text color="light" bold>Entrar</Text>
        </Button>
        <Spacer size="100px" />
        <Button
          backgroundColor="mutedBlue"
          radius="12px"
          block
          onPress={() => navigation.navigate("Register")}
        >
          <Text color="dark" bold>Cadastrar</Text>
        </Button>
      </Box >
    </>
  );
};


const styles = StyleSheet.create({

  img: {
    width: "100%",
    height: 300,
  },
});

export default Login;
