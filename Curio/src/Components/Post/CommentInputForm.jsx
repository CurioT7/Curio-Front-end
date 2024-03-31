import React from "react";
import { useState, useRef, useEffect } from "react";
import SwitchToRichFormat from "../../styles/icons/SwitchToRichFormat.jsx";


function CommentInputForm() {
    const [inputState, setInputState] = useState(0);

    const textareaRef = useRef(null);

    useEffect(() => {
        if (inputState === 1) {
            textareaRef.current.focus();
        }
    }, [inputState]);

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
                {inputState === 1 && 
                    <div className="d-flex flex-column border-1 border-secondary" style={{borderRadius: "20px"}}>
                        <textarea
                            ref={textareaRef}
                            onFocus={() => setInputState(1)}
                            type="text"
                            className="form-control textarea-comment p-2 px-3 border-0"
                            placeholder="Add a comment"
                            style={{borderRadius: "20px"}}
                        />
                        <div className="d-flex justify-content-between">
                            <div className="me-auto ms-3 d-flex align-items-center">
                                <button className="switch-rich p-2"><SwitchToRichFormat /></button>
                            </div>
                            <div className="d-flex ms-auto mb-2">
                                <button onClick={() => setInputState(0)} className="me-3 cancel-comment-button p-2">Cancel</button>
                                <button className="me-4 comment-button-post-details p-2">Comment</button>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </form>
    );
}

export default CommentInputForm;