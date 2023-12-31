import React from 'react';
import { GetLanguageFromParameter, ReadLanguageData } from '../languageloader.js';
import PageHeaderItem from '../header.jsx';
import '../css/add.css';
import PageFooterItem from '../footer.jsx';
import CheckSignIn from '../checkSignIn.js';
import toast from '../toast.js';

const createMainForm = (playerCount, Lang) => {
    const [records, setRecords] = React.useState(
        [...Array(playerCount)].map(() => ({ player_id: '', player_id_cache: '', invalid: false, score: 0 }))
    );
    const LangData = ReadLanguageData(Lang);
    const createPlayerIDInputForm = formCountIndex => {
        return React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.add.caption.player_id),
            React.createElement('dd', null, [
                React.createElement(
                    'section',
                    null,
                    React.createElement('input', {
                        type: 'text',
                        pattern: '^([a-zA-Z0-9_]{1,})$',
                        onChange: e => {
                            const Data = records;
                            if (!records[formCountIndex].invalid) Data[formCountIndex].player_id = e.target.value;
                            records[formCountIndex].player_id_cache = e.target.value;
                            setRecords(Data);
                        },
                    })
                ),
                React.createElement(
                    'section',
                    {
                        className: 'checkbox_field',
                    },
                    [
                        React.createElement('input', {
                            type: 'checkbox',
                            id: `$cpu_check_${formCountIndex}`,
                            onChange: e => {
                                const Data = records;
                                Data[formCountIndex].player_id = e.target.checked
                                    ? 'CPU'
                                    : Data[formCountIndex].player_id_cache;
                                Data[formCountIndex].invalid = e.target.checked;
                                setRecords(Data);
                            },
                        }),
                        React.createElement(
                            'label',
                            {
                                htmlFor: `$cpu_check_${formCountIndex}`,
                            },
                            'CPU'
                        ),
                    ]
                ),
            ]),
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
                        Data[formCountIndex].score = parseInt(e.target.value);
                        setRecords(Data);
                    },
                })
            ),
        ]);
    };
    const createInputForms = formCountIndex => {
        return React.createElement(
            'section',
            {
                className: 'input_form',
            },
            [
                React.createElement(
                    'span',
                    { className: 'form_title' },
                    `${LangData.content.add.caption.player} ${formCountIndex + 1}`
                ),
                createPlayerIDInputForm(formCountIndex),
                createScoreInputForm(formCountIndex),
            ]
        );
    };
    const forms = [];
    const AddAction = async () => {
        const Records = records.filter(i => i.player_id !== 'CPU');
        const RequestObj = {};
        Records.forEach(i => {
            RequestObj[i.player_id] = i.score;
        });
        await fetch('./api/score', {
            method: 'POST',
            body: JSON.stringify(RequestObj),
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(result => {
            if (result.status === 200) toast.success(LangData.content.add.response.success, Lang.response.success);
            else toast.error(result.statusText, Lang.response.fail);
        });
    };
    for (let i = 0; i < playerCount; i++) forms.push(createInputForms(i));
    return React.createElement('div', { className: 'container' }, [
        React.createElement('h3', null, LangData.content.add.title),
        React.createElement('p', null, LangData.content.add.caption.if_cpu),
        React.createElement('section', null, forms),
        React.createElement('input', { type: 'submit', value: LangData.content.add.caption.submit, onClick: AddAction }),
    ]);
};

const addRecordFormItem = () => {
    const Language = GetLanguageFromParameter();
    CheckSignIn(Language);
    const params = new URLSearchParams(location.search);
    if (!params.has('players')) location.href = `/${Language}/`;
    const playerCount = parseInt(params.get('players'));
    if (playerCount !== 3 && playerCount !== 4) location.href = `/${Language}/`;
    return (
        <div>
            <PageHeaderItem />
            <main>{createMainForm(playerCount, Language)}</main>
            <PageFooterItem />
        </div>
    );
};

export default addRecordFormItem;
