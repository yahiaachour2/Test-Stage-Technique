import React from 'react';

import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className='sidebar flex-1'>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
