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
/* ── LINKED LIST VIZ ── */
.ll-viz{display:flex;align-items:flex-end;flex-wrap:nowrap;overflow-x:auto;gap:0;margin:12px 0 4px}
.ll-node{display:flex;align-items:flex-end;flex-shrink:0}
.ll-wrap{display:flex;flex-direction:column;align-items:center}
.ll-box{display:flex;flex-direction:column;border:1px solid var(--accent2);border-radius:6px;overflow:hidden;min-width:54px}
.ll-data{background:var(--bg3);padding:8px;font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;color:var(--text);text-align:center;border-bottom:1px solid var(--accent2)}
.ll-next{background:var(--bg2);padding:5px 6px;font-family:'Space Mono',monospace;font-size:.6rem;color:var(--accent2);text-align:center}
.ll-arrow{display:flex;align-items:center;padding:0 5px;color:var(--accent2);font-size:1rem;flex-shrink:0;margin-bottom:10px}
.ll-null{display:flex;align-items:center;padding:0 8px;font-family:'Space Mono',monospace;font-size:.72rem;color:var(--red);font-weight:700;margin-bottom:10px}
.ll-lbl{font-size:.62rem;color:var(--accent3);font-family:'Space Mono',monospace;text-align:center;margin-top:4px}
.ll-head-lbl{font-size:.6rem;color:var(--accent);font-family:'Space Mono',monospace;font-weight:700;margin-bottom:3px;text-align:center}
.op-badge{display:inline-flex;padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:700;font-family:'Space Mono',monospace;margin:2px}
.ob-o1{background:rgba(6,255,165,.1);color:var(--green);border:1px solid rgba(6,255,165,.25)}
.ob-on{background:rgba(255,209,102,.1);color:var(--yellow);border:1px solid rgba(255,209,102,.25)}
.theorem-box{background:linear-gradient(135deg,rgba(124,92,252,.08),rgba(192,132,252,.05));border:1px solid rgba(124,92,252,.3);border-left:3px solid var(--accent);border-radius:10px;padding:14px 18px;margin-top:8px}
.theorem-label{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--accent2);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.theorem-text{font-size:.85rem;color:var(--text2);line-height:1.8}
.constraint-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.cr-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 16px;flex:1;min-width:160px}
.cr-n{font-family:'Space Mono',monospace;font-size:.82rem;color:var(--accent2);font-weight:700;margin-bottom:4px}
.cr-algo{font-size:.78rem;color:var(--text2);line-height:1.7}
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
      "Selection Sort": { diff: "easy", explanation: "Given an array of n items: (1) find the largest item x in the range [0…n−1], (2) swap x with the (n−1)th item, (3) reduce n by 1 and repeat.", intuition: "Each pass selects the maximum from the unsorted region and places it in its final sorted position. Always does exactly n−1 swaps.", steps: ["Set i = n−1 (last index of unsorted region).","Find maxIdx = index of the maximum element in a[0..i].","Swap a[i] with a[maxIdx] — the maximum is now in its final position.","Decrement i by 1 (shrink unsorted region).","Repeat until i = 0. Array is sorted."], dryRun: `Array: [29, 10, 14, 37, 13]\n\nPass 1 (i=4): max=37 @ idx3 → swap(idx3,idx4) → [29,10,14,13,37]\nPass 2 (i=3): max=29 @ idx0 → swap(idx0,idx3) → [13,10,14,29,37]\nPass 3 (i=2): max=14 @ idx2 → swap(idx2,idx2) → [13,10,14,29,37]\nPass 4 (i=1): max=13 @ idx0 → swap(idx0,idx1) → [10,13,14,29,37]\n\nResult: [10, 13, 14, 29, 37] ✓`, time: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" }, space: "O(1)", stable: false, when: "When minimising memory writes (exactly n−1 swaps). Not suitable for large n.", pros: ["Exactly n−1 swaps — minimum possible","In-place: O(1) extra space","Simple to implement"], cons: ["Always O(n²) — no early exit","Not stable","Worse cache performance than Insertion Sort"], cpp: `void selectionSort(int a[], int n) {\n    for (int i = n - 1; i >= 1; i--) {\n        int maxIdx = i;\n        for (int j = 0; j < i; j++)\n            if (a[j] >= a[maxIdx]) maxIdx = j;\n        swap(a[i], a[maxIdx]);\n    }\n}`, python: `def selection_sort(a):\n    n = len(a)\n    for i in range(n - 1, 0, -1):\n        max_idx = i\n        for j in range(i):\n            if a[j] >= a[max_idx]: max_idx = j\n        a[i], a[max_idx] = a[max_idx], a[i]\n    return a`, practice: [{ name: "Minimum Number of Swaps to Sort", diff: "medium" }] },
      "Bubble Sort": { diff: "easy", explanation: "Compare adjacent pairs, swap if out of order, bubble largest to end each pass. Version 2 adds early-termination: if no swaps in a pass, array is sorted — stop.", intuition: "Large items bubble to the end each pass. Early-termination makes best case O(n) on already-sorted input.", steps: ["Outer loop: i runs from n−1 down to 1.","Set is_sorted = true before inner loop.","Inner loop j from 1 to i: if a[j−1] > a[j], swap and set is_sorted = false.","If is_sorted still true after inner loop, return — array is sorted.","Otherwise decrement i and repeat."], dryRun: `Array: [29, 10, 14, 37, 13]\n\nPass 1 (i=4): after swaps → [10,14,29,13,37] ← 37 fixed ✓\nPass 2 (i=3): after swaps → [10,14,13,29,37] ← 29 fixed ✓\nPass 3 (i=2): [10,13,14,29,37] ← 14 fixed ✓\nPass 4 (i=1): no swaps → is_sorted=true → return early ✓\n\nResult: [10, 13, 14, 29, 37] ✓`, time: { best: "O(n) v2", avg: "O(n²)", worst: "O(n²) descending" }, space: "O(1)", stable: true, when: "Nearly sorted data with v2 early termination. Educational purposes.", pros: ["Stable sort","In-place: O(1)","O(n) best case with early termination"], cons: ["O(n²) worst case","More swaps than Insertion Sort"], cpp: `void bubbleSort(int a[], int n) {\n    for (int i = n - 1; i >= 1; i--) {\n        bool is_sorted = true;\n        for (int j = 1; j <= i; j++) {\n            if (a[j-1] > a[j]) {\n                swap(a[j], a[j-1]);\n                is_sorted = false;\n            }\n        }\n        if (is_sorted) return;\n    }\n}`, python: `def bubble_sort(a):\n    n = len(a)\n    for i in range(n - 1, 0, -1):\n        is_sorted = True\n        for j in range(1, i + 1):\n            if a[j-1] > a[j]:\n                a[j-1], a[j] = a[j], a[j-1]\n                is_sorted = False\n        if is_sorted: return a\n    return a`, practice: [{ name: "Sort Colors (Dutch National Flag)", diff: "medium" }] },
      "Insertion Sort": { diff: "easy", explanation: "Like sorting poker cards. Left portion a[0..i−1] is always sorted; for each new element a[i], shift larger sorted elements right, insert a[i] at the correct gap.", intuition: "Each new card slides left into correct position. Best case: sorted array — O(n). Worst case: reverse sorted — O(n²).", steps: ["Start with i=1 (a[0] is sorted subarray of size 1).","Save next = a[i] (element to insert).","While j ≥ 0 AND a[j] > next: shift a[j] right, j−−.","Insert next at a[j+1].","Repeat until i = n."], dryRun: `Array: [40, 13, 20, 8]\n\ni=1: next=13, 40>13 → shift → insert → [13,40,20,8]\ni=2: next=20, 40>20 → shift → insert → [13,20,40,8]\ni=3: next=8,  all>8 → shift → insert → [8,13,20,40]\n\nResult: [8, 13, 20, 40] ✓`, time: { best: "O(n) sorted", avg: "O(n²)", worst: "O(n²) reverse" }, space: "O(1)", stable: true, when: "Small arrays (n<20), nearly-sorted data, online/streaming. Used inside Timsort.", pros: ["Stable, in-place","O(n) best case","Online algorithm"], cons: ["O(n²) worst case","Many element shifts for large n"], cpp: `void insertionSort(int a[], int n) {\n    for (int i = 1; i < n; i++) {\n        int next = a[i];\n        int j;\n        for (j = i - 1; j >= 0 && a[j] > next; j--)\n            a[j + 1] = a[j];\n        a[j + 1] = next;\n    }\n}`, python: `def insertion_sort(a):\n    for i in range(1, len(a)):\n        next_val = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > next_val:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = next_val\n    return a`, practice: [{ name: "Insertion Sort List (LeetCode 147)", diff: "medium" }] },
      "Merge Sort": { diff: "medium", explanation: "Divide-and-conquer. Divide: split into two halves, recursively sort. Conquer: merge the sorted halves. Merging two sorted arrays of size k takes O(k). Recursion tree has O(log n) levels → O(n log n) total, guaranteed.", intuition: "Divide until size-1 (trivially sorted), then merge upward. O(n) work per level × O(log n) levels = O(n log n). No bad inputs — guaranteed.", steps: ["Base case: low >= high → return.","Compute mid = (low+high)/2.","mergeSort(a, low, mid) — sort left half.","mergeSort(a, mid+1, high) — sort right half.","merge(a, low, mid, high) using temp array b[].","Two pointers pick smaller element into b[]. Copy remaining. Copy b[] back."], dryRun: `Array: [38, 16, 27, 39, 12, 27]\n\nDivide → [38,16,27] | [39,12,27]\n         [38,16]|[27] [39,12]|[27]\n         [38][16]     [39][12]\n\nMerge up:\n[16,38] [12,39] → [16,27,38] [12,27,39]\nFinal merge → [12,16,27,27,38,39] ✓`, time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n) temp array", stable: true, when: "Guaranteed O(n log n) needed. Sorting linked lists. Stability required.", pros: ["Guaranteed O(n log n)","Stable sort","External sort capable"], cons: ["O(n) extra memory","Slower than Quick Sort in practice (cache misses)"], cpp: `void merge(int a[], int low, int mid, int high) {\n    int n = high - low + 1;\n    int* b = new int[n];\n    int left = low, right = mid+1, bIdx = 0;\n    while (left <= mid && right <= high)\n        b[bIdx++] = (a[left] <= a[right]) ? a[left++] : a[right++];\n    while (left  <= mid)  b[bIdx++] = a[left++];\n    while (right <= high) b[bIdx++] = a[right++];\n    for (int k = 0; k < n; k++) a[low+k] = b[k];\n    delete[] b;\n}\nvoid mergeSort(int a[], int low, int high) {\n    if (low < high) {\n        int mid = (low+high)/2;\n        mergeSort(a, low, mid);\n        mergeSort(a, mid+1, high);\n        merge(a, low, mid, high);\n    }\n}`, python: `def merge_sort(a, low, high):\n    if low < high:\n        mid = (low + high) // 2\n        merge_sort(a, low, mid)\n        merge_sort(a, mid+1, high)\n        merge(a, low, mid, high)\n\ndef merge(a, low, mid, high):\n    b = []\n    l, r = low, mid+1\n    while l <= mid and r <= high:\n        if a[l] <= a[r]: b.append(a[l]); l+=1\n        else: b.append(a[r]); r+=1\n    while l <= mid: b.append(a[l]); l+=1\n    while r <= high: b.append(a[r]); r+=1\n    for k in range(len(b)): a[low+k] = b[k]`, practice: [{ name: "Sort a Linked List", diff: "medium" },{ name: "Count Inversions in Array", diff: "hard" }] },
      "Quick Sort": { diff: "medium", explanation: "Divide-and-conquer. Choose pivot p = a[i]. Partition array into S1 (items < p) and S2 (items ≥ p). Pivot lands in final sorted position. Recursively sort S1 and S2. Conquer step: do nothing — pivot is already placed.", intuition: "After partition, pivot never moves again. Only sort the two sub-arrays. Cache-friendly, in-place. Average O(n log n) but O(n²) worst case on sorted input.", steps: ["Choose pivot p = a[low]. Set m = low.","For k from low+1 to high: if a[k] < p, m++, swap(a[k], a[m]). Else skip (S2).","swap(a[low], a[m]) — place pivot at index m. Return m as pivotIdx.","quickSort(a, low, pivotIdx-1) — sort S1.","quickSort(a, pivotIdx+1, high) — sort S2.","Base case: low >= high."], dryRun: `Array: [27,38,12,39,27,16], pivot=27\n\nk=1: 38≥27 skip  k=2: 12<27 → m=1, swap → [27,12,38,39,27,16]\nk=3: 39≥27 skip  k=4: 27≥27 skip\nk=5: 16<27 → m=2, swap → [27,12,16,39,27,38]\nPlace pivot: swap(a[0],a[2]) → [16,12,27,39,27,38]\nPivot 27 at index 2 ✓ (FINAL)\nLeft [16,12]→[12,16]  Right [39,27,38]→[27,38,39]\nResult: [12,16,27,27,38,39] ✓`, time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²) sorted input" }, space: "O(log n) stack", stable: false, when: "General-purpose in-place sorting. Fastest in practice for random data. Randomize pivot to avoid O(n²).", pros: ["Fastest in practice — cache-friendly, in-place","O(n log n) average","Pivot in final position — trivial conquer"], cons: ["O(n²) worst case without randomization","Not stable","Recursive stack overflow risk on pathological input"], cpp: `int partition(int a[], int i, int j) {\n    int p = a[i], m = i;\n    for (int k = i+1; k <= j; k++)\n        if (a[k] < p) { m++; swap(a[k], a[m]); }\n    swap(a[i], a[m]);\n    return m;\n}\nvoid quickSort(int a[], int low, int high) {\n    if (low < high) {\n        int pi = partition(a, low, high);\n        quickSort(a, low, pi-1);\n        quickSort(a, pi+1, high);\n    }\n}`, python: `def partition(a, i, j):\n    p, m = a[i], i\n    for k in range(i+1, j+1):\n        if a[k] < p:\n            m += 1\n            a[k], a[m] = a[m], a[k]\n    a[i], a[m] = a[m], a[i]\n    return m\n\ndef quick_sort(a, low, high):\n    if low < high:\n        pi = partition(a, low, high)\n        quick_sort(a, low, pi-1)\n        quick_sort(a, pi+1, high)`, practice: [{ name: "Kth Largest Element in Array", diff: "medium" },{ name: "Wiggle Sort II", diff: "hard" }] },
      "Radix Sort": { diff: "medium", explanation: "Non-comparison sort. Treats numbers as digit strings. Groups items by digit position (1s→10s→100s) using 10 queues. Repeat for d digit positions. O(dn) total — beats O(n log n) when d is small.", intuition: "No comparisons — group by digit. Queues preserve relative order (stable). After d passes the array is sorted. d=3 for numbers ≤999.", steps: ["Determine d = max digits in any element.","Set power=1 (1s place).","distribute(): push v[i] into digitQueue[(v[i]/power)%10].","collect(): concatenate queues 0–9 back into array.","power *= 10. Repeat d times."], dryRun: `Array: [170,45,75,90,802,24,2,66] (d=3)\n\nPass 1 (1s): buckets 0:[170,90] 2:[802,2] 4:[24] 5:[45,75] 6:[66]\n  Collect: [170,90,802,2,24,45,75,66]\nPass 2 (10s): buckets 0:[802,2] 2:[24] 4:[45] 6:[66] 7:[170,75] 9:[90]\n  Collect: [802,2,24,45,66,170,75,90]\nPass 3 (100s): buckets 0:[2,24,45,66,75,90] 1:[170] 8:[802]\n  Collect: [2,24,45,66,75,90,170,802] ✓`, time: { best: "O(dn)", avg: "O(dn)", worst: "O(dn)" }, space: "O(n)", stable: true, when: "Large volumes of integers with small d. d << log n → faster than comparison sorts.", pros: ["O(dn) beats O(n log n) when d small","Stable, no comparisons","Predictable performance"], cons: ["Not in-place — extra queue storage","Only integers or fixed-length strings","Degrades when d is large"], cpp: `#include <queue>\nvoid radixSort(vector<int>& v, int d) {\n    queue<int> dq[10];\n    int power = 1;\n    for (int i = 0; i < d; i++) {\n        for (int x : v) dq[(x/power)%10].push(x);\n        int k = 0;\n        for (int d = 0; d < 10; d++)\n            while (!dq[d].empty()) { v[k++]=dq[d].front(); dq[d].pop(); }\n        power *= 10;\n    }\n}`, python: `from collections import deque\ndef radix_sort(v, d):\n    power = 1\n    for _ in range(d):\n        buckets = [deque() for _ in range(10)]\n        for num in v: buckets[(num//power)%10].append(num)\n        i = 0\n        for b in buckets:\n            while b: v[i]=b.popleft(); i+=1\n        power *= 10\n    return v`, practice: [{ name: "Maximum Gap", diff: "hard" }] },
      "Algorithm Comparison": { diff: "easy", explanation: "Summary table of all sorting algorithms: time complexity, space, stability, and in-place property. Classic exam question — know this cold.", intuition: "Each algorithm trades off differently. O(n²) = simple, in-place, slow. O(n log n) = faster but may need space or sacrifice stability.", steps: ["Selection Sort: O(n²)/O(n²) | In-place ✓ | NOT stable ✗","Insertion Sort: O(n)/O(n²) | In-place ✓ | Stable ✓","Bubble Sort v2: O(n)/O(n²) | In-place ✓ | Stable ✓","Merge Sort: O(n lg n)/O(n lg n) | NOT in-place ✗ | Stable ✓","Quick Sort: O(n lg n)/O(n²) | In-place ✓ | NOT stable ✗","Radix Sort: O(dn)/O(dn) | NOT in-place ✗ | Stable ✓"], dryRun: `Algorithm      Best       Worst      In-place  Stable\n────────────────────────────────────────────────────\nSelection      O(n²)      O(n²)      Yes       No\nInsertion      O(n)       O(n²)      Yes       Yes\nBubble v2      O(n)       O(n²)      Yes       Yes\nMerge          O(n lg n)  O(n lg n)  No        Yes\nQuick          O(n lg n)  O(n²)      Yes       No\nRadix          O(dn)      O(dn)      No        Yes\n\nLower bound for comparison sort: Ω(n log n)\nMerge Sort is optimal among comparison sorts ✓`, time: { best: "Varies", avg: "Varies", worst: "Varies" }, space: "Varies", stable: true, when: "Use as exam reference. Know stability, in-place, and why Quick Sort has O(n²) worst case.", pros: ["Merge Sort: guaranteed O(n log n), stable","Quick Sort: fastest in practice, in-place","Radix: beats O(n log n) for integer data with small d"], cons: ["No single algorithm wins all criteria","Merge needs O(n) memory","Quick degrades on sorted input"], cpp: `// std::sort       -> introsort (Quick+Heap+Insertion)\n// std::stable_sort -> merge sort (stable, O(n log n))\n// For nearly sorted  -> Insertion Sort\n// For guaranteed stable O(n log n) -> Merge Sort`, python: `# sorted()/list.sort() -> Timsort (Merge+Insertion)\n# Timsort: stable, O(n log n) worst case\n# For integers -> Radix Sort O(dn)\n# Custom key -> sorted(arr, key=lambda x: x[1])`, practice: [{ name: "Sort Colors", diff: "medium" },{ name: "Largest Number", diff: "medium" }] }
    }
  },
  Arrays: {
    icon: "📦", diff: "easy",
    desc: "Foundation of DSA — contiguous memory, O(1) access. Most-asked topic in coding interviews.",
    subtopics: {
      "Introduction & Memory": { diff: "easy", explanation: "An array stores elements of the same type in contiguous memory. Each element is identified by an index (0-based). Address formula: Address(arr[i]) = Base + (i × size_of_element). This gives O(1) random access — no traversal needed.", intuition: "Like numbered lockers in a corridor. Locker #3 is always 3 steps from #0 — jump straight there. O(1) access. Trade-off: must book fixed number upfront; inserting in middle requires shifting.", steps: ["Declare array with fixed size or use dynamic type (vector/list).","Elements stored at consecutive addresses.","Access arr[i] in O(1): compute address directly.","Address = Base + (i × size). No loop needed.","Index range 0 to n−1. Accessing arr[n] → Index Out of Bounds."], dryRun: `arr=[10,20,30,40], Base=1000, size=4\n\narr[0]=1000+(0×4)=1000 → 10\narr[2]=1000+(2×4)=1008 → 30\narr[5]=1000+(5×4)=1020 → ⚠ Out of Bounds! ✗`, time: { best: "O(1)", avg: "O(1)", worst: "O(1)" }, space: "O(n)", stable: undefined, when: "Always — default data structure. Use for fast random access with known/bounded size.", pros: ["O(1) random access","Cache-friendly: contiguous memory","Foundation for stacks, queues, heaps"], cons: ["Fixed size in static arrays","O(n) insert/delete due to shifting","Memory wastage if over-allocated"], cpp: `int arr[4] = {10,20,30,40};  // static\nvector<int> v = {10,20,30,40}; // dynamic\ncout << arr[2]; // 30 — O(1)\nint mat[2][3] = {{1,2,3},{4,5,6}};`, python: `arr = [10,20,30,40]\nprint(arr[2])   # 30 — O(1)\nprint(arr[-1])  # 40 last element\nmat = [[1,2,3],[4,5,6]]\nprint(mat[1][2]) # 6`, practice: [{ name: "Find Maximum and Minimum", diff: "easy" },{ name: "Reverse an Array", diff: "easy" }] },
      "Types of Arrays": { diff: "easy", explanation: "1D: flat sequence. 2D: matrix with rows/columns. Static: fixed size at compile time. Dynamic: resizable (vector, list, ArrayList). Dynamic arrays double capacity when full — O(1) amortised append.", intuition: "Static = fixed parking lot. Dynamic = lot that doubles when full, amortising O(n) copy cost over many inserts.", steps: ["1D: arr[i].","2D: arr[i][j] — row i, col j. Row-major memory storage.","Static: int arr[10] — size fixed.","Dynamic: auto-grows. O(1) amortised append. O(n) on resize.","Multi-dim: arr[i][j][k]..."], dryRun: `2D: mat=[[1,2,3],[4,5,6]]\nmat[1][2]=6  addr=base+(1×3+2)×4=base+20\n\nDynamic growth:\ncap=1→[10] push(20)→cap=2→[10,20]\npush(30)→cap=4→[10,20,30,_]\npush(50)→cap=8→[10,20,30,40,50,_,_,_] ✓`, time: { best: "O(1) access", avg: "O(1) access", worst: "O(n) resize" }, space: "O(n·m) for 2D", stable: undefined, when: "2D for grids/matrices/DP tables. Dynamic arrays (vector/list) almost always in interviews.", pros: ["2D models grids naturally","Dynamic: O(1) amortised append","Row-major keeps row access cache-friendly"], cons: ["2D traversal O(n×m)","Resize has occasional O(n) spike"], cpp: `vector<int> v = {1,2,3};\nv.push_back(4);  // O(1) amortised\nvector<vector<int>> grid(3, vector<int>(4,0));`, python: `arr = [1,2,3]\narr.append(4)   # O(1) amortised\ngrid = [[0]*4 for _ in range(3)]`, practice: [{ name: "Spiral Matrix", diff: "medium" },{ name: "Rotate Image", diff: "medium" }] },
      "Core Operations": { diff: "easy", explanation: "Access O(1). Search O(n) linear / O(log n) binary (sorted). Insert O(n) — shift right. Delete O(n) — shift left. Update O(1). Insert/delete O(1) only at end of dynamic array.", intuition: "Access free — compute address. Search unsorted = check every element. Insert/delete mid-array = move everything. Update = overwrite in-place.", steps: ["ACCESS: arr[i] → compute address. O(1).","SEARCH linear: scan until found. O(n).","SEARCH binary (sorted): compare mid, eliminate half. O(log n).","INSERT at k: shift arr[k..n-1] right. O(n).","DELETE at k: shift arr[k+1..n-1] left. O(n).","UPDATE: arr[k] = value. O(1)."], dryRun: `INSERT 25 at index 2 in [10,20,30,40]:\nShift right → [10,20,_,30,40] → arr[2]=25 → [10,20,25,30,40] ✓\n\nDELETE index 1 from [10,20,30]:\nShift left → [10,30,30] → size-- → [10,30] ✓\n\nBINARY SEARCH 30 in [10,20,30,40,50]:\nlo=0,hi=4,mid=2 → arr[2]=30 ✓ O(log n)`, time: { best: "O(1) access/update", avg: "O(n) insert/delete", worst: "O(n) insert/delete" }, space: "O(1) extra", stable: undefined, when: "Access/update O(1) — perfect. Avoid frequent mid-array insert/delete; use linked list.", pros: ["O(1) access and update","Binary search O(log n) on sorted","In-place operations"], cons: ["O(n) insert/delete at arbitrary position","Must be sorted for binary search"], cpp: `vector<int> a={10,20,30,40};\nint x=a[2];          // O(1)\na[2]=99;             // O(1)\na.insert(a.begin()+2,25); // O(n)\na.erase(a.begin()+1);     // O(n)`, python: `a=[10,20,30,40]\nx=a[2]          # O(1)\na[2]=99         # O(1)\na.insert(2,25)  # O(n)\na.pop(1)        # O(n)`, practice: [{ name: "Search in Rotated Sorted Array", diff: "medium" },{ name: "Remove Element In-place", diff: "easy" }] },
      "Key Patterns": { diff: "medium", explanation: "Five patterns solve ~80% of array interview problems: (1) Prefix Sum — O(1) range queries after O(n) build. (2) Sliding Window — O(n) subarray problems. (3) Two Pointers — eliminates nested loops on sorted arrays. (4) Kadane's Algorithm — max subarray sum O(n). (5) Dutch National Flag — 3-way partition O(n).", intuition: "Prefix sum trades precomputation for O(1) queries. Sliding window avoids recomputing overlapping windows. Two pointers replaces O(n²) nested loops. Kadane's DP recurrence: maxHere = max(arr[i], maxHere+arr[i]).", steps: ["PREFIX SUM: prefix[i]=prefix[i-1]+arr[i]. Range[l,r]=prefix[r]-prefix[l-1]. O(n) build, O(1) query.","SLIDING WINDOW: expand right, shrink left when constraint violated. O(n).","TWO POINTERS: l=0,r=n-1. Move based on comparison. O(n).","KADANE'S: maxHere=max(arr[i],maxHere+arr[i]). Track maxSoFar. O(n).","DUTCH FLAG: 3 pointers lo/mid/hi. Elements<pivot→left, =pivot→mid, >pivot→right. O(n)."], dryRun: `KADANE'S on [-2,1,-3,4,-1,2,1,-5,4]:\ni=3: cur=4,max=4  i=4: cur=3,max=4\ni=5: cur=5,max=5  i=6: cur=6,max=6 ← answer ✓\n\nTWO POINTERS: Two Sum sorted [2,7,11,15] target=9\nl=0,r=3: 17>9→r--  l=0,r=2: 13>9→r--\nl=0,r=1: 9==9 ✓ return [0,1]`, time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(n) prefix, O(1) others", stable: undefined, when: "Range queries→Prefix Sum. Window subarray→Sliding Window. Sorted pair problems→Two Pointers. Max subarray→Kadane's.", pros: ["All O(n) — optimal","Eliminate O(n²) nested loops","Cover ~80% of array interview problems"], cons: ["Prefix sum uses O(n) space","Variable window can be tricky","Two pointers needs sorted array for many problems"], cpp: `// Prefix Sum\nvector<int> pre(n); pre[0]=arr[0];\nfor(int i=1;i<n;i++) pre[i]=pre[i-1]+arr[i];\nint sum=pre[r]-(l>0?pre[l-1]:0);\n// Kadane's\nint cur=arr[0],mx=arr[0];\nfor(int i=1;i<n;i++){cur=max(arr[i],cur+arr[i]);mx=max(mx,cur);}\n// Two Pointers\nint l=0,r=n-1;\nwhile(l<r){int s=arr[l]+arr[r];if(s==t)return{l,r};else if(s<t)l++;else r--;}`, python: `# Prefix Sum\npre=[0]*n; pre[0]=arr[0]\nfor i in range(1,n): pre[i]=pre[i-1]+arr[i]\n# Kadane's\ncur=mx=arr[0]\nfor x in arr[1:]: cur=max(x,cur+x); mx=max(mx,cur)\n# Two Pointers\nl,r=0,len(arr)-1\nwhile l<r:\n    s=arr[l]+arr[r]\n    if s==t: return [l,r]\n    elif s<t: l+=1\n    else: r-=1`, practice: [{ name: "Maximum Subarray (Kadane's)", diff: "medium" },{ name: "Two Sum", diff: "easy" },{ name: "Container With Most Water", diff: "medium" }] },
      "Important Problems": { diff: "medium", explanation: "Canonical array problems every CS student must know from scratch: Reverse, Move Zeros, Remove Duplicates, Rotate (3-reversal), Merge Sorted, Majority Element (Boyer-Moore). All O(n)/O(1).", intuition: "3-reversal rotate: no extra O(n) space. Remove duplicates: slow/fast pointer. Move zeros: write pointer. Boyer-Moore majority: candidate+count.", steps: ["REVERSE: swap a[l] and a[r], move inward. O(n),O(1).","MOVE ZEROS: writePtr=0, copy non-zeros, fill rest with 0s. O(n),O(1).","REMOVE DUPS (sorted): writePtr=1, copy when arr[i]≠arr[i-1]. O(n),O(1).","ROTATE RIGHT k: reverse all, reverse first k, reverse last n-k. O(n),O(1).","MAJORITY (Boyer-Moore): candidate+count. O(n),O(1)."], dryRun: `ROTATE [1,2,3,4,5] right by 2:\nReverse all   → [5,4,3,2,1]\nReverse 0..1  → [4,5,3,2,1]\nReverse 2..4  → [4,5,1,2,3] ✓\n\nMOVE ZEROS [0,1,0,3,12]:\nw=0: skip0→write1→skip0→write3→write12→fill0s\n→ [1,3,12,0,0] ✓\n\nBOYER-MOORE [3,2,3]:\ncand=3,cnt=1 → 2≠3,cnt=0 → cand=3,cnt=1 → ans=3 ✓`, time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(1) most", stable: undefined, when: "Building blocks — solve each in <5 min. Appear as sub-problems in harder questions.", pros: ["All O(n) time, O(1) space","Cover most common patterns"], cons: ["Off-by-one errors common in rotate","Majority only works when majority exists (>n/2)"], cpp: `void rotate(vector<int>&a,int k){int n=a.size();k%=n;\n  reverse(a.begin(),a.end());\n  reverse(a.begin(),a.begin()+k);\n  reverse(a.begin()+k,a.end());}\nint majority(vector<int>&a){\n  int c=a[0],cnt=1;\n  for(int i=1;i<a.size();i++) cnt+=(a[i]==c)?1:-1,cnt==0&&(c=a[i],cnt=1);\n  return c;}`, python: `def rotate(a,k):\n    n=len(a);k%=n\n    a.reverse();a[:k]=reversed(a[:k]);a[k:]=reversed(a[k:])\ndef majority(a):\n    c,cnt=a[0],1\n    for x in a[1:]: cnt+=1 if x==c else -1;\n    if cnt==0: c=x;cnt=1\n    return c`, practice: [{ name: "Rotate Array", diff: "medium" },{ name: "Move Zeroes", diff: "easy" },{ name: "Majority Element", diff: "easy" }] },
      "Complexity & Edge Cases": { diff: "easy", explanation: "Complete complexity reference and edge case checklist. In interviews, state complexity and edge cases before coding.", intuition: "Complexity table is exam-mandatory. Edge cases break most solutions: empty array, single element, all duplicates, negatives, sorted/reversed.", steps: ["Access O(1) — address arithmetic.","Search O(n) — scan all worst case.","Insert/Delete O(n) — shift elements.","Append amortised O(1) — O(n) only on resize.","Binary search O(log n) — sorted only."], dryRun: `Operation     | Best    | Worst   | Space\n──────────────┼─────────┼─────────┼──────\nAccess arr[i] | O(1)    | O(1)    | O(1)\nSearch        | O(1)    | O(n)    | O(1)\nInsert (mid)  | O(n)    | O(n)    | O(1)\nDelete (mid)  | O(n)    | O(n)    | O(1)\nAppend        | O(1)*   | O(n)    | O(1)\nBinary Search | O(1)    | O(log n)| O(1)\n\nEdge Cases:\n  ✓ Empty array → check before indexing\n  ✓ Single element → loop-based solutions may break\n  ✓ All duplicates → remove-dups edge case\n  ✓ Negative numbers → max subarray, Two Sum\n  ✓ Already sorted / reverse sorted`, time: { best: "O(1) access", avg: "O(n) general", worst: "O(n) insert/del" }, space: "O(n) storage", stable: undefined, when: "Memorise this table. State complexity + 3 edge cases before writing code in any interview.", pros: ["O(1) access — unmatched","Binary search on sorted is powerful"], cons: ["O(n) insert/delete — frequent mods prefer linked list"], cpp: `void safe(vector<int>&a,int t){\n  if(a.empty()) return;\n  int lo=0,hi=a.size()-1;\n  while(lo<=hi){\n    int mid=lo+(hi-lo)/2; // avoid overflow\n    if(a[mid]==t) return;\n    else if(a[mid]<t) lo=mid+1;\n    else hi=mid-1;\n  }\n}`, python: `def safe(a,t):\n    if not a: return -1\n    lo,hi=0,len(a)-1\n    while lo<=hi:\n        mid=(lo+hi)//2\n        if a[mid]==t: return mid\n        elif a[mid]<t: lo=mid+1\n        else: hi=mid-1\n    return -1`, practice: [{ name: "Binary Search", diff: "easy" },{ name: "Missing Number", diff: "easy" },{ name: "Product of Array Except Self", diff: "medium" }] }
    }
  },
  Strings: {
    icon: "🔤", diff: "medium",
    desc: "Sequences of characters. Two Pointers, KMP, Tries, Suffix Arrays — second most asked after arrays.",
    subtopics: {
      "Basics & Representations": { diff: "easy", explanation: "A string is a sequence of characters. Two representations: (1) Null-terminated — array ending with '$'. Length = O(n) scan. Used in C/C++. (2) Pointer/Length — (pointer, length) pair. Length = O(1). Substring = O(1) as new (p+i, m) pair. In Python/Java strings are immutable.", intuition: "Null-terminated: scan to '$' for length — wasteful. Pointer/length: length stored explicitly. Substring is pure pointer arithmetic — no copy. This is why Patricia Trees and Suffix Trees can store all substrings in O(n) total space.", steps: ["Null-terminated: access char[i] in O(1). Length requires O(n) scan.","Pointer/length: (p, l). Length = O(1). Substring s[i..i+m-1] = (p+i, m). O(1).","String comparison: O(min(|s1|,|s2|)) — not O(1).","Python/Java: immutable. Use ''.join() or StringBuilder for many concatenations.","C++ std::string: mutable, length() = O(1)."], dryRun: `"grain-fed organic" (length=17)\n\nNull-terminated: scan until '$' → O(17)\nPointer/length: p=&arr[0], l=17\nExtract "organ" (idx 10, len 5):\n  new pair (p+10, 5) → O(1), no copy ✓\n\nComparison "apple" vs "apply":\na==a,p==p,p==p,l==l,e<y → not equal  O(4) ✓`, time: { best: "O(1) access", avg: "O(n) compare", worst: "O(n) null-term length" }, space: "O(n)", stable: undefined, when: "Use pointer/length for many substring extractions. Null-terminated for C API compatibility.", pros: ["O(1) access","Pointer/length: O(1) substring","Chars are integers — usable as array indices"], cons: ["Comparison O(n)","Null-terminated length O(n)","Immutable strings make repeated += O(n²)"], cpp: `string s = "hello";\nchar c = s[4];       // O(1)\nint n = s.size();    // O(1) in C++ std::string\nstring sub = s.substr(1,3); // O(k) copy\nbool eq = (s == "hello");   // O(n) comparison`, python: `s = "hello"\nc = s[4]        # O(1)\nn = len(s)      # O(1)\nsub = s[1:4]    # O(k) copy\n# Build efficiently:\nresult = ''.join(['h','e','l','l','o']) # O(n)`, practice: [{ name: "Reverse a String", diff: "easy" },{ name: "Valid Palindrome", diff: "easy" }] },
      "Core Techniques": { diff: "medium", explanation: "Six techniques cover ~80% of string problems: (1) Two Pointers — palindromes, reversals. (2) Sliding Window — substring with constraints. (3) Frequency Count int[26] — anagrams. (4) String Hashing — O(1) substring comparison. (5) Sorting — anagram canonical form. (6) Char as Index — c-'a' gives 0-25.", intuition: "Frequency count turns char comparison into integer array comparison. Sliding window avoids recomputing overlapping windows. Two pointers replaces O(n²) generation of all substrings.", steps: ["TWO POINTERS: l=0,r=n-1. Compare s[l] and s[r], move inward. O(n).","SLIDING WINDOW: expand right, shrink left on violation. O(n).","FREQ COUNT: freq[c-'a']++. Compare two freq arrays in O(26)=O(1).","HASHING: hash=(hash*base+s[i])%MOD. Slide in O(1).","CHAR AS INDEX: s[i]-'a' gives 0-25 directly — no HashMap needed."], dryRun: `TWO POINTERS: "racecar" palindrome?\nl=0,r=6: r==r ✓  l=1,r=5: a==a ✓\nl=2,r=4: c==c ✓  l=3,r=3: l>=r → YES ✓\n\nFREQ: "listen" vs "silent" anagram?\nfreq[listen]={l,i,s,t,e,n}\nfreq[silent]={s,i,l,e,n,t}\nArrays equal → YES ✓\n\nSLIDING WINDOW: longest no-repeat "abcabcbb"\nExpand: {a}→{a,b}→{a,b,c} len=3\nr=3:'a' repeat! shrink l to 1 → {b,c,a} len=3 ✓`, time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(1) freq / O(n) window", stable: undefined, when: "Anagram→Freq. Substring→Sliding Window. Palindrome→Two Pointers. Duplicate substr→Hashing.", pros: ["All O(n)","freq[26] is O(1) space for fixed alphabets","Two pointers avoids O(n²) substr generation"], cons: ["Hashing has collision risk","Variable window conditions can be subtle"], cpp: `bool isPalindrome(string s){\n  int l=0,r=s.size()-1;\n  while(l<r) if(s[l++]!=s[r--]) return false;\n  return true;}\nbool isAnagram(string s,string t){\n  if(s.size()!=t.size()) return false;\n  int f[26]={};\n  for(char c:s) f[c-'a']++;\n  for(char c:t) f[c-'a']--;\n  for(int x:f) if(x) return false;\n  return true;}`, python: `def is_palindrome(s):\n    l,r=0,len(s)-1\n    while l<r:\n        if s[l]!=s[r]: return False\n        l+=1;r-=1\n    return True\ndef is_anagram(s,t):\n    if len(s)!=len(t): return False\n    f=[0]*26\n    for c in s: f[ord(c)-97]+=1\n    for c in t: f[ord(c)-97]-=1\n    return all(x==0 for x in f)`, practice: [{ name: "Valid Anagram", diff: "easy" },{ name: "Longest Substring Without Repeating Characters", diff: "medium" },{ name: "Minimum Window Substring", diff: "hard" }] },
      "Pattern Matching": { diff: "medium", explanation: "KMP: builds LPS (Longest Proper Prefix = Suffix) array for pattern P in O(m). Search in O(n). Never backtracks in T. Z-Algorithm: Z[i] = length of longest substring starting at i that matches a prefix. O(n+m). Rabin-Karp: rolling hash for O(1) window comparison. O(n+m) average.", intuition: "KMP: on mismatch at j, LPS[j-1] tells how far to jump back in P without moving i backward in T. Z-algo encodes same info differently. Both guarantee O(n+m).", steps: ["KMP BUILD LPS: lps[0]=0,len=0,i=1. If p[i]==p[len]: lps[i++]=++len. Else if len>0: len=lps[len-1]. Else: lps[i++]=0.","KMP SEARCH: i scans T, j scans P. Match→i++,j++. j==m→found, j=lps[j-1]. Mismatch: j>0→j=lps[j-1] else i++.","Z-ALGO: maintain [l,r]. Z[i]=min(r-i,Z[i-l]) if i<r, then extend. Update l,r.","RABIN-KARP: rolling hash for each T window. On match verify chars. O(n+m) avg."], dryRun: `KMP LPS for "aabaabaaa": [0,1,0,1,2,3,4,5,2]\n\nSearch "aba" in "ababcababa":\ni=0,j=0:a==a→i=1,j=1  i=1,j=1:b==b→i=2,j=2\ni=2,j=2:a==a→j=3=m→MATCH@0 ✓ j=lps[2]=1\ni=3,j=1:b==b→i=4,j=2  i=4,j=2:c≠a→j=lps[1]=0\ni=5-7: match → MATCH@5 ✓  i=8-9: MATCH@7 ✓`, time: { best: "O(n+m)", avg: "O(n+m)", worst: "O(n+m) KMP/Z" }, space: "O(m) LPS", stable: undefined, when: "Single pattern→KMP/Z. Multiple→Rabin-Karp. Many patterns→Aho-Corasick.", pros: ["KMP/Z: guaranteed O(n+m)","Never backtracks in T"], cons: ["LPS construction adds complexity","Rabin-Karp O(nm) worst case on collisions"], cpp: `vector<int> buildLPS(string&p){\n  int m=p.size(); vector<int> lps(m,0);\n  int len=0,i=1;\n  while(i<m){\n    if(p[i]==p[len]) lps[i++]=++len;\n    else if(len>0) len=lps[len-1];\n    else lps[i++]=0;}\n  return lps;}`, python: `def build_lps(p):\n    m=len(p);lps=[0]*m;length=0;i=1\n    while i<m:\n        if p[i]==p[length]: length+=1;lps[i]=length;i+=1\n        elif length>0: length=lps[length-1]\n        else: lps[i]=0;i+=1\n    return lps`, practice: [{ name: "Find the Index of First Occurrence", diff: "easy" },{ name: "Repeated Substring Pattern", diff: "easy" },{ name: "Shortest Palindrome", diff: "hard" }] },
      "DP on Strings": { diff: "hard", explanation: "Edit Distance: min insert/delete/replace to convert s1→s2. LCS: longest common subsequence (not contiguous). Longest Common Substring: must be contiguous. Palindromic Subsequence. All O(nm) DP on 2D table. Recurrence based on whether last chars match.", intuition: "All define dp[i][j] over prefixes. If last chars match: extend previous. Else: try skipping one char. Space reducible to O(min(n,m)) with rolling array.", steps: ["EDIT DIST: dp[i][j]=dp[i-1][j-1] if match, else 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]).","LCS: dp[i][j]=dp[i-1][j-1]+1 if match, else max(dp[i-1][j],dp[i][j-1]).","LONGEST COMMON SUBSTR: same match case but reset to 0 on mismatch. Track max.","PALINDROMIC SUBSEQ: dp[i][j]=dp[i+1][j-1]+2 if s[i]==s[j], else max(dp[i+1][j],dp[i][j-1]).","BASE: dp[i][0]=i, dp[0][j]=j."], dryRun: `EDIT DISTANCE "horse"→"ros":\n     "" r  o  s\n""  [0  1  2  3]\nh   [1  1  2  3]\no   [2  2  1  2]\nr   [3  2  2  2]\ns   [4  3  3  2]\ne   [5  4  4  3] ← answer=3 ✓`, time: { best: "O(nm)", avg: "O(nm)", worst: "O(nm)" }, space: "O(nm) or O(min(n,m)) rolling", stable: undefined, when: "Edit distance: spell-check, diff tools. LCS: bioinformatics. n,m≤1000: O(n²) fine.", pros: ["Elegant 2D DP","Space reducible to O(min(n,m))"], cons: ["O(nm) — not for large n,m without optimisation"], cpp: `int editDist(string s1,string s2){\n  int n=s1.size(),m=s2.size();\n  vector<int> p(m+1),c(m+1);\n  iota(p.begin(),p.end(),0);\n  for(int i=1;i<=n;i++){\n    c[0]=i;\n    for(int j=1;j<=m;j++)\n      c[j]=s1[i-1]==s2[j-1]?p[j-1]:1+min({p[j],c[j-1],p[j-1]});\n    swap(p,c);}\n  return p[m];}`, python: `def edit_distance(s1,s2):\n    n,m=len(s1),len(s2)\n    prev=list(range(m+1))\n    for i in range(1,n+1):\n        cur=[i]+[0]*m\n        for j in range(1,m+1):\n            if s1[i-1]==s2[j-1]: cur[j]=prev[j-1]\n            else: cur[j]=1+min(prev[j],cur[j-1],prev[j-1])\n        prev=cur\n    return prev[m]`, practice: [{ name: "Edit Distance", diff: "hard" },{ name: "Longest Common Subsequence", diff: "medium" },{ name: "Longest Palindromic Subsequence", diff: "medium" }] },
      "Important Problems": { diff: "medium", explanation: "Top 6 string interview problems: Longest Palindromic Substring (expand around center O(n)), Minimum Window Substring (variable sliding window), Group Anagrams (sorted key), Decode String (stack), Reverse Words (3-reversal), Valid Palindrome II (skip one char).", intuition: "Palindrome expansion: 2n-1 centers, expand while matching. O(n). Minimum Window: 'formed' counter avoids scanning freq array every step.", steps: ["PALINDROME EXPAND: for each center expand while s[l]==s[r]. O(n).","GROUP ANAGRAMS: sort each string as map key. O(nm log m).","MIN WINDOW: need/window dicts + formed counter. Expand r, shrink l when formed==required. O(n+m).","DECODE STRING: stack of (string, count). On ']': pop, repeat, concat. O(n).","REVERSE WORDS: strip, reverse all, reverse each word. O(n).","VALID PAL II: on mismatch try skip s[l] or s[r], check rest. O(n)."], dryRun: `LONGEST PAL "babad":\ncenter 'a'(idx1): expand → "bab" len=3 ✓\ncenter 'b'(idx2): expand → "aba" len=3 ✓\nAnswer: "bab" ✓\n\nGROUP ANAGRAMS ["eat","tea","tan","ate","nat","bat"]:\n"eat"→"aet"  "tea"→"aet"  "ate"→"aet" → group1\n"tan"→"ant"  "nat"→"ant" → group2\n"bat"→"abt" → group3 ✓`, time: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n)", stable: undefined, when: "Top 6 must-know problems. Practice until each takes <8 min.", pros: ["All O(n) or O(n log n)","Each demonstrates a distinct reusable pattern"], cons: ["Min window 'formed' counter logic is subtle","Decode string edge cases: nested brackets"], cpp: `string longestPal(string s){\n  int n=s.size(),st=0,mx=1;\n  auto exp=[&](int l,int r){\n    while(l>=0&&r<n&&s[l]==s[r])l--,r++;\n    if(r-l-1>mx){mx=r-l-1;st=l+1;}};\n  for(int i=0;i<n;i++){exp(i,i);exp(i,i+1);}\n  return s.substr(st,mx);}`, python: `def longest_palindrome(s):\n    n=len(s);res=""\n    def exp(l,r):\n        while l>=0 and r<n and s[l]==s[r]: l-=1;r+=1\n        return s[l+1:r]\n    for i in range(n):\n        for p in [exp(i,i),exp(i,i+1)]:\n            if len(p)>len(res): res=p\n    return res`, practice: [{ name: "Longest Palindromic Substring", diff: "medium" },{ name: "Minimum Window Substring", diff: "hard" },{ name: "Group Anagrams", diff: "medium" },{ name: "Decode String", diff: "medium" }] }
    }
  },
  "Linked List": {
    icon: "🔗", diff: "easy",
    desc: "Dynamic node-based structure. O(1) head insert/delete. Reversal, cycle detection, slow-fast pointer — core interview topics.",
    subtopics: {
      "Basics & Node Structure": {
        diff: "easy",
        explanation: "A linked list is a linear data structure where elements (nodes) are stored non-contiguously in memory. Each node contains two fields: (1) data — the value stored, and (2) next — a pointer to the next node. The list is accessed via a head pointer. The last node's next pointer is NULL, marking the end. The LinkedList object holds only a reference to the first node (head). From the tutorialspoint PDF: 'Each Link carries a data field and a Link Field called next. Last Link carries a Link as null to mark the end of the list.'",
        intuition: "Imagine a treasure hunt where each clue tells you where the next clue is. You can't jump to clue 5 directly — you must follow the chain from head. No address formula exists like arrays. The key trade-off: no O(1) random access, but inserting or deleting at the head is O(1) — just update one pointer with no shifting.",
        steps: [
          "Create a Node: allocate memory, set node.data = value, node.next = NULL.",
          "Create LinkedList: maintain a head pointer pointing to the first node.",
          "Traverse: start at head, follow .next pointers until NULL. Each step visits one node. O(n).",
          "Access node at index k: start at head, advance k times. O(k) — no shortcut.",
          "End of list: when node.next == NULL, you are at the last node.",
          "Empty list: head == NULL."
        ],
        dryRun: `Node structure:
  [ data | next→ ] → [ data | next→ ] → [ data | next→ ] → NULL

Example: head → [10|→] → [20|→] → [30|→] → NULL

Traverse:
  temp = head        → data=10
  temp = temp.next   → data=20
  temp = temp.next   → data=30
  temp = temp.next   → NULL → STOP ✓

Access index 2:
  head(0) → node(1) → node(2) ← found in 2 steps
  O(n) — no O(1) shortcut like arrays ✗

Insert at beginning — O(1):
  Before: head → [10] → [20] → NULL
  newNode(5).next = head
  head = newNode(5)
  After:  head → [5] → [10] → [20] → NULL ✓`,
        time: { best: "O(1) head", avg: "O(n) traverse", worst: "O(n) access" },
        space: "O(n)",
        stable: undefined,
        when: "Use when frequent insertion/deletion at head or middle is needed and random access is NOT required. Prefer arrays for O(1) access by index.",
        pros: [
          "O(1) insert/delete at head — no shifting needed",
          "Dynamic size — no pre-allocation required",
          "Efficient memory use — allocate only what's needed",
          "Foundation for stacks, queues, adjacency lists"
        ],
        cons: [
          "O(n) access — no random access by index",
          "Extra memory per node for pointer field",
          "Cache-unfriendly — nodes scattered in memory",
          "No backward traversal in singly linked list"
        ],
        cpp: `// Linked List Node and basic operations — C++
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Insert at beginning — O(1) (from tutorialspoint PDF)
void insertFirst(Node*& head, int val) {
    Node* link = new Node(val);
    link->next = head;   // point to old first node
    head = link;         // point head to new first node
}

// Delete at beginning — O(1)
Node* deleteFirst(Node*& head) {
    Node* tempLink = head;   // save reference to first link
    head = head->next;       // mark next as first
    return tempLink;         // return the deleted link
}

// Traversal — O(n)
void printList(Node* head) {
    Node* ptr = head;
    while (ptr != nullptr) {
        cout << ptr->data << " → ";
        ptr = ptr->next;
    }
    cout << "NULL" << endl;
}`,
        python: `# Linked List Node and basic operations — Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None   # pointer to next node

class LinkedList:
    def __init__(self):
        self.head = None   # start of list (First link)

    # Insert at beginning — O(1)
    def insert_first(self, val):
        link = Node(val)
        link.next = self.head   # point to old first node
        self.head = link        # point head to new first node

    # Delete at beginning — O(1)
    def delete_first(self):
        if not self.head: return None
        temp = self.head         # save reference to first link
        self.head = self.head.next  # mark next as first
        return temp

    # Traversal — O(n)
    def print_list(self):
        ptr = self.head
        while ptr:
            print(ptr.data, end=" → ")
            ptr = ptr.next
        print("NULL")`,
        practice: [
          { name: "Design Linked List", diff: "medium" },
          { name: "Middle of the Linked List", diff: "easy" },
          { name: "Convert Binary Number in LL to Integer", diff: "easy" }
        ]
      },
      "Types of Linked Lists": {
        diff: "easy",
        explanation: "Four types: (1) Singly Linked List — each node has one next pointer; navigation forward only. (2) Doubly Linked List — each node has next AND prev; bidirectional traversal; O(1) delete of any node if you have its pointer. (3) Circular Linked List — last node's next points back to head instead of NULL; used in round-robin scheduling. (4) Circular Doubly Linked List — both next and prev are circular. From tutorialspoint: 'Simple Linked List: forward only. Doubly: forward and backward. Circular: last item links to first, first links to last.'",
        intuition: "Singly: one-way street. Doubly: two-way street — go back. Circular: roundabout — loops back. Doubly costs extra memory (prev pointer) but enables O(1) delete of any node without finding its predecessor. Circular eliminates NULL sentinel for naturally cyclic applications.",
        steps: [
          "SINGLY: Node={data,next}. head→A→B→C→NULL. Forward only. O(n) traversal.",
          "DOUBLY: Node={prev,data,next}. NULL←A⇄B⇄C→NULL. Bidirectional. O(1) delete with node pointer.",
          "CIRCULAR: tail.next=head (not NULL). Must check temp!=head to stop traversal.",
          "CIRCULAR DOUBLY: tail.next=head AND head.prev=tail. No NULLs anywhere.",
          "DOUBLY INSERT at head: new.next=head; head.prev=new; head=new. O(1).",
          "DOUBLY DELETE node: node.prev.next=node.next; node.next.prev=node.prev. O(1)."
        ],
        dryRun: `SINGLY:
  head → [A|→] → [B|→] → [C|→] → NULL
  Forward only. No prev pointer.

DOUBLY:
  NULL ← [←A→] ⇄ [←B→] ⇄ [←C→] → NULL
  Delete B in O(1): A.next=C, C.prev=A ✓

CIRCULAR:
  [A|→] → [B|→] → [C|→]
    ↑________________________|
  tail.next = head (not NULL) ↺
  Traversal: start at head, stop when temp==head again

CIRCULAR DOUBLY:
  head.prev = tail  AND  tail.next = head
  No NULL pointers anywhere ↺`,
        time: { best: "O(1) insert head", avg: "O(n) search", worst: "O(n) access" },
        space: "O(n) singly, O(2n) doubly",
        stable: undefined,
        when: "Singly: default, minimal memory. Doubly: backward traversal needed, or O(1) delete. Circular: queues, round-robin, LRU cache. Doubly Circular: most flexible.",
        pros: [
          "Doubly: O(1) delete with node pointer — no need to find predecessor",
          "Doubly: bidirectional traversal",
          "Circular: natural fit for cyclic applications (playlists, scheduling)"
        ],
        cons: [
          "Doubly: 2× pointer memory per node",
          "Circular: traversal must check for loop — no NULL sentinel",
          "More complex to implement than singly"
        ],
        cpp: `// Doubly Linked List — C++
struct DNode {
    int data;
    DNode *prev, *next;
    DNode(int val): data(val), prev(nullptr), next(nullptr) {}
};

// Insert at beginning — O(1)
void insertFirst(DNode*& head, int val) {
    DNode* node = new DNode(val);
    node->next = head;
    if (head) head->prev = node;
    head = node;
}

// Delete node given pointer — O(1) ← KEY ADVANTAGE
void deleteNode(DNode*& head, DNode* target) {
    if (target->prev) target->prev->next = target->next;
    else head = target->next;     // deleting head
    if (target->next) target->next->prev = target->prev;
    delete target;
}

// Circular traversal
void printCircular(Node* head) {
    if (!head) return;
    Node* temp = head;
    do {
        cout << temp->data << " → ";
        temp = temp->next;
    } while (temp != head);
    cout << "(head)" << endl;
}`,
        python: `# Doubly Linked List — Python
class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self): self.head = None

    # Insert at beginning — O(1)
    def insert_first(self, val):
        node = DNode(val)
        node.next = self.head
        if self.head: self.head.prev = node
        self.head = node

    # Delete node given pointer — O(1)
    def delete_node(self, target):
        if target.prev: target.prev.next = target.next
        else: self.head = target.next   # deleting head
        if target.next: target.next.prev = target.prev

# Circular traversal
def print_circular(head):
    if not head: return
    temp = head
    while True:
        print(temp.data, end=" → ")
        temp = temp.next
        if temp == head: break
    print("(head)")`,
        practice: [
          { name: "Design Circular Queue", diff: "medium" },
          { name: "LRU Cache (Doubly LL + HashMap)", diff: "medium" },
          { name: "Flatten Multilevel Doubly Linked List", diff: "medium" }
        ]
      },
      "Core Operations": {
        diff: "easy",
        explanation: "Five core operations from both your notes and the tutorialspoint PDF. Insertion: at beginning O(1), at end O(n), at position k O(n). Deletion: of head O(1), of last O(n), by value O(n). Traversal/Navigation O(n). Search O(n). The PDF describes insertion as a 3-step process: create new link, point it to old first, point head to new link. Deletion: save head reference, advance head to next.",
        intuition: "All operations except head insert/delete require traversal first — O(n). There is no address formula. The 'stop one before target' pattern is key: to delete node with value V, stop at the node BEFORE it and rewire. To insert at position k, stop at node k-1 and rewire two pointers.",
        steps: [
          "INSERT AT HEAD: newNode.next=head; head=newNode. O(1). Two pointer updates.",
          "INSERT AT END: traverse until temp.next==NULL, then temp.next=newNode. O(n).",
          "INSERT AT POSITION k: traverse to node k-1. newNode.next=temp.next; temp.next=newNode. O(k).",
          "DELETE HEAD: head=head.next. O(1). Free old head.",
          "DELETE LAST: traverse until temp.next.next==NULL, then temp.next=NULL. O(n).",
          "DELETE BY VALUE: traverse until temp.next.data==val, then temp.next=temp.next.next. O(n).",
          "SEARCH: traverse and compare each node's data with target. O(n)."
        ],
        dryRun: `INSERT 25 at position 2 in [10→20→30→40]:
  traverse to index 1 (k-1=1): temp = node(20)
  newNode(25).next = node(30)
  node(20).next = newNode(25)
  Result: [10→20→25→30→40] ✓  O(n)

DELETE value 30 from [10→20→30→40]:
  traverse until temp.next.data==30: temp=node(20)
  node(20).next = node(30).next = node(40)
  Result: [10→20→40] ✓  O(n)

NAVIGATION (tutorialspoint PDF):
  current = First (head)
  while current != NULL:
      display current.data
      current = current.next  ← advance to Next Link`,
        time: { best: "O(1) head ops", avg: "O(n)", worst: "O(n)" },
        space: "O(1) extra",
        stable: undefined,
        when: "O(1) insert/delete at head is the signature advantage. For arbitrary position: O(n) — use arrays if index-based access dominates.",
        pros: [
          "O(1) insert/delete at head — no shifting",
          "Insert at middle only rewires pointers (not shift)",
          "Doubly LL: O(1) delete with node pointer"
        ],
        cons: [
          "O(n) for all operations except head insert/delete",
          "Must traverse to find position before operating",
          "No O(1) random access"
        ],
        cpp: `// Core Operations — C++
// Insert at beginning — O(1) (from tutorialspoint)
void insertFirst(Node*& head, int val) {
    Node* link = new Node(val);
    link->next = head;   // point to old first
    head = link;         // update head
}

// Delete at beginning — O(1)
Node* deleteFirst(Node*& head) {
    Node* temp = head;
    head = head->next;
    return temp;
}

// Insert at position k — O(k)
void insertAt(Node*& head, int val, int k) {
    if (k == 0) { insertFirst(head, val); return; }
    Node* temp = head;
    for (int i = 0; i < k-1 && temp; i++)
        temp = temp->next;
    if (!temp) return;
    Node* node = new Node(val);
    node->next = temp->next;
    temp->next = node;
}

// Delete by value — O(n)
void deleteByVal(Node*& head, int val) {
    if (!head) return;
    if (head->data == val) { deleteFirst(head); return; }
    Node* temp = head;
    while (temp->next && temp->next->data != val)
        temp = temp->next;
    if (temp->next)
        temp->next = temp->next->next;
}`,
        python: `# Core Operations — Python
class LinkedList:
    def __init__(self): self.head = None

    # Insert at beginning — O(1)
    def insert_first(self, val):
        node = Node(val)
        node.next = self.head
        self.head = node

    # Insert at end — O(n)
    def insert_end(self, val):
        node = Node(val)
        if not self.head: self.head = node; return
        temp = self.head
        while temp.next: temp = temp.next
        temp.next = node

    # Insert at position k — O(k)
    def insert_at(self, val, k):
        if k == 0: self.insert_first(val); return
        temp = self.head
        for _ in range(k-1):
            if not temp: return
            temp = temp.next
        node = Node(val)
        node.next = temp.next
        temp.next = node

    # Delete by value — O(n)
    def delete_by_val(self, val):
        if not self.head: return
        if self.head.data == val:
            self.head = self.head.next; return
        temp = self.head
        while temp.next and temp.next.data != val:
            temp = temp.next
        if temp.next:
            temp.next = temp.next.next`,
        practice: [
          { name: "Remove Linked List Elements", diff: "easy" },
          { name: "Delete Node in a Linked List", diff: "medium" },
          { name: "Remove Duplicates from Sorted List", diff: "easy" }
        ]
      },
      "Slow-Fast Pointer": {
        diff: "medium",
        explanation: "The slow-fast (tortoise and hare) technique uses two pointers moving at different speeds. Slow advances 1 step; fast advances 2 steps. Three applications: (1) Find Middle — when fast reaches end, slow is at middle. (2) Detect Cycle (Floyd's Algorithm) — if slow==fast at any point, a cycle exists. (3) Find Cycle Start — after detection, move slow to head and advance both 1 step until they meet again at the cycle entry point.",
        intuition: "Two runners on a circular track — the faster one always laps the slower one if there's a loop. For finding middle: fast covers 2× the distance, so when fast finishes, slow is halfway. For cycle start: the mathematical proof shows the distance from head to cycle start equals the distance from meeting point to cycle start.",
        steps: [
          "FIND MIDDLE: slow=head, fast=head. While fast&&fast.next: slow=slow.next, fast=fast.next.next. Return slow.",
          "DETECT CYCLE: same movement. If slow==fast → cycle exists. Return true.",
          "FIND CYCLE START: Phase 1: detect (find meeting point). Phase 2: move slow=head, keep fast at meeting point. Advance both 1 step until slow==fast. Return slow.",
          "Even-length list: slow lands at second middle node. Use fast!=NULL&&fast.next!=NULL as condition.",
          "Odd-length list: slow lands exactly at middle."
        ],
        dryRun: `FIND MIDDLE [1→2→3→4→5]:
  slow=1,fast=1
  step1: slow=2, fast=3
  step2: slow=3, fast=5
  fast.next=NULL → STOP → middle=slow=node(3) ✓

DETECT CYCLE [1→2→3→4→2 (loop)]:
  step1: slow=2, fast=3
  step2: slow=3, fast=2 (looped)
  step3: slow=4, fast=4 → slow==fast → CYCLE ✓

FIND CYCLE START (meeting at node 4):
  Move slow=head=1, keep fast=4
  step1: slow=2, fast=2 (loop entry)
  slow==fast → Cycle starts at node(2) ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(1)",
        stable: undefined,
        when: "Finding middle → slow-fast. Cycle detection → Floyd's. Nth from end → two pointers gap of n. Palindrome LL → find middle + reverse second half.",
        pros: [
          "O(1) space — no extra data structure",
          "O(n) single pass",
          "Works without modifying the list"
        ],
        cons: [
          "Finding cycle START requires a second pass",
          "Off-by-one with even-length lists — check loop condition carefully"
        ],
        cpp: `// Slow-Fast Pointer — C++

// Find Middle — O(n), O(1)
Node* findMiddle(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

// Detect Cycle — Floyd's, O(n), O(1)
bool hasCycle(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find Cycle Start — O(n), O(1)
Node* cycleStart(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if (slow == fast) break;
    }
    if (!fast || !fast->next) return nullptr;
    slow = head;
    while (slow != fast) { slow = slow->next; fast = fast->next; }
    return slow;
}`,
        python: `# Slow-Fast Pointer — Python

# Find Middle — O(n), O(1)
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# Detect Cycle — Floyd's, O(n), O(1)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast: return True
    return False

# Find Cycle Start — O(n), O(1)
def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow is fast: break
    else: return None
    slow = head
    while slow is not fast:
        slow = slow.next; fast = fast.next
    return slow`,
        practice: [
          { name: "Linked List Cycle", diff: "easy" },
          { name: "Linked List Cycle II (find start)", diff: "medium" },
          { name: "Middle of the Linked List", diff: "easy" },
          { name: "Happy Number (cycle in sequence)", diff: "easy" }
        ]
      },
      "Reverse & Classic Algorithms": {
        diff: "medium",
        explanation: "Reverse Linked List is the #1 most asked LL interview question. Iterative approach: three pointers (prev, curr, next) — O(n) time, O(1) space. The tutorialspoint PDF gives this exact implementation. Two other classics: Merge Two Sorted Lists (dummy head + two pointers, O(n+m), O(1)) and Remove Nth Node from End (two-pointer gap technique, O(n), O(1)).",
        intuition: "Reversal: at each step make curr.next point backward (to prev). Save next before destroying it. Three-pointer dance: save→flip→advance. Dummy node in merge avoids special-casing the head. Nth from end: advance fast pointer n steps ahead, then both pointers until fast reaches end — slow is at the node before target.",
        steps: [
          "REVERSE: prev=NULL, curr=head. Loop: next=curr.next; curr.next=prev; prev=curr; curr=next. head=prev.",
          "MERGE SORTED: dummy node as sentinel. tail=dummy. Compare l1.data vs l2.data, attach smaller, advance. Append remaining. Return dummy.next.",
          "REMOVE NTH FROM END: advance fast n steps. If fast==NULL, delete head. Move both until fast.next==NULL. slow.next=slow.next.next.",
          "PALINDROME: find middle → reverse second half → compare halves → (restore).",
          "REVERSE K-GROUPS: reverse first k nodes, recursively solve rest, connect."
        ],
        dryRun: `REVERSE [1→2→3→4→5]:
  prev=NULL, curr=1
  step1: next=2, 1.next=NULL, prev=1, curr=2
  step2: next=3, 2.next=1,    prev=2, curr=3
  step3: next=4, 3.next=2,    prev=3, curr=4
  step4: next=5, 4.next=3,    prev=4, curr=5
  step5: next=NULL, 5.next=4, prev=5, curr=NULL
  head=prev=5
  Result: 5→4→3→2→1→NULL ✓

MERGE [1→3→5] and [2→4→6]:
  dummy→tail
  1<2→take1  2<3→take2  3<4→take3
  4<5→take4  5<6→take5  append6
  Result: 1→2→3→4→5→6 ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(1) iterative, O(n) recursive",
        stable: undefined,
        when: "Reverse: always iterative in interviews (O(1) space). Merge: subroutine in Merge Sort on LL. Palindrome: reverse-second-half is optimal O(n)/O(1).",
        pros: [
          "Iterative reverse is O(1) space",
          "Three-pointer pattern is universally applicable",
          "Dummy node eliminates head edge cases in merge"
        ],
        cons: [
          "Recursive reverse uses O(n) stack — avoid for large lists",
          "Palindrome check modifies list — restore if needed",
          "K-group reverse is significantly more complex"
        ],
        cpp: `// Reverse & Classics — C++

// Reverse Linked List — O(n), O(1) ← from tutorialspoint PDF
void reverse(Node** head) {
    Node* prev = nullptr;
    Node* current = *head;
    Node* next = nullptr;
    while (current != nullptr) {
        next = current->next;    // save next
        current->next = prev;    // reverse pointer
        prev = current;          // advance prev
        current = next;          // advance current
    }
    *head = prev;
}

// Merge Two Sorted Lists — O(n+m), O(1)
Node* mergeSorted(Node* l1, Node* l2) {
    Node dummy(-1);
    Node* tail = &dummy;
    while (l1 && l2) {
        if (l1->data <= l2->data) { tail->next=l1; l1=l1->next; }
        else { tail->next=l2; l2=l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

// Remove Nth from End — O(n), O(1)
Node* removeNth(Node* head, int n) {
    Node dummy(0); dummy.next = head;
    Node* fast = &dummy, *slow = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) { fast=fast->next; slow=slow->next; }
    slow->next = slow->next->next;
    return dummy.next;
}`,
        python: `# Reverse & Classics — Python

# Reverse Linked List — O(n), O(1)
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next    # save next
        curr.next = prev   # reverse pointer
        prev = curr        # advance prev
        curr = nxt         # advance curr
    return prev            # new head

# Merge Two Sorted Lists — O(n+m), O(1)
def merge_sorted(l1, l2):
    dummy = Node(-1)
    tail = dummy
    while l1 and l2:
        if l1.data <= l2.data: tail.next=l1; l1=l1.next
        else: tail.next=l2; l2=l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next

# Remove Nth from End — O(n), O(1)
def remove_nth(head, n):
    dummy = Node(0); dummy.next = head
    fast = slow = dummy
    for _ in range(n+1): fast = fast.next
    while fast: fast=fast.next; slow=slow.next
    slow.next = slow.next.next
    return dummy.next`,
        practice: [
          { name: "Reverse Linked List", diff: "easy" },
          { name: "Reverse Linked List II (sublist)", diff: "medium" },
          { name: "Merge Two Sorted Lists", diff: "easy" },
          { name: "Remove Nth Node From End", diff: "medium" },
          { name: "Palindrome Linked List", diff: "easy" },
          { name: "Reverse Nodes in K-Group", diff: "hard" }
        ]
      },
      "Complexity & Interview Guide": {
        diff: "easy",
        explanation: "Complete complexity reference for all linked list operations and a curated must-know problem list. Linked lists appear in nearly every technical interview. Master these 7 problems: Reverse LL, Detect Cycle, Find Cycle Start, Find Middle, Palindrome LL, Merge Two Sorted, Remove Nth from End. Three core interview patterns: dummy node, two-pointer gap, slow-fast.",
        intuition: "Linked list interviews test pointer manipulation, not algorithmic complexity. The difficulty is getting pointer updates right without losing nodes. Always draw the list on paper first. Use dummy nodes for cleaner code. Always check NULL before dereferencing.",
        steps: [
          "Access: O(n) — traverse from head. No formula.",
          "Search: O(n) — scan all nodes.",
          "Insert at head: O(1) — two pointer updates.",
          "Insert at end/position: O(n) — traverse first.",
          "Delete head: O(1). Delete other: O(n).",
          "INTERVIEW PATTERN 1: dummy node → avoids edge cases for head operations.",
          "INTERVIEW PATTERN 2: two pointers with gap of n → find nth from end.",
          "INTERVIEW PATTERN 3: slow-fast → middle, cycle detection, cycle start."
        ],
        dryRun: `Operation      | Time  | Space | Notes
───────────────┼───────┼───────┼───────────────────────
Access (index) | O(n)  | O(1)  | Traverse from head
Search         | O(n)  | O(1)  | Scan each node
Insert (head)  | O(1)  | O(1)  | Signature advantage
Insert (end)   | O(n)  | O(1)  | Traverse to tail first
Insert (mid)   | O(n)  | O(1)  | Traverse to position
Delete (head)  | O(1)  | O(1)  | Just update head
Delete (end)   | O(n)  | O(1)  | Traverse to 2nd last
Delete (mid)   | O(n)  | O(1)  | Traverse to prev node
Reverse        | O(n)  | O(1)  | 3-pointer iterative
Detect cycle   | O(n)  | O(1)  | Floyd's algorithm
Find middle    | O(n)  | O(1)  | Slow-fast pointer

Edge Cases — always check:
  ✓ head = NULL (empty list) → return early
  ✓ Single node → loop-based solutions may fail
  ✓ Two nodes → many off-by-one errors here
  ✓ k > length (remove nth) → edge case for dummy
  ✓ All same values → delete by value issues`,
        time: { best: "O(1) head ops", avg: "O(n)", worst: "O(n)" },
        space: "O(1) most ops",
        stable: undefined,
        when: "Use this as your interview quick-reference. Draw the list before coding. Use dummy nodes. Always check NULL before ->next.",
        pros: [
          "O(1) head insert/delete — no shifting like arrays",
          "Dynamic size — grows/shrinks freely",
          "Efficient for stacks, queues, graph adjacency lists"
        ],
        cons: [
          "No O(1) random access — must traverse",
          "Cache unfriendly — scattered memory",
          "Extra pointer field per node"
        ],
        cpp: `// Interview Patterns — C++

// PATTERN 1: Dummy head (avoids head edge cases)
Node dummy(0);
dummy.next = head;
Node* tail = &dummy;
// ... build result list ...
return dummy.next;

// PATTERN 2: Two pointers with gap of n
Node* fast = head, *slow = head;
for (int i = 0; i < n; i++) fast = fast->next;
while (fast->next) { fast=fast->next; slow=slow->next; }
// slow.next is the nth node from end

// PATTERN 3: Intersection of two lists
Node* a = headA, *b = headB;
while (a != b) {
    a = a ? a->next : headB;
    b = b ? b->next : headA;
}
return a; // intersection or NULL

// Always: safe NULL check
while (temp && temp->next) { // NOT while(temp->next)
    // safe to use temp->next->next here
}`,
        python: `# Interview Patterns — Python

# PATTERN 1: Dummy head
dummy = Node(0); dummy.next = head
tail = dummy
# build result... return dummy.next

# PATTERN 2: Two pointers gap of n
fast = slow = head
for _ in range(n): fast = fast.next
while fast.next:
    fast = fast.next; slow = slow.next
# slow.next is nth from end

# PATTERN 3: List intersection
a, b = head_a, head_b
while a is not b:
    a = a.next if a else head_b
    b = b.next if b else head_a
# a is intersection or None

# Edge case template
def solve(head):
    if not head: return None          # empty
    if not head.next: return head     # single node
    # your logic here...`,
        practice: [
          { name: "Reverse Linked List", diff: "easy" },
          { name: "Linked List Cycle II", diff: "medium" },
          { name: "Intersection of Two Linked Lists", diff: "easy" },
          { name: "Sort List (Merge Sort on LL)", diff: "medium" },
          { name: "Reorder List", diff: "medium" },
          { name: "Copy List with Random Pointer", diff: "medium" }
        ]
      }
    }
  },
  Stack: {
    icon: "📚", diff: "easy",
    desc: "LIFO structure. Push, pop, peek all O(1). Powers recursion, expression evaluation, parsing, and monotonic stack problems.",
    subtopics: {
      "Basics & LIFO": {
        diff: "easy",
        explanation: "A stack is a non-primitive linear data structure. It is an ordered list in which addition of new data items and deletion of already existing data items is done from only one end, known as the Top of Stack (TOS). Because all insertions and deletions happen at the top, the last added element is the first to be removed — this is why a stack is called a Last-In-First-Out (LIFO) type of list. Core terms: Top — pointer/index to the last inserted element. Push — insert an element. Pop — remove the top element. Peek — return top element without removing it. isEmpty — check if stack is empty. isFull — check if stack is full (array implementation only).",
        intuition: "Think of a pile of plates at a marriage party. Fresh plates are pushed onto the top and popped off the top. Or biscuits in a pack torn at one end — you push biscuits back in and pop them out from the same end. Whenever a stack is created the base remains fixed. As new elements are added the top increases; as elements are removed the top decrements.",
        steps: [
          "PUSH: (1) Check if stack is full (overflow check). (2) Increment top. (3) Insert element at stack[top].",
          "POP: (1) Check if stack is empty (underflow check). (2) Save stack[top] in NUM. (3) Decrement top. (4) Return NUM.",
          "PEEK: Return stack[top] without changing top. Check empty first.",
          "isEmpty: Return top == -1 (array) or top == NULL (linked list).",
          "isFull: Return top == MAXSIZE - 1 (array implementation only).",
          "OVERFLOW: Trying to push when stack is full. UNDERFLOW: Trying to pop when stack is empty."
        ],
        dryRun: `Stack: [10, 20, 30]  top=2

Push(40):
  top == MAXSIZE-1? No → top=3, stack[3]=40
  Stack: [10, 20, 30, 40]  top=3 ✓

Pop():
  top == -1? No → NUM=stack[3]=40, top=2
  Stack: [10, 20, 30]  top=2 ✓

Peek():
  top == -1? No → return stack[2]=30
  Stack unchanged ✓

Push on full stack (MAXSIZE=3, top=2):
  top == MAXSIZE-1? YES → STACK OVERFLOW ✗

Pop on empty stack (top=-1):
  top == -1? YES → STACK UNDERFLOW ✗`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n)",
        stable: undefined,
        when: "Use a stack whenever you need LIFO access: function call management, undo/redo, expression evaluation, backtracking, DFS, balanced parentheses checking.",
        pros: [
          "All operations O(1) — push, pop, peek are constant time",
          "Simple to implement (array or linked list)",
          "Natural fit for recursion simulation and backtracking",
          "Memory efficient for LIFO use cases"
        ],
        cons: [
          "Array-based: fixed size — overflow if capacity exceeded",
          "No random access — can only access the top element",
          "Linked list-based: extra memory per node for pointer",
          "Not suitable when you need to access arbitrary elements"
        ],
        cpp: `// Stack — Array-based (Static Implementation)
#define MAXSIZE 100
class Stack {
    int top;
    int arr[MAXSIZE];
public:
    Stack() { top = -1; }

    void push(int x) {
        if (top >= MAXSIZE - 1) {
            cout << "Stack Overflow\n"; return;
        }
        arr[++top] = x;    // increment top, then insert
    }

    int pop() {
        if (top < 0) {
            cout << "Stack Underflow\n"; return -1;
        }
        return arr[top--]; // return top, then decrement
    }

    int peek() {
        if (top < 0) return -1;
        return arr[top];   // just look, don't remove
    }

    bool isEmpty() { return top < 0; }
    bool isFull()  { return top >= MAXSIZE - 1; }
};

// STL stack (preferred in interviews)
#include <stack>
stack<int> st;
st.push(10);          // push
int x = st.top();     // peek
st.pop();             // pop
bool empty = st.empty();`,
        python: `# Stack — using Python list (dynamic, no size limit)
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, x):
        self.stack.append(x)       # O(1) amortised

    def pop(self):
        if not self.stack:
            return "Underflow"
        return self.stack.pop()    # O(1)

    def peek(self):
        if not self.stack:
            return None
        return self.stack[-1]      # O(1), no removal

    def is_empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

# Usage
s = Stack()
s.push(10); s.push(20); s.push(30)
print(s.peek())   # 30
print(s.pop())    # 30
print(s.pop())    # 20`,
        practice: [
          { name: "Implement Stack using Arrays", diff: "easy" },
          { name: "Valid Parentheses", diff: "easy" },
          { name: "Min Stack", diff: "medium" }
        ]
      },
      "Implementations": {
        diff: "easy",
        explanation: "Stacks can be implemented in two ways: (1) Static Implementation (Array-based) — uses a fixed-size array. Fast access, but size must be declared at design time. If too few elements are stored, memory is wasted; if too many elements need to be stored, the fixed size causes overflow. (2) Dynamic Implementation (Linked List-based) — uses nodes with data and a link pointer. No fixed size limit (until memory is full). The pointer to the beginning of the linked list serves as the top of the stack. Each push allocates a new node; each pop deallocates the top node. (3) Dynamic Stack (C++ vector/Python list) — resizes automatically; best of both worlds for most use cases.",
        intuition: "Array stack: contiguous memory, cache-friendly, but rigid. Linked list stack: flexible size, but each node needs extra memory for the pointer. In interviews, Python list or C++ STL stack are preferred — they handle resizing automatically. Know both for exam questions on static vs dynamic implementation.",
        steps: [
          "ARRAY PUSH: if top==MAXSIZE-1 → overflow. Else arr[++top]=value.",
          "ARRAY POP: if top==-1 → underflow. Else return arr[top--].",
          "LINKED LIST PUSH: allocate new node PTR. PTR->info=value. PTR->link=top. top=PTR.",
          "LINKED LIST POP: if top==NULL → underflow. PTR=top. NUM=PTR->info. top=top->link. free(PTR). Return NUM.",
          "Array: top starts at -1. Full when top==MAXSIZE-1.",
          "Linked list: top starts as NULL. Full only when system memory is exhausted."
        ],
        dryRun: `── ARRAY STACK (MAXSIZE=5, top=-1 initially) ─────────
Push(23): top=-1 → top=0, arr[0]=23
Push(-16): top=0 → top=1, arr[1]=-16
Push(11): top=1 → top=2, arr[2]=11
Push(10): top=2 → top=3, arr[3]=10
Stack: [23,-16,11,10]  top=3

Pop(): NUM=arr[3]=10, top=2 ✓
Stack: [23,-16,11]  top=2

── LINKED LIST STACK (top=NULL initially) ────────
Push(23): new node PTR. PTR->info=23. PTR->link=NULL. top=PTR
  top → [23|NULL]
Push(-16): new node. link=top. top=new
  top → [-16|→] → [23|NULL]
Push(11):  top → [11|→] → [-16|→] → [23|NULL]

Pop(): PTR=top. NUM=11. top=top->link. free(PTR)
  top → [-16|→] → [23|NULL] ✓`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n) array / O(n) linked list + pointer overhead",
        stable: undefined,
        when: "Array: when max size is known and speed matters. Linked list: when size is unknown or varies greatly. Python list / C++ vector: default choice — dynamic sizing with amortised O(1) push.",
        pros: [
          "Array: faster (cache-friendly), no pointer overhead",
          "Linked list: truly dynamic — no overflow (until out of memory)",
          "Both give O(1) push and pop"
        ],
        cons: [
          "Array: fixed size declared at design time — wasted memory or overflow",
          "Linked list: extra memory for pointer in every node",
          "Linked list: slightly slower due to dynamic allocation"
        ],
        cpp: `// Static (Array) Stack — from textbook
#define MAXSIZE 5
int stack[MAXSIZE], top = -1;

void push(int num) {
    if (top == MAXSIZE - 1) { printf("Overflow"); return; }
    stack[++top] = num;
}
int pop() {
    if (top == -1) { printf("Underflow"); return -1; }
    return stack[top--];
}

// Dynamic (Linked List) Stack — from textbook
struct Node {
    int info;
    Node* link;
};
Node* top_ptr = nullptr;

void push_ll(int num) {
    Node* ptr = new Node();
    ptr->info = num;
    ptr->link = top_ptr;  // point to old top
    top_ptr = ptr;        // new top
}
void pop_ll() {
    if (!top_ptr) { printf("Underflow"); return; }
    Node* ptr = top_ptr;
    int num = ptr->info;
    top_ptr = top_ptr->link;
    delete ptr;           // free memory
}`,
        python: `# Static-style Stack (fixed max size) — Python
class ArrayStack:
    def __init__(self, maxsize=100):
        self.arr = [0] * maxsize
        self.top = -1
        self.maxsize = maxsize

    def push(self, num):
        if self.top == self.maxsize - 1:
            print("Stack Overflow"); return
        self.top += 1
        self.arr[self.top] = num

    def pop(self):
        if self.top == -1:
            print("Stack Underflow"); return -1
        num = self.arr[self.top]
        self.top -= 1
        return num

# Dynamic Stack — Python list (preferred)
class DynamicStack:
    def __init__(self):
        self.stack = []   # grows/shrinks automatically

    def push(self, num): self.stack.append(num)
    def pop(self):
        return self.stack.pop() if self.stack else "Underflow"
    def peek(self): return self.stack[-1] if self.stack else None`,
        practice: [
          { name: "Implement Stack using Linked List", diff: "easy" },
          { name: "Implement Stack using Queues", diff: "medium" },
          { name: "Design Min Stack", diff: "medium" }
        ]
      },
      "Polish Notations": {
        diff: "medium",
        explanation: "A Polish mathematician suggested a notation called Polish notation to remove ambiguity from arithmetic expressions. It has two forms: (1) Prefix — operator is written BEFORE operands (e.g. +AB). (2) Postfix — operator is written AFTER operands (e.g. AB+). The standard form we use in maths with operator between operands (A+B) is called Infix notation. The key property of Polish notation: the order of operations is completely determined by positions of operators and operands — parentheses are NOT required. Operator precedence (highest to lowest): ^ (exponent) > *,/ (multiply/divide) > +,- (add/subtract).",
        intuition: "In infix A+B*C, we need BODMAS rules to know * comes before +. In postfix ABC*+, the position alone tells us: multiply B and C first (BC*), then add A. A computer evaluating postfix needs only a stack — scan left to right, push operands, on operator pop two operands, compute, push result. No precedence rules needed. This is why compilers convert infix to postfix internally.",
        steps: [
          "INFIX TO POSTFIX MANUAL: (1) Parenthesize fully from left to right, higher-precedence operators first. (2) Move each operator to replace its corresponding right parenthesis. (3) Remove all parentheses.",
          "INFIX TO POSTFIX ALGORITHM: Push '(' onto stack, append ')' to expression. Scan left to right: operand→add to output. '('→push. operator→pop higher/equal precedence operators to output, then push. ')'→pop until '(' (discard both parens).",
          "EVALUATE POSTFIX: scan left to right. Operand→push. Operator→pop two operands (b=pop, a=pop), compute a⊕b, push result. Final answer = stack top.",
          "PRECEDENCE: ^ (3, right-assoc) > */ (2) > +- (1). When comparing operators at step 2, right-associative ^ does NOT pop equal precedence.",
          "EXAMPLE A+B*C: fully parenthesized = A+(B*C). Postfix = ABC*+.",
          "EXAMPLE (A+B)*(C-D): postfix = AB+CD-*."
        ],
        dryRun: `── INFIX TO POSTFIX: A + B * C ─────────────────────
Infix:  A + B * C
Step 1: A + (B * C)        [* higher than +]
Step 2: A + (BC*)          [move * inside right paren]
Step 3: A(BC*)+ → ABC*+   [move + inside right paren]
Postfix: ABC*+ ✓

── INFIX TO POSTFIX: (A+B)/(C-D) ───────────────────
(A+B) → (AB+)
(C-D) → (CD-)
(AB+)/(CD-) → AB+CD-/
Postfix: AB+CD-/ ✓

── EVALUATE POSTFIX: 2 3 4 * + ──────────────────────
Scan '2': push → [2]
Scan '3': push → [2,3]
Scan '4': push → [2,3,4]
Scan '*': pop 4,3 → 3*4=12 → push → [2,12]
Scan '+': pop 12,2 → 2+12=14 → push → [14]
Result = 14 ✓   (same as 2 + 3*4 = 14 infix)

── INFIX TO POSTFIX ALGORITHM TRACE: A+B*C ──────────
Stack: [(]  Output: ""
Scan A: output → "A"
Scan +: stack=[(,+]  Output: "A"
Scan B: output → "AB"
Scan *: * > + so push → stack=[(,+,*]  Output: "AB"
Scan C: output → "ABC"
Scan ): pop * → "ABC*", pop + → "ABC*+", pop (
Output: ABC*+ ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) stack",
        stable: undefined,
        when: "Compilers use infix→postfix conversion to generate machine instructions. Calculators evaluate postfix internally. Exam questions on expression conversion are very common.",
        pros: [
          "Postfix/Prefix remove need for parentheses and precedence rules",
          "Postfix evaluation is simple O(n) single-pass with a stack",
          "Unambiguous — position alone determines order of operations"
        ],
        cons: [
          "Less human-readable than infix",
          "Requires knowledge of algorithm for conversion",
          "Right-associative operators (^) need special handling"
        ],
        cpp: `// Evaluate Postfix Expression — C++
#include <stack>
#include <string>
int evalPostfix(string expr) {
    stack<int> st;
    for (char c : expr) {
        if (isdigit(c)) {
            st.push(c - '0');    // push operand
        } else {
            int b = st.top(); st.pop();  // second operand
            int a = st.top(); st.pop();  // first operand
            if (c == '+') st.push(a + b);
            if (c == '-') st.push(a - b);
            if (c == '*') st.push(a * b);
            if (c == '/') st.push(a / b);
        }
    }
    return st.top();  // final result
}

// Infix to Postfix — C++
int prec(char c){
    if(c=='^') return 3;
    if(c=='*'||c=='/') return 2;
    if(c=='+'||c=='-') return 1;
    return 0;
}
string infixToPostfix(string s) {
    stack<char> st; string result = "";
    for (char c : s) {
        if (isalnum(c)) result += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (st.top() != '(') { result+=st.top(); st.pop(); }
            st.pop();
        } else {
            while (!st.empty() && prec(st.top()) >= prec(c))
                { result += st.top(); st.pop(); }
            st.push(c);
        }
    }
    while (!st.empty()) { result += st.top(); st.pop(); }
    return result;
}`,
        python: `# Evaluate Postfix Expression — Python
def eval_postfix(expr):
    stack = []
    for token in expr.split():
        if token.lstrip('-').isdigit():
            stack.append(int(token))   # push operand
        else:
            b = stack.pop()  # second operand
            a = stack.pop()  # first operand
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            elif token == '/': stack.append(int(a / b))
    return stack[0]  # result

# Infix to Postfix — Python
def infix_to_postfix(expr):
    prec = {'^':3, '*':2, '/':2, '+':1, '-':1, '(':0}
    stack, result = [], []
    for c in expr:
        if c.isalnum(): result.append(c)
        elif c == '(': stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(': result.append(stack.pop())
            stack.pop()  # remove '('
        else:
            while stack and prec.get(stack[-1],0) >= prec[c]:
                result.append(stack.pop())
            stack.append(c)
    while stack: result.append(stack.pop())
    return ''.join(result)

# Test: A+B*C → ABC*+
print(infix_to_postfix("A+B*C"))  # ABC*+`,
        practice: [
          { name: "Evaluate Reverse Polish Notation", diff: "medium" },
          { name: "Basic Calculator II (infix with +,-,*,/)", diff: "medium" },
          { name: "Basic Calculator (with parentheses)", diff: "hard" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Four critical stack patterns appear repeatedly in interviews: (1) Balanced Parentheses — push opening brackets, on closing bracket check and match top. (2) Next Greater Element — use a decreasing monotonic stack; when current element is greater than stack top, the top's NGE is current element. (3) Monotonic Stack — maintains elements in increasing or decreasing order; processes each element in O(1) amortised giving O(n) total. (4) Min Stack — store (value, current_min) pairs so getMin() is O(1).",
        intuition: "Monotonic stack insight: each element is pushed and popped at most once → O(n) total even though there's a nested while loop. This is the amortised analysis. For balanced parentheses: a closing bracket can only be valid if it matches the most recent unmatched opening bracket — exactly what a stack top gives you.",
        steps: [
          "BALANCED PARENS: for each char: if '(' or '[' or '{' → push. If ')' or ']' or '}': check empty (invalid), pop and verify match. At end: stack must be empty.",
          "NEXT GREATER ELEMENT: for each element, while stack not empty AND current > stack.top(): stack.top()'s NGE = current, pop. Push current. After loop, remaining elements have no NGE (-1).",
          "PREVIOUS SMALLER ELEMENT: same as NGE but looking backward — pop while stack.top() >= current, then PSE = stack.top() (or -1 if empty), then push current.",
          "MIN STACK: push (val, min(val, current_min)). getMin() returns top's second element. Pop removes pair.",
          "LARGEST RECTANGLE IN HISTOGRAM: use stack. For each bar: while stack top bar >= current bar height, pop and calculate area (height × width). Width = current_index - stack.top() - 1.",
          "STOCK SPAN: for each price, pop while stack.top() price <= current price. Span = current_index - stack.top() (or current_index+1 if empty). Push current index."
        ],
        dryRun: `── BALANCED PARENTHESES: "{[()]}" ───────────────────
Scan '{': push → [{]
Scan '[': push → [{,[]
Scan '(': push → [{,[,(]
Scan ')': pop '(' → match ')' ✓ stack=[{,[]
Scan ']': pop '[' → match ']' ✓ stack=[{]
Scan '}': pop '{' → match '}' ✓ stack=[]
Stack empty → VALID ✓

── NEXT GREATER ELEMENT [4,5,2,10,8] ────────────────
i=0: push 4     → stack=[4]
i=1: 5>4 → NGE[4]=5, pop. Push 5 → stack=[5]
i=2: 2<5 → push  → stack=[5,2]
i=3: 10>2 → NGE[2]=10, pop. 10>5 → NGE[5]=10, pop. Push 10 → stack=[10]
i=4: 8<10 → push → stack=[10,8]
End: stack=[10,8] → NGE[10]=-1, NGE[8]=-1
Result: NGE = [5, 10, 10, -1, -1] ✓

── MIN STACK: push 5,3,7,2 ──────────────────────────
push(5): stack=[(5,5)]          getMin()=5
push(3): stack=[(5,5),(3,3)]    getMin()=3
push(7): stack=[(5,5),(3,3),(7,3)] getMin()=3
push(2): stack=[(5,5),(3,3),(7,3),(2,2)] getMin()=2
pop():   stack=[(5,5),(3,3),(7,3)] getMin()=3 ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n)",
        stable: undefined,
        when: "Balanced parens → any parsing/compiler problem. NGE/PSE → histogram, stock span, trap water. Monotonic stack → range problems where you need nearest greater/smaller. Min stack → when O(1) minimum with push/pop is needed.",
        pros: [
          "Monotonic stack: O(n) amortised — each element pushed and popped at most once",
          "NGE/PSE solves problems that naïve O(n²) approach misses",
          "Min stack achieves O(1) getMin with only O(n) extra space"
        ],
        cons: [
          "Monotonic stack logic requires careful order (push before or after pop?)",
          "Off-by-one errors common in histogram/span problems",
          "Multiple variations (NGE, PSE, NSE, PGE) easy to confuse"
        ],
        cpp: `// Important Stack Patterns — C++

// 1. Balanced Parentheses
bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c=='('||c=='['||c=='{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c==')' && top!='(') return false;
            if (c==']' && top!='[') return false;
            if (c=='}' && top!='{') return false;
        }
    }
    return st.empty();
}

// 2. Next Greater Element — O(n)
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> res(n, -1);
    stack<int> st; // store indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            res[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return res; // remaining in stack have no NGE → -1
}

// 3. Min Stack — O(1) getMin
class MinStack {
    stack<pair<int,int>> st; // {val, current_min}
public:
    void push(int x) {
        int mn = st.empty() ? x : min(x, st.top().second);
        st.push({x, mn});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};`,
        python: `# Important Stack Patterns — Python

# 1. Balanced Parentheses
def is_balanced(s):
    stack = []
    match = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in '([{': stack.append(c)
        elif c in ')]}':
            if not stack or stack[-1] != match[c]: return False
            stack.pop()
    return len(stack) == 0

# 2. Next Greater Element — O(n)
def next_greater(arr):
    n = len(arr)
    res = [-1] * n
    stack = []  # store indices
    for i in range(n):
        while stack and arr[stack[-1]] < arr[i]:
            res[stack.pop()] = arr[i]
        stack.append(i)
    return res  # remaining indices have no NGE

# 3. Min Stack — O(1) getMin
class MinStack:
    def __init__(self): self.stack = []  # (val, min_so_far)

    def push(self, x):
        mn = x if not self.stack else min(x, self.stack[-1][1])
        self.stack.append((x, mn))

    def pop(self): self.stack.pop()
    def top(self): return self.stack[-1][0]
    def get_min(self): return self.stack[-1][1]

# 4. Reverse string using stack
def reverse_string(s):
    stack = list(s)    # push all chars
    return ''.join(stack.pop() for _ in range(len(stack)))`,
        practice: [
          { name: "Valid Parentheses", diff: "easy" },
          { name: "Next Greater Element I", diff: "easy" },
          { name: "Min Stack", diff: "medium" },
          { name: "Largest Rectangle in Histogram", diff: "hard" },
          { name: "Daily Temperatures (NGE variant)", diff: "medium" },
          { name: "Trapping Rain Water", diff: "hard" }
        ]
      },
      "Applications & Complexity": {
        diff: "easy",
        explanation: "Stack operations are all O(1). Space is O(n) for n elements. Real-world applications: (1) Undo/Redo in text editors — each action pushed onto undo stack; undo pops it. (2) Browser history — Back button pops from history stack. (3) Function call management — the call stack stores return addresses and local variables; recursion uses the call stack. (4) Expression evaluation — compilers convert infix to postfix, then evaluate. (5) DFS (Depth First Search) — uses an explicit or implicit (recursion) stack. (6) Syntax parsing in compilers. From the textbook chapter: 'monotonic stack is very important for competitive programming.'",
        intuition: "Every recursive function call implicitly uses the call stack. When you call f(n) which calls f(n-1), each call frame is pushed. When a call returns, its frame is popped. Stack overflow in recursion = call stack overflow. Explicitly using a stack in DFS iteratively is equivalent to the implicit recursive call stack.",
        steps: [
          "All operations: Push O(1), Pop O(1), Peek O(1), isEmpty O(1).",
          "Space complexity: O(n) where n = number of elements stored.",
          "Array vs Linked List: Array faster (no allocation overhead), fixed size. LL dynamic, extra pointer memory.",
          "Recursion = implicit stack. Every function call pushes a frame. Return pops it.",
          "Monotonic Stack: each element pushed and popped at most once → O(n) amortised for the whole array.",
          "Stack overflow: too deep recursion or array-based stack exceeds MAXSIZE."
        ],
        dryRun: `Operation Complexity Summary:
Operation | Time  | Space | Notes
──────────┼───────┼───────┼──────────────────────────
Push      | O(1)  | O(1)  | Increment top, assign
Pop       | O(1)  | O(1)  | Return top, decrement top
Peek      | O(1)  | O(1)  | Read top, no change
isEmpty   | O(1)  | O(1)  | Check top == -1
isFull    | O(1)  | O(1)  | Check top == MAXSIZE-1

Array vs Linked List:
Feature      | Array Stack    | LL Stack
─────────────┼────────────────┼────────────────
Size         | Fixed          | Dynamic
Speed        | Faster         | Slightly slower
Overflow     | Yes (at max)   | Only if OOM
Memory       | Contiguous     | Scattered
Extra space  | None           | Pointer per node

Real-world applications:
  ✓ Undo/Redo in editors (Ctrl+Z)
  ✓ Browser back/forward navigation
  ✓ Function call stack (recursion)
  ✓ Expression evaluation (compilers)
  ✓ Syntax parsing (bracket matching)
  ✓ DFS graph traversal`,
        time: { best: "O(1) all ops", avg: "O(1) all ops", worst: "O(1) all ops" },
        space: "O(n)",
        stable: undefined,
        when: "Any time LIFO access is needed. The call stack is already a stack. Expression parsing, undo systems, DFS are all natural stack applications.",
        pros: [
          "Simplest O(1) data structure for LIFO",
          "Works in O(n) for most common interview problems via monotonic stack",
          "STL stack / Python list make implementation trivial"
        ],
        cons: [
          "Only top element accessible — no random access",
          "Array stack has fixed size — must set MAXSIZE carefully"
        ],
        cpp: `// Stack Applications — C++

// 1. Reverse a string using stack
string reverseStr(string s) {
    stack<char> st;
    for (char c : s) st.push(c);
    string res = "";
    while (!st.empty()) { res += st.top(); st.pop(); }
    return res;
}

// 2. DFS using explicit stack (no recursion)
void dfs(vector<vector<int>>& adj, int start) {
    stack<int> st;
    vector<bool> visited(adj.size(), false);
    st.push(start);
    while (!st.empty()) {
        int node = st.top(); st.pop();
        if (visited[node]) continue;
        visited[node] = true;
        cout << node << " ";
        for (int nb : adj[node])
            if (!visited[nb]) st.push(nb);
    }
}

// 3. Stock Span Problem — O(n)
vector<int> stockSpan(vector<int>& prices) {
    int n = prices.size();
    vector<int> span(n);
    stack<int> st; // store indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && prices[st.top()] <= prices[i])
            st.pop();
        span[i] = st.empty() ? i+1 : i - st.top();
        st.push(i);
    }
    return span;
}`,
        python: `# Stack Applications — Python

# 1. Reverse string using stack
def reverse_str(s):
    stack = list(s)
    return ''.join(stack.pop() for _ in range(len(stack)))

# 2. DFS using explicit stack
def dfs_iterative(adj, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node); order.append(node)
        for nb in adj[node]:
            if nb not in visited: stack.append(nb)
    return order

# 3. Simulate call stack (recursion → iteration)
def factorial_stack(n):
    stack = []
    result = 1
    while n > 1:
        stack.append(n)
        n -= 1
    while stack:
        result *= stack.pop()
    return result

# Stack vs Queue comparison
# Stack: LIFO, one end (top)
# Queue: FIFO, two ends (front for dequeue, back for enqueue)
# Deque: flexible, both ends — superset of both`,
        practice: [
          { name: "Implement Stack using Queues", diff: "medium" },
          { name: "Stock Span Problem", diff: "medium" },
          { name: "Evaluate Postfix Expression", diff: "medium" },
          { name: "Largest Rectangle in Histogram", diff: "hard" },
          { name: "Trapping Rain Water (stack approach)", diff: "hard" }
        ]
      }
    }
  },
  Queue: {
    icon: "🎫", diff: "easy",
    desc: "FIFO structure. Insert at rear, remove from front. Powers BFS, scheduling, buffering, and sliding window maximum.",
    subtopics: {
      "Basics & FIFO": {
        diff: "easy",
        explanation: "A Queue is a linear data structure that follows the FIFO principle — First In, First Out. The element inserted first will be removed first. Core terms: Front — the position from where elements are removed. Rear — the position where elements are inserted. Enqueue — add an element at the rear. Dequeue — remove an element from the front. Peek/Front — return the front element without removing it. isEmpty — check if queue is empty. isFull — check if queue is full (array implementation only). Think of it like a line at a ticket counter: the person who comes first gets served first. Order matters. No jumping in between.",
        intuition: "Imagine standing in a queue for food: you join at the end (enqueue) and the first person gets served and leaves (dequeue). Unlike a stack where the last person in gets served first (LIFO), a queue is fair — first come, first served. This makes queues essential wherever the order of processing must be preserved: CPU scheduling, print jobs, network buffers, BFS.",
        steps: [
          "Initialize: front=0, rear=-1 (array) OR front=NULL, rear=NULL (linked list).",
          "ENQUEUE(x): Check if full. rear++. arr[rear]=x. O(1).",
          "DEQUEUE: Check if empty (front>rear). Save arr[front]. front++. Return saved value. O(1).",
          "PEEK: Return arr[front] without changing front or rear. O(1).",
          "isEmpty: return front > rear (array) OR front == NULL (linked list).",
          "isFull (array): return rear == size-1."
        ],
        dryRun: `Start: queue=[], front=0, rear=-1

Enqueue(10): rear=0, arr[0]=10  → [10]  front=0,rear=0
Enqueue(20): rear=1, arr[1]=20  → [10,20] front=0,rear=1
Enqueue(30): rear=2, arr[2]=30  → [10,20,30] front=0,rear=2
Enqueue(40): rear=3, arr[3]=40  → [10,20,30,40]

Dequeue(): return arr[0]=10, front=1 → [20,30,40]
Dequeue(): return arr[1]=20, front=2 → [30,40]

Peek(): return arr[front]=arr[2]=30 (no change) ✓

isEmpty? front(2) > rear(3)? NO → not empty
isEmpty after all dequeues: front > rear → YES ✓`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n)",
        stable: undefined,
        when: "Use a queue whenever FIFO order matters: BFS, level-order tree traversal, task scheduling, print spooling, network buffers, sliding window problems.",
        pros: [
          "All core operations O(1) — enqueue, dequeue, peek",
          "Natural model for scheduling and buffering",
          "BFS and level-order traversal require a queue",
          "Python deque gives O(1) for both ends"
        ],
        cons: [
          "Array-based: wasted space after dequeues (front pointer advances but space not reused) — solved by circular queue",
          "Python list pop(0) is O(n) — use collections.deque instead",
          "No random access — only front element accessible"
        ],
        cpp: `// Queue — Array-based (Simple)
class Queue {
    int front, rear, size;
    int* arr;
public:
    Queue(int s) {
        size = s; arr = new int[size];
        front = 0; rear = -1;
    }
    void enqueue(int x) {
        if (rear == size - 1) { cout << "Queue Full\n"; return; }
        arr[++rear] = x;
    }
    void dequeue() {
        if (front > rear) { cout << "Queue Empty\n"; return; }
        front++;  // just advance front pointer
    }
    int peek() {
        if (front > rear) return -1;
        return arr[front];
    }
    bool isEmpty() { return front > rear; }
};

// STL queue (preferred in interviews)
#include <queue>
queue<int> q;
q.push(10);        // enqueue
q.push(20);
int f = q.front(); // peek — 10
q.pop();           // dequeue — removes 10
bool empty = q.empty();
int sz = q.size();`,
        python: `# Queue — Python list (simple but pop(0) is O(n))
class Queue:
    def __init__(self): self.queue = []

    def enqueue(self, x): self.queue.append(x)  # O(1)

    def dequeue(self):
        if not self.queue: return None
        return self.queue.pop(0)  # O(n) — SLOW for large n

    def peek(self):
        return self.queue[0] if self.queue else None

# ✓ PREFERRED: collections.deque — O(1) both ends
from collections import deque
q = deque()
q.append(10)     # enqueue at rear  — O(1)
q.append(20)
q.append(30)
x = q.popleft()  # dequeue from front — O(1) ✓
print(q[0])      # peek front — O(1)
print(len(q))    # size`,
        practice: [
          { name: "Implement Queue using Array", diff: "easy" },
          { name: "Number of Recent Calls", diff: "easy" },
          { name: "Design Circular Queue", diff: "medium" }
        ]
      },
      "Types of Queues": {
        diff: "medium",
        explanation: "Four main types: (1) Simple Queue — basic FIFO. Insert at rear, remove from front. Problem: after many dequeues, front advances and rear hits array end even if space exists at the front — wasted space. (2) Circular Queue — last position connects back to first using modulo arithmetic. rear=(rear+1)%size. Fixes wasted space problem. (3) Priority Queue — elements processed by priority, not insertion order. Implemented with a heap. O(log n) enqueue/dequeue. (4) Deque (Double Ended Queue) — insertion and deletion allowed at BOTH ends. Input-restricted deque: insert only at rear. Output-restricted deque: delete only from front. Python's collections.deque is a deque.",
        intuition: "Simple queue wastes array space — imagine 100 dequeues moving front to index 100, but rear is also at 100, so the queue appears full while indices 0–99 are empty. Circular queue solves this by treating the array as a ring. Priority queue is a heap in disguise. Deque is the most flexible — you can use it as both a stack AND a queue.",
        steps: [
          "SIMPLE QUEUE: enqueue at rear++, dequeue from front++. Full when rear==size-1 (even if space at front).",
          "CIRCULAR QUEUE: enqueue: rear=(rear+1)%size. Dequeue: front=(front+1)%size. Full: (rear+1)%size==front. Empty: front==rear.",
          "PRIORITY QUEUE: backed by a max-heap (or min-heap). Enqueue: insert and bubble up O(log n). Dequeue: remove root and heapify down O(log n).",
          "DEQUE: supports appendleft()/appendright() and popleft()/popright(). All O(1) with doubly linked list.",
          "CIRCULAR QUEUE advantage: utilises all n slots. No wasted space after front advances.",
          "Python collections.deque is implemented as a doubly-linked list of fixed-size blocks — O(1) for both ends."
        ],
        dryRun: `── CIRCULAR QUEUE (size=4) ────────────────────────────
front=0, rear=0 (empty when front==rear)

Enqueue(10): rear=(0+1)%4=1 → arr[1]=10
Enqueue(20): rear=(1+1)%4=2 → arr[2]=20
Enqueue(30): rear=(2+1)%4=3 → arr[3]=30
Full? (rear+1)%4==front? (3+1)%4=0==0 YES → FULL ✓

Dequeue(): val=arr[front=0]? No, front=0 is sentinel.
  (Implementation: val=arr[front+1], front=(front+1)%size)
  Return 10. front=1

Enqueue(40): rear=(3+1)%4=0 → arr[0]=40 (wraps around!) ✓
Circular saves slot that was freed by dequeue ✓

── PRIORITY QUEUE [5,3,8,1] (min-heap) ──────────────
Insert 5: [5]
Insert 3: [3,5]    (3<5, bubble up)
Insert 8: [3,5,8]
Insert 1: [1,5,8,3] (bubble up to root) → min always at front
Dequeue → returns 1 ✓  (highest priority = smallest)`,
        time: { best: "O(1) simple/circular", avg: "O(log n) priority", worst: "O(log n) priority" },
        space: "O(n)",
        stable: undefined,
        when: "Simple queue: default. Circular: when array-based and space efficiency matters. Priority queue: task scheduling by priority, Dijkstra's, Prim's. Deque: sliding window maximum, palindrome check, implementing both stack and queue.",
        pros: [
          "Circular queue: no wasted space — reuses freed slots",
          "Priority queue: O(log n) access to max/min element always",
          "Deque: O(1) both ends — most flexible queue variant"
        ],
        cons: [
          "Circular queue: full/empty condition check is tricky (off-by-one)",
          "Priority queue: O(log n) vs O(1) for simple queue",
          "Deque: more complex implementation than simple queue"
        ],
        cpp: `// Circular Queue — C++
class CircularQueue {
    int* arr; int front, rear, size, count;
public:
    CircularQueue(int s): size(s), front(0), rear(0), count(0) {
        arr = new int[size];
    }
    bool isFull()  { return count == size; }
    bool isEmpty() { return count == 0; }

    void enqueue(int x) {
        if (isFull()) { cout << "Full\n"; return; }
        arr[rear] = x;
        rear = (rear + 1) % size;  // wrap around!
        count++;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Empty\n"; return -1; }
        int val = arr[front];
        front = (front + 1) % size; // wrap around!
        count--;
        return val;
    }
};

// Priority Queue — C++ STL (max-heap by default)
#include <queue>
priority_queue<int> pq;     // max-heap
pq.push(5); pq.push(3); pq.push(8);
cout << pq.top(); // 8 (maximum)
pq.pop();

// Min-heap
priority_queue<int,vector<int>,greater<int>> minPQ;

// Deque
#include <deque>
deque<int> dq;
dq.push_front(1); dq.push_back(2);
dq.pop_front();   dq.pop_back();`,
        python: `# Circular Queue — Python
class CircularQueue:
    def __init__(self, size):
        self.arr = [0] * size
        self.front = self.rear = 0
        self.size = size
        self.count = 0

    def is_full(self): return self.count == self.size
    def is_empty(self): return self.count == 0

    def enqueue(self, x):
        if self.is_full(): return False
        self.arr[self.rear] = x
        self.rear = (self.rear + 1) % self.size  # wrap!
        self.count += 1; return True

    def dequeue(self):
        if self.is_empty(): return -1
        val = self.arr[self.front]
        self.front = (self.front + 1) % self.size  # wrap!
        self.count -= 1; return val

# Priority Queue — Python (min-heap by default)
import heapq
pq = []
heapq.heappush(pq, 5)
heapq.heappush(pq, 3)
heapq.heappush(pq, 8)
print(heapq.heappop(pq))  # 3 (minimum first)

# Max-heap trick: negate values
heapq.heappush(pq, -8)
print(-heapq.heappop(pq)) # 8

# Deque — Python collections.deque (doubly-linked)
from collections import deque
dq = deque()
dq.appendleft(1); dq.append(2)  # both O(1)
dq.popleft();     dq.pop()       # both O(1)`,
        practice: [
          { name: "Design Circular Queue", diff: "medium" },
          { name: "Design Circular Deque", diff: "medium" },
          { name: "Kth Largest Element (Priority Queue)", diff: "medium" }
        ]
      },
      "Queue using Two Stacks": {
        diff: "medium",
        explanation: "A classic interview problem: implement a Queue using only two Stacks (FIFO using LIFO). Idea: Use Stack1 for enqueue and Stack2 for dequeue. When dequeue is called and Stack2 is empty, pour all elements from Stack1 into Stack2 (reversing the order). Now Stack2's top is the oldest element — pop it for dequeue. Key insight: pouring once for a batch of dequeues means each element is moved at most twice (push to S1, move to S2) → O(1) amortised dequeue.",
        intuition: "Stack1 reverses insertion order. Stack2 reverses it again, restoring FIFO. Two reversals = original order. The expensive pour (O(n)) only happens when Stack2 is empty, and each element is poured at most once → amortised O(1) per operation.",
        steps: [
          "ENQUEUE(x): Always push x onto Stack1. O(1).",
          "DEQUEUE: If Stack2 is empty: pop all elements from Stack1 and push them onto Stack2. Pop from Stack2. If Stack2 was not empty: just pop from Stack2.",
          "PEEK: Same as dequeue but peek Stack2.top() instead of popping.",
          "isEmpty: Both Stack1 and Stack2 must be empty.",
          "AMORTISED ANALYSIS: Each element enters S1 once (O(1)), moves to S2 once (O(1)), leaves S2 once (O(1)). Total O(3n) = O(n) for n operations → O(1) amortised each.",
          "VARIATION — Queue using 1 Stack + Recursion: On dequeue, recursively pop all, save bottom, push all back. O(n) per dequeue — much worse."
        ],
        dryRun: `Enqueue(1): S1=[1],  S2=[]
Enqueue(2): S1=[1,2], S2=[]
Enqueue(3): S1=[1,2,3], S2=[]

Dequeue():
  S2 is empty → pour S1 into S2:
    pop 3 → push to S2: S2=[3]
    pop 2 → push to S2: S2=[3,2]
    pop 1 → push to S2: S2=[3,2,1]  S1=[]
  pop S2 → return 1 ✓ (FIFO order preserved!)
  S1=[], S2=[3,2]

Dequeue():
  S2 not empty → pop S2 → return 2 ✓
  S2=[3]

Enqueue(4): S1=[4], S2=[3]

Dequeue():
  S2 not empty → pop S2 → return 3 ✓
  S2=[], S1=[4]

Dequeue():
  S2 empty → pour S1: S2=[4], S1=[]
  pop S2 → return 4 ✓`,
        time: { best: "O(1) enqueue", avg: "O(1) amortised", worst: "O(n) dequeue (pour)" },
        space: "O(n)",
        stable: undefined,
        when: "Asked directly in interviews. Also tests understanding of amortised analysis. Reverse: implement Stack using two Queues (O(n) push or O(n) pop).",
        pros: [
          "O(1) amortised dequeue — not O(n) each time",
          "Elegant use of two LIFO structures to achieve FIFO",
          "Classic demonstration of amortised analysis"
        ],
        cons: [
          "Worst-case single dequeue is O(n) — bad for real-time systems",
          "More complex than a direct queue implementation"
        ],
        cpp: `// Queue using Two Stacks — C++
#include <stack>
class MyQueue {
    stack<int> s1, s2; // s1=enqueue, s2=dequeue
public:
    // Enqueue — always push to s1, O(1)
    void push(int x) { s1.push(x); }

    // Pour s1 into s2 when s2 is empty
    void pour() {
        if (s2.empty())
            while (!s1.empty()) {
                s2.push(s1.top()); s1.pop();
            }
    }

    // Dequeue — O(1) amortised
    int pop() {
        pour();
        int val = s2.top(); s2.pop();
        return val;
    }

    // Peek front — O(1) amortised
    int peek() { pour(); return s2.top(); }

    bool empty() { return s1.empty() && s2.empty(); }
};`,
        python: `# Queue using Two Stacks — Python
class MyQueue:
    def __init__(self):
        self.s1 = []  # enqueue stack
        self.s2 = []  # dequeue stack

    # Enqueue — always push to s1, O(1)
    def push(self, x): self.s1.append(x)

    def _pour(self):
        # Pour s1 into s2 only when s2 is empty
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())

    # Dequeue — O(1) amortised
    def pop(self):
        self._pour()
        return self.s2.pop()

    # Peek — O(1) amortised
    def peek(self):
        self._pour()
        return self.s2[-1]

    def empty(self):
        return not self.s1 and not self.s2

# Test
q = MyQueue()
q.push(1); q.push(2); q.push(3)
print(q.pop())  # 1 ✓ FIFO
print(q.peek()) # 2 ✓`,
        practice: [
          { name: "Implement Queue using Stacks (LeetCode 232)", diff: "easy" },
          { name: "Implement Stack using Queues (LeetCode 225)", diff: "easy" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Four critical queue patterns: (1) BFS (Breadth First Search) — use a queue to explore level by level. All nodes at distance k are processed before nodes at distance k+1. (2) Level Order Traversal — BFS on trees. Process each level by enqueueing children. (3) Sliding Window Maximum (Monotonic Deque) — use a deque maintaining a decreasing sequence of indices. For each new element, remove smaller elements from rear; remove out-of-window elements from front. O(n). (4) First Non-Repeating Character in Stream — use queue to track candidates; character becomes repeating when its frequency > 1.",
        intuition: "BFS explores by layers — a queue naturally enforces this because the first nodes enqueued (neighbours at distance 1) are dequeued first. Monotonic deque for sliding window: the deque always stores indices of potential maximums in decreasing order, so the front is always the current window's maximum. When window slides, pop front if it's out of range.",
        steps: [
          "BFS: enqueue start. While queue not empty: dequeue u, process u, enqueue all unvisited neighbours of u.",
          "LEVEL ORDER: enqueue root. While queue not empty: process all nodes at current level (queue size = level size). Enqueue their children.",
          "SLIDING WINDOW MAX (k window): for each i: remove from rear while arr[deque.rear] <= arr[i]. Remove front if out of window (deque.front <= i-k). Enqueue i. Max = arr[deque.front].",
          "GENERATE BINARY NUMBERS 1..n: enqueue '1'. Loop: dequeue s, print s, enqueue s+'0' and s+'1'.",
          "ROTTEN ORANGES: multi-source BFS. Enqueue all initially rotten oranges. BFS spreads rot level by level. Count minutes = levels.",
          "FIRST NON-REPEATING: maintain a queue. On new char: update freq. While queue front's freq > 1: dequeue. Answer = queue front (or -1 if empty)."
        ],
        dryRun: `── BFS on graph 0→1,0→2,1→3,2→3 ──────────────────
Start: enqueue 0 → queue=[0], visited={0}
Dequeue 0: neighbours 1,2 → enqueue → queue=[1,2], visited={0,1,2}
Dequeue 1: neighbour 3 → enqueue → queue=[2,3], visited={0,1,2,3}
Dequeue 2: neighbour 3 → already visited, skip → queue=[3]
Dequeue 3: no unvisited neighbours → queue=[]
BFS order: 0,1,2,3 ✓

── SLIDING WINDOW MAX [1,3,-1,-3,5,3,6,7], k=3 ──────
i=0: deq=[0]  (arr[0]=1)
i=1: 3>1 → remove 0, deq=[1]  (arr[1]=3)
i=2: -1<3 → deq=[1,2]   window[0..2]: max=arr[1]=3 ✓
i=3: -3<-1 → deq=[1,2,3] window[1..3]: max=arr[1]=3 ✓
i=4: 5>-3,5>-1,5>3 → remove all, deq=[4] max=arr[4]=5 ✓
i=5: 3<5 → deq=[4,5]  max=arr[4]=5 ✓
i=6: 6>3,6>5 → deq=[6]  max=arr[6]=6 ✓
i=7: 7>6 → deq=[7]  max=arr[7]=7 ✓
Result: [3,3,5,5,6,7] ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) BFS / O(k) sliding window",
        stable: undefined,
        when: "BFS/level-order → always use queue. Sliding window max → monotonic deque. Rotten oranges/shortest path in grid → multi-source BFS. First non-repeating → queue + freq map.",
        pros: [
          "BFS guarantees shortest path in unweighted graphs",
          "Monotonic deque gives O(n) sliding window max vs O(nk) brute force",
          "Level order traversal is the natural tree BFS"
        ],
        cons: [
          "BFS uses O(V) space for the queue",
          "Monotonic deque logic requires careful boundary checks",
          "Multi-source BFS initialization (all sources at once) is non-obvious"
        ],
        cpp: `// Queue Patterns — C++

// 1. BFS — O(V+E)
void bfs(vector<vector<int>>& adj, int start) {
    queue<int> q;
    vector<bool> vis(adj.size(), false);
    q.push(start); vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u])
            if (!vis[v]) { vis[v]=true; q.push(v); }
    }
}

// 2. Level Order Traversal
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    queue<TreeNode*> q; q.push(root);
    vector<vector<int>> res;
    while (!q.empty()) {
        int sz = q.size(); // current level size
        vector<int> level;
        for (int i = 0; i < sz; i++) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}

// 3. Sliding Window Maximum — O(n)
vector<int> maxSlidingWindow(vector<int>& arr, int k) {
    deque<int> dq; // stores indices, decreasing values
    vector<int> res;
    for (int i = 0; i < arr.size(); i++) {
        // remove out-of-window indices from front
        while (!dq.empty() && dq.front() <= i-k) dq.pop_front();
        // remove smaller elements from rear
        while (!dq.empty() && arr[dq.back()] <= arr[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k-1) res.push_back(arr[dq.front()]);
    }
    return res;
}`,
        python: `# Queue Patterns — Python

# 1. BFS — O(V+E)
from collections import deque
def bfs(adj, start):
    visited = {start}
    q = deque([start])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in visited:
                visited.add(v); q.append(v)
    return order

# 2. Level Order Traversal
def level_order(root):
    if not root: return []
    q = deque([root]); result = []
    while q:
        level_size = len(q)
        level = []
        for _ in range(level_size):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result

# 3. Sliding Window Maximum — O(n)
def max_sliding_window(arr, k):
    dq = deque()  # stores indices, decreasing values
    result = []
    for i, x in enumerate(arr):
        # remove out-of-window from front
        while dq and dq[0] <= i - k: dq.popleft()
        # remove smaller from rear
        while dq and arr[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if i >= k - 1: result.append(arr[dq[0]])
    return result`,
        practice: [
          { name: "Binary Tree Level Order Traversal", diff: "medium" },
          { name: "Sliding Window Maximum (LeetCode 239)", diff: "hard" },
          { name: "Rotten Oranges (Multi-source BFS)", diff: "medium" },
          { name: "01 Matrix — BFS", diff: "medium" },
          { name: "Generate Binary Numbers 1 to N", diff: "easy" }
        ]
      },
      "Complexity & Applications": {
        diff: "easy",
        explanation: "All queue operations are O(1): enqueue, dequeue, peek, isEmpty. Space complexity is O(n). Important caveat: Python list.pop(0) is O(n) — always use collections.deque for O(1) dequeue in Python. Real-world applications: CPU scheduling (process queue), printer queue (jobs printed in order), network buffering (packets), call center systems, multiplayer gaming event queues, data streaming. BFS is the algorithmic backbone of shortest path in unweighted graphs, social network distance, web crawlers.",
        intuition: "A queue is the data structure of fairness. Whoever arrives first leaves first. This property makes it essential for any system where order must be preserved — OS scheduling, network packet queues, BFS. The monotonic deque is the advanced version that adds an ordering constraint to enable O(n) sliding window queries.",
        steps: [
          "Enqueue: O(1) — insert at rear.",
          "Dequeue: O(1) — remove from front. Exception: Python list.pop(0) is O(n).",
          "Peek: O(1) — read front element.",
          "isEmpty/isFull: O(1).",
          "Space: O(n) for n elements in queue.",
          "Note: Python list dequeue is O(n), deque.popleft() is O(1). C++ queue.pop() is O(1)."
        ],
        dryRun: `Operation Complexity:
Operation | Array/LL Queue | Python list | Python deque
──────────┼────────────────┼─────────────┼─────────────
Enqueue   | O(1)           | O(1) append | O(1) append
Dequeue   | O(1)           | O(n) pop(0) | O(1) popleft
Peek      | O(1)           | O(1)        | O(1)
isEmpty   | O(1)           | O(1)        | O(1)
Space     | O(n)           | O(n)        | O(n)

Queue vs Stack:
Feature    | Queue      | Stack
───────────┼────────────┼──────────
Principle  | FIFO       | LIFO
Insert     | At rear    | At top
Remove     | From front | From top
Algorithm  | BFS        | DFS

Real-world uses:
  ✓ CPU scheduling (Round Robin)
  ✓ Printer spooler (jobs in order)
  ✓ Network buffers (packets)
  ✓ BFS / shortest path
  ✓ Level-order tree traversal
  ✓ Call center (first caller served first)
  ✓ Sliding window maximum (monotonic deque)`,
        time: { best: "O(1) all ops", avg: "O(1) all ops", worst: "O(1) all ops" },
        space: "O(n)",
        stable: undefined,
        when: "Use queue for FIFO processing. Use deque for sliding window. Use priority queue for greedy algorithms (Dijkstra, Prim). Use two-stack queue to demonstrate amortised O(1).",
        pros: [
          "O(1) all operations — enqueue, dequeue, peek",
          "Natural model for scheduling, BFS, and buffering",
          "Circular queue eliminates wasted space in array implementation"
        ],
        cons: [
          "Only front element accessible — no random access",
          "Python list pop(0) is O(n) — must use deque",
          "Array simple queue wastes space (use circular queue)"
        ],
        cpp: `// Queue Applications — C++

// Generate binary numbers 1 to n using queue
vector<string> generateBinary(int n) {
    queue<string> q; q.push("1");
    vector<string> res;
    while (n--) {
        string s = q.front(); q.pop();
        res.push_back(s);
        q.push(s + "0");  // enqueue s0
        q.push(s + "1");  // enqueue s1
    }
    return res; // 1,10,11,100,101,110,111...
}

// Reverse a queue
queue<int> reverseQueue(queue<int> q) {
    stack<int> st;
    while (!q.empty()) { st.push(q.front()); q.pop(); }
    while (!st.empty()) { q.push(st.top()); st.pop(); }
    return q;
}

// First non-repeating char in stream
string firstNonRepeating(string stream) {
    unordered_map<char,int> freq;
    queue<char> q;
    string result = "";
    for (char c : stream) {
        freq[c]++;
        q.push(c);
        while (!q.empty() && freq[q.front()] > 1) q.pop();
        result += q.empty() ? '#' : q.front();
    }
    return result;
}`,
        python: `# Queue Applications — Python
from collections import deque

# Generate binary numbers 1 to n
def generate_binary(n):
    q = deque(["1"])
    result = []
    while n:
        s = q.popleft()
        result.append(s)
        q.append(s + "0")
        q.append(s + "1")
        n -= 1
    return result  # ["1","10","11","100",...]

# Reverse a queue using stack
def reverse_queue(q):
    stack = []
    while q: stack.append(q.popleft())
    while stack: q.append(stack.pop())
    return q

# First non-repeating char in stream
def first_non_repeating(stream):
    from collections import Counter
    freq = Counter()
    q = deque()
    result = []
    for c in stream:
        freq[c] += 1
        q.append(c)
        while q and freq[q[0]] > 1: q.popleft()
        result.append(q[0] if q else '#')
    return ''.join(result)`,
        practice: [
          { name: "Implement Queue using Linked List", diff: "easy" },
          { name: "Reverse a Queue", diff: "easy" },
          { name: "First Non-Repeating Character in Stream", diff: "medium" },
          { name: "Sliding Window Maximum", diff: "hard" },
          { name: "Rotten Oranges", diff: "medium" },
          { name: "Find Maximum of All Subarrays of Size K", diff: "medium" }
        ]
      }
    }
  },
  Recursion: {
    icon: "🔄", diff: "medium",
    desc: "Function calling itself. Base case + recursive case. Powers trees, backtracking, divide-and-conquer, and DP.",
    subtopics: {
      "Basics & Call Stack": {
        diff: "easy",
        explanation: "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. Instead of solving a problem in one big step, recursion breaks it down into smaller subproblems until a simple base case is reached. Every recursive function has two components: (1) Base Case — the condition where recursion stops, preventing infinite calls. (2) Recursive Case — the function calls itself with a smaller/simpler input. The Call Stack stores each active function call as a frame. Each recursive call pushes a new frame; each return pops it. Stack Overflow happens when recursion depth exceeds the stack limit (infinite recursion or very deep calls).",
        intuition: "Golden Rule: 'Do not try to solve the entire problem. Just solve one step and let recursion handle the rest.' Think of climbing stairs — to reach step n, first reach step n-1, then take one step: f(n) = f(n-1) + 1. Trust the function to correctly solve the smaller problem. This is called the leap of faith — assume the recursive call works correctly, then build on it.",
        steps: [
          "IDENTIFY BASE CASE: the simplest input where the answer is known directly (no recursion needed). e.g. factorial(0)=1, fib(0)=0, fib(1)=1.",
          "IDENTIFY RECURSIVE CASE: express the problem in terms of a smaller version of itself. e.g. factorial(n) = n × factorial(n-1).",
          "ENSURE PROGRESS: each recursive call must move toward the base case. If n decrements each call, it will reach 0.",
          "CALL STACK: each call pushes a frame (local variables + return address). Frames pop in reverse order as functions return.",
          "DRY RUN with small input: trace the call stack manually for n=3 or n=4 before coding.",
          "STACK OVERFLOW guard: for very deep recursion, use iterative + explicit stack, or increase stack size."
        ],
        dryRun: `factorial(3):

PUSH phase (calls going down):
  factorial(3) → needs 3 × factorial(2)
    factorial(2) → needs 2 × factorial(1)
      factorial(1) → needs 1 × factorial(0)
        factorial(0) → BASE CASE: return 1

POP phase (returns going up):
        return 1
      return 1 × 1 = 1
    return 2 × 1 = 2
  return 3 × 2 = 6

Answer: 6 ✓

Call Stack at deepest point:
  ┌─────────────┐ ← top
  │ factorial(0)│
  ├─────────────┤
  │ factorial(1)│
  ├─────────────┤
  │ factorial(2)│
  ├─────────────┤
  │ factorial(3)│
  └─────────────┘ ← bottom`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) call stack",
        stable: undefined,
        when: "Use recursion when the problem has natural substructure (trees, graphs, divide-and-conquer, backtracking). Prefer iteration when recursion depth is large (> 10⁴) to avoid stack overflow.",
        pros: [
          "Code is shorter and more elegant than iterative equivalents",
          "Natural fit for tree/graph traversal and backtracking",
          "Divide-and-conquer (Merge Sort, Quick Sort) are naturally recursive",
          "Makes mathematical definitions directly translatable to code"
        ],
        cons: [
          "O(n) extra space for call stack — iteration uses O(1)",
          "Stack overflow on very deep recursion",
          "Can be slower than iteration due to function call overhead",
          "Naive recursion recomputes subproblems (fix with memoization)"
        ],
        cpp: `// Recursion Basics — C++

// Factorial — O(n) time, O(n) space
int factorial(int n) {
    if (n == 0) return 1;        // base case
    return n * factorial(n - 1); // recursive case
}

// Fibonacci (naive) — O(2^n) time
int fib(int n) {
    if (n <= 1) return n;        // base cases: fib(0)=0, fib(1)=1
    return fib(n-1) + fib(n-2); // tree recursion
}

// Print 1 to n using recursion
void print1ToN(int n) {
    if (n == 0) return;   // base case
    print1ToN(n - 1);     // recurse first (to print in order)
    cout << n << " ";     // print after return
}

// Reverse a string recursively
void reverseStr(string& s, int l, int r) {
    if (l >= r) return;           // base case
    swap(s[l], s[r]);             // solve one step
    reverseStr(s, l+1, r-1);     // recurse on smaller problem
}`,
        python: `# Recursion Basics — Python

# Factorial — O(n) time, O(n) space
def factorial(n):
    if n == 0: return 1          # base case
    return n * factorial(n - 1)  # recursive case

print(factorial(5))  # 120

# Fibonacci (naive) — O(2^n) time
def fib(n):
    if n <= 1: return n          # base cases
    return fib(n-1) + fib(n-2)  # tree recursion

# Print 1 to n recursively
def print_1_to_n(n):
    if n == 0: return            # base case
    print_1_to_n(n - 1)         # recurse first
    print(n, end=" ")            # print on way back

# Reverse string recursively
def reverse_str(s):
    if len(s) <= 1: return s     # base case
    return reverse_str(s[1:]) + s[0]  # last char + recurse rest

# Check palindrome recursively
def is_palindrome(s, l=0, r=None):
    if r is None: r = len(s) - 1
    if l >= r: return True
    if s[l] != s[r]: return False
    return is_palindrome(s, l+1, r-1)`,
        practice: [
          { name: "Factorial of a Number", diff: "easy" },
          { name: "Print Numbers 1 to N (Recursion)", diff: "easy" },
          { name: "Reverse a String Recursively", diff: "easy" },
          { name: "Check Palindrome using Recursion", diff: "easy" }
        ]
      },
      "Types of Recursion": {
        diff: "medium",
        explanation: "Six types of recursion: (1) Direct Recursion — function calls itself directly: f(n)→f(n-1). (2) Indirect/Mutual Recursion — function A calls B which calls A. (3) Tail Recursion — the recursive call is the LAST operation. The compiler can optimise this to a loop (Tail Call Optimisation). (4) Non-Tail Recursion — work is done AFTER the recursive call returns. Cannot be optimised directly. (5) Linear Recursion — exactly one recursive call per function. (6) Tree Recursion — multiple recursive calls per function (e.g. Fibonacci: two calls). Tree recursion creates exponential call trees.",
        intuition: "Tail recursion: the function does nothing with the returned value except return it — the compiler can reuse the current stack frame. Non-tail: must keep the frame because there's a pending operation (like multiplying by n). Tree recursion: each call spawns multiple children — the call tree grows exponentially. Fibonacci(5) spawns a tree with ~2⁵=32 calls for n=5.",
        steps: [
          "TAIL: f(n, acc) where acc accumulates result. Last line is just return f(n-1, acc*n). No pending work.",
          "NON-TAIL: return n * f(n-1). The multiply happens AFTER f(n-1) returns → frame must be kept.",
          "LINEAR: only one path of recursion. O(n) calls. Call stack grows to depth n.",
          "TREE: two or more paths. Fibonacci: fib(n-1) AND fib(n-2). Depth=n, but nodes = O(2^n).",
          "MUTUAL: isEven(n) calls isOdd(n-1), isOdd(n) calls isEven(n-1). Base: isEven(0)=true.",
          "Convert non-tail to tail by adding accumulator parameter. Enables compiler stack optimisation."
        ],
        dryRun: `── TAIL RECURSION: factorial with accumulator ─────────
fact_tail(3, 1):
  fact_tail(2, 3):    // 3*1=3 passed as acc
    fact_tail(1, 6):  // 2*3=6 passed as acc
      fact_tail(0, 6):  // 1*6=6, base case
        return 6 ✓
No pending operations — stack frames can be reused!

── NON-TAIL: classic factorial ────────────────────────
fact(3) → 3 × fact(2)   [must keep frame, pending ×3]
  fact(2) → 2 × fact(1) [must keep frame, pending ×2]
    fact(1) → 1 × fact(0)
      fact(0) = 1
    return 1×1=1
  return 2×1=2
return 3×2=6
All frames must be kept until base case returns!

── TREE RECURSION: fib(4) ─────────────────────────────
                  fib(4)
              /          \
          fib(3)          fib(2)
         /     \         /    \
     fib(2)  fib(1)  fib(1) fib(0)
    /    \
fib(1) fib(0)
Total calls: 9 (for n=4) → O(2^n) ✗ (use memoization!)`,
        time: { best: "O(n) linear", avg: "O(n) linear", worst: "O(2^n) tree" },
        space: "O(n) call stack depth",
        stable: undefined,
        when: "Prefer tail recursion when possible (compiler can optimise). Avoid naive tree recursion for large n (use memoization). Linear recursion for simple divide-and-conquer.",
        pros: [
          "Tail recursion: O(1) space with compiler optimisation (TCO)",
          "Linear recursion: simple O(n) stack space",
          "Tree recursion: elegant for problems with natural branching"
        ],
        cons: [
          "Tree recursion: O(2^n) calls without memoization — catastrophically slow",
          "Non-tail: all frames must be kept until base case",
          "Python does NOT optimise tail calls — always O(n) stack"
        ],
        cpp: `// Types of Recursion — C++

// 1. Tail Recursion (accumulator pattern)
int factTail(int n, int acc = 1) {
    if (n == 0) return acc;         // base case
    return factTail(n-1, n * acc);  // last op = recursive call ✓
}

// 2. Non-Tail Recursion (pending multiplication)
int factNonTail(int n) {
    if (n == 0) return 1;
    return n * factNonTail(n-1);   // pending × after return ✗
}

// 3. Tree Recursion (two recursive calls)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);   // two branches → O(2^n) ✗
}

// 4. Mutual/Indirect Recursion
bool isEven(int n);
bool isOdd(int n) {
    if (n == 0) return false;
    return isEven(n - 1);  // calls isEven
}
bool isEven(int n) {
    if (n == 0) return true;
    return isOdd(n - 1);   // calls isOdd
}`,
        python: `# Types of Recursion — Python

# 1. Tail Recursion (accumulator)
# Note: Python does NOT optimise tail calls
def fact_tail(n, acc=1):
    if n == 0: return acc
    return fact_tail(n-1, n * acc)  # last op = recursive call

# 2. Non-Tail Recursion
def fact_non_tail(n):
    if n == 0: return 1
    return n * fact_non_tail(n-1)  # pending × after return

# 3. Tree Recursion — O(2^n)
def fib_tree(n):
    if n <= 1: return n
    return fib_tree(n-1) + fib_tree(n-2)  # two branches!

# 4. Mutual Recursion
def is_even(n):
    if n == 0: return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0: return False
    return is_even(n - 1)

# 5. Convert to tail recursion to save stack
# Power(base, exp) → tail version:
def power_tail(base, exp, acc=1):
    if exp == 0: return acc
    return power_tail(base, exp-1, acc*base)`,
        practice: [
          { name: "Fibonacci Number", diff: "easy" },
          { name: "Power of Two (recursive)", diff: "easy" },
          { name: "Count Vowels in String (recursion)", diff: "easy" }
        ]
      },
      "Key Algorithms": {
        diff: "medium",
        explanation: "Four canonical recursive algorithms every CS student must know: (1) Factorial — O(n) time, O(n) space. Classic linear recursion. (2) Fibonacci — naive O(2^n), memoized O(n). Classic tree recursion. (3) Tower of Hanoi — O(2^n) moves, provably optimal. Teaches thinking recursively. (4) Binary Search — O(log n) time, O(log n) space (recursive), O(1) space (iterative). Divide and conquer. These four demonstrate all recursion types and complexities.",
        intuition: "Tower of Hanoi: to move n disks from A to C using B, move n-1 disks from A to B (recursive), move disk n from A to C (base step), move n-1 disks from B to C (recursive). Two recursive calls with n-1 → T(n) = 2T(n-1) + 1 → T(n) = 2^n - 1. Binary search: eliminate half the array each call → T(n) = T(n/2) + 1 → O(log n).",
        steps: [
          "FACTORIAL: base n==0 return 1. Else return n*fact(n-1). T(n)=T(n-1)+O(1)=O(n).",
          "FIBONACCI: base n<=1 return n. Else fib(n-1)+fib(n-2). T(n)=T(n-1)+T(n-2)+O(1)≈O(2^n). Memoize → O(n).",
          "TOWER OF HANOI: move(n,src,dst,aux): if n==1 print src→dst. Else move(n-1,src,aux,dst) + src→dst + move(n-1,aux,dst,src). T(n)=2T(n-1)+1=2^n-1 moves.",
          "BINARY SEARCH: base lo>hi return -1. mid=(lo+hi)/2. If arr[mid]==target return mid. If arr[mid]<target recurse right half. Else recurse left half. T(n)=T(n/2)+O(1)=O(log n).",
          "SUM OF ARRAY: sum(arr,n) = arr[n-1]+sum(arr,n-1). Base: n==0 return 0. O(n) time, O(n) space.",
          "MERGE SORT: divide into two halves, sort each recursively, merge. T(n)=2T(n/2)+O(n)=O(n log n) by Master Theorem."
        ],
        dryRun: `── TOWER OF HANOI n=3: A→C using B ──────────────────
hanoi(3, A, C, B):
  hanoi(2, A, B, C):     ← move top 2 disks A→B
    hanoi(1, A, C, B): print A→C
    print A→B
    hanoi(1, C, B, A): print C→B
  print A→C              ← move disk 3 directly
  hanoi(2, B, C, A):     ← move top 2 disks B→C
    hanoi(1, B, A, C): print B→A
    print B→C
    hanoi(1, A, C, B): print A→C

Moves: A→C, A→B, C→B, A→C, B→A, B→C, A→C
Total: 7 = 2³-1 ✓

── BINARY SEARCH for 30 in [10,20,30,40,50] ─────────
bSearch(0,4): mid=2 → arr[2]=30 == target → return 2 ✓
(Only 1 call for this case)

bSearch for 40: mid=2→20<40→recurse(3,4)
  bSearch(3,4): mid=3→arr[3]=40==target → return 3 ✓`,
        time: { best: "O(log n) binary search", avg: "O(n) factorial", worst: "O(2^n) Hanoi/naive fib" },
        space: "O(n) most / O(log n) binary search",
        stable: undefined,
        when: "Factorial: simple linear recursion demo. Fibonacci: shows need for memoization. Hanoi: pure recursion thinking. Binary search: O(log n) — prefer iterative for O(1) space.",
        pros: [
          "Binary search: O(log n) — extremely fast on sorted arrays",
          "Hanoi: optimal solution, no iterative equivalent is simpler",
          "Merge Sort via recursion: guaranteed O(n log n)"
        ],
        cons: [
          "Naive Fibonacci: O(2^n) — never use without memoization",
          "Recursive binary search: O(log n) stack space vs O(1) iterative",
          "Hanoi with n=64: 2^64-1 ≈ 10^19 moves — impractical"
        ],
        cpp: `// Key Recursive Algorithms — C++

// 1. Factorial — O(n), O(n) stack
long long factorial(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorial(n - 1);
}

// 2. Fibonacci with memoization — O(n), O(n)
unordered_map<int,long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];  // cache hit
    return memo[n] = fib(n-1) + fib(n-2);
}

