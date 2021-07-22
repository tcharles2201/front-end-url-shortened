import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { DashboardLinks } from "./components/links/DashboardLinks";

function App() {
  return (
    <ChakraProvider>
      <DashboardLinks />
    </ChakraProvider>
  );
}

export default App;
