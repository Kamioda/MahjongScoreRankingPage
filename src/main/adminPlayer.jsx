import React from 'react';
import { GetLanguageFromParameter, ReadLanguageData } from '../languageloader.js';
import { SetTitle } from './title.js';
import PageHeaderItem from '../header.jsx';
import '../css/admin_player.css';
import PageFooterItem from '../footer.jsx';
import CheckSignIn from '../checkSignIn.js';

const Sections = {
    impl: {
        title: text => React.createElement('h4', null, text),
    },
    createNewAccount: LangData => {
        const [newAccountState, setNewAccountState] = React.useState({ id: '', name: '', privilege: 1 });
        const InputIDSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.newuser.id),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    pattern: '^([a-zA-Z0-9_]{1,})$',
                    onChange: e => {
                        const Data = newAccountState;
                        Data.id = e.target.value;
                        setNewAccountState(Data);
                    },
                })
            ),
        ]);
        const InputNameSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.newuser.name),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    onChange: e => {
                        const Data = newAccountState;
                        Data.name = e.target.value;
                        setNewAccountState(Data);
                    },
                })
            ),
        ]);
        const SelectPrivilegeSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.newuser.privilege),
            React.createElement(
                'dd',
                null,
                React.createElement(
                    'select',
                    {
                        onChange: e => {
                            const Data = newAccountState;
                            Data.privilege = e.target.value;
                            setNewAccountState(Data);
                        },
                    },
                    LangData.content.admin_player.listdata.privilege.map(p =>
                        React.createElement('option', { value: p.level }, p.text)
                    )
                )
            ),
        ]);
        const sendButton = React.createElement('input', {
            type: 'submit',
            value: LangData.content.admin_player.caption.submit,
            onClick: () => {
                fetch('./api/account', {
                    method: 'POST',
                    body: JSON.parse(newAccountState),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
            },
        });
        return React.createElement('section', { className: 'admin' }, [
            Sections.impl.title(LangData.content.admin_player.caption.newuser.title),
            InputIDSection,
            InputNameSection,
            SelectPrivilegeSection,
            sendButton,
        ]);
    },
    deleteAccount: LangData => {
        const [targetAccount, setTargetAccount] = React.useState('');
        const InputIDSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.delete_user.id),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    pattern: '^([a-zA-Z0-9_]{1,})$',
                    onChange: e => {
                        setTargetAccount(e.target.value);
                    },
                })
            ),
        ]);
        const sendButton = React.createElement('input', {
            type: 'submit',
            value: LangData.content.admin_player.caption.submit,
            onClick: () => {
                fetch(`./api/account/${targetAccount}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
            },
        });
        return React.createElement('section', { className: 'admin' }, [
            Sections.impl.title(LangData.content.admin_player.caption.delete_user.title),
            InputIDSection,
            sendButton,
        ]);
    },
    changePassword: (LangData, UserInfo) => {
        const [requestBody, setRequestBody] = React.useState({ id: UserInfo.id, password: '' });
        const InputIDSection = React.createElement(
            'dl',
            {
                style: {
                    display: UserInfo.privilege === 0 ? 'block' : 'none',
                },
            },
            [
                React.createElement('dt', null, LangData.content.admin_player.caption.change_password.id),
                React.createElement(
                    'dd',
                    null,
                    React.createElement('input', {
                        type: 'text',
                        pattern: '^([a-zA-Z0-9_]{1,})$',
                        onChange: e => {
                            const Data = requestBody;
                            Data.id = e.target.value;
                            setRequestBody(Data);
                        },
                    })
                ),
            ]
        );
        const InputNewPasswordSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.change_password.password),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'password',
                    onChange: e => {
                        const Data = requestBody;
                        Data.password = e.target.value;
                        setRequestBody(Data);
                    },
                })
            ),
        ]);
        const sendButton = React.createElement('input', {
            type: 'submit',
            value: LangData.content.admin_player.caption.submit,
            onClick: () => {
                fetch(`./api/account/password`, {
                    method: 'PATCH',
                    body: JSON.parse(requestBody),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
            },
        });
        return React.createElement('section', { className: 'admin' }, [
            Sections.impl.title(LangData.content.admin_player.caption.change_password.title),
            InputIDSection,
            InputNewPasswordSection,
            sendButton,
        ]);
    },
    changePrivilege: LangData => {
        const [requestBody, setRequestBody] = React.useState({ id: '', privilege: 1 });
        const InputIDSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.change_privilege.id),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    pattern: '^([a-zA-Z0-9_]{1,})$',
                    onChange: e => {
                        const Data = requestBody;
                        Data.id = e.target.value;
                        setRequestBody(Data);
                    },
                })
            ),
        ]);
        const SelectPrivilegeSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.change_privilege.privilege),
            React.createElement(
                'dd',
                null,
                React.createElement(
                    'select',
                    {
                        onChange: e => {
                            const Data = requestBody;
                            Data.privilege = e.target.value;
                            setRequestBody(Data);
                        },
                    },
                    LangData.content.admin_player.listdata.privilege.map(p =>
                        React.createElement('option', { value: p.level }, p.text)
                    )
                )
            ),
        ]);
        const sendButton = React.createElement('input', {
            type: 'submit',
            value: LangData.content.admin_player.caption.submit,
            onClick: () => {
                fetch('./api/account/privilege', {
                    method: 'PATCH',
                    body: JSON.parse(requestBody),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
            },
        });
        return React.createElement('section', { className: 'admin' }, [
            Sections.impl.title(LangData.content.admin_player.caption.change_privilege.title),
            InputIDSection,
            SelectPrivilegeSection,
            sendButton,
        ]);
    },
    changeUserInfo: (LangData, currentAccountInfo) => {
        const [requestBody, setRequestBody] = React.useState({
            id: currentAccountInfo.id,
            name: currentAccountInfo.name,
        });
        const InputIDSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.change_user_info.id),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    pattern: '^([a-zA-Z0-9_]{1,})$',
                    defaultValue: requestBody.id,
                    onChange: e => {
                        const Data = requestBody;
                        Data.id = e.target.value;
                        setRequestBody(Data);
                    },
                })
            ),
        ]);
        const InputNameSection = React.createElement('dl', null, [
            React.createElement('dt', null, LangData.content.admin_player.caption.change_user_info.name),
            React.createElement(
                'dd',
                null,
                React.createElement('input', {
                    type: 'text',
                    defaultValue: requestBody.name,
                    onChange: e => {
                        const Data = requestBody;
                        Data.name = e.target.value;
                        setRequestBody(Data);
                    },
                })
            ),
        ]);
        const sendButton = React.createElement('input', {
            type: 'submit',
            value: LangData.content.admin_player.caption.submit,
            onClick: () => {
                fetch('./api/account', {
                    method: 'PATCH',
                    body: JSON.parse(requestBody),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
            },
        });
        return React.createElement('section', { className: 'admin' }, [
            Sections.impl.title(LangData.content.admin_player.caption.change_user_info.title),
            InputIDSection,
            InputNameSection,
            sendButton,
        ]);
    },
};

const PlayerAdminPageItem = () => {
    const lang = GetLanguageFromParameter();
    SetTitle(lang, 'admin_player');
    const LangData = ReadLanguageData(lang);
    const [currentAccountInfo, setCurrentAccountInfo] = React.useState({ id: 'kamioda', name: '神御田', privilege: 1 });
    CheckSignIn(lang).then(data => {
        if (data !== null) setCurrentAccountInfo(data);
    });
    return currentAccountInfo.privilege === 0
        ? React.createElement('div', { className: 'container' }, [
              PageHeaderItem(),
              React.createElement('main', null, [
                  Sections.createNewAccount(LangData),
                  Sections.deleteAccount(LangData),
                  Sections.changePassword(LangData, currentAccountInfo),
                  Sections.changePrivilege(LangData),
                  Sections.changeUserInfo(LangData, currentAccountInfo),
              ]),
          ])
        : React.createElement('div', { className: 'container' }, [
              PageHeaderItem(),
              React.createElement('main', null, [
                  Sections.changePassword(LangData, currentAccountInfo),
                  Sections.changeUserInfo(LangData, currentAccountInfo),
              ]),
              PageFooterItem(),
          ]);
};

export default PlayerAdminPageItem;