// 3. Tower of Hanoi — O(2^n) moves
void hanoi(int n, char src, char dst, char aux) {
    if (n == 1) {
        cout << src << " → " << dst << "\n";
        return;
    }
    hanoi(n-1, src, aux, dst);  // move n-1 to aux
    cout << src << " → " << dst << "\n"; // move largest
    hanoi(n-1, aux, dst, src);  // move n-1 from aux to dst
}

// 4. Binary Search (recursive) — O(log n), O(log n) stack
int bSearch(vector<int>& arr, int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return bSearch(arr, mid+1, hi, target);
    return bSearch(arr, lo, mid-1, target);
}`,
        python: `# Key Recursive Algorithms — Python

# 1. Factorial — O(n)
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

# 2. Fibonacci with memoization — O(n)
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Without decorator:
def fib_memo(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# 3. Tower of Hanoi — O(2^n) moves
def hanoi(n, src='A', dst='C', aux='B'):
    if n == 1:
        print(f"{src} → {dst}")
        return
    hanoi(n-1, src, aux, dst)   # move n-1 to aux
    print(f"{src} → {dst}")     # move largest
    hanoi(n-1, aux, dst, src)   # move n-1 from aux to dst

# 4. Binary Search (recursive) — O(log n)
def b_search(arr, lo, hi, target):
    if lo > hi: return -1
    mid = (lo + hi) // 2
    if arr[mid] == target: return mid
    if arr[mid] < target: return b_search(arr, mid+1, hi, target)
    return b_search(arr, lo, mid-1, target)`,
        practice: [
          { name: "Climbing Stairs (Fibonacci variant)", diff: "easy" },
          { name: "Fibonacci Number (with memoization)", diff: "easy" },
          { name: "Tower of Hanoi", diff: "medium" },
          { name: "Binary Search (recursive)", diff: "easy" },
          { name: "Merge Sort (recursive)", diff: "medium" }
        ]
      },
      "Backtracking Pattern": {
        diff: "hard",
        explanation: "Backtracking is advanced recursion where you explore all possibilities and undo choices that don't lead to a valid solution. The pattern is always: Try → Recurse → Undo (Choose → Explore → Unchoose). It is essentially a DFS with pruning. Used in: N-Queens, Sudoku, permutations, subsets, combination sum, word search. Key: after a recursive call returns, undo the change (backtrack) so the state is clean for the next possibility.",
        intuition: "Think of solving a maze: at each junction, pick a direction, walk down it, if you hit a wall, backtrack to the junction and try another direction. The 'undo' step restores state. Without undoing, choices from one branch corrupt the next branch. The pruning is what makes it efficient — we don't explore paths that are already invalid.",
        steps: [
          "CHOOSE: make a choice (place a queen, pick a number, add to path).",
          "EXPLORE: recursively solve with this choice (go deeper).",
          "UNCHOOSE: undo the choice before trying the next option (backtrack).",
          "BASE CASE: when a complete valid solution is found, add it to results.",
          "PRUNING: before recursing, check if current choice can possibly lead to a valid solution. Skip if not.",
          "TEMPLATE: for each option: if valid(option): apply(option) → recurse → undo(option)."
        ],
        dryRun: `── PERMUTATIONS of [1,2,3] ──────────────────────────
permute([], [1,2,3]):
  pick 1 → permute([1], [2,3]):
    pick 2 → permute([1,2], [3]):
      pick 3 → permute([1,2,3], []) → ADD [1,2,3] ✓
    undo 2 ← back to [1],[2,3]
    pick 3 → permute([1,3], [2]):
      pick 2 → ADD [1,3,2] ✓
    undo 3 ←
  undo 1 ←
  pick 2 → ... → [2,1,3],[2,3,1]
  pick 3 → ... → [3,1,2],[3,2,1]
Total: 3! = 6 permutations ✓

── SUBSETS of [1,2,3] ───────────────────────────────
subset(idx=0, current=[]):
  skip 1: subset(1, [])
    skip 2: subset(2,[]) → add [] wait, index 0 first...

idx=0: include 1 or skip
  include → [1], idx=1:
    include → [1,2], idx=2:
      include → [1,2,3] ✓  exclude → [1,2] ✓
    exclude → [1], idx=2:
      include → [1,3] ✓    exclude → [1] ✓
  skip → [], idx=1: → [2],[2,3],[3],[] ✓
Total: 2³=8 subsets ✓`,
        time: { best: "O(n!)", avg: "O(n!)", worst: "O(2^n) subsets" },
        space: "O(n) recursion depth",
        stable: undefined,
        when: "Permutations, subsets, combinations, N-Queens, Sudoku, word search, path finding. Any problem where you need to explore all possibilities with pruning.",
        pros: [
          "Explores all valid solutions — guaranteed correct if implemented right",
          "Pruning makes it much faster than brute force",
          "Elegant and concise compared to iterative equivalents"
        ],
        cons: [
          "Exponential worst case — O(n!) or O(2^n)",
          "Not suitable for large n without heavy pruning",
          "Forgetting to undo (backtrack) is the most common bug"
        ],
        cpp: `// Backtracking Patterns — C++

// 1. Generate all subsets — O(2^n)
void subsets(vector<int>& nums, int idx,
             vector<int>& curr, vector<vector<int>>& res) {
    res.push_back(curr);           // add current subset
    for (int i = idx; i < nums.size(); i++) {
        curr.push_back(nums[i]);   // CHOOSE
        subsets(nums, i+1, curr, res); // EXPLORE
        curr.pop_back();           // UNCHOOSE ← backtrack!
    }
}

// 2. Generate all permutations — O(n!)
void permute(vector<int>& nums, int start,
             vector<vector<int>>& res) {
    if (start == nums.size()) { res.push_back(nums); return; }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);       // CHOOSE
        permute(nums, start+1, res);      // EXPLORE
        swap(nums[start], nums[i]);       // UNCHOOSE ← backtrack!
    }
}

