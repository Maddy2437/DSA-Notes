import { useState, useMemo, useRef, useEffect } from "react";

// ─── STYLES ──────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0f;--bg2:#12121a;--bg3:#1a1a26;--bg4:#22223a;
  --accent:#7c5cfc;--accent2:#c084fc;--accent3:#06ffa5;
  --text:#f0f0ff;--text2:#a0a0c0;--text3:#5a5a90;
  --border:#1e1e35;--card:#111118;
  --red:#ff5c5c;--yellow:#ffd166;--green:#06ffa5;
}
.light{
  --bg:#f4f4ff;--bg2:#eaeaf8;--bg3:#ddddf2;--bg4:#d0d0ec;
  --accent:#5b3fd6;--accent2:#7c3aed;--accent3:#059669;
  --text:#0f0f2a;--text2:#3a3a6a;--text3:#8080b0;
  --border:#c8c8e8;--card:#ffffff;
  --red:#cc2222;--yellow:#c48000;--green:#059669;
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);transition:all .25s}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:3px}
.nav{position:sticky;top:0;z-index:100;background:var(--bg);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;height:58px;gap:16px}
.logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:var(--accent);cursor:pointer;white-space:nowrap;flex-shrink:0}
.logo span{color:var(--accent3)}
.sw{flex:1;max-width:400px;position:relative}
.si{width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:7px 12px 7px 34px;color:var(--text);font-size:.83rem;outline:none;transition:border .2s;font-family:'Inter',sans-serif}
.si:focus{border-color:var(--accent)}
.s-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:.85rem;pointer-events:none}
.sr{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--bg2);border:1px solid var(--border);border-radius:10px;max-height:260px;overflow-y:auto;z-index:200;box-shadow:0 8px 32px rgba(0,0,0,.4)}
.sri{padding:9px 14px;cursor:pointer;border-bottom:1px solid var(--border);transition:background .1s}
.sri:hover{background:var(--bg3)}
.sri-t{font-size:.83rem;font-weight:500;color:var(--text)}
.sri-s{font-size:.72rem;color:var(--text3)}
.tbtn{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:6px 14px;cursor:pointer;color:var(--text2);font-size:.8rem;transition:all .2s;margin-left:auto;flex-shrink:0}
.tbtn:hover{border-color:var(--accent);color:var(--accent)}
/* HOME */
.home{padding:44px 32px;max-width:1100px;margin:0 auto}
.hero{margin-bottom:52px}
.htag{display:inline-flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--border);border-radius:20px;padding:4px 14px;font-size:.72rem;color:var(--accent2);margin-bottom:14px;font-family:'Space Mono',monospace}
.hero h1{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;line-height:1.1;margin-bottom:12px;background:linear-gradient(130deg,var(--text) 0%,var(--accent2) 55%,var(--accent3) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{color:var(--text2);font-size:.95rem;max-width:520px;line-height:1.75}
.stats{display:flex;gap:36px;margin-top:22px}
.sn{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:var(--accent3)}
.sl{font-size:.73rem;color:var(--text3);margin-top:2px}
.slabel{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--accent3);letter-spacing:2px;margin-bottom:14px;text-transform:uppercase}
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.tc{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;cursor:pointer;transition:all .22s}
.tc:hover{transform:translateY(-3px);border-color:var(--accent);background:var(--bg2)}
.tci{font-size:1.7rem;margin-bottom:11px}
.tcn{font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;margin-bottom:3px}
.tcc{font-size:.73rem;color:var(--text3)}
.tag{display:inline-block;margin-top:10px;padding:3px 10px;border-radius:20px;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.te{background:rgba(6,255,165,.12);color:var(--green)}
.tm{background:rgba(255,209,102,.12);color:var(--yellow)}
.th{background:rgba(255,92,92,.12);color:var(--red)}
/* TOPIC PAGE */
.tpage{display:flex;min-height:calc(100vh - 58px)}
.sidebar{width:255px;flex-shrink:0;border-right:1px solid var(--border);padding:18px 0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
.sbt{font-family:'Syne',sans-serif;font-size:.78rem;font-weight:700;padding:0 18px 10px;color:var(--text3);text-transform:uppercase;letter-spacing:1px}
.sbi{display:flex;align-items:center;justify-content:space-between;padding:9px 18px;cursor:pointer;font-size:.83rem;transition:all .18s;border-left:2px solid transparent;color:var(--text2)}
.sbi:hover{background:var(--bg2);color:var(--text)}
.sbi.active{background:var(--bg3);color:var(--accent);border-left-color:var(--accent);font-weight:600}
.tcontent{flex:1;padding:32px 48px;max-width:860px;overflow-x:hidden}
.ctitle{font-family:'Syne',sans-serif;font-size:1.9rem;font-weight:800;margin-bottom:8px;line-height:1.2}
.drow{display:flex;align-items:center;gap:10px;margin-bottom:28px;flex-wrap:wrap}
/* SECTIONS */
.sec{margin-bottom:34px}
.stitle{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin-bottom:11px;display:flex;align-items:center;gap:9px;color:var(--text)}
.stitle::before{content:'';display:block;width:3px;height:16px;background:var(--accent);border-radius:2px;flex-shrink:0}
.prose{color:var(--text2);line-height:1.85;font-size:.875rem}
.prose strong{color:var(--text);font-weight:600}
.intuition-box{background:var(--bg3);border:1px solid var(--border);border-left:3px solid var(--accent2);border-radius:10px;padding:14px 18px;color:var(--text2);line-height:1.85;font-size:.875rem}
.steps{display:flex;flex-direction:column;gap:9px}
.step{display:flex;gap:13px;align-items:flex-start}
.snum{width:25px;height:25px;border-radius:50%;background:var(--accent);color:#fff;font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Space Mono',monospace;margin-top:1px}
.stext{color:var(--text2);font-size:.85rem;line-height:1.72;padding-top:3px}
.cxgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.cxcard{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:13px 17px}
.cxl{font-size:.7rem;color:var(--text3);margin-bottom:5px;font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.5px}
.cxv{font-family:'Space Mono',monospace;font-size:.95rem;font-weight:700;color:var(--accent2)}
.code-tabs{display:flex;border-radius:8px 8px 0 0;overflow:hidden;border:1px solid var(--border);border-bottom:none}
.ctab{padding:7px 18px;font-size:.76rem;cursor:pointer;background:var(--bg2);color:var(--text3);font-family:'Space Mono',monospace;transition:all .18s;border:none}
.ctab.active{background:var(--bg3);color:var(--accent);font-weight:700}
.cblock{background:var(--bg2);border:1px solid var(--border);border-radius:0 0 8px 8px;overflow:hidden}
pre{padding:18px 22px;font-size:.78rem;line-height:1.8;font-family:'Space Mono',monospace;overflow-x:auto;color:var(--text)}
.kw{color:#c792ea}.fn{color:#82aaff}.str{color:#c3e88d}.cm{color:#546e7a}.num{color:#f78c6c}
.dry-run{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px 20px;font-family:'Space Mono',monospace;font-size:.76rem;overflow-x:auto;color:var(--text2);line-height:2;white-space:pre-wrap}
.dry-run .hl{color:var(--accent3);font-weight:700}
.dry-run .arr{color:var(--accent2)}
.pcgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.pcbox{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:15px}
.pct{font-size:.78rem;font-weight:700;margin-bottom:9px;display:flex;align-items:center;gap:5px}
.pcl{list-style:none;display:flex;flex-direction:column;gap:6px}
.pcl li{font-size:.8rem;color:var(--text2);display:flex;align-items:flex-start;gap:6px;line-height:1.55}
.when-box{padding:12px 16px;background:rgba(6,255,165,.06);border:1px solid rgba(6,255,165,.18);border-radius:10px;color:var(--text2);font-size:.875rem;line-height:1.8}
.pqlist{display:flex;flex-direction:column;gap:9px}
.pq{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.pqn{font-size:.85rem;color:var(--text)}
.bc{display:flex;align-items:center;gap:7px;padding:10px 18px;font-size:.78rem;color:var(--text3);margin-bottom:4px}
.bc span{cursor:pointer;transition:color .15s}.bc span:hover{color:var(--accent)}
.bcsep{color:var(--text3)}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:72px 20px;text-align:center;gap:10px}
.eicon{font-size:2.8rem}.etitle{font-family:'Syne',sans-serif;font-size:1.25rem;font-weight:700}
.esub{color:var(--text2);font-size:.85rem;max-width:300px;line-height:1.7}
/* ── NEW UI COMPONENTS ── */
.info-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-top:8px}
.info-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:4px}
.ic-label{font-size:.68rem;color:var(--text3);font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.5px}
.ic-val{font-family:'Space Mono',monospace;font-size:.95rem;font-weight:700}
.ic-sub{font-size:.7rem;color:var(--text3);line-height:1.4}
.mem-viz{display:flex;align-items:stretch;gap:0;margin:12px 0;overflow-x:auto;padding-bottom:4px}
.mem-cell{display:flex;flex-direction:column;align-items:center;min-width:52px}
.mc-val{background:var(--bg3);border:1px solid var(--accent);padding:10px 6px;font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;color:var(--accent2);width:100%;text-align:center;border-right:none}
.mc-val:last-of-type,.mem-cell:last-child .mc-val{border-right:1px solid var(--accent)}
.mc-idx{font-size:.68rem;color:var(--text3);font-family:'Space Mono',monospace;margin-top:4px}
.mc-addr{font-size:.6rem;color:var(--accent3);font-family:'Space Mono',monospace;margin-top:2px}
.pattern-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.ppill{padding:6px 14px;border-radius:20px;font-size:.75rem;font-weight:600;background:var(--bg3);border:1px solid var(--border);color:var(--text2);cursor:default;transition:all .2s}
.ppill:hover{border-color:var(--accent);color:var(--accent)}
.lang-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:700;font-family:'Space Mono',monospace}
.lb-cpp{background:rgba(124,92,252,.12);color:var(--accent);border:1px solid rgba(124,92,252,.25)}
.lb-py{background:rgba(6,255,165,.08);color:var(--accent3);border:1px solid rgba(6,255,165,.2)}
.lb-java{background:rgba(255,209,102,.08);color:var(--yellow);border:1px solid rgba(255,209,102,.2)}
.fn-table{width:100%;border-collapse:collapse;font-size:.8rem;margin-top:8px}
.fn-table th{background:var(--bg3);padding:8px 12px;text-align:left;font-family:'Space Mono',monospace;font-size:.68rem;color:var(--text3);font-weight:600;letter-spacing:.5px;border-bottom:1px solid var(--border)}
.fn-table td{padding:8px 12px;border-bottom:1px solid var(--border);color:var(--text2);font-family:'Space Mono',monospace;font-size:.76rem}
.fn-table tr:hover td{background:var(--bg3)}
.fn-table .op{color:var(--accent2);font-weight:600}
.fn-table .cx-g{color:var(--green)}.fn-table .cx-y{color:var(--yellow)}.fn-table .cx-r{color:var(--red)}
.callout{display:flex;gap:10px;padding:12px 16px;border-radius:10px;margin-top:8px;align-items:flex-start}
.callout-warn{background:rgba(255,209,102,.07);border:1px solid rgba(255,209,102,.2)}
.callout-tip{background:rgba(6,255,165,.06);border:1px solid rgba(6,255,165,.18)}
.callout-icon{font-size:1rem;flex-shrink:0;margin-top:1px}
.callout-text{font-size:.83rem;color:var(--text2);line-height:1.7}
@media(max-width:700px){
  .hero h1{font-size:1.9rem}.sidebar{display:none}.tcontent{padding:18px 16px}
  .cxgrid,.pcgrid,.info-cards{grid-template-columns:1fr}.tgrid{grid-template-columns:repeat(auto-fill,minmax(145px,1fr))}
  .stats{gap:20px}
}
`;

// ─── DATA ──────────────────────────────────────────────────────────
const DSA_DATA = {
  Sorting: {
    icon: "⚡", diff: "medium",
    desc: "Comparison-based (Selection, Bubble, Insertion, Merge, Quick) and non-comparison-based (Radix) sorting. Covers in-place and stable properties.",
    subtopics: {
      "Selection Sort": {
        diff: "easy",
        explanation: "Given an array of n items: (1) find the largest item x in the range [0…n−1], (2) swap x with the (n−1)th item, (3) reduce n by 1 and repeat. This grows a sorted region at the right end of the array one element per pass. Note: you can also find the smallest and place it at the front instead.",
        intuition: "Each pass selects the maximum from the unsorted region and places it in its final sorted position at the end. After n−1 passes every element is placed. It always does exactly n−1 swaps — the minimum possible for any comparison sort.",
        steps: [
          "Set i = n−1 (last index of unsorted region).",
          "Find maxIdx = index of the maximum element in a[0..i].",
          "Swap a[i] with a[maxIdx] — the maximum is now in its final position.",
          "Decrement i by 1 (shrink unsorted region).",
          "Repeat until i = 0. Array is sorted."
        ],
        dryRun: `Array: [29, 10, 14, 37, 13]

Pass 1 (i=4): max=37 @ idx3 → swap(idx3,idx4) → [29,10,14,13,37]
Pass 2 (i=3): max=29 @ idx0 → swap(idx0,idx3) → [13,10,14,29,37]
Pass 3 (i=2): max=14 @ idx2 → swap(idx2,idx2) → [13,10,14,29,37]
Pass 4 (i=1): max=13 @ idx0 → swap(idx0,idx1) → [10,13,14,29,37]

Result: [10, 13, 14, 29, 37] ✓`,
        time: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" },
        space: "O(1)", stable: false,
        when: "When the cost of memory writes (swaps) must be minimised — Selection Sort always does exactly n−1 swaps. Not suitable for large n due to always-O(n²) time.",
        pros: ["Exactly n−1 swaps — minimum possible", "In-place: O(1) extra space", "Simple to implement"],
        cons: ["Always O(n²) — no early exit optimization", "Not stable (relative order of equal elements may change)", "Worse cache performance than Insertion Sort"],
        cpp: `// Selection Sort — C++ (find max, place at end)
void selectionSort(int a[], int n) {
    for (int i = n - 1; i >= 1; i--) {
        int maxIdx = i;
        // Step 1: find index of maximum in a[0..i]
        for (int j = 0; j < i; j++)
            if (a[j] >= a[maxIdx])
                maxIdx = j;
        // Step 2: swap maximum to position i
        swap(a[i], a[maxIdx]);
    }
}`,
        python: `# Selection Sort — Python (find max, place at end)
def selection_sort(a):
    n = len(a)
    for i in range(n - 1, 0, -1):
        max_idx = i
        # Step 1: find index of maximum in a[0..i]
        for j in range(i):
            if a[j] >= a[max_idx]:
                max_idx = j
        # Step 2: swap maximum element to position i
        a[i], a[max_idx] = a[max_idx], a[i]
    return a`,
        practice: [
          { name: "Minimum Number of Swaps to Sort", diff: "medium" },
          { name: "Find the Minimum in Rotated Sorted Array", diff: "medium" }
        ]
      },
      "Bubble Sort": {
        diff: "easy",
        explanation: "Given an array of n items: (1) compare each pair of adjacent items, (2) swap if they are out of order, (3) repeat until the end of the array — the largest item 'bubbles' to the last position. (4) Reduce n by 1 and repeat. Version 2 adds an early-termination flag: if an entire inner pass completes with no swaps, the array is already sorted and we stop.",
        intuition: "Large items are like bubbles that float to the end of the array. After each pass, the next largest unsorted element reaches its final position. The early-termination trick makes the best case O(n) — if the array is already sorted, the first pass detects it immediately.",
        steps: [
          "Outer loop: i runs from n−1 down to 1 (size of unsorted region).",
          "Set is_sorted = true before the inner loop.",
          "Inner loop: j runs from 1 to i. If a[j−1] > a[j], swap them and set is_sorted = false.",
          "After the inner loop, if is_sorted is still true, return immediately — array is sorted.",
          "Otherwise decrement i and repeat."
        ],
        dryRun: `Array: [29, 10, 14, 37, 13]

Pass 1 (i=4):
  (29,10)→swap → (10,29) | (29,14)→swap | (14,37)→ok | (37,13)→swap
  After: [10,14,29,13,37]  ← 37 fixed ✓

Pass 2 (i=3):
  (10,14)→ok | (14,29)→ok | (29,13)→swap
  After: [10,14,13,29,37]  ← 29 fixed ✓

Pass 3 (i=2): [10,13,14,29,37] ← 14 fixed ✓
Pass 4 (i=1): no swaps → is_sorted=true → return early ✓

Result: [10, 13, 14, 29, 37] ✓`,
        time: { best: "O(n) v2", avg: "O(n²)", worst: "O(n²) descending" },
        space: "O(1)", stable: true,
        when: "Almost never in practice due to O(n²). The early-termination version (v2) is useful when input is nearly sorted. Teaches comparison-based sorting fundamentals.",
        pros: ["Stable sort", "In-place: O(1) extra space", "V2 early termination: O(n) best case on already-sorted input", "Easy to understand and visualise"],
        cons: ["O(n²) worst case — very slow for large n", "Worst case is descending order input", "More swaps per pass compared to Insertion Sort"],
        cpp: `// Bubble Sort v2 — C++ with early termination
void bubbleSort(int a[], int n) {
    for (int i = n - 1; i >= 1; i--) {
        bool is_sorted = true;       // Assume sorted
        for (int j = 1; j <= i; j++) {
            if (a[j-1] > a[j]) {
                swap(a[j], a[j-1]);
                is_sorted = false;   // A swap happened
            }
        }
        if (is_sorted) return;       // No swaps → done!
    }
}`,
        python: `# Bubble Sort v2 — Python with early termination
def bubble_sort(a):
    n = len(a)
    for i in range(n - 1, 0, -1):
        is_sorted = True              # Assume sorted
        for j in range(1, i + 1):
            if a[j-1] > a[j]:
                a[j-1], a[j] = a[j], a[j-1]
                is_sorted = False     # A swap happened
        if is_sorted:
            return a                  # No swaps → done!
    return a`,
        practice: [
          { name: "Check if Array is Sorted and Rotated", diff: "easy" },
          { name: "Sort Colors (Dutch National Flag)", diff: "medium" },
          { name: "Minimum Swaps to Sort", diff: "medium" }
        ]
      },

      "Insertion Sort": {
        diff: "easy",
        explanation: "Insertion Sort is similar to how most people arrange a hand of poker cards. Start with one card in hand, pick the next card and insert it into its proper sorted position, repeat for all cards. In array terms: the left portion a[0..i−1] is always sorted; for each new element a[i], we shift larger sorted elements rightward to make room, then place a[i] at the correct gap.",
        intuition: "You hold sorted cards in your left hand. Each new card from the deck slides left into its correct slot. The outer loop runs n−1 times; the inner loop shifts elements. Best case: already sorted array — inner loop never runs → O(n). Worst case: reverse sorted — every new element shifts all existing ones → O(n²).",
        steps: [
          "Start with i = 1 (treat a[0] as a sorted subarray of size 1).",
          "Save next = a[i] (the element to be inserted).",
          "Set j = i − 1. While j ≥ 0 AND a[j] > next: shift a[j] one position right (a[j+1] = a[j]), then j−−.",
          "Insert next at a[j+1].",
          "Increment i and repeat until i = n."
        ],
        dryRun: `Array: [40, 13, 20, 8]

i=1: next=13, 40>13 → shift 40 right → [40,40,20,8] → insert 13 → [13,40,20,8]
i=2: next=20, 40>20 → shift 40 right → [13,40,40,8] → insert 20 → [13,20,40,8]
i=3: next=8,  40>8,20>8,13>8 → shift all → insert 8 → [8,13,20,40]

Result: [8, 13, 20, 40] ✓`,
        time: { best: "O(n) sorted", avg: "O(n²)", worst: "O(n²) reverse" },
        space: "O(1)", stable: true,
        when: "Small arrays (n < 20), nearly-sorted data, or online/streaming scenarios (sort as data arrives). Also used inside Timsort for small runs.",
        pros: ["Stable sort", "In-place: O(1) extra space", "O(n) best case on already-sorted input", "Online algorithm — can sort data as it arrives", "Very fast for small n in practice"],
        cons: ["O(n²) worst case on reverse-sorted data", "Many element shifts for large n"],
        cpp: `// Insertion Sort — C++
void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int next = a[i];   // Item to be inserted
        int j;
        // Shift sorted items rightward to make room
        for (j = i - 1; j >= 0 && a[j] > next; j--)
            a[j + 1] = a[j];
        a[j + 1] = next;   // Insert at correct location
    }
}`,
        python: `# Insertion Sort — Python
