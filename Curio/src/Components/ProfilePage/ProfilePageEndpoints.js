import React from "react";
import "./ProfilePage.jsx";
import axios from "axios";
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const url = VITE_SERVER_HOST;

const getUserOverview = async (username) => {
    const url = `${VITE_SERVER_HOST}/user/${username}/overview`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const userPosts = responseData.userPosts.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        shares: post.shares,
        isNSFW: post.isNSFW,
        isSpoiler: post.isSpoiler,
        isOC: post.isOC,
        isCrosspost: post.isCrosspost,
        karma: post.karma,
        awards: post.awards,
        media: post.media,
        link: post.link,
        isDraft: post.isDraft,
        authorID: post.authorID,
        authorName: post.authorName,
        views: post.views
    }));

    const userComments = responseData.userComments.map(comment => ({
        awards: comment.awards,
        id: comment._id,
        content: comment.content,
        authorName: comment.authorName,
        authorID: comment.authorID,
        createdAt: comment.createdAt,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes
    }));

    return { userPosts, userComments };
};

const getUserComments = async (username) => {
    
    const url = `${VITE_SERVER_HOST}/user/${localStorage.getItem('username')}/comments`;
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const userComments = responseData.map(comment => ({
        awards: comment.awards,
        id: comment._id,
        content: comment.content,
        authorName: comment.authorName,
        authorID: comment.authorID,
        createdAt: comment.createdAt,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        linkedPost: comment.linkedPost,
        linkedSubreddit: comment.linkedSubreddit
    }));


    return userComments;
};

const getUserDownvoted = async () => {
    const url = `${VITE_SERVER_HOST}/user/downvoted`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const votedPosts = responseData.votedPosts.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        author: post.author,
        createdAt: post.createdAt,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        shares: post.shares,
        isNSFW: post.isNSFW,
        isSpoiler: post.isSpoiler,
        isOC: post.isOC,
        isCrosspost: post.isCrosspost,
        karma: post.karma,
        awards: post.awards,
        media: post.media,
        link: post.link,
        isDraft: post.isDraft
    }));

    const votedComments = responseData.votedComments.map(comment => ({
        karma: comment.karma,
        awards: comment.awards,
        id: comment._id,
        content: comment.content,
        authorName: comment.authorName,
        authorID: comment.authorID,
        createdAt: comment.createdAt,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes
    }));

    return { votedPosts, votedComments };
};

const getUserUpvoted = async () => {
    const url = `${VITE_SERVER_HOST}/user/upvoted`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const votedPosts = responseData.votedPosts.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        shares: post.shares,
        isNSFW: post.isNSFW,
        isSpoiler: post.isSpoiler,
        isOC: post.isOC,
        isCrosspost: post.isCrosspost,
        karma: post.karma,
        awards: post.awards,
        media: post.media,
        link: post.link,
        isDraft: post.isDraft,
        authorID: post.authorID,
        authorName: post.authorName,
        views: post.views
    }));

    const votedComments = responseData.votedComments.map(comment => ({
        awards: comment.awards,
        id: comment._id,
        content: comment.content,
        authorName: comment.authorName,
        authorID: comment.authorID,
        createdAt: comment.createdAt,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        linkedPost: comment.linkedPost,
        linkedSubreddit: comment.linkedSubreddit
    }));

    return { votedPosts, votedComments };
};

const getUserSubmitted = async (username) => {
    const url = `${VITE_SERVER_HOST}/user/${username}/submitted`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const submittedPosts = responseData.map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        shares: post.shares,
        isNSFW: post.isNSFW,
        isSpoiler: post.isSpoiler,
        isOC: post.isOC,
        isCrosspost: post.isCrosspost,
        karma: post.karma,
        awards: post.awards,
        media: post.media,
        link: post.link,
        isDraft: post.isDraft,
        authorID: post.authorID,
        authorName: post.authorName,
        views: post.views
    }));

    return { submittedPosts };
};

const getUserAbout = async (username) => {
    const url = `${VITE_SERVER_HOST}/user/${username}/about`;
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const socialLinks = responseData.socialLinks.map(link => ({
        id: link._id,
        platform: link.platform,
        url: link.url
    }));

    const moderatedSubreddits = responseData.moderatedSubreddits.map(subreddit => ({
        members: subreddit.members,
        posts: subreddit.posts,
        id: subreddit._id,
        name: subreddit.name,
        description: subreddit.description,
        creator: subreddit.creator,
        banner: subreddit.banner,
        icon: subreddit.icon,
        isOver18: subreddit.isOver18,
        isPrivate: subreddit.isPrivate,
        isNSFW: subreddit.isNSFW,
        isSpoiler: subreddit.isSpoiler,
        isOC: subreddit.isOC,
        isCrosspost: subreddit.isCrosspost,
        rules: subreddit.rules,
        category: subreddit.category,
        language: subreddit.language,
        allowImages: subreddit.allowImages,
        allowVideos: subreddit.allowVideos,
        allowText: subreddit.allowText,
        allowLink: subreddit.allowLink,
        allowPoll: subreddit.allowPoll,
        allowEmoji: subreddit.allowEmoji,
        allowGif: subreddit.allowGif,
        role: subreddit.role,
        createdAt: subreddit.createdAt
    }));

    return {
        followersCount: responseData.followersCount,
        followingCount: responseData.followingCount,
        goldRecieved: responseData.goldReceived,
        cakeDay: responseData.cakeDay,
        postKarma: responseData.postKarma,
        commentKarma: responseData.commentKarma,
        socialLinks,
        bio: responseData.bio,
        displayName: responseData.displayName,
        banner: responseData.banner,
        moderatedSubreddits,
        profilePicture: responseData.profilePicture,
        isOver18: responseData.isOver18
    };
};


export { getUserOverview, getUserComments, getUserDownvoted, getUserUpvoted,  getUserSubmitted, getUserAbout };