import React, { useState } from 'react';
import axios from 'axios';

const CreateNew: React.FC = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogImage, setBlogImage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBlog = { blogTitle, blogContent, blogAuthor, blogComments: [], blogImage, views: 0 };

    try {
      await axios.post('http://localhost:5000/api/blogs', newBlog);
      alert('Blog created successfully!');
      setBlogTitle('');
      setBlogContent('');
      setBlogAuthor('');
      setBlogImage('');
    } catch (error) {
      console.error('There was an error creating the blog!', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            id="title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">Blog Content</label>
          <textarea
            id="content"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-medium text-gray-700">Blog Author</label>
          <input
            type="text"
            id="author"
            value={blogAuthor}
            onChange={(e) => setBlogAuthor(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Blog Image URL</label>
          <input
            type="url"
            id="image"
            value={blogImage}
            onChange={(e) => setBlogImage(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
