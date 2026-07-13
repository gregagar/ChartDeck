"use strict";

const STORAGE_KEYS = {
  songs: "chartdeck.standalone.songs.v1",
  setlists: "chartdeck.standalone.setlists.v1",
  settings: "chartdeck.standalone.settings.v1"
};

const SAMPLE_SONGS = [
  {
    id: "cd_midnight_avenue",
    title: "Midnight Avenue",
    artist: "The Harbour Lights",
    originalKey: "E",
    tempo: 120,
    capo: 0,
    tags: ["Rock", "Singalong", "Upbeat"],
    favourite: true,
    createdAt: "2026-07-13T08:00:00.000Z",
    durationSec: 228,
    transposeOffset: 0,
    useFlats: false,
    chart: `[Intro]\n[E]  [B]  [C#m]  [A]\n\n[Verse 1]\n[E]Streetlights running down the avenue\n[B]Every open window has a different view\n[C#m]We were chasing sparks until the morning came\n[A]Calling out each other's name\n\n[Chorus]\n[E]Hold on, the night is young\n[B]Sing it back with everyone\n[C#m]One more road and one more tune\n[A]Underneath the silver moon`
  },
  {
    id: "cd_golden_hour",
    title: "Golden Hour",
    artist: "Lena Hart",
    originalKey: "G",
    tempo: 94,
    capo: 0,
    tags: ["Acoustic", "Warm", "Wedding"],
    favourite: false,
    createdAt: "2026-07-12T10:00:00.000Z",
    durationSec: 205,
    transposeOffset: 0,
    useFlats: false,
    chart: `[Verse]\n[G]Sun on the table, light through the glass\n[Em]Nobody asking the moment to pass\n[C]Stay here beside me, quiet and close\n[D]This is the hour I love the most\n\n[Chorus]\n[C]Keep this feeling, [G]keep it near\n[Em]All that matters [D]is right here`
  },
  {
    id: "cd_back_to_harbour",
    title: "Back to the Harbour",
    artist: "Northbound",
    originalKey: "D",
    tempo: 108,
    capo: 0,
    tags: ["Folk", "Piano Bar", "Story"],
    favourite: true,
    createdAt: "2026-07-11T12:00:00.000Z",
    durationSec: 242,
    transposeOffset: 0,
    useFlats: false,
    chart: `[Verse 1]\n[D]Long road bending by the old stone wall\n[G]Rain on the rooftops, evening call\n[Bm]Every mile takes me [A]closer still\n[G]Back to the harbour [A]over the hill\n\n[Chorus]\n[D]Take me home where the [A]river meets the sea\n[Bm]Leave one light in the [G]window there for me`
  },
  {
    id: "cd_open_road",
    title: "Open Road",
    artist: "Maya Rivers",
    originalKey: "A",
    tempo: 126,
    capo: 0,
    tags: ["Pop", "Upbeat", "Dancefloor"],
    favourite: false,
    createdAt: "2026-07-10T15:00:00.000Z",
    durationSec: 216,
    transposeOffset: 0,
    useFlats: false,
    chart: `[Intro]\n[A]  [E]  [F#m]  [D]\n\n[Verse]\n[A]Windows down and the city behind\n[E]No fixed plan and no finish line\n[F#m]Turn it up till the [D]whole world knows\n[A]We belong on the [E]open road`
  },
  {
    id: "cd_after_rain",
    title: "After the Rain",
    artist: "Lena Hart",
    originalKey: "C",
    tempo: 72,
    capo: 0,
    tags: ["Ballad", "Romantic"],
    favourite: false,
    createdAt: "2026-07-09T17:00:00.000Z",
    durationSec: 238,
    transposeOffset: 0,
    useFlats: false,
    chart: `[Verse]\n[C]Quiet on the pavement after the rain\n[Am]Silver in the gutters, lights on the train\n[F]You take my hand and [G]everything slows\n\n[Chorus]\n[F]Stay until the [C]morning\n[Am]Stay until the [G]sky turns blue`
  }
];

const SAMPLE_SETLISTS = [
  {
    id: "set_george_inn",
    name: "The George Inn",
    date: "2026-07-17",
    items: [
      { uid: "item_1", type: "song", songId: "cd_open_road" },
      { uid: "item_2", type: "song", songId: "cd_back_to_harbour" },
      { uid: "item_3", type: "song", songId: "cd_midnight_avenue" },
      { uid: "item_4", type: "break", label: "BREAK" },
      { uid: "item_5", type: "song", songId: "cd_golden_hour" }
    ]
  },
  {
    id: "set_acoustic",
    name: "Acoustic Night",
    date: "2026-07-18",
    items: [
      { uid: "item_6", type: "song", songId: "cd_golden_hour" },
      { uid: "item_7", type: "song", songId: "cd_after_rain" },
      { uid: "item_8", type: "song", songId: "cd_back_to_harbour" }
    ]
  }
];

const DEFAULT_SETTINGS = {
  chartTheme: "light",
  fontSize: 22,
  lineSpacing: 1.45,
  autoScroll: false,
  autoScrollSpeed: 22,
  chordColor: "#1478f2",
  sidebarCollapsed: false,
  libraryCollapsed: false
};

