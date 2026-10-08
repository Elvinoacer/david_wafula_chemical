/**
 * Generates all imagery for the David Wafula portfolio.
 * Aesthetic: cinematic precision-industrial photography, dark moody tones
 * with emerald-green accent lighting, clean compositions, no people unless noted.
 */
import ZAI from 'z-ai-web-dev-sdk';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/images';

const STYLE =
  'cinematic industrial photography, dark moody atmosphere, deep green-black color grade, emerald green accent lighting, high detail, photorealistic, professional photography, no text, no watermark';

const JOBS = [
  {
    name: 'portrait',
    prompt:
      'Professional studio portrait of a confident young African male engineer in his early twenties, short hair, warm subtle smile, wearing a dark green button-up shirt, arms crossed, dark charcoal studio background with soft emerald rim light, corporate headshot photography, sharp focus, high quality',
    size: '864x1152',
  },
  {
    name: 'hero-plant',
    prompt:
      `Vast modern chemical process plant at blue-hour dusk, distillation columns and interconnecting pipe racks with insulated piping, elevated walkways, atmospheric haze, dramatic scale, ${STYLE}`,
    size: '1536x768',
  },
  {
    name: 'biodiesel',
    prompt:
      `Small-scale biodiesel pilot plant, gleaming stainless steel stirred reactor vessels with jacketed piping and valves, golden vegetable oil in glass sight glass, clean workshop environment, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'distillation',
    prompt:
      `Tall industrial distillation column with structured packing sections, reflux drum on top, reboiler piping at base, ladders and platforms, steam rising, low-angle dramatic view, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'heat-exchanger',
    prompt:
      `Close-up of a large shell-and-tube heat exchanger in an industrial plant, bundle of tubes visible at open end, flanged connections, stainless steel surfaces with reflections, channel head, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'pumping',
    prompt:
      `Row of industrial centrifugal pumps with motors connected to a complex pipe network with gauges and valves, pump hall interior, polished floor reflections, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'reactor',
    prompt:
      `Pair of jacketed stainless steel chemical reactor vessels in a process hall, agitator motors on top, pipes and instrumentation cables, pressure gauges, clean industrial setup, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'wastewater',
    prompt:
      `Modern wastewater treatment plant with circular clarifier tanks and aeration basins, aerial perspective at dusk, clean water reflections, subtle green landscape, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'lab',
    prompt:
      `University engineering laboratory with pilot-scale process training rigs, small distillation column, heat exchanger trainer unit, pressure sensors and tubing on frames, educational equipment, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'control-room',
    prompt:
      `Modern industrial control room, large wall-mounted SCADA screens showing process flow diagrams and trend charts, control desk with multiple monitors, dark room lit by screen glow, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'education',
    prompt:
      `Engineer desk flat lay from above: process flow diagram blueprints, engineering calculator, notebook with mass balance equations, pen, safety glasses in corner, laptop edge, warm desk lamp light, ${STYLE}`,
    size: '1344x768',
  },
  {
    name: 'about-pfd',
    prompt:
      `Young African male engineer in dark shirt reviewing large printed process flow diagrams on a table, pointing at equipment symbols, laptop with simulation software nearby, focused expression, over-the-shoulder view, ${STYLE}`,
    size: '1344x768',
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function generateWithRetry(zai: Awaited<ReturnType<typeof ZAI.create>>, job: (typeof JOBS)[number], retries = 4) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as never,
      });
      return res;
    } catch (e: any) {
      const msg = e?.message ?? String(e);
      if (attempt < retries && /429|Too many/i.test(msg)) {
        await sleep(15000 * attempt);
        continue;
      }
      throw e;
    }
  }
  throw new Error('unreachable');
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();
  const results: { name: string; ok: boolean; error?: string }[] = [];

  for (const job of JOBS) {
    if (fs.existsSync(path.join(OUT_DIR, `${job.name}.webp`))) {
      console.log(`SKIP ${job.name} (exists)`);
      results.push({ name: job.name, ok: true });
      continue;
    }
    try {
      const res = await generateWithRetry(zai, job);
      const b64 = res?.data?.[0]?.base64;
      if (!b64) throw new Error('empty base64');
      const buf = Buffer.from(b64, 'base64');
      const raw = path.join(OUT_DIR, `_raw_${job.name}.png`);
      fs.writeFileSync(raw, buf);
      await sharp(raw).webp({ quality: 84 }).toFile(path.join(OUT_DIR, `${job.name}.webp`));
      fs.unlinkSync(raw);
      console.log(`OK  ${job.name}`);
      results.push({ name: job.name, ok: true });
    } catch (e: any) {
      console.error(`ERR ${job.name}: ${e?.message ?? e}`);
      results.push({ name: job.name, ok: false, error: e?.message ?? String(e) });
    }
    await sleep(6000);
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone. ${results.length - failed.length}/${results.length} images generated.`);
  if (failed.length) {
    console.log('Failed:', failed.map((f) => f.name).join(', '));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