def insertion_sort(a):
    for i in range(1, len(a)):
        next_val = a[i]       # Item to be inserted
        j = i - 1
        # Shift sorted items rightward to make room
        while j >= 0 and a[j] > next_val:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = next_val   # Insert at correct location
    return a`,
        practice: [
          { name: "Insertion Sort List (LeetCode 147)", diff: "medium" },
          { name: "Sort Nearly Sorted Array (k-sorted)", diff: "medium" }
        ]
      },
      "Merge Sort": {
        diff: "medium",
        explanation: "Merge Sort is a divide-and-conquer sorting algorithm. Divide step: split the array into two equal halves and recursively sort each half. Conquer step: merge the two sorted halves into one sorted array. The key insight is that merging two sorted arrays of size k takes O(k) time, and the recursion tree has O(log n) levels, giving O(n log n) total — in all cases.",
        intuition: "Two sorted arrays can be merged with two pointers in O(n). Divide until each sub-array has size 1 (trivially sorted), then conquer by merging upward. At every level of the recursion tree we do O(n) total merge work, and there are O(log n) levels → O(n log n). Performance is guaranteed — unlike Quick Sort, there is no bad input.",
        steps: [
          "Base case: if low >= high (0 or 1 item), return — already sorted.",
          "Divide: compute mid = (low + high) / 2.",
          "Recursively call mergeSort(a, low, mid) — sort left half.",
          "Recursively call mergeSort(a, mid+1, high) — sort right half.",
          "Conquer: call merge(a, low, mid, high) to merge the two sorted halves.",
          "In merge(): use a temporary array b[]. Two pointers (left, right) compare elements; always pick the smaller one into b[].",
          "Copy any remaining items into b[], then copy b[] back into a[low..high]."
        ],
        dryRun: `Array: [38, 16, 27, 39, 12, 27]

── Divide Phase ──────────────────────────────
mergeSort([38,16,27,39,12,27])
  mergeSort([38,16,27])        mergeSort([39,12,27])
    mergeSort([38,16])           mergeSort([39,12])
      mergeSort([38])              mergeSort([39]) → base
      mergeSort([16])              mergeSort([12]) → base
      merge([38],[16]) → [16,38]   merge([39],[12]) → [12,39]
    mergeSort([27]) → base       mergeSort([27]) → base

── Conquer (Merge) Phase ─────────────────────
merge([16,38],[27])   → [16,27,38]
merge([12,39],[27])   → [12,27,39]
merge([16,27,38],[12,27,39]):
  12<16 → 12 | 16<27 → 16 | 27≤27 → 27 | 27<38 → 27 | 38<39 → 38 | 39 → 39

Result: [12, 16, 27, 27, 38, 39] ✓`,
        time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(n) temp array", stable: true,
        when: "When guaranteed O(n log n) performance is required regardless of input. Excellent for sorting linked lists. When stability matters.",
        pros: ["Guaranteed O(n log n) — performance unaffected by input order", "Stable sort", "Suitable for extremely large inputs", "Can operate on input portion by portion (external sort)"],
        cons: ["Not in-place — requires O(n) extra memory for temporary array", "Not easy to implement correctly", "Slower than Quick Sort in practice due to cache misses and memory allocation"],
        cpp: `// Merge Sort — C++ (from lecture)
void merge(int a[], int low, int mid, int high) {
    int n = high - low + 1;
    int* b = new int[n];          // Temporary array
    int left = low, right = mid+1, bIdx = 0;
    // Merge while both halves have items
    while (left <= mid && right <= high) {
        if (a[left] <= a[right])
            b[bIdx++] = a[left++];
        else
            b[bIdx++] = a[right++];
    }
    // Copy remaining items
    while (left  <= mid)   b[bIdx++] = a[left++];
    while (right <= high)  b[bIdx++] = a[right++];
    // Copy merged result back into a[]
    for (int k = 0; k < n; k++)
        a[low + k] = b[k];
    delete[] b;                   // Free allocated memory
}

void mergeSort(int a[], int low, int high) {
    if (low < high) {             // Base case: low>=high means 0 or 1 item
        int mid = (low + high) / 2;
        mergeSort(a, low,   mid);   // Sort left half
        mergeSort(a, mid+1, high);  // Sort right half
        merge(a, low, mid, high);   // Merge sorted halves
    }
}`,
        python: `# Merge Sort — Python
def merge_sort(a, low, high):
    if low < high:                # Base case: 0 or 1 item
        mid = (low + high) // 2
        merge_sort(a, low, mid)       # Sort left half
        merge_sort(a, mid + 1, high)  # Sort right half
        merge(a, low, mid, high)      # Merge sorted halves

def merge(a, low, mid, high):
    b = []                        # Temporary array
    left, right = low, mid + 1
    # Merge while both halves have items
    while left <= mid and right <= high:
        if a[left] <= a[right]:
            b.append(a[left]);  left  += 1
        else:
            b.append(a[right]); right += 1
    # Copy remaining items
    while left  <= mid:  b.append(a[left]);  left  += 1
    while right <= high: b.append(a[right]); right += 1
    # Copy merged result back into a[]
    for k in range(len(b)):
        a[low + k] = b[k]`,
        practice: [
          { name: "Sort a Linked List", diff: "medium" },
          { name: "Count Inversions in Array", diff: "hard" },
          { name: "Merge Sorted Arrays", diff: "easy" }
        ]
      },
      "Quick Sort": {
        diff: "medium",
        explanation: "Quick Sort selects a 'pivot' element and partitions the array so that all elements smaller than the pivot go left, and all larger go right. The pivot is now in its final sorted position. Recursively apply to the left and right partitions.",
        intuition: "After partitioning, the pivot never moves again — it's already in its final position. We only need to sort the two smaller sub-arrays. With a random pivot, expected depth is O(log n), and at each level we do O(n) work. Cache-friendly and in-place, making it fastest in practice.",
        steps: [
          "Choose a pivot (last element in Lomuto; random for safety).",
          "Partition: scan left-to-right, placing elements ≤ pivot before pointer i, elements > pivot after.",
          "Swap pivot to position i+1 — pivot is now at its FINAL sorted position.",
          "Recursively QuickSort the left sub-array [low..pi-1].",
          "Recursively QuickSort the right sub-array [pi+1..high].",
          "Base case: sub-array of size 0 or 1 needs no sorting."
        ],
        dryRun: `Array: [27, 38, 12, 39, 27, 16], pivot = a[0] = 27

Partition (m starts at 0):
  k=1: 38 ≥ 27 → S2, skip
  k=2: 12 < 27 → m=1, swap(a[1],a[2]) → [27,12,38,39,27,16]
  k=3: 39 ≥ 27 → S2, skip
  k=4: 27 ≥ 27 → S2, skip
  k=5: 16 < 27 → m=2, swap(a[2],a[5]) → [27,12,16,39,27,38]

Place pivot: swap(a[0],a[2]) → [16,12,27,39,27,38]
Pivot 27 is at index 2  ✓  (FINAL)

Left  [16,12] → recurse → [12,16] ✓
Right [39,27,38] → recurse → [27,38,39] ✓

Result: [12, 16, 27, 27, 38, 39] ✓`,
        time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²) sorted input" },
        space: "O(log n) stack", stable: false,
        when: "General-purpose in-place sorting. Fastest in practice for random data. Always randomize pivot or use median-of-3 to avoid O(n²) on sorted input.",
        pros: ["Fastest in practice — cache-friendly and in-place", "O(n log n) average/best case", "Pivot ends in its final position — conquer step is trivial", "In-place: O(log n) stack space"],
        cons: ["O(n²) worst case on sorted/reverse-sorted arrays without randomization", "Not stable — relative order of equal elements not preserved", "Recursive depth O(n) in worst case → stack overflow risk"],
        cpp: `// Quick Sort — C++ (Lecture partition: a[i] as pivot)
int partition(int a[], int i, int j) {
    int p = a[i];    // Pivot is first element
    int m = i;       // m tracks end of S1 (items < p)
    for (int k = i + 1; k <= j; k++) {
        if (a[k] < p) {
            m++;
            swap(a[k], a[m]);   // Move to S1
        }
        // else: a[k] >= p → stays in S2, do nothing
    }
    swap(a[i], a[m]);  // Place pivot at correct position
    return m;          // Return pivot index
}

void quickSort(int a[], int low, int high) {
    if (low < high) {
        int pivotIdx = partition(a, low, high);
        quickSort(a, low, pivotIdx - 1);   // Sort S1
        quickSort(a, pivotIdx + 1, high);  // Sort S2
    }
}`,
        python: `# Quick Sort — Python (lecture partition: a[low] as pivot)
def partition(a, i, j):
    p = a[i]     # Pivot is first element
    m = i        # m tracks end of S1 (items < p)
    for k in range(i + 1, j + 1):
        if a[k] < p:
            m += 1
            a[k], a[m] = a[m], a[k]   # Move to S1
        # else: a[k] >= p → stays in S2, do nothing
    a[i], a[m] = a[m], a[i]  # Place pivot at position m
    return m                  # Return pivot index

