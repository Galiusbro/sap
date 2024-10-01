import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./components/provider/dataProvider";

export const App = () =>
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="clients" />
  </Admin>;
