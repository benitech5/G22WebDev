# Practitioner Portal – Payments

A pixel-faithful, interactive HTML/CSS/JS conversion of the Practitioner Portal
Payments screen designed in Figma.

---

## 📁 File Structure

```
practitioner-portal/
├── index.html                  ← Main HTML markup
├── css/
│   └── styles.css              ← All styles & CSS variables
├── js/
│   └── app.js                  ← All interactivity & logic
└── assets/
    └── icons/
        ├── logo.svg
        ├── dashboard.svg
        ├── contracts.svg
        ├── payments.svg
        ├── bell.svg
        ├── withdraw.svg
        ├── earnings.svg
        ├── escrow.svg
        ├── released.svg
        ├── filter.svg
        ├── export.svg
        └── check.svg
```

---

## 🚀 How to Run

Just open `index.html` in any modern browser — no build step required.

```bash
open index.html
# or
npx serve .
```

---

## ✨ Interactive Features

| Element | Interaction |
|---|---|
| **Sidebar nav** | Switches active state, shows toast |
| **Notification bell** | Toggles dropdown; closes on outside click |
| **Withdraw Funds** | Opens modal with amount input + bank selector; validates balance |
| **Escrow rows** | Click opens detail modal with progress bar |
| **Payment history rows** | Click opens detail modal with status badge |
| **Filter button** | Toast feedback |
| **Export button** | Downloads real `payment_history.csv` |
| **Activity items** | Click shows contextual toast |
| **View All Active / View Full Log** | Toast feedback |
| **Stat cards** | Animated count-up on load; hover lift |

---

## 🎨 Design Notes

- Fonts: **DM Sans** (UI) + **DM Mono** (numbers) via Google Fonts
- Colors and spacing managed via CSS custom properties in `:root`
- All icons are inline SVGs exported to `assets/icons/`
- Animations use pure CSS (`@keyframes fadeIn`) and JS `requestAnimationFrame`
