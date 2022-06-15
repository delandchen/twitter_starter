import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"

export default function TweetBox(props) {
  const [disabled, setDisabled] = React.useState(true);
  const [displayCharCount, setDisplayCharCount] = React.useState([false, "tweet-length"]);
  const [tweetInputClass, setTweetInputClass] = React.useState("");

  const handleOnFocus = () => {
    setTweetInputClass("expanded");
  }

  const handleOnBlur = (e) => {
    if (e.target.value.length == 0) {
      setTweetInputClass("");
    }
  }

  const handleOnTweetTextChange = (e) => {
    props.setTweetText(e.target.value);

    if (e.target.value.length > 0 && e.target.value.length <= 140) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }

    if (e.target.value.length > 0 && e.target.value.length <= 140) {
      setDisplayCharCount([true, "tweet-length"]);
    }
    else if (e.target.value.length > 0 && e.target.value.length > 140) {
      setDisplayCharCount([true, "tweet-length red"])
    }
    else {
      setDisplayCharCount([false, "tweet-length"]);
    }
  }

  const handleOnSubmit = () => {
    const newTweet = {
      id: props.tweets.length,
      name: props.userProfile.name,
      handle: props.userProfile.handle,
      text: props.tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
    }


    props.setTweets([...props.tweets, newTweet]);
    props.setTweetText("");
    props.userProfile.numTweets += 1;
  }

  return (
    <div className="tweet-box">
      <TweetInput tweetInputClass={tweetInputClass} value={props.tweetText}
        handleOnChange={handleOnTweetTextChange} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} />

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        {displayCharCount[0] ? <TweetCharacterCount className={displayCharCount[1]} tweetText={props.tweetText} /> : null}
        <TweetSubmitButton disabled={disabled} handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount(props) {
  return (
    <span className={props.className}>
      {140 - props.tweetText.length}</span>
  )
}

export function TweetSubmitButton(props) {
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button disabled={props.disabled} className="tweet-submit-button" onClick={props.handleOnSubmit}>Tweet</button>
    </div>
  )
}
