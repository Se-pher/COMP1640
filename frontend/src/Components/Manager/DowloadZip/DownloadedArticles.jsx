import React from 'react';
import * as s from '../../../Style/Manager/Manager_Articles_View';
import Sidebar from '../sidebar';
import Navbar from '../../Navbar';
import JSZip from 'jszip';
import axios from 'axios';
import { saveAs } from 'file-saver';

const DownloadedArticles = ({ selectedArticles }) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    for (const article of selectedArticles) {
      const wordFileResponse = await axios.get(article.wordFileURL, {
        responseType: 'blob',
      });
      const imageResponse = await axios.get(article.imageURL, {
        responseType: 'blob',
      });

      zip.file(`${article.title}.docx`, wordFileResponse.data);
      zip.file(`${article.title}.jpg`, imageResponse.data);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'downloaded_articles.zip');
  };

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar selectedItem="Downloaded Articles" />
        <s.Main>
          <s.ArticlesContainer>
            {selectedArticles.map((article) => (
              <s.ArticleCard key={article._id}>
                <s.ArticleImage src={article.imageURL} alt={article.title} />
                <s.ArticleInfo>
                  <s.ArticleTitle>{article.title}</s.ArticleTitle>
                  <s.ArticleDescription>{article.description}</s.ArticleDescription>
                </s.ArticleInfo>
              </s.ArticleCard>
            ))}
          </s.ArticlesContainer>
          <s.DownloadButton onClick={handleDownload}>
            Download Selected Articles
          </s.DownloadButton>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default DownloadedArticles;