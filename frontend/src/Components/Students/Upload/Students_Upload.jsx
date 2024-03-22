import React, { useState } from 'react';
import * as s from '../../../Style/Students';
import LogoImage from '../../../Image/web.png';
import AdminAvatar from '../../../Image/facebook.png';
import Navbar from '../../Navbar';
import axios from 'axios';
import Term from './Term';

const Student_Upload = () => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const imageFormData = new FormData();
            imageFormData.append('image', imageFile);

            const imageResponse = await axios.post('/api/images', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const contributionId = imageResponse.data._id;
            const wordCount = content.trim().split(/\s+/).length;

            const articleData = {
                title,
                shortDescription,
                content,
                wordCount,
                contributionId
            };

            const articleResponse = await axios.post('/api/articles', articleData);

            console.log('Article uploaded successfully:', articleResponse.data);
            setTitle('');
            setShortDescription('');
            setContent('');
            setImageFile(null);
        } catch (error) {
            console.error('Error uploading article:', error);
        }
    };

    return (
        <s.Container>
            <Navbar />
            <s.MainContent>
                <s.Sidebar>
                    <s.LogoContainer>
                        <s.Logo src={LogoImage} alt="Website Logo" />
                    </s.LogoContainer>
                    <s.AdminInfo>
                        <s.Avatar src={AdminAvatar} alt="Admin Avatar" />
                        <s.AdminName>John Doe</s.AdminName>
                    </s.AdminInfo>
                    <s.MainMenu>
                        <s.MenuTitle>Main Menu</s.MenuTitle>
                        <s.StyledLink
                            to="/Student"
                        >
                            <s.SidebarItem>
                                Upload Articles
                            </s.SidebarItem>
                        </s.StyledLink>
                        <s.StyledLink
                            to="/Student/View"
                        >
                            <s.SidebarItem>
                                View Articles
                            </s.SidebarItem>
                        </s.StyledLink>
                        <s.StyledLink
                            to="/system-settings"
                        >
                            <s.SidebarItem>
                                System settings
                            </s.SidebarItem>
                        </s.StyledLink>
                    </s.MainMenu>
                </s.Sidebar>
                <s.Main>
                <s.UploadContainer>
                        <s.SquareContainer>
                            <s.TitleHeader>Upload Articles</s.TitleHeader>
                            <s.InputWrapper>
                                <s.Label>Title:</s.Label>
                                <s.Input
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter Title"
                                />
                            </s.InputWrapper>
                            <s.InputWrapper>
                                <s.Label>Short Description:</s.Label>
                                <s.TextArea
                                    name="shortDescription"
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    placeholder="Enter Short Description"
                                />
                            </s.InputWrapper>
                            <s.InputWrapper>
                                <s.Label>Content:</s.Label>
                                <s.TextArea
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter Content"
                                />
                            </s.InputWrapper>
                            <s.InputWrapper>
                                <s.Label>Upload Image:</s.Label>
                                <input type="file" onChange={handleImageUpload} />
                            </s.InputWrapper>
                            <s.ButtonContainer>
                                <s.UploadArticlesButton onClick={handleUpload}>Upload Articles</s.UploadArticlesButton>
                            </s.ButtonContainer>
                        </s.SquareContainer>
                    </s.UploadContainer>
                </s.Main>
            </s.MainContent>
        </s.Container>
    );
};

export default Student_Upload;
