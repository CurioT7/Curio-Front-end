import React from 'react';
import { Button } from '@chakra-ui/react';
import "./Createpostarea.css";
import Icons from "./Icons";
import Post_Method from "./Post_Methods"

function Createpostarea() {
  return (
    <div className="create-post-container">
        <Post_Method/>
      <div>
        <div>
          <div>
            <textarea rows="1" maxLength="300" placeholder="Title"></textarea>
            <div>
              "0/300"
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <Icons label="Bold" icon="fa-solid fa-bold"/>
                    <Icons label="Italics" icon="fa-solid fa-italic"/>
                    <Icons label="Link" icon="fa-solid fa-link"/>
                    <Icons label="Strikethrough" icon="fa-solid fa-strikethrough"/>
                    <Icons label="Inline Code" icon="fa-solid fa-code"/>
                    <Icons label="Superscript" icon="fa-solid fa-superscript"/>
                    <Icons label="Spoiler" icon="fa-solid fa-exclamation"/>
                    <Icons label="Heading" icon="fa-solid fa-heading"/>
                    <Icons label="Bulleted List" icon="fa-solid fa-list"/>
                    <Icons label="Numbered List" icon="fa-solid fa-list-ol"/>
                    <Icons label="Table" icon=" fa-solid fa-table"/>
                    <Icons label="Add a video" icon="fa-brands fa-youtube"/>
                  </div>
                </div>
                <div>
                  <Button colorScheme='blue' size='md' variant='ghost'>
                    Markdown Mode
                  </Button>
                </div>
              </div>
              <div>
                <textarea rows="1" maxLength="300" placeholder="Text(optional)"></textarea>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createpostarea;
