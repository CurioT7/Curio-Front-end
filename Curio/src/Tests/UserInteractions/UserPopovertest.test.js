import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserPopover from "../../Components/UserPopover/UserPopover";
import '@testing-library/jest-dom';


jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));



describe("UserPopover", () => {
  const user = "testUser";
  const friendInfo = {
    cakeDay: "2022-01-01",
    postKarma: 100,
    commentKarma: 200,
  };
  const isFollowing = true;
  const handleFollowToggle = jest.fn();
  const handleGetFollower = jest.fn();
  const showFriendInformation = jest.fn();
  const classname = "testClass";

  test("renders user name", () => {
    render(
      <UserPopover
        user={user}
        friendInfo={friendInfo}
        isFollowing={isFollowing}
        handleFollowToggle={handleFollowToggle}
        handleGetFollower={handleGetFollower}
        showFriendInformation={showFriendInformation}
        classname={classname}
      />
    );

    const userName = screen.getByText(user);
    expect(userName).toBeInTheDocument();
  });

  test("triggers popover on hover", () => {
    render(
      <UserPopover
        user={user}
        friendInfo={friendInfo}
        isFollowing={isFollowing}
        handleFollowToggle={handleFollowToggle}
        handleGetFollower={handleGetFollower}
        showFriendInformation={showFriendInformation}
        classname={classname}
      />
    );

    const userLink = screen.getByText(user);
    fireEvent.mouseEnter(userLink);

    const popoverHeader = screen.getByText("u/" + user);
    expect(popoverHeader).toBeInTheDocument();
  });
});
