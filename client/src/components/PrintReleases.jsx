import React, { Fragment } from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';

export const PrintReleases = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className='d-none d-print-flex flex-column container m-3'>
            
            <h1 className='my-5'>Release Totals: {props.releases.length}</h1>
                    <Table className='table-hover table-striped table-responsive'>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    ADC
                                </th>
                                <th>
                                    Bed Space
                                </th>
                                <th>
                                    Release Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {props.releases.map((s, key) => {
                            return (<tr key={key}>
                                <td>{s.name}</td>
                                <td>{s.adc}</td>
                                <td>{s.bedSpace}</td>
                                <td>{s.releaseDate}</td>
                            </tr>)
                           })}
                        </tbody>
                    </Table>            
          
             
            
        </div>
    );
});
