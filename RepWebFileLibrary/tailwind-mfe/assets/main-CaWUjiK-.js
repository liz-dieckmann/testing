const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/__federation_expose_Mount-lj_xqXyM.js","assets/index-CIQ6_Rzc.js","assets/index-DPp_4SNT.js","assets/preload-helper-DozDN73s.js","assets/__federation_fn_import-Bi7vPVnK.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './preload-helper-DozDN73s.js';

__vitePreload(async () => { const {autoMount} = await import('./__federation_expose_Mount-lj_xqXyM.js').then(n => n.b);return { autoMount }},true              ?__vite__mapDeps([0,1,2,3,4]):void 0).then(({ autoMount }) => {
  autoMount();
}).catch((error) => {
  console.error("Failed to load Tailwind MFE:", error);
});
