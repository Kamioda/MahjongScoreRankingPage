import lang from '../language.json'
import { ReadLanguageData } from '../languageloader';

export const SetTitle = (Language, Page) => {
    const LangData = ReadLanguageData(Language)
    const SubTitle = LangData.subtitles.find(s => s.page === Page);
    document.title = SubTitle == null ? LangData.title : (`${SubTitle.text} - ${LangData.title}`);
};
