import { createRoot } from "react-dom/client";

import "./index.css";
import { RootProvider } from "./RootProvider";
import CrowdFundingContextProvider from "./context/CrowdFunding.context";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <CrowdFundingContextProvider>
    <RootProvider />
    <Toaster />
  </CrowdFundingContextProvider>
);
