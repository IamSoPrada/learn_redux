import * as React from "react";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const users = useSelector((state) => state.users);
  const sorted = Object.keys(users)
    .map((id) => {
      const { name, avatarUrl, polls } = users[id];
      return {
        id,
        name,
        avatarUrl,
        polls: polls.length,
        answers: users[id].answers.length,
      };
    })
    .sort((a, b) => b.polls + b.answers - (a.polls + a.answers));

  return (
    <ul>
      {sorted.map((user) => (
        <li className='user' key={user.id}>
          <img src={user.avatarUrl} alt={`Avatar for ${user.name}`} />
          <div>
            <h1>{user.name}</h1>
            <p>{user.polls}</p>
            <p>{user.answers}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
