const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TwitterContract", function () {
    let TwitterContract, twitterContract, owner, addr1, addr2;

    beforeEach(async function () {
        TwitterContract = await ethers.getContractFactory("TwitterContract");
        [owner, addr1, addr2] = await ethers.getSigners();
        twitterContract = await TwitterContract.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await twitterContract.owner()).to.equal(owner.address);
        });

        it("Should set the max tweet length correctly", async function () {
            expect(await twitterContract.MAX_TWEET_LENGTH()).to.equal(200);
        });
    });

    describe("Tweet creation", function () {
        it("Should create a tweet", async function () {
            const tweetContent = "Hello, world!";
            // const currentTimestamp = Math.floor(Date.now() / 1000);
            await twitterContract.createTweet(tweetContent);
            const tweet = await twitterContract.getTweet(0);

            expect(tweet.content).to.equal(tweetContent);
            expect(tweet.author).to.equal(owner.address);
            // expect(tweet.timestamp.toNumber()).to.be.within(currentTimestamp - 60, currentTimestamp + 60); // Within a 60-second range
        });

        it("Should revert when tweet is too long", async function () {
            const longTweet = "a".repeat(201);
            await expect(twitterContract.createTweet(longTweet)).to.be.revertedWith("MAX TWEET LENGTH IS NOT MORE THAN 10 CHARACTER");
        });
    });

    describe("Tweet liking", function () {
        beforeEach(async function () {
            await twitterContract.createTweet("Hello, world!");
        });

        it("Should like a tweet", async function () {
            await expect(twitterContract.connect(addr1).likeTweet(owner.address, 0))
                .to.emit(twitterContract, 'TweetLiked')
                .withArgs(addr1.address, owner.address, 0, 1);

            const tweet = await twitterContract.getTweet(0);
            expect(tweet.likes).to.equal(1);
        });

        // it("Should revert if tweet does not exist", async function () {
        //     const nonExistentTweetId = 1;
        //     await expect(twitterContract.connect(addr1).likeTweet(owner.address, nonExistentTweetId)).to.be.revertedWith("TWEET DOES NOT EXISTS");
        // });
    });

    describe("Tweet unliking", function () {
        beforeEach(async function () {
            await twitterContract.createTweet("Hello, world!");
            await twitterContract.connect(addr1).likeTweet(owner.address, 0);
        });

        it("Should unlike a tweet", async function () {
            await expect(twitterContract.connect(addr1).unlikeTweet(owner.address, 0))
                .to.emit(twitterContract, 'TweetUnliked')
                .withArgs(addr1.address, owner.address, 0, 0);

            const tweet = await twitterContract.getTweet(0);
            expect(tweet.likes).to.equal(0);
        });

        it("Should revert if tweet has no likes", async function () {
            await twitterContract.connect(addr1).unlikeTweet(owner.address, 0);
            await expect(twitterContract.connect(addr1).unlikeTweet(owner.address, 0)).to.be.revertedWith("TWEET HAS NO LIKES");
        });
    });

    describe("Owner functions", function () {
        it("Should change max tweet length by owner", async function () {
            await twitterContract.changeTweetLength(150);
            expect(await twitterContract.MAX_TWEET_LENGTH()).to.equal(150);
        });

        it("Should revert change max tweet length by non-owner", async function () {
            await expect(twitterContract.connect(addr1).changeTweetLength(150)).to.be.revertedWith("YOU ARE NOT OWNER");
        });
    });
});