// 3. N-Queens (check if queen placement is safe)
bool isSafe(vector<string>& board, int row, int col, int n) {
    for (int i = 0; i < row; i++) if (board[i][col]=='Q') return false;
    for (int i=row-1,j=col-1; i>=0&&j>=0; i--,j--) if(board[i][j]=='Q') return false;
    for (int i=row-1,j=col+1; i>=0&&j<n; i--,j++) if(board[i][j]=='Q') return false;
    return true;
}`,
        python: `# Backtracking Patterns — Python

# 1. Generate all subsets — O(2^n)
def subsets(nums):
    result = []
    def backtrack(idx, current):
        result.append(current[:])   # add copy of current subset
        for i in range(idx, len(nums)):
            current.append(nums[i]) # CHOOSE
            backtrack(i+1, current) # EXPLORE
            current.pop()           # UNCHOOSE ← backtrack!
    backtrack(0, [])
    return result

# 2. Generate all permutations — O(n!)
def permutations(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])  # found complete permutation
            return
        for i in range(len(remaining)):
            path.append(remaining[i])              # CHOOSE
            backtrack(path, remaining[:i]+remaining[i+1:]) # EXPLORE
            path.pop()                             # UNCHOOSE
    backtrack([], nums)
    return result

# 3. Combination Sum (pick numbers that sum to target)
def combination_sum(candidates, target):
    result = []
    def backtrack(start, current, remaining):
        if remaining == 0: result.append(current[:]); return
        if remaining < 0: return  # PRUNE ← key optimisation
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, remaining-candidates[i])
            current.pop()  # UNCHOOSE
    backtrack(0, [], target)
    return result`,
        practice: [
          { name: "Subsets", diff: "medium" },
          { name: "Permutations", diff: "medium" },
          { name: "Combination Sum", diff: "medium" },
          { name: "N-Queens", diff: "hard" },
          { name: "Sudoku Solver", diff: "hard" },
          { name: "Word Search", diff: "medium" }
        ]
      },
      "Memoization & Optimization": {
        diff: "medium",
        explanation: "Naive tree recursion recomputes the same subproblems repeatedly. Memoization (top-down DP) stores results in a cache (hashmap or array) so each subproblem is solved only once. This converts O(2^n) tree recursion into O(n). Tabulation (bottom-up DP) is the iterative version — fill a table from base cases up. Key insight: if your recursion tree has overlapping subproblems (same inputs appear multiple times), memoization will help. The two criteria for DP: (1) Overlapping Subproblems, (2) Optimal Substructure.",
        intuition: "Fibonacci(5) without memoization computes Fibonacci(2) three times, Fibonacci(3) twice. With memoization, each is computed once and cached. The recursion tree collapses to a straight line — O(n) from O(2^n). Tabulation avoids the call stack entirely by filling from the bottom up: dp[0]=0, dp[1]=1, dp[i]=dp[i-1]+dp[i-2].",
        steps: [
          "IDENTIFY: does the recursion tree have repeated subproblems? Draw fib(5) tree and spot duplicates.",
          "MEMOIZE: add cache dict. Before computing, check if answer is in cache. After computing, store in cache.",
          "TABULATION: define dp array. Set base cases. Fill dp[i] using previous values. Return dp[n].",
          "SPACE OPTIMISE: for Fibonacci, dp[i] only uses dp[i-1] and dp[i-2] → use two variables instead of array. O(1) space.",
          "@lru_cache in Python: automatic memoization decorator — attaches cache to function.",
          "RULE: if problem = recursion + overlapping subproblems → use memoization or tabulation."
        ],
        dryRun: `── FIBONACCI WITHOUT MEMO: fib(5) ──────────────────
                fib(5)
             /         \
         fib(4)         fib(3) ← computed twice!
        /     \        /    \
    fib(3)  fib(2) fib(2) fib(1)  ← fib(2) computed 3 times!
   ...
