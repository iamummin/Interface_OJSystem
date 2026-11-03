const express = require('express');
const router = express.Router();

const dummyProblems = [
  {
    problemId: 1001,
    title: "DFS와 BFS",
    difficulty: "실버 2",
    category: "그래프",
    isSolved: true
  },
  {
    problemId: 1002,
    title: "연결 요소의 개수",
    difficulty: "실버 2",
    category: "그래프",
    isSolved: false
  }
];

router.get('/', (req, res) => {
  res.json({ problems: dummyProblems });
});

module.exports = router;
