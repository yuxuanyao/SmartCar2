import React from 'react';

export default ({ info }) => (
  <table style={{ margin: '20px' }}>
    <thead>
      <tr>
        <th>Vehicle ID</th>
        <th>Vehicle Make</th>
        <th>Vehicle Model</th>
        <th>Vehicle Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{info.id}</td>
        <td>{info.make}</td>
        <td>{info.model}</td>
        <td>{info.year}</td>
      </tr>
    </tbody>
  </table>
);
