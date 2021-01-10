
import React, { useState } from 'react';

interface Props { 
  numItems: number,
  itemHeight: number,
  renderItem: any,
  windowHeight: number,
  onScrolledToBottom?: { () : void }
}    
const List = ({ numItems, itemHeight, renderItem, windowHeight, onScrolledToBottom } : Props) => {
    const [scrollTop, setScrollTop] = useState<number>(0);
  
    const innerHeight = numItems * itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      numItems - 1, // don't render past the end of the list
      Math.floor((scrollTop + windowHeight) / itemHeight)
    );
  
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(
        renderItem({
          index: i,
          style: {
            position: "absolute",
            top: `${i * itemHeight}px`,
            width: "100%"
          }
        })
      );
    }
  
    const onScroll = (e: any) => { 
      setScrollTop(e.currentTarget.scrollTop);
      const reachedBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (reachedBottom && onScrolledToBottom) {
        onScrolledToBottom()
      }
    }
  
    return (
      <div className="scroll" style={{ height: windowHeight, overflowY: "scroll" }} onScroll={onScroll}>
        <div
          className="inner"
          style={{ position: "relative", height: `${innerHeight}px` }}
        >
          {items}
        </div>
      </div>
    );
  };

  export default List