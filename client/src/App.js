import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";



import ImageUploader from "./components/ImageUploader";
import Main from "./components/Main";


function App() {
  const queryClient = new QueryClient();

  return (
    <main className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>

            <Route path="/" exact>
              <Main />
            </Route>

            <Route path="/hang" exact>
              <ImageUploader />
            </Route>


          </Switch>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}

export default App;
