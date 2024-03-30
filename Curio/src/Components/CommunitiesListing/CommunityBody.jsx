import Listing from "./Listing";
import "./CommunityPage.css";
import Post from "../Post/Post";
function CommunityBody({ props }) {
  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing  />
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

      <div className="post">
        <Post/>
      </div>
      
    </div>
  );
}
export default CommunityBody;