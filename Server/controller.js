const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/Person");

const router = express.Router();

// /api/people
// find all ppl
router.get("/people", async (req, res) => {
  try {
    const people = await Person.find();
    return res.status(200).json(people);
  } catch (error) {
    // console.error(error)
    return res.status(400).send(`Error: ${error}`);
  }
});

// get random group
// * /api/random?group=groupNum&minimum=pplNum
router.get("/random", async (req, res) => {
  const groupNum = Number(req.query.group);
  const minimumPpl = Number(req.query.minimum);

  if (groupNum === undefined || minimumPpl === undefined) {
    return res.status(400).json("그룹 수와 최소 인원을 입력해주세요");
  }

  if (!Number(groupNum) || !Number(minimumPpl)) {
    return res.status(400).json("숫자만 입력 가능합니다");
  }

  try {
    const people = await Person.find();
    const pplLen = people.length;
    if (pplLen < groupNum * minimumPpl) {
      return res
        .status(400)
        .send("그룹 생성이 불가능합니다. 그룹 수와 최소인원을 다시 입력해주세요.");
    }

    // ! grouping randomly
    // const makeGroups = (k, s, m) => {
    //   // exit conditions
    //   if (k === 0) return []
    //   if (k === 1) return s >= m ? [[s]] : []

    //   // reduce with recursion
    //   const groups = []
    //   for (let i = m; i <= s; i++) {
    //     makeGroups(k - 1, s - i, m).forEach(tail => groups.push([i, ...tail]))
    //   }
    //   return groups[Math.floor(Math.random() * groups.length)]
    // }

    const makeGroups = (k, s, m) => {
      // * k = 그룹 수, s = 총 인원, m = 최소인원
      const result = [];

      for (let i = 0; i < k; i++) {
        result.push(m);
      }

      const restPeople = s - k * m;
      for (let j = 0; j < restPeople; j++) {
        result[Math.floor(Math.random() * k)] += 1;
      }

      return result;
    };

    // ! ppl arrange randomly
    const makeRandomPeopleList = (ppl) => {
      for (let i = ppl.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = ppl[i];
        ppl[i] = ppl[j];
        ppl[j] = temp;
      }
      return ppl;
    };

    // ! make a result
    const makeResult = () => {
      const result = [];
      const groups = makeGroups(groupNum, pplLen, minimumPpl);
      const randomPeopleList = makeRandomPeopleList(people);

      groups.forEach((v) => {
        result.push(randomPeopleList.splice(0, v));
      });

      return result;
    };

    return res.status(200).json(makeResult());
  } catch (error) {
    return res.status(400).send(`Error: ${error}`);
  }
});

module.exports = router;
