import { useParams } from 'react-router-dom';
import lang from './language.json';

export const GetLanguageFromParameter = () => {
    const urlParams = useParams();
    return urlParams.language ?? lang.default;
};

export const ReadLanguageData = Language => {
    const data = lang.contents.find(c => c.lang === Language);
    return data ?? ReadLanguageData(lang.default);
};