def quick_sort(a, low, high):
    if low < high:
        pivot_idx = partition(a, low, high)
        quick_sort(a, low, pivot_idx - 1)   # Sort S1
        quick_sort(a, pivot_idx + 1, high)  # Sort S2`,
        practice: [
          { name: "Kth Largest Element in Array", diff: "medium" },
          { name: "Sort Array by Parity", diff: "easy" },
          { name: "Wiggle Sort II", diff: "hard" }
        ]
      },
      "Radix Sort": {
        diff: "medium",
        explanation: "Radix Sort is a non-comparison-based sorting algorithm. It treats each number as a string of digits and groups items by one digit position at a time — from least significant (1s) to most significant. Items are placed into 10 queues (one per digit 0–9), then concatenated. This is repeated for each of d digit positions.",
        intuition: "Instead of comparing elements, we group by digit. Using queues preserves the relative order of items with the same digit (stable). After d passes, all digit positions have been processed and the array is sorted. Total time is O(dn) — faster than O(n log n) when d is small (e.g. sorting n integers each ≤ 999 means d=3).",
        steps: [
          "Determine d = maximum number of digits in any element.",
          "Set power = 1 (starts at 1s place).",
          "distribute(): for each element v[i], compute digit = (v[i] / power) % 10, push v[i] into digitQueue[digit].",
          "collect(): concatenate queues 0 through 9 back into the array in order.",
          "Multiply power by 10 (move to next digit position).",
          "Repeat steps 3–5 for all d digit positions."
        ],
        dryRun: `Array: [170, 45, 75, 90, 802, 24, 2, 66]  (d=3)

Pass 1 (power=1, 1s digit):
  Buckets: 0:[170,90] 2:[802,2] 4:[24] 5:[45,75] 6:[66]
  Collect: [170, 90, 802, 2, 24, 45, 75, 66]

Pass 2 (power=10, 10s digit):
  Buckets: 0:[802,2] 2:[24] 4:[45] 6:[66] 7:[170,75] 9:[90]
  Collect: [802, 2, 24, 45, 66, 170, 75, 90]

Pass 3 (power=100, 100s digit):
  Buckets: 0:[2,24,45,66,75,90] 1:[170] 8:[802]
  Collect: [2, 24, 45, 66, 75, 90, 170, 802] ✓`,
        time: { best: "O(dn)", avg: "O(dn)", worst: "O(dn)" },
        space: "O(n)", stable: true,
        when: "Sorting large volumes of integers with a small number of digits d. Outperforms comparison sorts when d << log n. Used in database systems and network packet sorting.",
        pros: ["O(dn) — beats O(n log n) when d is small", "Stable sort", "No element comparisons needed", "Predictable, consistent time regardless of input order"],
        cons: ["Not in-place — requires extra queue/array storage O(n)", "Only works on integers or fixed-length strings", "Performance degrades when d is large (e.g. floats, large integers)"],
        cpp: `// Radix Sort — C++
#include <queue>
void distribute(vector<int>& v, queue<int> dq[], int power) {
    for (int i = 0; i < v.size(); i++) {
        int digit = (v[i] / power) % 10;  // Extract digit
        dq[digit].push(v[i]);
    }
}
void collect(queue<int> dq[], vector<int>& v) {
    int i = 0;
    for (int d = 0; d < 10; d++)
        while (!dq[d].empty()) {
            v[i++] = dq[d].front();
            dq[d].pop();
        }
}
void radixSort(vector<int>& v, int d) {
    queue<int> digitQueue[10]; // 10 buckets, one per digit
    int power = 1;
    for (int i = 0; i < d; i++) {
        distribute(v, digitQueue, power);
        collect(digitQueue, v);
        power *= 10;
    }
}`,
        python: `# Radix Sort — Python
from collections import deque

def radix_sort(v, d):
    power = 1
    for _ in range(d):
        buckets = [deque() for _ in range(10)]
        # distribute(): place into correct bucket by digit
        for num in v:
            digit = (num // power) % 10
            buckets[digit].append(num)
        # collect(): concatenate buckets back into v
        i = 0
        for bucket in buckets:
            while bucket:
                v[i] = bucket.popleft()
                i += 1
        power *= 10
    return v`,
        practice: [
          { name: "Maximum Gap", diff: "hard" },
          { name: "Sort an Array (Counting Sort variant)", diff: "medium" },
          { name: "Sort Characters by Frequency", diff: "medium" }
        ]
      },
      "Algorithm Comparison": {
        diff: "easy",
        explanation: "A summary of all sorting algorithms covered in the lecture, comparing their time complexities, space usage, stability, and in-place property. This is a classic exam question — know the table cold.",
        intuition: "Each algorithm makes different trade-offs. O(n²) algorithms are simple and in-place but slow. O(n log n) algorithms are faster but may need extra memory or sacrifice stability. Radix Sort beats them all when d is small but requires non-comparison input.",
        steps: [
          "Selection Sort: O(n²)/O(n²) | In-place ✓ | NOT stable ✗",
          "Insertion Sort: O(n)/O(n²) | In-place ✓ | Stable ✓",
          "Bubble Sort v1: O(n²)/O(n²) | In-place ✓ | Stable ✓",
          "Bubble Sort v2: O(n)/O(n²)  | In-place ✓ | Stable ✓",
          "Merge Sort:     O(n lg n)/O(n lg n) | NOT in-place ✗ | Stable ✓",
          "Quick Sort:     O(n lg n)/O(n²)     | In-place ✓ | NOT stable ✗",
          "Radix Sort:     O(dn)/O(dn)          | NOT in-place ✗ | Stable ✓"
        ],
        dryRun: `Algorithm        Best        Worst       In-place  Stable
─────────────────────────────────────────────────────────
Selection Sort   O(n²)       O(n²)       Yes       No
Insertion Sort   O(n)        O(n²)       Yes       Yes
Bubble Sort v1   O(n²)       O(n²)       Yes       Yes
Bubble Sort v2   O(n)        O(n²)       Yes       Yes
Merge Sort       O(n lg n)   O(n lg n)   No        Yes
Quick Sort       O(n lg n)   O(n²)       Yes       No
Radix Sort       O(dn)       O(dn)       No        Yes

Lower bound for comparison-based sorting: Ω(n log n)
→ Merge Sort is optimal among comparison sorts ✓`,
        time: { best: "Varies", avg: "Varies", worst: "Varies" },
        space: "Varies", stable: true,
        when: "Use this as a reference sheet before exams. Know which algorithms are stable, which are in-place, and why Quick Sort has O(n²) worst case.",
        pros: ["Merge Sort: guaranteed O(n log n), stable", "Quick Sort: fastest in practice, in-place", "Insertion Sort: best for small/nearly-sorted n", "Radix Sort: beats O(n log n) for integer data with small d"],
        cons: ["No single algorithm wins on all criteria", "Merge Sort needs O(n) extra memory", "Quick Sort degrades to O(n²) on sorted input", "Radix Sort is limited to integers/fixed strings"],
        cpp: `// Choosing the right sort in C++:
// std::sort       → introsort (Quick + Heap + Insertion)
// std::stable_sort → merge sort (stable, O(n log n))
// std::partial_sort → heap-based (top-k)

// For nearly sorted array → Insertion Sort
// For guaranteed O(n log n) stable → Merge Sort
// For general purpose (fast avg) → Quick Sort
// For integers with small range → Counting/Radix Sort`,
        python: `# Choosing the right sort in Python:
# sorted() / list.sort() → Timsort (Merge + Insertion)
# Timsort is stable and O(n log n) worst case

# For nearly sorted → Python's built-in (Timsort shines)
# For integers only → Radix Sort (O(dn))
# For custom key → sorted(arr, key=lambda x: x[1])
# For stability requirement → sorted() is always stable`,
        practice: [
          { name: "Sort Colors (3-way partition)", diff: "medium" },
          { name: "Largest Number (custom sort)", diff: "medium" },
          { name: "Merge Intervals", diff: "medium" }
        ]
      }
    }
  },
  Arrays: {
    icon: "📦", diff: "easy",
    desc: "Foundation of DSA — contiguous memory, O(1) access. Most-asked topic in coding interviews.",
    subtopics: {
      "Introduction & Memory": {
        diff: "easy",
        explanation: "An array is a linear data structure that stores elements of the same data type in contiguous memory locations. Each element is identified using an index, which typically starts from 0. Because memory is contiguous, the CPU can calculate any element's address in O(1) using a simple formula: Address(arr[i]) = Base_Address + (i × size_of_element). This is what gives arrays their signature O(1) random access.",
        intuition: "Think of an array as a row of numbered lockers in a corridor. You know locker #0 is at position 1000. Locker #3 is 3 lockers down — you don't need to walk past 0, 1, 2 to find it; you jump straight there. That's O(1) access. The trade-off: you must book a fixed number of lockers upfront, and inserting a new locker in the middle requires shifting everything.",
        steps: [
          "Declare the array with a fixed size (static) or use a dynamic type like vector/list.",
          "Elements are stored at consecutive memory addresses.",
          "Access any element in O(1) using its index: arr[i].",
          "Address formula: Base + (i × size_of_element). No traversal needed.",
          "Index range: 0 to n−1. Accessing arr[n] or beyond → Index Out of Bounds error."
        ],
        dryRun: `arr = [10, 20, 30, 40]
Index:   0    1    2    3

Base address = 1000, element size = 4 bytes

arr[0] → 1000 + (0 × 4) = 1000  → value: 10
arr[1] → 1000 + (1 × 4) = 1004  → value: 20
arr[2] → 1000 + (2 × 4) = 1008  → value: 30
arr[3] → 1000 + (3 × 4) = 1012  → value: 40

arr[5] → 1000 + (5 × 4) = 1020  → ⚠ Index Out of Bounds! ✗`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n)",
        stable: undefined,
        when: "Always — arrays are the default data structure. Use when you need fast random access and your data size is known or bounded.",
        pros: [
          "O(1) random access — the fastest possible",
          "Cache-friendly: contiguous memory means fewer cache misses",
          "Simple and low overhead — no pointers or extra metadata",
          "Foundation for all other data structures (stacks, queues, heaps)"
        ],
        cons: [
          "Fixed size in static arrays — must declare size upfront",
          "Expensive insert/delete: O(n) due to shifting",
          "Memory wastage if array is over-allocated",
          "Cannot store mixed data types (in typed languages)"
        ],
        cpp: `// 1D Array — C++
#include <vector>

int main() {
    // Static array (fixed size)
    int arr[4] = {10, 20, 30, 40};

    // Dynamic array (resizable)
    vector<int> v = {10, 20, 30, 40};

    // Access in O(1)
    cout << arr[2];   // 30
    cout << v[2];     // 30

    // Address formula (conceptual)
    // addr(arr[i]) = base + i * sizeof(int)
    // arr[2] = 1000 + 2*4 = 1008

    // 2D array
    int mat[2][3] = {{1,2,3},{4,5,6}};
    cout << mat[1][2]; // 6
}`,
        python: `# 1D Array (list) — Python
arr = [10, 20, 30, 40]

# Access in O(1)
print(arr[2])   # 30
print(arr[-1])  # 40 (last element)

# 2D array (list of lists)
mat = [[1,2,3],[4,5,6]]
print(mat[1][2])  # 6

# Dynamic — Python lists resize automatically
arr.append(50)   # [10,20,30,40,50]
arr.pop()        # removes last → [10,20,30,40]

# Useful builtins
print(len(arr))  # 4
print(arr[1:3])  # [20, 30] — slicing O(k)`,
        practice: [
          { name: "Find Maximum and Minimum in Array", diff: "easy" },
          { name: "Reverse an Array", diff: "easy" },
          { name: "Check if Array is Sorted", diff: "easy" }
        ]
      },
      "Types of Arrays": {
        diff: "easy",
        explanation: "Arrays come in several forms: (1) 1D arrays — a flat sequence. (2) 2D arrays — a matrix with rows and columns. (3) Multi-dimensional — 3D and beyond. (4) Static arrays — fixed size, declared at compile time. (5) Dynamic arrays — resizable at runtime. Dynamic arrays (vector in C++, list in Python, ArrayList in Java) are the most commonly used in practice and in interviews.",
        intuition: "A 1D array is a line of boxes. A 2D array is a grid (like a spreadsheet). A static array is a fixed-size parking lot — once full, no more cars. A dynamic array is a lot that doubles its size when full, amortising the cost of resizing to O(1) amortised per insertion.",
        steps: [
          "1D: arr[i] — single index accesses any element.",
          "2D: arr[i][j] — row i, column j. Stored row-major in memory.",
          "Static: int arr[10] — size fixed at declaration.",
          "Dynamic (vector/list): grows automatically. When capacity is hit, a new larger array is allocated and elements are copied — this is why push_back is O(1) amortised.",
          "Multi-dim: generalise with more indices. Memory is still contiguous (row-major order)."
        ],
        dryRun: `1D:  arr = [1, 2, 3, 4]
             idx:  0  1  2  3

2D:  mat = [[1,2,3],   → row 0: addresses 1000,1004,1008
             [4,5,6]]  → row 1: addresses 1012,1016,1020
     mat[1][2] = 6  (row 1, col 2)
     addr = base + (1*3 + 2) * 4 = base + 20

Dynamic vector growth (C++ vector):
  capacity=1 → [10]
  push_back(20): capacity=2 → [10,20]
  push_back(30): capacity=4 → [10,20,30,_]
  push_back(40): no resize  → [10,20,30,40]
  push_back(50): capacity=8 → [10,20,30,40,50,_,_,_] ✓`,
        time: { best: "O(1) access", avg: "O(1) access", worst: "O(n) resize" },
        space: "O(n·m) for 2D",
        stable: undefined,
        when: "Use 2D arrays for grids, matrices, DP tables. Use dynamic arrays (vector/list) almost always in interviews.",
        pros: ["2D arrays model real-world grids naturally", "Dynamic arrays have amortised O(1) append", "Row-major storage keeps row access cache-friendly"],
        cons: ["2D array traversal is O(n×m)", "Dynamic resize has occasional O(n) spike", "Column-major access in row-major arrays causes cache misses"],
        cpp: `// Types of Arrays — C++
// Static 1D
int arr[5] = {1, 2, 3, 4, 5};

// Dynamic 1D
vector<int> v = {1, 2, 3, 4, 5};
v.push_back(6);       // O(1) amortised
v.pop_back();         // O(1)
cout << v.size();     // 5

// Static 2D
int mat[2][3] = {{1,2,3},{4,5,6}};

// Dynamic 2D
vector<vector<int>> grid(3, vector<int>(4, 0));
// 3 rows, 4 cols, all zeros
grid[1][2] = 7;

// 2D traversal
for (int i = 0; i < grid.size(); i++)
    for (int j = 0; j < grid[0].size(); j++)
        cout << grid[i][j] << " ";`,
        python: `# Types of Arrays — Python

# 1D list
arr = [1, 2, 3, 4, 5]

# 2D list (matrix)
mat = [[1,2,3],[4,5,6]]

# Create 3×4 matrix of zeros
grid = [[0]*4 for _ in range(3)]
grid[1][2] = 7

# 2D traversal
for i in range(len(mat)):
    for j in range(len(mat[0])):
        print(mat[i][j], end=" ")

# Python list append is O(1) amortised
arr.append(6)    # [1,2,3,4,5,6]
arr.insert(2, 9) # O(n) — shifts elements
arr.pop()        # O(1) — removes last`,
        practice: [
          { name: "Spiral Matrix", diff: "medium" },
          { name: "Rotate Image (90°)", diff: "medium" },
          { name: "Transpose Matrix", diff: "easy" }
        ]
      },
      "Core Operations": {
        diff: "easy",
        explanation: "The five fundamental array operations are: (1) Access — O(1) by index. (2) Search — O(n) linear, O(log n) binary (sorted only). (3) Insertion — O(n) because elements must be shifted right to make space. (4) Deletion — O(n) because elements must be shifted left to fill the gap. (5) Update — O(1), just overwrite the index. Insertion and deletion are O(1) only at the end of a dynamic array.",
        intuition: "Access is free — just compute the address. Search in an unsorted array forces you to check every element. Insertion/deletion mid-array is expensive because the 'locker row' is contiguous — inserting means physically moving everything down or up. Update just replaces a value in-place — trivial.",
        steps: [
          "ACCESS: arr[i] → compute address, return value. O(1).",
          "SEARCH (linear): scan left to right until target found. O(n) worst case.",
          "SEARCH (binary): requires sorted array. Compare mid, eliminate half. O(log n).",
          "INSERT at index k: shift arr[k..n-1] one position right, place new value at arr[k]. O(n).",
          "DELETE at index k: shift arr[k+1..n-1] one position left, decrement size. O(n).",
          "UPDATE: arr[k] = new_value. No shifting. O(1)."
        ],
        dryRun: `── INSERT 25 at index 2 ──────────────────────────────
Before:  [10, 20, 30, 40]
Shift:   index 3←4: [10,20,30,30,40] (conceptual)
         index 2←3: [10,20,30,30,40]
         Actually:  [10,20,_,30,40]
Insert:  arr[2]=25  → [10,20,25,30,40] ✓  O(n)

── DELETE index 1 ────────────────────────────────────
Before:  [10, 20, 30]
Shift:   arr[1]←arr[2]: [10,30,30]
         size--        → [10, 30] ✓  O(n)

── BINARY SEARCH for 30 in [10,20,30,40,50] ─────────
lo=0, hi=4, mid=2 → arr[2]=30 == target ✓  O(log n)`,
        time: { best: "O(1) access/update", avg: "O(n) insert/delete", worst: "O(n) insert/delete" },
        space: "O(1) extra",
        stable: undefined,
        when: "Access and update are always O(1) — perfect. Avoid frequent mid-array insertions/deletions; prefer linked list or deque instead.",
        pros: ["Access & update are O(1)", "Binary search gives O(log n) on sorted arrays", "In-place operations — no extra memory needed"],
        cons: ["Insert/delete at arbitrary position is O(n)", "Array must be sorted for binary search", "No O(1) insert at beginning (unlike linked list)"],
        cpp: `// Core Operations — C++
vector<int> arr = {10, 20, 30, 40};

// Access — O(1)
int x = arr[2];  // 30

// Update — O(1)
arr[2] = 99;     // arr = {10,20,99,40}

// Insert at index k — O(n)
arr.insert(arr.begin() + 2, 25);

// Delete at index k — O(n)
arr.erase(arr.begin() + 1);

// Linear Search — O(n)
for (int i = 0; i < arr.size(); i++)
    if (arr[i] == 30) return i;

// Binary Search (sorted) — O(log n)
// Using STL (array must be sorted first)
sort(arr.begin(), arr.end());
bool found = binary_search(arr.begin(), arr.end(), 30);`,
        python: `# Core Operations — Python
arr = [10, 20, 30, 40]

# Access — O(1)
x = arr[2]       # 30

# Update — O(1)
arr[2] = 99      # [10, 20, 99, 40]

# Insert at index k — O(n)
arr.insert(2, 25)  # [10, 20, 25, 30, 40]

# Delete at index k — O(n)
arr.pop(1)         # removes index 1 → O(n)
del arr[1]         # same effect

# Linear Search — O(n)
if 30 in arr:
    print(arr.index(30))

# Binary Search (sorted) — O(log n)
import bisect
arr.sort()
idx = bisect.bisect_left(arr, 30)`,
        practice: [
          { name: "Search in Rotated Sorted Array", diff: "medium" },
          { name: "First and Last Position in Sorted Array", diff: "medium" },
          { name: "Remove Element In-place", diff: "easy" }
        ]
      },
      "Key Patterns": {
        diff: "medium",
        explanation: "Most array interview problems reduce to one of five patterns: (1) Prefix Sum — precompute cumulative sums for O(1) range queries. (2) Sliding Window — maintain a window of fixed or variable size over the array. (3) Two Pointers — use left and right pointers moving toward each other or in the same direction. (4) Kadane's Algorithm — find the maximum subarray sum in O(n). (5) Dutch National Flag (3-way partition) — partition array into three groups in O(n). Recognising which pattern applies is the key interview skill.",
        intuition: "Prefix sum trades O(n) precomputation for O(1) queries — worth it when you have many queries. Sliding window avoids recomputing overlapping sub-arrays by sliding incrementally. Two pointers eliminates nested loops when the array is sorted. Kadane's is DP with the recurrence: maxEndingHere = max(arr[i], maxEndingHere + arr[i]).",
        steps: [
          "PREFIX SUM: prefix[0]=arr[0]; prefix[i]=prefix[i-1]+arr[i]. Range sum [l,r] = prefix[r]-prefix[l-1]. O(n) build, O(1) query.",
          "SLIDING WINDOW: maintain window [left,right]. Expand right to include, shrink left to satisfy constraints. O(n) total.",
          "TWO POINTERS: left=0, right=n-1. Move based on comparison. Works best on sorted arrays. O(n).",
          "KADANE'S: track maxEndingHere and maxSoFar. At each element: maxEndingHere=max(arr[i], maxEndingHere+arr[i]). O(n).",
          "DUTCH FLAG: 3 pointers (lo, mid, hi). Elements < pivot go to [0,lo), = pivot stay in [lo,mid), > pivot go to (hi,n). O(n)."
        ],
        dryRun: `── PREFIX SUM ─────────────────────────────────────────
arr    = [3,  1,  4,  1,  5]
prefix = [3,  4,  8,  9, 14]
Range sum [1,3] = prefix[3] - prefix[0] = 9 - 3 = 6 ✓

── KADANE'S ALGORITHM ────────────────────────────────
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
                       ↑__________↑  max subarray

i=0: cur=-2, max=-2
i=1: cur=max(1,-2+1)=1,  max=1
i=2: cur=max(-3,1-3)=-2, max=1
i=3: cur=max(4,-2+4)=4,  max=4
i=4: cur=max(-1,4-1)=3,  max=4
i=5: cur=max(2,3+2)=5,   max=5
i=6: cur=max(1,5+1)=6,   max=6  ← answer: 6 ✓

── TWO POINTERS (Two Sum in sorted) ─────────────────
arr=[2,7,11,15], target=9
l=0,r=3: 2+15=17>9 → r--
l=0,r=2: 2+11=13>9 → r--
l=0,r=1: 2+7=9 ✓  → return [0,1]`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) prefix, O(1) others",
        stable: undefined,
        when: "Range queries → Prefix Sum. Fixed/variable window subarray → Sliding Window. Sorted array pair/triplet problems → Two Pointers. Max subarray → Kadane's. Sorting 0s/1s/2s → Dutch Flag.",
        pros: ["All patterns run in O(n) — optimal for array problems", "Eliminate nested loops (O(n²) → O(n))", "Widely applicable — cover ~80% of array interview problems"],
        cons: ["Prefix sum uses O(n) extra space", "Sliding window logic can be tricky with variable windows", "Two pointers requires sorted array for many problems"],
        cpp: `// Key Patterns — C++

// 1. Prefix Sum
vector<int> prefix(n);
prefix[0] = arr[0];
for (int i = 1; i < n; i++)
    prefix[i] = prefix[i-1] + arr[i];
// Range query [l,r]:
int rangeSum = prefix[r] - (l > 0 ? prefix[l-1] : 0);

// 2. Kadane's Algorithm
int maxSum = arr[0], cur = arr[0];
for (int i = 1; i < n; i++) {
    cur = max(arr[i], cur + arr[i]);
    maxSum = max(maxSum, cur);
}

// 3. Two Pointers (Two Sum in sorted array)
int l = 0, r = n - 1;
while (l < r) {
    int s = arr[l] + arr[r];
    if (s == target) return {l, r};
    else if (s < target) l++;
    else r--;
}

// 4. Sliding Window (max sum of k elements)
int windowSum = 0, maxWin = 0;
for (int i = 0; i < k; i++) windowSum += arr[i];
maxWin = windowSum;
for (int i = k; i < n; i++) {
    windowSum += arr[i] - arr[i-k];
    maxWin = max(maxWin, windowSum);
}`,
        python: `# Key Patterns — Python

# 1. Prefix Sum
prefix = [0] * n
prefix[0] = arr[0]
for i in range(1, n):
    prefix[i] = prefix[i-1] + arr[i]
# Range sum [l, r]:
range_sum = prefix[r] - (prefix[l-1] if l > 0 else 0)

# 2. Kadane's Algorithm — O(n)
def max_subarray(arr):
    max_sum = cur = arr[0]
    for x in arr[1:]:
        cur = max(x, cur + x)
        max_sum = max(max_sum, cur)
    return max_sum

# 3. Two Pointers (Two Sum sorted)
def two_sum(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target: return [l, r]
        elif s < target: l += 1
        else: r -= 1

# 4. Sliding Window (fixed size k)
def max_window_sum(arr, k):
    win = sum(arr[:k])
    max_win = win
    for i in range(k, len(arr)):
        win += arr[i] - arr[i-k]
        max_win = max(max_win, win)
    return max_win`,
        practice: [
          { name: "Maximum Subarray (Kadane's)", diff: "medium" },
          { name: "Range Sum Query — Immutable", diff: "easy" },
          { name: "Two Sum", diff: "easy" },
          { name: "Longest Subarray with Sum K", diff: "medium" },
          { name: "Container With Most Water", diff: "medium" }
        ]
      },
      "Important Problems": {
        diff: "medium",
        explanation: "These are the canonical array problems that appear most frequently in interviews. Every CS student should be able to code these from scratch: Reverse array, Move zeros, Remove duplicates, Rotate array, Merge sorted arrays, Find majority element, and Dutch National Flag (sort 0s,1s,2s). Each one tests a specific concept and serves as a building block for harder problems.",
        intuition: "Rotating an array by k can be done optimally with three reversals — no extra O(n) space needed. Removing duplicates in-place uses a slow/fast pointer technique. Move zeros uses a write pointer. These tricks transform naive O(n²) solutions into O(n) solutions with O(1) space.",
        steps: [
          "REVERSE: swap arr[left] and arr[right], move inward. O(n), O(1).",
          "MOVE ZEROS: writePtr=0, scan right, if arr[i]≠0 write and advance writePtr, then fill rest with 0s. O(n), O(1).",
          "REMOVE DUPLICATES (sorted): writePtr=1, if arr[i]≠arr[i-1] write. O(n), O(1).",
          "ROTATE RIGHT by k: reverse all, reverse first k, reverse last n-k. O(n), O(1).",
          "MERGE SORTED: use extra array + two pointers from the end. O(n+m), O(1) if merged into larger array.",
          "MAJORITY ELEMENT (Boyer-Moore): candidate + count. O(n), O(1)."
        ],
        dryRun: `── ROTATE [1,2,3,4,5] RIGHT by 2 ──────────────────────
k=2
Step 1: reverse all       → [5,4,3,2,1]
Step 2: reverse first 2   → [4,5,3,2,1]
Step 3: reverse last 3    → [4,5,1,2,3] ✓

── MOVE ZEROS [0,1,0,3,12] ─────────────────────────────
writePtr=0
i=0: 0 → skip
i=1: 1 → arr[0]=1, writePtr=1  → [1,1,0,3,12]
i=2: 0 → skip
i=3: 3 → arr[1]=3, writePtr=2  → [1,3,0,3,12]
i=4: 12→ arr[2]=12,writePtr=3  → [1,3,12,3,12]
Fill [3..4] with 0s             → [1,3,12,0,0] ✓

── MAJORITY ELEMENT [3,2,3] (Boyer-Moore) ─────────────
i=0: candidate=3, count=1
i=1: 2≠3,         count=0
i=2: count=0 → candidate=3, count=1
Answer: 3 ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(1) most",
        stable: undefined,
        when: "These are the building blocks. Solve each from scratch until you can do them in < 5 minutes. They appear as sub-problems inside harder questions.",
        pros: ["All solvable in O(n) time and O(1) space", "Cover the most common interview patterns", "Each generalises to many harder problems"],
        cons: ["Off-by-one errors are common in rotate and remove duplicates", "Majority element only works when majority exists (>n/2 frequency)"],
        cpp: `// Important Problems — C++

// 1. Reverse Array — O(n), O(1)
void reverse(vector<int>& a) {
    int l = 0, r = a.size()-1;
    while (l < r) swap(a[l++], a[r--]);
}

// 2. Move Zeros to End — O(n), O(1)
void moveZeros(vector<int>& a) {
    int w = 0;
    for (int x : a) if (x) a[w++] = x;
    while (w < a.size()) a[w++] = 0;
}

// 3. Remove Duplicates (sorted) — O(n), O(1)
int removeDups(vector<int>& a) {
    int w = 1;
    for (int i = 1; i < a.size(); i++)
        if (a[i] != a[i-1]) a[w++] = a[i];
    return w; // new length
}

// 4. Rotate Right by k — O(n), O(1)
void rotate(vector<int>& a, int k) {
    int n = a.size(); k %= n;
    reverse(a.begin(), a.end());
    reverse(a.begin(), a.begin()+k);
    reverse(a.begin()+k, a.end());
}

// 5. Majority Element — Boyer-Moore, O(n), O(1)
int majority(vector<int>& a) {
    int cand = a[0], cnt = 1;
    for (int i = 1; i < a.size(); i++)
        cnt += (a[i] == cand) ? 1 : -1,
        cnt == 0 && (cand = a[i], cnt = 1);
    return cand;
}`,
        python: `# Important Problems — Python

# 1. Reverse Array — O(n), O(1)
def reverse_arr(a):
    l, r = 0, len(a)-1
    while l < r:
        a[l], a[r] = a[r], a[l]
        l += 1; r -= 1

# 2. Move Zeros — O(n), O(1)
def move_zeros(a):
    w = 0
    for x in a:
        if x: a[w] = x; w += 1
    while w < len(a): a[w] = 0; w += 1

# 3. Remove Duplicates (sorted) — O(n), O(1)
def remove_dups(a):
    w = 1
    for i in range(1, len(a)):
        if a[i] != a[i-1]:
            a[w] = a[i]; w += 1
    return w  # new length

# 4. Rotate Right by k — O(n), O(1)
def rotate(a, k):
    n = len(a); k %= n
    a.reverse()
    a[:k] = reversed(a[:k])
    a[k:] = reversed(a[k:])

# 5. Majority Element — Boyer-Moore, O(n), O(1)
def majority(a):
    cand, cnt = a[0], 1
    for x in a[1:]:
        cnt += 1 if x == cand else -1
        if cnt == 0: cand = x; cnt = 1
    return cand`,
        practice: [
          { name: "Rotate Array", diff: "medium" },
          { name: "Move Zeroes", diff: "easy" },
          { name: "Remove Duplicates from Sorted Array", diff: "easy" },
          { name: "Majority Element", diff: "easy" },
          { name: "Merge Sorted Array", diff: "easy" },
          { name: "Sort Colors (Dutch National Flag)", diff: "medium" }
        ]
      },
      "Complexity & Edge Cases": {
        diff: "easy",
        explanation: "A complete reference for array operation complexities and the edge cases that trip up even experienced programmers. In interviews, always ask about edge cases before coding — it shows problem-solving maturity. The complexity table and edge case checklist below are your exam and interview quick-reference.",
        intuition: "The complexity table is non-negotiable exam knowledge. Edge cases are where most solutions break: an empty array, a single element, all duplicates, all zeros, or a fully sorted/reversed array. Test each one mentally before submitting.",
        steps: [
          "Access arr[i]: O(1) — just arithmetic on base address.",
          "Search (linear): O(n) — must scan all elements in worst case.",
          "Insert at index k: O(n) — shift n−k elements right.",
          "Delete at index k: O(n) — shift n−k−1 elements left.",
          "Append (dynamic, amortised): O(1) — O(n) only when resize happens.",
          "Binary search (sorted): O(log n) — eliminates half at each step."
        ],
        dryRun: `Operation     | Best   | Average | Worst  | Space
──────────────┼────────┼─────────┼────────┼───────
Access arr[i] | O(1)   | O(1)    | O(1)   | O(1)
Search        | O(1)   | O(n)    | O(n)   | O(1)
Insert (mid)  | O(n)   | O(n)    | O(n)   | O(1)
Delete (mid)  | O(n)   | O(n)    | O(n)   | O(1)
Append (dyn)  | O(1)   | O(1)*   | O(n)   | O(1)
Binary Search | O(1)   | O(log n)| O(log n)| O(1)

Edge Cases to always check:
  ✓ Empty array → handle before any indexing
  ✓ Single element → many loop-based solutions break
  ✓ All duplicates → remove-duplicates and search edge cases
  ✓ Negative numbers → max subarray, sorting, Two Sum
  ✓ Already sorted → check if algorithm still works
  ✓ Reverse sorted → often triggers O(n²) worst case
  ✓ Array of size 1 → off-by-one in two-pointer / binary search`,
        time: { best: "O(1) access", avg: "O(n) general", worst: "O(n) insert/del" },
        space: "O(n) storage",
        stable: undefined,
        when: "Memorise this table. In any exam question about arrays, state the complexity and at least 3 relevant edge cases before writing code.",
        pros: ["Clean O(1) access — unmatched by any other structure", "Binary search on sorted arrays is extremely powerful"],
        cons: ["O(n) insert/delete makes arrays unsuitable for frequent modifications", "Static arrays have no safety net against overflow"],
        cpp: `// Edge Case Handling — C++
void safeProcess(vector<int>& arr, int target) {
    // Always check empty array first
    if (arr.empty()) return;

    // Single element
    if (arr.size() == 1) {
        // Handle separately if needed
    }

    // Safe binary search (avoid overflow in mid)
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2; // NOT (lo+hi)/2 — overflow!
        if (arr[mid] == target) return;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
}`,
        python: `# Edge Case Handling — Python
def safe_process(arr, target):
    # Always check empty array first
    if not arr:
        return -1

    # Single element
    if len(arr) == 1:
        return 0 if arr[0] == target else -1

    # Safe binary search
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2   # Python ints don't overflow
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Useful edge-case inputs to always test:
# [], [x], [x,x,x], [-1,-2,0,1], sorted, reverse-sorted`,
        practice: [
          { name: "Find Pivot Index", diff: "easy" },
          { name: "Binary Search", diff: "easy" },
          { name: "Missing Number", diff: "easy" },
          { name: "Product of Array Except Self", diff: "medium" }
        ]
      }
    }
  },
  Strings: {
    icon: "\u{1F524}", diff: "medium",
    desc: "Sequences of characters with powerful algorithmic techniques. From Two Pointers to KMP, Tries to Suffix Arrays.",
    subtopics: {
      "Basics & Representations": {
        diff: "easy",
        explanation: "A string is a sequence of characters over some alphabet. Strings use 0-based indexing. There are two fundamental representations: (1) Null-terminated — an array ending with '$'. Used in C/C++. Length takes O(n) to compute. (2) Pointer/Length — a (pointer, length) pair. Length is O(1). Any substring extracted in O(1) as new (pointer+i, m) pair — no copying. The pointer/length trick powers Tries, Patricia Trees, and Suffix Trees. In Python/Java strings are immutable — use list or StringBuilder for mutations.",
        intuition: "Null-terminated strings are simple but scanning for length is wasteful. Pointer/length strings store the length explicitly — substring extraction is just pointer arithmetic. This O(1) substring trick is what makes advanced string data structures like Patricia Trees and Suffix Trees efficient without copying data.",
        steps: [
          "Null-terminated: array ends with '$'. Access char at i in O(1). Length requires O(n) scan.",
          "Pointer/length: stored as (p, l). Length is O(1). Substring s[i..i+m-1] = (p+i, m) — O(1), no copy.",
          "String indexing is 0-based. Last character is at index n-1.",
          "Comparison of s1 and s2 costs O(min(|s1|,|s2|)) — not O(1) like integers.",
          "In Python/Java, strings are immutable. Repeated += is O(n^2). Use ''.join() or StringBuilder.",
          "In C++, std::string is mutable and stores length internally — length() is O(1)."
        ],
        dryRun: `String: "grain-fed organic"  (length = 17)

-- Null-terminated -----------------------------------
[g][r][a][i][n][-][f][e][d][ ][o][r][g][a][n][i][c][$]
 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17
length: scan until '$' -> O(n)

-- Pointer/Length ------------------------------------
p -> points to 'g' (base address), l = 17

Extract "organ" (index 10, length 5):
  new pair (p+10, 5) -> O(1), no copy! ✓

String comparison:
  "apple" vs "apply"
  a==a, p==p, p==p, l==l, e!=y -> not equal  O(4) ✓`,
        time: { best: "O(1) access", avg: "O(n) compare", worst: "O(n) length null-term" },
        space: "O(n)",
        stable: undefined,
        when: "Use pointer/length whenever extracting many substrings. Use null-terminated only for C API compatibility.",
        pros: [
          "O(1) character access by index",
          "Pointer/length gives O(1) substring without copying",
          "Characters are integers — directly usable as array indices (freq[c-'a'])",
          "Cache-friendly if stored contiguously"
        ],
        cons: [
          "String comparison is O(min(|s1|,|s2|)) — not constant",
          "Null-terminated length is O(n) to compute",
          "Immutable strings (Python/Java) make repeated edits O(n^2)",
          "Variable length makes string data structures more complex than integer ones"
        ],
        cpp: `// String basics -- C++
#include <string>
string s = "hello world";

// Access -- O(1)
char c = s[4];          // 'o'
int n = s.size();       // O(1) in C++ std::string

// Substring -- O(k) copy
string sub = s.substr(6, 5);  // "world"

// Comparison -- O(n)
bool eq = (s == "hello world");

// Build string efficiently
string result = "";
result.reserve(100);    // pre-allocate
for (char ch : s) result += ch;  // O(n) total

// Iterate
for (int i = 0; i < (int)s.size(); i++)
    cout << s[i];`,
        python: `# String basics -- Python
s = "hello world"

# Access -- O(1)
c  = s[4]           # 'o'
c2 = s[-1]          # 'd' last char

# Length -- O(1)
n = len(s)          # 11

# Substring (slice) -- O(k) copy
sub = s[6:11]       # "world"

# Strings are IMMUTABLE in Python
# s[0] = 'H'  -> TypeError!

# Build efficiently
chars = ['h','e','l','l','o']
result = ''.join(chars)  # O(n) correct
# DON'T: result = "" + "h" + "e" ...  O(n^2)

# Useful methods
s.upper()           # "HELLO WORLD"
s.split(' ')        # ['hello', 'world']
s.find("world")     # 6`,
        practice: [
          { name: "Reverse a String", diff: "easy" },
          { name: "Valid Palindrome", diff: "easy" },
          { name: "String Compression", diff: "medium" }
        ]
      },
      "Core Techniques": {
        diff: "medium",
        explanation: "Most string problems use one of six techniques: (1) Two Pointers — left from start, right from end; used in palindromes and reversals. (2) Sliding Window — maintain a variable or fixed window over the string. (3) Frequency Count — int freq[26] counts chars in O(n); comparing two freq arrays is O(26)=O(1). (4) String Hashing — polynomial rolling hash for O(1) substring comparison. (5) Sorting — sort both strings to check anagrams. (6) Character as Index — since chars are integers, use c-'a' as array index directly.",
        intuition: "Frequency counting converts character comparison into integer array comparison — clever and fast. Sliding window avoids recomputing from scratch: add the new right char, remove the old left char. Two pointers eliminate the need to generate all O(n^2) substrings. Hashing turns O(n) string comparison into O(1) hash comparison.",
        steps: [
          "TWO POINTERS: left=0, right=n-1. Compare s[left] and s[right], move inward. O(n).",
          "SLIDING WINDOW: [left,right] window. Expand right to grow. Shrink left when constraint violated. O(n).",
          "FREQUENCY COUNT: freq[26]=0. For each char: freq[c-'a']++. Compare two freq arrays in O(26)=O(1).",
          "STRING HASHING: hash = sum(s[i]*p^i) mod M. Rolling: remove left char, add right char in O(1) per step.",
          "CHARACTER AS INDEX: s[i]-'a' gives 0-25. s[i]-'0' gives digit 0-9. No HashMap needed for fixed alphabets.",
          "SORTING: sort(s) gives canonical form. Two strings are anagrams iff sorted forms equal."
        ],
        dryRun: `-- TWO POINTERS: is "racecar" palindrome? -----------
l=0,r=6: r==r -> l++,r--
l=1,r=5: a==a -> l++,r--
l=2,r=4: c==c -> l++,r--
l=3,r=3: l>=r -> PALINDROME ✓

-- FREQUENCY COUNT: "listen" vs "silent" anagram? ---
freq "listen": l=1,i=1,s=1,t=1,e=1,n=1
freq "silent": s=1,i=1,l=1,e=1,n=1,t=1
Arrays equal -> ANAGRAM ✓  O(n) time, O(1) space

-- SLIDING WINDOW: longest no-repeat "abcabcbb" -----
window={}, l=0
r=0:a->{a},max=1   r=1:b->{a,b},max=2
r=2:c->{a,b,c},max=3
r=3:a duplicate! remove a, l=1, window={b,c,a}, max=3
...final max=3 "abc" ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(1) freq / O(n) window",
        stable: undefined,
        when: "Anagram/frequency problems: Frequency Count. Substring problems: Sliding Window. Palindrome/reverse: Two Pointers. Duplicate substring detection: Hashing.",
        pros: ["All run in O(n) -- optimal", "Frequency count is O(1) space for fixed alphabets", "Two pointers avoids generating all O(n^2) substrings"],
        cons: ["Hashing has collision risk -- use double hashing for safety", "Variable sliding window conditions can be subtle", "Char-as-index only works for known fixed alphabets"],
        cpp: `// Core Techniques -- C++

// 1. Two Pointers (palindrome)
bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r)
        if (s[l++] != s[r--]) return false;
    return true;
}

// 2. Frequency Count (anagram)
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int freq[26] = {};
    for (char c : s) freq[c-'a']++;
    for (char c : t) freq[c-'a']--;
    for (int f : freq) if (f) return false;
    return true;
}

