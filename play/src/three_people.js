// 3D 캐릭터: 말랑한 점토 인형 느낌(큰 머리, 작은 점 눈, 큰 귀, 둥근 몸). 레퍼런스 20~24번 스타일
const TOON = null;

function clay(hex, r) { return new THREE.MeshStandardMaterial({ color: hex, roughness: r === undefined ? 0.55 : r, metalness: 0, envMapIntensity: 0.3 }); }
function m3(hex) { return clay(hex, 0.6); }

function mesh(geo, mat, x, y, z) { const m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); m.castShadow = true; m.receiveShadow = true; return m; }

function ball(r, hex, x, y, z, sx, sy, sz, rough) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 40, 28), clay(hex, rough)); m.position.set(x, y, z); m.scale.set(sx || 1, sy || 1, sz || 1); m.castShadow = true; m.receiveShadow = true; return m;
}

const CHAR_LOOKS = [
  { skin: '#F6D3BE', hair: '#15110f', style: 'bobBangs', shirt: '#1d1b1c', pants: '#2c2f3a', collar: true, acc: 'bag' },
  { skin: '#F4CFB8', hair: '#5a3b2c', style: 'shortBob', shirt: '#E2C79C', pants: '#8a6a4a', beanie: '#EFE4CF', scarf: '#F7F1E6', acc: 'cross' },
  { skin: '#F7D2BB', hair: '#F4D22E', style: 'bun', shirt: '#E9E9EC', pants: '#2c2f3a', apron: '#8C5A3C' },
  { skin: '#F3D0B6', hair: '#5a3924', style: 'wavy', shirt: '#F58A2E', pants: '#2F55A8', collar: true },
  { skin: '#F5CDB3', hair: '#2b1d1a', style: 'bunDark', shirt: '#F4F1EA', pants: '#2a2528', skirt: '#2a2528', acc: 'case' },
  { skin: '#E9BE9B', hair: '#1a1513', style: 'short', shirt: '#5E9BE0', pants: '#3a4258', glasses: true, acc: 'pack' },
  { skin: '#F6D3BE', hair: '#241713', style: 'wavy', shirt: '#EE7FA6', pants: '#3a3a45', acc: 'bag' },
  { skin: '#F7D2BB', hair: '#F4D22E', style: 'bun', shirt: '#E9E9EC', pants: '#2c2f3a', apron: '#8C5A3C', staff: true },
];

function hairFor(L, g) {
  const h = L.hair, S = L.style;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.475, 28, 18, 0, Math.PI * 2, 0, 1.5), clay(h, 0.45)); cap.position.set(0, 1.47, -0.04); cap.rotation.x = -0.22; cap.castShadow = true; g.add(cap);
  if (S === 'bobBangs' || S === 'bun' || S === 'bunDark' || S === 'wavy' || S === 'shortBob') { const bm = clay(h, 0.45); bm.side = THREE.DoubleSide; [[-1.2, 1.12], [0.08, 1.12]].forEach(([ts, tl]) => { const band = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, S === 'bobBangs' ? 0.27 : 0.21, 24, 1, true, ts, tl), bm); band.position.set(0, 1.64, 0.0); band.castShadow = true; g.add(band); }); }
  if (S === 'bobBangs') { g.add(ball(0.48, h, 0, 1.25, -0.12, 1.0, 0.82, 0.88, 0.45)); [-0.43, 0.43].forEach((x) => g.add(ball(0.11, h, x, 1.22, 0.1, 0.55, 2.0, 0.9, 0.45))); }
  if (S === 'shortBob') g.add(ball(0.48, h, 0, 1.3, -0.1, 1.0, 0.7, 0.9, 0.45));
  if (S === 'wavy') { g.add(ball(0.5, h, 0, 1.08, -0.2, 1.0, 1.35, 0.6, 0.45)); [-0.42, 0.42].forEach((x) => g.add(ball(0.12, h, x, 1.18, 0.0, 0.6, 2.4, 0.9, 0.45))); }
  if (S === 'bun' || S === 'bunDark') { g.add(ball(0.22, h, 0, 2.02, -0.06, 1, 0.9, 1, 0.45)); g.add(ball(0.12, h, 0.0, 1.9, 0.16, 1.4, 0.6, 0.6, 0.45)); }
  if (S === 'short') { const bm = clay(h, 0.45); bm.side = THREE.DoubleSide; const band = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.14, 28, 1, true, -1.0, 2.0), bm); band.position.set(0, 1.68, 0.0); g.add(band); }
  if (L.beanie) { g.add(ball(0.5, L.beanie, 0, 1.66, -0.02, 1, 0.62, 1, 0.8)); const fold = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.07, 10, 28), clay(L.beanie, 0.8)); fold.rotation.x = Math.PI / 2; fold.position.set(0, 1.58, -0.01); g.add(fold); }
}

