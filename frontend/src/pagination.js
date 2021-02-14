import React from 'react';

const ItemsPage = ({itemsPorPagina, totalItems, paginate, current}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPorPagina); i++) {
        pageNumbers.push(i);
    }

    console.log(pageNumbers);
    console.log(totalItems);
    console.log(itemsPorPagina);

    return(
        <nav>
            <ul className='pagination'>
            {pageNumbers.map(number => (
                <li key={number} className={`page-item ${current === number ? "active" : ""}`}>
                    <a onClick={() => paginate(number)} className='page-link'>
                        {number}
                    </a>
                </li>                
            ))}
            </ul>
        </nav>
    )
}

export default ItemsPage