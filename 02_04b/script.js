/**
 * Store dark mode user preference in localstorage.
 * References:
 * - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */

import data from "./data.js";
import Cardlist from "./components/Cardlist.js";

// Add license info to each data object.
const license = {
  license: "Unsplash License",
  license_uri: "https://unsplash.com/license",
};
const newData = data.map((imgData) => {
  const newImgData = { ...imgData, ...license };
  return newImgData;
});

const mainContent = document.querySelector(".main-content");

mainContent.innerHTML = Cardlist(newData);

/**
 * Light/dark mode feature.
 */
const docElement = document.documentElement;
const toggle = document.querySelector(".toggle");

const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

// Detect mode on load and set toggle state accordingly.
const displayModeOnLoad = () => {
  let isDark = false;

  isDark = !!(
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  console.log("isDark" + isDark);

  const currTheme = localStorage.getItem("currentTheme");
  if (localStorage.key("currentTheme")) isDark = currTheme === THEMES.DARK;

  console.log("isDark" + isDark + " currTheme" + currTheme);
  if (isDark) {
    docElement.classList.add("dark");
    toggle.setAttribute("aria-pressed", "true");
    localStorage.setItem("currentTheme", THEMES.DARK);
  } else {
    docElement.classList.add("light");
    toggle.removeAttribute("aria-pressed");
    localStorage.setItem("currentTheme", THEMES.LIGHT);
  }
};
displayModeOnLoad();

// Trigger mode change with toggle.
const toggleDisplayMode = () => {
  let currTheme = 0;
  if (toggle.getAttribute("aria-pressed") === "true") {
    toggle.removeAttribute("aria-pressed");
    localStorage.setItem("currentTheme", THEMES.LIGHT);
    currTheme = THEMES.LIGHT;
  } else {
    localStorage.setItem("currentTheme", THEMES.DARK);
    toggle.setAttribute("aria-pressed", "true");
    currTheme = THEMES.DARK;
  }

  console.log("set currTheme: ", currTheme);
  docElement.classList.toggle("dark");
  docElement.classList.toggle("light");
};
toggle.addEventListener("click", () => toggleDisplayMode());
