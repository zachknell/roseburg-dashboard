import React, { useState, useMemo, useEffect, useRef } from "react";
import { Download, Upload, Plus, X, Edit3, Trash2, Eye, EyeOff, Save, RefreshCw } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// ============================================================
// SUPABASE
// ============================================================

const SUPABASE_URL = "https://lkjoffpzzjflmzocaesz.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ka-sbvS6bYyS-OtZ3aO0lw_Wz1pSbPI";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// SEED DATA
// ============================================================

const buildEmptyDay = (day) => ({
  day, listeners: null, cum_listeners: null, streams: null, cum_streams: null,
  pi: null, saves: null, playlist_adds: null, spend: null,
  radio: null, dw: null, rr: null,
});

const earthDays = [
  { day: 1, listeners: 395, streams: 724, pi: null, saves: 260, playlist_adds: 148, spend: 0 },
  { day: 2, listeners: 324, streams: 681, pi: 15, saves: 98, playlist_adds: 66, spend: 0 },
  { day: 3, listeners: 284, streams: 570, pi: 20, saves: 116, playlist_adds: 66, spend: 30 },
  { day: 4, listeners: 366, streams: 662, pi: 20, saves: 120, playlist_adds: 96, spend: 30 },
  { day: 5, listeners: 425, streams: 861, pi: 22, saves: 122, playlist_adds: 53, spend: 30 },
  { day: 6, listeners: 596, streams: 1120, pi: 24, saves: 162, playlist_adds: 95, spend: 30 },
  { day: 7, listeners: 961, streams: 1848, pi: 27, saves: 363, playlist_adds: 205, spend: 120 },
  { day: 8, listeners: 1294, streams: 2235, pi: 30, saves: 546, playlist_adds: 342, spend: 225 },
  { day: 9, listeners: 1363, streams: 2198, pi: 32, saves: 557, playlist_adds: 327, spend: 350 },
  { day: 10, listeners: 1296, streams: 2060, pi: 32, saves: 470, playlist_adds: 264, spend: 400 },
  { day: 11, listeners: 1872, streams: 3167, pi: 33, saves: 559, playlist_adds: 313, spend: 270 },
  { day: 12, listeners: 1946, streams: 2937, pi: 36, saves: 92, playlist_adds: 98, spend: 15 },
  { day: 13, listeners: 1465, streams: 2056, pi: 37, saves: 73, playlist_adds: 67, spend: 15 },
  { day: 14, listeners: 1203, streams: 1777, pi: 37, saves: 76, playlist_adds: 70, spend: 15 },
  { day: 15, listeners: 1038, streams: 1484, pi: 37, saves: 59, playlist_adds: 93, spend: 15 },
  { day: 16, listeners: 795, streams: 1209, pi: 38, saves: 78, playlist_adds: 57, spend: 60 },
  { day: 17, listeners: 920, streams: 1323, pi: 38, saves: 197, playlist_adds: 142, spend: 120 },
  { day: 18, listeners: 1507, streams: 2174, pi: 38, saves: 246, playlist_adds: 184, spend: 130 },
  { day: 19, listeners: 1378, streams: 1982, pi: 39, saves: 241, playlist_adds: 144, spend: 130 },
  { day: 20, listeners: 1391, streams: 2141, pi: 39, saves: 209, playlist_adds: 130, spend: 130 },
  { day: 21, listeners: 1535, streams: 2280, pi: 39, saves: 220, playlist_adds: 169, spend: 130 },
  { day: 22, listeners: 2225, streams: 3050, pi: 40, saves: 252, playlist_adds: 222, spend: 130 },
  { day: 23, listeners: 1765, streams: 2459, pi: 40, saves: 319, playlist_adds: 175, spend: 130 },
  { day: 24, listeners: 1621, streams: 2352, pi: 40, saves: 283, playlist_adds: 177, spend: 130 },
  { day: 25, listeners: 2126, streams: 2960, pi: 41, saves: 236, playlist_adds: 193, spend: 130 },
  { day: 26, listeners: 2457, streams: 3292, pi: 41, saves: 206, playlist_adds: 135, spend: 130 },
  { day: 27, listeners: 2172, streams: 3153, pi: 42, saves: 196, playlist_adds: 150, spend: 130 },
  { day: 28, listeners: 1848, streams: 2823, pi: 42, saves: 168, playlist_adds: 126, spend: 130 },
  { day: 29, listeners: 2215, streams: 3026, pi: 42, saves: 165, playlist_adds: 132, spend: 130 },
  { day: 30, listeners: 1645, streams: 2205, pi: 42, saves: 123, playlist_adds: 74, spend: 130 },
];

const giveDays = [
  { day: 1, listeners: 448, streams: 652, pi: null, saves: 202, playlist_adds: 128, spend: 0 },
  { day: 2, listeners: 273, streams: 384, pi: null, saves: 67, playlist_adds: 38, spend: 0 },
  { day: 3, listeners: 243, streams: 327, pi: 16, saves: 75, playlist_adds: 50, spend: 30 },
  { day: 4, listeners: 454, streams: 695, pi: 18, saves: 173, playlist_adds: 95, spend: 30 },
  { day: 5, listeners: 469, streams: 702, pi: 20, saves: 126, playlist_adds: 87, spend: 30 },
  { day: 6, listeners: 575, streams: 955, pi: 22, saves: 150, playlist_adds: 108, spend: 30 },
  { day: 7, listeners: 611, streams: 942, pi: 23, saves: 158, playlist_adds: 105, spend: 30 },
  { day: 8, listeners: 1095, streams: 1468, pi: 25, saves: 204, playlist_adds: 125, spend: 30 },
  { day: 9, listeners: 781, streams: 1005, pi: 27, saves: 147, playlist_adds: 79, spend: 30 },
  { day: 10, listeners: 746, streams: 1000, pi: 27, saves: 195, playlist_adds: 155, spend: 30 },
  { day: 11, listeners: 3419, streams: 4447, pi: 28, saves: 337, playlist_adds: 453, spend: 30 },
  { day: 12, listeners: 2984, streams: 3743, pi: 31, saves: 318, playlist_adds: 192, spend: 30 },
  { day: 13, listeners: 2873, streams: 3618, pi: 34, saves: 270, playlist_adds: 163, spend: 30 },
  { day: 14, listeners: 2492, streams: 3158, pi: 35, saves: 196, playlist_adds: 112, spend: 30 },
  { day: 15, listeners: 1850, streams: 2425, pi: 35, saves: 167, playlist_adds: 131, spend: 30 },
  { day: 16, listeners: 1231, streams: 1768, pi: 36, saves: 154, playlist_adds: 101, spend: 30 },
  { day: 17, listeners: 1310, streams: 1899, pi: 36, saves: 171, playlist_adds: 111, spend: 30 },
  { day: 18, listeners: 1510, streams: 2103, pi: 37, saves: 208, playlist_adds: 111, spend: 44 },
  { day: 19, listeners: 1517, streams: 1907, pi: 37, saves: 194, playlist_adds: 85, spend: 44 },
  { day: 20, listeners: 1792, streams: 2295, pi: 37, saves: 207, playlist_adds: 123, spend: 44 },
  { day: 21, listeners: 1834, streams: 2412, pi: 38, saves: 278, playlist_adds: 171, spend: 44 },
  { day: 22, listeners: 2728, streams: 3333, pi: 38, saves: 276, playlist_adds: 196, spend: 76.50 },
  { day: 23, listeners: 2912, streams: 3593, pi: 38, saves: 275, playlist_adds: 145, spend: 76.50 },
  { day: 24, listeners: 2696, streams: 3310, pi: 39, saves: 277, playlist_adds: 167, spend: 76.50 },
  { day: 25, listeners: 3556, streams: 4350, pi: 39, saves: 335, playlist_adds: 190, spend: 76.50 },
  { day: 26, listeners: 3112, streams: 4018, pi: 40, saves: 286, playlist_adds: 189, spend: 76.50 },
  { day: 27, listeners: 4200, streams: 5224, pi: 40, saves: 397, playlist_adds: 273, spend: 76.50 },
  { day: 28, listeners: 3121, streams: 4289, pi: 41, saves: 311, playlist_adds: 179, spend: 76.50 },
  { day: 29, listeners: 3040, streams: 3907, pi: 42, saves: 278, playlist_adds: 195, spend: 76.50 },
  { day: 30, listeners: 2716, streams: 3524, pi: 42, saves: 250, playlist_adds: 176, spend: 76.50 },
];

