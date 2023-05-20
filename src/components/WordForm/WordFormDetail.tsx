import React, { ChangeEvent, useState, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import WordInput from './WordInput'
import styles from './WordForm.module.scss'
import { crawlingWord } from '../../apis/word'

interface WordFormProps {
    bookInfo: {
        startLang: string,
        endLang: string
    },
    words: {
        word: string,
        meaning: string,
        currMeaning: string[]
    },
    setWords: React.Dispatch<React.SetStateAction<{
        word: string,
        meaning: string,
        currMeaning: string[]
    }>>
}

function WordFormDetail({
    bookInfo,
    words,
    setWords
}: WordFormProps) {
    const [errorCaption, setErrorCaption] = useState('');

    // 포커스 이동
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // 정규식
    const validateInput = (inputValue: string, startLang: string): string => {
        if (!inputValue) {
            return '';
        }
        if (startLang === 'korean' && !/^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(inputValue)) {
            return '한글로 입력해 주세요.';
        } else if (startLang === 'english' && !/^[a-zA-Z]+$/.test(inputValue)) {
            return '영어로 입력해 주세요.';
        }
        return '';
    };

    /** 핸들링 함수 */
    // 단어 검색
    const handleSearch = async () => {
        if (bookInfo.startLang === 'korean') {
            const currMeaning = await crawledWord('ko', words.word);
            if (currMeaning && currMeaning.length > 0) {
                setWords(prevWords => ({
                    ...prevWords,
                    currMeaning: currMeaning,
                }));
            } else {
                setWords(prevWords => ({
                    ...prevWords,
                    currMeaning: [],
                }));
            }
        } else if (bookInfo.startLang === 'english') {
            const currMeaning = await crawledWord('en', words.word);
            if (currMeaning && currMeaning.length > 0) {
                setWords(prevWords => ({
                    ...prevWords,
                    currMeaning: currMeaning,
                }));
            } else {
                setWords(prevWords => ({
                    ...prevWords,
                    currMeaning: [],
                }));
            }
        }
    };

    // 의미 추가
    const handleMeaningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWords(prevWords => ({
            ...prevWords,
            meaning: e.target.value
        }));
    };
    const handleAddMeaning = () => {
        if (words.meaning.trim() !== '') {
            setWords(prevWords => ({
                ...prevWords,
                currMeaning: [words.meaning, ...prevWords.currMeaning],
                meaning: ''
            }));
        }
    };

    // 의미 삭제
    const handleDeleteMeaning = (index: number) => {
        setWords(prevWords => {
            const updatedMeanings = [...prevWords.currMeaning];
            updatedMeanings.splice(index, 1);
            return {
                ...prevWords,
                currMeaning: updatedMeanings
            };
        });
    };

    /** API 연결 */
    // 단어 크롤링 API
    const crawledWord = async (lang: string, searchWord: string) => {
        try {
            const response = await crawlingWord(lang, searchWord);
            if (response.status === 204) {
                setErrorCaption('검색 결과가 없습니다.');
            }
            focusInput();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={styles.wordForm} onSubmit={e => e.preventDefault()}>
            <div className={styles.wordInputWrap}>
                <label htmlFor='word'>{bookInfo.startLang}</label>
                <WordInput
                    value={words.word}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    onChange={e => {
                        const inputValue = e.target.value;
                        const errorCaption = validateInput(
                            inputValue,
                            bookInfo.startLang,
                        );
                        setErrorCaption(errorCaption);
                        setWords(prev => ({ ...prev, word: inputValue }));
                    }}
                    placeholder='단어를 입력해 주세요 (필수)'
                    onClick={handleSearch}
                    errorCaption={errorCaption}
                />
            </div>
            <div className={styles.wordInputWrap}>
                <label htmlFor='meaning' className={styles.margin}>{bookInfo.endLang}</label>
                <input
                    type='text'
                    placeholder='의미를 입력해 주세요 (필수)'
                    value={words.meaning}
                    ref={inputRef}
                    onChange={handleMeaningChange}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddMeaning();
                        }
                    }}
                />

                <ul className={styles.meanList}>
                    {words.currMeaning.map((word, index) => (
                        <li key={index} className={styles.meanItem}>
                            <p>{word}</p>
                            <div>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={() => handleDeleteMeaning(index)}
                                >
                                    <IoIosCloseCircleOutline className={styles.icon} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    );
}

export default WordFormDetail;