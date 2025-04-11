import React, { useState, FC } from "react";
import Todo from "./components/Todo";
import "./App.scss";

const App: FC = () => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = (): void => {
    const newTheme: string = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <Todo onThemeToggle={toggleTheme} />
    </div>
  );
};

export default App;
