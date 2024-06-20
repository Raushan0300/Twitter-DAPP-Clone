import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { WalletContext } from "../../WalletContext";
import LoaderDialog from "../LoaderDialog/LoaderDialog";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import CommentIcon from "@mui/icons-material/Comment";
import { handleSolidityFunctions } from "../../SolidityFunctions";
import CommentsPage from "../CommentsPage/CommentsPage";

const Profile = () => {
  const { currentAccount } = useContext(WalletContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentView, setCurrentView] = useState({
    view: "profile",
    author: "",
    id: "",
  });

  const getUserTweets = async () => {
    setIsLoading(true);
    await handleSolidityFunctions("getUserTweets").then((allTweets) => {
      setPosts(allTweets);
    });
    setIsLoading(false);
  };

  const handleLike = async (author, tweetId) => {
    setIsLoading(true);
    await handleSolidityFunctions("toggelLikeTweet", [author, tweetId]).then(
      () => {
        getUserTweets();
      }
    );
    setIsLoading(false);
  };

  const handleRetweet = async (author, tweetId) => {
    setIsLoading(true);
    await handleSolidityFunctions("retweet", [author, tweetId]).then(() => {
      getAllTweets();
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getUserTweets();
  }, []);

  const handleCommentClick = (author, id) => {
    setCurrentView({ view: "comments", author, id });
  };
  if (currentView.view === "comments") {
    return (
      <CommentsPage
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    );
  }

  return (
    <div className="profileMainContainer">
      <div className="profileAddress">
        <span>User Address:</span>{" "}
        {currentAccount.slice(0, 4) + "..." + currentAccount.slice(-4)}
      </div>
      <div className="profileTotalPosts">
        <span>Total Posts:</span> {posts.length}
      </div>
      {posts.map((post, id) => {
        return (
          <div
            className="feedPost"
            key={id}>
            <div className="feedPostTop">
              <div className="feedPostAuthorName">
                {post.author.slice(0, 2) + "..." + post.author.slice(-3)}
              </div>
              <div className="feedPostTime">
                {new Date(Number(post.timestamp) * 1000).toLocaleDateString()}
              </div>
            </div>
            <div className="feedPostContent">{post.content}</div>
            <div className="feedPostBorder"></div>
            <div className="feedPostBottom">
              <div
                className="feedPostBottomAlignContainer"
                onClick={() => {
                  handleLike(post.author, post.id);
                }}>
                {post.likedBySender ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
                {post.likes.toString()}
              </div>
              <div
                className="feedPostBottomAlignContainer"
                onClick={() => {
                  handleRetweet(post.author, post.id);
                }}>
                <RepeatIcon style={{ cursor: "pointer" }} />
                {post.retweets.toString()}
              </div>
              <div
                className="feedPostBottomAlignContainer"
                onClick={() => handleCommentClick(post.author, post.id)}>
                <CommentIcon style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        );
      })}
      {isLoading && <LoaderDialog />}
    </div>
  );
};

export default Profile;