function faceFor(L, g) {
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: 0.15, metalness: 0.2 });
  [-0.15, 0.15].forEach((x) => {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.052, 18, 14), eyeMat); e.position.set(x, 1.4, 0.41); e.scale.set(1, 1.3, 0.6); g.add(e);
    g.add(ball(0.013, '#ffffff', x - 0.014, 1.43, 0.44, 1, 1, 1, 0.1));
    g.add(ball(0.04, L.hair === '#F4D22E' ? '#d9b84a' : '#6a4a3e', x, 1.505, 0.405, 1.25, 0.22, 0.35, 0.6));
    g.add(ball(0.075, '#F4A6A0', x * 1.75, 1.31, 0.35, 1, 0.6, 0.3, 0.8));
  });
  g.add(ball(0.04, '#E69A98', 0, 1.34, 0.44, 1, 0.8, 0.8, 0.5));
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.017, 10, 24, Math.PI), new THREE.MeshStandardMaterial({ color: 0xd9403a, roughness: 0.35 })); mouth.rotation.z = Math.PI; mouth.position.set(0, 1.285, 0.42); g.add(mouth); g.add(ball(0.034, '#C7352F', 0, 1.255, 0.425, 1.5, 0.5, 0.5, 0.35));
  if (L.glasses) [-0.15, 0.15].forEach((x) => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.014, 8, 22), new THREE.MeshStandardMaterial({ color: 0x2a2220, roughness: 0.4 })); r.position.set(x, 1.43, 0.42); g.add(r); });
}

