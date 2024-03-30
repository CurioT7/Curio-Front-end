import Listing from "./Listing";
function CommunityBody({ props }) {
  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing  />
      </div>

      <div>
        post
      </div>
      
    </div>
  );
}
export default CommunityBody;