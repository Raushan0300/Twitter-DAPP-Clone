import './FeedPage.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from 'react';
import 'react-activity/dist/Spinner.css';
import LoaderDialog from '../LoaderDialog/LoaderDialog';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { handleSolidityFunctions } from '../../SolidityFunctions';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [tweetText, setTweetText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeTweet=(event)=>{
    if(event.target.value.length>200){
      return;
    } else{
      setTweetText(event.target.value);
    }
  }

  const getAllTweets = async()=>{
    setIsLoading(true);
    await handleSolidityFunctions('getAllTweets').then((allTweets)=>{
      setPosts(allTweets);
    });
    setIsLoading(false);
  };

  const createTweet = async(event, tweet)=>{
    event.preventDefault();
    setIsLoading(true);
    await handleSolidityFunctions('createTweet', [tweet]).then(()=>{
      getAllTweets();
    });
    setIsLoading(false);
  };

  useEffect(()=>{
    getAllTweets();
  },[]);

  const handleLike=async(author, tweetId)=>{
    setIsLoading(true);
    await handleSolidityFunctions('toggelLikeTweet', [author, tweetId]).then(()=>{
      getAllTweets();
    });
    setIsLoading(false);
  };

  const handleRetweet=async(author, tweetId)=>{
    setIsLoading(true);
    await handleSolidityFunctions('retweet', [author, tweetId]).then(()=>{
      getAllTweets();
    })
  }

  return (
    <div className='feedMainContainer'>
        <form className='feedPostForm' onSubmit={(event)=>{createTweet(event, tweetText)}}>
            <textarea placeholder="What's on your mind?" className='postInput' value={tweetText} onChange={(e)=>{handleOnChangeTweet(e)}}></textarea>
            <button type='submit' className="postButton">Post</button>
        </form>
        {posts.map((post, id) => {
            return (
                <div className='feedPost' key={id}>
                    <div className='feedPostTop'>
                    <div className='feedPostAuthorName'>{post.author}</div>
                    <div className='feedPostTime'>{new Date((Number(post.timestamp))*1000).toLocaleDateString()}</div>
                    </div>
                    <div className='feedPostContent'>{post.content}</div>
                    <div className='feedPostBorder'></div>
                    <div className='feedPostBottom'>
                        <div className='feedPostBottomAlignContainer' onClick={()=>{handleLike(post.author, post.id)}}>
                        {post.likedBySender?<FavoriteIcon style={{color:'red'}} />:<FavoriteBorderIcon />}
                        {post.likes.toString()}
                        </div>
                        <div className='feedPostBottomAlignContainer' onClick={()=>{handleRetweet(post.author, post.id)}}>
                        <RepeatIcon style={{cursor:'pointer'}} />
                        {post.retweets.toString()}
                        </div>
                        <CommentIcon style={{cursor:'pointer'}} />
                        {/* <EditIcon /> */}
                        {/* <DeleteIcon /> */}
                    </div>
                </div>
            )
        })}
        {isLoading&&<LoaderDialog />}
    </div>
  )
};

export default FeedPage;