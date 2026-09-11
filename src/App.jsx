import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />

        <Route
          path="/roadmap"
          element={<Roadmap />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;