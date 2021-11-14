import React, { useState, useEffect } from 'react'
import words from './words'
import letters from './letters'
import LetterDisplay from './LetterDisplay'
import styled from 'styled-components'
import sadface from '../../../assets/sad-face.png'
import happyface from '../../../assets/happy-face.png'

const NUMBER_OF_MISSING_LETTERS = 2;

const GameContent = styled.div` 
    display : flex;
    flex-direction : column;
    // justify-content: center;
    // align-items : center;
    height : 40%;
    width : 60%;
    gap : 20px;
    font-size : 20px;
    background: #EFFFFF;;
    opacity : 0.8;
    border-radius : 25px;
`;


const WordDisplay = styled.div` 
    display : flex;
    flex-direction : row;
    padding-top : 5%;
    // height : 10%;
    
    justify-content: center;
    

`;

const LetterDisplayPortion = styled.div` 
    display : flex;
    flex-direction : row;
    align-items: space-evenly;
    justify-content: space-evenly;
    height: 60px;
    // background-color:#9CD5FF;
    opcaity : 1.5;
    ;
`;

const Face = styled.img`
  width: 100px;
  height: 100px;
`;

function Game({setShowConfetti}) {
    const [randomNumList, setRandomNumList] = useState([]);
    const [correctWord, setCorrectWord] = useState([]);
    const [incompleteWord, setIncompleteWord] = useState([]);
    const [guessLetters, setGuessLetters] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [isWrongLetter, setIsWrongLetter] = useState(false);
    const [game, setGame] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect( ()=> {
        if(game <2){
            setData();
            
        }
        else{
            setIsSolved(true);
        }
       
        console.log("game??",game);
        if(game === 2){
            console.log("hello")
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false)
                // setIsSolved(false)
            }
            , 5000) 
        }
    }, [game])

    const setData = () => {
        let wordlist = [...words];
        let randomNumber = Math.floor((Math.random() * wordlist.length));
        setCorrectWord(wordlist[randomNumber].split(''));

        var arr = [];
        while (arr.length < NUMBER_OF_MISSING_LETTERS) {
            var r = Math.floor(Math.random() * wordlist[randomNumber].length);
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        setRandomNumList(arr);
        console.log("array : ",arr);

        var missing = wordlist[randomNumber].split('');
        console.log("missing : ",missing);
        arr.forEach(randomNumber =>
            missing[randomNumber] = " _ "
        )
        setIncompleteWord(missing);

        let lettersnew = [...letters];
        var guessArray = [];
        arr.forEach(index => guessArray.push(wordlist[randomNumber][index]))
        while (guessArray.length < 8) {
            r = Math.floor(Math.random() * lettersnew.length);
            if (guessArray.indexOf(lettersnew[r]) === -1) guessArray.push(lettersnew[r]);
        }
        guessArray.sort(() => Math.random() - 0.5);
        setGuessLetters(guessArray);
    }

    const handleClick = (letter) => {
        setIsWrongLetter(false);
        var word = [...incompleteWord];
        randomNumList.forEach(index => {
            if (letter === correctWord[index]) {
                word[index] = letter;
            }
        })
        if (JSON.stringify(word) === JSON.stringify(incompleteWord))
            setIsWrongLetter(true);
        if (JSON.stringify(word) === JSON.stringify(correctWord)){
            setIsSolved(true)
            // setShowConfetti(true);
            // setTimeout(() => { ; }, 6500)
            setTimeout(() => {
                // setShowConfetti(false)
                setGame(game+1)
                setIsSolved(false)

            }
            , 2000)  
        
        }

      
        
        setIncompleteWord(word);
    }

    return (
        <GameContent>
            <WordDisplay>
                {console.log(incompleteWord)}
                {incompleteWord.map((letter, index) => (
                   
                    <p key={index}>{letter.toUpperCase()} &nbsp;</p>
                ))}
            </WordDisplay>
            {!isSolved ?
                <LetterDisplayPortion>
                    {guessLetters.map((letter, index) => (
                        <LetterDisplay key={index} letter={letter} handleClick={handleClick} />
                    )
                    )}
                </LetterDisplayPortion>
                :
                <>
                    <p>Congratulations!</p>
                </>
            }
            {isWrongLetter ?
                // message.error('Oops Wrong choice', 1)
                <div>
                     <Face src={sadface}/>
                </div>
               
                : 
                <div>
                    <Face src={happyface}/>
                </div>}

            {isSolved ? 
            <>
            {/* <Progress type="circle" percent={100} width={80} />  */}
            
            </>
            
            : " "
            }
        </GameContent>
    )
}



export default Game
