import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export type TypeFourProngsQuiz = {
	bookOption: string[];
	numberOption: number;
	wordStatusOption: number[];
};

// 단어장 추가
export const getFourProngsQuiz = async (
	token: string,
	formData: TypeFourProngsQuiz,
) => {
	const { bookOption, numberOption, wordStatusOption } = formData;

	const response = await axios.get(
		`${baseUrl}/quiz/four-prong?bookId=${bookOption.join(
			',',
		)}&number=${numberOption}&status=${wordStatusOption.join(',')}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response;
};