const winstonDays = [
  { day: 1, listeners: 377, streams: 596, pi: null, saves: 157, playlist_adds: 82, spend: 60 },
  { day: 2, listeners: 208, streams: 254, pi: null, saves: 54, playlist_adds: 21, spend: 60 },
  { day: 3, listeners: 267, streams: 305, pi: 16, saves: 58, playlist_adds: 31, spend: 60 },
  { day: 4, listeners: 392, streams: 460, pi: 18, saves: 63, playlist_adds: 44, spend: 75.50 },
  { day: 5, listeners: 254, streams: 318, pi: 20, saves: 48, playlist_adds: 75, spend: 94.37 },
  { day: 6, listeners: 301, streams: 407, pi: 21, saves: 86, playlist_adds: 37, spend: 101 },
  { day: 7, listeners: 392, streams: 492, pi: 23, saves: 77, playlist_adds: 44, spend: 126 },
  { day: 8, listeners: 572, streams: 704, pi: 24, saves: 94, playlist_adds: 47, spend: 126 },
  { day: 9, listeners: 534, streams: 656, pi: 24, saves: 82, playlist_adds: 64, spend: 127.50 },
  { day: 10, listeners: 478, streams: 784, pi: 25, saves: 88, playlist_adds: 66, spend: 127.50 },
  { day: 11, listeners: 402, streams: 502, pi: 28, saves: 97, playlist_adds: 56, spend: 105 },
  { day: 12, listeners: 509, streams: 606, pi: 28, saves: 62, playlist_adds: 41, spend: 105 },
  { day: 13, listeners: 459, streams: 568, pi: 29, saves: 74, playlist_adds: 42, spend: 105 },
  { day: 14, listeners: 407, streams: 618, pi: 29, saves: 48, playlist_adds: 32, spend: 0 },
  { day: 15, listeners: 381, streams: 496, pi: 30, saves: 9, playlist_adds: 13, spend: 0 },
  { day: 16, listeners: 355, streams: 483, pi: 30, saves: 12, playlist_adds: 10, spend: 0 },
  { day: 17, listeners: 302, streams: 378, pi: 30, saves: 7, playlist_adds: 6, spend: 0 },
  { day: 18, listeners: 268, streams: 309, pi: 30, saves: 3, playlist_adds: 5, spend: 0 },
  { day: 19, listeners: 259, streams: 315, pi: 30, saves: 2, playlist_adds: 6, spend: 0 },
  { day: 20, listeners: 333, streams: 398, pi: 30, saves: 9, playlist_adds: 11, spend: 0 },
  { day: 21, listeners: 502, streams: 578, pi: 30, saves: 6, playlist_adds: 11, spend: 0 },
  { day: 22, listeners: 487, streams: 548, pi: 30, saves: 9, playlist_adds: 27, spend: 0 },
  { day: 23, listeners: 400, streams: 465, pi: 30, saves: 6, playlist_adds: 18, spend: 0 },
  { day: 24, listeners: 287, streams: 325, pi: 31, saves: 4, playlist_adds: 17, spend: 0 },
  { day: 25, listeners: 306, streams: 343, pi: 31, saves: 8, playlist_adds: 8, spend: 0 },
  { day: 26, listeners: 298, streams: 362, pi: 31, saves: 7, playlist_adds: 7, spend: 0 },
  { day: 27, listeners: 270, streams: 304, pi: 31, saves: 8, playlist_adds: 8, spend: 0 },
  { day: 28, listeners: 360, streams: 416, pi: 31, saves: 6, playlist_adds: 10, spend: 0 },
  { day: 29, listeners: 385, streams: 441, pi: 31, saves: 8, playlist_adds: 14, spend: 0 },
  { day: 30, listeners: 289, streams: 321, pi: 31, saves: 4, playlist_adds: 8, spend: 0 },
];

const fillDays = (data) => {
  const out = [];
  for (let i = 1; i <= 31; i++) {
    const existing = data.find(d => d.day === i);
    out.push({ ...buildEmptyDay(i), ...(existing || {}) });
  }
  return out;
};

const SEED_SONGS = [
  { id: "the-earth", name: "The Earth", releaseDate: "2025-05-02", color: "#5fb89c", isReleased: true, days: fillDays(earthDays) },
  { id: "give", name: "Give", releaseDate: "2025-10-17", color: "#3e5951", isReleased: true, days: fillDays(giveDays) },
  { id: "winston-chapel", name: "Winston Chapel", releaseDate: "2026-03-27", color: "#d4a574", isReleased: false, days: fillDays(winstonDays) },
];

// ============================================================
// METRICS
// ============================================================

const METRICS = [
  { key: "listeners", label: "Listeners", group: "Volume", format: "int", agg: "sum", higherBetter: true, manual: true },
  { key: "net_new_listeners", label: "Net New Listeners", group: "Volume", format: "int", agg: "sum", higherBetter: true, derived: true },
  { key: "cum_listeners", label: "Cumulative Listeners", group: "Volume", format: "int", agg: "last", higherBetter: true, manual: true },
  { key: "streams", label: "Streams", group: "Volume", format: "int", agg: "sum", higherBetter: true, manual: true },
  { key: "cum_streams", label: "Cumulative Streams", group: "Volume", format: "int", agg: "last", higherBetter: true, manual: true },
  { key: "pi", label: "Popularity Index", group: "Volume", format: "int", agg: "last", higherBetter: true, manual: true },

  { key: "saves", label: "Saves", group: "Engagement", format: "int", agg: "sum", higherBetter: true, manual: true },
  { key: "save_rate", label: "Save Rate", group: "Engagement", format: "percent", agg: "weighted_save", higherBetter: true, derived: true },
  { key: "playlist_adds", label: "Playlist Adds", group: "Engagement", format: "int", agg: "sum", higherBetter: true, manual: true },
  { key: "playlist_rate", label: "Playlist Rate", group: "Engagement", format: "percent", agg: "weighted_pl", higherBetter: true, derived: true },
  { key: "intent_rate", label: "Intent Rate", group: "Engagement", format: "percent", agg: "weighted_intent", higherBetter: true, derived: true },
  { key: "spl", label: "Streams / Listener", group: "Engagement", format: "decimal", agg: "weighted_spl", higherBetter: true, derived: true },

  { key: "spend", label: "Daily Spend", group: "Spend", format: "currency", agg: "sum", higherBetter: null, manual: true },
  { key: "cum_spend", label: "Cumulative Spend", group: "Spend", format: "currency", agg: "last", higherBetter: null, derived: true },
  { key: "cpl", label: "Cost / Listener", group: "Spend", format: "currency_precise", agg: "weighted_cpl", higherBetter: false, derived: true },
  { key: "cps", label: "Cost / Save", group: "Spend", format: "currency_precise", agg: "weighted_cps", higherBetter: false, derived: true },

  { key: "radio", label: "Cumulative Radio Streams", group: "Algorithm", format: "int", agg: "last", higherBetter: true, manual: true },
  { key: "dw", label: "Cumulative DW Streams", group: "Algorithm", format: "int", agg: "last", higherBetter: true, manual: true },
  { key: "rr", label: "Cumulative RR Streams", group: "Algorithm", format: "int", agg: "last", higherBetter: true, manual: true },
  { key: "algo_pct", label: "Algo Streams %", group: "Algorithm", format: "percent", agg: "weighted_algo", higherBetter: true, derived: true },
];

const METRIC_GROUPS = ["Volume", "Engagement", "Spend", "Algorithm"];

// ============================================================
// HELPERS
// ============================================================

const DAYS_OF_WEEK = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
const dayOfWeek = (d) => DAYS_OF_WEEK[(d - 1) % 7];
const isPrimeDay = (d) => ["Mon", "Tue", "Wed", "Thu"].includes(dayOfWeek(d));
const isWeekend = (d) => ["Sat", "Sun"].includes(dayOfWeek(d));

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const formatReleaseDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
};

const fmt = (val, format) => {
  if (val === null || val === undefined || isNaN(val)) return "—";
  switch (format) {
    case "int": return Math.round(val).toLocaleString();
    case "decimal": return val.toFixed(2);
    case "percent": return `${val.toFixed(1)}%`;
    case "currency": return `$${val.toFixed(2)}`;
    case "currency_precise": return `$${val.toFixed(2)}`;
    default: return String(val);
  }
};

