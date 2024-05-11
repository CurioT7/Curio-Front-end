/**
 * Component for creating a post.
 * @component
 * @param {Object} props - The props object containing the component's properties.
 * @param {Function} props.onContentChange - Function to handle the change in post content.
 * @module Post
 */
import React from "react";
import Text_Editor from "../../Text_Editor/Text_Editor";

function Post({ onContentChange }) { 
  return (
    <Text_Editor onContentChange={onContentChange} /> 
  );
}

export default Post;
