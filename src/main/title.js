import { ReadLanguageData } from '../languageloader.js';

export const SetTitle = (Language, Page) => {
    const LangData = ReadLanguageData(Language);
    const SubTitle = LangData.subtitles[Page];
    document.title = SubTitle == null ? LangData.title : `${SubTitle.text} - ${LangData.title}`;
};
