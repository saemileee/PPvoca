import React, { useState } from 'react';
import styles from './WordListStyle.module.scss';
import { MdArrowBackIosNew } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";

//단어장 제목, 단어 목록
const WordListComponents = () => {
	return (
		<div>
			<div className='head'>
				<MdArrowBackIosNew />
				<span>단어장 제목</span>
				<GiSettingsKnobs />
				<CiMenuKebab />
				<AiOutlinePlus />
			</div>
			<div className='search'>
				<input placeholder='검색어를 입력해 주세요!' />
				<IoSearchOutline />
			</div>
			<div className='body'>
				<div>전체 Count</div>
				<hr />
				<div>
					<div>
						id. (YYYY년 MM월 DD일 HH:mm)      발바닥, 휴지통
					</div>
					<div>
						WORD
					</div>
					<div>
						MEANING
					</div>
				</div>
			</div>

		</div>
	);
}

export default WordListComponents;
