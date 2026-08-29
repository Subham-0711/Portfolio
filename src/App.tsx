import { lazy, Suspense } from "react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import { LoadingProvider } from "./context/LoadingProvider";
import WebGLErrorBoundary from "./components/WebGLErrorBoundary";

const CharacterModel = lazy(() => import("./components/Character"));

const App = () => {
  return (
    <LoadingProvider>
      <MainContainer>
        <WebGLErrorBoundary>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </WebGLErrorBoundary>
      </MainContainer>
    </LoadingProvider>
  );
};

export default App;
