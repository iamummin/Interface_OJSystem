const express = require('express');
const router = express.Router();

// POST /api/submissions
router.post('/submissions', (req, res) => {
  const { problemId, language, source } = req.body;

  // 1. 필수 필드 존재 여부 검증
  if (problemId === undefined || !language || source === undefined) {
    return res.status(400).json({
      error: 'Invalid request: problemId, language, and source are required.'
    });
  }

  // 2. 언어 값 검증 (C, C++, Java, Python만 허용)
  const allowedLanguages = ['C', 'C++', 'Java', 'Python'];
  if (!allowedLanguages.includes(language)) {
    return res.status(400).json({
      error: 'Invalid language: Must be one of C, C++, Java, Python.'
    });
  }

  // 3. source 빈 문자열/공백 검증
  if (typeof source !== 'string' || source.trim() === '') {
    return res.status(400).json({
      error: 'Invalid source: Source code cannot be empty.'
    });
  }

  // 4. 2회차 요구사항에 맞춘 임시(Mock) 채점 결과 반환
  return res.json({
    submissionId: 1,
    status: 'AC'
  });
});
// 임시 제출 데이터 (추후 DB 조회 로직으로 교체 가능)
const dummySubmissions = [
  {
    submissionId: 1,
    userId: 1,
    problemId: 1000,
    language: 'Python',
    status: 'AC',
  },
  {
    submissionId: 2,
    userId: 1,
    problemId: 1001,
    language: 'C++',
    status: 'WA',
  },
];

async function getSubmissionsByUserId(userId) {
  return dummySubmissions.filter((item) => item.userId === userId);
}

// GET /api/submissions?userId=...
router.get('/submissions', async (req, res) => {
  try {
    const rawUserId = req.query.userId;

    // 1. 문자열이 엄격한 양의 정수 형식인지 확인
    if (typeof rawUserId !== 'string' || !/^\d+$/.test(rawUserId)) {
      return res.status(400).json({
        error: '올바른 userId가 필요합니다.',
      });
    }

    const userId = Number(rawUserId);

    // 2. 1 ~ 4,294,967,295 범위 검증
    if (!Number.isInteger(userId) || userId < 1 || userId > 4294967295) {
      return res.status(400).json({
        error: '올바른 userId가 필요합니다.',
      });
    }

    const submissions = await getSubmissionsByUserId(userId);
    return res.status(200).json({ submissions });
  } catch (err) {
    console.error('GET /submissions error:', err);
    return res.status(500).json({
      error: '제출 목록을 불러오지 못했습니다.',
    });
  }
});
module.exports = router;
