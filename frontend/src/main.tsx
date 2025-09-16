import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignPage } from "./pages/SignPage/SignPage.tsx";
import { OverlayProvider } from "./contexts/overlayContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign" element={<SignPage />} />
        </Routes>
      </BrowserRouter>
    </OverlayProvider>
  </StrictMode>
);
