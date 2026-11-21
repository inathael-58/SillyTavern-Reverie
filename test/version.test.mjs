import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The "a newer version is installed, tap to reload" toast compares core.js VERSION with
// manifest.json. If only one of them is bumped, the toast comes back after every reload.
test('core.js VERSION matches manifest.json version', () => {
    const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
    const core = readFileSync(new URL('../core.js', import.meta.url), 'utf8');
    const m = core.match(/export const VERSION = '([^']+)'/);
    assert.ok(m, 'VERSION constant not found in core.js');
    assert.equal(m[1], manifest.version);
});
