import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const EditArticle = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        const { title, description, content } = response.data;
        setTitle(title);
        setDescription(description);
        setContent(content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]); 
  
  const handleUpdate = async () => {
    try {
      const updatedArticle = { title, description, content };
      await axios.put(`/api/articles/${id}`, updatedArticle);
      console.log('Article updated successfully');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Article</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <button onClick={handleUpdate}>Update Article</button>
    </div>
  );
};

export default EditArticle;
