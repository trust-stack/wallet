import {config, TamaguiProvider, View} from "@truststack/ui";
import {WalletProvider} from "@truststack/wallet-core";
import {CredentialsScreen} from "@truststack/wallet-sdk/CredentialsScreen";

function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <WalletProvider>
        <View style={{height: "100vh", width: "100vw"}}>
          <CredentialsScreen />
        </View>
      </WalletProvider>
    </TamaguiProvider>
  );
}

export default App;
