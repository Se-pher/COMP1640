import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Navbar from "../../Navbar";
import * as s from "../../../Style/Manager/Manager_Article_Details";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from "react-router-dom";

const Manager_Article_Details = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`/api/articles/${id}`);
        console.log("Fetched article data:", data);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <s.Container>
      <Navbar />
      <s.MainContent>
        <Sidebar selectedItem="View Article Details" />
        <s.Main>
          {article && (
            <s.ArticleContainer>
              {article && article.wordFileURL ? (
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[
                    {
                      uri: article.wordFileURL,
                      fileType: "docx",
                    },
                  ]}
                  style={{ height: "600px" }}
                />
              ) : (
                <p>Không tìm thấy tệp word.</p>
              )}
            </s.ArticleContainer>
          )}
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Manager_Article_Details;