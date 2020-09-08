import { registerRootComponent } from "expo";
console.disableYellowBox = true;

import App from "./src/pages/Main";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
