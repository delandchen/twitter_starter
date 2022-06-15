import * as React from "react"
import AvatarIcon from "../AvatarIcon/AvatarIcon"

export default function TweetInput(props) {
  return (
    <div className="tweet-textarea">
      <AvatarIcon />

      <textarea className={props.tweetInputClass} onBlur={props.handleOnBlur} onFocus={props.handleOnFocus} onChange={props.handleOnChange} value={props.value}
        name="new-tweet-input" type="text" placeholder="What's Happening?"></textarea>

      {props.tweetInputClass == "expanded" ? <SmileIcon /> : <ImageIcon />}
    </div>
  )
}

export const SmileIcon = () => <i className="fas fa-smile"></i>
export const ImageIcon = () => <i className="fas fa-image"></i>
