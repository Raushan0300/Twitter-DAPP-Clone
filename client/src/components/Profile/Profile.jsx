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

const Profile = () => {
  const {currentAccount} = useContext(WalletContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserTweets = async()=>{
    setIsLoading(true);
    try {
      const { ethereum } = window;
      if(ethereum){
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);

        let allTweets = await TwitterContract.getUserTweets();
        setPosts(allTweets);
        // console.log(allTweets);
      } else{
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    };
    setIsLoading(false);
  };

  const handleLike=async(author, tweetId)=>{
    setIsLoading(true);
    try{
      const { ethereum} = window;
      if(ethereum){
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);

        let likeTx = await TwitterContract.toggelLikeTweet(author, tweetId);
        await likeTx.wait();
        getUserTweets();
      } else{
        console.log('Ethereum object not found');
      }
    } catch(error){
      console.log(error);
    };
    setIsLoading(false);
  }

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
                        <RepeatIcon style={{cursor:'pointer'}} />
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