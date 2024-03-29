import CommunityInfo from "./CommunityInfo";
import CommunityHeader from "./CommunityHeader";
import CommunityBody from "./CommunityBody";
import "./CommunityPage.css";
function CommuntiyPage() {
  return (
    <div className="container center-div ">
      <CommunityHeader />
      <div>      
        <CommunityBody />
        <CommunityInfo />
      </div>

    </div>
  );
}
export default CommuntiyPage;