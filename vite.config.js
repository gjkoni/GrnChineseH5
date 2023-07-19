import {
    defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import ENV_CONFIG from './.env';

export default defineConfig({
    plugins: [uni()],
    define: {
        'process.env.config': ENV_CONFIG,
    },
});