// 3. Sliding Window (longest no-repeat)
int longestNR(string s) {
    unordered_map<char,int> last;
    int l = 0, res = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        if (last.count(s[r]) && last[s[r]] >= l)
            l = last[s[r]] + 1;
        last[s[r]] = r;
        res = max(res, r - l + 1);
    }
    return res;
}`,
        python: `# Core Techniques -- Python

# 1. Two Pointers (palindrome)
def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]: return False
        l += 1; r -= 1
    return True

# 2. Frequency Count (anagram) O(n), O(1)
def is_anagram(s, t):
    if len(s) != len(t): return False
    freq = [0] * 26
    for c in s: freq[ord(c)-ord('a')] += 1
    for c in t: freq[ord(c)-ord('a')] -= 1
    return all(f == 0 for f in freq)

# 3. Sliding Window (longest no-repeat)
def longest_no_repeat(s):
    last = {}
    l = res = 0
    for r, c in enumerate(s):
        if c in last and last[c] >= l:
            l = last[c] + 1
        last[c] = r
        res = max(res, r - l + 1)
    return res`,
        practice: [
          { name: "Valid Anagram", diff: "easy" },
          { name: "Longest Substring Without Repeating Characters", diff: "medium" },
          { name: "Minimum Window Substring", diff: "hard" },
          { name: "Group Anagrams", diff: "medium" }
        ]
      },
      "Pattern Matching": {
        diff: "medium",
        explanation: "Pattern matching asks: does pattern P appear in text T? Naive: O(n*m). Three efficient algorithms: (1) KMP -- builds LPS (Longest Proper Prefix that is also Suffix) array for P in O(m). Searches in O(n). Never backtracks in T. (2) Z-Algorithm -- builds Z[i] = length of longest substring starting at i that is also a prefix. O(n+m). (3) Rabin-Karp -- rolling polynomial hash for O(1) window comparison. Average O(n+m), worst O(nm) on collisions.",
        intuition: "KMP insight: on mismatch at j in P, don't restart from 0. LPS[j-1] tells the longest proper prefix of P[0..j-1] that is also a suffix -- jump there instead. This is why KMP never moves i backward in T. Z-algorithm encodes the same information differently. Rabin-Karp trades exact comparison for hash comparison -- fast when hashes don't collide.",
        steps: [
          "KMP STEP 1 -- Build LPS: lps[0]=0. i=1, len=0. If p[i]==p[len]: lps[i++]=++len. Else if len>0: len=lps[len-1]. Else: lps[i++]=0.",
          "KMP STEP 2 -- Search: i scans T, j scans P. On match: i++,j++. If j==m: found at i-j, set j=lps[j-1]. On mismatch: if j>0 set j=lps[j-1] else i++.",
          "Z-ALGORITHM: maintain window [l,r]. For each i: Z[i]=min(r-i,Z[i-l]) if i<r, then extend. Update l,r.",
          "RABIN-KARP: hash(P) and hash of each T window. Slide: remove leftmost, add rightmost. On hash match, verify string.",
          "LPS ALSO USED FOR: finding shortest period of a string (period = n - lps[n-1])."
        ],
        dryRun: `-- KMP: find "aba" in "ababcababa" ------------------
