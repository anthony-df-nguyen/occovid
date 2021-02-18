import React from 'react';

const BuildTable = (props) => {
    const borderRad = '5px';
    const makeTableHeader = () => {
        return props.colName.map((a, i) => {
            if (i === 0) {
                return <th key={ i } style={ { borderRadius: `${borderRad} 0 0 0`, width: props.col1forcedwidth,} } >  { a }</th>
            } else if (i == props.colName.length - 1) {
                return <th key={ i } style={ { borderRadius: `0 ${borderRad} 0 0`, } }>  { a }</th>
            } else {
                return <th key={ i }>  { a }</th>
            }
        })
    }

    const makeTableRows = () => {
        return props.rows.map((rows, i) => {
            //If the row is the last row
            if (i == props.rows.length - 1) {
                return (
                    <tr key={ i }>
                        <td style={ { borderRadius: `0 0 0 ${borderRad}`, } } dangerouslySetInnerHTML={ { __html: rows } }></td>
                        { props.columns.map((col, num) => {
                            //If the column is the last column on the last row
                            if (num == props.columns.length - 1 && i == props.rows.length - 1) {
                                return (
                                    <td key={ num } dangerouslySetInnerHTML={ { __html: col[i] } } style={ { borderRadius: `0 0  ${borderRad} 0`, } }></td>
                                )
                            } else {
                                return (
                                    <td key={ num } dangerouslySetInnerHTML={ { __html: col[i] } }></td>
                                )
                            }

                        }) }
                    </tr>)
            } else {
                return (
                    <tr key={ i }>
                        <td dangerouslySetInnerHTML={ { __html: rows}}>{  }</td>
                        { props.columns.map((col, num) => {
                            if (num == props.columns.length - 1 && i == props.rows.length - 1) {
                                //If its the last row on the last column
                                return (
                                    <td key={ num } dangerouslySetInnerHTML={ { __html: col[i] } } style={ { borderRadius: `0 0  ${borderRad} 0`, } }></td>
                                )
                            } else {
                                return (
                                    <td key={ num } dangerouslySetInnerHTML={ { __html: col[i] } }></td>
                                )
                            }

                        }) }
                    </tr>)
            }
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
