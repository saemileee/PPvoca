import React, { useState } from 'react';

type UseInputReturnType = [
	string,
	(e: React.ChangeEvent<HTMLInputElement>) => void,
];

function useInput(initialValue = ''): UseInputReturnType {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value);
	};

	return [value, handleChange];
}

export default useInput;