Build LPS for "aba": [0, 0, 1]

Search T="ababcababa":
i=0,j=0: a==a -> i=1,j=1
i=1,j=1: b==b -> i=2,j=2
i=2,j=2: a==a -> j=3=m -> MATCH at idx 0 ✓, j=lps[2]=1
i=3,j=1: b==b -> i=4,j=2
i=4,j=2: c!=a -> j=lps[1]=0
i=4,j=0: c!=a -> i=5
i=5,j=0: a==a -> i=6,j=1
i=6,j=1: b==b -> i=7,j=2
i=7,j=2: a==a -> j=3=m -> MATCH at idx 5 ✓, j=lps[2]=1
i=8,j=1: b==b -> i=9,j=2
i=9,j=2: a==a -> j=3=m -> MATCH at idx 7 ✓

Matches at: [0, 5, 7] ✓`,
        time: { best: "O(n+m)", avg: "O(n+m)", worst: "O(n+m) KMP/Z" },
        space: "O(m) LPS array",
        stable: undefined,
        when: "KMP/Z for single-pattern O(n+m). Rabin-Karp for multiple patterns. n<=10^5: any works. n>=10^6: only linear algorithms.",
        pros: ["KMP/Z: guaranteed O(n+m) -- no bad inputs", "Never backtracks in T -- single left-to-right scan", "LPS array also useful for string period and border problems"],
        cons: ["LPS/Z construction adds code complexity", "Rabin-Karp worst case O(nm) on collisions", "Aho-Corasick needed for many patterns -- complex implementation"],
        cpp: `// KMP -- C++
vector<int> buildLPS(string& p) {
    int m = p.size();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (p[i] == p[len])
            lps[i++] = ++len;
        else if (len > 0)
            len = lps[len-1]; // don't increment i
        else
            lps[i++] = 0;
    }
    return lps;
}

vector<int> kmpSearch(string& T, string& P) {
    auto lps = buildLPS(P);
    vector<int> res;
    int n = T.size(), m = P.size(), i = 0, j = 0;
    while (i < n) {
        if (T[i] == P[j]) { i++; j++; }
        if (j == m) {
            res.push_back(i - j);
            j = lps[j-1];
        } else if (i < n && T[i] != P[j])
            j > 0 ? j = lps[j-1] : i++;
    }
    return res;
}`,
        python: `# KMP -- Python
def build_lps(p):
    m = len(p)
    lps = [0] * m
    length, i = 0, 1
    while i < m:
        if p[i] == p[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length-1]  # don't inc i
        else:
            lps[i] = 0
            i += 1
    return lps

def kmp_search(T, P):
    n, m = len(T), len(P)
    lps = build_lps(P)
    matches = []
    i = j = 0
    while i < n:
        if T[i] == P[j]: i += 1; j += 1
        if j == m:
            matches.append(i - j)
            j = lps[j-1]
        elif i < n and T[i] != P[j]:
            if j > 0: j = lps[j-1]
            else: i += 1
    return matches`,
        practice: [
          { name: "Find the Index of First Occurrence (strStr)", diff: "easy" },
          { name: "Repeated Substring Pattern", diff: "easy" },
          { name: "Shortest Palindrome", diff: "hard" }
        ]
      },
      "Trie & Patricia Tree": {
        diff: "hard",
        explanation: "A Trie (prefix tree) stores strings as root-to-leaf paths. Each node has up to |Sigma| children (stored as array of pointers). Strings must be null-terminated so no string is a prefix of another. Insert/Search/Delete: O(|s|*|Sigma|) for insert/delete, O(|s|) for search. Storage: O(N*|Sigma|) where N is total chars. A Patricia Tree (compressed trie) collapses single-child paths into one edge labelled by a string in pointer/length form. Every internal node has >=2 children -- at most n-1 internal nodes for n strings. Storage drops to O(n*|Sigma| + N). Patricia trees also support prefix match in O(|s|+k).",
        intuition: "A trie wastes a node per character even on long, unforked paths. Patricia compresses these into single edge labels stored as (pointer, length) -- O(1) per label since it points into the original string. Because every internal node has >=2 children, the number of internal nodes can't exceed the number of leaves. This gives Patricia trees a huge space advantage for sparse tries.",
        steps: [
          "TRIE INSERT: follow char pointers from root. On nil pointer, create new node. O(|s|*|Sigma|).",
          "TRIE SEARCH: follow char pointers. If nil -> not found. Reach leaf -> found. O(|s|).",
          "TRIE DELETE: find leaf. Delete nodes back toward root until node with >1 child. O(|s|*|Sigma|).",
          "PATRICIA INSERT: search until stuck. Split edge at mismatch or add leaf at node. O(|s|+|Sigma|).",
          "PATRICIA PREFIX MATCH: search for s (no null terminator). Every leaf in subtree at end has s as prefix. O(|s|+k).",
          "PATRICIA BOUND: <=n-1 internal nodes for n strings. Total storage O(n*|Sigma| + N)."
        ],
        dryRun: `Trie for: "ape", "apple", "organ", "organism"

Root
+-- 'a' -> p -> e -> '$' leaf("ape")
|              p -> l -> e -> '$' leaf("apple")
+-- 'o' -> r -> g -> a -> n -> '$' leaf("organ")
                              i -> s -> m -> '$' leaf("organism")
Trie nodes: ~13

Patricia Tree (compressed):
Root
+-- "ap"    -> e$   leaf("ape")
|           -> ple$ leaf("apple")
+-- "organ" -> $    leaf("organ")
            -> ism$ leaf("organism")
Patricia nodes: 2 internal + 4 leaves = 6 ✓
(vs 13 for trie)`,
        time: { best: "O(|s|) search", avg: "O(|s|) search", worst: "O(|s|*|Sigma|) insert" },
        space: "O(N*|Sigma|) trie / O(n*|Sigma|+N) patricia",
        stable: undefined,
        when: "Trie/Patricia: autocomplete, spell-check, IP routing, dictionary lookups, prefix queries. Use Patricia over Trie when memory matters and strings share long common prefixes.",
        pros: [
          "Search O(|s|) -- independent of number of strings stored",
          "Prefix queries are natural: just stop early during search",
          "Patricia: major space savings vs plain trie",
          "Patricia prefix match returns all k matching strings in O(|s|+k)"
        ],
        cons: [
          "Each node is array of |Sigma| pointers -- memory intensive for large alphabets",
          "Poor cache performance from sparse pointer arrays",
          "Patricia insert/delete more complex to implement correctly",
          "Not suitable for non-integer alphabets without hashing"
        ],
        cpp: `// Trie -- C++
struct TrieNode {
    TrieNode* ch[26] = {};
    bool end = false;
};

struct Trie {
    TrieNode* root = new TrieNode();

    void insert(string s) {
        auto* node = root;
        for (char c : s) {
            int i = c - 'a';
            if (!node->ch[i]) node->ch[i] = new TrieNode();
            node = node->ch[i];
        }
        node->end = true;
    }

    bool search(string s) {
        auto* node = root;
        for (char c : s) {
            int i = c - 'a';
            if (!node->ch[i]) return false;
            node = node->ch[i];
        }
        return node->end;
    }

