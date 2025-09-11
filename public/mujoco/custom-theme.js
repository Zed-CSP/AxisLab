// Custom theme for AxisLab MuJoCo viewer
// This will be loaded by the MuJoCo viewer iframe

// Get the theme colors from CSS variables if available
function getThemeColors() {
  // Default colors that match AxisLab theme
  const defaults = {
    sceneBg: "#FFF8F3", // Light background color
    floor: "#FFF1E7",   // Tertiary light color
    ambient: "#fb923c", // Highlight color with lower intensity
    hemi: "#f97316"     // Brand color
  };

  // Try to get colors from parent window if in iframe
  try {
    if (window.parent && window.parent !== window) {
      // Send ready message to parent
      window.parent.postMessage({ type: "IFRAME_READY" }, "*");
      
      // Listen for theme message from parent
      window.addEventListener("message", (event) => {
        if (event.source === window.parent && event.data?.type === "SET_THEME") {
          const { theme } = event.data;
          if (theme && window.mujoco && window.mujoco.setTheme) {
            window.mujoco.setTheme(theme);
          }
        }
      });
    }
  } catch (e) {
    console.warn("Could not access parent window for theme", e);
  }

  return defaults;
}

// Apply theme when document is loaded
document.addEventListener("DOMContentLoaded", () => {
  const theme = getThemeColors();
  
  // Store on window for the MuJoCo instance to use
  window.customTheme = theme;
});