function makePerson3(L) {
  const g = new THREE.Group();
  g.add(ball(0.45, L.skin, 0, 1.42, 0, 1.04, 0.92, 0.98, 0.55));
  [-0.46, 0.46].forEach((x) => { g.add(ball(0.15, L.skin, x, 1.4, -0.02, 0.5, 1, 0.9, 0.55)); g.add(ball(0.085, '#F0A8A0', x * 1.02, 1.4, 0.02, 0.4, 0.8, 0.6, 0.6)); });
  faceFor(L, g); hairFor(L, g);
  g.add(mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.16, 16), clay(L.skin, 0.55), 0, 1.1, 0));
  g.add(ball(0.36, L.shirt, 0, 0.9, 0, 1, 1.3, 0.82, 0.6));
  { const hem = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 10, 28), clay(L.apron ? '#d8d8dc' : '#00000022'.length > 0 ? L.shirt : L.shirt, 0.6)); hem.rotation.x = Math.PI / 2; hem.position.set(0, 0.5, 0); hem.scale.set(1, 0.82, 1); hem.material.color.multiplyScalar(0.85); g.add(hem); }
  if (L.collar) [-1, 1].forEach((sd) => { const c = mesh(new THREE.BoxGeometry(0.2, 0.15, 0.03), clay('#F4F8F8', 0.6), sd * 0.09, 1.2, 0.24); c.rotation.z = -sd * 0.7; c.rotation.x = -0.25; g.add(c); });
  if (L.scarf) { const c = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.08, 10, 22), clay(L.scarf, 0.9)); c.rotation.x = Math.PI / 2; c.position.set(0, 1.19, 0.02); g.add(c); g.add(ball(0.09, L.scarf, 0.1, 1.0, 0.27, 1, 2, 0.7, 0.9)); }
  if (L.apron) { const a = ball(0.3, L.apron, 0, 0.78, 0.2, 1, 1.35, 0.35, 0.7); g.add(a); g.add(ball(0.08, '#7a4a30', 0, 0.78, 0.36, 1.2, 0.9, 0.3, 0.7)); }
  if (L.skirt) { const sk = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.44, 0.34, 24), clay(L.skirt, 0.7)); sk.position.set(0, 0.62, 0); sk.castShadow = true; g.add(sk); }
  const legs = [-0.14, 0.14].map((lx) => { const p = new THREE.Group(); p.position.set(lx, 0.46, 0); const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.095, 0.36, 14), clay(L.skirt ? L.skin : L.pants, 0.6)); leg.position.y = -0.18; leg.castShadow = true; p.add(leg); p.add(ball(0.135, '#F7F4EE', 0, -0.4, 0.06, 1, 0.62, 1.6, 0.5)); p.add(ball(0.13, '#CFC8BA', 0, -0.455, 0.06, 1.02, 0.18, 1.62, 0.7)); g.add(p); return p; });
  const arms = [-0.4, 0.4].map((ax) => { const p = new THREE.Group(); p.position.set(ax, 1.12, 0); const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.42, 14), clay(L.shirt, 0.6)); arm.position.y = -0.21; arm.castShadow = true; p.add(arm); const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.025, 8, 18), clay(L.shirt, 0.6)); cuff.rotation.x = Math.PI / 2; cuff.position.y = -0.4; cuff.material.color.multiplyScalar(0.82); p.add(cuff); p.add(ball(0.1, L.skin, 0, -0.49, 0, 0.85, 1.2, 0.75, 0.55)); const th = ball(0.042, L.skin, ax > 0 ? -0.075 : 0.075, -0.46, 0.05, 0.8, 1.7, 0.8, 0.55); th.rotation.z = ax > 0 ? 0.55 : -0.55; p.add(th); [-0.04, 0, 0.04].forEach((fx) => p.add(ball(0.03, L.skin, fx, -0.6, 0.0, 0.9, 1.4, 0.9, 0.55))); g.add(p); return p; });
  if (L.acc === 'bag') g.add(ball(0.16, '#F4A93A', 0.48, 0.62, 0.05, 1, 1.1, 0.55, 0.6));
  if (L.acc === 'cross') g.add(ball(0.15, '#6a4a2a', 0.38, 0.62, 0.22, 1, 0.9, 0.6, 0.8));
  if (L.acc === 'case') { const cs = mesh(new THREE.BoxGeometry(0.36, 0.55, 0.22), clay('#6FA8E8', 0.45), 0.7, 0.32, 0.1); g.add(cs); g.add(mesh(new THREE.BoxGeometry(0.04, 0.3, 0.04), clay('#4a6f9c'), 0.7, 0.72, 0.1)); }
  if (L.acc === 'pack') g.add(ball(0.22, '#4b7a52', 0, 0.95, -0.34, 1, 1.3, 0.6, 0.7));
  const sh = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.22 })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0.012; g.add(sh);
  g.scale.setScalar(1.12); g.userData = { legs, arms, seed: 0, three: true };
  return g;
}

function animatePerson3(g, t, moving) {
  const u = g.userData, ph = moving ? Math.sin(t * 9 + u.seed) : 0;
  u.legs[0].rotation.x = ph * 0.8; u.legs[1].rotation.x = -ph * 0.8; u.arms[0].rotation.x = -ph * 0.7; u.arms[1].rotation.x = ph * 0.7;
  g.position.y = moving ? Math.abs(ph) * 0.07 : 0; if (!moving) { u.arms[0].rotation.z = 0.06; u.arms[1].rotation.z = -0.06; }
}
