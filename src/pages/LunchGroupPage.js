import React, { useState } from "react";
import axios from "axios";
import "./LunchGroup.css";
import { ColorButton } from "./PageStyles";

// [state 이름 , setState] useState(0 =초기값)
// GroupNum <- setGroupNum(1)
const LunchGroup = () => {
  const [GroupNum, setGroupNum] = useState(0);
  const [MinimumNum, setMinimumNum] = useState(0);
  const [Groups, setGroups] = useState([]);
  const handleOnChangeGroupNum = (event) => {
    setGroupNum(event.target.value);
  };
  const handleOnChangeMinimumNum = (event) => {
    setMinimumNum(event.target.value);
  };

  const handleGroupingClicked = async () => {
    try {
      await axios
        .get(`http://localhost:2018/api/random?group=${GroupNum}&minimum=${MinimumNum}`)
        .then((res) => {
          return setGroups(res.data);
        });
    } catch (error) {
      alert("그룹을 생성할 수 없습니다. 올바른 숫자를 입력해주세요.");
    }
  };

  // const randomColorGenerator = () => {
  //   let x = Math.floor(Math.random() * 256)
  //   let y = Math.floor(Math.random() * 256)
  //   let z = Math.floor(Math.random() * 256)
  //   let bgColor = 'rgb(' + x + ',' + y + ',' + z + ')'
  //   // console.log(bgColor)
  //   return bgColor
  // }

  const randomColorGenerator = () => {
    let colors = ["#E1EBF7", "#EFE5EE", "#FCDFD7", "#D4ECDC", "#FBF9D9", "#EEF1F6"];
    let rand = Math.floor(Math.random() * colors.length);

    return colors[rand];
  };

  return (
    <div className="lunchGroupSide">
      <div className="randomLunchGroupsTitle">Random Lunch Groups</div>
      <p>Enter the number of groups and minimum people you want to create.</p>

      <form className="makeGroupsForm">
        <input
          className="numInput"
          placeholder="Groups"
          type="number"
          onChange={handleOnChangeGroupNum}
        />
        <input
          className="numInput"
          placeholder="Minimum"
          type="number"
          onChange={handleOnChangeMinimumNum}
        />
        <ColorButton fullWidth className="makeGroupBtn" onClick={handleGroupingClicked}>
          Make Groups!
        </ColorButton>
      </form>

      {Groups.map((group, idx) => (
        <div className="groupSection" key={idx} style={{ backgroundColor: randomColorGenerator() }}>
          <h1 className="groupTitle">Group {idx + 1}</h1>
          {group.map((person, idx) => (
            <div className="groupPeople" key={idx}>
              {person.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default LunchGroup;
