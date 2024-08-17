import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./themeProvider";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <ThemeProvider>
      <>
        {!loading ? (
          <div>
            <Navbar />
            <Home />
            <About />
            <Services />
            <Projects />
            <Contact />
          </div>
        ) : (
          <LoadingScreen />
        )}
      </>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
