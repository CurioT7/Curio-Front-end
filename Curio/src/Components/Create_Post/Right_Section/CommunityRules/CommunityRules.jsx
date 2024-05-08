import React from "react";
import "./CommunityRules.css";

function Community_rules(props) {
    return (
        <div className="community_rules_container">
            <div className="community_rules_inner_container">
                <div className="community_rules_inner_container_header">
                    <span className="community_rules_header">
                        R/{props.subbreddit}
                    </span>
                </div>
                <div className="community_rules_list">
                    {props.rules.map((rule, index) => (
                        <div key={index} className="community_rule_item">
                            <span className="community_rule_number">{index + 1}.</span>
                            <span className="community_rule_body">{rule}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Community_rules;
