import * as React from "react"
import AvatarIcon from "../AvatarIcon/AvatarIcon"
import { formatLikes } from "../../utils/format"
import "./Tweet.css"

export default function Tweet({ tweet }) {
  const [likes, setLikes] = React.useState(tweet.likes);
  const [collapse, setCollapse] = React.useState(false);

  const handleLikesOnClick = () => {
    setLikes(likes + 1);
  }

  const handleCollapse = () => {
    setCollapse(!collapse);
  }

  return (
    <div className="tweet" data-tweet-id={tweet.id}>
      <div className="tweet-avatar">
        <AvatarIcon />
      </div>

      <div className="tweet-content">
        <TweetUserInfo name={tweet.name} handle={tweet.handle} handleCollapse={handleCollapse} />
        <p className={collapse ? "collapse" : "tweet-text"}>{tweet.text}</p>
        <TweetFooter handleLikesOnClick={handleLikesOnClick} numComments={tweet.comments} numRetweets={tweet.retweets} numLikes={likes} />
      </div>
    </div>
  )
}

export function TweetUserInfo({ name, handle, handleCollapse }) {
  return (
    <div className="tweet-user-info">
      <div className="meta">
        <p className="name">{name}</p>
        <span className="handle">@{handle}</span>
        <span className="dot">•</span>
        <span className="ts">1 min</span>
      </div>
      <i className="fa fa-angle-down" onClick={handleCollapse}></i>
    </div>
  )
}

export function TweetFooter({ handleLikesOnClick, numComments, numRetweets, numLikes }) {
  return (
    <div className="tweet-footer">
      <span>
        <i className="fa fa-comment"></i>
        {numComments || 0}
      </span>
      <span>
        <i className="fa fa-retweet"></i>
        {numRetweets || 0}
      </span>
      <span>
        <i className="fas fa-heart" onClick={handleLikesOnClick}></i>
        {formatLikes(numLikes ?? 0)}
      </span>
      <span>
        <i className="fa fa-envelope"></i>
      </span>
    </div>
  )
}
