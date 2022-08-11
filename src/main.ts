import {createApp} from 'vue'
import App from '@/App.vue';
import * as Sentry from '@sentry/vue';
import VuePapaParse from 'vue-papa-parse'
import {BrowserTracing} from '@sentry/tracing';


const options = {
    dsn: "https://08b43fe922a1413ebfbbe34c03d0525c@o1249239.ingest.sentry.io/6640884",
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
