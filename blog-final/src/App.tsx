import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CreateNew from './CreateNew';
import Blogs from './Blogs';
import BlogPage from './BlogPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home component */}
            <Route path="/create-new" element={<CreateNew />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div className="relative w-full h-screen">
    <img src="/bg-img.png" alt="Description of image" className="w-full h-full object-cover" />
  </div>
);

export default App;
