import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Tools } from './pages/Tools';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="tools" element={<Tools />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
