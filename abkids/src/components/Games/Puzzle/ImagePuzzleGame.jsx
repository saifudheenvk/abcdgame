import React from 'react'
import Puzzle from 'react-image-puzzle'

const ImagePuzzleGame = ({ image, level, handlePuzzleDone, size }) => {
    return (
        <Puzzle
            image={image}
            size={size}
            level={level}
            onDone={handlePuzzleDone}
        />
    )
}

export default ImagePuzzleGame
