import React, { useEffect, useState } from 'react';
import './CommentsPage.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoaderDialog from '../LoaderDialog/LoaderDialog';
import { handleSolidityFunctions } from '../../SolidityFunctions';

const CommentsPage = (props) => {
    const {currentView, setCurrentView} = props;

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChangeComment=(event)=>{
      if(event.target.value.length>200){
        return;
      } else{
        setCommentText(event.target.value);
      }
    }

    const getAllComments = async()=>{
      setIsLoading(true);
      await handleSolidityFunctions('getComments', [currentView.author, currentView.id]).then((allComments)=>{
        setComments(allComments);
      });
      setIsLoading(false);
    };

    const createComment = async(event, comment)=>{
      event.preventDefault();
      setIsLoading(true);
      await handleSolidityFunctions('addComment', [currentView.author, currentView.id, comment]).then(()=>{
        getAllComments();
      });
      setIsLoading(false);
    };

    useEffect(()=>{
      getAllComments();
    },[]);
  return (
    <div className='commentsMainContainer'>
      <div className='commentsBackDiv'>
      <KeyboardBackspaceIcon onClick={()=>setCurrentView({ view: 'feed', author: '', id: '' })} style={{cursor:'pointer'}}/>
        </div>
      <form className='feedPostForm' onSubmit={(event)=>{createComment(event, commentText)}} style={{marginTop:'20px'}}>
            <textarea placeholder="Your opinion on this post" className='postInput' value={commentText} onChange={(e)=>{handleOnChangeComment(e)}}></textarea>
            <button type='submit' className="postButton">Comment</button>
        </form>
        {comments.map((comment, id) => {
            return (
                <div className='feedPost' key={id}>
                    <div className='feedPostTop'>
                    <div className='feedPostAuthorName'>{comment.commenter}</div>
                    <div className='feedPostTime'>{new Date((Number(comment.timestamp))*1000).toLocaleDateString()}</div>
                    </div>
                    <div className='feedPostContent'>{comment.content}</div>
                    <div className='feedPostBorder'></div>
                </div>
            )
        })}
        {isLoading&&<LoaderDialog />}
    </div>
  );
};

export default CommentsPage;