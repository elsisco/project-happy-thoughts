import React, { useState } from 'react'
import { LIKES_URL } from '../utils/commons'

const HeartButton = ({
  thoughtId,
  thought,
  fetchThoughts,
  fetchDisplayedThoughts,
}) => {
  const [yourLikes, setYourLikes] = useState(
    JSON.parse(localStorage.getItem(thoughtId)) + 0,
  )

  const onLikesIncrease = () => {
    fetch(LIKES_URL(thoughtId), {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        fetchThoughts()
        fetchDisplayedThoughts()
        setYourLikes((value) => value + 1)
        localStorage.setItem(thoughtId, JSON.stringify(yourLikes + 1)) // Could not make this work properly without adding + 1. Isn't the previous line supposed to add + 1 to yourLikes?
      }, [])
  }

  return (
    <div className="heart-likes-container">
      {yourLikes === 0 && (
        <button
          className={
            thought.hearts === 0 ? 'heart-button' : 'heart-button liked'
          }
          onClick={() => onLikesIncrease(thought._id)}>
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </button>
      )}
      {yourLikes > 0 && (
        <button
          className="heart-button blue"
          onClick={() => onLikesIncrease(thought._id)}>
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </button>
      )}
      <div className="likes-text"> x {thought.hearts}</div>
    </div>
  )
}

export default HeartButton
