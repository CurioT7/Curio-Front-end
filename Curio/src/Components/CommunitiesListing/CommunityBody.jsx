import Listing from "./Listing";
function CommunityBody({ props }) {
  return (
    <div className="community-body">
      <div className="community-body-header">
        <h2>Name</h2>
        <p>des</p>
      </div>
      <div className="community-body-footer">
        <div className="community-body-footer-left">
          <p> Members</p>
        </div>
        <div className="community-body-footer-right">
          <button>Join</button>
        </div>
      </div>
    </div>
  );
}
export default CommunityBody;