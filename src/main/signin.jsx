import React from 'react';
import toast from '../toast';
import { GetLanguageFromParameter, ReadLanguageData } from '../languageloader';
import '../css/signin.css';
import { SetTitle } from './title';
import PageHeaderItem from '../header';
import PageFooterItem from '../footer';

const SignInItem = () => {
    const Lang = GetLanguageFromParameter();
    const LangData = ReadLanguageData(Lang);
    const [SignInRequestData, SetSignInRequestData] = React.useState({ id: '', password: '' });
    const IDFormItem = React.createElement('section', null, [
        React.createElement(
            'label',
            {
                htmlFor: 'inputID',
            },
            LangData.content.signin.caption.id
        ),
        React.createElement('input', {
            id: 'inputID',
            type: 'text',
            pattern: '^([a-zA-Z0-9_]{1,})$',
            onChange: e => {
                const CurrentData = SignInRequestData;
                CurrentData.id = e.target.value;
                SetSignInRequestData(CurrentData);
            },
        }),
    ]);
    const PasswordFormItem = React.createElement('section', null, [
        React.createElement(
            'label',
            {
                htmlFor: 'inputPassword',
            },
            LangData.content.signin.caption.password
        ),
        React.createElement('input', {
            id: 'inputPassword',
            type: 'password',
            onChange: e => {
                const CurrentData = SignInRequestData;
                CurrentData.password = e.target.value;
                SetSignInRequestData(CurrentData);
            },
        }),
    ]);
    const SendButton = React.createElement(
        'section',
        null,
        React.createElement('input', {
            type: 'submit',
            value: LangData.content.signin.caption.submit,
            onClick: () => {
                fetch('./api/signin', {
                    method: 'POST',
                    body: JSON.parse(SignInRequestData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            sessionStorage.setItem('token', data.access_token);
                            const qp = new URLSearchParams(location.search);
                            location.href = qp.has('after') ? qp.get('after') : `/${Lang}/`;
                        });
                    } else toast.error(LangData.content.signin.caption.failed_signin);
                });
            },
        })
    );
    SetTitle(Lang, 'signin');
    return (
        <div>
            <PageHeaderItem />
            <main>
                <div className="container">
                    <h3>{LangData.content.signin.title}</h3>
                    <div className="signin_form">
                        {IDFormItem}
                        {PasswordFormItem}
                        {SendButton}
                        <p>{LangData.content.signin.caption.forgot_password}</p>
                    </div>
                </div>
            </main>
            <PageFooterItem />
        </div>
    );
};

export default SignInItem;
