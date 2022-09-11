"use strict";

/*
#####  ######  ####  #    # # #####  ###### 
#    # #      #    # #    # # #    # #      
#    # #####  #    # #    # # #    # #####  
#####  #      #  # # #    # # #####  #      
#   #  #      #   #  #    # # #   #  #      
#    # ######  ### #  ####  # #    # ###### 
*/

const { ipcRenderer } = require("electron");

const loadTheme = require("../modules/loadTheme.js");
const applyTheme = require("../modules/applyTheme.js");
const applyWinControls = require("../modules/applyWinControls.js");
const loadWinControlsModule = require("../modules/loadWinControls.js");

/*
.########.##.....##.##....##..######..########.####..#######..##....##..######.
.##.......##.....##.###...##.##....##....##.....##..##.....##.###...##.##....##
.##.......##.....##.####..##.##..........##.....##..##.....##.####..##.##......
.######...##.....##.##.##.##.##..........##.....##..##.....##.##.##.##..######.
.##.......##.....##.##..####.##..........##.....##..##.....##.##..####.......##
.##.......##.....##.##...###.##....##....##.....##..##.....##.##...###.##....##
.##........#######..##....##..######.....##....####..#######..##....##..######.
*/

function openLicenseFile() {
  ipcRenderer.send("tabManager-addTab", "file://" + __dirname + "/../LICENSE", true);
}

function loadAbout() {
  document.getElementById("about-electron").innerHTML = "Electron: v" + process.versions.electron;
  document.getElementById("about-chrome").innerHTML = "Chrome: v" + process.versions.chrome;
  document.getElementById("about-node").innerHTML = "Node: " + process.version;

  ipcRenderer.send("request-set-about");
}

function openIssuesPage() {
  ipcRenderer.send("tabManager-addTab", "issues", true);
}

function openDonatePage() {
  ipcRenderer.send("tabManager-addTab", "https://www.buymeacoffee.com/globebrowser", true);
}

function openPatreonPage() {
  ipcRenderer.send("tabManager-addTab", "https://www.patreon.com/valoa", true);
}

function openDeveloperPage() {
  ipcRenderer.send("tabManager-addTab", "https://valoa.netlify.app/", true);
}

function openAppPage() {
  ipcRenderer.send("tabManager-addTab", "https://valoa.netlify.app/", true);
}

function openReleasesPage() {
  ipcRenderer.send("tabManager-addTab", "releases", true);
}

function openPlannerPage() {
  ipcRenderer.send("tabManager-addTab", "", true);
}

function openSourcePage() {
  ipcRenderer.send("tabManager-addTab", "", true);
}

function openElectronPage() {
  ipcRenderer.send("tabManager-addTab", "https://electronjs.org/releases", true);
}

function openChromePage() {
  ipcRenderer.send("tabManager-addTab", "https://chromereleases.googleblog.com", true);
}

function openNodePage() {
  ipcRenderer.send("tabManager-addTab", "https://nodejs.org/en/download/releases", true);
}

function openDiscordPage() {
  ipcRenderer.send("tabManager-addTab", "", true);
}

function openLicensePage() {
  ipcRenderer.send("tabManager-addTab", "LICENSE", true);
}

function checkForUpdates() {
  ipcRenderer.send("main-checkForUpdates");
}

/*
 ###### #    # #    #  ####              ##### #    # ###### #    # ######  ####
 #      #    # ##   # #    #               #   #    # #      ##  ## #      #
 #####  #    # # #  # #         #####      #   ###### #####  # ## # #####   ####
 #      #    # #  # # #                    #   #    # #      #    # #           #
 #      #    # #   ## #    #               #   #    # #      #    # #      #    #
 #       ####  #    #  ####                #   #    # ###### #    # ######  ####
*/

function updateTheme() {
  loadTheme().then(({ theme, dark }) => {
    console.log(theme)
    applyTheme(theme, dark);
  });
}

/*
 ###### #    # #    #  ####              #    # # #    # #####   ####  #    #
 #      #    # ##   # #    #             #    # # ##   # #    # #    # #    #
 #####  #    # # #  # #         #####    #    # # # #  # #    # #    # #    #
 #      #    # #  # # #                  # ## # # #  # # #    # #    # # ## #
 #      #    # #   ## #    #             ##  ## # #   ## #    # #    # ##  ##
 #       ####  #    #  ####              #    # # #    # #####   ####  #    #
*/

function closeWindow() {
  ipcRenderer.send("about-closeWindow");
}

/*
# #####   ####                ##   #####   ####  #    # ##### 
# #    # #    #              #  #  #    # #    # #    #   #   
# #    # #         #####    #    # #####  #    # #    #   #   
# #####  #                  ###### #    # #    # #    #   #   
# #      #    #             #    # #    # #    # #    #   #   
# #       ####              #    # #####   ####   ####    #   
*/

ipcRenderer.on("action-set-about", (event, arg) => {
  document.getElementById("about-app").innerHTML = "Beta v" + arg.version + "<br>" + arg.platform + " / " + arg.arch;
});

/*
 # #####   ####              #    # # #    # #####   ####  #    #
 # #    # #    #             #    # # ##   # #    # #    # #    #
 # #    # #         #####    #    # # # #  # #    # #    # #    #
 # #####  #                  # ## # # #  # # #    # #    # # ## #
 # #      #    #             ##  ## # #   ## #    # #    # ##  ##
 # #       ####              #    # # #    # #####   ####  #    #
*/

ipcRenderer.on("window-blur", (event) => {
  document.getElementById("titlebar").classList.add("blur");
});

ipcRenderer.on("window-focus", (event) => {
  document.getElementById("titlebar").classList.remove("blur");
});

/*
 # #    # # #####
 # ##   # #   #
 # # #  # #   #
 # #  # # #   #
 # #   ## #   #
 # #    # #   #
*/

function init() {
  loadWinControlsModule().then((winControls) => {
    applyWinControls(winControls.systemTitlebar, "only-close");
  });

  updateTheme();

  loadAbout();
}

document.onkeyup = function(e) {
  if (e.which == 27) {
    closeWindow();
  } 
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
      init();
  }
};

/*
##### #    # ######    ###### #    # #####  
  #   #    # #         #      ##   # #    # 
  #   ###### #####     #####  # #  # #    # 
  #   #    # #         #      #  # # #    # 
  #   #    # #         #      #   ## #    # 
  #   #    # ######    ###### #    # #####  
*/