import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

//단어 가져오기
export const getWords = async (token: string) => {
    const response = await axios.get(`${baseUrl}/words`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
//

//선택 단어 삭제
export const deleteWords = async (token: string, id: string) => {
    const response = await axios.delete(`${baseUrl}/words/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}
//

//patch
//모든 단어 미분류

//

//모든 단어 외움

//

//모든 단어 헷갈림

//

//get
//미분류 단어 필터링

//

//외운 단어 필터링

//

//헷갈린 단어 필터링

//

