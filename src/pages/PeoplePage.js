import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PeoplePage.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPeople } from "../actions/peopleActions";
import { Person } from "../components/Person";
import { CssTextField, ColorButton } from "./PageStyles";

// Redux state is now in the props of the component
const PeoplePage = ({ dispatch, pending, people, error }) => {
  const [InputText, setInputText] = useState({ name: "" });
  console.log("global state ->", people);
  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  const handleInputText = (event) => {
    console.log(event.target.value);
    setInputText({ name: event.target.value });
  };

  const handlePostClicked = async () => {
    try {
      await axios.post("http://localhost:2018/api/people", InputText);
      // .then(res => {
      //   console.log('res-->', res)
      //   return console.log(res)
      // })
      setInputText({ name: "" });
      dispatch(fetchPeople());
    } catch (error) {
      if (!InputText.name) {
        alert("이름을 입력해주세요.");
      } else {
        alert("이미 동일한 이름이 있습니다. 다른 이름으로 입력해주세요.");
      }
    }
  };

  const handleDeletePersonClicked = async (name, id) => {
    await axios.delete(`http://localhost:2018/api/people/${id}`).then((res) => {
      return alert(`${name}님이 삭제되었습니다.`);
    });
    dispatch(fetchPeople());
  };

  const renderPeople = () => {
    if (pending) return <p>Loading people...</p>;
    if (error) return <p>Unable to display people.</p>;
    return people.map((person, idx) => (
      <div className="peopleList" key={person._id}>
        <div className="person">
          <Person person={person.name} />
        </div>
        <button
          className="deletePersonBtn"
          onClick={() => handleDeletePersonClicked(person.name, person._id)}
        >
          DELETE
        </button>
      </div>
    ));
  };

  return (
    <div className="allPeopleSide">
      <div className="allPeopleTitle">All People List</div>

      <div className="addPeopleSection">
        <CssTextField
          className="nameInput"
          value={InputText.name}
          onChange={handleInputText}
          label="Name"
          fullWidth
          helperText="Enter your team members."
        />

        <ColorButton fullWidth onClick={handlePostClicked}>
          Add People!
        </ColorButton>
      </div>

      <section>{renderPeople()}</section>
    </div>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state) => ({
  pending: state.people.pending,
  people: state.people.people,
  error: state.people.error
});

PeoplePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired
};

// Connect Redux to React
export default connect(mapStateToProps)(PeoplePage);
