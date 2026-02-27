import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// Public
import Navbar from './components/public/Navbar.jsx';
import Footer from './components/public/Footer.jsx';
import Home from './pages/public/Home.jsx';
import Projects from './pages/public/Projects.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogPost from './pages/public/BlogPost.jsx';
import Contact from './pages/public/Contact.jsx';

// Admin
import AdminLayout from './components/admin/AdminLayout.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ManagePosts from './pages/admin/ManagePosts.jsx';
import Editor from './pages/admin/Editor.jsx';
import ManageProjects from './pages/admin/ManageProjects.jsx';
import Schedule from './pages/admin/Schedule.jsx';
import Contacts from './pages/admin/Contacts.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/projects" element={<><Navbar /><Projects /><Footer /></>} />
      <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
      <Route path="/blog/:id" element={<><Navbar /><BlogPost /><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

      {/* Admin login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin protected routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<ManagePosts />} />
        <Route path="posts/new" element={<Editor />} />
        <Route path="posts/:id" element={<Editor />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="bottom-right" />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}