import React, {useState} from 'react';
import * as s from '../../../Style/Students';
import LogoImage from '../../../Image/web.png';
import AdminAvatar from '../../../Image/facebook.png';
import Navbar from '../../Navbar';

const Students_Upload = () => {
    const [selectedItem, setSelectedItem] = useState("Upload Articles");

    const handleItemClick = (item) => {
        setSelectedItem(item);
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
              onClick={() => handleItemClick("Upload Articles")}
            >
              <s.SidebarItem selected={selectedItem === "Upload Articles"}>
                Upload Articles
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/Student/View"
              onClick={() => handleItemClick("View Articles")}
            >
              <s.SidebarItem selected={selectedItem === "View Articles"}>
                View Articles
              </s.SidebarItem>
            </s.StyledLink>
            <s.StyledLink
              to="/system-settings"
              onClick={() => handleItemClick("System settings")}
            >
              <s.SidebarItem selected={selectedItem === "System settings"}>
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
                <s.Input name="title" placeholder="Enter Title" />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Cover Image:</s.Label>
                <s.Input type="file" name="coverImage" accept="image/*" />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Short Description:</s.Label>
                <s.TextArea
                  name="shortDescription"
                  placeholder="Enter Short Description"
                />
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Label>Content:</s.Label>
                <s.TextArea name="content" placeholder="Enter Content" />
              </s.InputWrapper>
              <s.ButtonContainer>
                <s.AddMoreArticlesButton>
                  Add more Articles
                </s.AddMoreArticlesButton>
                <s.UploadArticlesButton>Upload Articles</s.UploadArticlesButton>
              </s.ButtonContainer>
            </s.SquareContainer>
          </s.UploadContainer>
        </s.Main>
      </s.MainContent>
    </s.Container>
  );
};

export default Students_Upload;
