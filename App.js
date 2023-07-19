import { Provider } from "react-redux";
import Main from "./Main";
import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducer";

export default function App() {
  const store = configureStore({
    reducer: {
      users: usersReducer,
    },
  });
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
