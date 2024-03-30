import CommunityInfo from "./CommunityInfo";
import CommunityHeader from "./CommunityHeader";
import CommunityBody from "./CommunityBody";
import "./CommunityPage.css";
function CommuntiyPage() {
  return (
    <div className=" my-1 justify-content-center container-lg center-div ">
      <CommunityHeader />
      <div className="row me-3 justify-content-center ">    
        <div className="col-12 col-lg-8">   
        <CommunityBody />
        </div>
        <div className="col-lg-4 d-none d-lg-block">
        <CommunityInfo />
        </div>
      </div>

    </div>
  );
}
export default CommuntiyPage;