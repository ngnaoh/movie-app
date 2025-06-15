import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ViewProvider } from "./context/ViewContext";
import Routes from "./routes";
import Header from "./components/layout/Header";
import ScrollToTop from "./components/common/ScrollToTop";
import "./styles/global.scss";
import { useCallback, useEffect, useRef, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      setIsVisible(e.deltaY > 0);
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ViewProvider>
            <Router>
              <div className="app">
                <Header />
                <main className="main-content">
                  <div ref={mainRef} />
                  <Routes />
                </main>
                <ScrollToTop isVisible={isVisible} scrollToTop={scrollToTop} />
              </div>
            </Router>
          </ViewProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