const computeDerivedDays = (days) => {
  let cumSpend = 0;
  let prevCumListeners = 0;
  return days.map((d) => {
    cumSpend += (d.spend || 0);
    let nnl = null;
    if (d.cum_listeners !== null && d.cum_listeners !== undefined) {
      nnl = d.cum_listeners - prevCumListeners;
      prevCumListeners = d.cum_listeners;
    }
    const denom = (nnl !== null && nnl > 0) ? nnl : (d.listeners || null);
    const save_rate = denom && d.saves !== null ? (d.saves / denom) * 100 : null;
    const playlist_rate = denom && d.playlist_adds !== null ? (d.playlist_adds / denom) * 100 : null;
    const intent_rate = denom && (d.saves !== null || d.playlist_adds !== null)
      ? (((d.saves || 0) + (d.playlist_adds || 0)) / denom) * 100 : null;
    const spl = d.listeners && d.streams ? d.streams / d.listeners : null;
    const cpl = denom && d.spend && d.spend > 0 ? d.spend / denom : null;
    const cps = d.saves && d.spend && d.spend > 0 ? d.spend / d.saves : null;
    const algoTotal = (d.radio || 0) + (d.dw || 0) + (d.rr || 0);
    const algoHasData = d.radio !== null || d.dw !== null || d.rr !== null;
    const algo_pct = algoHasData && d.cum_streams && d.cum_streams > 0
      ? (algoTotal / d.cum_streams) * 100 : null;
    return {
      ...d, cum_spend: cumSpend, net_new_listeners: nnl,
      save_rate, playlist_rate, intent_rate, spl, cpl, cps, algo_pct,
    };
  });
};

const computeAggregate = (days, metricKey, throughDay) => {
  const slice = days.filter(d => d.day <= throughDay);
  const valid = slice.filter(d => d[metricKey] !== null && d[metricKey] !== undefined && !isNaN(d[metricKey]));
  if (valid.length === 0) return null;
  const m = METRICS.find(mm => mm.key === metricKey);
  if (!m) return null;
  switch (m.agg) {
    case "sum": return valid.reduce((s, d) => s + d[metricKey], 0);
    case "last": return valid[valid.length - 1][metricKey];
    case "weighted_save": {
      const t = slice.reduce((s, d) => s + (d.saves || 0), 0);
      const den = slice.reduce((s, d) => s + ((d.net_new_listeners !== null && d.net_new_listeners > 0) ? d.net_new_listeners : (d.listeners || 0)), 0);
      return den > 0 ? (t / den) * 100 : null;
    }
    case "weighted_pl": {
      const t = slice.reduce((s, d) => s + (d.playlist_adds || 0), 0);
      const den = slice.reduce((s, d) => s + ((d.net_new_listeners !== null && d.net_new_listeners > 0) ? d.net_new_listeners : (d.listeners || 0)), 0);
      return den > 0 ? (t / den) * 100 : null;
    }
    case "weighted_intent": {
      const ts = slice.reduce((s, d) => s + (d.saves || 0), 0);
      const tp = slice.reduce((s, d) => s + (d.playlist_adds || 0), 0);
      const den = slice.reduce((s, d) => s + ((d.net_new_listeners !== null && d.net_new_listeners > 0) ? d.net_new_listeners : (d.listeners || 0)), 0);
      return den > 0 ? ((ts + tp) / den) * 100 : null;
    }
    case "weighted_spl": {
      const ts = slice.reduce((s, d) => s + (d.streams || 0), 0);
      const tl = slice.reduce((s, d) => s + (d.listeners || 0), 0);
      return tl > 0 ? ts / tl : null;
    }
    case "weighted_cpl": {
      const sp = slice.reduce((s, d) => s + (d.spend || 0), 0);
      const den = slice.reduce((s, d) => s + ((d.net_new_listeners !== null && d.net_new_listeners > 0) ? d.net_new_listeners : (d.listeners || 0)), 0);
      return den > 0 ? sp / den : null;
    }
    case "weighted_cps": {
      const sp = slice.reduce((s, d) => s + (d.spend || 0), 0);
      const sv = slice.reduce((s, d) => s + (d.saves || 0), 0);
      return sv > 0 ? sp / sv : null;
    }
    case "weighted_algo": {
      // Algo fields are cumulative. The "% through Day N" is just the last
      // filled algo row's totals divided by the last filled cum_streams.
      const lastAlgo = [...slice].reverse().find(d =>
        d.radio !== null || d.dw !== null || d.rr !== null
      );
      const lastCumStreams = [...slice].reverse().find(d =>
        d.cum_streams !== null && d.cum_streams !== undefined
      );
      if (!lastAlgo || !lastCumStreams || lastCumStreams.cum_streams <= 0) return null;
      const algoTotal = (lastAlgo.radio || 0) + (lastAlgo.dw || 0) + (lastAlgo.rr || 0);
      return (algoTotal / lastCumStreams.cum_streams) * 100;
    }
    default: return null;
  }
};

const getCurrentDay = (song) => {
  const lastDay = [...song.days].reverse().find(d => d.listeners !== null);
  return lastDay ? lastDay.day : 0;
};

// Required input fields that must be filled for a day to count as "complete"
// (algo fields are optional - we don't always have that data)
const REQUIRED_INPUT_FIELDS = ["listeners", "cum_listeners", "streams", "cum_streams", "pi", "saves", "playlist_adds", "spend"];

const getMissingFields = (day) => {
  return REQUIRED_INPUT_FIELDS.filter(f => day[f] === null || day[f] === undefined);
};

const isDayComplete = (day) => getMissingFields(day).length === 0;

// A song is "Released" when all 31 days have at least the streams field filled.
// Other fields (PI, spend, saves, etc.) may legitimately be null on some days
// (PI doesn't appear early, spend depends on whether ads ran, etc.)
// Streams is the only field that's reliably non-null every day post-release.
const isSongComplete = (song) => {
  if (!song?.days || song.days.length < 31) return false;
  return song.days.every(d => d.streams !== null && d.streams !== undefined);
};

const getZone = (value, day, benchmarks, metric) => {
  if (value === null || value === undefined || isNaN(value)) return "none";
  const benchValues = benchmarks
    .map(s => s.days.find(d => d.day === day)?.[metric.key])
    .filter(v => v !== null && v !== undefined && !isNaN(v));
  if (benchValues.length === 0) return "none";
  const maxBench = Math.max(...benchValues);
  const minBench = Math.min(...benchValues);
  if (metric.higherBetter === false) {
    if (value < minBench) return "above";
    if (value <= maxBench) return "healthy";
    if (value <= maxBench * 1.5) return "below";
    return "floor";
  } else {
    if (value > maxBench) return "above";
    if (value >= minBench) return "healthy";
    if (value >= minBench * 0.5) return "below";
    return "floor";
  }
};

// ============================================================
// ROOT
// ============================================================

