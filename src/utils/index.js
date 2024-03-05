import sentences from '../data/sentences';


export const randomSentence = () => {
    return sentences[Math.floor(Math.random()*sentences.length)];
}