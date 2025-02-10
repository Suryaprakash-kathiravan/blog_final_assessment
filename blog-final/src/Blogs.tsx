import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Blog {
  _id: string;
  blogTitle: string;
  blogContent: string;
  blogAuthor: string;
  blogComments: string[];
  blogImage: string;
  views: number;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('There was an error fetching the blogs!', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = async (id: string) => {
    try {
      // Retrieve the blog from the blogs array using the blog id
      const blogToUpdate = blogs.find(blog => blog._id === id);
      if (blogToUpdate) {
        // Increment the views
        const updatedBlog = { ...blogToUpdate, views: blogToUpdate.views + 1 };
        await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);

        // Update the local state with the updated blog
        setBlogs(blogs.map(blog => (blog._id === id ? updatedBlog : blog)));

        // Navigate to the BlogPage
        navigate(`/blog/${id}`);
      }
    } catch (error) {
      console.error('There was an error incrementing the view count!', error);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      // Remove the blog from the local state
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('There was an error deleting the blog!', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="mb-4 p-4 border border-gray-300 rounded shadow">
            <a onClick={() => handleBlogClick(blog._id)} className="text-2xl font-bold text-blue-600 hover:underline cursor-pointer">
              {blog.blogTitle}
            </a>
            <img src={blog.blogImage} alt={blog.blogTitle} className="w-full h-auto mt-2 mb-2 object-cover rounded" />
            <p className="text-gray-700 mt-2">{blog.blogContent}</p>
            <p className="text-gray-500 mt-1">Author: {blog.blogAuthor}</p>
            <p className="text-gray-500 mt-1">Comments: {blog.blogComments.length}</p>
            <p className="text-gray-500 mt-1">Views: {blog.views}</p> {/* Display view count */}
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mt-2"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
