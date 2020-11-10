// kebab-case
const idSelectorPattern = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/;
// kebab-case & CodeMirror*
const clsSelectorPattern = /^([_a-z]([-_a-z0-9]+)?$)|(CodeMirror)([-_a-z0-9]+)?$/;

module.exports = {
    extends: 'stylelint-config-standard',
    plugins: [
        'stylelint-scss',
        // 'stylelint-selector-bem-pattern',
    ],
    rules: {
        indentation: 4,
        'string-quotes': 'single',
        'function-name-case': null,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global', 'local'],
            },
        ],
        'declaration-empty-line-before': null,
        'at-rule-empty-line-before': null,
        'no-descending-specificity': null,
        'color-hex-length': 'long',
        'font-family-no-missing-generic-family-keyword': null,
        'block-closing-brace-newline-after': null,
        'max-line-length': [
            140,
            {
                ignore: ['comments'],
            },
        ],
        'no-eol-whitespace': null,
        'selector-class-pattern': clsSelectorPattern,
        'selector-id-pattern': idSelectorPattern,
    },
};