function App() {
  const [songs, setSongs] = useState(() =>
    SEED_SONGS.map(s => ({ ...s, days: computeDerivedDays(s.days) }))
  );
  const [selectedMetric, setSelectedMetric] = useState("listeners");
  const [hoveredDay, setHoveredDay] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [showAddSong, setShowAddSong] = useState(false);
  const [newSongName, setNewSongName] = useState("");
  const [newSongDate, setNewSongDate] = useState("");
  const [hiddenSongs, setHiddenSongs] = useState([]);
  const [popoverData, setPopoverData] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [loadStatus, setLoadStatus] = useState("loading"); // loading | loaded | error | empty
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // Load from Supabase on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("songs")
          .select("song_id, data, updated_at")
          .order("updated_at", { ascending: false });

        if (cancelled) return;

        if (error) {
          console.error("Load error:", error);
          setLoadStatus("error");
          return;
        }

        if (!data || data.length === 0) {
          setLoadStatus("empty");
          return;
        }

        // Each row's `data` field holds the full song object.
        // Recompute derived fields on load.
        const loaded = data.map(row => ({
          ...row.data,
          days: computeDerivedDays(row.data.days || []),
        }));
        setSongs(loaded);
        const latest = data[0]?.updated_at;
        if (latest) setLastSavedAt(new Date(latest));
        setLoadStatus("loaded");
      } catch (err) {
        if (cancelled) return;
        console.error("Load exception:", err);
        setLoadStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const saveToSupabase = async () => {
    setSaveStatus("saving");
    try {
      // Upsert each song by song_id. The `data` column holds the whole object.
      const rows = songs.map(s => ({
        song_id: s.id,
        data: s,
      }));
      const { error } = await supabase
        .from("songs")
        .upsert(rows, { onConflict: "song_id" });

      if (error) {
        console.error("Save error:", error);
        setSaveStatus("error");
        alert("Save failed: " + error.message);
        return;
      }

      // Also delete any rows in the DB that aren't in the current state
      // (handles the case where a song was deleted in the UI).
      const currentIds = songs.map(s => s.id);
      if (currentIds.length > 0) {
        await supabase.from("songs").delete().not("song_id", "in", `(${currentIds.map(id => `"${id}"`).join(",")})`);
      }

      setLastSavedAt(new Date());
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 1800);
    } catch (err) {
      console.error("Save exception:", err);
      setSaveStatus("error");
      alert("Save failed. Check console for details.");
    }
  };

  const reloadFromSupabase = async () => {
    if (!confirm("Reload from cloud? Any unsaved changes will be lost.")) return;
    setLoadStatus("loading");
    try {
      const { data, error } = await supabase
        .from("songs")
        .select("song_id, data, updated_at")
        .order("updated_at", { ascending: false });
      if (error) {
        setLoadStatus("error");
        alert("Reload failed: " + error.message);
        return;
      }
      if (!data || data.length === 0) {
        setLoadStatus("empty");
        return;
      }
      const loaded = data.map(row => ({
        ...row.data,
        days: computeDerivedDays(row.data.days || []),
      }));
      setSongs(loaded);
      const latest = data[0]?.updated_at;
      if (latest) setLastSavedAt(new Date(latest));
      setLoadStatus("loaded");
    } catch (err) {
      setLoadStatus("error");
      alert("Reload failed. Check console for details.");
    }
  };

  const sortedSongs = useMemo(() =>
    [...songs].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)),
    [songs]
  );
  const visibleSongs = sortedSongs.filter(s => !hiddenSongs.includes(s.id));
  const activeSong = useMemo(() => sortedSongs[sortedSongs.length - 1] || null, [sortedSongs]);
  const currentDay = useMemo(() => activeSong ? getCurrentDay(activeSong) : 0, [activeSong]);
  const benchmarks = useMemo(() => sortedSongs.filter(s => s.id !== activeSong?.id), [sortedSongs, activeSong]);

  const updateCell = (songId, day, field, value) => {
    setSongs(prev => prev.map(s => {
      if (s.id !== songId) return s;
      const newDays = s.days.map(d => {
        if (d.day !== day) return d;
        const num = value === "" ? null : parseFloat(value);
        return { ...d, [field]: isNaN(num) ? null : num };
      });
      return { ...s, days: computeDerivedDays(newDays) };
    }));
  };

  const addSong = () => {
    if (!newSongName.trim()) return;
    const id = newSongName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const empty = Array.from({ length: 31 }, (_, i) => buildEmptyDay(i + 1));
    setSongs(prev => [...prev, {
      id, name: newSongName.trim(),
      releaseDate: newSongDate || new Date().toISOString().split("T")[0],
      color: "#a17fc4", isReleased: false,
      days: computeDerivedDays(empty),
    }]);
    setNewSongName(""); setNewSongDate(""); setShowAddSong(false);
  };

  const deleteSong = (songId) => {
    if (!confirm("Delete this song? Cannot be undone.")) return;
    setSongs(prev => prev.filter(s => s.id !== songId));
  };
  const toggleHidden = (songId) => {
    setHiddenSongs(prev => prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]);
  };
  return (
    <div className="dashboard">
      <Background />
      <TitleHeader />
      <ActionBar
        onReload={reloadFromSupabase}
        onAddSong={() => setShowAddSong(true)}
        editMode={editMode} setEditMode={setEditMode}
        currentDay={currentDay} activeSong={activeSong}
        hiddenCount={hiddenSongs.length}
        onShowAll={() => setHiddenSongs([])}
        onSave={saveToSupabase}
        saveStatus={saveStatus}
        loadStatus={loadStatus}
        lastSavedAt={lastSavedAt}
      />

      <SummaryPanel
        currentDay={currentDay}
        activeSongId={activeSong?.id}
        onToggleHidden={toggleHidden}
        onDelete={deleteSong}
        hiddenSongs={hiddenSongs}
        allSongs={sortedSongs}
      />

      <MetricSelector selected={selectedMetric} onChange={setSelectedMetric} />

      <ComparisonTable
        songs={visibleSongs} selectedMetric={selectedMetric}
        currentDay={currentDay} activeSongId={activeSong?.id}
        benchmarks={benchmarks} hoveredDay={hoveredDay} onHover={setHoveredDay}
        editMode={editMode} editingCell={editingCell} setEditingCell={setEditingCell}
        updateCell={updateCell} onShowPopover={setPopoverData}
      />

      {showAddSong && (
        <Modal onClose={() => setShowAddSong(false)} title="Add New Song">
          <div className="form-group">
            <label>Song Name</label>
            <input type="text" value={newSongName} onChange={(e) => setNewSongName(e.target.value)} placeholder="New song name" autoFocus />
          </div>
          <div className="form-group">
            <label>Release Date</label>
            <input type="date" value={newSongDate} onChange={(e) => setNewSongDate(e.target.value)} />
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setShowAddSong(false)}>Cancel</button>
            <button className="btn-primary" onClick={addSong}>Create</button>
          </div>
        </Modal>
      )}

      {popoverData && <Popover data={popoverData} songs={visibleSongs} />}
      <Styles />
    </div>
  );
}

function TitleHeader() {
  return (
    <div className="title-header">
      <h1>Roseburg</h1>
      <p className="title-sub">Opening Month Dashboard</p>
    </div>
  );
}

