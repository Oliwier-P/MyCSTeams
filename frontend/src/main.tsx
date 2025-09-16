import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignPage } from "./pages/SignPage/SignPage.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.tsx";
import { OverlayProvider } from "./contexts/overlayContext.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Catch all other paths and redirect to "/error" */}
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </BrowserRouter>
    </OverlayProvider>
  </StrictMode>
);
