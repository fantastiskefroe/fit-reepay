import {createApp} from 'vue'
import App from '@/App.vue';
import * as Sentry from '@sentry/vue';
import VuePapaParse from 'vue-papa-parse'
import {BrowserTracing} from '@sentry/tracing';


const options = {
    dsn: 'https://bd84d092c35549a28d0470b3be99868b@o1249239.ingest.sentry.io/6409646',
    tracesSampleRate: 1.0,
    integrations: [new BrowserTracing],
};

const release = process.env.VUE_APP_SENTRY_RELEASE;
if (release === 'dev') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options['release'] = 'dev';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options['environment'] = 'dev';
}

if (release !== undefined) {
    Sentry.init(options);
}

const app = createApp(App);
app.use(VuePapaParse)
app.mount('#app')
