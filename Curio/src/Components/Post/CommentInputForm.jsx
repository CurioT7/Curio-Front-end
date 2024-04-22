import React from "react";
import { useState, useRef, useEffect } from "react";
import SwitchToRichFormat from "../../styles/icons/SwitchToRichFormat.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./InputForm.css";
import Text_Editor from "../Text_Editor/Text_Editor.jsx";
import { CreateComment } from "./CommentsEndPoints.js";

function CommentInputForm(props) {
    const [inputState, setInputState] = useState(0);
    const [inputText, setInputText] = useState("");
    const textareaRef = useRef(null);

    const handleTextInputChange = (newContent) => {
        if (inputState === 1) {
            setInputText(newContent.target.value);
        
        }
        else if (inputState === 2) {
        setInputText(newContent);
        }
    
    }
    useEffect(() => {
        if (inputState === 1) {
            textareaRef.current.focus();
        }
    }, [inputState]);

    const handleSwitchToRich = () => {
        if(inputState === 1){
            setInputState(2);
        }
        else if (inputState === 2){
            setInputState(1);
        }
    }
    const sendCommentToBackend = async () => {
        console.log(props.ID,inputText)
        const response = await CreateComment(props.ID,inputText);
        if(response){
            console.log("Comment Created");
            setInputState(0);
        }
        else{
            console.log("Error creating comment");
        }
    }
    const toolbarOptions = [['bold', 'italic','link','strike',{ 'script': 'super' }],
                            [ { 'header': [1, 2, 3, 4, 5, 6, false] },{ 'list': 'bullet' },{ 'list': 'ordered'},'blockquote','code-block'],
                            ['image']];
    const module = {
        toolbar: toolbarOptions,
        }

    return (
        <form className="mb-3">
            <div className="d-flex flex-column">
                {inputState === 0 && 
                    <input
                        onFocus={() => setInputState(1)}
                        type="text"
                        className="form-control p-2 px-3 input-comment-border"
                        placeholder="Add a comment"
                        style={{borderRadius: "20px"}}
                    />
                }
                    {(inputState === 1 || inputState === 2) && 
                        <div className="d-flex flex-column border-1 input-form-container" style={{borderRadius: "20px"}}>
                            {inputState === 1 && <textarea
                                ref={textareaRef}
                                onFocus={() => setInputState(1)}
                                type="text"
                                className="form-control textarea-comment p-2 px-3 border-0"
                                placeholder="Add a comment"
                                style={{borderRadius: "20px"}}
                                data-testid="textarea-input"
                                onChange={handleTextInputChange}
                                value={inputText}
                            />}
                            {inputState === 2 &&  <Text_Editor onContentChange={handleTextInputChange} />}
                            {(inputState === 1 || inputState === 2) && <div className="d-flex justify-content-between">
                                <div className="me-auto ms-3 d-flex align-items-center">
                                    <button type="button" onClick={handleSwitchToRich} style={{backgroundColor: (inputState === 2) ? "#D2DADD" : ""}} className="switch-rich p-2"><SwitchToRichFormat /></button>
                                </div>
                                <div className="d-flex ms-auto mb-2">
                                    <button data-testid="cancel-textarea-comment" onClick={() => setInputState(0)} className="me-3 cancel-comment-button p-2">Cancel</button>
                                    <button data-testid="comment-confirm" onClick={sendCommentToBackend} className="me-4 comment-button-post-details p-2">Comment</button>
                                </div>
                            </div>
                            }
                        
                        </div>
                    }
                    

            </div>
        </form>
    );
}

export default CommentInputForm;