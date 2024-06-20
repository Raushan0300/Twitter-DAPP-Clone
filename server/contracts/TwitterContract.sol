// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TwitterContract {
    struct Tweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        mapping(address => bool) likers;
        uint256 retweets;
        uint256 commentCount;
        mapping(uint256 => Comment) comments;
    }

    struct PublicTweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        bool likedBySender;
        uint256 retweets;
        uint256 commentCount;
    }

    struct Comment {
        uint256 id;
        address commenter;
        string content;
        uint256 timestamp;
    }

    event TweetCreated(uint256 id, address author, string content, uint256 timestamp);
    event TweetLiked(address liker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);
    event TweetUnliked(address unliker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);
    event TweetRetweet(address retweeter, address tweetAuthor, uint256 tweetId, uint256 newRetweetCount);
    event CommentCreated(uint256 tweetId, uint256 commentId, address commenter, string content, uint256 timestamp);

    uint16 public MAX_TWEET_LENGTH = 200;

    mapping(address => Tweet[]) public tweets;
    address[] public tweetAuthors;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "YOU ARE NOT OWNER");
        _;
    }

    function changeTweetLength(uint16 newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH = newTweetLength;
    }

    function createTweet(string memory _tweet) public {
        require(bytes(_tweet).length <= MAX_TWEET_LENGTH, "MAX TWEET LENGTH IS NOT MORE THAN 200 CHARACTERS");
        
        uint256 tweetId = tweets[msg.sender].length;
        Tweet storage newTweet = tweets[msg.sender].push();

        newTweet.id = tweetId;
        newTweet.author = msg.sender;
        newTweet.content = _tweet;
        newTweet.timestamp = block.timestamp;
        newTweet.likes = 0;

        // If this is the first tweet of the author, add them to the tweetAuthors array
        if (tweetId == 0) {
            tweetAuthors.push(msg.sender);
        }

        emit TweetCreated(newTweet.id, newTweet.author, newTweet.content, newTweet.timestamp);
    }

    function toggelLikeTweet(address author, uint256 id) external {
        require(tweets[author].length > id, "TWEET DOES NOT EXIST");
        Tweet storage tweet = tweets[author][id];
        
        if (tweet.likers[msg.sender]) {
            tweet.likes--;
            tweet.likers[msg.sender] = false;
            emit TweetUnliked(msg.sender, author, id, tweet.likes);
        } else {
            tweet.likes++;
            tweet.likers[msg.sender] = true;
            emit TweetLiked(msg.sender, author, id, tweet.likes);
        }
    }

    function retweet(address author, uint256 id) external {
        require(tweets[author].length > id, "TWEET DOES NOT EXIST");
        Tweet storage tweet = tweets[author][id];
        tweet.retweets++;
        emit TweetRetweet(msg.sender, author, id, tweet.retweets);
    }

    function addComment(address author, uint256 id, string memory _comment) public {
        require(bytes(_comment).length <= MAX_TWEET_LENGTH, "MAX COMMENT LENGTH IS NOT MORE THAN 200 CHARACTERS");

        Tweet storage tweet = tweets[author][id];
        uint256 commentId = tweet.commentCount;
        Comment storage newComment = tweet.comments[commentId];

        newComment.id = commentId;
        newComment.commenter = msg.sender;
        newComment.content = _comment;
        newComment.timestamp = block.timestamp;

        tweet.commentCount++;

        emit CommentCreated(id, commentId, newComment.commenter, newComment.content, newComment.timestamp);
    }

    function getComments(address author, uint256 id) public view returns (Comment[] memory) {
        Tweet storage tweet = tweets[author][id];
        Comment[] memory comments = new Comment[](tweet.commentCount);

        for (uint256 i = 0; i < tweet.commentCount; i++) {
            Comment storage comment = tweet.comments[i];
            comments[i] = Comment(comment.id, comment.commenter, comment.content, comment.timestamp);
        }

        return comments;
    }

    function getUserTweets() public view returns (PublicTweet[] memory) {
        uint256 tweetCount = tweets[msg.sender].length;
        PublicTweet[] memory publicTweets = new PublicTweet[](tweetCount);
        
        for (uint256 i = 0; i < tweetCount; i++) {
            Tweet storage tweet = tweets[msg.sender][i];
            publicTweets[i] = PublicTweet(tweet.id, tweet.author, tweet.content, tweet.timestamp, tweet.likes, tweet.likers[msg.sender], tweet.retweets, tweet.commentCount);
        }
        
        return publicTweets;
    }

    function getAllTweets() public view returns (PublicTweet[] memory) {
        uint256 allTweetsCount = 0;
        for (uint256 i = 0; i < tweetAuthors.length; i++) {
            allTweetsCount += tweets[tweetAuthors[i]].length;
        }

        PublicTweet[] memory publicTweets = new PublicTweet[](allTweetsCount);
        uint256 index = 0;

        for (uint256 i = 0; i < tweetAuthors.length; i++) {
            address author = tweetAuthors[i];
            for (uint256 j = 0; j < tweets[author].length; j++) {
                Tweet storage tweet = tweets[author][j];
                publicTweets[index] = PublicTweet(tweet.id, tweet.author, tweet.content, tweet.timestamp, tweet.likes, tweet.likers[msg.sender], tweet.retweets, tweet.commentCount);
                index++;
            }
        }
        
        return publicTweets;
    }
}
