import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const BlogPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error('There was an error fetching the blog!', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blog) return;

    // Add the new comment to the blog's comments
    const updatedBlog = { ...blog, blogComments: [...blog.blogComments, comment] };

    try {
      await axios.put(`http://localhost:5000/api/blogs/${blogId}`, updatedBlog);
      setBlog(updatedBlog);
      setComment('');
    } catch (error) {
      console.error('There was an error adding the comment!', error);
    }
  };

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.blogTitle}</h1>
      <img src={blog.blogImage} alt={blog.blogTitle} className="w-full h-auto mb-4 object-cover rounded" />
      <p className="text-gray-700 mb-4">{blog.blogContent}</p>
      <p className="text-gray-500 mb-2">Author: {blog.blogAuthor}</p>
      <p className="text-gray-500 mb-2">Views: {blog.views}</p> {/* Display view count */}
      <p className="text-gray-500 mb-4">Comments:</p>
      <ul className="list-disc list-inside mb-4">
        {Array.isArray(blog.blogComments) ? (
          blog.blogComments.map((comment, index) => (
            <li key={index} className="text-gray-700">{comment}</li>
          ))
        ) : (
          <li className="text-gray-700">No comments yet.</li>
        )}
      </ul>
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-lg font-medium text-gray-700">Add a Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            rows={2}
            required
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
