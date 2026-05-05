module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'chore', 'design'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-format-check': [2, 'always'],
  },
  plugins: [
    {
      rules: {
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