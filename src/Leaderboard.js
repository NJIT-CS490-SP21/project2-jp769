import React from 'react';
import PropTypes from 'prop-types';
import './Leaderboard.css';

function Leaderboard(props) {
  Leaderboard.propTypes = {
    arr: PropTypes.instanceof(Array).isRequired,
    name: PropTypes.string.isRequired,
  };

  const { arr, name } = props;
  const usernames = {};
  let data = '';
  console.log(arr, name, props);

  // Object.keys(table).forEach((key) => { usernames[table[key][0]] = table[key][1]; });
  // for (const i in table) {
  //   usernames[table[i][0]] = table[i][1];
  // }

  const keys = Object.keys(usernames);

  data = keys.map((x, index) => (x === props.name ? (
    <tr className="current_user" key={index}>
      <td>
        {x}
        {' '}
        (you)
      </td>
      <td>{usernames[x]}</td>
    </tr>
  ) : (
    <tr key={index}>
      <td>{x}</td>
      <td>{usernames[x]}</td>
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