Total calls: 15 for n=5, 2^n for general n ✗

── FIBONACCI WITH MEMO: fib(5) ──────────────────────
fib(5) → fib(4) → fib(3) → fib(2) → fib(1) = 1
                                   → fib(0) = 0
                         ← cache[2] = 1
                  ← cache[3] = 2
         ← cache[4] = 3
← cache[5] = 5
Each subproblem computed ONCE ✓ O(n) calls!

── TABULATION: fib up to n=6 ────────────────────────
dp: [0, 1, ?, ?, ?, ?, ?]
dp[2] = dp[1]+dp[0] = 1
dp[3] = dp[2]+dp[1] = 2
dp[4] = dp[3]+dp[2] = 3
dp[5] = dp[4]+dp[3] = 5
dp[6] = dp[5]+dp[4] = 8 ✓  No recursion at all!`,
        time: { best: "O(n) memoized", avg: "O(n) memoized", worst: "O(2^n) naive" },
        space: "O(n) memo / O(1) space-optimised",
        stable: undefined,
        when: "Any time recursion has overlapping subproblems — Fibonacci, climbing stairs, coin change, longest common subsequence, edit distance. Memoization = top-down DP. Tabulation = bottom-up DP.",
        pros: [
          "Converts O(2^n) tree recursion to O(n) with O(n) cache",
          "@lru_cache / functools.cache makes memoization trivial in Python",
          "Space-optimised tabulation achieves O(1) space for many DP problems"
        ],
        cons: [
          "Extra O(n) space for cache or table",
          "Memoization has function call overhead vs pure tabulation",
          "Identifying which recursive calls are subproblems requires practice"
        ],
        cpp: `// Memoization & Optimization — C++