const $ = id => document.getElementById(id);
const els = {
  settingsButton: $("settingsButton"),
  sidebarCollapseButton: $("sidebarCollapseButton"),
  libraryCollapseButton: $("libraryCollapseButton"),
  drawerScrim: $("drawerScrim"),
  mainNavigation: $("mainNavigation"),
  sidebarSetlists: $("sidebarSetlists"),
  quickNewSetlistButton: $("quickNewSetlistButton"),
  storageCount: $("storageCount"),
  storageBar: $("storageBar"),
  libraryHeading: $("libraryHeading"),
  themeButton: $("themeButton"),
  addSongButton: $("addSongButton"),
  songLibraryControls: $("songLibraryControls"),
  searchInput: $("searchInput"),
  filterButton: $("filterButton"),
  songCount: $("songCount"),
  songTable: $("songTable"),
  categoryPanel: $("categoryPanel"),
  categoryList: $("categoryList"),
  setlistPanel: $("setlistPanel"),
  setlistHeading: $("setlistHeading"),
  renameSetlistButton: $("renameSetlistButton"),
  newSetlistButton: $("newSetlistButton"),
  setlistSummary: $("setlistSummary"),
  addBreakButton: $("addBreakButton"),
  setlistRows: $("setlistRows"),
  chartTitle: $("chartTitle"),
  chartArtist: $("chartArtist"),
  editSongButton: $("editSongButton"),
  quickEditButton: $("quickEditButton"),
  favouriteButton: $("favouriteButton"),
  songMoreButton: $("songMoreButton"),
  transposeDownButton: $("transposeDownButton"),
  transposeSheetButton: $("transposeSheetButton"),
  displayKey: $("displayKey"),
  transposeUpButton: $("transposeUpButton"),
  resetTransposeButton: $("resetTransposeButton"),
  capoButton: $("capoButton"),
  capoLabel: $("capoLabel"),
  tempoButton: $("tempoButton"),
  tempoValue: $("tempoValue"),
  scrollToggleButton: $("scrollToggleButton"),
  scrollStatusIcon: $("scrollStatusIcon"),
  scrollSpeedButton: $("scrollSpeedButton"),
  scrollSpeedValue: $("scrollSpeedValue"),
  chartMoreButton: $("chartMoreButton"),
  chartPaper: $("chartPaper"),
  scrollProgressTrack: $("scrollProgressTrack"),
  scrollProgressBar: $("scrollProgressBar"),
  previousSongButton: $("previousSongButton"),
  nextSongButton: $("nextSongButton"),
  chartPosition: $("chartPosition"),
  backToLibraryButton: $("backToLibraryButton"),
  songDialog: $("songDialog"),
  songForm: $("songForm"),
  songDialogHeading: $("songDialogHeading"),
  songTitleInput: $("songTitleInput"),
  songArtistInput: $("songArtistInput"),
  songKeyInput: $("songKeyInput"),
  songTempoInput: $("songTempoInput"),
  songTagsInput: $("songTagsInput"),
  songCapoInput: $("songCapoInput"),
  songChartInput: $("songChartInput"),
  setlistDialog: $("setlistDialog"),
  setlistForm: $("setlistForm"),
  setlistDialogHeading: $("setlistDialogHeading"),
  setlistNameInput: $("setlistNameInput"),
  setlistDateInput: $("setlistDateInput"),
  transposeDialog: $("transposeDialog"),
  transposeOriginalKey: $("transposeOriginalKey"),
  transposeAmount: $("transposeAmount"),
  transposeNewKey: $("transposeNewKey"),
  sheetTransposeDown: $("sheetTransposeDown"),
  sheetTransposeUp: $("sheetTransposeUp"),
  enharmonicSharpButton: $("enharmonicSharpButton"),
  enharmonicFlatButton: $("enharmonicFlatButton"),
  rememberTransposeToggle: $("rememberTransposeToggle"),
  themeDialog: $("themeDialog"),
  themeChoices: $("themeChoices"),
  fontSizeSlider: $("fontSizeSlider"),
  chordColourPicker: $("chordColourPicker"),
  chordColourValue: $("chordColourValue"),
  chordColourSwatches: $("chordColourSwatches"),
  scrollDialog: $("scrollDialog"),
  scrollDialogToggle: $("scrollDialogToggle"),
  scrollDialogSpeedValue: $("scrollDialogSpeedValue"),
  scrollSpeedSlider: $("scrollSpeedSlider"),
  scrollQuickChoices: $("scrollQuickChoices"),
  scrollToTopButton: $("scrollToTopButton"),
  scrollStartStopButton: $("scrollStartStopButton"),
  settingsDialog: $("settingsDialog"),
  autoScrollToggle: $("autoScrollToggle"),
  autoScrollSettingsButton: $("autoScrollSettingsButton"),
  settingsScrollSpeedValue: $("settingsScrollSpeedValue"),
  lineSpacingButton: $("lineSpacingButton"),
  lineSpacingValue: $("lineSpacingValue"),
  tapTempoSettingsButton: $("tapTempoSettingsButton"),
  settingsTempoValue: $("settingsTempoValue"),
  backupButton: $("backupButton"),
  restoreButton: $("restoreButton"),
  restoreInput: $("restoreInput"),
  footPedalButton: $("footPedalButton"),
  capoDialog: $("capoDialog"),
  capoChoices: $("capoChoices"),
  tempoDialog: $("tempoDialog"),
  tempoForm: $("tempoForm"),
  tempoNumberInput: $("tempoNumberInput"),
  tempoSlider: $("tempoSlider"),
  tempoQuickChoices: $("tempoQuickChoices"),
  songActionsPopover: $("songActionsPopover"),
  songActionsTitle: $("songActionsTitle"),
  chartMorePopover: $("chartMorePopover"),
  filterDialog: $("filterDialog"),
  artistFilterSelect: $("artistFilterSelect"),
  tagFilterSelect: $("tagFilterSelect"),
  keyFilterSelect: $("keyFilterSelect"),
  clearFiltersButton: $("clearFiltersButton"),
  toast: $("toast")
};

let songs = loadJSON(STORAGE_KEYS.songs, SAMPLE_SONGS);
let setlists = loadJSON(STORAGE_KEYS.setlists, SAMPLE_SETLISTS);
let settings = { ...DEFAULT_SETTINGS, ...loadJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS) };
let activeSongId = songs[0]?.id || null;
let activeSetlistId = setlists[0]?.id || null;
let activeView = "songs";
let activeCategory = null;
let specialFilter = null;
let filterState = { artist: "", tag: "", key: "" };
let sortState = { key: "title", direction: 1 };
let editingSongId = null;
let editingSetlistId = null;
let chartContextIds = songs.map(song => song.id);
let currentTransposeOffset = 0;
let tapTimes = [];
let autoScrollFrame = null;
let lastAutoScrollTime = null;
let autoScrollPosition = 0;
let wakeLock = null;
let toastTimer = null;
let currentActionSongId = null;
let lastCapoTapAt = 0;
let capoTapTimer = null;
let lastTempoControlTapAt = 0;

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : structuredClone(fallback);
  } catch (error) {
    console.warn(`Could not load ${key}`, error);
    return structuredClone(fallback);
  }
}

function saveAll() {
  try {
    localStorage.setItem(STORAGE_KEYS.songs, JSON.stringify(songs));
    localStorage.setItem(STORAGE_KEYS.setlists, JSON.stringify(setlists));
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  } catch (error) {
    console.warn("ChartDeck could not save locally in this browser context", error);
  }
}

