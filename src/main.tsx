import Header from "./components/sections/Header";
import Searcher from "./components/sections/Searcher";
import Footer from "./components/sections/Footer";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "@fontsource-variable/onest";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <main>
      <Searcher />
    </main>
    <Footer />
  </StrictMode>
);
