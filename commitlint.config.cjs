const ALLOWED_TYPES = ['feat', 'fix', 'docs', 'style', 'refactor', 'chore', 'design'];

module.exports = {
  rules: {
    'type-enum': [0],
    'type-case': [0],
    'type-empty': [0],
    'subject-empty': [0],
    'subject-full-stop': [0],
    'header-max-length': [0],
    'validate-type-enum': [2, 'always'],
    'validate-type-case': [2, 'always'],
    'validate-type-empty': [2, 'always'],
    'validate-subject-empty': [2, 'always'],
    'validate-subject-full-stop': [2, 'always'],
    'validate-header-max-length': [2, 'always'],
    'body-format-check': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'validate-type-empty': ({ type }) => [
          !!type,
          `❌ type은 필수입니다. 사용 가능한 type: ${ALLOWED_TYPES.join(', ')}`,
        ],

        'validate-type-enum': ({ type }) => [
          !type || ALLOWED_TYPES.includes(type),
          `❌ type은 다음 중 하나여야 합니다: ${ALLOWED_TYPES.join(', ')}`,
        ],

        'validate-type-case': ({ type }) => [
          !type || type === type.toLowerCase(),
          '❌ type은 소문자여야 합니다.',
        ],

        'validate-subject-empty': ({ subject }) => [
          !!subject,
          '❌ subject(제목)은 비어있으면 안 됩니다.',
        ],

        'validate-subject-full-stop': ({ subject }) => [
          !subject || !subject.endsWith('.'),
          '❌ 제목은 마침표(.)로 끝나면 안 됩니다.',
        ],

        'validate-header-max-length': ({ header }) => [
          !header || header.length <= 100,
          `❌ 커밋 헤더는 100자를 넘으면 안 됩니다. (현재 ${header?.length}자)`,
        ],

        'body-format-check': ({ raw }) => {
          if (!raw) return [true];

          const lines = raw.split('\n');

          if (lines.length > 1) {
            if (lines[1].trim() !== '') {
              return [false, '❌ 제목과 본문 사이에 빈 줄이 필요합니다.'];
            }

            const invalidLine = lines
              .slice(2)
              .find(line => line.trim() && !line.trim().startsWith('- '));

            if (invalidLine) {
              return [
                false,
                `❌ 본문의 각 줄은 '- '로 시작해야 합니다. 문제 있는 줄: "${invalidLine.trim()}"`,
              ];
            }
          }

          return [true];
        },
      },
    },
  ],
};