function uid(prefix = "id") {
  if (crypto?.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T12:00:00`);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(date);
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function openDialog(dialog) {
  if (!dialog.open) dialog.showModal();
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

function getActiveSong() {
  return songs.find(song => song.id === activeSongId) || null;
}

function getActiveSetlist() {
  return setlists.find(setlist => setlist.id === activeSetlistId) || null;
}

function getSetlistSongIds(setlist) {
  if (!setlist) return [];
  return setlist.items.filter(item => item.type === "song" && songs.some(song => song.id === item.songId)).map(item => item.songId);
}

function normalizeText(value) {
  return String(value || "").toLocaleLowerCase().trim();
}

function filteredSongs() {
  const query = normalizeText(els.searchInput.value);
  let result = songs.filter(song => {
    const haystack = [song.title, song.artist, song.originalKey, ...(song.tags || []), song.chart].join(" ").toLocaleLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (filterState.artist && song.artist !== filterState.artist) return false;
    if (filterState.tag && !(song.tags || []).includes(filterState.tag)) return false;
    if (filterState.key && song.originalKey !== filterState.key) return false;
    if (specialFilter === "favourite" && !song.favourite) return false;
    return true;
  });

  const direction = sortState.direction;
  result.sort((a, b) => {
    if (sortState.key === "recent") {
      return (new Date(a.createdAt) - new Date(b.createdAt)) * direction;
    }
    if (sortState.key === "tags") {
      return (a.tags || []).join(", ").localeCompare((b.tags || []).join(", ")) * direction;
    }
    return String(a[sortState.key] || "").localeCompare(String(b[sortState.key] || ""), undefined, { sensitivity: "base" }) * direction;
  });
  return result;
}

function renderEverything() {
  applySettings();
  renderSidebarSetlists();
  renderFilterOptions();
  renderStorage();
  renderLibrary();
  renderChart();
}

function applySettings() {
  document.body.dataset.chartTheme = settings.chartTheme;
  document.body.classList.toggle("sidebar-collapsed", Boolean(settings.sidebarCollapsed));
  document.body.classList.toggle("library-collapsed", Boolean(settings.libraryCollapsed));
  document.documentElement.style.setProperty("--chart-size", `${settings.fontSize}px`);
  document.documentElement.style.setProperty("--chart-line-height", String(settings.lineSpacing));
  document.documentElement.style.setProperty("--chord-color", settings.chordColor || "#1478f2");
  els.fontSizeSlider.value = String(settings.fontSize);
  els.lineSpacingValue.textContent = `${settings.lineSpacing.toFixed(2)} ›`;
  updateScrollControls();
  els.chordColourPicker.value = settings.chordColor || "#1478f2";
  els.chordColourValue.textContent = String(settings.chordColor || "#1478f2").toUpperCase();
  els.sidebarCollapseButton.textContent = settings.sidebarCollapsed ? "›" : "‹";
  els.libraryCollapseButton.textContent = settings.libraryCollapsed ? "›" : "‹";
  [...els.themeChoices.querySelectorAll("button[data-theme]")].forEach(button => {
    button.classList.toggle("selected", button.dataset.theme === settings.chartTheme);
  });
  [...els.chordColourSwatches.querySelectorAll("[data-colour]")].forEach(button => {
    button.classList.toggle("active", button.dataset.colour.toLowerCase() === String(settings.chordColor).toLowerCase());
  });
  if (settings.autoScroll && activeSongId) startAutoScroll();
  else stopAutoScroll();
  updateLayoutButton();
  updateScrollProgress();
}

function renderStorage() {
  els.storageCount.textContent = `${songs.length.toLocaleString()} song${songs.length === 1 ? "" : "s"}`;
  const percent = Math.min(100, Math.max(3, (songs.length / 2000) * 100));
  els.storageBar.style.width = `${percent}%`;
}

function renderSidebarSetlists() {
  els.sidebarSetlists.innerHTML = setlists.map(setlist => {
    const count = getSetlistSongIds(setlist).length;
    return `<button class="sidebar-setlist ${setlist.id === activeSetlistId && activeView === "setlists" ? "active" : ""}" data-setlist-id="${escapeHTML(setlist.id)}">
      <span class="set-icon">☷</span>
      <span class="set-name"><strong>${escapeHTML(setlist.name)}</strong><small>${escapeHTML(formatDate(setlist.date))}</small></span>
      <span class="set-count">${count}</span>
    </button>`;
  }).join("");
}

function updateNavigation() {
  [...els.mainNavigation.querySelectorAll(".nav-item")].forEach(button => {
    const isSongs = button.dataset.view === "songs" && activeView === "songs" && !activeCategory && !specialFilter;
    const isSetlists = button.dataset.view === "setlists" && activeView === "setlists";
    const isCategory = button.dataset.filter && button.dataset.filter === activeCategory;
    const isSpecial = button.dataset.filter && button.dataset.filter === specialFilter;
    button.classList.toggle("active", Boolean(isSongs || isSetlists || isCategory || isSpecial));
  });
}

function renderLibrary() {
  updateNavigation();
  const showingSongs = activeView === "songs" && !activeCategory;
  els.songLibraryControls.classList.toggle("hidden", !showingSongs);
  els.categoryPanel.classList.toggle("hidden", !activeCategory);
  els.setlistPanel.classList.toggle("hidden", activeView !== "setlists");

  if (activeView === "setlists") {
    els.libraryHeading.textContent = "Setlists";
    renderSetlist();
    return;
  }

  if (activeCategory) {
    const labels = { artist: "Artists", tag: "Tags", key: "Keys" };
    els.libraryHeading.textContent = labels[activeCategory] || "Library";
    renderCategoryList(activeCategory);
    return;
  }

  els.libraryHeading.textContent = specialFilter === "favourite" ? "Favourites" : specialFilter === "recent" ? "Recently Added" : "Songs";
  renderSongTable();
}

function renderSongTable() {
  const list = filteredSongs();
  chartContextIds = list.map(song => song.id);
  els.songCount.textContent = `${list.length.toLocaleString()} song${list.length === 1 ? "" : "s"}`;
  if (!list.length) {
    els.songTable.innerHTML = `<div class="empty-list"><div><strong>No songs found</strong><br><span>Try clearing the search or filters.</span></div></div>`;
    renderChartNavigation();
    return;
  }

  els.songTable.innerHTML = list.map((song, index) => {
    const tags = (song.tags || []).slice(0, 2).join(", ");
    return `<div class="song-row ${song.id === activeSongId ? "active" : ""}" data-song-id="${escapeHTML(song.id)}">
      <div class="song-cell song-title-cell" data-open-song="${escapeHTML(song.id)}">
        <span class="song-badge">${song.favourite ? "★" : "♫"}</span>
        <span class="song-main-text"><strong>${escapeHTML(song.title)}</strong><small>${escapeHTML(song.artist)}</small></span>
      </div>
      <div class="song-cell">${escapeHTML(song.artist)}</div>
      <div class="song-cell key-cell">${escapeHTML(displayKeyForSong(song))}</div>
      <div class="song-cell tag-cell">${escapeHTML(tags)}</div>
      <button class="song-menu" data-song-menu="${escapeHTML(song.id)}" aria-label="Song options">•••</button>
    </div>`;
  }).join("");
  renderChartNavigation();
}

function renderCategoryList(type) {
  const map = new Map();
  songs.forEach(song => {
    const values = type === "artist" ? [song.artist] : type === "tag" ? (song.tags || []) : [song.originalKey];
    values.filter(Boolean).forEach(value => map.set(value, (map.get(value) || 0) + 1));
  });
  const items = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: "base" }));
  els.categoryList.innerHTML = items.length ? items.map(([name, count]) =>
    `<button class="category-item" data-category-value="${escapeHTML(name)}"><span>${escapeHTML(name)}</span><span>${count} ›</span></button>`
  ).join("") : `<div class="empty-list">Nothing here yet.</div>`;
}

function renderFilterOptions() {
  fillSelect(els.artistFilterSelect, "All artists", [...new Set(songs.map(song => song.artist).filter(Boolean))].sort(), filterState.artist);
  fillSelect(els.tagFilterSelect, "All tags", [...new Set(songs.flatMap(song => song.tags || []))].sort(), filterState.tag);
  fillSelect(els.keyFilterSelect, "All keys", [...new Set(songs.map(song => song.originalKey).filter(Boolean))].sort(), filterState.key);
}

function fillSelect(select, firstLabel, values, selected) {
  select.innerHTML = `<option value="">${escapeHTML(firstLabel)}</option>` + values.map(value =>
    `<option value="${escapeHTML(value)}" ${value === selected ? "selected" : ""}>${escapeHTML(value)}</option>`
  ).join("");
}

function renderSetlist() {
  let setlist = getActiveSetlist();
  if (!setlist && setlists.length) {
    activeSetlistId = setlists[0].id;
    setlist = setlists[0];
  }
  if (!setlist) {
    els.setlistHeading.textContent = "No setlists";
    els.setlistSummary.textContent = "Create your first setlist";
    els.setlistRows.innerHTML = `<div class="empty-list"><button class="primary-button" data-create-first-setlist>Create Setlist</button></div>`;
    return;
  }

  els.setlistHeading.textContent = setlist.name;
  const validSongs = setlist.items.map(item => item.type === "song" ? songs.find(song => song.id === item.songId) : null).filter(Boolean);
  const totalSeconds = validSongs.reduce((sum, song) => sum + (Number(song.durationSec) || 0), 0);
  els.setlistSummary.textContent = `${validSongs.length} songs • ${formatDuration(totalSeconds)}`;

  let songNumber = 0;
  els.setlistRows.innerHTML = setlist.items.map(item => {
    if (item.type === "break") {
      return `<div class="setlist-row" data-item-uid="${escapeHTML(item.uid)}">
        <span class="setlist-drag">≡</span><span></span><span class="setlist-break">${escapeHTML(item.label || "BREAK")}</span><span></span>
        <button class="setlist-remove" data-remove-item="${escapeHTML(item.uid)}">✕</button>
      </div>`;
    }
    const song = songs.find(candidate => candidate.id === item.songId);
    if (!song) return "";
    songNumber += 1;
    return `<div class="setlist-row" data-item-uid="${escapeHTML(item.uid)}" data-setlist-song-id="${escapeHTML(song.id)}">
      <span class="setlist-drag" aria-label="Drag to reorder">≡</span>
      <span class="setlist-number">${songNumber}</span>
      <button class="setlist-song" data-open-setlist-song="${escapeHTML(song.id)}" style="border:0;background:transparent;color:inherit;text-align:left;padding:0">
        <strong>${escapeHTML(song.title)}</strong><small>${escapeHTML(song.artist)}</small>
      </button>
      <span class="setlist-key">${escapeHTML(displayKeyForSong(song))}</span>
      <button class="setlist-remove" data-remove-item="${escapeHTML(item.uid)}">✕</button>
    </div>`;
  }).join("");
  installSetlistDragHandlers();
  chartContextIds = getSetlistSongIds(setlist);
  renderChartNavigation();
}

function isCompactLayout() {
  return window.matchMedia("(max-width: 700px)").matches;
}

function updateLayoutButton() {
  const fullScreen = document.body.classList.contains("performance-mode");
  els.backToLibraryButton.innerHTML = fullScreen ? "☰ <span>Library</span>" : "⛶ <span>Full Screen</span>";
  els.backToLibraryButton.setAttribute("aria-expanded", String(!fullScreen || document.body.classList.contains("library-drawer-open")));
}

function enterPerformanceMode() {
  document.body.classList.add("mobile-chart-open", "performance-mode");
  document.body.classList.remove("library-drawer-open");
  updateLayoutButton();
  requestPerformanceWakeLock();
}

function showSplitLibraryView() {
  document.body.classList.remove("performance-mode", "library-drawer-open");
  settings.sidebarCollapsed = false;
  settings.libraryCollapsed = false;
  saveAll();
  applySettings();
  updateLayoutButton();
}

function openLibraryDrawer() {
  if (!isCompactLayout()) {
    showSplitLibraryView();
    return;
  }
  document.body.classList.add("library-drawer-open");
  updateLayoutButton();
}

function closeLibraryDrawer() {
  document.body.classList.remove("library-drawer-open");
  updateLayoutButton();
}

function toggleLibraryDrawer() {
  if (!isCompactLayout()) {
    if (document.body.classList.contains("performance-mode")) showSplitLibraryView();
    else enterPerformanceMode();
    return;
  }
  if (document.body.classList.contains("library-drawer-open")) closeLibraryDrawer();
  else openLibraryDrawer();
}

function openSongsView() {
  activeView = "songs";
  activeCategory = null;
  specialFilter = null;
  renderLibrary();
  renderSidebarSetlists();
}

function openSetlist(id = activeSetlistId) {
  activeView = "setlists";
  activeCategory = null;
  specialFilter = null;
  if (id) activeSetlistId = id;
  renderLibrary();
  renderSidebarSetlists();
}

function openCategory(type) {
  activeView = "songs";
  activeCategory = type;
  specialFilter = null;
  renderLibrary();
}

function openSpecialFilter(type) {
  activeView = "songs";
  activeCategory = null;
  specialFilter = type;
  if (type === "recent") {
    sortState = { key: "recent", direction: -1 };
  }
  renderLibrary();
}

function selectSong(songId, contextIds = null) {
  const song = songs.find(candidate => candidate.id === songId);
  if (!song) return;
  activeSongId = songId;
  currentTransposeOffset = Number(song.transposeOffset) || 0;
  if (Array.isArray(contextIds) && contextIds.length) chartContextIds = contextIds;
  renderLibrary();
  renderChart();
  enterPerformanceMode();
  closeLibraryDrawer();
  els.chartPaper.scrollTop = 0;
  updateScrollProgress();
}

const SHARP_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NOTE_TO_INDEX = {
  C: 0, "B#": 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, Fb: 4,
  "E#": 5, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11, Cb: 11
};

function transposeNote(note, offset, useFlats) {
  const index = NOTE_TO_INDEX[note];
  if (index === undefined) return note;
  const output = useFlats ? FLAT_NOTES : SHARP_NOTES;
  return output[(index + offset + 120) % 12];
}

function transposeChord(chord, offset, useFlats) {
  const trimmed = String(chord || "").trim();
  if (!trimmed || /^(N\.?C\.?|X|—|-)$/.test(trimmed)) return trimmed;
  const parts = trimmed.split("/");
  const transposePart = part => {
    const match = part.match(/^([A-G](?:#|b)?)(.*)$/);
    if (!match) return part;
    return `${transposeNote(match[1], offset, useFlats)}${match[2]}`;
  };
  return parts.map(transposePart).join("/");
}

function displayKeyForSong(song) {
  return transposeChord(song.originalKey, Number(song.transposeOffset) || 0, Boolean(song.useFlats));
}

function displayKeyForActiveSong() {
  const song = getActiveSong();
  return song ? transposeChord(song.originalKey, currentTransposeOffset, Boolean(song.useFlats)) : "—";
}

function looksLikeChordToken(value) {
  return /^(?:[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add)?\d*(?:\([^)]*\))?(?:\/[A-G](?:#|b)?)?|N\.?C\.?)$/.test(value.trim());
}

function renderChartText(chart, offset, useFlats) {
  const lines = String(chart || "").replaceAll("\r\n", "\n").split("\n");
  return lines.map(line => {
    if (!line.trim()) return `<div class="chart-line">&nbsp;</div>`;

    const sectionMatch = line.trim().match(/^\[([^\]]+)\]$/);
    if (sectionMatch && !looksLikeChordToken(sectionMatch[1])) {
      return `<div class="chart-section">[${escapeHTML(sectionMatch[1])}]</div>`;
    }

    const chordRegex = /\[([^\]]+)\]/g;
    let match;
    let lastIndex = 0;
    const segments = [];
    while ((match = chordRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ chord: "", text: line.slice(lastIndex, match.index) });
      }
      const chord = transposeChord(match[1], offset, useFlats);
      const textStart = chordRegex.lastIndex;
      const nextMatchIndex = line.slice(textStart).search(/\[[^\]]+\]/);
      const textEnd = nextMatchIndex === -1 ? line.length : textStart + nextMatchIndex;
      segments.push({ chord, text: line.slice(textStart, textEnd) });
      lastIndex = textEnd;
      chordRegex.lastIndex = textEnd;
    }
    if (!segments.length) return `<div class="chart-line">${escapeHTML(line)}</div>`;
    if (lastIndex < line.length) segments.push({ chord: "", text: line.slice(lastIndex) });

    const onlyChords = segments.every(segment => !segment.text.trim());
    const html = segments.map(segment => {
      const lyric = segment.text || (onlyChords ? "   " : "");
      return `<span class="chart-segment"><span class="chord">${escapeHTML(segment.chord)}</span><span class="lyric">${escapeHTML(lyric)}</span></span>`;
    }).join("");
    return `<div class="chart-line ${onlyChords ? "chord-only-line" : ""}">${html}</div>`;
  }).join("");
}

function renderChart() {
  const song = getActiveSong();
  const controls = [els.editSongButton, els.quickEditButton, els.favouriteButton, els.songMoreButton,
    els.transposeDownButton, els.transposeSheetButton, els.transposeUpButton, els.resetTransposeButton,
    els.capoButton, els.tempoButton, els.scrollToggleButton, els.scrollSpeedButton, els.chartMoreButton];

  if (!song) {
    els.chartTitle.textContent = "Select a song";
    els.chartArtist.textContent = "Choose a song from the library";
    els.chartPaper.classList.add("empty-chart");
    els.chartPaper.innerHTML = "<div>Select a song from the library.</div>";
    controls.forEach(control => control.disabled = true);
    els.displayKey.textContent = "—";
    els.tempoValue.textContent = "—";
    els.capoLabel.textContent = "Capo";
    renderChartNavigation();
    return;
  }

  controls.forEach(control => control.disabled = false);
  els.chartTitle.textContent = song.title;
  els.chartArtist.textContent = song.artist;
  els.displayKey.textContent = displayKeyForActiveSong();
  els.favouriteButton.textContent = song.favourite ? "♥" : "♡";
  els.favouriteButton.title = song.favourite ? "Remove favourite" : "Add favourite";
  els.tempoValue.textContent = Number(song.tempo) || "—";
  els.settingsTempoValue.textContent = `${Number(song.tempo) || 120} BPM ›`;
  els.capoLabel.textContent = Number(song.capo) ? `Capo ${song.capo}` : "Capo";
  els.chartPaper.classList.remove("empty-chart");
  els.chartPaper.innerHTML = renderChartText(song.chart, currentTransposeOffset, Boolean(song.useFlats));
  updateTransposeDialog();
  renderChartNavigation();
  updateScrollProgress();
}

function renderChartNavigation() {
  const ids = chartContextIds.filter(id => songs.some(song => song.id === id));
  const index = ids.indexOf(activeSongId);
  els.chartPosition.textContent = index >= 0 ? `${index + 1} of ${ids.length}` : `0 of ${ids.length}`;
  els.previousSongButton.disabled = index <= 0;
  els.nextSongButton.disabled = index < 0 || index >= ids.length - 1;
}

function moveChart(direction) {
  const ids = chartContextIds.filter(id => songs.some(song => song.id === id));
  const index = ids.indexOf(activeSongId);
  const nextId = ids[index + direction];
  if (nextId) selectSong(nextId, ids);
}

function changeTranspose(delta) {
  const song = getActiveSong();
  if (!song) return;
  currentTransposeOffset = Math.max(-11, Math.min(11, currentTransposeOffset + delta));
  if (els.rememberTransposeToggle.checked) {
    song.transposeOffset = currentTransposeOffset;
    saveAll();
  }
  renderChart();
}

function resetTranspose() {
  currentTransposeOffset = 0;
  const song = getActiveSong();
  if (song && els.rememberTransposeToggle.checked) {
    song.transposeOffset = 0;
    saveAll();
  }
  renderChart();
}

function updateTransposeDialog() {
  const song = getActiveSong();
  if (!song) return;
  els.transposeOriginalKey.textContent = song.originalKey;
  els.transposeAmount.textContent = currentTransposeOffset > 0 ? `+${currentTransposeOffset}` : String(currentTransposeOffset);
  els.transposeNewKey.textContent = displayKeyForActiveSong();
  els.enharmonicSharpButton.classList.toggle("active", !song.useFlats);
  els.enharmonicFlatButton.classList.toggle("active", Boolean(song.useFlats));
  els.rememberTransposeToggle.checked = Number(song.transposeOffset) === currentTransposeOffset;
}

function openSongEditor(songId = null) {
  editingSongId = songId;
  const song = songs.find(candidate => candidate.id === songId);
  els.songDialogHeading.textContent = song ? "Edit Song" : "Add Song";
  els.songTitleInput.value = song?.title || "";
  els.songArtistInput.value = song?.artist || "";
  els.songKeyInput.value = song?.originalKey || "";
  els.songTempoInput.value = song?.tempo || "";
  els.songTagsInput.value = (song?.tags || []).join(", ");
  els.songCapoInput.value = song?.capo || 0;
  els.songChartInput.value = song?.chart || "";
  openDialog(els.songDialog);
  setTimeout(() => els.songTitleInput.focus(), 50);
}

function saveSongFromForm() {
  const title = els.songTitleInput.value.trim();
  const artist = els.songArtistInput.value.trim();
  const originalKey = els.songKeyInput.value.trim();
  if (!title || !artist || !originalKey) return;

  const existing = songs.find(song => song.id === editingSongId);
  const data = {
    id: existing?.id || uid("cd"),
    title,
    artist,
    originalKey,
    tempo: Number(els.songTempoInput.value) || 120,
    capo: Number(els.songCapoInput.value) || 0,
    tags: els.songTagsInput.value.split(",").map(tag => tag.trim()).filter(Boolean),
    chart: els.songChartInput.value,
    favourite: existing?.favourite || false,
    createdAt: existing?.createdAt || new Date().toISOString(),
    durationSec: existing?.durationSec || 210,
    transposeOffset: existing?.transposeOffset || 0,
    useFlats: existing?.useFlats || false
  };

  if (existing) Object.assign(existing, data);
  else songs.unshift(data);
  activeSongId = data.id;
  currentTransposeOffset = Number(data.transposeOffset) || 0;
  saveAll();
  closeDialog(els.songDialog);
  renderEverything();
  showToast(existing ? "Song updated" : "Song added");
}

function deleteSong(songId) {
  const song = songs.find(candidate => candidate.id === songId);
  if (!song || !confirm(`Delete “${song.title}”?`)) return;
  songs = songs.filter(candidate => candidate.id !== songId);
  setlists.forEach(setlist => setlist.items = setlist.items.filter(item => item.songId !== songId));
  if (activeSongId === songId) activeSongId = songs[0]?.id || null;
  currentTransposeOffset = Number(getActiveSong()?.transposeOffset) || 0;
  saveAll();
  renderEverything();
  showToast("Song deleted");
}

function positionPopover(popover, anchor) {
  popover.classList.remove("hidden");
  const rect = anchor?.getBoundingClientRect?.() || { right: window.innerWidth - 14, bottom: 64, top: 24, left: window.innerWidth - 40 };
  const width = popover.offsetWidth || 280;
  const height = popover.offsetHeight || 260;
  const left = Math.max(10, Math.min(window.innerWidth - width - 10, rect.right - width));
  let top = rect.bottom + 7;
  if (top + height > window.innerHeight - 10) top = Math.max(10, rect.top - height - 7);
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function closePopovers() {
  els.songActionsPopover.classList.add("hidden");
  els.chartMorePopover.classList.add("hidden");
}

function showSongActions(songId, anchor = els.songMoreButton) {
  const song = songs.find(candidate => candidate.id === songId);
  if (!song) return;
  currentActionSongId = songId;
  closePopovers();
  els.songActionsTitle.textContent = song.title;
  const favouriteAction = els.songActionsPopover.querySelector('[data-song-action="favourite"]');
  favouriteAction.textContent = song.favourite ? "Remove from Favourites" : "Add to Favourites";
  positionPopover(els.songActionsPopover, anchor);
}

function showChartMore(anchor = els.chartMoreButton) {
  closePopovers();
  positionPopover(els.chartMorePopover, anchor);
}

function toggleFavourite(songId = activeSongId) {
  const song = songs.find(candidate => candidate.id === songId);
  if (!song) return;
  song.favourite = !song.favourite;
  saveAll();
  renderEverything();
  showToast(song.favourite ? "Added to favourites" : "Removed from favourites");
}

function openSetlistEditor(setlistId = null) {
  editingSetlistId = setlistId;
  const setlist = setlists.find(candidate => candidate.id === setlistId);
  els.setlistDialogHeading.textContent = setlist ? "Edit Setlist" : "New Setlist";
  els.setlistNameInput.value = setlist?.name || "";
  els.setlistDateInput.value = setlist?.date || "";
  openDialog(els.setlistDialog);
  setTimeout(() => els.setlistNameInput.focus(), 50);
}

function saveSetlistFromForm() {
  const name = els.setlistNameInput.value.trim();
  if (!name) return;
  const existing = setlists.find(setlist => setlist.id === editingSetlistId);
  if (existing) {
    existing.name = name;
    existing.date = els.setlistDateInput.value;
    activeSetlistId = existing.id;
  } else {
    const setlist = { id: uid("set"), name, date: els.setlistDateInput.value, items: [] };
    setlists.unshift(setlist);
    activeSetlistId = setlist.id;
  }
  saveAll();
  closeDialog(els.setlistDialog);
  openSetlist(activeSetlistId);
  showToast(existing ? "Setlist updated" : "Setlist created");
}

function deleteActiveSetlist() {
  const setlist = getActiveSetlist();
  if (!setlist || !confirm(`Delete the setlist “${setlist.name}”?`)) return;
  setlists = setlists.filter(candidate => candidate.id !== setlist.id);
  activeSetlistId = setlists[0]?.id || null;
  saveAll();
  renderEverything();
  showToast("Setlist deleted");
}

function addSongToSetlist(songId) {
  let setlist = getActiveSetlist();
  if (!setlist) {
    setlist = { id: uid("set"), name: "New Setlist", date: "", items: [] };
    setlists.push(setlist);
    activeSetlistId = setlist.id;
  }
  setlist.items.push({ uid: uid("item"), type: "song", songId });
  saveAll();
  renderSidebarSetlists();
  if (activeView === "setlists") renderSetlist();
  showToast(`Added to ${setlist.name}`);
}

function addBreakToSetlist() {
  const setlist = getActiveSetlist();
  if (!setlist) return;
  setlist.items.push({ uid: uid("item"), type: "break", label: "BREAK" });
  saveAll();
  renderSetlist();
  showToast("Break added");
}

function removeSetlistItem(itemUid) {
  const setlist = getActiveSetlist();
  if (!setlist) return;
  setlist.items = setlist.items.filter(item => item.uid !== itemUid);
  saveAll();
  renderSetlist();
  renderSidebarSetlists();
}

function installSetlistDragHandlers() {
  els.setlistRows.querySelectorAll(".setlist-drag").forEach(handle => {
    handle.addEventListener("pointerdown", startSetlistDrag);
  });
}

function startSetlistDrag(event) {
  if (event.button !== undefined && event.button !== 0) return;
  const row = event.currentTarget.closest(".setlist-row");
  if (!row) return;
  event.preventDefault();
  row.classList.add("dragging");
  document.body.style.userSelect = "none";

  const move = moveEvent => {
    const target = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY)?.closest(".setlist-row");
    if (!target || target === row || target.parentElement !== els.setlistRows) return;
    const rect = target.getBoundingClientRect();
    const after = moveEvent.clientY > rect.top + rect.height / 2;
    els.setlistRows.insertBefore(row, after ? target.nextSibling : target);
  };

  const finish = () => {
    row.classList.remove("dragging");
    document.body.style.userSelect = "";
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", finish);
    document.removeEventListener("pointercancel", finish);
    const setlist = getActiveSetlist();
    if (!setlist) return;
    const byUid = new Map(setlist.items.map(item => [item.uid, item]));
    setlist.items = [...els.setlistRows.querySelectorAll(".setlist-row")]
      .map(element => byUid.get(element.dataset.itemUid))
      .filter(Boolean);
    saveAll();
    renderSetlist();
  };

  document.addEventListener("pointermove", move, { passive: false });
  document.addEventListener("pointerup", finish, { once: true });
  document.addEventListener("pointercancel", finish, { once: true });
}

function exportBackup() {
  downloadJSON(`chartdeck-backup-${new Date().toISOString().slice(0,10)}.json`, {
    type: "ChartDeckBackup",
    version: 1,
    exportedAt: new Date().toISOString(),
    songs,
    setlists,
    settings
  });
  showToast("Backup downloaded");
}

function exportActiveSetlist() {
  const setlist = getActiveSetlist();
  if (!setlist) return;
  const expanded = setlist.items.map(item => item.type === "song" ? { ...item, song: songs.find(song => song.id === item.songId) } : item);
  downloadJSON(`${safeFileName(setlist.name)}.json`, { type: "ChartDeckSetlist", version: 1, setlist: { ...setlist, items: expanded } });
  showToast("Setlist exported");
}

function safeFileName(value) {
  return String(value || "chartdeck").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function restoreBackup(file) {
  try {
    const data = JSON.parse(await file.text());
    if (data.type !== "ChartDeckBackup" || !Array.isArray(data.songs) || !Array.isArray(data.setlists)) {
      throw new Error("This is not a ChartDeck backup.");
    }
    if (!confirm(`Replace this library with ${data.songs.length} songs and ${data.setlists.length} setlists?`)) return;
    songs = data.songs;
    setlists = data.setlists;
    settings = { ...DEFAULT_SETTINGS, ...(data.settings || {}) };
    activeSongId = songs[0]?.id || null;
    activeSetlistId = setlists[0]?.id || null;
    currentTransposeOffset = Number(getActiveSong()?.transposeOffset) || 0;
    saveAll();
    renderEverything();
    showToast("Backup restored");
  } catch (error) {
    alert(error.message || "Could not import that file.");
  } finally {
    els.restoreInput.value = "";
  }
}

function cycleLineSpacing() {
  const choices = [1.25, 1.45, 1.65, 1.85];
  const index = choices.findIndex(value => Math.abs(value - settings.lineSpacing) < .01);
  settings.lineSpacing = choices[(index + 1) % choices.length];
  saveAll();
  applySettings();
  showToast(`Line spacing ${settings.lineSpacing.toFixed(2)}`);
}

function tapTempo() {
  const now = performance.now();
  tapTimes = tapTimes.filter(time => now - time < 2500);
  tapTimes.push(now);
  if (tapTimes.length < 2) {
    showToast("Tap again to set tempo");
    return;
  }
  const intervals = tapTimes.slice(1).map((time, index) => time - tapTimes[index]);
  const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
  const bpm = Math.max(20, Math.min(300, Math.round(60000 / average)));
  const song = getActiveSong();
  if (song) {
    song.tempo = bpm;
    saveAll();
    renderChart();
  }
  els.settingsTempoValue.textContent = `${bpm} BPM ›`;
  showToast(`${bpm} BPM`);
}

function updateScrollControls() {
  const speed = Math.max(5, Math.min(100, Number(settings.autoScrollSpeed) || 22));
  settings.autoScrollSpeed = speed;
  els.autoScrollToggle.checked = Boolean(settings.autoScroll);
  els.scrollDialogToggle.checked = Boolean(settings.autoScroll);
  els.scrollToggleButton.classList.toggle("active", Boolean(settings.autoScroll));
  els.scrollToggleButton.setAttribute("aria-pressed", String(Boolean(settings.autoScroll)));
  els.scrollStatusIcon.textContent = settings.autoScroll ? "❚❚" : "▶";
  els.scrollSpeedValue.textContent = String(speed);
  els.scrollDialogSpeedValue.textContent = String(speed);
  els.scrollSpeedSlider.value = String(speed);
  els.settingsScrollSpeedValue.textContent = `${speed} ›`;
  els.scrollStartStopButton.textContent = settings.autoScroll ? "Stop Scrolling" : "Start Scrolling";
  [...els.scrollQuickChoices.querySelectorAll("[data-scroll-speed]")].forEach(button => {
    button.classList.toggle("active", Number(button.dataset.scrollSpeed) === speed);
  });
}

function setAutoScroll(enabled, announce = true) {
  const hasSong = Boolean(getActiveSong());
  const hasScrollableContent = els.chartPaper.scrollHeight > els.chartPaper.clientHeight + 2;
  if (enabled && hasSong && !hasScrollableContent) {
    settings.autoScroll = false;
    saveAll();
    updateScrollControls();
    stopAutoScroll();
    if (announce) showToast("This chart already fits on screen");
    return;
  }
  settings.autoScroll = Boolean(enabled && hasSong);
  saveAll();
  updateScrollControls();
  if (settings.autoScroll) {
    startAutoScroll();
    requestPerformanceWakeLock();
  } else {
    stopAutoScroll();
  }
  if (announce) showToast(settings.autoScroll ? `Auto-scroll on • ${settings.autoScrollSpeed} speed` : "Auto-scroll paused");
}

function setAutoScrollSpeed(value, announce = false) {
  settings.autoScrollSpeed = Math.max(5, Math.min(100, Number(value) || 22));
  saveAll();
  updateScrollControls();
  if (announce) showToast(`Scroll speed ${settings.autoScrollSpeed}`);
}

function toggleAutoScroll() {
  setAutoScroll(!settings.autoScroll);
}

function openScrollDialog() {
  updateScrollControls();
  openDialog(els.scrollDialog);
}

function updateScrollProgress() {
  if (!els.chartPaper || !els.scrollProgressBar) return;
  const available = Math.max(0, els.chartPaper.scrollHeight - els.chartPaper.clientHeight);
  const progress = available ? Math.min(1, Math.max(0, els.chartPaper.scrollTop / available)) : 0;
  els.scrollProgressBar.style.width = `${progress * 100}%`;
  els.scrollProgressTrack.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
}

function scrollChartToTop() {
  autoScrollPosition = 0;
  els.chartPaper.scrollTo({ top: 0, behavior: "smooth" });
  updateScrollProgress();
  showToast("Back to the top");
}

function startAutoScroll() {
  stopAutoScroll();
  if (!settings.autoScroll || !activeSongId) return;
  lastAutoScrollTime = performance.now();
  autoScrollPosition = Number(els.chartPaper.scrollTop) || 0;
  const step = time => {
    if (!settings.autoScroll || !activeSongId) return;
    const elapsed = Math.min(.1, (time - lastAutoScrollTime) / 1000);
    lastAutoScrollTime = time;
    autoScrollPosition += settings.autoScrollSpeed * elapsed;
    els.chartPaper.scrollTop = autoScrollPosition;
    updateScrollProgress();
    if (els.chartPaper.scrollTop + els.chartPaper.clientHeight >= els.chartPaper.scrollHeight - 2) {
      settings.autoScroll = false;
      saveAll();
      updateScrollControls();
      stopAutoScroll();
      showToast("Auto-scroll finished");
      return;
    }
    autoScrollFrame = requestAnimationFrame(step);
  };
  autoScrollFrame = requestAnimationFrame(step);
}

function stopAutoScroll() {
  if (autoScrollFrame) cancelAnimationFrame(autoScrollFrame);
  autoScrollFrame = null;
  lastAutoScrollTime = null;
  autoScrollPosition = Number(els.chartPaper?.scrollTop) || 0;
}

async function requestPerformanceWakeLock() {
  if (!("wakeLock" in navigator) || !activeSongId || document.visibilityState !== "visible") return;
  try {
    if (!wakeLock) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    }
  } catch (error) {
    console.debug("Wake lock unavailable", error);
  }
}

async function releasePerformanceWakeLock() {
  try { await wakeLock?.release(); } catch (error) { console.debug("Wake lock release", error); }
  wakeLock = null;
}

function setCapo(value, announce = true) {
  const song = getActiveSong();
  if (!song) return;
  song.capo = Math.max(0, Math.min(12, Number(value) || 0));
  saveAll();
  renderChart();
  updateCapoChoices();
  if (announce) showToast(song.capo ? `Capo ${song.capo}` : "Capo off");
}

function changeCapo(delta) {
  const song = getActiveSong();
  if (!song) return;
  setCapo(Math.max(0, Math.min(12, (Number(song.capo) || 0) + delta)));
}

function cycleCapo() { changeCapo(1); }

function updateCapoChoices() {
  const capo = Number(getActiveSong()?.capo) || 0;
  els.capoChoices.querySelectorAll("[data-capo]").forEach(button => {
    button.classList.toggle("active", Number(button.dataset.capo) === capo);
  });
}

function openCapoDialog() {
  updateCapoChoices();
  openDialog(els.capoDialog);
}

function setTempo(value, announce = true) {
  const song = getActiveSong();
  if (!song) return;
  const bpm = Math.max(20, Math.min(300, Math.round(Number(value) || 120)));
  song.tempo = bpm;
  saveAll();
  renderChart();
  els.tempoNumberInput.value = String(bpm);
  els.tempoSlider.value = String(bpm);
  if (announce) showToast(`${bpm} BPM`);
}

function changeTempo(delta) {
  const song = getActiveSong();
  if (!song) return;
  setTempo((Number(song.tempo) || 120) + delta);
}

function openTempoDialog() {
  const bpm = Number(getActiveSong()?.tempo) || 120;
  els.tempoNumberInput.value = String(bpm);
  els.tempoSlider.value = String(bpm);
  openDialog(els.tempoDialog);
  setTimeout(() => { els.tempoNumberInput.focus(); els.tempoNumberInput.select(); }, 60);
}

function installVerticalGestureControl(element, handlers) {
  let startY = 0;
  let pointerId = null;
  element.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;
    startY = event.clientY;
    pointerId = event.pointerId;
    element.setPointerCapture?.(pointerId);
    event.preventDefault();
  });
  element.addEventListener("pointerup", event => {
    if (pointerId !== event.pointerId) return;
    const dy = event.clientY - startY;
    pointerId = null;
    if (Math.abs(dy) >= 18) {
      const steps = Math.max(1, Math.round(Math.abs(dy) / (handlers.stepPixels || 28)));
      handlers.onSwipe?.(dy < 0 ? steps : -steps);
    } else {
      handlers.onTap?.();
    }
  });
  element.addEventListener("pointercancel", () => { pointerId = null; });
}

function setSort(key) {
  if (sortState.key === key) sortState.direction *= -1;
  else sortState = { key, direction: 1 };
  document.querySelectorAll(".column-sort").forEach(button => button.classList.toggle("active", button.dataset.sort === key));
  renderSongTable();
}

els.mainNavigation.addEventListener("click", event => {
  const button = event.target.closest(".nav-item");
  if (!button) return;
  if (button.dataset.view === "songs") openSongsView();
  else if (button.dataset.view === "setlists") openSetlist();
  else if (["artist", "tag", "key"].includes(button.dataset.filter)) openCategory(button.dataset.filter);
  else if (["recent", "favourite"].includes(button.dataset.filter)) openSpecialFilter(button.dataset.filter);
});

els.sidebarSetlists.addEventListener("click", event => {
  const button = event.target.closest("[data-setlist-id]");
  if (button) openSetlist(button.dataset.setlistId);
});

els.songTable.addEventListener("click", event => {
  const open = event.target.closest("[data-open-song]");
  if (open) selectSong(open.dataset.openSong, filteredSongs().map(song => song.id));
  const menu = event.target.closest("[data-song-menu]");
  if (menu) { event.stopPropagation(); showSongActions(menu.dataset.songMenu, menu); }
});

els.categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category-value]");
  if (!button) return;
  const value = button.dataset.categoryValue;
  filterState = { artist: "", tag: "", key: "" };
  filterState[activeCategory] = value;
  activeCategory = null;
  activeView = "songs";
  renderEverything();
});

els.setlistRows.addEventListener("click", event => {
  const songButton = event.target.closest("[data-open-setlist-song]");
  if (songButton) selectSong(songButton.dataset.openSetlistSong, getSetlistSongIds(getActiveSetlist()));
  const removeButton = event.target.closest("[data-remove-item]");
  if (removeButton) removeSetlistItem(removeButton.dataset.removeItem);
  const createButton = event.target.closest("[data-create-first-setlist]");
  if (createButton) openSetlistEditor();
});

els.searchInput.addEventListener("input", () => renderSongTable());
els.filterButton.addEventListener("click", () => openDialog(els.filterDialog));
els.artistFilterSelect.addEventListener("change", event => { filterState.artist = event.target.value; renderSongTable(); });
els.tagFilterSelect.addEventListener("change", event => { filterState.tag = event.target.value; renderSongTable(); });
els.keyFilterSelect.addEventListener("change", event => { filterState.key = event.target.value; renderSongTable(); });
els.clearFiltersButton.addEventListener("click", () => {
  filterState = { artist: "", tag: "", key: "" };
  specialFilter = null;
  renderFilterOptions();
  renderSongTable();
  showToast("Filters cleared");
});

document.querySelectorAll(".column-sort").forEach(button => button.addEventListener("click", () => setSort(button.dataset.sort)));
els.addSongButton.addEventListener("click", () => openSongEditor());
els.editSongButton.addEventListener("click", () => openSongEditor(activeSongId));
els.quickEditButton.addEventListener("click", () => openSongEditor(activeSongId));
els.songMoreButton.addEventListener("click", event => { event.stopPropagation(); showSongActions(activeSongId, els.songMoreButton); });
els.favouriteButton.addEventListener("click", () => toggleFavourite());
els.songForm.addEventListener("submit", event => { event.preventDefault(); saveSongFromForm(); });
els.quickNewSetlistButton.addEventListener("click", () => openSetlistEditor());
els.newSetlistButton.addEventListener("click", () => openSetlistEditor());
els.renameSetlistButton.addEventListener("click", () => openSetlistEditor(activeSetlistId));
els.setlistForm.addEventListener("submit", event => { event.preventDefault(); saveSetlistFromForm(); });
els.addBreakButton.addEventListener("click", addBreakToSetlist);

els.transposeDownButton.addEventListener("click", () => changeTranspose(-1));
els.transposeUpButton.addEventListener("click", () => changeTranspose(1));
els.resetTransposeButton.addEventListener("click", resetTranspose);
els.transposeSheetButton.addEventListener("click", () => { updateTransposeDialog(); openDialog(els.transposeDialog); });
els.sheetTransposeDown.addEventListener("click", () => changeTranspose(-1));
els.sheetTransposeUp.addEventListener("click", () => changeTranspose(1));
[els.enharmonicSharpButton, els.enharmonicFlatButton].forEach(button => {
  button.addEventListener("click", () => {
    const song = getActiveSong();
    if (!song) return;
    song.useFlats = button.dataset.enharmonic === "flat";
    saveAll();
    renderChart();
  });
});
els.rememberTransposeToggle.addEventListener("change", event => {
  const song = getActiveSong();
  if (!song) return;
  song.transposeOffset = event.target.checked ? currentTransposeOffset : 0;
  saveAll();
  showToast(event.target.checked ? "Preferred key remembered" : "Preferred key cleared");
});

els.previousSongButton.addEventListener("click", () => moveChart(-1));
els.nextSongButton.addEventListener("click", () => moveChart(1));
els.backToLibraryButton.addEventListener("click", event => { event.stopPropagation(); toggleLibraryDrawer(); });
els.scrollToggleButton.addEventListener("click", toggleAutoScroll);
els.scrollSpeedButton.addEventListener("click", openScrollDialog);
els.autoScrollSettingsButton.addEventListener("click", openScrollDialog);
els.tapTempoSettingsButton.addEventListener("click", openTempoDialog);
els.chartMoreButton.addEventListener("click", event => { event.stopPropagation(); showChartMore(els.chartMoreButton); });
els.themeButton.addEventListener("click", () => openDialog(els.themeDialog));
els.settingsButton.addEventListener("click", () => openDialog(els.settingsDialog));
els.sidebarCollapseButton.addEventListener("click", () => {
  settings.sidebarCollapsed = !settings.sidebarCollapsed; saveAll(); applySettings();
});
els.libraryCollapseButton.addEventListener("click", () => {
  if (document.body.classList.contains("performance-mode")) closeLibraryDrawer();
  else { settings.libraryCollapsed = !settings.libraryCollapsed; saveAll(); applySettings(); }
});
els.drawerScrim.addEventListener("click", closeLibraryDrawer);

els.themeChoices.addEventListener("click", event => {
  const button = event.target.closest("button[data-theme]");
  if (!button) return;
  settings.chartTheme = button.dataset.theme;
  saveAll();
  applySettings();
});
els.fontSizeSlider.addEventListener("input", event => {
  settings.fontSize = Number(event.target.value);
  saveAll();
  applySettings();
});
els.chordColourPicker.addEventListener("input", event => {
  settings.chordColor = event.target.value;
  saveAll();
  applySettings();
});
els.chordColourSwatches.addEventListener("click", event => {
  const button = event.target.closest("[data-colour]");
  if (!button) return;
  settings.chordColor = button.dataset.colour;
  saveAll();
  applySettings();
});
els.lineSpacingButton.addEventListener("click", cycleLineSpacing);
els.autoScrollToggle.addEventListener("change", event => setAutoScroll(event.target.checked));
els.scrollDialogToggle.addEventListener("change", event => setAutoScroll(event.target.checked));
els.scrollSpeedSlider.addEventListener("input", event => setAutoScrollSpeed(event.target.value));
els.scrollSpeedSlider.addEventListener("change", event => setAutoScrollSpeed(event.target.value, true));
els.scrollQuickChoices.addEventListener("click", event => {
  const button = event.target.closest("[data-scroll-speed]");
  if (!button) return;
  setAutoScrollSpeed(button.dataset.scrollSpeed, true);
});
els.scrollToTopButton.addEventListener("click", scrollChartToTop);
els.scrollStartStopButton.addEventListener("click", toggleAutoScroll);
els.footPedalButton.addEventListener("click", () => showToast("Foot-pedal learn mode is planned for the next build"));
els.backupButton.addEventListener("click", exportBackup);
els.restoreButton.addEventListener("click", () => els.restoreInput.click());
els.restoreInput.addEventListener("change", event => { if (event.target.files[0]) restoreBackup(event.target.files[0]); });

els.capoChoices.addEventListener("click", event => {
  const button = event.target.closest("[data-capo]");
  if (!button) return;
  setCapo(Number(button.dataset.capo));
});

els.tempoSlider.addEventListener("input", event => {
  els.tempoNumberInput.value = event.target.value;
});
els.tempoNumberInput.addEventListener("input", event => {
  const value = Math.max(20, Math.min(300, Number(event.target.value) || 20));
  els.tempoSlider.value = String(value);
});
els.tempoQuickChoices.addEventListener("click", event => {
  const button = event.target.closest("[data-tempo]");
  if (!button) return;
  els.tempoNumberInput.value = button.dataset.tempo;
  els.tempoSlider.value = button.dataset.tempo;
});
els.tempoForm.addEventListener("submit", event => {
  event.preventDefault();
  setTempo(els.tempoNumberInput.value);
  closeDialog(els.tempoDialog);
});

installVerticalGestureControl(els.capoButton, {
  stepPixels: 30,
  onSwipe: steps => changeCapo(steps),
  onTap: () => {
    const now = Date.now();
    if (now - lastCapoTapAt < 320) {
      clearTimeout(capoTapTimer); lastCapoTapAt = 0; openCapoDialog(); return;
    }
    lastCapoTapAt = now;
    capoTapTimer = setTimeout(() => { cycleCapo(); lastCapoTapAt = 0; }, 330);
  }
});

installVerticalGestureControl(els.tempoButton, {
  stepPixels: 8,
  onSwipe: steps => changeTempo(steps),
  onTap: () => {
    const now = Date.now();
    if (now - lastTempoControlTapAt < 230) {
      lastTempoControlTapAt = 0; tapTimes = []; openTempoDialog(); return;
    }
    lastTempoControlTapAt = now;
    tapTempo();
  }
});

els.songActionsPopover.addEventListener("click", event => {
  const button = event.target.closest("[data-song-action]");
  if (!button || !currentActionSongId) return;
  const action = button.dataset.songAction;
  const id = currentActionSongId;
  closePopovers();
  if (action === "open") selectSong(id, filteredSongs().map(song => song.id));
  if (action === "setlist") addSongToSetlist(id);
  if (action === "favourite") toggleFavourite(id);
  if (action === "edit") openSongEditor(id);
  if (action === "delete") deleteSong(id);
});

els.chartMorePopover.addEventListener("click", event => {
  const button = event.target.closest("[data-chart-action]");
  if (!button) return;
  const action = button.dataset.chartAction;
  closePopovers();
  if (action === "themes") openDialog(els.themeDialog);
  if (action === "autoscroll") openScrollDialog();
  if (action === "font-up") { settings.fontSize = Math.min(36, settings.fontSize + 1); saveAll(); applySettings(); }
  if (action === "font-down") { settings.fontSize = Math.max(16, settings.fontSize - 1); saveAll(); applySettings(); }
  if (action === "spacing") cycleLineSpacing();
  if (action === "library") openLibraryDrawer();
});

els.chartPaper.addEventListener("scroll", updateScrollProgress, { passive: true });
els.chartPaper.addEventListener("pointerdown", () => {
  if (settings.autoScroll) setAutoScroll(false, false);
}, { passive: true });
els.scrollProgressTrack.addEventListener("click", event => {
  const rect = els.scrollProgressTrack.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  const available = Math.max(0, els.chartPaper.scrollHeight - els.chartPaper.clientHeight);
  autoScrollPosition = available * ratio;
  els.chartPaper.scrollTop = autoScrollPosition;
  updateScrollProgress();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && activeSongId) requestPerformanceWakeLock();
  else releasePerformanceWakeLock();
});
window.addEventListener("resize", () => {
  closeLibraryDrawer();
  updateLayoutButton();
  updateScrollProgress();
});

document.addEventListener("pointerdown", event => {
  if (!event.target.closest(".action-popover") && !event.target.closest("#songMoreButton") && !event.target.closest("#chartMoreButton") && !event.target.closest("[data-song-menu]")) closePopovers();
});

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => { if (event.target === dialog) closeDialog(dialog); });
});

document.querySelectorAll("[data-close-dialog]").forEach(button => {
  button.addEventListener("click", () => closeDialog($(button.dataset.closeDialog)));
});

document.querySelectorAll(".setlist-footer-button").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.setAction;
    if (action === "songs") openSongsView();
    if (action === "reorder") showToast("Drag the handles to reorder songs");
    if (action === "info") {
      const setlist = getActiveSetlist();
      if (setlist) showToast(`${setlist.name}: ${getSetlistSongIds(setlist).length} songs`);
    }
    if (action === "export") exportActiveSetlist();
    if (action === "more") deleteActiveSetlist();
  });
});

window.addEventListener("keydown", event => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
  if (event.key === "ArrowRight") moveChart(1);
  if (event.key === "ArrowLeft") moveChart(-1);
  if (event.key === "+" || event.key === "=") changeTranspose(1);
  if (event.key === "-") changeTranspose(-1);
  if (event.key.toLowerCase() === "f") toggleFavourite();
  if (event.code === "Space") { event.preventDefault(); toggleAutoScroll(); }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Service worker", error)));
}

currentTransposeOffset = Number(getActiveSong()?.transposeOffset) || 0;
renderEverything();
updateLayoutButton();
updateScrollProgress();
