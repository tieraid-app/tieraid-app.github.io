module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.vue$': 'vue-jest'
    },
    testMatch: [
        '**/src/**/*.spec.{j,t}s?(x)'
    ],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!primevue/.*)'
    ],
    moduleDirectories: [
        'node_modules',
        'src'
    ]
}
