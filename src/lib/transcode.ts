import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

let is_loading: boolean = false;

const load_core = async () => {
    const ff = new FFmpeg();

    const url = `/ffmpeg/core`;

    const options: { coreURL: string; wasmURL: string; workerURL?: string } = {
        coreURL: await toBlobURL(`${url}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${url}/ffmpeg-core.wasm`, 'application/wasm'),
    };

    await ff.load(options);

    return ff;
};

const get = async () => {
    try {
        if (ffmpeg) return ffmpeg;

        is_loading = true;

        ffmpeg = await load_core();

        return ffmpeg;
    } catch (err) {
        if (import.meta.env.DEV) console.log(err);

        return null;
    } finally {
        is_loading = false;
    }
};

export async function preload() {
    if (is_loading) return;

    await get();
}

export async function transcode(file: File) {
    const ff = await get();

    if (!ff) throw new Error('Failed to load FFmpeg. Thanks WASM.');

    const start = performance.now();

    await ff.writeFile('input', await fetchFile(file));

    await ff.exec([
        '-i',
        'input',
        '-t',
        '6',
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-preset',
        'ultrafast',
        '-vf',
        "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
        '-movflags',
        'faststart',
        'output.mp4',
    ]);

    const data = await ff.readFile('output.mp4');

    if (import.meta.env.DEV) {
        console.log(`transcode: ${((performance.now() - start) / 1000).toFixed(2)}s`);
    }

    return new Blob([(data as Uint8Array).buffer as ArrayBuffer], { type: 'video/mp4' });
}
