import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';

const EditArticle = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`); 
      const { title, description } = response.data;
      setTitle(title);
      setDescription(description);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching article:', error.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchArticle();
  }, []);
  
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/articles/${id}`, { title, description });
      console.log('Article updated successfully');
      navigate.push(`/articles/${id}`);
    } catch (error) {
      console.error('Error updating article:', error.response.data.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Update Article</button>
        </form>
      )}
    </div>
  );
};

export default EditArticle;
