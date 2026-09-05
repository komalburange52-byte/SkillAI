import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SkillGap from "./pages/SkillGap";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/skill-gap" element={<SkillGap />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;