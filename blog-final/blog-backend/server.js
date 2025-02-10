const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string
mongoose.connect('mongodb+srv://root:root@cluster0.12an0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogContent: String,
  blogAuthor: String,
  blogComments: [String],
  blogImage: String,
  views: { type: Number, default: 0 }
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/api/blogs', async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.send(newBlog);
});

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.send(blog);
});

app.put('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(blog);
});

app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.send({ message: 'Blog deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
