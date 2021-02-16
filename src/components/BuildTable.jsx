import React from 'react';

const BuildTable = (props) => {
    const borderRad = '5px';
    const makeTableHeader = () => {
        return props.colName.map((a, i) => {
            if (i === 0) {
                return <th key={ i } style={ { borderRadius: `${borderRad} 0 0 0`, } }>  { a }</th>
            } else if (i == props.colName.length - 1) {
                return <th key={ i } style={ { borderRadius: `0 ${borderRad} 0 0`, } }>  { a }</th>
            } else {
                return <th key={ i }>  { a }</th>
            }
        })
    }
    const makeTableRows = () => {
        return props.rows.map((rows, i) => {
            return (
                <tr>
                    <td>{ rows }</td>
                    { props.columns.map((col, num) => {
                        return (
                            <td dangerouslySetInnerHTML={ { __html: col[i] } }></td>
                        )
                    }) }
                </tr>)
        })
    }




    return (
        <table>
            <thead>
                <tr >
                    { makeTableHeader() }
                </tr>
            </thead>
            <tbody>
                { makeTableRows() }
            </tbody>
        </table>
    );
}

export default BuildTable;
