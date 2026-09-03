
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import CommonLayout from "./components/Layout/ComonLayout";
import LoadingScreen from "./share/LoadingScreen";


function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return sessionStorage.getItem("atnamira-loading-shown") !== "true";
  });

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("atnamira-loading-shown", "true");
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default App;


