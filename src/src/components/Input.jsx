import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Text } from 'react-native-paper';

const InputLogin = ({ onFocus, label, secureTextInput, placeholder, error, ...props }) => {
    const [isSecure, setIsSecure] = useState(secureTextInput);

    return (
        <>
            <TextInput
                outlineColor={error ? "red" : "blue"}
                label={label}
                style={{ height: 45, width: "100%" }}
                right={props.iconEye ? <TextInput.Icon icon="eye" onPress={() => setIsSecure(!isSecure)} /> : null}
                mode="outlined"
                onFocus={onFocus}
                value={props.value}
                secureTextEntry={isSecure}
                onChangeText={text => props.setState(text)}
            />
            {error && (
                <Text className="text-red-700">Email ou senha incorretos.</Text>
            )}

        </>
    );
};

export default InputLogin;