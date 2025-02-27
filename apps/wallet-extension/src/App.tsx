import {config, TamaguiProvider, View} from "@truststack/ui";
import {CredentialsScreen} from "@truststack/wallet-ui/CredentialsScreen";

function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <View style={{height: "100vh", width: "100vw"}}>
        <CredentialsScreen />
      </View>
    </TamaguiProvider>
  );
}

export default App;
