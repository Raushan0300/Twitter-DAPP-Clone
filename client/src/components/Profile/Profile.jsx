import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { WalletContext } from '../../WalletContext';
import LoaderDialog from '../LoaderDialog/LoaderDialog';
import { ethers } from 'ethers';
import { TwitterContractAddress } from '../../config';
import Twitter from '../../utils/TwitterContract.json';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleSolidityFunctions } from '../../SolidityFunctions';

const Profile = () => {
  const {currentAccount} = useContext(WalletContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserTweets = async()=>{
    setIsLoading(true);
    await handleSolidityFunctions('getUserTweets').then((allTweets)=>{
      setPosts(allTweets);
    });
    setIsLoading(false);
  };

  const handleLike=async(author, tweetId)=>{
    setIsLoading(true);
    await handleSolidityFunctions('toggelLikeTweet', [author, tweetId]).then(()=>{
      getUserTweets();
    });
    setIsLoading(false);
  };

  const handleRetweet=async(author, tweetId)=>{
    setIsLoading(true);
    await handleSolidityFunctions('retweet', [author, tweetId]).then(()=>{
      getAllTweets();
    });
    setIsLoading(false);
  };

  useEffect(()=>{
    getUserTweets();
  },[]);

  return (
    <div className='profileMainContainer'>
      <div className='profileAddress'><span>User Address:</span> {currentAccount}</div>
      <div className='profileTotalPosts'><span>Total Posts:</span> {posts.length}</div>
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
                        <EditIcon style={{cursor:'pointer'}} />
                        <DeleteIcon style={{cursor:'pointer'}} />
                    </div>
                </div>
            )
        })}
        {isLoading&&<LoaderDialog />}
    </div>
  )
};

export default Profile;