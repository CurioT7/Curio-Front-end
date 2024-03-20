import axios from 'axios';


async function update({mentionChecked, commentsChecked, upvotesPostsChecked, upvotesCommentsChecked, repliesChecked, newFollowersChecked, postsFollowChecked}) {
    try {
        const response = await axios.patch(`http://localhost:3000/api/settings/v1/me/prefs`, {
            mentions: mentionChecked,
            comments: commentsChecked,
            upvotesPosts: upvotesPostsChecked,
            upvotesComments: upvotesCommentsChecked,
            replies: repliesChecked,
            newFollowers: newFollowersChecked,
            postsYouFollow: postsFollowChecked
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default update;