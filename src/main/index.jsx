import React from 'react';

const Index = () => {
    fetch('./config/language')
        .then(r => r.text())
        .then(lang => {
            location.href = `/${lang}/`;
        });
    return <div></div>;
};

export default Index;
