import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Leaderboard from "./Leaderbord";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./dashboard";
import AddPoll from "./addpoll";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authedUser === null);
  React.useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  const store = useSelector((store) => store);
  console.log("Store: ", store);
  return (
    <Router>
      <div className='container'>{loading === true ? null : <AddPoll />}</div>
    </Router>
  );
}
