import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// Public layout + pages
import Navbar from './components/public/Navbar.jsx';
import Footer from './components/public/Footer.jsx';
import Home from './pages/public/Home.jsx';
import Projects from './pages/public/Projects.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogPost from './pages/public/BlogPost.jsx';
import Contact from './pages/public/Contact.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="bottom-right" />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/projects" element={
              <>
                <Navbar />
                <Projects />
                <Footer />
              </>
            } />
            <Route path="/blog" element={
              <>
                <Navbar />
                <Blog />
                <Footer />
              </>
            } />
            <Route path="/blog/:id" element={
              <>
                <Navbar />
                <BlogPost />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}