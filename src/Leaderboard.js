import React from 'react';
import PropTypes from 'prop-types';
import './Leaderboard.css';

function Leaderboard(props) {
  Leaderboard.propTypes = {
    arr: PropTypes.instanceOf(Array).isRequired,
    name: PropTypes.string.isRequired,
  };

  const { arr, name } = props;
  let data = '';

  const keys = Object.keys(arr);
  data = keys.map((x) => (arr[x][0] === name ? (
    <tr className="current_user" key={x}>
      <td>
        {arr[x][0]}
        {' '}
        (you)
      </td>
      <td>{arr[x][1]}</td>
    </tr>
  ) : (
    <tr key={x}>
      <td>{arr[x][0]}</td>
      <td>{arr[x][1]}</td>
    </tr>
  )));

  return (
    <div>
      {' '}
      <table>
        <thead>
          <tr>
            <th colSpan="2">Ranking Leaderboard</th>
          </tr>
          <tr>
            <th>Username</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
