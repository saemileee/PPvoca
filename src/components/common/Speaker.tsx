import React from "react";
import styles from '../WordList/WordListStyle.module.scss';
import { RxSpeakerLoud } from "react-icons/rx";

interface Props {
    text: string;
    lang: string;
}

const Speaker = ({ text, lang }: Props) => {
    const speak = () => {
        const message = new SpeechSynthesisUtterance();
        message.text = text;
        message.rate = 1.2;
        if(lang === "korean") {
            message.voice = window.speechSynthesis.getVoices().find((voice) => voice.name === 'Google 한국의') as SpeechSynthesisVoice;
        } else if (lang === "english") {
            message.voice = window.speechSynthesis.getVoices().find((voice) => voice.name === 'Google UK English Female') as SpeechSynthesisVoice;
        }
        window.speechSynthesis.speak(message);
    };

    return (
        <div className={styles.speaker} onClick={speak}><RxSpeakerLoud /></div>
    )
};

export default Speaker;