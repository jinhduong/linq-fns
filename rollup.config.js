import uglify from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'dist/index.browser.js',
    output: {
        file: 'release/linq-fns.ru.js',
        format: 'umd'
    },
    plugins: [
        // typescript(),
        uglify()
    ]
};