import './FeedPage.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Twitter from '../../utils/TwitterContract.json';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TwitterContractAddress } from '../../config';
import {Spinner} from 'react-activity';
import 'react-activity/dist/Spinner.css';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [tweetText, setTweetText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAllTweets = async()=>{
    try {
      const { ethereum } = window;
      if(ethereum){
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);

        let allTweets = await TwitterContract.getAllTweets();
        setPosts(allTweets);
        console.log(allTweets);
      } else{
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTweet = async(event, tweet)=>{
    event.preventDefault();
    setIsLoading(true);
    try {
      const { ethereum } = window;
      if(ethereum){
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const TwitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);

        let tx = await TwitterContract.createTweet(tweet);
        await tx.wait();
        getAllTweets();
      } else{
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(()=>{
    getAllTweets();
  },[]);

  return (
    <div className='feedMainContainer'>
        <form className='feedPostForm' onSubmit={(event)=>{createTweet(event, tweetText)}}>
            <textarea placeholder="What's on your mind?" className='postInput' value={tweetText} onChange={(e)=>{setTweetText(e.target.value)}}></textarea>
            {!isLoading?<button type='submit' className="postButton">Post</button>:<button className="postButton" disabled><Spinner color="#fff" size={12} speed={1} animating={true} /></button>}
        </form>
        {posts.map((post, id) => {
            return (
                <div className='feedPost' key={id}>
                    <div className='feedPostTop'>
                    <div className='feedPostAuthorName'>{post.author}</div>
                    <div className='feedPostTime'>{post.timestamp.toString()}</div>
                    </div>
                    <div className='feedPostContent'>{post.content}</div>
                    <div className='feedPostBottom'>
                        <div className='feedPostBottomAlignContainer'>
                        <FavoriteBorderIcon />
                        {post.likes.toString()}
                        </div>
                        <RepeatIcon />
                        <EditIcon />
                        <DeleteIcon />
                    </div>
                </div>
            )
        })}
    </div>
  )
};

export default FeedPage;