    bool startsWith(string pre) {
        auto* node = root;
        for (char c : pre) {
            int i = c - 'a';
            if (!node->ch[i]) return false;
            node = node->ch[i];
        }
        return true;
    }
};`,
        python: `# Trie -- Python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, s: str):
        node = self.root
        for c in s:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, s: str) -> bool:
        node = self.root
        for c in s:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`,
        practice: [
          { name: "Implement Trie (Prefix Tree)", diff: "medium" },
          { name: "Word Search II", diff: "hard" },
          { name: "Design Add and Search Words Data Structure", diff: "medium" },
          { name: "Longest Word in Dictionary", diff: "medium" }
        ]
      },
      "Suffix Structures": {
        diff: "hard",
        explanation: "Suffix structures answer 'does P occur in text T?' in O(|P|) time regardless of |T|. (1) Suffix Array A[1..n]: A[i] is the starting index of the i-th lexicographically smallest suffix of T. Built in O(n) using the Skew Algorithm. Binary search finds P in O(|P| log n); with LCP array, O(|P| + log n). (2) LCP Array L[1..n-1]: L[i] = length of longest common prefix of the i-th and (i+1)-th sorted suffixes. Built in O(n) by Kasai's algorithm. (3) Suffix Tree: Patricia tree of all n suffixes. Edge labels are (pointer,length) into T -- O(n) label storage. Can be built in O(n*|Sigma|) from suffix array + LCP array.",
        intuition: "Sorting all suffixes (suffix array) turns substring search into binary search -- O(log n) steps instead of O(n). The LCP array caches prefix-match info so the binary search avoids re-comparing already-matched characters, dropping from O(|s| log n) to O(|s| + log n). The entire structure needs only 3n words of storage -- very compact.",
        steps: [
          "SUFFIX ARRAY: A[i] = start index of i-th smallest suffix. Size n, holds integers.",
          "BINARY SEARCH: O(|s| log n). Each of O(log n) comparisons does O(|s|) character work.",
          "LCP ARRAY: L[i] = lcp(s_i, s_{i+1}). Kasai's algorithm builds it in O(n) using inverse of A.",
          "WITH LCP: maintain (i,j,a,b) -- search bounds and prefix-match lengths. Skip already-matched chars. O(|s|+log n).",
          "SUFFIX TREE: Patricia tree of suffixes. All labels as (pointer,length) into T. O(n) total label storage. Find all k occurrences in O(|s|+k).",
          "TOTAL STORAGE: suffix array A (n words) + auxiliary L' (2n words) = 3n words for O(|s|+log n) search."
        ],
        dryRun: `t = "counterrevolutionary$" (n=21)

Suffix Array A = [18, 1, 6, 9, 15, 12, 17, 4, ...]

i   A[i]  Suffix starts at A[i]
1    18   "ary$"
2     1   "counterrevolutionary$"
3     6   "errevolutionary$"
4     9   "evolutionary$"
...

LCP Array L:
L[1] = lcp("ary$","counterrev...") = 0
L[2] = lcp("counterrev...","errev...") = 0
...

Search for "tion":
  Binary search: O(|"tion"| * log 21) = O(4*5) = O(20)
  With LCP array: O(|"tion"| + log 21) = O(4+5) = O(9) ✓

Kasai's LCP construction:
  Uses inverse array R (R[A[i]]=i, rank of suffix i)
  Processes suffixes in TEXT order (not sorted order)
  Key lemma: if lcp(s_Ri, s_{Ri-1}) = h,
  then lcp(s_{Ri+1}, s_{Ri+1-1}) >= h-1 ✓`,
        time: { best: "O(|s|)", avg: "O(|s|+log n)", worst: "O(|s| log n)" },
        space: "O(n*|Sigma|) suffix tree / O(n) suffix array",
        stable: undefined,
        when: "Competitive programming, DNA analysis, plagiarism detection, text indexing. Suffix array: when compact storage matters. Suffix tree: when O(|s|) pattern search or all k occurrences needed.",
        pros: [
          "Suffix tree: O(|s|) substring search independent of text length",
          "Suffix array: compact 3n-word structure with O(|s|+log n) search",
          "Handles all k occurrences in O(|s|+k)",
          "LCP construction O(n) -- Kasai's elegant algorithm"
        ],
        cons: [
          "Suffix tree: O(n*|Sigma|) storage -- |Sigma| factor expensive",
          "Skew/linear construction very complex to implement",
          "Rarely required in standard coding interviews",
          "LCP matrix is O(n^2) -- use sparse structure (only O(n) values needed)"
        ],
        cpp: `// Kasai LCP Array -- C++ O(n)
vector<int> buildLCP(string& s, vector<int>& sa) {
    int n = s.size();
    vector<int> rank_(n), lcp(n-1, 0);
    for (int i = 0; i < n; i++) rank_[sa[i]] = i;
    int h = 0;
    for (int i = 0; i < n; i++) {
        if (rank_[i] > 0) {
            int j = sa[rank_[i] - 1];
            while (i+h < n && j+h < n && s[i+h] == s[j+h])
                h++;
            lcp[rank_[i] - 1] = h;
            if (h > 0) h--;   // key lemma: h decrements at most n times total
        }
    }
    return lcp;
}

// Suffix Array (O(n log^2 n)) -- C++
vector<int> buildSA(string s) {
    int n = s.size();
    vector<int> sa(n), rank_(n), tmp(n);
    iota(sa.begin(), sa.end(), 0);
    for (int i = 0; i < n; i++) rank_[i] = s[i];
    for (int gap = 1; gap < n; gap <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rank_[a] != rank_[b]) return rank_[a] < rank_[b];
            int ra = a+gap<n ? rank_[a+gap] : -1;
            int rb = b+gap<n ? rank_[b+gap] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1],sa[i])?1:0);
        rank_ = tmp;
    }
    return sa;
}`,
        python: `# Suffix Array + Kasai LCP -- Python
def build_sa(s):
    # O(n log^2 n) -- simple version
    n = len(s)
    return sorted(range(n), key=lambda i: s[i:])

def build_lcp(s, sa):
    n = len(s)
    rank = [0] * n
    for i, x in enumerate(sa): rank[x] = i
    lcp = [0] * (n - 1)
    h = 0
    for i in range(n):
        if rank[i] > 0:
            j = sa[rank[i] - 1]
            while i+h < n and j+h < n and s[i+h] == s[j+h]:
                h += 1
            lcp[rank[i] - 1] = h
            if h > 0: h -= 1
    return lcp`,
        practice: [
          { name: "Longest Duplicate Substring", diff: "hard" },
          { name: "Number of Distinct Substrings", diff: "hard" },
          { name: "Implement Trie (Prefix Tree)", diff: "medium" }
        ]
      },
      "DP on Strings": {
        diff: "hard",
        explanation: "DP on strings solves: (1) Edit Distance -- min insert/delete/replace to convert s1 to s2. (2) LCS -- Longest Common Subsequence (not necessarily contiguous). (3) Longest Common Substring -- must be contiguous. (4) Longest Palindromic Subsequence. All are O(n*m) DP on a 2D table of prefix subproblems. The recurrences are clean and follow from whether the last characters match.",
        intuition: "All string DP defines dp[i][j] over prefixes. Edit distance: dp[i][j] = min cost to convert s1[0..i-1] to s2[0..j-1]. LCS: dp[i][j] = length of LCS of those prefixes. The recurrence either 'uses' both last characters (if they match) or 'skips' one. Space can often be reduced to O(min(n,m)) with a rolling array.",
        steps: [
          "EDIT DISTANCE: if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]. Else: dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
          "LCS: if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1. Else: dp[i][j]=max(dp[i-1][j], dp[i][j-1]).",
          "LONGEST COMMON SUBSTRING: same as LCS match case. But reset to 0 on mismatch (not max). Track global max.",
          "PALINDROMIC SUBSEQUENCE: dp[i][j] = dp[i+1][j-1]+2 if s[i]==s[j], else max(dp[i+1][j],dp[i][j-1]).",
          "BASE CASES: dp[0][j]=j (delete all), dp[i][0]=i (insert all).",
          "SPACE OPTIMISE: rolling two rows -- O(min(n,m)) space for edit distance and LCS."
        ],
        dryRun: `-- EDIT DISTANCE: "horse" -> "ros" ----------------
     ""  r  o  s
""  [ 0  1  2  3 ]
h   [ 1  1  2  3 ]
o   [ 2  2  1  2 ]
r   [ 3  2  2  2 ]
s   [ 4  3  3  2 ]
e   [ 5  4  4  3 ]
Answer: dp[5][3] = 3 ✓

-- LCS: "ABCBDAB" and "BDCABA" -------------------
(partial)
     ""  B  D  C  A  B  A
""  [ 0  0  0  0  0  0  0 ]
A   [ 0  0  0  0  1  1  1 ]
B   [ 0  1  1  1  1  2  2 ]
C   [ 0  1  1  2  2  2  2 ]
B   [ 0  1  1  2  2  3  3 ]
LCS length = 4 ✓`,
        time: { best: "O(n*m)", avg: "O(n*m)", worst: "O(n*m)" },
        space: "O(n*m) or O(min(n,m)) rolling",
        stable: undefined,
        when: "Edit distance: spell-check, DNA alignment, diff tools. LCS: version control, bioinformatics. n,m<=1000: O(n^2) DP fine. n,m>10^4: need optimisation (e.g. Hunt-Szymanski for sparse LCS).",
        pros: ["Elegant 2D DP formulation", "Space reducible to O(min(n,m))", "LCS/edit distance are foundations for many real systems"],
        cons: ["O(n*m) -- not suitable for large n,m without optimisation", "Backtracking requires full DP table -- can't always use rolling array"],
        cpp: `// DP on Strings -- C++

// 1. Edit Distance O(nm) time, O(m) space
int editDist(string s1, string s2) {
    int n = s1.size(), m = s2.size();
    vector<int> prev(m+1), cur(m+1);
    iota(prev.begin(), prev.end(), 0);
    for (int i = 1; i <= n; i++) {
        cur[0] = i;
        for (int j = 1; j <= m; j++) {
            if (s1[i-1] == s2[j-1]) cur[j] = prev[j-1];
            else cur[j] = 1 + min({prev[j], cur[j-1], prev[j-1]});
        }
        swap(prev, cur);
    }
    return prev[m];
}

// 2. LCS Length
int lcs(string& s1, string& s2) {
    int n = s1.size(), m = s2.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = s1[i-1]==s2[j-1]
                ? dp[i-1][j-1]+1
                : max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}`,
        python: `# DP on Strings -- Python

# 1. Edit Distance O(nm) time, O(m) space
def edit_distance(s1, s2):
    n, m = len(s1), len(s2)
    prev = list(range(m + 1))
    for i in range(1, n + 1):
        cur = [i] + [0] * m
        for j in range(1, m + 1):
            if s1[i-1] == s2[j-1]:
                cur[j] = prev[j-1]
            else:
                cur[j] = 1 + min(prev[j], cur[j-1], prev[j-1])
        prev = cur
    return prev[m]

# 2. LCS Length
def lcs(s1, s2):
    n, m = len(s1), len(s2)
    dp = [[0]*(m+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for j in range(1, m+1):
            dp[i][j] = dp[i-1][j-1]+1 if s1[i-1]==s2[j-1] \
                       else max(dp[i-1][j], dp[i][j-1])
    return dp[n][m]

# 3. Longest Palindromic Subsequence
def lps(s):
    return lcs(s, s[::-1])`,
        practice: [
          { name: "Edit Distance", diff: "hard" },
          { name: "Longest Common Subsequence", diff: "medium" },
          { name: "Longest Palindromic Subsequence", diff: "medium" },
          { name: "Minimum ASCII Delete Sum", diff: "medium" }
        ]
      },
      "Important Problems": {
        diff: "medium",
        explanation: "The highest-frequency string interview problems: (1) Longest Palindromic Substring -- expand around every centre O(n). (2) Minimum Window Substring -- variable sliding window with frequency tracking. (3) Group Anagrams -- sorted string as hash key. (4) Decode String -- stack-based expansion. (5) Reverse Words -- three-reversal trick. (6) Valid Palindrome II -- try deleting one character on mismatch. These 6 cover almost all patterns.",
        intuition: "Palindrome expansion: 2n-1 centres (each character + each gap). Expand while chars match. O(1) per expansion step, O(n) total centres = O(n) overall. Minimum Window uses a 'formed' counter to know when all required chars are present without scanning the frequency array every step.",
        steps: [
          "PALINDROME EXPAND: for i in 0..n-1: expand(i,i) odd, expand(i,i+1) even. While s[l]==s[r]: l--,r++. Track max. O(n).",
          "GROUP ANAGRAMS: sort each string -> use as map key. All anagrams map to same key. O(nm log m).",
          "MINIMUM WINDOW: need dict, window dict, formed counter. Expand r. When formed==required shrink l. Track min window. O(n+m).",
          "DECODE STRING: stack holds (currentString, repeatCount). On ']': pop, repeat, concatenate. O(n * maxRepeat).",
          "REVERSE WORDS: strip spaces, reverse whole string, reverse each word. O(n), O(1) extra.",
          "VALID PAL II: on mismatch try skip s[l] or skip s[r], check if rest is palindrome. O(n)."
        ],
        dryRun: `-- LONGEST PALINDROMIC SUBSTRING "babad" -----------
Centers (char):
  i=0 'b': b  len=1
  i=1 'a': bab (b==b) len=3 -> best="bab"
  i=2 'b': aba (a==a) len=3 -> best="bab" or "aba"
  i=3 'a': a  len=1
Centers (gap):
  0-1: b!=a -> len=0
  1-2: a!=b -> len=0
  2-3: b!=a -> len=0
Result: "bab" (or "aba") ✓

-- GROUP ANAGRAMS ["eat","tea","tan","ate","nat","bat"]
"eat"->"aet": group1  "tea"->"aet": group1
"tan"->"ant": group2  "ate"->"aet": group1
"nat"->"ant": group2  "bat"->"abt": group3
Output: [["eat","tea","ate"],["tan","nat"],["bat"]] ✓`,
        time: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(n)",
        stable: undefined,
        when: "These are the top 6 string interview questions. Practise until you can code each one in under 8 minutes without hints.",
        pros: ["All solvable in O(n) or O(n log n) -- no brute force", "Each demonstrates a distinct reusable pattern"],
        cons: ["Minimum window substring has subtle 'formed' counter logic", "Decode string edge cases: nested brackets, large repeat counts"],
        cpp: `// Key Problems -- C++

// 1. Longest Palindromic Substring O(n)
string longestPal(string s) {
    int n = s.size(), start = 0, maxLen = 1;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) l--, r++;
        if (r-l-1 > maxLen) { maxLen=r-l-1; start=l+1; }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);    // odd
        expand(i, i+1);  // even
    }
    return s.substr(start, maxLen);
}

// 2. Group Anagrams
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string,vector<string>> mp;
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& [k,v] : mp) res.push_back(v);
    return res;
}`,
        python: `# Key Problems -- Python

# 1. Longest Palindromic Substring O(n^2)
def longest_palindrome(s):
    n = len(s); res = ""
    def expand(l, r):
        while l >= 0 and r < n and s[l] == s[r]:
            l -= 1; r += 1
        return s[l+1:r]
    for i in range(n):
        for p in [expand(i,i), expand(i,i+1)]:
            if len(p) > len(res): res = p
    return res

# 2. Group Anagrams
from collections import defaultdict
def group_anagrams(strs):
    g = defaultdict(list)
    for s in strs: g[tuple(sorted(s))].append(s)
    return list(g.values())

# 3. Valid Palindrome II
def valid_pal_ii(s):
    def is_pal(l, r):
        while l < r:
            if s[l] != s[r]: return False
            l += 1; r -= 1
        return True
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]:
            return is_pal(l+1,r) or is_pal(l,r-1)
        l += 1; r -= 1
    return True`,
        practice: [
          { name: "Longest Palindromic Substring", diff: "medium" },
          { name: "Minimum Window Substring", diff: "hard" },
          { name: "Group Anagrams", diff: "medium" },
          { name: "Decode String", diff: "medium" },
          { name: "Reverse Words in a String", diff: "medium" },
          { name: "Valid Palindrome II", diff: "easy" }
        ]
      },
      "Advanced Structures": {
        diff: "hard",
        explanation: "Four advanced string data structures from Chapter 7 (Morin textbook). (1) Trie — rooted tree where each node has up to |Σ| children; strings stored as root-to-leaf paths. (2) Patricia Tree (Compressed Trie) — chains of single-child nodes are compressed into string-labelled edges; every internal node has ≥ 2 children. (3) Suffix Tree — all n suffixes of text t inserted into a Patricia tree; supports O(|s|) substring search. (4) Suffix Array — sorted array of suffix starting indices; with LCP array gives O(|s|+log n) search in only 3n words. (5) Rope — prefix-tree storing very long text; insert/delete in O(log n) — used in real text editors.",
        intuition: "A Trie shares prefixes between strings — 'apple' and 'apply' share 'appl'. Patricia trees compress wasteful single-child chains, cutting storage. The Suffix Tree effectively indexes every possible substring of t — any substring becomes a prefix of some suffix. The Suffix Array is the space-efficient alternative to Suffix Trees. Ropes solve the text editor problem: inserting in the middle of a 1GB string is O(log n) via treap-based Split+Join instead of O(n) shifting.",
        steps: [
          "TRIE INSERT/SEARCH: follow characters down tree, create nodes on nil. Insert O(|s|·|Σ|), Search O(|s|).",
          "PATRICIA: compress single-child paths into string-edge. Reduces trie nodes from O(N) to O(n). Prefix match supported.",
          "SUFFIX TREE: insert all n suffixes of t into Patricia tree. Substring search = prefix search. Build in O(n) time.",
          "SUFFIX ARRAY A[i]: A[i] = start index of ith lex-smallest suffix. Build using skew (DC3) algorithm in O(n). Binary search for pattern in O(|s|+log n) with LCP array.",
          "LCP ARRAY L[i]: length of longest common prefix between suffixes A[i] and A[i+1]. Built from suffix array in O(n) using Kasai's algorithm.",
          "ROPE: treap-based prefix tree storing chunks. Split at position k in O(log n), Join two ropes in O(log n). Insert/Delete/Report all O(log n)."
        ],
        dryRun: `── TRIE for "ape","apple","organ","organism" ───────────
