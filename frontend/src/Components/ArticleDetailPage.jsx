import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as s from '../Style/ArticleDetail';
import { useParams } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ArticleDetailPage = () => {
  const [article, setArticle] = useState(null);
  const [username, setUsername] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data.article);

        if (response.data.username) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article || !username) {
    return <div>Loading...</div>;
  }

  return (
    <s.Container>
      <s.ArticleImage src={article.imageURL} alt={article.title} />
      <s.ArticleDetails>
        <s.ArticleTitle>{article.title}</s.ArticleTitle>
        <s.ArticleDate>{new Date(article.createdAt).toLocaleDateString()}</s.ArticleDate>
        <s.ArticleAuthor>{username}</s.ArticleAuthor>
        <s.ArticleDescription>{article.description}</s.ArticleDescription>
        {article.wordFileURL ? (
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: article.wordFileURL, fileType: "docx" }]}
            style={{ height: "600px" }}
          />
        ) : (
          <p>Word file not found.</p>
        )}
      </s.ArticleDetails>
    </s.Container>
  );
};

export default ArticleDetailPage;
