import React, { useState } from 'react';
import { GetLanguageFromParameter, ReadLanguageData } from './languageloader.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageHeaderItem = () => {
    const Lang = GetLanguageFromParameter();
    const LangData = ReadLanguageData(Lang);
    console.log(LangData.header);
    const menuClasses = [
        'navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse',
        'navbar-collapse d-sm-inline-flex flex-sm-row-reverse collapse show',
    ];
    const [state, setState] = useState({ ariaExpanded: false });
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <a className="navbar-brand" href={`/${Lang}/`}>
                        {LangData.title}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={state.ariaExpanded}
                        aria-label="Toggle navigation"
                        onClick={() => setState({ ariaExpanded: !state.ariaExpanded })}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={menuClasses[Number(state.ariaExpanded)]}>
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href={`/${Lang}/`}>
                                    {LangData.header.index}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href={`/${Lang}/new?players=3`}>
                                    {LangData.header.add3}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href={`/${Lang}/new?players=4`}>
                                    {LangData.header.add4}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href={`/${Lang}/user`}>
                                    {LangData.header.admin_player}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default PageHeaderItem;
