import React from "react";
import Text_Editor from "../../Text_Editor/Text_Editor";

function Post({ onContentChange }) { 
  return (
    <Text_Editor onContentChange={onContentChange} /> 
  );
}

export default Post;
