import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const indexHtml = await readFile("index.html", "utf8");
const addonsHtml = await readFile("addons.html", "utf8");

const sampleManifest = {
  id: "community.french-stream-public",
  name: "French Stream (Public)",
  version: "1.0.0",
  description: "Manifest fixture for VOYO smoke tests",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  extraSupported: ["search"],
  catalogs: [
    { type: "movie", id: "fs-films-action", name: "FS - Films Action" },
    { type: "series", id: "fs-dernieres-series", name: "FS - Dernières Séries" },
    { type: "movie", id: "fs-search", name: "Recherche - Films", extra: [{ name: "search" }] }
  ]
};
const sampleMetas = [
  {
    id: "smoke-movie",
    type: "movie",
    name: "Film de test VOYO",
    poster: "https://images.example.test/voyo-poster.jpg",
    year: 2025,
    description: "Fiche de test"
  },
  {
    id: "smoke-series",
    type: "series",
    name: "Série de test VOYO",
    poster: "https://images.example.test/voyo-series.jpg",
    year: 2024,
    description: "Série de test"
  }
];

function createFetch({ manifestStatus = 200 } = {}) {
  const calls = [];
  const fetch = async (input) => {
    const url = new URL(String(input), "https://mansstyle59.github.io/voyo-streaming/");
    calls.push(url.href);
    if (url.pathname.endsWith("/manifest.json")) {
      return {
        ok: manifestStatus >= 200 && manifestStatus < 300,
        status: manifestStatus,
        json: async () => {
          if (manifestStatus >= 400) throw new Error("Manifest unavailable in test fixture");
          return sampleManifest;
        }
      };
    }
    if (url.pathname.includes("/catalog/")) {
      return { ok: true, status: 200, json: async () => ({ metas: sampleMetas }) };
    }
    if (url.pathname.includes("/meta/")) {
      return { ok: true, status: 200, json: async () => ({ meta: sampleMetas[0] }) };
    }
    if (url.pathname.includes("/stream/")) {
      return {
        ok: true, status: 200,
        json: async () => ({ streams: [{ name: "Source vidéo de test", url: "https://media.example.test/sample.mp4" }] })
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };
  return { fetch, calls };
}

async function waitFor(test, description, timeout = 2500) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (test()) return;
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  throw new Error("Délai dépassé : " + description);
}

function loadPage(html, pathname, fetcher, storageSeed = []) {
  const dom = new JSDOM(html, {
    url: "https://mansstyle59.github.io/voyo-streaming/" + pathname,
    runScripts: "dangerously",
    pretendToBeVisual: true,
    beforeParse(window) {
      window.fetch = fetcher;
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      window.confirm = () => true;
      window.localStorage.setItem("voyo-addons-v1", JSON.stringify(storageSeed));
    }
  });
  const runtimeErrors = [];
  dom.window.addEventListener("error", event => {
    runtimeErrors.push(event.message || String(event.error || "runtime error"));
  });
  return { dom, runtimeErrors };
}

// Test 1: homepage obtains a manifest, queries its catalogs and renders titles.
{
  const mock = createFetch();
  const { dom, runtimeErrors } = loadPage(indexHtml, "", mock.fetch);
  await waitFor(
    () => dom.window.document.querySelector("#addonExternalSections [data-addon-meta]"),
    "homepage should render an addon catalog card"
  );
  const home = dom.window.document;
  assert.match(home.querySelector("#addonExternalSections").textContent, /Catalogues connectés/);
  assert.match(home.querySelector("#addonExternalSections").textContent, /Film de test VOYO/);
  assert.ok(mock.calls.some(url => url.includes("/manifest.json")), "homepage should fetch manifest");
  assert.ok(mock.calls.some(url => url.includes("/catalog/movie/fs-films-action.json")), "homepage should query a catalog");
  assert.equal(runtimeErrors.length, 0, "homepage should have no unhandled runtime errors: " + runtimeErrors.join("; "));

  home.querySelector("[data-addon-meta]").click();
  assert.ok(home.querySelector("#externalDetailModal").classList.contains("open"), "external title details modal should open");
  home.querySelector("#loadExternalStreams").click();
  await waitFor(
    () => home.querySelector("#externalStreams").textContent.includes("Source vidéo de test"),
    "title details should load streams"
  );
  assert.ok(mock.calls.some(url => url.includes("/stream/movie/smoke-movie.json")), "details should query stream resource");

  const search = home.querySelector("#search");
  search.value = "robot";
  search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
  await waitFor(
    () => mock.calls.some(url => url.includes("/catalog/movie/fs-search/search=robot.json")),
    "homepage search should pass query to the add-on search catalog"
  );
  assert.match(home.querySelector("#addonExternalSections").textContent, /robot/i);
  assert.equal(runtimeErrors.length, 0, "search path should have no unhandled runtime errors: " + runtimeErrors.join("; "));
  dom.window.close();
  console.log("PASS homepage catalogues, metadata card, details modal and stream discovery");
}

// Test 2: Addons page installs the public manifest, lists catalogues and displays catalog results.
{
  const mock = createFetch();
  const { dom, runtimeErrors } = loadPage(addonsHtml, "addons.html", mock.fetch);
  await waitFor(
    () => dom.window.document.querySelector("#addonList [data-catalog]:not([disabled])"),
    "addons page should install and show catalog buttons"
  );
  const doc = dom.window.document;
  assert.match(doc.querySelector("#addonList").textContent, /French Stream \(Public\)/);
  doc.querySelector("#addonList [data-catalog]:not([disabled])").click();
  await waitFor(() => doc.querySelector("#catalogResults .catalog-btn"), "catalog list should display");
  doc.querySelector("#catalogResults .catalog-btn").click();
  await waitFor(() => doc.querySelector("#catalogResults .result-info"), "selected catalog should render results");
  assert.match(doc.querySelector("#catalogResults").textContent, /Film de test VOYO/);
  assert.equal(runtimeErrors.length, 0, "addons page should have no unhandled runtime errors: " + runtimeErrors.join("; "));
  dom.window.close();
  console.log("PASS addon install, catalog selection and rendered titles");
}

// Test 3: failed manifest must display a readable error instead of pretending to work.
{
  const mock = createFetch({ manifestStatus: 403 });
  const { dom, runtimeErrors } = loadPage(addonsHtml, "addons.html", mock.fetch);
  await waitFor(
    () => dom.window.document.querySelector("#featuredMsg.error"),
    "failed manifest should produce an error message"
  );
  assert.match(dom.window.document.querySelector("#featuredMsg").textContent, /HTTP 403|Impossible|manifeste/i);
  assert.equal(runtimeErrors.length, 0, "error path should have no unhandled runtime errors: " + runtimeErrors.join("; "));
  dom.window.close();
  console.log("PASS manifest failure is visible and does not crash the page");
}

console.log("VOYO smoke tests completed successfully.");
