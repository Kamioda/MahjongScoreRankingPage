import React from 'react';
import { GetLanguageFromParameter, ReadLanguageData } from '../languageloader';
import PageHeaderItem from '../header.jsx';

const createMainForm = (playerCount, Lang) => {
    const [records, setRecords] = React.useState([...Array(playerCount)].map(() => ({ player_id: '', score: 0 })));
    const LangData = ReadLanguageData(Lang);
    const createPlayerIDInputForm = formCountIndex => {
        return React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.add.caption.player_id),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    pattern: '^([a-zA-Z0-9_]{3,})$',
                    value: records[formCountIndex].player_id,
                    onChange: e => {
                        const Data = records;
                        Data[formCountIndex].player_id = e.target.value;
                        setRecords(Data);
                    },
                })
            ),
        ]);
    };
    const createScoreInputForm = formCountIndex => {
        return React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.add.caption.score),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'number',
                    onChange: e => {
                        const Data = records;
                        Data[formCountIndex].score = e.target.value;
                        setRecords(Data);
                    },
                })
            ),
        ]);
    };
    const createInputForms = formCountIndex => {
        return React.createElement('dl', null, [
            React.createElement('dt', null, `${LangData.content.add.caption.player} ${formCountIndex + 1}`),
            React.createElement('dd', null, [
                createPlayerIDInputForm(formCountIndex),
                createScoreInputForm(formCountIndex),
            ]),
        ]);
    };
    const forms = [];
    for (let i = 0; i < playerCount; i++) forms.push(createInputForms(i));
    return React.createElement('div', { className: 'container' }, [
        React.createElement('h1', null, LangData.content.add.title),
        React.createElement('p', null, LangData.content.add.caption.if_cpu),
        React.createElement('section', null, forms),
        React.createElement('input', { type: 'submit', value: LangData.content.add.caption.submit }),
    ]);
};

const addRecordFormItem = () => {
    const Language = GetLanguageFromParameter();
    const params = new URLSearchParams(location.search);
    if (!params.has('players')) location.href = `/${Language}/`;
    const playerCount = parseInt(params.get('players'));
    if (playerCount !== 3 && playerCount !== 4) location.href = `/${Language}/`;
    return (
        <div>
            <PageHeaderItem />
            {createMainForm(playerCount, Language)}
        </div>
    );
};

export default addRecordFormItem;