root → a → p → e → $ (ape)
               ↓
               p → l → e → $ (apple)
     → o → r → g → a → n → $ (organ)
                           ↓
                           i → s → m → $ (organism)

── SUFFIX ARRAY for "banana$" (n=7) ──────────────────
Suffixes sorted lexicographically:
  A[1]=6  "a$"
  A[2]=4  "ana$"
  A[3]=2  "anana$"
  A[4]=1  "banana$"
  A[5]=5  "na$"
  A[6]=3  "nana$"
  A[7]=7  "$"

LCP array L: [1, 3, 0, 0, 2, 0]
  L[1]=1: "a$" vs "ana$" → lcp=1 ("a")
  L[2]=3: "ana$" vs "anana$" → lcp=3 ("ana") ✓

Search "ana": binary search on A → found at A[2],A[3] ✓`,
        time: { best: "O(|s|) search", avg: "O(|s|+log n) suffix array", worst: "O(|s|·|Σ|) trie insert" },
        space: "O(N·|Σ|) trie, O(n) suffix array",
        stable: undefined,
        when: "Autocomplete / spell-check → Trie or Patricia. Substring search in large text → Suffix Array + LCP. Text editor (large document) → Rope. Multiple pattern search → Aho-Corasick. Prefix queries → Patricia Tree.",
        pros: [
          "Trie: O(|s|) search independent of n (number of stored strings)",
          "Suffix Array: 3n space — far more cache-friendly than Suffix Tree",
          "Patricia: O(n·|Σ|+N) storage — compressed",
          "Rope: O(log n) insert/delete on arbitrarily large strings"
        ],
        cons: [
          "Trie: O(N·|Σ|) space — huge for large alphabets like Unicode",
          "Suffix Tree: O(n·|Σ|) storage, complex to implement",
          "Skew algorithm for suffix array is non-trivial",
          "Rope: higher constant factors for small strings"
        ],
        cpp: `// Trie — C++ (standard interview implementation)
struct TrieNode {
    TrieNode* ch[26];
    bool isEnd = false;
    TrieNode() { fill(begin(ch), end(ch), nullptr); }
};

class Trie {
    TrieNode* root = new TrieNode();
public:
    // Insert — O(|s|·|Σ|) worst, O(|s|) typical
    void insert(string s) {
        auto cur = root;
        for (char c : s) {
            int i = c - 'a';
            if (!cur->ch[i]) cur->ch[i] = new TrieNode();
            cur = cur->ch[i];
        }
        cur->isEnd = true;
    }
    // Search — O(|s|)
    bool search(string s) {
        auto cur = root;
        for (char c : s) {
            int i = c - 'a';
            if (!cur->ch[i]) return false;
            cur = cur->ch[i];
        }
        return cur->isEnd;
    }
    // Prefix check — O(|prefix|)
    bool startsWith(string p) {
        auto cur = root;
        for (char c : p) {
            if (!cur->ch[c-'a']) return false;
            cur = cur->ch[c-'a'];
        }
        return true;
    }
};`,
        python: `# Trie — Python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    # Insert — O(|s|)
    def insert(self, s: str):
        cur = self.root
        for c in s:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.is_end = True

    # Search — O(|s|)
    def search(self, s: str) -> bool:
        cur = self.root
        for c in s:
            if c not in cur.children: return False
            cur = cur.children[c]
        return cur.is_end

    # All words with given prefix
    def autocomplete(self, prefix: str):
        cur = self.root
        for c in prefix:
            if c not in cur.children: return []
            cur = cur.children[c]
        results = []
        self._dfs(cur, prefix, results)
        return results

    def _dfs(self, node, path, res):
        if node.is_end: res.append(path)
        for c, child in node.children.items():
            self._dfs(child, path+c, res)`,
        practice: [
          { name: "Implement Trie (Prefix Tree)", diff: "medium" },
          { name: "Word Search II (Trie + Backtracking)", diff: "hard" },
          { name: "Design Add and Search Words", diff: "medium" },
          { name: "Longest Word in Dictionary", diff: "medium" },
          { name: "Maximum XOR of Two Numbers (Trie)", diff: "medium" }
        ]
      },
      "Constraints & Strategy": {
        diff: "medium",
        explanation: "Before writing a single line of code for any string problem, check the constraint on n and pick the right complexity class. This framework — from your notes and standard competitive programming practice — maps input sizes to algorithm families. String problems also have a standard set of edge cases that break naive solutions: always test these mentally before submitting.",
        intuition: "A modern CPU does ~10⁸ simple operations per second. n=10⁵ with O(n²) = 10¹⁰ operations → 100 seconds → TLE. n=10⁵ with O(n) = 10⁵ operations → 0.001 seconds → AC. Recognise the pattern, not just the algorithm. Two Pointers → palindrome. Sliding Window → substring. Hashing → matching. DP → subsequences. Trie → prefix problems. KMP/Z → pattern search.",
        steps: [
          "n ≤ 100: Brute force OK. O(n²) or O(n³) string DP works. LCS, Edit Distance all fine.",
          "n ≤ 10⁴: O(n²) OK. All DP on strings, sliding window, frequency count.",
          "n ≤ 10⁵: Need O(n log n) or O(n). Sliding window, KMP, Z-algo, hashing, Trie.",
          "n ≥ 10⁶: Only O(n). KMP, Z-algo, Suffix Array (skew). No DP tables.",
          "Edge cases: empty string → return early. Single char → base case. All same chars (\"aaaa\") → stress test sliding window. Case sensitivity → clarify before coding. Spaces and special chars → filter or handle. Large n → confirm algorithm complexity."
        ],
        dryRun: `Constraint → Complexity → Technique Mapping:

n ≤ 100    │ O(n²/n³)   │ Brute force, DP (LCS/Edit Dist)
n ≤ 10⁴   │ O(n²)      │ DP tables, expand-around-center palindrome
n ≤ 10⁵   │ O(n log n) │ Sorting + two pointers, KMP
           │ O(n)       │ Sliding window, Z-algo, hashing
n ≥ 10⁶   │ O(n)       │ KMP, Z-algo, suffix array only

Pattern → Algorithm Quick Map:
  Palindrome       → Two Pointers / Expand Center / Manacher's
  Anagram/Perm     → Sliding Window + freq[26]
  Pattern search   → KMP or Z-Algorithm  
  Subsequences     → DP (LCS, Edit Distance)
  Prefix queries   → Trie
  All substrings   → Suffix Array + LCP
  Multi-pattern    → Aho-Corasick

Edge Cases to ALWAYS check:
  s = ""          → empty → return "" or 0
  s = "a"         → single char
  s = "aaaa"      → all same
  s = "Aa"        → case sensitivity
  s with spaces   → split behaviour`,
        time: { best: "O(n)", avg: "O(n) to O(nm)", worst: "O(nm) DP" },
        space: "O(1) to O(nm)",
        stable: undefined,
        when: "Always — look at constraint first. This framework should be your first 30 seconds on any string problem.",
        pros: [
          "Prevents TLE from choosing O(n²) when O(n) is needed",
          "Pattern recognition is the key interview skill",
          "Edge case checklist catches most wrong answers"
        ],
        cons: [
          "Some problems have deceptive constraints — verify with example",
          "Constant factors matter: O(n) with large constant can TLE"
        ],
        cpp: `// Constraint-Based Template — C++
string solve(string s, string p = "") {
    int n = s.size(), m = p.size();

    // Always handle edge cases first
    if (s.empty()) return "";
    if (n == 1) return s;  // single char

    // n <= 1e2: DP OK
    if (n <= 100) {
        // e.g. edit distance, LCS
        vector<vector<int>> dp(n+1, vector<int>(m+1,0));
        // ...
    }

    // n <= 1e5: sliding window / KMP
    if (n <= 100000) {
        // Sliding window template
        unordered_map<char,int> window;
        int left = 0;
        for (int right = 0; right < n; right++) {
            window[s[right]]++;
            while (/* constraint violated */) {
                window[s[left]]--;
                left++;
            }
            // update answer
        }
    }

    // n >= 1e6: only KMP or Z-algo
    // See Pattern Matching Algorithms subtopic
    return "";
}`,
        python: `# Constraint-Based Template — Python

def solve(s: str, p: str = "") -> str:
    n, m = len(s), len(p)

    # Always handle edge cases first
    if not s: return ""
    if n == 1: return s

    # n <= 100: DP OK
    # e.g. edit_distance(s, p) — O(nm) fine

    # n <= 10^5: sliding window or KMP
    if n <= 10**5:
        from collections import defaultdict
        window = defaultdict(int)
        left = 0
        for right in range(n):
            window[s[right]] += 1
            while True:  # shrink when constraint violated
                window[s[left]] -= 1
                if window[s[left]] == 0:
                    del window[s[left]]
                left += 1
            # update answer here

    # n >= 10^6: KMP only
    # from kmp_search(s, p)

    return ""

