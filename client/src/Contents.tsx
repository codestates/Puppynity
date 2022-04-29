import React, { useState } from 'react';
// import dummyContents from 'static/dummyContents';
import Content from './Components/Content';

function Contents() {
  // const [contentList, setContentList] = useState([...dummyContents]);
  return (
    <div className="contentForm_container">
      <ul className="contents">
        {/* {contentList.map((content) => (
          <a>
            <Content content={content} key={content.id} />
          </a>
        ))} */}
      </ul>
    </div>
  );
}
