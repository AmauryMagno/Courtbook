import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import UserProvider from "./src/contexts/UserContext";

import Route from "./src/routes/Route";

const App = () => {
  return (
    <UserProvider>
      <PaperProvider >
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
};

export default App;
