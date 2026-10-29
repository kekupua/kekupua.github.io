import "@kekupua/web-components";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";
import { Component, lazy, Suspense, type ReactNode } from "react";
import { Route, Routes, HashRouter, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";

const HearthstoneRandomCard = lazy(
  () => import("./pages/HearthstoneRandomCard"),
);
const RecipeListPage = lazy(() =>
  import("./pages/Recipe/RecipeListPage").then((m) => ({
    default: m.RecipeListPage,
  })),
);
const RecipeDetailPage = lazy(() =>
  import("./pages/Recipe/RecipeDetailPage").then((m) => ({
    default: m.RecipeDetailPage,
  })),
);
const MealPrepPage = lazy(() =>
  import("./pages/Recipe/MealPrepPage").then((m) => ({
    default: m.MealPrepPage,
  })),
);

// A project that has never been opened may have no code available offline.
class ProjectBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="p-12" role="alert">
        <h1 className="text-2xl font-bold">This project could not load</h1>
        <p>Connect to the internet and reopen it to download its files.</p>
        <a href="/">Back to portfolio</a>
      </main>
    ) : (
      this.props.children
    );
  }
}

function ProjectRoutes() {
  const location = useLocation();
  return (
    <ProjectBoundary key={location.pathname}>
      <Suspense
        fallback={
          <p role="status" className="p-12">
            Loading project…
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/random-hearthstone"
            element={<HearthstoneRandomCard />}
          />
          <Route path="/recipesByGpt" element={<RecipeListPage />} />
          <Route path="/recipesByGpt/:id" element={<RecipeDetailPage />} />
          <Route path="/meal-prep" element={<MealPrepPage />} />
        </Routes>
      </Suspense>
    </ProjectBoundary>
  );
}

export const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <ProjectRoutes />
      </HashRouter>
      <Footer />
    </div>
  );
};

export default App;
