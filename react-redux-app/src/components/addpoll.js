import React from "react";
import { handleAddPoll } from "../actions/polls";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AddPoll() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });
  const [question, setQuestion] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(
      handleAddPoll({
        question,
        ...options,
      })
    );
  };
  const handleInputChange = ({ target }) => {
    const { value, name } = target;
    setOptions({
      ...options,
      [name]: value,
    });
  };
  const isDisabled = () => {
    return (
      question === "" ||
      question.a === "" ||
      question.b === "" ||
      question.c === "" ||
      question.d === ""
    );
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 5 }}>What is your question?</h3>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        name='question'
        className='input'
        type='text'
      />

      <h3>What are the options?</h3>

      <label className='label' htmlFor='a'>
        A.
      </label>
      <input
        value={options.a}
        onChange={handleInputChange}
        name='a'
        className='input'
        id='a'
        type='text'
      />

      <label className='label' htmlFor='b'>
        B.
      </label>
      <input
        value={options.b}
        onChange={handleInputChange}
        name='b'
        className='input'
        id='b'
        type='text'
      />

      <label className='label' htmlFor='c'>
        C.
      </label>
      <input
        value={options.c}
        onChange={handleInputChange}
        name='c'
        className='input'
        id='c'
        type='text'
      />

      <label className='label' htmlFor='d'>
        D.
      </label>
      <input
        value={options.d}
        onChange={handleInputChange}
        name='d'
        className='input'
        id='d'
        type='text'
      />

      <button className='btn' type='submit' disabled={isDisabled()}>
        Submit
      </button>
    </form>
  );
}
