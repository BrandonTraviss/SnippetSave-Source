import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSnippet from "./pages/CreateSnippet";
import MySnippets from "./pages/MySnippets";
import SnippetView from "./pages/SnippetView";
import EditSnippet from "./pages/EditSnippet";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ExploreSnippets from "./pages/ExploreSnippets";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FavoriteSnippets from "./pages/FavoriteSnippets";
// Component
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Open Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact'element={<Contact/>} />
        <Route path ='/privacy-policy' element= {<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsOfService />} />
        {/* Auth Aoutes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/create-snippet" element={isAuthenticated ? <CreateSnippet /> : <Navigate to="/login" />} />
        <Route path="/my-snippets" element={isAuthenticated ? <MySnippets /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={isAuthenticated ? <FavoriteSnippets /> : <Navigate to="/login" />} />
        <Route path="/snippets/:id" element={isAuthenticated ? <SnippetView /> : <Navigate to="/login" />} />
        <Route path="/snippets/:id/edit" element={isAuthenticated ? <EditSnippet /> : <Navigate to="/login" />} />
        <Route path="/explore" element={isAuthenticated ? <ExploreSnippets /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}