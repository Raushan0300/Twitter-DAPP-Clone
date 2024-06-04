import React from 'react';
import './LoaderDialog.css';
import {Spinner} from 'react-activity';
import 'react-activity/dist/Spinner.css';

const LoaderDialog = () => {
  return (
    <div>
        <div className='loaderDialog'>
            <Spinner color='#fff' size={32} speed={1} animating={true} />
        </div>
    </div>
  )
}

export default LoaderDialog