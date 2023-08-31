import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageFooterItem = () => {
    const CurrentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="container">
                <p>Copyright &copy; {CurrentYear === 2023 ? '2023' : `2023-${CurrentYear}`} Kamioda.</p>
            </div>
        </footer>
    );
};

export default PageFooterItem;
