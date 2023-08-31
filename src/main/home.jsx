import React, { useState, createElement } from 'react';
import { SetTitle } from './title.js';
import { GetLanguageFromParameter, ReadLanguageData } from '../languageloader.js';
import PageHeaderItem from '../header.jsx';
import PageFooterItem from '../footer.jsx';

/**
 *
 * @param {number[]} Arr
 * @returns
 */
const CalcAverage = Arr => (Arr.length === 0 ? 0 : Math.round(Arr.reduce((sum, i) => sum + i, 0) / Arr.length));

const GetRanking = () => {
    return fetch('./api/records').then(response => response.json());
};

const IndexItem = () => {
    const lang = GetLanguageFromParameter();
    SetTitle(lang, 'index');
    const LangData = ReadLanguageData(lang);
    const [records, setRecords] = useState(undefined);
    GetRanking().then(data => {
        setRecords(data);
    });
    const Data =
        records == null ? (
            <p>{LangData.content.index.record_not_found}</p>
        ) : (
            Object.keys(records).map(i => {
                return (
                    <article className="ranking" key={i}>
                        <section>
                            <p>
                                {records[i].name}@{i}
                            </p>
                        </section>
                        <section>
                            <p className="score">{CalcAverage(records[i].score)}</p>
                        </section>
                    </article>
                );
            })
        );
    return (
        <div className="container">
            <PageHeaderItem />
            <main>
                <section>
                    <h3>{LangData.content.index.title}</h3>
                </section>
                {createElement('section', {}, Data)}
            </main>
            <PageFooterItem />
        </div>
    );
};

export default IndexItem;
