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
    }

    struct PublicTweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        bool likedBySender;
        uint256 retweets;
    }

    event TweetCreated(uint256 id, address author, string content, uint256 timestamp);
    event TweetLiked(address liker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);
    event TweetUnliked(address unliker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);
    event TweetRetweet(address retweeter, address tweetAuthor, uint256 tweetId, uint256 newRetweetCount);

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

    function getUserTweets() public view returns (PublicTweet[] memory) {
        uint256 tweetCount = tweets[msg.sender].length;
        PublicTweet[] memory publicTweets = new PublicTweet[](tweetCount);
        
        for (uint256 i = 0; i < tweetCount; i++) {
            Tweet storage tweet = tweets[msg.sender][i];
            publicTweets[i] = PublicTweet(tweet.id, tweet.author, tweet.content, tweet.timestamp, tweet.likes, tweet.likers[msg.sender], tweet.retweets);
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
                publicTweets[index] = PublicTweet(tweet.id, tweet.author, tweet.content, tweet.timestamp, tweet.likes, tweet.likers[msg.sender], tweet.retweets);
                index++;
            }
        }
        
        return publicTweets;
    }
}
