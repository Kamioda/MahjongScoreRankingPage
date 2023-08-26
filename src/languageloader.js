import lang from './language.json'

export const ReadLanguageData = (Language) => {
    const data = lang.contents.find(c => c.lang === Language);
    return data ?? ReadLanguageData(lang.default);
}