// 1. Memoized Fibonacci — O(n) time, O(n) space
#include <unordered_map>
unordered_map<int,long long> dp;
long long fib(int n) {
    if (n <= 1) return n;
    if (dp.count(n)) return dp[n];  // cache hit!
    return dp[n] = fib(n-1) + fib(n-2);
}

// 2. Tabulation — O(n) time, O(n) space
long long fibTab(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n+1);
    dp[0]=0; dp[1]=1;
    for (int i=2; i<=n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// 3. Space-optimised Fibonacci — O(n) time, O(1) space!
long long fibOpt(int n) {
    if (n <= 1) return n;
    long long prev2=0, prev1=1;
    for (int i=2; i<=n; i++) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 4. Memoized climbing stairs (1 or 2 steps)
unordered_map<int,int> stairMemo;
int climbStairs(int n) {
    if (n <= 1) return 1;
    if (stairMemo.count(n)) return stairMemo[n];
    return stairMemo[n] = climbStairs(n-1) + climbStairs(n-2);
}`,
        python: `# Memoization & Optimization — Python

# 1. @lru_cache — automatic memoization
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# 2. Manual memoization with dict
def fib_memo(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]  # cache hit!
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# 3. Tabulation (bottom-up DP) — no recursion!
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# 4. Space-optimised — O(1) space!
def fib_opt(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b

# Memoization comparison:
# fib(40) naive: ~330 million calls
# fib(40) memo:  41 unique calls ✓`,
        practice: [
          { name: "Climbing Stairs (Memoization)", diff: "easy" },
          { name: "House Robber (1D DP)", diff: "medium" },
          { name: "Coin Change (Bottom-up DP)", diff: "medium" },
          { name: "Longest Common Subsequence", diff: "medium" },
          { name: "Word Break (Memoization)", diff: "medium" }
        ]
      }
    }
  },
  Searching: {
    icon: "🔍", diff: "easy",
    desc: "Linear O(n) to Binary O(log n). Sorted arrays, binary search variants, and hashing for O(1) lookup.",
    subtopics: {
      "Basics & Linear Search": {
        diff: "easy",
        explanation: "Searching is the process of finding a specific element (key) in a collection of data. There are two classic techniques: (1) Linear Search — works on any data, sorted or unsorted. Checks each element one by one from the beginning until the desired element is found or the list is exhausted. Time: O(n). If search is successful, returns the index. If unsuccessful, reports not found. From the textbook: 'An ordered or unordered list will be searched one by one from the beginning until the desired element is found. If not found, the search is unsuccessful.' (2) Binary Search — requires sorted data. Divides the search space in half each step. Time: O(log n). Average comparisons for 9 elements: 2.77 (successful), 3.4 (unsuccessful).",
        intuition: "Think of searching like finding a book in a library. Linear search = randomly check books one by one — simple but slow. Binary search = go to sorted catalog and directly narrow down — fast but needs sorted data. The key trade-off: linear is simple and works everywhere; binary is exponentially faster but requires the array to be sorted first.",
        steps: [
          "LINEAR SEARCH: Start at index 0. Compare arr[i] with key. If match → return i (found). If i reaches n → return -1 (not found). O(n) worst case.",
          "LINEAR SEARCH AVERAGE: if element is at position k, needs k comparisons. Average = (1+2+...+n)/n = (n+1)/2. For 12 elements: avg ≈ 3.08 comparisons.",
          "SUCCESSFUL SEARCH: element is found and index is returned.",
          "UNSUCCESSFUL SEARCH: entire array scanned, element not present, return -1.",
          "RECURSIVE LINEAR SEARCH: base case = position >= n (not found) OR arr[position] == key (found). Recursive case: linear_search(arr, key, position+1, n).",
          "BEST CASE: element is at index 0 → O(1). WORST CASE: element at end or not present → O(n)."
        ],
        dryRun: `── LINEAR SEARCH: find 7 in [-15,-6,0,7,9,23,54,82,101] ───
Index:    0   1  2  3  4   5   6   7   8
Elements:-15 -6  0  7  9  23  54  82 101

i=0: -15 == 7? No
i=1:  -6 == 7? No
i=2:   0 == 7? No
i=3:   7 == 7? YES → return 3 ✓  (4 comparisons)

── LINEAR SEARCH: find 42 (not present) ────────────────
i=0..8: check all elements, none match
Return -1 → Unsuccessful (9 comparisons = O(n)) ✗

── UNSORTED ARRAY: [45,39,8,54,77,38,24,16,4,7,9,20] ──
Search for 4  → found after 9 comparisons
Search for 7  → found after 10 comparisons
Search for 99 → not found after 12 comparisons ✗

Key: works on ANY array — sorted or unsorted ✓`,
        time: { best: "O(1)", avg: "O(n)", worst: "O(n)" },
        space: "O(1) iterative / O(n) recursive",
        stable: undefined,
        when: "Use linear search when: array is small (n < 50), array is unsorted and sorting would be expensive, searching only once (sorting overhead not justified), or data structure doesn't support binary search (linked list).",
        pros: [
          "Works on sorted AND unsorted data",
          "No preprocessing needed — just scan",
          "Works on any data structure: array, linked list, string",
          "O(1) space — no extra memory"
        ],
        cons: [
          "O(n) worst case — slow for large n",
          "For large sorted arrays, binary search is exponentially better",
          "Recursive version uses O(n) call stack space"
        ],
        cpp: `// Linear Search — C++ (Iterative)
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;      // found at index i
    }
    return -1;             // not found
}

// Linear Search — C++ (Recursive, from textbook)
int linearSearchRec(int a[], int data, int pos, int n) {
    if (pos >= n) return -1;           // base: not found
    if (a[pos] == data) return pos;    // base: found
    return linearSearchRec(a, data, pos + 1, n); // recurse
}

// Usage
int arr[] = {-15, -6, 0, 7, 9, 23, 54, 82, 101};
int n = 9;
cout << linearSearch(arr, n, 7);    // 3
cout << linearSearch(arr, n, 42);   // -1`,
        python: `# Linear Search — Python (Iterative)
def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] == key:
            return i       # found at index i
    return -1              # not found

# Linear Search — Python (Recursive)
def linear_search_rec(arr, key, pos=0):
    if pos >= len(arr): return -1       # not found
    if arr[pos] == key: return pos      # found
    return linear_search_rec(arr, key, pos + 1)

# Test
arr = [-15, -6, 0, 7, 9, 23, 54, 82, 101]
print(linear_search(arr, 7))   # 3
print(linear_search(arr, 42))  # -1

# Python built-ins (linear search under the hood)
if 7 in arr: print(arr.index(7))   # O(n)`,
        practice: [
          { name: "Find Index of First Occurrence", diff: "easy" },
          { name: "Search in a Linked List", diff: "easy" },
          { name: "Find Maximum in Unsorted Array", diff: "easy" }
        ]
      },
      "Binary Search": {
        diff: "easy",
        explanation: "Binary search requires a sorted array. It works by repeatedly halving the search space. Find the middle element: if it matches the key, done. If key < mid, search only the left half. If key > mid, search only the right half. Each comparison eliminates half the remaining elements. From the textbook: 'Every unsuccessful comparison reduces the un-searched portion roughly by half. The array needs to be searched only log₂n times before reaching trivial length, so worst case complexity is O(log n).' Average comparisons for 12 elements: 37/12 ≈ 3.08. For 9 elements: 25/9 ≈ 2.77 successful, 34/10 = 3.4 unsuccessful.",
        intuition: "Instead of checking every element, binary search bets: the middle element divides the sorted array into two halves. The key must be in exactly one of them. Each step throws away half the remaining candidates. Starting with n=1 million: step 1→500K, step 2→250K, ... step 20→1. So binary search finds any element in at most 20 steps! log₂(1,000,000) ≈ 20. Critical: always use mid = lo + (hi-lo)/2 to avoid integer overflow.",
        steps: [
          "PRECONDITION: array MUST be sorted in ascending order.",
          "Initialize low=0, high=n-1.",
          "While low <= high: compute mid = low + (high-low)/2. (NOT (low+high)/2 — avoids overflow!)",
          "If arr[mid] == key → return mid (found).",
          "If key < arr[mid] → high = mid-1 (search left half).",
          "If key > arr[mid] → low = mid+1 (search right half).",
          "If loop ends without return → return -1 (not found).",
          "RECURSIVE VERSION: same logic but call itself with updated low/high."
        ],
        dryRun: `── BINARY SEARCH: x=4 in [4,7,8,9,16,20,24,38,39,45,54,77] ─
low=1, high=12, mid=6 → arr[6]=20 → 4<20 → high=5
low=1, high=5,  mid=3 → arr[3]=8  → 4<8  → high=2
low=1, high=2,  mid=1 → arr[1]=4  → FOUND at 1 ✓ (3 comparisons)

── BINARY SEARCH: x=20 in same array ──────────────────
low=1, high=12, mid=6 → arr[6]=20 → FOUND at 6 ✓ (1 comparison!)

── BINARY SEARCH: x=42 (not present) ──────────────────
low=1, high=12, mid=6  → 20 → 42>20 → low=7
low=7, high=12, mid=9  → 39 → 42>39 → low=10
low=10,high=12, mid=11 → 54 → 42<54 → high=10
low=10,high=10, mid=10 → 45 → 42<45 → high=9
low=10 > high=9 → NOT FOUND ✗ (4 comparisons)

── OVERFLOW SAFE MID calculation ───────────────────────
WRONG: mid = (low + high) / 2  // overflow if low+high > INT_MAX
RIGHT: mid = low + (high - low) / 2  // always safe ✓`,
        time: { best: "O(1)", avg: "O(log n)", worst: "O(log n)" },
        space: "O(1) iterative / O(log n) recursive",
        stable: undefined,
        when: "Use binary search when: array is sorted, searching repeatedly (amortised), or n is large. Binary search is exponentially faster: n=10⁹ needs only ~30 comparisons vs 10⁹ for linear.",
        pros: [
          "O(log n) — extremely fast. 10⁹ elements in ~30 steps",
          "O(1) space for iterative version",
          "Correct for both successful and unsuccessful search",
          "Foundation for many advanced patterns (lower bound, upper bound, binary search on answer)"
        ],
        cons: [
          "REQUIRES sorted array — sorting cost O(n log n) must be justified",
          "Not suitable for linked lists (no O(1) mid access)",
          "Recursive version uses O(log n) stack space",
          "Easy to write infinite loops with wrong mid update"
        ],
        cpp: `// Binary Search — C++ (Iterative, from textbook)
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // overflow-safe!
        if (arr[mid] == key)
            return mid;          // found
        else if (key < arr[mid])
            high = mid - 1;      // search left half
        else
            low = mid + 1;       // search right half
    }
    return -1;                   // not found
}

// Binary Search — C++ (Recursive, from textbook)
int binSearchRec(int a[], int data, int low, int high) {
    if (low > high) return -1;  // base: not found
    int mid = low + (high - low) / 2;
    if (a[mid] == data) return mid;       // found
    if (data < a[mid])
        return binSearchRec(a, data, low, mid - 1);
    return binSearchRec(a, data, mid + 1, high);
}

// STL binary search
#include <algorithm>
vector<int> v = {4,7,8,9,16,20,24,38,39,45,54,77};
bool found = binary_search(v.begin(), v.end(), 20); // true
auto it = lower_bound(v.begin(), v.end(), 20); // iterator to 20`,
        python: `# Binary Search — Python (Iterative)
def binary_search(arr, key):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2   # Python ints don't overflow
        if arr[mid] == key:
            return mid             # found
        elif key < arr[mid]:
            high = mid - 1         # search left
        else:
            low = mid + 1          # search right
    return -1                      # not found

# Binary Search — Python (Recursive)
def bin_search_rec(arr, data, low, high):
    if low > high: return -1       # not found
    mid = (low + high) // 2
    if arr[mid] == data: return mid
    if data < arr[mid]:
        return bin_search_rec(arr, data, low, mid - 1)
    return bin_search_rec(arr, data, mid + 1, high)

# Python bisect module (standard library)
import bisect
arr = [4, 7, 8, 9, 16, 20, 24, 38, 39, 45, 54, 77]
idx = bisect.bisect_left(arr, 20)   # 5 (index of 20)
print(arr[idx] == 20)               # True`,
        practice: [
          { name: "Binary Search (LeetCode 704)", diff: "easy" },
          { name: "Search in Rotated Sorted Array", diff: "medium" },
          { name: "Find First and Last Position in Sorted Array", diff: "medium" },
          { name: "Square Root using Binary Search", diff: "easy" }
        ]
      },
      "Binary Search Variants": {
        diff: "medium",
        explanation: "Beyond basic binary search, there are critical variants: (1) Lower Bound — first index where arr[i] >= key. (2) Upper Bound — first index where arr[i] > key. (3) Count Occurrences — upper_bound - lower_bound. (4) Search in Rotated Sorted Array — one half is always sorted, check which and search accordingly. (5) Peak Element — element greater than both neighbours; binary search on the slope. (6) Binary Search on Answer — don't search in an array, search on the answer space (min/max possible answer). (7) First/Last Occurrence — modified binary search that doesn't stop on first match.",
        intuition: "Lower/upper bound: when arr[mid]==key, don't stop — keep searching left (for lower) or right (for upper). This finds the boundary. Rotated array: at least one half [lo..mid] or [mid..hi] is guaranteed sorted — check which one, then determine if key is in that sorted half. Binary search on answer: the answer lies in a range [min, max]; write an is_possible(mid) function and binary search on it.",
        steps: [
          "LOWER BOUND: when arr[mid]>=key → result=mid, high=mid-1. When arr[mid]<key → low=mid+1. Return result.",
          "UPPER BOUND: when arr[mid]>key → result=mid, high=mid-1. When arr[mid]<=key → low=mid+1. Return result.",
          "FIRST OCCURRENCE: when arr[mid]==key → save mid as answer, high=mid-1 (keep searching left).",
          "LAST OCCURRENCE: when arr[mid]==key → save mid as answer, low=mid+1 (keep searching right).",
          "ROTATED ARRAY: if arr[lo]<=arr[mid] → left half sorted. If key in [arr[lo],arr[mid]] → search left. Else search right. Flip logic for right-sorted half.",
          "PEAK ELEMENT: if arr[mid]>arr[mid+1] → peak is on left (high=mid). Else peak on right (low=mid+1).",
          "BINARY SEARCH ON ANSWER: define lo=min_answer, hi=max_answer. Check is_feasible(mid). Narrow range."
        ],
        dryRun: `── LOWER BOUND of 7 in [1,3,7,7,7,9,11] ──────────────
lo=0,hi=6: mid=3, arr[3]=7 >= 7 → result=3, hi=2
lo=0,hi=2: mid=1, arr[1]=3 < 7  → lo=2
lo=2,hi=2: mid=2, arr[2]=7 >= 7 → result=2, hi=1
lo=2 > hi=1 → return result=2 ✓ (first 7 at index 2)

── UPPER BOUND of 7 in same array ──────────────────────
lo=0,hi=6: mid=3, arr[3]=7 <=7 → lo=4
lo=4,hi=6: mid=5, arr[5]=9 > 7 → result=5, hi=4
lo=4,hi=4: mid=4, arr[4]=7 <=7 → lo=5
lo=5 > hi=4 → return result=5 ✓ (first element > 7 at index 5)
Count of 7s = upper_bound - lower_bound = 5-2 = 3 ✓

── ROTATED ARRAY: find 0 in [4,5,6,7,0,1,2] ───────────
lo=0,hi=6: mid=3, arr[3]=7
  arr[lo=0]=4 <= arr[mid]=7 → LEFT half [4,5,6,7] sorted
  key=0 in [4,7]? NO → search right: lo=4
lo=4,hi=6: mid=5, arr[5]=1
  arr[lo=4]=0 <= arr[mid]=1 → LEFT half [0,1] sorted
  key=0 in [0,1]? YES → search left: hi=4
lo=4,hi=4: mid=4, arr[4]=0 == 0 → FOUND at 4 ✓`,
        time: { best: "O(1)", avg: "O(log n)", worst: "O(log n)" },
        space: "O(1)",
        stable: undefined,
        when: "Lower/upper bound: counting occurrences, range queries. Rotated array: real interview question. Peak element: finding local maxima. Binary search on answer: optimization problems (Koko eating bananas, aggressive cows, allocate books).",
        pros: [
          "All variants run in O(log n) — same as standard binary search",
          "Lower/upper bound enable O(log n) count of occurrences",
          "Binary search on answer solves hard optimization problems elegantly"
        ],
        cons: [
          "Each variant has subtle differences — easy to mix up",
          "Binary search on answer requires defining a good feasibility function",
          "Off-by-one errors in hi=mid vs hi=mid-1 are the most common bugs"
        ],
        cpp: `// Binary Search Variants — C++

// 1. First Occurrence (Lower Bound equivalent)
int firstOccurrence(vector<int>& arr, int key) {
    int lo=0, hi=arr.size()-1, result=-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == key) { result=mid; hi=mid-1; } // keep searching left!
        else if (arr[mid] < key) lo = mid+1;
        else hi = mid-1;
    }
    return result;
}

// 2. Last Occurrence
int lastOccurrence(vector<int>& arr, int key) {
    int lo=0, hi=arr.size()-1, result=-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == key) { result=mid; lo=mid+1; } // keep searching right!
        else if (arr[mid] < key) lo = mid+1;
        else hi = mid-1;
    }
    return result;
}

// 3. Search in Rotated Sorted Array
int searchRotated(vector<int>& arr, int key) {
    int lo=0, hi=arr.size()-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == key) return mid;
        if (arr[lo] <= arr[mid]) { // left half sorted
            if (key>=arr[lo] && key<arr[mid]) hi=mid-1;
            else lo=mid+1;
        } else { // right half sorted
            if (key>arr[mid] && key<=arr[hi]) lo=mid+1;
            else hi=mid-1;
        }
    }
    return -1;
}

// 4. Peak Element
int peakElement(vector<int>& arr) {
    int lo=0, hi=arr.size()-1;
    while (lo < hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] > arr[mid+1]) hi=mid;   // peak on left side
        else lo=mid+1;                         // peak on right side
    }
    return lo; // peak index
}`,
        python: `# Binary Search Variants — Python

# 1. First Occurrence
def first_occurrence(arr, key):
    lo, hi, result = 0, len(arr)-1, -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == key: result=mid; hi=mid-1  # search left
        elif arr[mid] < key: lo = mid+1
        else: hi = mid-1
    return result

# 2. Last Occurrence
def last_occurrence(arr, key):
    lo, hi, result = 0, len(arr)-1, -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == key: result=mid; lo=mid+1  # search right
        elif arr[mid] < key: lo = mid+1
        else: hi = mid-1
    return result

# 3. Count Occurrences using both bounds
def count_occurrences(arr, key):
    first = first_occurrence(arr, key)
    if first == -1: return 0
    return last_occurrence(arr, key) - first + 1

# 4. Square Root using Binary Search — O(log n)
def sqrt_binary(n):
    if n < 2: return n
    lo, hi, ans = 1, n//2, 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid == n: return mid
        if mid * mid < n: ans=mid; lo=mid+1
        else: hi=mid-1
    return ans

# 5. Using Python bisect
import bisect
arr = [1,3,7,7,7,9,11]
lo = bisect.bisect_left(arr, 7)   # 2 — first 7
hi = bisect.bisect_right(arr, 7)  # 5 — after last 7
print(hi - lo)                    # 3 (count of 7s) ✓`,
        practice: [
          { name: "Find First and Last Position (LeetCode 34)", diff: "medium" },
          { name: "Search in Rotated Sorted Array (LeetCode 33)", diff: "medium" },
          { name: "Find Peak Element (LeetCode 162)", diff: "medium" },
          { name: "Sqrt(x) using Binary Search (LeetCode 69)", diff: "easy" },
          { name: "Find Minimum in Rotated Sorted Array", diff: "medium" }
        ]
      },
      "Advanced Search Techniques": {
        diff: "medium",
        explanation: "Beyond linear and binary search, four more techniques: (1) Interpolation Search — for uniformly distributed sorted data, estimates position using formula: pos = lo + ((key - arr[lo]) × (hi-lo)) / (arr[hi]-arr[lo]). O(log log n) average for uniform data, O(n) worst case. (2) Exponential Search — for unbounded/infinite arrays: find range by doubling index until arr[index]>=key, then binary search in [index/2, index]. O(log n). (3) Jump Search — for sorted arrays, skip blocks of size √n then linear search. O(√n). (4) Hashing — use hash table for O(1) average search. No sorting needed. O(n) space.",
        intuition: "Interpolation search is like looking up a name in a dictionary — if searching for 'Smith' you don't open to the middle; you open near the end. It predicts where the key should be based on its value relative to the range. Exponential search solves the 'I don't know the size' problem by doubling the range until the key could be there. Jump search is a middle ground between O(n) and O(log n) — skip √n elements at a time.",
        steps: [
          "INTERPOLATION SEARCH: pos = lo + ((key-arr[lo]) × (hi-lo)) / (arr[hi]-arr[lo]). If arr[pos]==key → found. If key<arr[pos] → hi=pos-1. Else lo=pos+1.",
          "EXPONENTIAL SEARCH: find range: i=1, while i<n && arr[i]<=key: i*=2. Then binary search in [i/2, min(i,n-1)].",
          "JUMP SEARCH: step=√n. While arr[min(step,n)-1]<key: prev=step, step+=√n. Linear search from prev to min(step,n).",
          "HASHING SEARCH: insert all elements into hash map (key→index). Search = O(1) average. Extra O(n) space.",
          "INTERPOLATION PRECONDITION: data must be uniformly distributed AND sorted. Non-uniform data → O(n) worst case.",
          "WHEN TO USE: Interpolation: uniform sorted large data. Exponential: unknown size. Jump: sorted, O(√n) acceptable. Hashing: O(1) search needed."
        ],
        dryRun: `── INTERPOLATION SEARCH: key=77 in [4,7,8,9,16,20,24,38,39,45,54,77] ──
lo=0, hi=11, arr[lo]=4, arr[hi]=77
pos = 0 + ((77-4) × (11-0)) / (77-4)
    = 0 + (73 × 11) / 73
    = 0 + 11 = 11
arr[11]=77 == 77 → FOUND in 1 step! ✓ (better than binary's 4!)

── EXPONENTIAL SEARCH: key=77 in same array ─────────────
i=1: arr[1]=7  < 77 → i=2
i=2: arr[2]=8  < 77 → i=4
i=4: arr[4]=16 < 77 → i=8
i=8: arr[8]=39 < 77 → i=16
i=16 >= n=12 → binary search in [8, 11]
Binary search [8,11]: mid=9→45<77→lo=10; mid=10→54<77→lo=11; mid=11→77 ✓

── JUMP SEARCH: key=54 in [4,7,8,9,16,20,24,38,39,45,54,77], n=12 ─
step=√12≈3
arr[2]=8  < 54 → prev=3, step=6
arr[5]=20 < 54 → prev=6, step=9
arr[8]=39 < 54 → prev=9, step=12
Linear search from 9 to 11: arr[9]=45, arr[10]=54 ✓ (found at 10)`,
        time: { best: "O(1)", avg: "O(log log n) interpolation", worst: "O(n) interpolation" },
        space: "O(1) / O(n) hashing",
        stable: undefined,
        when: "Interpolation: large uniformly distributed sorted data (phone books, timestamps). Exponential: sorted array of unknown size. Jump: sorted array, simpler than binary. Hashing: when O(1) lookup needed and space available.",
        pros: [
          "Interpolation: O(log log n) average — faster than binary for uniform data",
          "Exponential: handles unknown-size arrays elegantly",
          "Hashing: O(1) average — fastest possible lookup"
        ],
        cons: [
          "Interpolation: O(n) worst case on skewed data — dangerous",
          "Hashing: O(n) extra space, collision handling needed",
          "Jump: O(√n) — worse than binary O(log n) for large n"
        ],
        cpp: `// Advanced Search Techniques — C++

// 1. Interpolation Search — O(log log n) uniform data
int interpolationSearch(int arr[], int n, int key) {
    int lo = 0, hi = n - 1;
    while (lo <= hi && key >= arr[lo] && key <= arr[hi]) {
        if (lo == hi) { return arr[lo]==key ? lo : -1; }
        // formula: estimate position based on value
        int pos = lo + ((long long)(key - arr[lo]) *
                        (hi - lo)) / (arr[hi] - arr[lo]);
        if (arr[pos] == key) return pos;
        if (arr[pos] < key) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}

// 2. Exponential Search — O(log n), good for unknown-size arrays
int exponentialSearch(int arr[], int n, int key) {
    if (arr[0] == key) return 0;
    int i = 1;
    while (i < n && arr[i] <= key) i *= 2; // double until past key
    // binary search in [i/2, min(i, n-1)]
    return binarySearch(arr + i/2, min(i, n-1) - i/2 + 1, key);
}

// 3. Hashing Search — O(1) average
#include <unordered_map>
unordered_map<int,int> buildIndex(int arr[], int n) {
    unordered_map<int,int> idx;
    for (int i = 0; i < n; i++) idx[arr[i]] = i;
    return idx;
}
// search: idx.count(key) ? idx[key] : -1`,
        python: `# Advanced Search Techniques — Python

# 1. Interpolation Search
def interpolation_search(arr, key):
    lo, hi = 0, len(arr) - 1
    while lo <= hi and arr[lo] <= key <= arr[hi]:
        if lo == hi:
            return lo if arr[lo] == key else -1
        # estimate position
        pos = lo + ((key - arr[lo]) * (hi - lo)) // (arr[hi] - arr[lo])
        if arr[pos] == key: return pos
        if arr[pos] < key: lo = pos + 1
        else: hi = pos - 1
    return -1

# 2. Exponential Search
def exponential_search(arr, key):
    n = len(arr)
    if arr[0] == key: return 0
    i = 1
    while i < n and arr[i] <= key: i *= 2  # find range
    # binary search in [i//2, min(i, n-1)]
    lo, hi = i // 2, min(i, n - 1)
    return binary_search(arr, key, lo, hi)

# 3. Hashing — O(1) lookup
def build_hash_index(arr):
    return {val: idx for idx, val in enumerate(arr)}

# Usage
arr = [4, 7, 8, 9, 16, 20, 24, 38, 39, 45, 54, 77]
index = build_hash_index(arr)
print(index.get(77, -1))  # 11 — O(1) ✓
print(index.get(42, -1))  # -1 — O(1) ✓`,
        practice: [
          { name: "Search in Infinite Sorted Array", diff: "medium" },
          { name: "Two Sum (Hashing approach)", diff: "easy" },
          { name: "Find Duplicate Number (no extra space)", diff: "medium" },
          { name: "Median of Two Sorted Arrays", diff: "hard" }
        ]
      },
      "Complexity & Comparison": {
        diff: "easy",
        explanation: "Complete complexity reference for all searching techniques. Key insight from the textbook: 'Binary search is exponentially faster than linear search.' For n=10⁹: linear needs up to 10⁹ comparisons; binary needs only 30. Important exam questions: (1) Binary search requires sorted array. (2) Binary search works on arrays, NOT linked lists (no O(1) mid access). (3) Both linear and binary can be done recursively and iteratively. (4) Hashing gives O(1) average but needs extra O(n) space. (5) Overflow bug: always use mid = lo+(hi-lo)/2, not (lo+hi)/2.",
        intuition: "The choice of search algorithm depends on: Is data sorted? How often do you search? How much space can you use? Is n large? For small n or unsorted data, linear search is fine and simpler. For large sorted data, binary search is essential. For very frequent lookups where space is available, build a hash table once and enjoy O(1) forever.",
        steps: [
          "Linear: O(n) worst case. No precondition. Works on all structures.",
          "Binary: O(log n). MUST be sorted. Array only (needs O(1) random access).",
          "Interpolation: O(log log n) average, O(n) worst. Uniform + sorted.",
          "Exponential: O(log n). Sorted. Good for unknown size.",
          "Jump: O(√n). Sorted.",
          "Hashing: O(1) average. No sort needed. O(n) extra space."
        ],
        dryRun: `Search Technique Comparison:
Technique       | Time (avg) | Space | Sorted? | Structure
────────────────┼────────────┼───────┼─────────┼──────────
Linear          | O(n)       | O(1)  | No      | Any
Binary          | O(log n)   | O(1)  | YES     | Array only
Interpolation   | O(log log n)| O(1) | YES+uniform| Array
Exponential     | O(log n)   | O(1)  | YES     | Array
Jump            | O(√n)      | O(1)  | YES     | Array
Hashing         | O(1) avg   | O(n)  | No      | Hash table

n = 1,000,000 comparisons needed:
Linear search:        up to 1,000,000
Binary search:        up to 20
Interpolation (unif): up to ~4
Hashing:              1 (average)

Exam MCQ answers:
  Q: Worst case serial search?         A: Linear / O(n)
  Q: Worst case binary search?         A: Logarithmic / O(log n)
  Q: Binary search requirement?        A: Array must be SORTED
  Q: Which search halves elements?     A: Binary Search
  Q: Stable sort for searching?        A: Bubble Sort (stable)`,
        time: { best: "O(1) hashing", avg: "O(log n) binary", worst: "O(n) linear" },
        space: "O(1) most / O(n) hashing",
        stable: undefined,
        when: "Unsorted/small n → Linear. Sorted large n → Binary. Uniform sorted → Interpolation. Frequent lookups + space available → Hashing. Unknown size → Exponential.",
        pros: [
          "Binary search: O(log n) — handles billion-element arrays in 30 steps",
          "Hashing: O(1) average — fastest possible for repeated queries",
          "Linear: zero preconditions — works on any collection"
        ],
        cons: [
          "Binary search: array must be sorted — O(n log n) sorting cost",
          "Hashing: O(n) extra space + collision handling complexity",
          "Interpolation: O(n) worst case on skewed distributions"
        ],
        cpp: `// Common Searching Mistakes to Avoid — C++

// 1. OVERFLOW in mid calculation
int mid_WRONG = (low + high) / 2;       // BUG: overflow if large!
int mid_RIGHT = low + (high - low) / 2; // CORRECT always ✓

// 2. Wrong condition: should be <= not <
while (low <= high) { /* correct */ }
while (low < high)  { /* misses single element! */ }

// 3. Off-by-one in rotated array
// Always handle arr[lo]<=arr[mid] (not <) for duplicates

// 4. Binary search on unsorted array → WRONG RESULTS
// Always verify sorted before calling binary search!

// 5. Count occurrences correctly
int count = lastOccurrence(arr, n, key) -
            firstOccurrence(arr, n, key) + 1;
// Handle case where key not present: firstOccurrence returns -1

// Use STL for reliability:
#include <algorithm>
auto lo = lower_bound(v.begin(), v.end(), key);
auto hi = upper_bound(v.begin(), v.end(), key);
int cnt = hi - lo;  // count of occurrences`,
        python: `# Quick Reference — Python

import bisect

# Binary search using bisect (standard library)
def bs_find(arr, key):
    i = bisect.bisect_left(arr, key)
    return i if i < len(arr) and arr[i] == key else -1

# First occurrence
def first_occ(arr, key):
    i = bisect.bisect_left(arr, key)
    return i if i < len(arr) and arr[i] == key else -1

# Last occurrence
def last_occ(arr, key):
    i = bisect.bisect_right(arr, key) - 1
    return i if i >= 0 and arr[i] == key else -1

# Count occurrences — O(log n)
def count_occ(arr, key):
    return bisect.bisect_right(arr,key) - bisect.bisect_left(arr,key)

# Common mistakes:
# ✗ binary search on unsorted list → wrong results
# ✗ list.index(x) on large list → O(n) linear scan
# ✓ bisect for O(log n) on sorted list
# ✓ set/dict for O(1) membership test`,
        practice: [
          { name: "Binary Search (LeetCode 704)", diff: "easy" },
          { name: "Aggressive Cows (Binary Search on Answer)", diff: "hard" },
          { name: "Koko Eating Bananas (Binary Search on Answer)", diff: "medium" },
          { name: "Median of Two Sorted Arrays", diff: "hard" },
          { name: "Find Minimum in Rotated Sorted Array", diff: "medium" }
        ]
      }
    }
  },
  Hashing: {
    icon: "#️⃣", diff: "medium",
    desc: "O(1) average insert/search/delete. Hash functions, collision handling, and the backbone of frequency counting.",
    subtopics: {
      "Basics & Hash Functions": {
        diff: "easy",
        explanation: "Hashing is a technique to store and retrieve data efficiently using a hash function. A hash function converts a key into an index in an array. Instead of linear O(n) search or tree O(log n) search, hashing gives average O(1) for insert, search, and delete. Key terms: Hash Function — maps key to index (e.g. h(key) = key % tableSize). Hash Table — array where data is stored at hashed indices. Collision — two different keys map to the same index (h(23)=3 and h(33)=3 both give index 3). Load Factor — (number of elements) / (table size). Measures how full the table is. Rehashing — when load factor exceeds a threshold (~0.7), create a larger table and reinsert all elements.",
        intuition: "Think of hashing like a gym locker system. Each locker has a number (index). You store your item based on a rule (hash function). Instead of checking every locker, you jump directly to the right one. Problem: what if two people get the same locker number? That's a collision — you need a strategy to handle it. Perfect hashing = no collisions, every key gets its own locker.",
        steps: [
          "HASH FUNCTION: h(key) = key % tableSize. Maps any key to an index in [0, tableSize-1].",
          "INSERTION: compute index = h(key). If slot is empty → store. If occupied → collision → resolve.",
          "SEARCH: compute index = h(key). Check element at that index. If match → found. If not → follow collision chain.",
          "DELETION: find element → remove. In open addressing, must mark as 'deleted' (not empty) to not break search chains.",
          "LOAD FACTOR = n/m where n=elements, m=table size. Keep load factor < 0.7 for good performance.",
          "REHASHING: when load factor exceeds threshold, create table of size ~2m, recompute all hashes and reinsert. O(n) but rare."
        ],
        dryRun: `Hash Function: h(key) = key % 10, table size = 10

INSERT 10: h(10)=0  → table[0]=10
INSERT 25: h(25)=5  → table[5]=25
INSERT 37: h(37)=7  → table[7]=37
INSERT 23: h(23)=3  → table[3]=23
INSERT 33: h(33)=3  → table[3] already has 23! → COLLISION

Table after inserts (no collision handling shown):
Index: 0  1  2  3  4  5  6  7  8  9
Data: [10][ ][ ][23][ ][25][ ][37][ ][ ]

SEARCH for 25:
  h(25)=5 → check table[5]=25 → FOUND in O(1) ✓

SEARCH for 99:
  h(99)=9 → check table[9]=empty → NOT FOUND O(1) ✓

Load Factor after 4 inserts in size-10 table:
  LF = 4/10 = 0.4 → acceptable ✓
  LF > 0.7 → trigger rehashing!`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(n) all collide" },
        space: "O(n)",
        stable: undefined,
        when: "Use hashing for: O(1) average lookup (Two Sum, frequency count), detecting duplicates, grouping (anagrams), caches, symbol tables. Avoid when: ordered iteration needed (use map/BST instead).",
        pros: [
          "O(1) average insert, search, delete — fastest possible",
          "Works with any key type (strings, ints, pairs with custom hash)",
          "Backbone of frequency counting — most common interview pattern"
        ],
        cons: [
          "Worst case O(n) when all keys collide (poor hash function)",
          "No ordering — cannot iterate in sorted order",
          "Extra O(n) space for table",
          "Rehashing is O(n) — occasional spike in operation time"
        ],
        cpp: `// Hash Basics — C++

// Simple hash function
int hashFunction(int key, int tableSize) {
    return key % tableSize;  // division method
}

// STL unordered_map — automatic hashing, O(1) avg
#include <unordered_map>
unordered_map<int, int> mp;
mp[1] = 10;           // insert — O(1)
mp[2] = 20;
cout << mp[1];        // access — O(1)
mp.erase(1);          // delete — O(1)
bool found = mp.find(2) != mp.end(); // search — O(1)

// STL unordered_set — unique keys only
#include <unordered_set>
unordered_set<int> st;
st.insert(5);
bool has5 = st.count(5);  // O(1)

// ordered map (BST-based, O(log n))
#include <map>
map<int,int> ordered;  // keys always sorted, O(log n) ops`,
        python: `# Hash Basics — Python

# Python dict is a hash map — O(1) average
mp = {}
mp[1] = 10      # insert
mp[2] = 20
print(mp[1])    # access — O(1)
del mp[1]       # delete — O(1)
if 2 in mp:     # search — O(1)
    print("Found")

# Python set is a hash set
st = set()
st.add(5)
st.add(5)       # duplicates ignored
print(5 in st)  # O(1)

# Build simple hash table manually
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # chaining

    def _hash(self, key):
        return key % self.size

    def insert(self, key):
        self.table[self._hash(key)].append(key)

    def search(self, key):
        return key in self.table[self._hash(key)]`,
        practice: [
          { name: "Design HashMap (LeetCode 706)", diff: "easy" },
          { name: "Design HashSet (LeetCode 705)", diff: "easy" },
          { name: "Find Frequency of Array Elements", diff: "easy" }
        ]
      },
      "Collision Handling": {
        diff: "medium",
        explanation: "Collisions are inevitable — two keys hash to the same index. Two families of solutions: (1) Separate Chaining — each index stores a linked list (or vector). All keys that hash to the same index are chained together. O(1) average insert, O(n/m) search where m=table size. Simple and handles high load factors well. (2) Open Addressing — all elements stored inside the array itself. On collision, probe for next empty slot. Three probing strategies: (a) Linear Probing: index = (h(key)+i)%size. Simple but causes primary clustering. (b) Quadratic Probing: index = (h(key)+i²)%size. Reduces clustering. (c) Double Hashing: index = (h1(key)+i×h2(key))%size. Best distribution, no clustering.",
        intuition: "Separate chaining: each bucket is a list — overflow vertically. Open addressing: no extra structure — overflow horizontally (probe other slots). Linear probing is cache-friendly but clusters. Quadratic spreads out. Double hashing is most uniform. Deletion in open addressing is tricky — you must mark deleted slots as 'tombstone' not 'empty', or subsequent searches will stop too early.",
        steps: [
          "SEPARATE CHAINING INSERT: h(key)=idx. table[idx].push_back(key). Always O(1).",
          "SEPARATE CHAINING SEARCH: h(key)=idx. Scan linked list at table[idx]. O(1) avg, O(n) worst.",
          "LINEAR PROBING INSERT: idx=(h(key)+i)%size for i=0,1,2... until empty slot found.",
          "LINEAR PROBING SEARCH: probe same sequence until key found or empty slot (not tombstone).",
          "QUADRATIC PROBING: idx=(h(key)+i²)%size. Better spread than linear.",
          "DOUBLE HASHING: h2(key) = prime - (key % prime). idx=(h1(key)+i×h2(key))%size. Most uniform.",
          "DELETION in open addressing: mark slot as DELETED (tombstone), not EMPTY — or searches break."
        ],
        dryRun: `── SEPARATE CHAINING: insert 10,20,30 in size-10 table ──
h(10)=0: table[0]→[10]
h(20)=0: table[0]→[10→20]   (chained, both at index 0)
h(30)=0: table[0]→[10→20→30]

Search 20: h(20)=0 → scan list [10→20] → found ✓ O(2)

── LINEAR PROBING: insert 10,20,30 in size-10 table ────
h(10)=0: table[0]=10 ✓
h(20)=0: table[0] taken! → try table[1]=20 ✓
h(30)=0: table[0] taken! → try table[1] taken! → table[2]=30 ✓

Table: [10,20,30,_,_,_,_,_,_,_]

Search 30: h(30)=0 → table[0]=10≠30 → table[1]=20≠30 → table[2]=30 ✓

DELETE 20 (linear probing):
  Set table[1] = TOMBSTONE (not EMPTY!)
  Search 30 later: probe 0→10, 1→TOMBSTONE(continue!), 2→30 ✓
  If we set EMPTY: search 30 would stop at 1 → WRONG ✗

── DOUBLE HASHING: h1(key)=key%7, h2(key)=5-(key%5) ───
Insert 3:  h1(3)=3 → table[3]=3
Insert 10: h1(10)=3 → collision!
  i=1: (3 + 1×h2(10))%7 = (3+1×5)%7 = 8%7=1 → table[1]=10 ✓`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(n)" },
        space: "O(n) chaining + chain overhead / O(m) open addressing",
        stable: undefined,
        when: "Separate chaining: when load factor can exceed 1, simpler deletion. Open addressing: when memory locality matters, no extra pointers. Double hashing: when uniform distribution critical.",
        pros: [
          "Chaining: handles load factor > 1, simple deletion, no primary clustering",
          "Linear probing: cache-friendly, all data in one array",
          "Double hashing: best distribution, minimises collision chains"
        ],
        cons: [
          "Chaining: extra memory for pointers/list nodes",
          "Linear probing: primary clustering — long runs of filled slots",
          "Open addressing: deletion needs tombstones — complicates logic",
          "Quadratic probing: may not probe all slots (not always finds empty slot)"
        ],
        cpp: `// Collision Handling — C++

// 1. Separate Chaining
#include <list>
class HashTableChaining {
    int size;
    vector<list<int>> table;
public:
    HashTableChaining(int s): size(s), table(s) {}

    int hashFn(int key) { return key % size; }

    void insert(int key) {
        table[hashFn(key)].push_back(key);  // O(1)
    }
    bool search(int key) {
        for (int x : table[hashFn(key)])
            if (x == key) return true;
        return false;
    }
    void remove(int key) {
        table[hashFn(key)].remove(key);     // O(chain length)
    }
};

// 2. Linear Probing
class HashTableLinear {
    int size;
    vector<int> table;
    vector<bool> deleted;
    const int EMPTY = -1;
public:
    HashTableLinear(int s): size(s), table(s,EMPTY), deleted(s,false) {}

    void insert(int key) {
        int idx = key % size;
        while (table[idx] != EMPTY && !deleted[idx])
            idx = (idx + 1) % size;  // linear probe
        table[idx] = key; deleted[idx] = false;
    }
    bool search(int key) {
        int idx = key % size, start = idx;
        while (table[idx] != EMPTY || deleted[idx]) {
            if (!deleted[idx] && table[idx] == key) return true;
            idx = (idx + 1) % size;
            if (idx == start) break;
        }
        return false;
    }
};`,
        python: `# Collision Handling — Python

# 1. Separate Chaining
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key): return key % self.size

    def insert(self, key):
        self.table[self._hash(key)].append(key)    # O(1)

    def search(self, key):
        return key in self.table[self._hash(key)]  # O(chain len)

    def remove(self, key):
        bucket = self.table[self._hash(key)]
        if key in bucket: bucket.remove(key)

# 2. Linear Probing
class HashTableLinear:
    EMPTY, DELETED = None, "DELETED"

    def __init__(self, size=10):
        self.size = size
        self.table = [self.EMPTY] * size

    def _hash(self, key): return key % self.size

    def insert(self, key):
        idx = self._hash(key)
        while self.table[idx] not in (self.EMPTY, self.DELETED):
            idx = (idx + 1) % self.size
        self.table[idx] = key

    def search(self, key):
        idx = self._hash(key)
        while self.table[idx] is not self.EMPTY:
            if self.table[idx] == key: return True
            idx = (idx + 1) % self.size
        return False

    def delete(self, key):
        idx = self._hash(key)
        while self.table[idx] is not self.EMPTY:
            if self.table[idx] == key:
                self.table[idx] = self.DELETED  # tombstone!
                return
            idx = (idx + 1) % self.size`,
        practice: [
          { name: "Design HashMap (Chaining implementation)", diff: "easy" },
          { name: "Find if Array has Duplicates (O(n) hashing)", diff: "easy" },
          { name: "Check if Two Strings are Anagrams", diff: "easy" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Five hashing patterns solve the majority of interview problems: (1) Frequency Counting — count occurrences of elements using a hash map in O(n). (2) Two Sum Pattern — for each element x, store it; check if (target-x) already in map. O(n). (3) Prefix Sum + Hashing — find subarrays with sum=k by storing prefix sums; count[prefixSum-k] gives number of valid subarrays. (4) Hash Set for Uniqueness — detect duplicates or find unique elements in O(n). (5) Sliding Window + HashMap — track character frequencies in window; shrink/expand based on map.",
        intuition: "Two Sum key insight: instead of checking all pairs O(n²), for each element ask 'have I seen the complement?' — O(1) lookup makes the whole thing O(n). Prefix sum + hashing: if prefixSum[j]-prefixSum[i]=k, then subarray [i+1..j] has sum k. Store prefix sums as keys, count how many times each has appeared. This converts O(n²) to O(n).",
        steps: [
          "FREQUENCY COUNT: for x in arr: freq[x]++. Query freq[x] in O(1). Find most frequent, first unique, etc.",
          "TWO SUM: for each x: if (target-x) in seen → return pair. Else add x to seen. O(n).",
          "SUBARRAY SUM K: maintain running prefix sum. At each index: if (prefix-k) in count → add count[prefix-k] to answer. count[prefix]++.",
          "DETECT DUPLICATE: add elements to set. If element already in set → duplicate found. O(n) time, O(n) space.",
          "GROUP ANAGRAMS: sort each string → use as hash key. All anagrams share same sorted key.",
          "LONGEST NO-REPEAT: sliding window + map of last seen index. If char seen and index >= left: move left. Update right = max of stored index+1."
        ],
        dryRun: `── TWO SUM: [2,7,11,15], target=9 ──────────────────────
seen = {}
x=2: target-x=7, 7 in seen? No → seen={2:0}
x=7: target-x=2, 2 in seen? YES → return [seen[2],1]=[0,1] ✓
O(n) total, O(n) space

── SUBARRAY SUM K=3: [1,1,1] ───────────────────────────
count={0:1}, prefix=0, ans=0
i=0: prefix=1, prefix-k=1-3=-2, -2 in count? No → count={0:1,1:1}
i=1: prefix=2, prefix-k=2-3=-1, -1 in count? No → count={0:1,1:1,2:1}
i=2: prefix=3, prefix-k=3-3=0, 0 in count? YES! ans+=count[0]=1
                                                  count={0:1,1:1,2:1,3:1}
Answer: 2... wait, prefix=3 again checks prefix=3 vs 3:
Recalculate: subarrays [1,1,1],[1,1],[1,1] → ans=2 ✓

── FREQUENCY COUNT: [4,4,1,2,4,2] ─────────────────────
freq={4:3, 1:1, 2:2}
First non-repeating? scan in order: 1 (freq=1) ✓
Most frequent? 4 (freq=3) ✓
Has duplicate? freq[4]=3>1 → YES ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n²) collisions" },
        space: "O(n)",
        stable: undefined,
        when: "Frequency count: any counting problem. Two Sum: pair/triplet problems. Prefix+hash: subarray sum problems. Set: duplicate detection. Anagram grouping: sorting+hash key.",
        pros: [
          "Converts O(n²) brute force to O(n) for most problems",
          "Frequency count is the single most used pattern in interviews",
          "Prefix sum + hashing handles all subarray sum variants"
        ],
        cons: [
          "Extra O(n) space for hash map",
          "Worst case O(n) per operation with poor hash/many collisions",
          "Prefix sum hashing can be tricky to get right (initialize count[0]=1)"
        ],
        cpp: `// Important Hashing Patterns — C++

// 1. Frequency Count
unordered_map<int,int> freq;
for (int x : arr) freq[x]++;
// Query: freq[x] → count of x

// 2. Two Sum — O(n)
vector<int> twoSum(vector<int>& arr, int target) {
    unordered_map<int,int> seen; // val → index
    for (int i = 0; i < arr.size(); i++) {
        int comp = target - arr[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[arr[i]] = i;
    }
    return {};
}

// 3. Subarray Sum Equals K — O(n)
int subarraySum(vector<int>& arr, int k) {
    unordered_map<int,int> count = {{0, 1}}; // prefix=0 seen once
    int prefix = 0, ans = 0;
    for (int x : arr) {
        prefix += x;
        ans += count[prefix - k]; // how many prev prefixes match
        count[prefix]++;
    }
    return ans;
}

// 4. Group Anagrams — O(nm log m)
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (string& s : strs) {
        string key = s; sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& [k,v] : mp) res.push_back(v);
    return res;
}

// 5. First Non-Repeating Character
char firstUnique(string s) {
    unordered_map<char,int> freq;
    for (char c : s) freq[c]++;
    for (char c : s) if (freq[c]==1) return c;
    return '#';
}`,
        python: `# Important Hashing Patterns — Python
from collections import defaultdict, Counter

# 1. Frequency Count — O(n)
arr = [4,4,1,2,4,2]
freq = Counter(arr)   # {4:3, 1:1, 2:2}
# or: freq = defaultdict(int); for x in arr: freq[x]+=1

# 2. Two Sum — O(n)
def two_sum(arr, target):
    seen = {}   # val → index
    for i, x in enumerate(arr):
        comp = target - x
        if comp in seen: return [seen[comp], i]
        seen[x] = i
    return []

# 3. Subarray Sum Equals K — O(n)
def subarray_sum_k(arr, k):
    count = {0: 1}   # IMPORTANT: initialize with 0:1
    prefix = ans = 0
    for x in arr:
        prefix += x
        ans += count.get(prefix - k, 0)
        count[prefix] = count.get(prefix, 0) + 1
    return ans

# 4. Detect Duplicates — O(n)
def has_duplicate(arr):
    return len(arr) != len(set(arr))

# 5. Top K Frequent Elements
def top_k(arr, k):
    freq = Counter(arr)
    return [x for x, _ in freq.most_common(k)]

# 6. Longest Substring Without Repeating Characters
def longest_no_repeat(s):
    last = {}; l = res = 0
    for r, c in enumerate(s):
        if c in last and last[c] >= l: l = last[c] + 1
        last[c] = r; res = max(res, r - l + 1)
    return res`,
        practice: [
          { name: "Two Sum", diff: "easy" },
          { name: "Subarray Sum Equals K", diff: "medium" },
          { name: "Group Anagrams", diff: "medium" },
          { name: "Top K Frequent Elements", diff: "medium" },
          { name: "Longest Substring Without Repeating Characters", diff: "medium" },
          { name: "First Non-Repeating Character", diff: "easy" }
        ]
      },
      "Complexity & Applications": {
        diff: "easy",
        explanation: "All hash table operations are O(1) average, O(n) worst case. Worst case happens when all keys collide (same hash index) — the hash table degenerates to a linked list. Good hash functions and load factor control keep average case O(1). Space is O(n). Key comparisons: Hashing vs Array — array is index-based O(1), hashing is key-based O(1) average but with collision risk. Hashing vs Tree (BST/map) — hashing O(1) average but unordered; tree O(log n) but maintains sorted order. In C++: unordered_map uses hashing (O(1) avg), map uses red-black tree (O(log n), ordered).",
        intuition: "The worst case O(n) for hashing sounds scary but is extremely rare with a good hash function. In practice, unordered_map is faster than map for most workloads. Use map only when you need sorted iteration or range queries. Rolling hash (Rabin-Karp) extends hashing to substrings — enables O(1) substring comparison, used in plagiarism detection and pattern matching.",
        steps: [
          "Insert: O(1) average. Compute hash, store at index (or chain).",
          "Search: O(1) average. Compute hash, check index (or scan chain).",
          "Delete: O(1) average. Find and remove from chain or mark tombstone.",
          "Worst case O(n): all n elements hash to same index — chain of length n.",
          "Load factor > 0.7 → rehash to table of size 2m → O(n) but rare. Amortised O(1).",
          "Python dict and C++ unordered_map: well-tuned hash tables with O(1) average for all ops."
        ],
        dryRun: `Operation Complexity:
Operation | Average | Worst  | Notes
──────────┼─────────┼────────┼───────────────────────
Insert    | O(1)    | O(n)   | All keys collide → chain
Search    | O(1)    | O(n)   | Must scan full chain
Delete    | O(1)    | O(n)   | Chaining or tombstone
Space     | O(n)    | O(n)   | Table + chains

Hashing vs Other Structures:
Structure    | Insert   | Search   | Delete   | Ordered?
─────────────┼──────────┼──────────┼──────────┼─────────
Hash Table   | O(1) avg | O(1) avg | O(1) avg | No
BST/map      | O(log n) | O(log n) | O(log n) | YES
Array        | O(1)*    | O(n)     | O(n)     | No
Sorted Array | O(n)     | O(log n) | O(n)     | YES

C++ map vs unordered_map:
unordered_map: hashing → O(1) avg, keys unordered
map:           red-black tree → O(log n), keys sorted

Python dict vs sorted:
dict:   O(1) avg all ops, Python 3.7+ preserves insertion order
sorted: O(n log n) to build, O(log n) search with bisect

Real-world uses:
  ✓ Password hashing (bcrypt, SHA)
  ✓ Database indexing (hash indexes)
  ✓ Caches (Redis, Memcached)
  ✓ Compilers (symbol tables)
  ✓ URL shorteners (hash → short code)
  ✓ Blockchain (cryptographic hashing)`,
        time: { best: "O(1) all ops", avg: "O(1) all ops", worst: "O(n) all collide" },
        space: "O(n)",
        stable: undefined,
        when: "Use hashing when O(1) lookup is needed and order doesn't matter. Use ordered map when sorted iteration or range queries required. Build frequency tables, deduplication sets, and complement lookups with hashing.",
        pros: [
          "O(1) average — fastest possible for insert/search/delete",
          "Python dict and C++ unordered_map are production-ready, well-tuned",
          "Extremely versatile — from frequency counting to LRU cache"
        ],
        cons: [
          "O(n) worst case — poor hash function or adversarial input",
          "No ordering — can't do range queries or sorted traversal",
          "Extra O(n) space — sometimes not acceptable"
        ],
        cpp: `// Hashing Applications — C++
#include <unordered_map>
#include <unordered_set>

// 1. Check if array has duplicates — O(n)
bool hasDuplicate(vector<int>& arr) {
    unordered_set<int> seen;
    for (int x : arr) {
        if (seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}

// 2. Intersection of two arrays — O(n+m)
vector<int> intersection(vector<int>& a, vector<int>& b) {
    unordered_set<int> setA(a.begin(), a.end());
    vector<int> res;
    for (int x : b)
        if (setA.count(x)) { res.push_back(x); setA.erase(x); }
    return res;
}

// 3. Custom hash for pairs (needed in C++)
struct PairHash {
    size_t operator()(const pair<int,int>& p) const {
        return hash<int>()(p.first) ^ (hash<int>()(p.second) << 16);
    }
};
unordered_map<pair<int,int>, int, PairHash> pairMap;

// 4. Rolling Hash (Rabin-Karp style)
long long rollingHash(string& s, int l, int r, long long base=31, long long mod=1e9+7) {
    long long h = 0, pw = 1;
    for (int i = l; i <= r; i++) {
        h = (h + (s[i]-'a'+1) * pw) % mod;
        pw = pw * base % mod;
    }
    return h;
}`,
        python: `# Hashing Applications — Python
from collections import defaultdict, Counter

# 1. Find all duplicates — O(n)
def find_duplicates(arr):
    freq = Counter(arr)
    return [x for x, c in freq.items() if c > 1]

# 2. Intersection of two arrays — O(n+m)
def intersection(a, b):
    set_a = set(a)
    return list(set(x for x in b if x in set_a))

# 3. LRU Cache (using OrderedDict) — O(1) all ops
from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)  # mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # remove LRU

# 4. Frequency count pattern
arr = [3,1,4,1,5,9,2,6,5,3,5]
freq = Counter(arr)
print(freq.most_common(2))  # [(5,3),(1,2)] — top 2 frequent`,
        practice: [
          { name: "Contains Duplicate", diff: "easy" },
          { name: "Intersection of Two Arrays", diff: "easy" },
          { name: "LRU Cache (LeetCode 146)", diff: "medium" },
          { name: "Find All Anagrams in a String", diff: "medium" },
          { name: "Longest Consecutive Sequence", diff: "medium" }
        ]
      }
    }
  },
  Trees: {
    icon: "🌳", diff: "medium",
    desc: "Hierarchical non-linear structure. Traversals, height, diameter, LCA — top 3 interview topic.",
    subtopics: {
      "Basics & Terminology": {
        diff: "easy",
        explanation: "A tree is a non-linear data structure used to represent hierarchical relationships. Unlike arrays or linked lists (linear), trees branch out like an inverted tree. A tree consists of nodes connected by edges. Key terms: Root — topmost node, no parent. Edge — connection between two nodes. Parent — node that has children. Child — node derived from a parent. Leaf — node with no children (degree 0). Subtree — tree formed from any node and all its descendants. Depth — number of edges from root to a node. Height — longest path from a node down to a leaf. Degree — number of children of a node. Binary Tree — each node has at most 2 children (left and right).",
        intuition: "Think of trees like an organization hierarchy (CEO → Managers → Employees), a family tree, or a folder structure (folders inside folders). You move top-down from root to leaves (searching) or bottom-up from leaves to root (computing heights, sizes). The key advantage over linear structures: O(log n) operations on balanced trees vs O(n) for arrays/linked lists.",
        steps: [
          "ROOT: single topmost node. Depth=0. Has no parent.",
          "LEAF: node with no children. Depth can be any value. Height=0.",
          "HEIGHT of node: max(height(left), height(right)) + 1. Height of leaf=0. Height of null=-1.",
          "DEPTH of node: distance from root. Root has depth 0.",
          "DEGREE: number of children. In binary tree: 0 (leaf), 1, or 2.",
          "SIZE: total number of nodes. size(node) = 1 + size(left) + size(right).",
          "For a binary tree with n nodes: height is between log₂n (balanced) and n-1 (skewed)."
        ],
        dryRun: `        1          ← root (depth=0, height=3)
       / \\
      2   3        ← depth=1
     / \\
    4   5          ← depth=2
   /
  8               ← leaf (depth=3, height=0)

Node 1: degree=2, height=3, depth=0
Node 2: degree=2, height=2, depth=1
Node 3: degree=0 (LEAF), height=0, depth=1
Node 4: degree=1, height=1, depth=2
Node 5: degree=0 (LEAF), height=0, depth=2
Node 8: degree=0 (LEAF), height=0, depth=3

Height of tree = height of root = 3
Total nodes = 6
Leaves = {3, 5, 8}

Height formula (recursive):
  h(8)=0, h(null)=-1
  h(4)=max(-1,0)+1=1
  h(5)=0
  h(2)=max(1,0)+1=2
  h(3)=0
  h(1)=max(2,0)+1=3 ✓`,
        time: { best: "O(1) root access", avg: "O(n) traversal", worst: "O(n) traversal" },
        space: "O(n) nodes / O(h) stack",
        stable: undefined,
        when: "Use trees for hierarchical data: file systems, org charts, expression parsing, network routing. Binary trees for sorted data (BST), priority access (heap), and string problems (trie).",
        pros: [
          "O(log n) operations on balanced trees",
          "Natural representation for hierarchical data",
          "Foundation for heaps, tries, segment trees, AVL trees"
        ],
        cons: [
          "O(n) on unbalanced/skewed trees (degenerates to linked list)",
          "No O(1) random access by index",
          "More complex to implement than arrays or linked lists"
        ],
        cpp: `// Binary Tree Node — C++
struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Build a simple tree
Node* root = new Node(1);
root->left  = new Node(2);
root->right = new Node(3);
root->left->left  = new Node(4);
root->left->right = new Node(5);

// Height of tree — O(n)
int height(Node* root) {
    if (!root) return -1;  // null has height -1
    return 1 + max(height(root->left), height(root->right));
}

// Size (count nodes) — O(n)
int size(Node* root) {
    if (!root) return 0;
    return 1 + size(root->left) + size(root->right);
}

// Count leaves — O(n)
int countLeaves(Node* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1; // leaf
    return countLeaves(root->left) + countLeaves(root->right);
}`,
        python: `# Binary Tree Node — Python
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

# Build a simple tree
root = Node(1)
root.left  = Node(2)
root.right = Node(3)
root.left.left  = Node(4)
root.left.right = Node(5)

# Height — O(n)
def height(root):
    if not root: return -1  # null = -1
    return 1 + max(height(root.left), height(root.right))

# Size — O(n)
def size(root):
    if not root: return 0
    return 1 + size(root.left) + size(root.right)

# Count leaves — O(n)
def count_leaves(root):
    if not root: return 0
    if not root.left and not root.right: return 1
    return count_leaves(root.left) + count_leaves(root.right)`,
        practice: [
          { name: "Maximum Depth of Binary Tree", diff: "easy" },
          { name: "Count Nodes in Complete Binary Tree", diff: "medium" },
          { name: "Symmetric Tree", diff: "easy" }
        ]
      },
      "Types of Trees": {
        diff: "easy",
        explanation: "Seven key tree types: (1) Full Binary Tree — every node has 0 or 2 children (never 1). (2) Complete Binary Tree — all levels filled except possibly the last, which is filled left to right. Heaps use this. (3) Perfect Binary Tree — all internal nodes have 2 children, all leaves at same level. n = 2^(h+1)-1 nodes. (4) Balanced Binary Tree — height is O(log n). AVL, Red-Black trees are balanced. (5) Binary Search Tree (BST) — left subtree < node < right subtree. O(log n) average search. (6) Degenerate/Skewed Tree — every node has only one child. Degenerates to linked list. O(n) operations. (7) N-ary Tree — nodes can have more than 2 children (e.g. file system folders).",
        intuition: "Complete binary tree is what a heap looks like — filled level by level left to right, so it can be stored in an array (parent at i, children at 2i+1 and 2i+2). Perfect binary tree is the ideal — all nodes used. Balanced = guarantee of O(log n). Skewed = worst case = O(n). Most interview problems assume balanced unless stated otherwise.",
        steps: [
          "FULL: leaf nodes=internal nodes+1. n nodes → (n+1)/2 leaves.",
          "COMPLETE: n nodes → height = floor(log₂n). Can be stored in array of size n.",
          "PERFECT: h levels → 2^h-1 internal nodes + 2^h leaves = 2^(h+1)-1 total nodes.",
          "BALANCED: |height(left)-height(right)| ≤ 1 for every node. Self-check recursively.",
          "BST: inorder traversal gives sorted sequence. Left < root < right at every node.",
          "SKEWED: all nodes on one side. Height=n-1. BST on sorted input → skewed!",
          "AVL/Red-Black: self-balancing BSTs that maintain O(log n) after every insert/delete."
        ],
        dryRun: `FULL binary tree:
    1
   / \\
  2   3
 / \\
4   5
Every node has 0 or 2 children ✓ (node 3 has 0, others have 2)

COMPLETE binary tree (can store in array):
    1         index 0
   / \\
  2   3       index 1,2
 / \\ /
4  5 6        index 3,4,5
parent(i)=(i-1)/2, left=2i+1, right=2i+2

PERFECT binary tree (h=2):
    1
   / \\
  2   3
 /\\ /\\
4 5 6 7
n=7=2³-1 ✓, leaves=4=2²

SKEWED (worst BST on sorted input [1,2,3,4]):
1
 \\
  2
   \\
    3
     \\
      4   ← height=3, O(n) search ✗`,
        time: { best: "O(log n) balanced", avg: "O(log n) balanced", worst: "O(n) skewed" },
        space: "O(n)",
        stable: undefined,
        when: "Complete binary tree → heaps. BST → sorted data lookups. Balanced BST (AVL/RB) → when ordered and guaranteed O(log n). Trie → string prefix problems.",
        pros: [
          "Complete/balanced: O(log n) guaranteed",
          "BST: inorder traversal gives sorted output free",
          "Perfect: maximum space efficiency"
        ],
        cons: [
          "Skewed BST: degrades to O(n) — always balance or use AVL/RB",
          "AVL/Red-Black: complex rotation logic",
          "N-ary trees: traversal more complex than binary"
        ],
        cpp: `// Tree Type Checks — C++

// Check if balanced — O(n)
int checkBalanced(Node* root) {
    if (!root) return 0;
    int lh = checkBalanced(root->left);
    if (lh == -1) return -1;
    int rh = checkBalanced(root->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;  // unbalanced!
    return 1 + max(lh, rh);
}
bool isBalanced(Node* root) { return checkBalanced(root) != -1; }

// Check if Full Binary Tree
bool isFull(Node* root) {
    if (!root) return true;
    if (!root->left && !root->right) return true;  // leaf
    if (root->left && root->right)   // both children
        return isFull(root->left) && isFull(root->right);
    return false;  // exactly one child → not full
}

// Complete binary tree — can store in array
// parent at i → children at 2i+1, 2i+2
// child at i → parent at (i-1)/2`,
        python: `# Tree Type Checks — Python

# Check balanced — O(n)
def is_balanced(root):
    def check(node):
        if not node: return 0
        lh = check(node.left)
        if lh == -1: return -1
        rh = check(node.right)
        if rh == -1: return -1
        if abs(lh - rh) > 1: return -1
        return 1 + max(lh, rh)
    return check(root) != -1

# Check full binary tree
def is_full(root):
    if not root: return True
    if not root.left and not root.right: return True
    if root.left and root.right:
        return is_full(root.left) and is_full(root.right)
    return False  # one child → not full

# Check perfect — nodes = 2^(h+1) - 1
def is_perfect(root):
    h = height(root)
    n = size(root)
    return n == (2 ** (h+1)) - 1`,
        practice: [
          { name: "Check if Tree is Balanced", diff: "easy" },
          { name: "Check Completeness of Binary Tree", diff: "medium" },
          { name: "Check if Two Trees are Identical", diff: "easy" }
        ]
      },
      "Tree Traversals": {
        diff: "easy",
        explanation: "Four fundamental tree traversal methods: (1) Inorder (Left→Root→Right) — on a BST gives sorted ascending order. (2) Preorder (Root→Left→Right) — used to copy a tree or serialize it. (3) Postorder (Left→Right→Root) — used to delete a tree (children before parent) or evaluate expression trees. (4) Level Order (BFS) — traverse level by level using a queue. Used for level-based problems, finding minimum depth, zigzag traversal. All traversals are O(n) time and O(h) space for recursive (h=height), O(n) for level order.",
        intuition: "Mnemonic: In-Pre-Post refers to when the ROOT is visited relative to children. INorder: root IN the middle. PREorder: root FIRST. POSTorder: root LAST. Level order uses a queue — natural BFS. For a BST, inorder always gives sorted output — this is the most useful property of BSTs.",
        steps: [
          "INORDER (L→Root→R): recurse left, print root, recurse right. BST → sorted output.",
          "PREORDER (Root→L→R): print root, recurse left, recurse right. Serialization order.",
          "POSTORDER (L→R→Root): recurse left, recurse right, print root. Delete/evaluate order.",
          "LEVEL ORDER: enqueue root. While queue not empty: dequeue, process, enqueue left and right children.",
          "ITERATIVE INORDER: use explicit stack. Push nodes left while going down. Pop, process, go right.",
          "BASE CASE for all: if root==NULL, return immediately."
        ],
        dryRun: `Tree:      1
          / \\
         2   3
        / \\
       4   5

INORDER  (L,Root,R): 4 → 2 → 5 → 1 → 3
  Left(2)→Left(4)→[4]→back→[2]→Right(5)→[5]→back→Root[1]→Right(3)→[3]
  Result: 4 2 5 1 3

PREORDER (Root,L,R): 1 → 2 → 4 → 5 → 3
  Root[1]→Left→Root[2]→Left→[4]→Right→[5]→back→Right→[3]
  Result: 1 2 4 5 3

POSTORDER(L,R,Root): 4 → 5 → 2 → 3 → 1
  Left→Left→[4]→Right→[5]→Root[2]→Right→[3]→Root[1]
  Result: 4 5 2 3 1

LEVEL ORDER (BFS):
  Queue=[1]
  Dequeue 1 → print 1, enqueue 2,3 → Queue=[2,3]
  Dequeue 2 → print 2, enqueue 4,5 → Queue=[3,4,5]
  Dequeue 3 → print 3, no children → Queue=[4,5]
  Dequeue 4 → print 4 → Queue=[5]
  Dequeue 5 → print 5 → Queue=[]
  Result: 1 2 3 4 5`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(h) recursive / O(n) level order",
        stable: undefined,
        when: "Inorder: BST sorted output, validate BST. Preorder: serialize/copy tree. Postorder: delete tree, evaluate expression. Level order: find minimum depth, connect level nodes, zigzag traversal.",
        pros: [
          "All traversals O(n) — visit every node exactly once",
          "Inorder on BST gives sorted order for free",
          "Level order finds shortest path to any node from root"
        ],
        cons: [
          "Recursive traversals use O(h) stack — O(n) for skewed trees",
          "Iterative versions require explicit stack or queue — more code",
          "Morris traversal gives O(1) space but modifies tree temporarily"
        ],
        cpp: `// Tree Traversals — C++ (from notes)
#include <queue>

void inorder(Node* root) {     // L → Root → R
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void preorder(Node* root) {    // Root → L → R
    if (!root) return;
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

void postorder(Node* root) {   // L → R → Root
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}

void levelOrder(Node* root) {  // BFS — level by level
    if (!root) return;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* node = q.front(); q.pop();
        cout << node->data << " ";
        if (node->left)  q.push(node->left);
        if (node->right) q.push(node->right);
    }
}

// Level order returning 2D vector (by level)
vector<vector<int>> levelOrderLevels(Node* root) {
    if (!root) return {};
    queue<Node*> q; q.push(root);
    vector<vector<int>> res;
    while (!q.empty()) {
        int sz = q.size(); vector<int> level;
        for (int i=0;i<sz;i++) {
            auto n=q.front();q.pop();
            level.push_back(n->data);
            if(n->left) q.push(n->left);
            if(n->right) q.push(n->right);
        }
        res.push_back(level);
    }
    return res;
}`,
        python: `# Tree Traversals — Python (from notes)
from collections import deque

def inorder(root):      # L → Root → R
    if not root: return
    inorder(root.left)
    print(root.data, end=" ")
    inorder(root.right)

def preorder(root):     # Root → L → R
    if not root: return
    print(root.data, end=" ")
    preorder(root.left)
    preorder(root.right)

def postorder(root):    # L → R → Root
    if not root: return
    postorder(root.left)
    postorder(root.right)
    print(root.data, end=" ")

def level_order(root):  # BFS
    if not root: return
    q = deque([root])
    while q:
        node = q.popleft()
        print(node.data, end=" ")
        if node.left:  q.append(node.left)
        if node.right: q.append(node.right)

# Level order returning list of levels
def level_order_levels(root):
    if not root: return []
    q, res = deque([root]), []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.data)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
        practice: [
          { name: "Binary Tree Inorder Traversal", diff: "easy" },
          { name: "Binary Tree Level Order Traversal", diff: "medium" },
          { name: "Binary Tree Zigzag Level Order", diff: "medium" },
          { name: "Binary Tree Right Side View", diff: "medium" }
        ]
      },
      "Important Problems": {
        diff: "medium",
        explanation: "Seven canonical tree problems every CS student must master: (1) Height/Diameter — diameter = max path through any node = left_height + right_height + 2. (2) Lowest Common Ancestor (LCA) — deepest node that is an ancestor of both given nodes. (3) Path Sum — does any root-to-leaf path sum equal target? (4) Invert Binary Tree — mirror the tree (swap left and right at every node). (5) Validate BST — check BST property using min/max bounds, not just local comparison. (6) Serialize/Deserialize — convert tree to string and back. (7) Kth Smallest in BST — inorder traversal gives sorted order; return kth element.",
        intuition: "Diameter trick: instead of computing max(leftDiameter, rightDiameter, leftH+rightH+2) separately, maintain a global max during height computation — single O(n) pass. LCA trick: if root equals p or q, root IS the LCA. If p and q are in different subtrees, root IS the LCA. Validate BST: passing min/max bounds down catches cases like [5,4,6,null,null,3,7] — the 3 passes local check (3<6) but violates global BST property.",
        steps: [
          "HEIGHT: h(null)=-1, h(node)=1+max(h(left),h(right)). O(n) recursive.",
          "DIAMETER: at each node, candidate=h(left)+h(right)+2. Track global max while computing heights. O(n).",
          "LCA: if root==null or root==p or root==q return root. Recurse left and right. If both non-null → root is LCA.",
          "INVERT: swap root.left and root.right. Recurse on both. O(n).",
          "VALIDATE BST: inorder(root,min=-∞,max=+∞). At each node: if node.val <= min or >= max → false. Recurse with updated bounds.",
          "PATH SUM: if leaf and sum==target → true. Else recurse left(target-val) or right(target-val).",
          "KTH SMALLEST: do inorder traversal, decrement k each visit. Return when k==0."
        ],
        dryRun: `── DIAMETER of tree ────────────────────────────────
Tree:     1
         / \\
        2   3
       / \\
      4   5

At node 4: h_left=-1, h_right=-1 → candidate=0
At node 5: h_left=-1, h_right=-1 → candidate=0
At node 2: h_left=0, h_right=0   → candidate=0+0+2=2, global_max=2
At node 3: h_left=-1,h_right=-1  → candidate=0
At node 1: h_left=1, h_right=0   → candidate=1+0+2=3, global_max=3 ✓
Diameter = 3 (path: 4→2→5 has length 2, but 4→2→1→3 has length 3)

── LCA of nodes 4 and 5 ────────────────────────────
lca(1,4,5): recurse left(2,4,5), recurse right(3,4,5)
  lca(2,4,5): recurse left(4,4,5)→return 4, recurse right(5,4,5)→return 5
    both non-null → return node 2 ← LCA ✓
  lca(3,4,5): left=null, right=null → return null
left=node2, right=null → return node2 ✓

── VALIDATE BST: [5,4,6,null,null,3,7] ─────────────
validate(5, -∞, +∞): 5 in range ✓
  validate(4, -∞, 5): 4 in range ✓
    left=null, right=null → true ✓
  validate(6, 5, +∞): 6 in range ✓
    validate(3, 5, +∞): 3 <= min(5) → FALSE ✗ ← caught!`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(h) recursive stack",
        stable: undefined,
        when: "These 7 problems are the core of tree interviews. Master them in order — height → diameter → LCA → path sum → invert → validate BST → serialize.",
        pros: [
          "Most problems are elegant O(n) recursive solutions",
          "Global variable trick converts O(n²) diameter to O(n)",
          "LCA has O(log n) solution for BST, O(n) for general binary tree"
        ],
        cons: [
          "Validate BST with local comparison is a classic bug — must use bounds",
          "Serialize/Deserialize has multiple approaches (preorder, level order)",
          "Diameter and height must be tracked simultaneously for O(n)"
        ],
        cpp: `// Important Tree Problems — C++

// 1. Diameter — O(n) with global max trick
int diamGlobal = 0;
int diamHelper(Node* root) {
    if (!root) return -1;
    int lh = diamHelper(root->left);
    int rh = diamHelper(root->right);
    diamGlobal = max(diamGlobal, lh + rh + 2); // update diameter
    return 1 + max(lh, rh);                    // return height
}

// 2. Lowest Common Ancestor — O(n)
Node* lca(Node* root, Node* p, Node* q) {
    if (!root || root==p || root==q) return root;
    Node* left  = lca(root->left, p, q);
    Node* right = lca(root->right, p, q);
    if (left && right) return root; // p and q in diff subtrees
    return left ? left : right;
}

// 3. Validate BST — O(n) with bounds
bool isValidBST(Node* root, long mn=LLONG_MIN, long mx=LLONG_MAX) {
    if (!root) return true;
    if (root->data <= mn || root->data >= mx) return false;
    return isValidBST(root->left, mn, root->data) &&
           isValidBST(root->right, root->data, mx);
}

// 4. Invert Binary Tree — O(n)
Node* invert(Node* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invert(root->left);
    invert(root->right);
    return root;
}

// 5. Path Sum — O(n)
bool hasPathSum(Node* root, int target) {
    if (!root) return false;
    if (!root->left && !root->right) return root->data == target;
    return hasPathSum(root->left,  target - root->data) ||
           hasPathSum(root->right, target - root->data);
}`,
        python: `# Important Tree Problems — Python

# 1. Diameter — O(n)
def diameter(root):
    max_d = [0]
    def height(node):
        if not node: return -1
        lh = height(node.left)
        rh = height(node.right)
        max_d[0] = max(max_d[0], lh + rh + 2)
        return 1 + max(lh, rh)
    height(root)
    return max_d[0]

# 2. LCA — O(n)
def lca(root, p, q):
    if not root or root == p or root == q: return root
    left  = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left and right: return root  # p,q in diff subtrees
    return left or right

# 3. Validate BST — O(n) with bounds
def is_valid_bst(root, mn=float('-inf'), mx=float('inf')):
    if not root: return True
    if root.data <= mn or root.data >= mx: return False
    return (is_valid_bst(root.left, mn, root.data) and
            is_valid_bst(root.right, root.data, mx))

# 4. Invert Binary Tree — O(n)
def invert(root):
    if not root: return None
    root.left, root.right = root.right, root.left
    invert(root.left); invert(root.right)
    return root

# 5. Kth Smallest in BST — O(n)
def kth_smallest(root, k):
    stack, node = [], root
    while stack or node:
        while node: stack.append(node); node = node.left
        node = stack.pop(); k -= 1
        if k == 0: return node.data
        node = node.right`,
        practice: [
          { name: "Diameter of Binary Tree", diff: "easy" },
          { name: "Lowest Common Ancestor", diff: "medium" },
          { name: "Validate Binary Search Tree", diff: "medium" },
          { name: "Path Sum", diff: "easy" },
          { name: "Invert Binary Tree", diff: "easy" },
          { name: "Serialize and Deserialize Binary Tree", diff: "hard" }
        ]
      },
      "Complexity & Patterns": {
        diff: "easy",
        explanation: "Tree operation complexities depend on the height h. For a balanced tree h=O(log n); for a skewed tree h=O(n). Key patterns: (1) DFS recursion — most tree problems solved with recursive post-order (compute children first, then combine at root). (2) BFS with queue — level-order problems, shortest path from root. (3) Tree DP — compute some value at each node using left and right subtree results. (4) Path sum problems — track running sum from root. (5) Height-based problems — return both height and answer from same recursive call (diameter trick). (6) Divide and conquer — split problem at root, solve subtrees independently, combine.",
        intuition: "The divide-and-conquer pattern is the most powerful tree technique. For almost any tree problem: solve for left subtree, solve for right subtree, combine results at the current node. This naturally gives O(n) for most problems. The 'return multiple values' trick (return height AND answer together) avoids O(n²) repeated computations.",
        steps: [
          "TRAVERSAL: O(n) time, O(h) space. DFS uses call stack, BFS uses queue.",
          "BST operations (balanced): O(log n). BST operations (skewed): O(n).",
          "Always check: is root==NULL before accessing root->left or root->data.",
          "DFS PATTERN: base case → recurse left → recurse right → combine.",
          "BFS PATTERN: enqueue root → while queue: dequeue, process, enqueue children.",
          "TREE DP: solve subproblem at each node using subtree results. Return value upward."
        ],
        dryRun: `Complexity by tree type:
Operation  | Balanced BST | Skewed BST | General BT
───────────┼──────────────┼────────────┼───────────
Search     | O(log n)     | O(n)       | O(n)
Insert     | O(log n)     | O(n)       | O(n)
Delete     | O(log n)     | O(n)       | O(n)
Traversal  | O(n)         | O(n)       | O(n)
Height     | O(log n)     | O(n)       | O(n)
Space      | O(log n)     | O(n)       | O(n) stack

Pattern → Problem mapping:
  DFS post-order    → height, diameter, path sum
  DFS pre-order     → path problems, serialize
  DFS inorder       → BST sorted output, kth smallest
  BFS level order   → level-wise, min depth, right view
  Tree DP           → max path sum, rob houses on tree
  Divide & Conquer  → LCA, count nodes, validate BST

Common bug: validating BST only locally
  [5,4,6,null,null,3,7] — node 3 passes local check (3<6)
  but violates global BST property (3 < root=5) → INVALID
  Fix: pass min/max bounds down the tree ✓`,
        time: { best: "O(log n) balanced", avg: "O(n) general", worst: "O(n) skewed" },
        space: "O(h) stack / O(n) level order",
        stable: undefined,
        when: "DFS for most tree problems. BFS when level matters. Tree DP when combining subtree results. Always ensure tree is balanced for O(log n) — use AVL or Red-Black in practice.",
        pros: [
          "O(n) traversals cover most interview problems",
          "Recursive solutions are concise and elegant",
          "Tree DP extends dynamic programming to hierarchical structures"
        ],
        cons: [
          "Recursion stack overflow for very deep trees (use iterative for safety)",
          "Skewed trees destroy O(log n) guarantees — balance in production",
          "Tree problems require strong base case intuition"
        ],
        cpp: `// Tree Patterns — C++

// DFS post-order template (most common pattern)
int dfsPostorder(Node* root) {
    if (!root) return BASE_VALUE;    // base case
    int left  = dfsPostorder(root->left);   // solve left
    int right = dfsPostorder(root->right);  // solve right
    return combine(left, right, root->data); // combine
}

// Maximum Path Sum (classic Tree DP)
int maxPathGlobal = INT_MIN;
int maxPathHelper(Node* root) {
    if (!root) return 0;
    int l = max(0, maxPathHelper(root->left));   // ignore negatives
    int r = max(0, maxPathHelper(root->right));
    maxPathGlobal = max(maxPathGlobal, l + r + root->data);
    return root->data + max(l, r);  // return max single branch
}

// Serialize (preorder) — O(n)
string serialize(Node* root) {
    if (!root) return "#,";
    return to_string(root->data)+","+serialize(root->left)+serialize(root->right);
}

// BFS right side view
vector<int> rightSideView(Node* root) {
    if (!root) return {};
    queue<Node*> q; q.push(root);
    vector<int> res;
    while (!q.empty()) {
        int sz=q.size();
        for(int i=0;i<sz;i++){
            auto n=q.front();q.pop();
            if(i==sz-1) res.push_back(n->data); // rightmost
            if(n->left) q.push(n->left);
            if(n->right) q.push(n->right);
        }
    }
    return res;
}`,
        python: `# Tree Patterns — Python

# DFS post-order template
def dfs_postorder(root):
    if not root: return BASE_VALUE
    left  = dfs_postorder(root.left)
    right = dfs_postorder(root.right)
    return combine(left, right, root.data)

# Maximum Path Sum (Tree DP)
def max_path_sum(root):
    res = [float('-inf')]
    def helper(node):
        if not node: return 0
        l = max(0, helper(node.left))   # ignore negatives
        r = max(0, helper(node.right))
        res[0] = max(res[0], l + r + node.data)
        return node.data + max(l, r)
    helper(root)
    return res[0]

# Iterative inorder (no recursion) — O(n), O(h)
def inorder_iterative(root):
    stack, result, node = [], [], root
    while stack or node:
        while node: stack.append(node); node = node.left
        node = stack.pop()
        result.append(node.data)
        node = node.right
    return result`,
        practice: [
          { name: "Binary Tree Maximum Path Sum", diff: "hard" },
          { name: "Serialize and Deserialize Binary Tree", diff: "hard" },
          { name: "Binary Tree Right Side View", diff: "medium" },
          { name: "Maximum Depth of Binary Tree", diff: "easy" },
          { name: "Construct Binary Tree from Preorder and Inorder", diff: "medium" }
        ]
      }
    }
  },
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

// ─── NODE VISUALIZER ─────────────────────────────────────────────
function NodeViz({ nodes, showHead = true, hl = {} }) {
  return (
    <div className="ll-viz">
      {nodes.map((n, i) => (
        <div className="ll-node" key={i}>
          <div className="ll-wrap">
            {showHead && i === 0 ? <div className="ll-head-lbl">head</div> : <div style={{ height: 18 }} />}
            <div className="ll-box" style={hl[i] ? { borderColor: hl[i] } : {}}>
              <div className="ll-data" style={hl[i] ? { color: hl[i] } : {}}>{n.val}</div>
              <div className="ll-next">{i < nodes.length - 1 ? "next →" : "next"}</div>
            </div>
            {n.label && <div className="ll-lbl">{n.label}</div>}
          </div>
          {i < nodes.length - 1 && <div className="ll-arrow">→</div>}
          {i === nodes.length - 1 && <div className="ll-null">→ NULL</div>}
        </div>
      ))}
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

  const dryRunHtml = (data.dryRun || "")
    .replace(/✓/g, '<span class="hl">✓</span>')
    .replace(/→/g, '<span style="color:var(--accent2)">→</span>')
    .replace(/⚠/g, '<span style="color:var(--yellow)">⚠</span>');

  const is = (n) => name === n;

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
      {is("Introduction & Memory") && (
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
      {is("Key Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Prefix Sum", "Sliding Window", "Two Pointers", "Kadane's Algorithm", "Dutch National Flag", "Binary Search"].map(p => (
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
      {is("Complexity & Edge Cases") && (
        <div className="sec">
          <div className="stitle">Quick Reference Table</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Access arr[i]", "O(1)", "O(1)", "O(1)", "O(1)", "g", "g", "g", "g"],
                ["Search (linear)", "O(1)", "O(n)", "O(n)", "O(1)", "g", "y", "y", "g"],
                ["Insert (middle)", "O(n)", "O(n)", "O(n)", "O(1)", "y", "y", "y", "g"],
                ["Delete (middle)", "O(n)", "O(n)", "O(n)", "O(1)", "y", "y", "y", "g"],
                ["Append (dynamic)", "O(1)", "O(1)*", "O(n)", "O(1)", "g", "g", "y", "g"],
                ["Binary Search", "O(1)", "O(log n)", "O(log n)", "O(1)", "g", "g", "g", "g"],
              ].map(([op, b, avg, w, sp, cb, ca, cw, cs]) => (
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
          <div style={{ fontSize: ".68rem", color: "var(--text3)", marginTop: 6, fontFamily: "'Space Mono',monospace" }}>* amortised — occasional O(n) resize</div>
        </div>
      )}

      {/* Strings: representation comparison */}
      {is("Basics & Representations") && (
        <div className="sec">
          <div className="stitle">Representation Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Null-Terminated</th><th>Pointer / Length</th></tr></thead>
            <tbody>
              {[
                ["Get length", "O(n) scan to $", "O(1) already stored"],
                ["Get char at i", "O(1)", "O(1)"],
                ["Extract substring", "O(k) copy", "O(1) new (p+i, m) pair"],
                ["Used in", "C, C++ char*", "Tries, Patricia, Suffix Trees"],
              ].map(([op, nt, pl], idx) => (
                <tr key={idx}>
                  <td className="op">{op}</td>
                  <td style={{ color: "var(--yellow)", fontFamily: "Space Mono,monospace", fontSize: ".76rem" }}>{nt}</td>
                  <td style={{ color: "var(--green)", fontFamily: "Space Mono,monospace", fontSize: ".76rem" }}>{pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{ marginTop: 12 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Key insight:</strong> Pointer/length substring is pure arithmetic — no copying. Patricia Trees and Suffix Trees store all substrings in O(n) total space using this trick.</div>
          </div>
        </div>
      )}

      {/* Strings: pattern quick map */}
      {is("Core Techniques") && (
        <div className="sec">
          <div className="stitle">Pattern Quick Map</div>
          <table className="fn-table">
            <thead><tr><th>Problem Type</th><th>Pattern</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Palindrome check", "Two Pointers", "O(n)"],
                ["Anagram / frequency", "Freq Count[26]", "O(n)"],
                ["Longest no-repeat substr", "Sliding Window + Map", "O(n)"],
                ["Pattern in text", "KMP / Z-algo", "O(n+m)"],
                ["Prefix / autocomplete", "Trie", "O(|s|)"],
                ["Subsequences / edit ops", "DP 2D table", "O(n*m)"],
              ].map(([prob, pat, t], idx) => (
                <tr key={idx}>
                  <td style={{ color: "var(--text)" }}>{prob}</td>
                  <td className="op">{pat}</td>
                  <td style={{ color: "var(--green)", fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Strings: algorithm comparison */}
      {is("Pattern Matching") && (
        <div className="sec">
          <div className="stitle">Algorithm Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Algorithm</th><th>Preprocess</th><th>Search</th><th>Worst</th><th>Best for</th></tr></thead>
            <tbody>
              {[
                ["Naive", "O(1)", "O(n)", "O(nm)", "r", "tiny n,m"],
                ["KMP", "O(m)", "O(n)", "O(n+m)", "g", "single pattern"],
                ["Z-Algorithm", "O(n+m)", "O(n+m)", "O(n+m)", "g", "single pattern"],
                ["Rabin-Karp", "O(m)", "O(n)", "O(nm) collision", "y", "multiple patterns"],
                ["Aho-Corasick", "O(sum|p|)", "O(n+k)", "O(n+k)", "g", "many patterns"],
              ].map(([algo, pre, srch, worst, c, use], idx) => (
                <tr key={idx}>
                  <td className="op">{algo}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{pre}</td>
                  <td style={{ color: "var(--green)", fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{srch}</td>
                  <td className={`cx-${c}`} style={{ fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{worst}</td>
                  <td style={{ color: "var(--text3)", fontSize: ".74rem" }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Linked List: node visualizer */}
      {is("Basics & Node Structure") && (
        <div className="sec">
          <div className="stitle">What a Linked List Looks Like</div>
          <div className="prose" style={{ marginBottom: 8 }}>Each node: <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4, fontFamily: "'Space Mono',monospace", fontSize: ".82rem" }}>[ data | next→ ]</code> pointing to the next node.</div>
          <NodeViz nodes={[{ val: 10 }, { val: 20 }, { val: 30 }, { val: 40 }]} />
          <div className="callout callout-tip" style={{ marginTop: 12 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>vs Array:</strong> Nodes are NOT contiguous in memory. No address formula. Access = O(n). Insert at head = O(1) — just update two pointers.</div>
          </div>
        </div>
      )}

      {/* Linked List: types visual */}
      {is("Types of Linked Lists") && (
        <div className="sec">
          <div className="stitle">Visual Comparison</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={{ fontSize: ".72rem", color: "var(--accent3)", fontFamily: "'Space Mono',monospace", marginBottom: 6 }}>SINGLY — forward only</div>
              <NodeViz nodes={[{ val: "A" }, { val: "B" }, { val: "C" }, { val: "D" }]} />
            </div>
            <div>
              <div style={{ fontSize: ".72rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>DOUBLY — bidirectional, O(1) delete with node pointer</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".78rem", color: "var(--text2)", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px" }}>
                NULL ← <span style={{ color: "var(--accent2)" }}>A</span> ⇄ <span style={{ color: "var(--accent2)" }}>B</span> ⇄ <span style={{ color: "var(--accent2)" }}>C</span> ⇄ <span style={{ color: "var(--accent2)" }}>D</span> → NULL
              </div>
            </div>
            <div>
              <div style={{ fontSize: ".72rem", color: "var(--yellow)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>CIRCULAR — last node points back to head ↺</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".78rem", color: "var(--text2)", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px" }}>
                <span style={{ color: "var(--yellow)" }}>A</span> → <span style={{ color: "var(--yellow)" }}>B</span> → <span style={{ color: "var(--yellow)" }}>C</span> → <span style={{ color: "var(--yellow)" }}>D</span> → (back to A)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked List: core ops badges */}
      {is("Core Operations") && (
        <div className="sec">
          <div className="stitle">Operation Complexities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Insert Head — O(1)</span>
            <span className="op-badge ob-on">Insert End — O(n)</span>
            <span className="op-badge ob-on">Insert at k — O(n)</span>
            <span className="op-badge ob-o1">Delete Head — O(1)</span>
            <span className="op-badge ob-on">Delete End — O(n)</span>
            <span className="op-badge ob-on">Search — O(n)</span>
            <span className="op-badge ob-on">Access — O(n)</span>
          </div>
          <div className="callout callout-warn">
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>vs Array:</strong> Array = O(1) access, O(n) insert (shifting). Linked List = O(1) head insert/delete, O(n) access. Choose based on your dominant operation.</div>
          </div>
        </div>
      )}

      {/* Linked List: slow-fast visualizer */}
      {is("Slow-Fast Pointer") && (
        <div className="sec">
          <div className="stitle">Finding Middle — After 2 Steps</div>
          <NodeViz
            nodes={[{ val: 1, label: "slow/fast" }, { val: 2 }, { val: 3, label: "slow" }, { val: 4 }, { val: 5, label: "fast" }]}
            hl={{ 0: "var(--green)", 2: "var(--green)", 4: "var(--accent2)" }}
          />
          <div style={{ fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 4 }}>
            🟢 slow = node[2] (middle) &nbsp;&nbsp; 🟣 fast = node[4] (end) ✓
          </div>
          <div className="callout callout-tip" style={{ marginTop: 10 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Cycle detection (Floyd's):</strong> If slow == fast → cycle. Then move slow to head, advance both 1-step → meeting point = cycle start node.</div>
          </div>
        </div>
      )}

      {/* Linked List: reverse & classics must-know table */}
      {is("Reverse & Classic Algorithms") && (
        <div className="sec">
          <div className="stitle">Must-Know Problems Cheatsheet</div>
          <table className="fn-table">
            <thead><tr><th>Problem</th><th>Key Technique</th><th>Time</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Reverse LL", "3-pointer (prev,curr,next)", "O(n)", "O(1)"],
                ["Detect Cycle", "Floyd's slow-fast", "O(n)", "O(1)"],
                ["Find Cycle Start", "Move ptr to head + 1-step", "O(n)", "O(1)"],
                ["Find Middle", "Slow-fast pointer", "O(n)", "O(1)"],
                ["Palindrome LL", "Find mid + reverse 2nd half", "O(n)", "O(1)"],
                ["Merge Two Sorted", "Dummy node + two ptrs", "O(n+m)", "O(1)"],
                ["Remove Nth from End", "Two ptrs gap of n", "O(n)", "O(1)"],
                ["Intersection of Two", "Switch lists on null", "O(n+m)", "O(1)"],
                ["Reverse K-Groups", "Recurse + reverse chunk", "O(n)", "O(k)"],
              ].map(([p, t, ti, sp]) => (
                <tr key={p}>
                  <td style={{ color: "var(--text2)", fontSize: ".78rem" }}>{p}</td>
                  <td className="op" style={{ fontSize: ".74rem" }}>{t}</td>
                  <td style={{ color: "var(--green)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{ti}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Linked List: complexity guide */}
      {is("Complexity & Interview Guide") && (
        <div className="sec">
          <div className="stitle">Full Operation Reference</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Space</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["Access (index)", "O(n)", "O(1)", "Traverse from head"],
                ["Search", "O(n)", "O(1)", "Scan each node"],
                ["Insert (head)", "O(1)", "O(1)", "Signature advantage over array"],
                ["Insert (end/mid)", "O(n)", "O(1)", "Traverse to position first"],
                ["Delete (head)", "O(1)", "O(1)", "Just update head pointer"],
                ["Delete (end/mid)", "O(n)", "O(1)", "Traverse to prev node"],
                ["Reverse", "O(n)", "O(1)", "3-pointer iterative"],
                ["Detect cycle", "O(n)", "O(1)", "Floyd's algorithm"],
              ].map(([op, t, sp, note]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{ color: t === "O(1)" ? "var(--green)" : "var(--yellow)", fontFamily: "'Space Mono',monospace", fontSize: ".74rem" }}>{t}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "'Space Mono',monospace", fontSize: ".74rem" }}>{sp}</td>
                  <td style={{ color: "var(--text3)", fontSize: ".74rem" }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stack: LIFO visualizer */}
      {is("Basics & LIFO") && (
        <div className="sec">
          <div className="stitle">LIFO Visualized</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: ".68rem", color: "var(--accent)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>← top</div>
              {[30, 20, 10].map((v, i) => (
                <div key={i} style={{ background: i === 0 ? "var(--accent)" : "var(--bg3)", border: "1px solid var(--accent2)", borderRadius: 6, padding: "8px 24px", fontFamily: "'Space Mono',monospace", fontSize: ".85rem", fontWeight: 700, color: i === 0 ? "#fff" : "var(--text2)", width: 120, textAlign: "center" }}>{v}</div>
              ))}
              <div style={{ fontSize: ".6rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 4 }}>stack bottom</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="callout callout-tip" style={{ marginTop: 0, minWidth: 200 }}>
                <span className="callout-icon">💡</span>
                <div className="callout-text"><strong>Push(40)</strong> → goes on top. <strong>Pop()</strong> removes 30 (top). Stack is LIFO — Last In, First Out.</div>
              </div>
              <div className="callout callout-warn" style={{ marginTop: 0 }}>
                <span className="callout-icon">⚠️</span>
                <div className="callout-text">Push when full → <strong>OVERFLOW</strong>. Pop when empty → <strong>UNDERFLOW</strong>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stack: operations complexity table */}
      {is("Applications & Complexity") && (
        <div className="sec">
          <div className="stitle">Operations at a Glance</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Push — O(1)</span>
            <span className="op-badge ob-o1">Pop — O(1)</span>
            <span className="op-badge ob-o1">Peek — O(1)</span>
            <span className="op-badge ob-o1">isEmpty — O(1)</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Feature</th><th>Array Stack</th><th>LL Stack</th></tr></thead>
            <tbody>
              {[
                ["Size","Fixed (MAXSIZE)","Dynamic"],
                ["Speed","Faster (cache)","Slightly slower"],
                ["Overflow","Yes (at MAXSIZE)","Only if out of memory"],
                ["Extra memory","None","Pointer per node"],
                ["Best for","Known max size","Unknown/variable size"],
              ].map(([f,a,l]) => (
                <tr key={f}>
                  <td className="op">{f}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{a}</td>
                  <td style={{color:"var(--accent2)",fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stack: notation conversion quick ref */}
      {is("Polish Notations") && (
        <div className="sec">
          <div className="stitle">Notation Quick Reference</div>
          <table className="fn-table">
            <thead><tr><th>Notation</th><th>Operator Position</th><th>Example A+B</th><th>Parentheses?</th></tr></thead>
            <tbody>
              {[
                ["Infix","Between operands","A + B","Required"],
                ["Prefix","Before operands","+ A B","Not needed"],
                ["Postfix","After operands","A B +","Not needed"],
              ].map(([n,p,e,par]) => (
                <tr key={n}>
                  <td className="op">{n}</td>
                  <td style={{color:"var(--text2)",fontSize:".78rem"}}>{p}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".76rem"}}>{e}</td>
                  <td style={{color:par==="Not needed"?"var(--green)":"var(--yellow)",fontSize:".76rem"}}>{par}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:12}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Operator precedence:</strong> ^ (highest) &gt; *, / &gt; +, - (lowest). Right-to-left for ^ (right-associative). This determines parenthesization order in infix→postfix conversion.</div>
          </div>
        </div>
      )}

      {/* Stack: patterns pill overview */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Balanced Parentheses","Next Greater Element","Previous Smaller Element","Monotonic Stack","Min Stack","Largest Rectangle","Stock Span","Trapping Rain Water"].map(p => (
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Monotonic stack key insight:</strong> Each element is pushed and popped at most once → O(n) total, even with the inner while loop. This amortised analysis is what makes it efficient.</div>
          </div>
        </div>
      )}

      {/* Queue: FIFO visualizer */}
      {is("Basics & FIFO") && (
        <div className="sec">
          <div className="stitle">FIFO Visualized</div>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 20px", overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 8 }}>
              <div style={{ fontSize: ".68rem", color: "var(--accent3)", fontFamily: "'Space Mono',monospace", marginRight: 8, flexShrink: 0 }}>FRONT →</div>
              {[10, 20, 30, 40].map((v, i) => (
                <div key={i} style={{ background: i === 0 ? "var(--accent3)" : "var(--bg3)", border: "1px solid var(--accent2)", padding: "10px 16px", fontFamily: "'Space Mono',monospace", fontSize: ".85rem", fontWeight: 700, color: i === 0 ? "#000" : "var(--text2)", borderRight: i < 3 ? "none" : "1px solid var(--accent2)", minWidth: 50, textAlign: "center" }}>{v}</div>
              ))}
              <div style={{ fontSize: ".68rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginLeft: 8, flexShrink: 0 }}>← REAR</div>
            </div>
            <div style={{ fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace" }}>
              Dequeue() removes 10 (front) ✓ &nbsp;|&nbsp; Enqueue(50) adds at rear ✓
            </div>
          </div>
          <div className="callout callout-tip" style={{ marginTop: 10 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Queue vs Stack:</strong> Stack removes from the SAME end you insert (LIFO). Queue removes from the OPPOSITE end (FIFO). Queue = fair. Stack = last-in priority.</div>
          </div>
        </div>
      )}

      {/* Queue: types overview */}
      {is("Types of Queues") && (
        <div className="sec">
          <div className="stitle">Types at a Glance</div>
          <div className="constraint-row">
            {[
              ["Simple Queue", "FIFO. Insert rear, remove front. Array wastes space after dequeues."],
              ["Circular Queue", "rear=(rear+1)%size. Reuses freed slots. Fixes wasted space."],
              ["Priority Queue", "Backed by heap. O(log n) ops. Used in Dijkstra, Prim's."],
              ["Deque", "Both ends. appendleft/popleft + append/pop. Most flexible."],
            ].map(([n, d]) => (
              <div className="cr-card" key={n} style={{ minWidth: 140 }}>
                <div className="cr-n" style={{ fontSize: ".75rem" }}>{n}</div>
                <div className="cr-algo">{d}</div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Circular Queue:</strong> The modulo trick <code style={{ fontFamily: "'Space Mono',monospace" }}>rear = (rear+1) % size</code> wraps the index back to 0 when it hits the end — eliminating wasted space without moving elements.</div>
          </div>
        </div>
      )}

      {/* Queue: two stacks op-badge */}
      {is("Queue using Two Stacks") && (
        <div className="sec">
          <div className="stitle">Amortised Analysis</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Enqueue — O(1)</span>
            <span className="op-badge ob-on">Dequeue — O(n) worst</span>
            <span className="op-badge ob-o1">Dequeue — O(1) amortised</span>
          </div>
          <div className="theorem-box">
            <div className="theorem-label">Why O(1) amortised?</div>
            <div className="theorem-text">Each element: pushed to S1 once (O(1)) → moved to S2 once (O(1)) → popped from S2 once (O(1)). Total = O(3) per element = O(1) amortised, even though a single pour costs O(n).</div>
          </div>
        </div>
      )}

      {/* Queue: patterns pills */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["BFS","Level Order Traversal","Sliding Window Max (Deque)","Rotten Oranges","First Non-Repeating","Generate Binary Numbers","Producer-Consumer","Multi-source BFS"].map(p => (
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>BFS = Queue. DFS = Stack.</strong> This mapping is fundamental. Level-order traversal uses BFS level-by-level: process all nodes at distance d before distance d+1.</div>
          </div>
        </div>
      )}

      {/* Queue: complexity comparison table */}
      {is("Complexity & Applications") && (
        <div className="sec">
          <div className="stitle">Operation Complexity</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Enqueue — O(1)</span>
            <span className="op-badge ob-o1">Dequeue — O(1)</span>
            <span className="op-badge ob-o1">Peek — O(1)</span>
            <span className="op-badge ob-on">Python list.pop(0) — O(n) ⚠</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Array/LL</th><th>Python list</th><th>Python deque</th></tr></thead>
            <tbody>
              {[
                ["Enqueue","O(1)","O(1) append","O(1) append"],
                ["Dequeue","O(1)","O(n) pop(0) ⚠","O(1) popleft ✓"],
                ["Peek","O(1)","O(1)","O(1)"],
                ["Space","O(n)","O(n)","O(n)"],
              ].map(([op,a,pl,pd]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{a}</td>
                  <td style={{color:pl.includes("⚠")?"var(--red)":"var(--text2)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{pl}</td>
                  <td style={{color:pd.includes("✓")?"var(--green)":"var(--text2)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{pd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recursion: call stack visualizer */}
      {is("Basics & Call Stack") && (
        <div className="sec">
          <div className="stitle">Call Stack Visualization — factorial(3)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 320 }}>
            {[
              { label: "factorial(0)", phase: "base", color: "var(--accent3)" },
              { label: "factorial(1)", phase: "waiting", color: "var(--accent2)" },
              { label: "factorial(2)", phase: "waiting", color: "var(--accent2)" },
              { label: "factorial(3)", phase: "first", color: "var(--accent)" },
            ].map((f, i) => (
              <div key={i} style={{ background: i === 0 ? "rgba(6,255,165,.12)" : "var(--bg3)", border: `1px solid ${f.color}`, borderBottom: i < 3 ? "none" : `1px solid ${f.color}`, padding: "8px 16px", fontFamily: "'Space Mono',monospace", fontSize: ".78rem", color: f.color, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{f.label}</span>
                <span style={{ fontSize: ".65rem", color: "var(--text3)" }}>{i === 0 ? "← BASE (top of stack)" : i === 3 ? "← first call" : "← waiting"}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: ".68rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 6 }}>Frames push on call, pop on return. Bottom = first call, top = deepest call.</div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚠️</span>
            <div className="callout-text"><strong>Stack Overflow:</strong> If the base case is missing or never reached, frames push indefinitely until the OS kills the process. Always verify the base case is reachable.</div>
          </div>
        </div>
      )}

      {/* Recursion: types comparison */}
      {is("Types of Recursion") && (
        <div className="sec">
          <div className="stitle">Types at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Type</th><th>Description</th><th>Example</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Tail","Last op = recursive call","fact_tail(n-1, n*acc)","O(1) with TCO"],
                ["Non-Tail","Work after recursive call","n * fact(n-1)","O(n) stack"],
                ["Linear","One call per function","factorial, binary search","O(n)"],
                ["Tree","Multiple calls per function","fib(n-1)+fib(n-2)","O(n) depth"],
                ["Mutual","A calls B, B calls A","isEven↔isOdd","O(n)"],
              ].map(([t,d,e,s]) => (
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td style={{color:"var(--text2)",fontSize:".76rem"}}>{d}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{e}</td>
                  <td style={{color:s.includes("1)")?"var(--green)":"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Tree recursion warning:</strong> fib(n) without memoization makes O(2^n) calls. fib(50) = ~10^15 calls. Always memoize tree recursion!</div>
          </div>
        </div>
      )}

      {/* Recursion: key algorithms complexity cards */}
      {is("Key Algorithms") && (
        <div className="sec">
          <div className="stitle">Algorithm Complexity</div>
          <table className="fn-table">
            <thead><tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Type</th></tr></thead>
            <tbody>
              {[
                ["Factorial","O(n)","O(n) stack","Linear","g"],
                ["Fibonacci (naive)","O(2^n)","O(n)","Tree","r"],
                ["Fibonacci (memo)","O(n)","O(n)","Linear","g"],
                ["Tower of Hanoi","O(2^n)","O(n)","Tree","y"],
                ["Binary Search","O(log n)","O(log n)","Linear","g"],
                ["Merge Sort","O(n log n)","O(n)","Tree","g"],
              ].map(([a,t,s,type,c]) => (
                <tr key={a}>
                  <td className="op">{a}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{t}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{s}</td>
                  <td style={{color:"var(--text3)",fontSize:".73rem"}}>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recursion: backtracking pattern template */}
      {is("Backtracking Pattern") && (
        <div className="sec">
          <div className="stitle">Backtracking Template</div>
          <div className="theorem-box">
            <div className="theorem-label">Universal Pattern</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".78rem",lineHeight:2}}>
              {"for each option in choices:"}<br/>
              {"  if is_valid(option):       // PRUNE"}<br/>
              {"    apply(option)            // CHOOSE"}<br/>
              {"    backtrack(next_state)    // EXPLORE"}<br/>
              {"    undo(option)             // UNCHOOSE ← crucial!"}
            </div>
          </div>
          <div className="pattern-pills" style={{marginTop:10}}>
            {["Subsets O(2^n)","Permutations O(n!)","Combination Sum","N-Queens","Sudoku Solver","Word Search"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Most common bug:</strong> Forgetting the <code style={{fontFamily:"'Space Mono',monospace"}}>undo</code> step. Without it, choices from one branch corrupt the next — results will be wrong or duplicated.</div>
          </div>
        </div>
      )}

      {/* Recursion: memo vs naive comparison */}
      {is("Memoization & Optimization") && (
        <div className="sec">
          <div className="stitle">Naive vs Memoized</div>
          <table className="fn-table">
            <thead><tr><th>Approach</th><th>fib(10)</th><th>fib(40)</th><th>fib(100)</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Naive recursion","177 calls","~330M calls","TIMEOUT","O(n) stack","r"],
                ["Memoization","11 calls","41 calls","101 calls","O(n)","g"],
                ["Tabulation (DP)","O(n) ops","O(n) ops","O(n) ops","O(n)","g"],
                ["Space-optimised","O(n) ops","O(n) ops","O(n) ops","O(1)","g"],
              ].map(([a,t10,t40,t100,sp,c]) => (
                <tr key={a}>
                  <td className="op" style={{fontSize:".75rem"}}>{a}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{t10}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{t40}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{t100}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Two DP criteria:</strong> (1) Overlapping Subproblems — same inputs recomputed. (2) Optimal Substructure — optimal solution built from optimal subsolutions. If both hold → DP applies.</div>
          </div>
        </div>
      )}

      {/* Searching: linear search step visualizer */}
      {is("Basics & Linear Search") && (
        <div className="sec">
          <div className="stitle">Linear Search — Step by Step</div>
          <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", marginBottom: 8 }}>
            {[-15,-6,0,7,9,23].map((v, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 48 }}>
                <div style={{ background: i === 3 ? "var(--accent3)" : i < 3 ? "rgba(255,92,92,.15)" : "var(--bg3)", border: `1px solid ${i===3?"var(--accent3)":i<3?"var(--red)":"var(--border)"}`, borderRight: i < 5 ? "none" : `1px solid ${i===3?"var(--accent3)":"var(--border)"}`, padding: "9px 4px", fontFamily: "'Space Mono',monospace", fontSize: ".8rem", fontWeight: 700, color: i===3?"#000":i<3?"var(--red)":"var(--text2)", width: "100%", textAlign: "center" }}>{v}</div>
                <div style={{ fontSize: ".62rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 3 }}>[{i}]</div>
                <div style={{ fontSize: ".6rem", color: i===3?"var(--accent3)":i<3?"var(--red)":"var(--text3)", marginTop: 2 }}>{i===3?"✓":i<3?"✗":""}</div>
              </div>
            ))}
            <div style={{ padding: "0 12px", color: "var(--text3)", fontSize: ".75rem" }}>...</div>
          </div>
          <div style={{ fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace" }}>Searching for 7 — found at index 3 after 4 comparisons. Red = no match, Green = found.</div>
          <div className="callout callout-tip" style={{ marginTop: 10 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>When linear beats binary:</strong> Unsorted data (can't binary search), linked lists (no O(1) mid), small n&lt;50 (overhead not worth it), one-time search (sorting cost not justified).</div>
          </div>
        </div>
      )}

      {/* Searching: binary search visual */}
      {is("Binary Search") && (
        <div className="sec">
          <div className="stitle">Binary Search — Halving the Space</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { arr: [4,7,8,9,16,"→20←",24,38,39,45,54,77], label: "Step 1: mid=20, key=4 < 20 → search LEFT", hi: 5 },
              { arr: [4,7,"→8←",9,16], label: "Step 2: mid=8, key=4 < 8 → search LEFT", hi: 2 },
              { arr: ["→4←",7], label: "Step 3: mid=4, FOUND ✓", hi: 0 },
            ].map((row, i) => (
              <div key={i} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: ".68rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>{row.label}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {row.arr.map((v, j) => (
                    <span key={j} style={{ padding: "3px 8px", borderRadius: 4, background: String(v).includes("→") ? "var(--accent)" : "var(--bg3)", color: String(v).includes("→") ? "#fff" : "var(--text2)", fontFamily: "'Space Mono',monospace", fontSize: ".75rem", fontWeight: String(v).includes("→") ? 700 : 400 }}>{String(v).replace(/→|←/g, "")}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Overflow bug:</strong> <code style={{ fontFamily: "'Space Mono',monospace" }}>mid = (lo+hi)/2</code> overflows when lo+hi &gt; INT_MAX. Always use <code style={{ fontFamily: "'Space Mono',monospace" }}>mid = lo + (hi-lo)/2</code> ✓</div>
          </div>
        </div>
      )}

      {/* Searching: variants pattern pills */}
      {is("Binary Search Variants") && (
        <div className="sec">
          <div className="stitle">Variant Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Lower Bound","Upper Bound","First Occurrence","Last Occurrence","Count Occurrences","Rotated Sorted Array","Peak Element","Binary Search on Answer"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{ marginTop: 12 }}>
            <div className="theorem-label">Key insight — First vs Last Occurrence</div>
            <div className="theorem-text" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".76rem", lineHeight: 2 }}>
              {"First: when arr[mid]==key → result=mid, hi=mid-1  (keep left)"}<br/>
              {"Last:  when arr[mid]==key → result=mid, lo=mid+1  (keep right)"}<br/>
              {"Count: last_occurrence - first_occurrence + 1"}
            </div>
          </div>
        </div>
      )}

      {/* Searching: technique comparison table */}
      {is("Complexity & Comparison") && (
        <div className="sec">
          <div className="stitle">All Techniques at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Technique</th><th>Time</th><th>Space</th><th>Sorted?</th><th>Structure</th></tr></thead>
            <tbody>
              {[
                ["Linear","O(n)","O(1)","No","Any","y"],
                ["Binary","O(log n)","O(1)","YES","Array only","g"],
                ["Interpolation","O(log log n)*","O(1)","YES+uniform","Array","g"],
                ["Exponential","O(log n)","O(1)","YES","Array/unknown","g"],
                ["Jump","O(√n)","O(1)","YES","Array","y"],
                ["Hashing","O(1) avg","O(n)","No","Hash table","g"],
              ].map(([t,time,sp,sort,str,c])=>(
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{time}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{sp}</td>
                  <td style={{color:sort==="No"?"var(--green)":"var(--yellow)",fontSize:".73rem"}}>{sort}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{str}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{fontSize:".66rem",color:"var(--text3)",fontFamily:"'Space Mono',monospace",marginTop:4}}>* interpolation average for uniformly distributed data</div>
        </div>
      )}

      {/* Searching: advanced techniques overview */}
      {is("Advanced Search Techniques") && (
        <div className="sec">
          <div className="stitle">Technique Selection Guide</div>
          <div className="constraint-row">
            {[
              ["Interpolation","Uniform + sorted large data. O(log log n) avg."],
              ["Exponential","Sorted array of unknown/infinite size."],
              ["Jump","Simple sorted array when O(√n) acceptable."],
              ["Hashing","Frequent O(1) lookups, O(n) space available."],
            ].map(([n,d])=>(
              <div className="cr-card" key={n} style={{minWidth:130}}>
                <div className="cr-n" style={{fontSize:".75rem"}}>{n}</div>
                <div className="cr-algo">{d}</div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Interpolation pitfall:</strong> O(n) worst case on skewed data (e.g. [1,2,3,...,100,1000000]). Always verify uniform distribution before using it.</div>
          </div>
        </div>
      )}

      {/* Hashing: hash function visualizer */}
      {is("Basics & Hash Functions") && (
        <div className="sec">
          <div className="stitle">Hash Function in Action</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 18px",overflowX:"auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",fontFamily:"'Space Mono',monospace",fontSize:".78rem"}}>
              {[[10,0],[25,5],[37,7],[23,3],[33,3]].map(([k,idx],i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{color:"var(--accent2)",fontWeight:700}}>{k}</span>
                  <span style={{color:"var(--text3)"}}>%10=</span>
                  <span style={{background:k===33?"rgba(255,92,92,.2)":"rgba(6,255,165,.12)",border:`1px solid ${k===33?"var(--red)":"var(--accent3)"}`,borderRadius:6,padding:"3px 10px",color:k===33?"var(--red)":"var(--accent3)",fontWeight:700}}>{idx}</span>
                  {k===33&&<span style={{color:"var(--red)",fontSize:".68rem"}}>← collision!</span>}
                  {i<4&&<span style={{color:"var(--text3)"}}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Load Factor:</strong> keep it below 0.7. If n/m &gt; 0.7, rehash to a table of ~2× size. This keeps average chain length short and operations O(1).</div>
          </div>
        </div>
      )}

      {/* Hashing: collision strategies comparison */}
      {is("Collision Handling") && (
        <div className="sec">
          <div className="stitle">Collision Strategies</div>
          <table className="fn-table">
            <thead><tr><th>Strategy</th><th>Probe Formula</th><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              {[
                ["Chaining","N/A (linked list)","Simple, LF>1 OK","Extra pointer memory"],
                ["Linear Probing","(h+i)%size","Cache-friendly","Primary clustering"],
                ["Quadratic","(h+i²)%size","Less clustering","May miss slots"],
                ["Double Hash","(h1+i×h2)%size","Best distribution","Two hash fns needed"],
              ].map(([s,f,p,c])=>(
                <tr key={s}>
                  <td className="op">{s}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{f}</td>
                  <td style={{color:"var(--green)",fontSize:".73rem"}}>{p}</td>
                  <td style={{color:"var(--red)",fontSize:".73rem"}}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Deletion in open addressing:</strong> Never mark as EMPTY. Use a TOMBSTONE marker — otherwise searches for keys that probed past this slot will incorrectly stop and report "not found".</div>
          </div>
        </div>
      )}

      {/* Hashing: patterns toolkit */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Frequency Count","Two Sum","Prefix Sum + HashMap","Hash Set (Duplicates)","Sliding Window + Map","Group Anagrams","Rolling Hash","Complement Lookup"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Subarray Sum = K — Key Insight</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:2}}>
              {"Initialize: count = {0: 1}  ← crucial! prefix 0 seen once"}<br/>
              {"For each element: prefix += x"}<br/>
              {"  ans += count.get(prefix - k, 0)"}<br/>
              {"  count[prefix]++"}
            </div>
          </div>
        </div>
      )}

      {/* Hashing: complexity table */}
      {is("Complexity & Applications") && (
        <div className="sec">
          <div className="stitle">Operations at a Glance</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <span className="op-badge ob-o1">Insert — O(1) avg</span>
            <span className="op-badge ob-o1">Search — O(1) avg</span>
            <span className="op-badge ob-o1">Delete — O(1) avg</span>
            <span className="op-badge ob-on">All — O(n) worst</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Structure</th><th>Insert</th><th>Search</th><th>Ordered?</th><th>Use when</th></tr></thead>
            <tbody>
              {[
                ["Hash Table","O(1) avg","O(1) avg","No","Fast lookup needed"],
                ["BST / map","O(log n)","O(log n)","YES","Sorted order needed"],
                ["Array","O(1) end","O(n)","No","Index-based access"],
                ["Sorted Array","O(n)","O(log n)","YES","Static + binary search"],
              ].map(([s,ins,srch,ord,use])=>(
                <tr key={s}>
                  <td className="op">{s}</td>
                  <td style={{color:ins.includes("1)")?"var(--green)":"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{ins}</td>
                  <td style={{color:srch.includes("1)")?"var(--green)":"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{srch}</td>
                  <td style={{color:ord==="YES"?"var(--green)":"var(--red)",fontSize:".73rem"}}>{ord}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Trees: node/tree visualizer */}
      {is("Basics & Terminology") && (
        <div className="sec">
          <div className="stitle">Tree Anatomy</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 20px",fontFamily:"'Space Mono',monospace",fontSize:".78rem",color:"var(--text2)",lineHeight:2.2}}>
            <div style={{textAlign:"center"}}>
              <span style={{background:"var(--accent)",color:"#fff",padding:"4px 14px",borderRadius:6,fontWeight:700}}>1</span>
              <span style={{color:"var(--text3)",fontSize:".65rem",marginLeft:8}}>← root (depth=0, height=2)</span>
            </div>
            <div style={{textAlign:"center",marginTop:2}}>
              <span style={{color:"var(--text3)"}}>/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</span>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:48}}>
              <div style={{textAlign:"center"}}>
                <span style={{background:"var(--bg3)",border:"1px solid var(--accent2)",color:"var(--accent2)",padding:"4px 12px",borderRadius:6,fontWeight:700}}>2</span>
                <div style={{fontSize:".62rem",color:"var(--text3)"}}>depth=1, height=1</div>
                <div style={{color:"var(--text3)"}}>/ &nbsp; \</div>
                <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                  {[4,5].map(v=>(
                    <div key={v} style={{textAlign:"center"}}>
                      <span style={{background:"var(--bg3)",border:"1px solid var(--accent3)",color:"var(--accent3)",padding:"4px 10px",borderRadius:6,fontWeight:700}}>{v}</span>
                      <div style={{fontSize:".6rem",color:"var(--accent3)"}}>leaf</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{textAlign:"center"}}>
                <span style={{background:"var(--bg3)",border:"1px solid var(--accent3)",color:"var(--accent3)",padding:"4px 12px",borderRadius:6,fontWeight:700}}>3</span>
                <div style={{fontSize:".62rem",color:"var(--accent3)"}}>leaf (depth=1)</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:10}}>
            {[["Root","1 — no parent"],["Leaves","3,4,5 — no children"],["Height","2 (longest root→leaf)"],["Depth(2)","1 (edges from root)"],["Degree(2)","2 (two children)"]].map(([k,v])=>(
              <div key={k} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",fontSize:".72rem"}}>
                <span style={{color:"var(--accent2)",fontFamily:"'Space Mono',monospace",fontWeight:700}}>{k}: </span>
                <span style={{color:"var(--text2)"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trees: types comparison */}
      {is("Types of Trees") && (
        <div className="sec">
          <div className="stitle">Tree Types at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Type</th><th>Property</th><th>Height</th><th>Use case</th></tr></thead>
            <tbody>
              {[
                ["Full BT","Every node has 0 or 2 children","O(n)","Expression trees"],
                ["Complete BT","All levels full except last (left→right)","O(log n)","Heaps"],
                ["Perfect BT","All levels completely full","O(log n)","Ideal binary tree"],
                ["Balanced BT","|h(L)-h(R)| ≤ 1 at every node","O(log n)","AVL, Red-Black"],
                ["BST","left < root < right","O(log n) avg","Ordered search"],
                ["Skewed","All nodes on one side","O(n)","Worst case BST"],
              ].map(([t,p,h,u])=>(
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td style={{color:"var(--text2)",fontSize:".74rem"}}>{p}</td>
                  <td style={{color:h.includes("log")?"var(--green)":"var(--red)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{h}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Skewed BST danger:</strong> inserting sorted data [1,2,3,4,5] into a BST without balancing creates a skewed tree — height=n-1, all operations degrade to O(n). Always use AVL or Red-Black in production.</div>
          </div>
        </div>
      )}

      {/* Trees: traversal order visual */}
      {is("Tree Traversals") && (
        <div className="sec">
          <div className="stitle">Traversal Orders — Quick Reference</div>
          <table className="fn-table">
            <thead><tr><th>Traversal</th><th>Order</th><th>Result on example</th><th>Use for</th></tr></thead>
            <tbody>
              {[
                ["Inorder","L → Root → R","4 2 5 1 3","BST sorted output"],
                ["Preorder","Root → L → R","1 2 4 5 3","Serialize / copy tree"],
                ["Postorder","L → R → Root","4 5 2 3 1","Delete / eval expression"],
                ["Level Order","BFS level by level","1 2 3 4 5","Min depth, right view"],
              ].map(([t,o,r,u])=>(
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td style={{color:"var(--accent2)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{o}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{r}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Mnemonic:</strong> In/Pre/Post = when the ROOT is visited. <strong>In</strong>order = root <strong>in</strong> middle. <strong>Pre</strong>order = root <strong>first</strong>. <strong>Post</strong>order = root <strong>last</strong>.</div>
          </div>
        </div>
      )}

      {/* Trees: important problems pattern pills */}
      {is("Important Problems") && (
        <div className="sec">
          <div className="stitle">Must-Know Problems</div>
          <div className="pattern-pills">
            {["Height","Diameter (global max trick)","LCA","Invert Tree","Validate BST (bounds!)","Path Sum","Kth Smallest BST","Serialize / Deserialize","Max Path Sum","Right Side View"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Validate BST — Classic Bug</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:2}}>
              {"WRONG: only check left.val < root < right.val (local)"}<br/>
              {"RIGHT: pass min/max bounds: isValid(node, min, max)"}<br/>
              {"  if node.val <= min or node.val >= max → False"}<br/>
              {"  recurse left with max=node.val, right with min=node.val"}
            </div>
          </div>
        </div>
      )}

      {/* Trees: complexity table */}
      {is("Complexity & Patterns") && (
        <div className="sec">
          <div className="stitle">Complexity by Tree Type</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Balanced BST</th><th>Skewed BST</th><th>General BT</th></tr></thead>
            <tbody>
              {[
                ["Search","O(log n)","O(n)","O(n)"],
                ["Insert","O(log n)","O(n)","O(n)"],
                ["Delete","O(log n)","O(n)","O(n)"],
                ["Traversal","O(n)","O(n)","O(n)"],
                ["Stack space","O(log n)","O(n)","O(h)"],
              ].map(([op,b,s,g])=>(
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{color:"var(--green)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{b}</td>
                  <td style={{color:"var(--red)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{s}</td>
                  <td style={{color:"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pattern-pills" style={{marginTop:12}}>
            {["DFS Post-order","BFS Level-order","Tree DP","Divide & Conquer","Inorder for BST","Height + Global Max"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
        </div>
      )}

      {/* ── STANDARD SECTIONS ── */}
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
          {(data.steps || []).map((s, i) => (
            <div className="step" key={i}>
              <div className="snum">{i + 1}</div>
              <div className="stext">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {data.dryRun && (
        <div className="sec">
          <div className="stitle">Dry Run Example</div>
          <div className="dry-run" dangerouslySetInnerHTML={{ __html: dryRunHtml }} />
        </div>
      )}

      {data.time && (
        <div className="sec">
          <div className="stitle">Time & Space Complexity</div>
          <div className="cxgrid">
            <div className="cxcard"><div className="cxl">Best Case</div><div className="cxv" style={{ color: "var(--green)" }}>{data.time.best}</div></div>
            <div className="cxcard"><div className="cxl">Average Case</div><div className="cxv">{data.time.avg}</div></div>
            <div className="cxcard"><div className="cxl">Worst Case</div><div className="cxv" style={{ color: "var(--red)" }}>{data.time.worst}</div></div>
            <div className="cxcard"><div className="cxl">Space</div><div className="cxv" style={{ color: "var(--accent3)" }}>{data.space}</div></div>
          </div>
        </div>
      )}

      {data.cpp && data.python && (
        <div className="sec">
          <div className="stitle">Code Implementation</div>
          <CodeBlock cpp={data.cpp} python={data.python} />
        </div>
      )}

      {data.when && (
        <div className="sec">
          <div className="stitle">When to Use</div>
          <div className="when-box">{data.when}</div>
        </div>
      )}

      {(data.pros || data.cons) && (
        <div className="sec">
          <div className="stitle">Pros & Cons</div>
          <div className="pcgrid">
            <div className="pcbox">
              <div className="pct" style={{ color: "var(--green)" }}>✓ Pros</div>
              <ul className="pcl">{(data.pros || []).map((p, i) => <li key={i}><span style={{ color: "var(--green)", flexShrink: 0 }}>+</span>{p}</li>)}</ul>
            </div>
            <div className="pcbox">
              <div className="pct" style={{ color: "var(--red)" }}>✗ Cons</div>
              <ul className="pcl">{(data.cons || []).map((c, i) => <li key={i}><span style={{ color: "var(--red)", flexShrink: 0 }}>−</span>{c}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

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

      {/* Arrays: language functions cheatsheet */}
      {(name === "Core Operations" || name === "Types of Arrays") && (
        <div className="sec">
          <div className="stitle">Language Functions Cheatsheet</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th><span className="lang-badge lb-cpp">C++</span></th><th><span className="lang-badge lb-py">Python</span></th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Append", "v.push_back(x)", "a.append(x)", "O(1)*"],
                ["Remove last", "v.pop_back()", "a.pop()", "O(1)"],
                ["Insert at i", "v.insert(it,x)", "a.insert(i,x)", "O(n)"],
                ["Delete at i", "v.erase(it)", "a.pop(i) / del a[i]", "O(n)"],
                ["Length", "v.size()", "len(a)", "O(1)"],
                ["Sort", "sort(v.begin(),v.end())", "a.sort()", "O(n log n)"],
                ["Reverse", "reverse(v.begin(),v.end())", "a.reverse()", "O(n)"],
                ["Find", "find(v.begin(),v.end(),x)", "a.index(x) / x in a", "O(n)"],
              ].map(([op, cpp, py, t]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{ color: "var(--accent2)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{cpp}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{py}</td>
                  <td style={{ color: "var(--text3)" }}>{t}</td>
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
  }, [query, searchIndex]);

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