function ActionBar({ onReload, onAddSong, editMode, setEditMode, currentDay, activeSong, hiddenCount, onShowAll, onSave, saveStatus, loadStatus, lastSavedAt }) {
  const lastSavedLabel = lastSavedAt
    ? `Saved ${formatRelative(lastSavedAt)}`
    : loadStatus === "loading" ? "Loading..."
    : loadStatus === "error" ? "Connection error"
    : loadStatus === "empty" ? "Not yet saved"
    : "";

  return (
    <header className="action-bar">
      <div className="action-bar-left">
        <span className="ab-label">Current Release</span>
        <span className="ab-divider"></span>
        <span className="ab-name">{activeSong ? activeSong.name : "—"}</span>
        {activeSong && <span className="ab-day">Day {currentDay} of 31</span>}
        {lastSavedLabel && <span className={`ab-status ${loadStatus === "error" ? "error" : ""}`}>{lastSavedLabel}</span>}
      </div>
      <div className="action-bar-actions">
        {hiddenCount > 0 && (
          <button className="btn-glass" onClick={onShowAll} title="Show hidden songs">
            <Eye size={13} /><span>Show {hiddenCount} hidden</span>
          </button>
        )}
        <button
          className={`btn-glass ${saveStatus === "saved" ? "saved" : "primary"}`}
          onClick={onSave}
          disabled={saveStatus === "saving"}
          title="Save all data to the cloud"
        >
          <Save size={13} />
          <span>{saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save"}</span>
        </button>
        <button className={`btn-glass ${editMode ? "active" : ""}`} onClick={() => setEditMode(!editMode)}>
          <Edit3 size={13} /><span>{editMode ? "Done" : "Edit"}</span>
        </button>
        <button className="btn-glass" onClick={onAddSong}><Plus size={13} /><span>Song</span></button>
        <button className="btn-glass" onClick={onReload} title="Reload from cloud (discards unsaved changes)">
          <RefreshCw size={13} /><span>Reload</span>
        </button>
      </div>
    </header>
  );
}

function formatRelative(date) {
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

function SummaryPanel({ currentDay, activeSongId, onToggleHidden, onDelete, hiddenSongs, allSongs }) {
  if (currentDay === 0) {
    return (
      <div className="summary-empty">
        <p>Enter data for the active song to see comparisons.</p>
      </div>
    );
  }
  return (
    <section className="summary-panel">
      <div className="summary-header">
        <h2>Through Day {currentDay}</h2>
        <p className="summary-sub">All songs normalized to the same point in their release window</p>
      </div>
      <div className="summary-grid">
        {allSongs.map(song => {
          const totalSpend = computeAggregate(song.days, "spend", currentDay) || 0;
          const totalListeners = computeAggregate(song.days, "listeners", currentDay) || 0;
          const totalStreams = computeAggregate(song.days, "streams", currentDay) || 0;
          const totalSaves = computeAggregate(song.days, "saves", currentDay) || 0;
          const totalPL = computeAggregate(song.days, "playlist_adds", currentDay) || 0;
          const saveRate = computeAggregate(song.days, "save_rate", currentDay);
          const intentRate = computeAggregate(song.days, "intent_rate", currentDay);
          const spl = computeAggregate(song.days, "spl", currentDay);
          const cpl = computeAggregate(song.days, "cpl", currentDay);
          const cps = computeAggregate(song.days, "cps", currentDay);
          const lastPI = song.days.filter(d => d.day <= currentDay).reverse().find(d => d.pi)?.pi;
          const playlistRate = computeAggregate(song.days, "playlist_rate", currentDay);
          const isHidden = hiddenSongs.includes(song.id);
          const isActive = song.id === activeSongId;
          return (
            <div key={song.id} className={`summary-card ${isHidden ? "hidden" : ""} ${isActive ? "active" : ""}`}>
              <div className="summary-card-header">
                <div className="summary-marker" style={{ background: song.color, color: song.color }}></div>
                <div className="summary-name-block">
                  <div className="summary-name">{song.name}</div>
                  <div className="summary-date">
                    {isSongComplete(song)
                      ? <span className="released-tag">RELEASED</span>
                      : <span className="active-tag">ACTIVE</span>}
                    <span>{formatReleaseDate(song.releaseDate)}</span>
                  </div>
                </div>
                <div className="summary-actions">
                  <button className="icon-btn" onClick={() => onToggleHidden(song.id)} title={isHidden ? "Show in dashboard" : "Hide from dashboard"}>
                    {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                  <button className="icon-btn danger" onClick={() => onDelete(song.id)} title="Delete song"><Trash2 size={12} /></button>
                </div>
              </div>
              <div className="summary-stats">
                <SummaryStat label="Listeners" value={fmt(totalListeners, "int")} />
                <SummaryStat label="Streams" value={fmt(totalStreams, "int")} />
                <SummaryStat label="PI" value={lastPI ?? "—"} />
                <SummaryStat label="Saves" value={fmt(totalSaves, "int")} />
                <SummaryStat label="Pl. Adds" value={fmt(totalPL, "int")} />
                <SummaryStat label="Save Rate" value={fmt(saveRate, "percent")} />
                <SummaryStat label="Pl. Rate" value={fmt(playlistRate, "percent")} />
                <SummaryStat label="Intent" value={fmt(intentRate, "percent")} />
                <SummaryStat label="SPL" value={fmt(spl, "decimal")} />
                <SummaryStat label="$/Listener" value={fmt(cpl, "currency_precise")} highlight />
                <SummaryStat label="$/Save" value={fmt(cps, "currency_precise")} highlight />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SummaryStat({ label, value, highlight }) {
  return (
    <div className={`summary-stat ${highlight ? "highlight" : ""}`}>
      <div className="summary-stat-label">{label}</div>
      <div className="summary-stat-val">{value}</div>
    </div>
  );
}

function MetricSelector({ selected, onChange }) {
  return (
    <div className="metric-selector">
      {METRIC_GROUPS.map(group => {
        const groupMetrics = METRICS.filter(m => m.group === group);
        return (
          <div key={group} className="metric-group">
            <div className="metric-group-label">{group}</div>
            <div className="metric-pills">
              {groupMetrics.map(m => (
                <button key={m.key} className={`metric-pill ${selected === m.key ? "active" : ""}`} onClick={() => onChange(m.key)}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ComparisonTable({ songs, selectedMetric, currentDay, activeSongId, benchmarks, hoveredDay, onHover, editMode, editingCell, setEditingCell, updateCell, onShowPopover }) {
  const metric = METRICS.find(m => m.key === selectedMetric);
  if (!metric) return null;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <section className="comparison-section">
      <div className="comparison-header">
        <div>
          <h2>{metric.label}</h2>
          <p className="comparison-sub">
            {metric.derived && <span className="derived-tag">CALCULATED</span>}
            {metric.manual && <span className="manual-tag">INPUT</span>}
          </p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="comparison-table">
          <thead>
            <tr className="header-row">
              <th className="day-col"></th>
              {songs.map(s => {
                const isActive = s.id === activeSongId;
                return (
                  <th key={s.id} className={`song-col ${isActive ? "active-col" : ""}`}>
                    <div className="song-th">
                      <div className="song-marker-sm" style={{ background: s.color }}></div>
                      <span>{s.name}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr className="totals-row">
              <th className="day-col totals-label">
                Through Day {currentDay}
              </th>
              {songs.map(s => {
                const total = computeAggregate(s.days, selectedMetric, currentDay);
                const isActive = s.id === activeSongId;
                return (
                  <th key={s.id} className={`totals-cell ${isActive ? "active-col" : ""}`}>
                    {fmt(total, metric.format)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {days.map(day => {
              const isHovered = hoveredDay === day;
              const isFuture = day > currentDay;
              return (
                <tr
                  key={day}
                  className={`${isHovered ? "row-hovered" : ""} ${isFuture ? "row-future" : ""} ${day % 2 === 0 ? "row-even" : "row-odd"}`}
                  onMouseEnter={() => onHover(day)}
                  onMouseLeave={() => onHover(null)}
                >
                  <td className="day-cell">
                    <div className="day-num">Day {day}</div>
                    <div className="day-dow">{dayOfWeek(day)}</div>
                  </td>
                  {songs.map(song => {
                    const dayData = song.days.find(d => d.day === day);
                    const value = dayData?.[selectedMetric];
                    const isActive = song.id === activeSongId;
                    const zone = isActive ? getZone(value, day, benchmarks, metric) : "none";
                    const isEditing = editingCell?.songId === song.id && editingCell?.day === day && editingCell?.field === selectedMetric;
                    const editable = editMode && metric.manual;
                    return (
                      <td
                        key={song.id}
                        className={`value-cell ${isActive ? "active-col" : ""} ${zone !== "none" ? `zone-${zone}` : ""} ${editable ? "editable" : ""}`}
                        onMouseEnter={(e) => {
                          if (value !== null && value !== undefined && !isNaN(value)) {
                            onShowPopover({ x: e.clientX, y: e.clientY, day, metric: selectedMetric, hoveredSongId: song.id });
                          }
                        }}
                        onMouseMove={(e) => {
                          if (value !== null && value !== undefined && !isNaN(value)) {
                            onShowPopover({ x: e.clientX, y: e.clientY, day, metric: selectedMetric, hoveredSongId: song.id });
                          }
                        }}
                        onMouseLeave={() => onShowPopover(null)}
                        onClick={() => { if (editable) setEditingCell({ songId: song.id, day, field: selectedMetric }); }}
                      >
                        {isEditing ? (
                          <input
                            type="number" step="any" defaultValue={value ?? ""} autoFocus
                            onBlur={(e) => { updateCell(song.id, day, selectedMetric, e.target.value); setEditingCell(null); }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") { updateCell(song.id, day, selectedMetric, e.target.value); setEditingCell(null); }
                              else if (e.key === "Escape") setEditingCell(null);
                            }}
                            className="cell-input"
                          />
                        ) : (
                          <span className="cell-value">{fmt(value, metric.format)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="footer-legend">
        <div className="legend-section">
          <span className="legend-title">Active Song vs Benchmarks</span>
          <div className="legend-item"><div className="legend-swatch zone-above"></div>Above (better than every benchmark)</div>
          <div className="legend-item"><div className="legend-swatch zone-healthy"></div>Healthy (within benchmark range)</div>
          <div className="legend-item"><div className="legend-swatch zone-below"></div>Warning (below the floor, within 50%)</div>
          <div className="legend-item"><div className="legend-swatch zone-floor"></div>Underperforming ({'>'}50% below the floor)</div>
        </div>
      </div>
    </section>
  );
}

function Popover({ data, songs }) {
  const popoverRef = useRef(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, ready: false });

  const metric = METRICS.find(m => m.key === data.metric);

  // Measure actual rendered popover size and position relative to cursor.
  // This runs AFTER the popover renders invisibly off-screen, so we know
  // its real dimensions before deciding final placement.
  useEffect(() => {
    if (!popoverRef.current) return;
    const rect = popoverRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const offset = 14;
    const padding = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Default: below-right of cursor
    let x = data.x + offset;
    let y = data.y + offset;

    // Flip horizontally if too close to right edge
    if (x + w + padding > vw) x = data.x - w - offset;
    // Flip vertically if too close to bottom edge
    if (y + h + padding > vh) y = data.y - h - offset;

    // Final clamp - guarantee fully on screen
    x = Math.max(padding, Math.min(vw - w - padding, x));
    y = Math.max(padding, Math.min(vh - h - padding, y));

    setPos({ x, y, ready: true });
  }, [data.x, data.y, data.day, data.metric, data.hoveredSongId]);

  if (!metric) return null;
  const values = songs.map(s => {
    const d = s.days.find(dd => dd.day === data.day);
    return { song: s, value: d?.[data.metric] };
  }).filter(v => v.value !== null && v.value !== undefined && !isNaN(v.value));
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => metric.higherBetter === false ? a.value - b.value : b.value - a.value);
  const hoveredRank = sorted.findIndex(v => v.song.id === data.hoveredSongId);
  const hovered = sorted[hoveredRank];
  let interpretation = "";
  if (hovered && sorted.length > 1) {
    const top = sorted[0];
    if (hoveredRank === 0) {
      interpretation = `${hovered.song.name} leads on Day ${data.day}.`;
    } else {
      const direction = metric.higherBetter === false ? "above" : "below";
      const pctDiff = metric.higherBetter === false
        ? (((hovered.value - top.value) / top.value) * 100).toFixed(0)
        : (((top.value - hovered.value) / top.value) * 100).toFixed(0);
      interpretation = `${hovered.song.name} is ${pctDiff}% ${direction} ${top.song.name} on Day ${data.day}.`;
    }
  }

  return (
    <div
      ref={popoverRef}
      className="popover"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: pos.ready ? 1 : 0,
      }}
    >
      <div className="popover-header">
        <div className="popover-day">Day {data.day} · {dayOfWeek(data.day)}</div>
        <div className="popover-metric">{metric.label}</div>
      </div>
      <div className="popover-rankings">
        {sorted.map((v, i) => (
          <div key={v.song.id} className={`popover-row ${v.song.id === data.hoveredSongId ? "highlighted" : ""}`}>
            <div className="popover-rank">{i + 1}</div>
            <div className="popover-marker" style={{ background: v.song.color }}></div>
            <div className="popover-name">{v.song.name}</div>
            <div className="popover-value">{fmt(v.value, metric.format)}</div>
          </div>
        ))}
      </div>
      {interpretation && <div className="popover-interp">{interpretation}</div>}
    </div>
  );
}

function Modal({ children, title, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Background() { return <div className="bg-gradients"></div>; }

function Styles() {
  return (
    <style>{`
      :root {
        --primary: #3e5951;
        --primary-light: #5a7a72;
        --secondary: #0f2620;
        --neutral: #a1a8b2;
        --warm-dark: #261b17;
        --black: #040d0b;
        --accent-gold: #d4a574;
        --accent-mint: #5fb89c;
        --accent-coral: #c87671;
      }

      @media (prefers-color-scheme: light) {
        :root {
          --bg-base: #f0eeea;
          --bg-app: linear-gradient(135deg, #f0eeea 0%, #e6e3dd 50%, #ddd9d2 100%);
          --glass-bg: rgba(255, 255, 255, 0.5);
          --glass-bg-strong: rgba(255, 255, 255, 0.72);
          --glass-bg-subtle: rgba(255, 255, 255, 0.35);
          --glass-border: rgba(60, 50, 40, 0.08);
          --glass-border-strong: rgba(60, 50, 40, 0.18);
          --glass-shadow: 0 1px 0 rgba(255,255,255,0.7) inset, 0 1px 2px rgba(60, 50, 40, 0.04), 0 12px 32px rgba(60, 50, 40, 0.08);
          --glass-shadow-lg: 0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 16px rgba(60, 50, 40, 0.08), 0 32px 64px rgba(60, 50, 40, 0.14);
          --text-primary: #1a1816;
          --text-secondary: rgba(26, 24, 22, 0.72);
          --text-tertiary: rgba(26, 24, 22, 0.5);
          --text-quaternary: rgba(26, 24, 22, 0.32);
          --row-zebra: rgba(60, 50, 40, 0.04);
          --row-hover: rgba(60, 50, 40, 0.09);
          --row-future: rgba(60, 50, 40, 0.02);
          --active-col-bg: rgba(120, 110, 100, 0.06);
          --active-col-border: rgba(120, 110, 100, 0.22);
          --zone-above-bg: rgba(95, 184, 156, 0.22);
          --zone-above-text: #1d6e54;
          --zone-healthy-bg: rgba(60, 50, 40, 0.08);
          --zone-healthy-text: var(--text-primary);
          --zone-below-bg: rgba(212, 165, 116, 0.28);
          --zone-below-text: #8c5a2a;
          --zone-floor-bg: rgba(200, 90, 85, 0.28);
          --zone-floor-text: #8a2f29;
          --highlight-text: #3e5951;
          --grad-1: radial-gradient(ellipse at 0% 0%, rgba(60, 50, 40, 0.04), transparent 55%);
          --grad-2: radial-gradient(ellipse at 100% 0%, rgba(60, 50, 40, 0.03), transparent 50%);
          --grad-3: radial-gradient(ellipse at 50% 100%, rgba(60, 50, 40, 0.04), transparent 60%);
        }
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg-base: #131210;
          --bg-app: linear-gradient(135deg, #131210 0%, #1c1a17 50%, #161310 100%);
          --glass-bg: rgba(40, 36, 32, 0.5);
          --glass-bg-strong: rgba(52, 47, 42, 0.7);
          --glass-bg-subtle: rgba(28, 25, 22, 0.4);
          --glass-border: rgba(238, 232, 222, 0.06);
          --glass-border-strong: rgba(238, 232, 222, 0.16);
          --glass-shadow: 0 1px 0 rgba(238,232,222,0.04) inset, 0 1px 2px rgba(0, 0, 0, 0.3), 0 16px 32px rgba(0, 0, 0, 0.5);
          --glass-shadow-lg: 0 1px 0 rgba(238,232,222,0.06) inset, 0 4px 16px rgba(0, 0, 0, 0.4), 0 40px 80px rgba(0, 0, 0, 0.7);
          --text-primary: #ede8e0;
          --text-secondary: rgba(237, 232, 224, 0.78);
          --text-tertiary: rgba(237, 232, 224, 0.48);
          --text-quaternary: rgba(237, 232, 224, 0.3);
          --row-zebra: rgba(238, 232, 222, 0.035);
          --row-hover: rgba(238, 232, 222, 0.08);
          --row-future: rgba(0, 0, 0, 0.3);
          --active-col-bg: rgba(180, 170, 160, 0.05);
          --active-col-border: rgba(180, 170, 160, 0.18);
          --zone-above-bg: rgba(95, 184, 156, 0.22);
          --zone-above-text: #8fd9bd;
          --zone-healthy-bg: rgba(238, 232, 222, 0.08);
          --zone-healthy-text: var(--text-primary);
          --zone-below-bg: rgba(212, 165, 116, 0.25);
          --zone-below-text: #e8c89a;
          --zone-floor-bg: rgba(220, 100, 95, 0.28);
          --zone-floor-text: #f0a59f;
          --highlight-text: #8fd9bd;
          --grad-1: radial-gradient(ellipse at 0% 0%, rgba(238, 232, 222, 0.04), transparent 55%);
          --grad-2: radial-gradient(ellipse at 100% 0%, rgba(238, 232, 222, 0.03), transparent 50%);
          --grad-3: radial-gradient(ellipse at 50% 100%, rgba(238, 232, 222, 0.04), transparent 60%);
        }
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif;
        background: var(--bg-base); color: var(--text-primary);
        font-feature-settings: "ss01", "cv01";
        -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
        letter-spacing: -0.011em; min-height: 100vh;
      }
      .dashboard {
        position: relative; min-height: 100vh; padding: 28px 40px 80px;
        max-width: 1700px; margin: 0 auto; background: var(--bg-app);
      }
      .bg-gradients {
        position: fixed; inset: 0; pointer-events: none; z-index: 0;
        background: var(--grad-1), var(--grad-2), var(--grad-3);
      }
      .dashboard > *:not(.bg-gradients) { position: relative; z-index: 1; }

      .title-header {
        margin-bottom: 14px; padding: 4px 4px 0;
      }
      .title-header h1 {
        font-size: 28px; font-weight: 700; letter-spacing: -0.028em;
        color: var(--text-primary); line-height: 1.05;
      }
      .title-sub {
        font-size: 13px; color: var(--text-tertiary);
        margin-top: 3px; letter-spacing: -0.005em;
      }
      .action-bar {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 22px; padding: 11px 16px;
        background: var(--glass-bg);
        backdrop-filter: blur(40px) saturate(1.8);
        -webkit-backdrop-filter: blur(40px) saturate(1.8);
        border: 0.5px solid var(--glass-border); border-radius: 16px;
        box-shadow: var(--glass-shadow);
        flex-wrap: wrap; gap: 10px;
      }
      .action-bar-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .ab-label {
        font-size: 9px; text-transform: uppercase; font-weight: 700;
        letter-spacing: 0.08em; color: var(--text-quaternary);
      }
      .ab-divider {
        width: 1px; height: 14px; background: var(--glass-border-strong);
      }
      .ab-name {
        font-size: 14px; font-weight: 600; color: var(--text-primary);
        letter-spacing: -0.012em;
      }
      .ab-day {
        font-size: 12px; color: var(--text-tertiary);
        padding: 2px 8px; background: var(--glass-bg-subtle);
        border-radius: 6px; font-feature-settings: "tnum";
        border: 0.5px solid var(--glass-border);
      }
      .ab-status {
        font-size: 11px; color: var(--text-quaternary);
        margin-left: 4px;
      }
      .ab-status.error { color: var(--zone-floor-text); }
      .action-bar-actions { display: flex; gap: 6px; flex-wrap: wrap; }
      .btn-glass:disabled {
        opacity: 0.5; cursor: not-allowed;
      }
      .btn-glass:disabled:hover { transform: none; box-shadow: none; }
      .btn-glass {
        display: flex; align-items: center; gap: 5px; padding: 7px 12px;
        background: var(--glass-bg-strong);
        backdrop-filter: blur(20px) saturate(1.6);
        -webkit-backdrop-filter: blur(20px) saturate(1.6);
        border: 0.5px solid var(--glass-border-strong);
        border-radius: 10px; color: var(--text-primary);
        font-size: 12px; font-weight: 500; cursor: pointer;
        transition: all 0.15s cubic-bezier(0.32, 0.72, 0, 1);
        font-family: inherit;
      }
      .btn-glass:hover { background: var(--glass-bg); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(15, 38, 32, 0.1); }
      .btn-glass.active { background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; border-color: var(--primary); box-shadow: 0 2px 8px rgba(62, 89, 81, 0.3); }
      .btn-glass.primary {
        background: var(--text-primary); color: var(--bg-base);
        border-color: var(--text-primary);
      }
      .btn-glass.primary:hover { opacity: 0.88; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18); }
      .btn-glass.saved {
        background: rgba(95, 184, 156, 0.22); color: var(--zone-above-text);
        border-color: rgba(95, 184, 156, 0.4);
      }

      .summary-panel { margin-bottom: 26px; }
      .summary-empty {
        padding: 60px 24px; text-align: center; color: var(--text-tertiary);
        background: var(--glass-bg); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
        border: 0.5px solid var(--glass-border); border-radius: 20px;
      }
      .summary-header { margin-bottom: 14px; padding: 0 4px; }
      .summary-header h2 {
        font-size: 24px; font-weight: 600; letter-spacing: -0.026em;
        color: var(--text-primary);
      }
      .summary-sub { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }
      .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 12px; }
      .summary-card {
        background: var(--glass-bg);
        backdrop-filter: blur(40px) saturate(1.6);
        -webkit-backdrop-filter: blur(40px) saturate(1.6);
        border: 0.5px solid var(--glass-border); border-radius: 20px; padding: 16px;
        box-shadow: var(--glass-shadow); transition: all 0.2s cubic-bezier(0.32, 0.72, 0, 1);
        position: relative; overflow: hidden;
      }
      .summary-card:hover { transform: translateY(-2px); box-shadow: var(--glass-shadow-lg); }
      .summary-card.hidden { opacity: 0.4; }
      .summary-card.active { border-color: var(--active-col-border); background: var(--glass-bg-strong); }
      .summary-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
      .summary-marker { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .summary-name-block { flex: 1; min-width: 0; }
      .summary-name { font-size: 15px; font-weight: 600; letter-spacing: -0.014em; }
      .summary-date { display: flex; align-items: center; gap: 6px; font-size: 10px; color: var(--text-tertiary); margin-top: 2px; }
      .active-tag, .released-tag { padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700; letter-spacing: 0.05em; }
      .active-tag { background: var(--text-primary); color: var(--bg-base); }
      .released-tag { background: var(--glass-bg-strong); color: var(--text-secondary); border: 0.5px solid var(--glass-border-strong); }
      .summary-actions { display: flex; gap: 2px; }
      .summary-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
      .summary-stat { padding: 8px 6px; background: var(--glass-bg-subtle); border-radius: 10px; border: 0.5px solid var(--glass-border); }
      .summary-stat.highlight { background: var(--glass-bg-strong); border-color: var(--glass-border-strong); }
      .summary-stat-label { font-size: 9px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
      .summary-stat-val { font-size: 13px; font-weight: 600; color: var(--text-primary); font-feature-settings: "tnum"; margin-top: 2px; letter-spacing: -0.014em; }

      .icon-btn { background: transparent; border: none; color: var(--text-tertiary); cursor: pointer; padding: 4px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-family: inherit; font-size: 12px; line-height: 1; transition: all 0.12s; }
      .icon-btn:hover { background: var(--glass-bg); color: var(--text-primary); }
      .icon-btn.danger:hover { color: var(--zone-floor-text); }

      .metric-selector {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;
        padding: 16px 20px; background: var(--glass-bg);
        backdrop-filter: blur(40px) saturate(1.8); -webkit-backdrop-filter: blur(40px) saturate(1.8);
        border: 0.5px solid var(--glass-border); border-radius: 20px;
        box-shadow: var(--glass-shadow); margin-bottom: 22px;
      }
      .metric-group-label { font-size: 9px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; color: var(--text-quaternary); margin-bottom: 7px; }
      .metric-pills { display: flex; flex-wrap: wrap; gap: 4px; }
      .metric-pill { padding: 5px 10px; background: var(--glass-bg-subtle); border: 0.5px solid var(--glass-border); border-radius: 8px; color: var(--text-secondary); font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.12s; font-family: inherit; }
      .metric-pill:hover { background: var(--glass-bg); color: var(--text-primary); }
      .metric-pill.active { background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; border-color: var(--primary); box-shadow: 0 1px 4px rgba(62, 89, 81, 0.4); }

      .comparison-section {
        background: var(--glass-bg);
        backdrop-filter: blur(40px) saturate(1.8); -webkit-backdrop-filter: blur(40px) saturate(1.8);
        border: 0.5px solid var(--glass-border); border-radius: 22px;
        padding: 22px; box-shadow: var(--glass-shadow);
      }
      .comparison-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
      .comparison-header h2 { font-size: 22px; font-weight: 600; letter-spacing: -0.024em; }
      .comparison-sub { font-size: 11px; margin-top: 3px; }
      .derived-tag, .manual-tag { font-size: 9px; font-weight: 700; letter-spacing: 0.06em; padding: 2px 6px; border-radius: 4px; margin-right: 6px; }
      .derived-tag { background: var(--glass-bg-strong); color: var(--text-secondary); border: 0.5px solid var(--glass-border-strong); }
      .manual-tag { background: var(--glass-bg-strong); color: var(--text-secondary); border: 0.5px solid var(--glass-border-strong); }

      .table-wrap { overflow-x: auto; border-radius: 14px; border: 0.5px solid var(--glass-border); }
      .comparison-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; font-feature-settings: "tnum"; }

      .header-row th {
        padding: 12px 14px; font-weight: 600; font-size: 10px; text-transform: uppercase;
        letter-spacing: 0.06em; color: var(--text-tertiary);
        background: var(--glass-bg-strong);
        border-bottom: 0.5px solid var(--glass-border);
        text-align: left;
      }
      .totals-row th {
        padding: 14px; font-size: 14px; font-weight: 700;
        background: var(--glass-bg-subtle); color: var(--text-primary);
        border-bottom: 1px solid var(--glass-border-strong);
        font-feature-settings: "tnum"; letter-spacing: -0.018em;
        text-align: left;
      }
      .totals-label { font-size: 10px !important; font-weight: 700 !important; text-transform: uppercase !important; letter-spacing: 0.06em !important; color: var(--text-tertiary) !important; }
      .totals-cell.active-col { background: var(--active-col-bg); color: var(--text-primary); }
      .day-col { width: 90px; min-width: 90px; }
      .song-col { min-width: 130px; }
      .song-col.active-col, .totals-cell.active-col, .value-cell.active-col { background: var(--active-col-bg); position: relative; }
      .song-col.active-col { border-left: 0.5px solid var(--active-col-border); border-right: 0.5px solid var(--active-col-border); }
      .song-th { display: flex; align-items: center; gap: 6px; }
      .song-marker-sm { width: 7px; height: 7px; border-radius: 50%; }

      .comparison-table tbody td { padding: 9px 14px; border-bottom: 0.5px solid var(--glass-border); transition: background 0.1s ease; }
      .comparison-table tbody tr:last-child td { border-bottom: none; }

      .row-even td { background: var(--row-zebra); }
      .row-hovered td { background: var(--row-hover) !important; }
      .row-future td { opacity: 0.4; }

      .day-cell {
        font-weight: 600; color: var(--text-primary);
        background: transparent !important;
      }
      .row-even .day-cell { background: var(--row-zebra) !important; }
      .day-num { font-size: 12px; letter-spacing: -0.014em; }
      .day-dow { font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; color: var(--text-quaternary); margin-top: 1px; }

      .value-cell { font-weight: 500; }
      .value-cell.editable { cursor: pointer; }
      .value-cell.editable:hover::after { content: ''; position: absolute; inset: 2px; border: 1px dashed var(--primary); border-radius: 6px; pointer-events: none; }
      .cell-value { letter-spacing: -0.01em; }

      .zone-above { background: var(--zone-above-bg) !important; color: var(--zone-above-text); font-weight: 700; }
      .zone-healthy { background: var(--zone-healthy-bg) !important; color: var(--zone-healthy-text); font-weight: 600; }
      .zone-below { background: var(--zone-below-bg) !important; color: var(--zone-below-text); font-weight: 600; }
      .zone-floor { background: var(--zone-floor-bg) !important; color: var(--zone-floor-text); font-weight: 700; }

      .cell-input { width: 100%; background: var(--bg-base); border: 1px solid var(--primary); border-radius: 6px; padding: 4px 8px; font-size: 13px; color: var(--text-primary); font-family: inherit; font-feature-settings: "tnum"; }
      .cell-input:focus { outline: none; box-shadow: 0 0 0 2px rgba(62, 89, 81, 0.25); }

      .footer-legend { display: flex; gap: 32px; margin-top: 14px; padding-top: 14px; border-top: 0.5px solid var(--glass-border); flex-wrap: wrap; }
      .legend-section { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
      .legend-title { font-size: 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.06em; color: var(--text-quaternary); }
      .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-tertiary); }
      .legend-swatch { width: 16px; height: 10px; border-radius: 3px; }
      .legend-swatch.zone-above { background: var(--zone-above-bg); }
      .legend-swatch.zone-healthy { background: var(--zone-healthy-bg); }
      .legend-swatch.zone-below { background: var(--zone-below-bg); }
      .legend-swatch.zone-floor { background: var(--zone-floor-bg); }

      .popover {
        position: fixed; background: var(--glass-bg-strong);
        backdrop-filter: blur(50px) saturate(1.8); -webkit-backdrop-filter: blur(50px) saturate(1.8);
        border: 0.5px solid var(--glass-border-strong); border-radius: 16px;
        padding: 14px 16px; box-shadow: var(--glass-shadow-lg);
        width: 320px; z-index: 100; pointer-events: none;
        transition: opacity 0.12s ease;
      }
      .popover-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 0.5px solid var(--glass-border); }
      .popover-day { font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
      .popover-metric { font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
      .popover-rankings { display: flex; flex-direction: column; gap: 4px; }
      .popover-row { display: grid; grid-template-columns: 22px 10px 1fr auto; align-items: center; gap: 8px; padding: 5px 6px; border-radius: 7px; font-size: 12px; }
      .popover-row.highlighted { background: var(--glass-bg-strong); border: 0.5px solid var(--glass-border-strong); }
      .popover-rank {
        font-size: 10px; font-weight: 700; color: var(--text-tertiary);
        font-feature-settings: "tnum";
        background: var(--glass-bg-subtle);
        border: 0.5px solid var(--glass-border);
        border-radius: 5px;
        padding: 2px 0;
        text-align: center;
        width: 20px;
      }
      .popover-row.highlighted .popover-rank {
        color: var(--bg-base);
        background: var(--text-primary);
        border-color: var(--text-primary);
      }
      .popover-marker { width: 8px; height: 8px; border-radius: 50%; }
      .popover-name { color: var(--text-primary); font-weight: 500; letter-spacing: -0.008em; }
      .popover-value { font-weight: 700; font-feature-settings: "tnum"; color: var(--text-primary); }
      .popover-interp { margin-top: 10px; padding-top: 10px; border-top: 0.5px solid var(--glass-border); font-size: 11px; color: var(--text-secondary); line-height: 1.4; }

      .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 38, 32, 0.45); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 50; animation: backdrop-in 0.2s ease; }
      @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
      .modal {
        background: var(--glass-bg-strong);
        backdrop-filter: blur(50px) saturate(1.8); -webkit-backdrop-filter: blur(50px) saturate(1.8);
        border: 0.5px solid var(--glass-border-strong); border-radius: 22px;
        padding: 24px; box-shadow: var(--glass-shadow-lg);
        min-width: 420px; max-width: 90vw; animation: modal-in 0.25s cubic-bezier(0.32, 0.72, 0, 1);
      }
      @keyframes modal-in { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      .modal-header h3 { font-size: 18px; font-weight: 600; letter-spacing: -0.018em; }
      .form-group { margin-bottom: 14px; }
      .form-group label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-tertiary); margin-bottom: 5px; }
      .form-group input { width: 100%; padding: 10px 12px; background: var(--glass-bg-subtle); border: 0.5px solid var(--glass-border-strong); border-radius: 10px; color: var(--text-primary); font-size: 13px; font-family: inherit; }
      .form-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(62, 89, 81, 0.2); }
      .json-textarea {
        width: 100%; padding: 10px 12px;
        background: var(--glass-bg-subtle);
        border: 0.5px solid var(--glass-border-strong);
        border-radius: 10px; color: var(--text-primary);
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace;
        font-size: 11px; line-height: 1.45;
        resize: vertical; min-height: 200px;
      }
      .json-textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(62, 89, 81, 0.2); }
      .modal-hint {
        font-size: 12px; color: var(--text-tertiary);
        margin-bottom: 10px; line-height: 1.5;
      }
      .modal { min-width: 560px !important; max-width: 92vw !important; }
      .btn-primary.success {
        background: rgba(95, 184, 156, 0.9);
        border-color: rgba(95, 184, 156, 0.9);
      }
      .btn-primary:disabled {
        opacity: 0.4; cursor: not-allowed;
      }
      .btn-primary:disabled:hover { transform: none; box-shadow: none; }
      .modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px; }
      .btn-primary, .btn-secondary { padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.12s; border: 0.5px solid; font-family: inherit; }
      .btn-primary { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border-color: var(--primary); }
      .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(62, 89, 81, 0.4); }
      .btn-secondary { background: transparent; color: var(--text-secondary); border-color: var(--glass-border-strong); }
      .btn-secondary:hover { background: var(--glass-bg); color: var(--text-primary); }

      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--glass-border-strong); border-radius: 5px; border: 2px solid transparent; background-clip: padding-box; }
      ::-webkit-scrollbar-thumb:hover { background: var(--text-tertiary); background-clip: padding-box; }
    `}</style>
  );
}

export default App;
