import React from "react";
import { useState, useRef, useEffect } from "react";
import SwitchToRichFormat from "../../styles/icons/SwitchToRichFormat.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CommentInputForm() {
    const [inputState, setInputState] = useState(0);

    const textareaRef = useRef(null);

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
                        <div className="d-flex flex-column border-1" style={{borderRadius: "20px"}}>
                            {inputState === 1 && <textarea
                                ref={textareaRef}
                                onFocus={() => setInputState(1)}
                                type="text"
                                className="form-control textarea-comment p-2 px-3 border-0"
                                placeholder="Add a comment"
                                style={{borderRadius: "20px"}}
                                data-testid="textarea-input"
                            />}
                            {inputState === 2 && <ReactQuill className="border-0" theme="snow" />}
                            {(inputState === 1 || inputState === 2) && <div className="d-flex justify-content-between">
                                <div className="me-auto ms-3 d-flex align-items-center">
                                    <button type="button" onClick={handleSwitchToRich} style={{backgroundColor: (inputState === 2) ? "#D2DADD" : ""}} className="switch-rich p-2"><SwitchToRichFormat /></button>
                                </div>
                                <div className="d-flex ms-auto mb-2">
                                    <button data-testid="cancel-textarea-comment" onClick={() => setInputState(0)} className="me-3 cancel-comment-button p-2">Cancel</button>
                                    <button data-testid="comment-confirm" className="me-4 comment-button-post-details p-2">Comment</button>
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