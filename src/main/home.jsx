import React, { useState, createElement } from 'react';
import { SetTitle } from './title.js';
import { GetLanguageFromParameter, ReadLanguageData } from '../languageloader.js';
import PageHeaderItem from '../header.jsx';
import PageFooterItem from '../footer.jsx';
import '../css/ranking.css';
const ordinalNumberLastOneToThree = [ 'st', 'nd', 'rd' ];

/**
 *
 * @param {number[]} Arr
 * @returns
 */
const CalcAverage = Arr => (Arr.length === 0 ? 0 : Math.round(Arr.reduce((sum, i) => sum + i, 0) / Arr.length));

const GetRanking = () => {
    return fetch('/api/records').then(response => response.json());
};

const IndexItem = () => {
    const lang = GetLanguageFromParameter();
    SetTitle(lang, 'index');
    const LangData = ReadLanguageData(lang);
    const [records, setRecords] = useState([]);
    GetRanking().then(data => {
        const WriteRecord = Object.keys(data).map(i => {
            return { 
                id: i, 
                name: data[i].name, 
                score: CalcAverage(data[i].score) 
            }
        });
        WriteRecord.sort((a, b) => b.score - a.score);
        setRecords(WriteRecord);
    })
    .catch(er => console.error(er.message));
    let index = 0;
    const Data =
        records.length === 0 ? (
            <p>{LangData.content.index.record_not_found}</p>
        ) : (
            records.map(i => {
                const rankingText = index % 10 >= 3 || (index % 100 >= 10 && index % 100 <= 12) ? `${index + 1}th` : `${index + 1}${ordinalNumberLastOneToThree[index % 10]}`;
                index++;
                return (
                    <article className="ranking" key={i.id}>
                        <section>
                            <h5>{rankingText}</h5>
                            <p>
                                {i.name} @{i.id}
                            </p>
                        </section>
                        <section>
                            <p className="score">{i.score}</p>
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
