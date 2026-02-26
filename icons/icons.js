/**
 * FinSage App Icons — converted from Android Vector Drawables
 * Each function returns an inline SVG string ready to inject into the DOM.
 */

const FinSageIcons = {
    // App launcher — use <img> tag with icons/ic_launcher.png
    launcherSrc: 'icons/ic_launcher.png',

    /**
   * Wrap a pathData from an Android VectorDrawable into a web SVG.
   * Always renders at 24x24 viewBox, scales to fill its container.
   */
    _svg(pathData, fill = 'white') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" style="display:block"><path fill="${fill}" d="${pathData}"/></svg>`;
    },

    // Category icons (direct pathData from drawable XMLs)
    food(fill = 'white') {
        return this._svg('M11,9H9V2H7v7H5V2H3v7c0,2.12 1.66,3.84 3.75,3.97V22h2.5v-9.03C11.34,12.84 13,11.12 13,9V2h-2v7zM16,6v8h2.5v8H21V2C18.24,2 16,4.24 16,6z', fill);
    },
    transport(fill = 'white') {
        return this._svg('M18.92,6.01C18.72,5.42 18.16,5 17.5,5h-11c-0.66,0 -1.21,0.42 -1.42,1.01L3,12v8c0,0.55 0.45,1 1,1h1c0.55,0 1,-0.45 1,-1v-1h12v1c0,0.55 0.45,1 1,1h1c0.55,0 1,-0.45 1,-1v-8l-2.08,-5.99zM6.5,16c-0.83,0 -1.5,-0.67 -1.5,-1.5S5.67,13 6.5,13s1.5,0.67 1.5,1.5S7.33,16 6.5,16zM17.5,16c-0.83,0 -1.5,-0.67 -1.5,-1.5s0.67,-1.5 1.5,-1.5 1.5,0.67 1.5,1.5 -0.67,1.5 -1.5,1.5zM5,11l1.5,-4.5h11L19,11H5z', fill);
    },
    shopping(fill = 'white') {
        return this._svg('M21.5,19H2.5c-0.28,0 -0.5,-0.22 -0.5,-0.5 0,-0.17 0.09,-0.33 0.23,-0.42L11,12.28V10.9C9.27,10.45 8,8.87 8,7c0,-2.21 1.79,-4 4,-4s4,1.79 4,4c0,0.55 -0.45,1 -1,1s-1,-0.45 -1,-1c0,-1.1 -0.9,-2 -2,-2s-2,0.9 -2,2c0,1.1 0.9,2 2,2 0.55,0 1,0.45 1,1v1.28l8.77,5.8C21.91,18.17 22,18.33 22,18.5c0,0.28 -0.22,0.5 -0.5,0.5z', fill);
    },
    bills(fill = 'white') {
        return this._svg('M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41,-1.41z', fill);
    },
    income(fill = 'white') {
        return this._svg('M11.8,10.9c-2.27,-0.59 -3,-1.2 -3,-2.15 0,-1.09 1.01,-1.85 2.7,-1.85 1.78,0 2.44,0.85 2.5,2.1h2.21c-0.07,-1.72 -1.12,-3.3 -3.21,-3.81V3h-3v2.16c-1.94,0.42 -3.5,1.68 -3.5,3.61 0,2.31 1.91,3.46 4.7,4.13 2.5,0.6 3,1.48 3,2.41 0,0.69 -0.49,1.79 -2.7,1.79 -2.06,0 -2.87,-0.92 -2.98,-2.1h-2.2c0.12,2.19 1.76,3.42 3.68,3.83V21h3v-2.15c1.95,-0.37 3.5,-1.5 3.5,-3.55 0,-2.84 -2.43,-3.81 -4.7,-4.4z', fill);
    },
    entertainment(fill = 'white') {
        return this._svg('M18,3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8,17H6v-2h2v2zM8,13H6v-2h2v2zM8,9H6V7h2v2zM14,17h-4v-4h4v4zM14,11h-4V7h4v4zM18,17h-2v-2h2v2zM18,13h-2v-2h2v2zM18,9h-2V7h2v2z', fill);
    },
    health(fill = 'white') {
        return this._svg('M19,3H5C3.9,3 3,3.9 3,5v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2V5C21,3.9 20.1,3 19,3zM18,14h-4v4h-4v-4H6v-4h4V6h4v4h4V14z', fill);
    },
    savings(fill = 'white') {
        return this._svg('M15.5,1c-2.99,0 -5.52,1.93 -6.41,4.61C8.58,5.24 7.84,5 7.05,5 4.82,5 3,6.82 3,9.05c0,1.75 1.12,3.24 2.69,3.79C5.25,13.53 5,14.24 5,15c0,2.21 1.79,4 4,4h2v2h2v-2h2c2.21,0 4,-1.79 4,-4 0,-0.76 -0.25,-1.47 -0.69,-2.16C19.88,12.29 21,10.8 21,9.05 21,5.02 18.53,1 15.5,1z', fill);
    },
    education(fill = 'white') { return this._svg('M5,13.18v4L12,21l7,-3.82v-4L12,17l-7,-3.82zM12,3L1,9l11,6 9,-4.91V17h2V9L12,3z', fill); },

    // Material Icons used directly by the app (same names as app imports)
    // Icons.Default.Today
    today(fill = 'white') { return this._svg('M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z', fill); },
    // Icons.Default.Refresh
    refresh(fill = 'white') { return this._svg('M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z', fill); },
    // Icons.Default.AutoAwesome (used for Smart Categorization & AI)
    autoAwesome(fill = 'white') { return this._svg('M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z', fill); },
    // Icons.Default.Lightbulb (used for forecast)
    lightbulb(fill = 'white') { return this._svg('M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z', fill); },
    // Icons.Default.Insights / BarChart (used for Weekly Spending)
    barChart(fill = 'white') { return this._svg('M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zM16.2 13h2.8v6h-2.8v-6z', fill); },
    // Icons.AutoMirrored.Filled.TrendingUp (used for Monthly Trends)
    trendingUp(fill = 'white') { return this._svg('M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z', fill); },
};

window.FinSageIcons = FinSageIcons;