# Pattern → technique quick lookup:
PATTERNS = {
    "palindrome":     "two_pointers or expand_center",
    "anagram":        "sliding_window + freq26",
    "pattern search": "KMP or Z_algorithm",
    "subsequence":    "DP_LCS or DP_edit_distance",
    "prefix query":   "Trie",
}`,
        practice: [
          { name: "Valid Palindrome", diff: "easy" },
          { name: "Minimum Window Substring", diff: "hard" },
          { name: "Word Break", diff: "medium" },
          { name: "Longest Repeating Character Replacement", diff: "medium" },
          { name: "Implement strStr() / Find the Index of First Occurrence", diff: "easy" }
        ]
      }
    }
  },
  "Linked List": { icon: "🔗", diff: "easy", desc: "Dynamic node-based structure. Reversal, cycle detection, merge — interview staples.", subtopics: {} },
  Stack: { icon: "📚", diff: "easy", desc: "LIFO. Powers recursion, expression parsing, monotonic stack problems.", subtopics: {} },
  Queue: { icon: "🎫", diff: "easy", desc: "FIFO. BFS, task scheduling, sliding window maximum.", subtopics: {} },
  Recursion: { icon: "🔄", diff: "medium", desc: "Self-reference. The mental model behind trees, graphs, and DP.", subtopics: {} },
  Searching: { icon: "🔍", diff: "easy", desc: "Linear O(n) to Binary O(log n). Master binary search and its variants.", subtopics: {} },
  Hashing: { icon: "#️⃣", diff: "medium", desc: "O(1) average lookups. HashMap, HashSet, collision handling, frequency counting.", subtopics: {} },
  Trees: { icon: "🌳", diff: "medium", desc: "Hierarchical data. DFS, BFS traversals, diameter, LCA — core interview topics.", subtopics: {} },
  "Binary Search Trees": { icon: "🌲", diff: "medium", desc: "Ordered trees enabling O(log n) search, insert, delete. Inorder gives sorted output.", subtopics: {} },
  Heaps: { icon: "🏔️", diff: "medium", desc: "Priority queues, top-K problems, scheduling. Max-heap and min-heap.", subtopics: {} },
  Graphs: { icon: "🕸️", diff: "hard", desc: "BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort, Union-Find.", subtopics: {} },
  "Dynamic Programming": { icon: "💡", diff: "hard", desc: "Overlapping subproblems + optimal substructure. The crown jewel of FAANG interviews.", subtopics: {} },
  "Greedy Algorithms": { icon: "🏆", diff: "medium", desc: "Locally optimal choices lead to global optimum. Interval scheduling, Huffman coding.", subtopics: {} },
  Backtracking: { icon: "↩️", diff: "hard", desc: "Systematic trial-and-error with pruning. N-Queens, Sudoku, permutations.", subtopics: {} },
  Tries: { icon: "📖", diff: "hard", desc: "Prefix trees for autocomplete, spell-check, and word search problems.", subtopics: {} }
};

// ─── SYNTAX HIGHLIGHTER ───────────────────────────────────────────
function highlight(code, lang) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let h = esc(code);
  if (lang === "cpp") {
    h = h.replace(/(\/\/.*)/g, '<span class="cm">$1</span>');
    h = h.replace(/\b(void|int|bool|auto|return|if|else|while|for|vector|swap|break|true|false|size_t)\b/g, '<span class="kw">$1</span>');
    h = h.replace(/\b([A-Za-z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');
    h = h.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  } else {
    h = h.replace(/(#.*)/g, '<span class="cm">$1</span>');
    h = h.replace(/\b(def|return|if|else|elif|while|for|import|in|range|len|not|and|or|True|False|None)\b/g, '<span class="kw">$1</span>');
    h = h.replace(/\b([a-z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');
    h = h.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  }
  return h;
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────
function Tag({ diff }) {
  const cls = diff === "easy" ? "tag te" : diff === "medium" ? "tag tm" : "tag th";
  return <span className={cls}>{diff}</span>;
}

function CodeBlock({ cpp, python }) {
  const [lang, setLang] = useState("cpp");
  return (
    <div>
      <div className="code-tabs">
        <button className={`ctab${lang === "cpp" ? " active" : ""}`} onClick={() => setLang("cpp")}>C++</button>
        <button className={`ctab${lang === "python" ? " active" : ""}`} onClick={() => setLang("python")}>Python</button>
      </div>
      <div className="cblock">
        <pre dangerouslySetInnerHTML={{ __html: highlight(lang === "cpp" ? cpp : python, lang) }} />
      </div>
    </div>
  );
}

// ─── MEMORY VISUALIZER ──────────────────────────────────────────
function MemViz({ arr, base = 1000, size = 4 }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div className="mem-viz">
        {arr.map((v, i) => (
          <div className="mem-cell" key={i}>
            <div className="mc-val" style={{ borderRight: i === arr.length - 1 ? "1px solid var(--accent)" : "none" }}>{v}</div>
            <div className="mc-idx">[{i}]</div>
            <div className="mc-addr">{base + i * size}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: ".68rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 2 }}>
        index ↑ &nbsp;&nbsp; address ↑ &nbsp;(base={base}, size={size}B)
      </div>
    </div>
  );
}

// ─── SUBTOPIC VIEW ───────────────────────────────────────────────
function SubtopicView({ data, name }) {
  if (!data || Object.keys(data).length === 0)
    return (
      <div className="empty">
        <div className="eicon">🚧</div>
        <div className="etitle">Coming Soon</div>
        <div className="esub">This subtopic is being prepared. Check back soon!</div>
      </div>
    );

  const dryRunHtml = data.dryRun
    .replace(/✓/g, '<span class="hl">✓</span>')
    .replace(/→/g, '<span style="color:var(--accent2)">→</span>')
    .replace(/⚠/g, '<span style="color:var(--yellow)">⚠</span>');

  // Arrays-specific extras
  const isArrayIntro = name === "Introduction & Memory";
  const isPatterns = name === "Key Patterns";
  const isComplexity = name === "Complexity & Edge Cases";

  // Strings-specific extras
  const isStringBasics = name === "Basics & Representations";
  const isCoreTech = name === "Core Techniques";
  const isPatternMatching = name === "Pattern Matching Algorithms";
  const isStrAdvanced = name === "Advanced Structures";
  const isConstraints = name === "Constraints & Strategy";
  return (
    <div key={name} style={{ animation: "fadeIn .28s ease" }}>
      <div className="ctitle">{name}</div>
      <div className="drow">
        <Tag diff={data.diff} />
        {data.stable !== undefined && (
          <span style={{ fontSize: ".72rem", color: "var(--text3)", background: "var(--bg3)", padding: "2px 10px", borderRadius: 20 }}>
            {data.stable ? "✓ Stable" : "✗ Unstable"}
          </span>
        )}
        <span className="lang-badge lb-cpp">C++</span>
        <span className="lang-badge lb-py">Python</span>
      </div>

      {/* Arrays: memory diagram */}
      {isArrayIntro && (
        <div className="sec">
          <div className="stitle">Memory Layout</div>
          <div className="prose" style={{ marginBottom: 8 }}>How <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4, fontFamily: "'Space Mono',monospace", fontSize: ".82rem" }}>arr = [10, 20, 30, 40]</code> looks in memory:</div>
          <MemViz arr={[10, 20, 30, 40]} />
          <div className="callout callout-tip" style={{ marginTop: 12 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Why O(1) access?</strong> The CPU doesn't iterate — it computes the address directly: <code style={{ fontFamily: "'Space Mono',monospace" }}>1000 + (2 × 4) = 1008</code>. No loops, no traversal.</div>
          </div>
        </div>
      )}

      {/* Key Patterns: pill overview */}
      {isPatterns && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Prefix Sum","Sliding Window","Two Pointers","Kadane's Algorithm","Dutch National Flag","Binary Search"].map(p => (
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 12 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Interview tip:</strong> ~80% of array problems use one of these 6 patterns. Identifying the pattern in the first 2 minutes is the key skill.</div>
          </div>
        </div>
      )}

      {/* Complexity: quick-ref table */}
      {isComplexity && (
        <div className="sec">
          <div className="stitle">Quick Reference Table</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Access arr[i]","O(1)","O(1)","O(1)","O(1)","g","g","g","g"],
                ["Search (linear)","O(1)","O(n)","O(n)","O(1)","g","y","y","g"],
                ["Insert (middle)","O(n)","O(n)","O(n)","O(1)","y","y","y","g"],
                ["Delete (middle)","O(n)","O(n)","O(n)","O(1)","y","y","y","g"],
                ["Append (dynamic)","O(1)","O(1)*","O(n)","O(1)","g","g","y","g"],
                ["Binary Search","O(1)","O(log n)","O(log n)","O(1)","g","g","g","g"],
              ].map(([op,b,avg,w,sp,cb,ca,cw,cs]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={`cx-${cb}`}>{b}</td>
                  <td className={`cx-${ca}`}>{avg}</td>
                  <td className={`cx-${cw}`}>{w}</td>
                  <td className={`cx-${cs}`}>{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{fontSize:".68rem",color:"var(--text3)",marginTop:6,fontFamily:"'Space Mono',monospace"}}>* amortised — occasional O(n) resize</div>
        </div>
      )}


      {/* Strings: representation comparison */}
      {isStringBasics && (
        <div className="sec">
          <div className="stitle">Representation Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Null-Terminated</th><th>Pointer / Length</th></tr></thead>
            <tbody>
              {[
                ["Get length","O(n) scan to $","O(1) already stored"],
                ["Get char at i","O(1)","O(1)"],
                ["Extract substring","O(k) copy","O(1) new (p+i, m) pair"],
                ["Used in","C, C++ char*","Tries, Patricia, Suffix Trees"],
              ].map(([op,nt,pl],idx) => (
                <tr key={idx}>
                  <td className="op">{op}</td>
                  <td style={{color:"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".76rem"}}>{nt}</td>
                  <td style={{color:"var(--green)",fontFamily:"Space Mono,monospace",fontSize:".76rem"}}>{pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:12}}>
            <span className="callout-icon">&#128161;</span>
            <div className="callout-text"><strong>Key insight:</strong> Pointer/length substring is pure arithmetic -- no copying. Patricia Trees and Suffix Trees store all substrings in O(n) total space using this trick.</div>
          </div>
        </div>
      )}

      {/* Strings: pattern quick map */}
      {isCoreTech && (
        <div className="sec">
          <div className="stitle">Pattern Quick Map</div>
          <table className="fn-table">
            <thead><tr><th>Problem Type</th><th>Pattern</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Palindrome check","Two Pointers","O(n)","g"],
                ["Anagram / frequency","Freq Count[26]","O(n)","g"],
                ["Longest no-repeat substr","Sliding Window + Map","O(n)","g"],
                ["Pattern in text","KMP / Z-algo","O(n+m)","g"],
                ["Multiple patterns","Rabin-Karp","O(n+m) avg","g"],
                ["Prefix / autocomplete","Trie","O(|s|)","g"],
                ["Subsequences / edit ops","DP 2D table","O(n*m)","y"],
              ].map(([prob,pat,t,c],idx) => (
                <tr key={idx}>
                  <td style={{color:"var(--text)"}}>{prob}</td>
                  <td className="op">{pat}</td>
                  <td className={`cx-${c}`}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Strings: algorithm comparison */}
      {isPatternMatching && (
        <div className="sec">
          <div className="stitle">Algorithm Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Algorithm</th><th>Preprocess</th><th>Search</th><th>Worst</th><th>Best for</th></tr></thead>
            <tbody>
              {[
                ["Naive","O(1)","O(n)","O(nm)","r","tiny n,m"],
                ["KMP","O(m)","O(n)","O(n+m)","g","single pattern"],
                ["Z-Algorithm","O(n+m)","O(n+m)","O(n+m)","g","single pattern"],
                ["Rabin-Karp","O(m)","O(n)","O(nm) collision","y","multiple patterns"],
                ["Aho-Corasick","O(sum|p|)","O(n+k)","O(n+k)","g","many patterns"],
              ].map(([algo,pre,srch,worst,c,use],idx) => (
                <tr key={idx}>
                  <td className="op">{algo}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{pre}</td>
                  <td style={{color:"var(--green)",fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{srch}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{worst}</td>
                  <td style={{color:"var(--text3)",fontSize:".74rem"}}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Strings: advanced structures theorem boxes */}
      {isStrAdvanced && (
        <div className="sec">
          <div className="stitle">Formal Complexities (Chapter 7 — Morin)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Trie (Theorem 19)","Insert/Delete: O(|s|·|Σ|) | Search: O(|s|) | Space: O(N·|Σ|)"],
              ["Patricia Tree (Theorem 20)","Insert/Delete: O(|s|+|Σ|) | Search: O(|s|) | Space: O(n·|Σ|+N)"],
              ["Suffix Tree (Theorem 22)","Build: O(n·|Σ|+n²) naïve, O(n) optimal | Substring check: O(|s|) | All k occurrences: O(|s|+k)"],
              ["Suffix Array (Theorem 23)","Build: O(n) skew algorithm | Search: O(|s|+log n) with LCP | Space: 3n words"],
              ["Rope (Theorem 18)","Insert/Delete: O(log n) | Report l chars: O(l+log n)"],
            ].map(([nm, info]) => (
              <div className="theorem-box" key={nm} style={{ padding: "10px 16px" }}>
                <div className="theorem-label">{nm}</div>
                <div className="theorem-text" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".76rem" }}>{info}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strings: constraint-based strategy */}
      {isConstraints && (
        <div className="sec">
          <div className="stitle">Constraint → Algorithm Map</div>
          <div className="constraint-row">
            {[
              ["n ≤ 100","Brute force OK. O(n²/n³) DP: LCS, Edit Distance, palindromic subsequence."],
              ["n ≤ 10⁵","O(n log n) or O(n). Sliding window, KMP, Z-algo, Trie, rolling hash."],
              ["n ≥ 10⁶","Only O(n). KMP, Z-algo, Suffix Array. No DP tables — too slow."],
            ].map(([n, algo]) => (
              <div className="cr-card" key={n}>
                <div className="cr-n">{n}</div>
                <div className="cr-algo">{algo}</div>
              </div>
            ))}
          </div>
          <div className="stitle" style={{ marginTop: 20 }}>Pattern → Technique Map</div>
          <table className="fn-table" style={{ marginTop: 8 }}>
            <thead><tr><th>Problem Type</th><th>Technique</th><th>Complexity</th></tr></thead>
            <tbody>
              {[
                ["Palindrome check/longest","Two Pointers / Expand Center","O(n)"],
                ["Anagram / permutation","Sliding Window + freq[26]","O(n)"],
                ["Pattern in text","KMP or Z-Algorithm","O(n+m)"],
                ["Multiple patterns in text","Aho-Corasick","O(n+Σ|p|)"],
                ["Subsequences / edit ops","DP (LCS, Edit Distance)","O(nm)"],
                ["Prefix queries / autocomplete","Trie","O(|s|)"],
                ["All substring occurrences","Suffix Array + LCP","O(n)"],
              ].map(([prob,tech,cx]) => (
                <tr key={prob}>
                  <td style={{color:"var(--text2)",fontSize:".78rem"}}>{prob}</td>
                  <td className="op" style={{fontSize:".76rem"}}>{tech}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"'Space Mono',monospace",fontSize:".74rem"}}>{cx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <div className="sec">
        <div className="stitle">Concept Explanation</div>
        <div className="prose">{data.explanation}</div>
      </div>

      <div className="sec">
        <div className="stitle">Intuition — Why Does It Work?</div>
        <div className="intuition-box">{data.intuition}</div>
      </div>

      <div className="sec">
        <div className="stitle">Step-by-Step Breakdown</div>
        <div className="steps">
          {data.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="snum">{i + 1}</div>
              <div className="stext">{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="stitle">Dry Run Example</div>
        <div className="dry-run" dangerouslySetInnerHTML={{ __html: dryRunHtml }} />
      </div>

      <div className="sec">
        <div className="stitle">Time & Space Complexity</div>
        <div className="cxgrid">
          <div className="cxcard"><div className="cxl">Best Case</div><div className="cxv" style={{ color: "var(--green)" }}>{data.time.best}</div></div>
          <div className="cxcard"><div className="cxl">Average Case</div><div className="cxv">{data.time.avg}</div></div>
          <div className="cxcard"><div className="cxl">Worst Case</div><div className="cxv" style={{ color: "var(--red)" }}>{data.time.worst}</div></div>
          <div className="cxcard"><div className="cxl">Space</div><div className="cxv" style={{ color: "var(--accent3)" }}>{data.space}</div></div>
        </div>
      </div>

      <div className="sec">
        <div className="stitle">Code Implementation</div>
        <CodeBlock cpp={data.cpp} python={data.python} />
      </div>

      <div className="sec">
        <div className="stitle">When to Use</div>
        <div className="when-box">{data.when}</div>
      </div>

      <div className="sec">
        <div className="stitle">Pros & Cons</div>
        <div className="pcgrid">
          <div className="pcbox">
            <div className="pct" style={{ color: "var(--green)" }}>✓ Pros</div>
            <ul className="pcl">{data.pros.map((p, i) => <li key={i}><span style={{ color: "var(--green)", flexShrink: 0 }}>+</span>{p}</li>)}</ul>
          </div>
          <div className="pcbox">
            <div className="pct" style={{ color: "var(--red)" }}>✗ Cons</div>
            <ul className="pcl">{data.cons.map((c, i) => <li key={i}><span style={{ color: "var(--red)", flexShrink: 0 }}>−</span>{c}</li>)}</ul>
          </div>
        </div>
      </div>

      {data.practice?.length > 0 && (
        <div className="sec">
          <div className="stitle">Practice Questions</div>
          <div className="pqlist">
            {data.practice.map((q, i) => (
              <div className="pq" key={i}>
                <div className="pqn">{q.name}</div>
                <Tag diff={q.diff} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Arrays: language functions quick ref */}
      {(name === "Core Operations" || name === "Types of Arrays") && (
        <div className="sec">
          <div className="stitle">Language Functions Cheatsheet</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th><span className="lang-badge lb-cpp">C++</span></th><th><span className="lang-badge lb-py">Python</span></th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Append","v.push_back(x)","a.append(x)","O(1)*"],
                ["Remove last","v.pop_back()","a.pop()","O(1)"],
                ["Insert at i","v.insert(it,x)","a.insert(i,x)","O(n)"],
                ["Delete at i","v.erase(it)","a.pop(i) / del a[i]","O(n)"],
                ["Length","v.size()","len(a)","O(1)"],
                ["Sort","sort(v.begin(),v.end())","a.sort()","O(n log n)"],
                ["Reverse","reverse(v.begin(),v.end())","a.reverse()","O(n)"],
                ["Find","find(v.begin(),v.end(),x)","a.index(x) / x in a","O(n)"],
              ].map(([op,cpp,py,t]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{color:"var(--accent2)",fontFamily:"'Space Mono',monospace",fontSize:".72rem"}}>{cpp}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"'Space Mono',monospace",fontSize:".72rem"}}>{py}</td>
                  <td style={{color:"var(--text3)"}}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── TOPIC PAGE ──────────────────────────────────────────────────
function TopicPage({ topic, goHome }) {
  const data = DSA_DATA[topic];
  const subtopics = Object.keys(data.subtopics || {});
  const [active, setActive] = useState(subtopics[0] || null);

  function tagCls(d) {
    return d === "easy" ? { bg: "rgba(6,255,165,.12)", color: "var(--green)" }
      : d === "medium" ? { bg: "rgba(255,209,102,.12)", color: "var(--yellow)" }
        : { bg: "rgba(255,92,92,.12)", color: "var(--red)" };
  }

  return (
    <div className="tpage">
      <div className="sidebar">
        <div className="sbt">{topic}</div>
        {subtopics.length === 0
          ? <div style={{ padding: "18px", color: "var(--text3)", fontSize: ".82rem" }}>Content coming soon…</div>
          : subtopics.map(s => {
            const tc = tagCls(data.subtopics[s].diff);
            return (
              <div key={s} className={`sbi${active === s ? " active" : ""}`} onClick={() => setActive(s)}>
                <span>{s}</span>
                <span style={{ fontSize: ".65rem", padding: "2px 8px", borderRadius: 12, fontWeight: 700, background: tc.bg, color: tc.color }}>
                  {data.subtopics[s].diff}
                </span>
              </div>
            );
          })}
      </div>
      <div className="tcontent">
        <div className="bc">
          <span onClick={goHome}>Home</span>
          <span className="bcsep">›</span>
          <span onClick={goHome} style={{ color: "var(--text2)" }}>{topic}</span>
          {active && <><span className="bcsep">›</span><span style={{ color: "var(--accent)" }}>{active}</span></>}
        </div>
        {active
          ? <SubtopicView data={data.subtopics[active]} name={active} />
          : <div className="empty">
            <div className="eicon">{data.icon}</div>
            <div className="etitle">{topic}</div>
            <div className="esub">{data.desc}</div>
          </div>}
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchIndex = useMemo(() => {
    const idx = [];
    Object.entries(DSA_DATA).forEach(([topic, td]) => {
      idx.push({ label: topic, sub: "Topic", topic });
      Object.keys(td.subtopics || {}).forEach(s => idx.push({ label: s, sub: topic, topic }));
    });
    return idx;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  function goTo(topic) { setPage(topic); setQuery(""); setShowResults(false); }

  return (
    <div className={dark ? "" : "light"} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "all .25s" }}>
      <style>{css + `@keyframes fadeIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo" onClick={() => setPage("home")}>DSA<span>forge</span></div>
        <div className="sw">
          <span className="s-icon">⌕</span>
          <input className="si" placeholder="Search topics or algorithms…" value={query}
            onChange={e => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 180)}
          />
          {showResults && results.length > 0 && (
            <div className="sr">
              {results.map((r, i) => (
                <div key={i} className="sri" onMouseDown={() => goTo(r.topic)}>
                  <div className="sri-t">{r.label}</div>
                  <div className="sri-s">{r.sub}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="tbtn" onClick={() => setDark(!dark)}>{dark ? "☀ Light" : "☾ Dark"}</button>
      </nav>

      {/* PAGES */}
      {page === "home" ? (
        <main className="home">
          <div className="hero">
            <div className="htag">⚡ BITS Pilani CS · Interview Ready</div>
            <h1>Master DSA,<br />Ace Every Interview.</h1>
            <p>Structured, visual, and code-first. Every major algorithm with explanations, dry runs, complexity tables, and C++ / Python code.</p>
            <div className="stats">
              <div><div className="sn">18</div><div className="sl">Topics</div></div>
              <div><div className="sn">50+</div><div className="sl">Algorithms</div></div>
              <div><div className="sn">C++</div><div className="sl">& Python</div></div>
            </div>
          </div>
          <div className="slabel">// explore all topics</div>
          <div className="tgrid">
            {Object.entries(DSA_DATA).map(([name, d]) => (
              <div key={name} className="tc" onClick={() => setPage(name)}>
                <div className="tci">{d.icon}</div>
                <div className="tcn">{name}</div>
                <div className="tcc">{Object.keys(d.subtopics || {}).length} subtopics</div>
                <Tag diff={d.diff} />
              </div>
            ))}
          </div>
        </main>
      ) : (
        <TopicPage topic={page} goHome={() => setPage("home")} />
      )}
    </div>
  );
}
