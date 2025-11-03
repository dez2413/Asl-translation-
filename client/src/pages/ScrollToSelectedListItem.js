import React, { useEffect, useRef } from 'react';

const ScrollToSelectedListItem = ({ isChosen, children }) => {
  const listItemRef = useRef(null);  useEffect(() => {
    if (isChosen && listItemRef.current) {
      listItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isChosen]); 
  // we can also keep the deps array empty so it will only run once on component mount  return <span ref={listItemRef}>{children}</span>;
};export default ScrollToSelectedListItem;

//https://medium.com/@himanshuain5567/smoothly-scroll-a-selected-list-item-into-view-in-react-using-useref-hook-4bdb84932255
//https://legacy.reactjs.org/docs/lists-and-keys.html 