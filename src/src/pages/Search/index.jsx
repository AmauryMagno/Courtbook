import { useState } from "react";
import { Box, Button, Input, Title } from "../../components/index";
import { StatusBar, Text } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { useNavigation } from "@react-navigation/native";


const Search = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState();
    const [inputDate, setInputDate] = useState();

    const options = [
        { label: "Futebol", value: "Society" },
        { label: "Futevôlei", value: "Futevôlei" },
        { label: "Beach Tenis", value: "Beach" },
        { label: "Futsal", value: "Futsal" },
    ];

    const submit = () => {
        const data = {
            date: inputDate,
            category: category,
        };

        if (!data.date || !category) return alert('Preencha os campos corretamente!')
        navigation.navigate('SearchResults', { data })
    };

    return (
        <>
            <StatusBar barStyle={"dark-content"} />
            <Box justify="center" align="center" hasPadding>
                <Title variant="big" bold color="darkBlue">
                    Buscar Quadras
                </Title>
                <Box fluid height="300px" spacingTop="80px">
                    <Box fluid>
                        <Text className="text-lg">Localização:</Text>
                        <Input
                            value="Belo Horizonte - MG"
                            readOnly
                            backgroundColor="mutedGray"
                        />
                    </Box>
                    <Box fluid>
                        <Text className="text-lg">Data:</Text>
                        <DatePickerInput
                            locale="pt"
                            value={inputDate}
                            onChange={(d) => setInputDate(d)}
                            inputMode="start"
                        />
                    </Box>

                    <Box spacingTop="15px" fluid>
                        <Text className="text-lg">Categoria:</Text>
                        <Dropdown
                            placeholder="Selecione a Categoria"
                            options={options}
                            value={category}
                            onSelect={setCategory}
                        />
                    </Box>
                </Box>
                <Button
                    block
                    radius="10px"
                    spacingTop="80px"
                    backgroundColor="darkBlue"
                    onPress={() => submit()}
                >
                    <Text className="font-bold text-xl text-white">Buscar</Text>
                </Button>
            </Box>
        </>
    );
};

export default Search;
