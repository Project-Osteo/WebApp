import React from 'react';
import Pagination from 'react-bootstrap/Pagination'


const ItemsPage = ({itemsPorPagina, totalItems, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPorPagina); i++) {
        pageNumbers.push(
            <Pagination.Item key={i} onClick={paginate(i)}>
            {i}
            </Pagination.Item>,
        );
    }

    console.log(pageNumbers);
    console.log(totalItems);
    console.log(itemsPorPagina);

    return(
        <Pagination>
        <Pagination.First />
        <Pagination.Prev />

        {pageNumbers}

        <Pagination.Next />
        <Pagination.Last />
        </Pagination>
    )
}

export default ItemsPage