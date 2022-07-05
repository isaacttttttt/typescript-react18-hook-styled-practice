import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
module.exports = {
    resolve: {
        plugins: [new TsconfigPathsPlugin({ baseUrl: '.' })],
        extensions: ['.tsx', '.ts', '.d.ts '],
        alias: {
            "src": path.resolve(__dirname, 'src/'),
            "types": path.resolve(__dirname, 'src/declaredTypes')
        }
    }
}