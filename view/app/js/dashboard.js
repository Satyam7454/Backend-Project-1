
const dashboardData = {
  profile: {
    name: "Satyam",
    role: "Content Admin",
    image: "https://imgs.search.brave.com/nVaSyMEErBIL21-cTeDRcH532wrkkhBXwioks5r9Nzc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE2LzYw/LzQyLzE2NjA0Mjcw/NzIzNzhmMTc5N2Nk/YzQ4MmE5MDZjNjJm/LmpwZw"
  },
  analytics: {
    totalFiles: 2094,
    activeUsers: 87,
    storageGB: 532,
    monthlyUploads: 459
  },
  mediaCounts: {
    video: 320,
    audio: 190,
    pictures: 1234,
    pdfs: 350
  },
  recentActivity: [
    { label: "New videos uploaded", value: "24 today" },
    { label: "Audio files processed", value: "12 pending" },
    { label: "Pictures reviewed", value: "167 approved" },
    { label: "PDF reports generated", value: "39 this week" }
  ]
};

function renderDashboard(data) {
  document.getElementById("profileName").textContent = data.profile.name;
  document.getElementById("profileRole").textContent = data.profile.role;
  document.getElementById("profileImage").src = data.profile.image;

  const cards = [
    { title: "Total Files", value: data.analytics.totalFiles, color: "text-green-400" },
    { title: "Active Users", value: data.analytics.activeUsers, color: "text-cyan-400" },
    { title: "Storage (GB)", value: data.analytics.storageGB, color: "#f59e0b" },
    { title: "Monthly Uploads", value: data.analytics.monthlyUploads, color: "#a78bfa" }
  ];

  const analyticsCards = document.getElementById("analyticsCards");
  analyticsCards.innerHTML = cards
    .map(
      (item) => `
        <article class="rounded-xl border border-blue-900 bg-gray-900/90 p-3.5">
          <h4 class="text-xs font-medium text-gray-400">${item.title}</h4>
          <div class="mt-2.5 text-3xl font-bold ${item.color.startsWith("text-") ? item.color : ""}" ${item.color.startsWith("text-") ? "" : `style="color:${item.color};"`}>${item.value}</div>
        </article>
      `
    )
    .join("");

  const mediaList = document.getElementById("mediaList");
  mediaList.innerHTML = Object.entries(data.mediaCounts)
    .map(
      ([type, count]) => `
        <div class="flex items-center justify-center gap-3 rounded-lg border border-gray-700 bg-slate-950 px-3 py-2.5 text-sm">
          <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <span class="font-bold text-green-400">${count}</span>
        </div>
      `
    )
    .join("");

  const activityRows = document.getElementById("activityRows");
  activityRows.innerHTML = data.recentActivity
    .map(
      (entry) => `
        <div class="flex items-center justify-between border-b border-slate-700 py-2.5 text-sm text-gray-300 last:border-b-0">
          <span>${entry.label}</span>
          <strong>${entry.value}</strong>
        </div>
      `
    )
    .join("");
}

function setupSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const burgerBtn = document.getElementById("burgerBtn");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const mainContent = document.getElementById("mainContent");
  let desktopSidebarOpen = true;

  function applyDesktopLayout() {
    if (desktopSidebarOpen) {
      sidebar.classList.remove("lg:-translate-x-full");
      sidebar.classList.add("lg:translate-x-0");
      mainContent.classList.remove("lg:pl-0");
      mainContent.classList.add("lg:pl-[320px]");
    } else {
      sidebar.classList.remove("lg:translate-x-0");
      sidebar.classList.add("lg:-translate-x-full");
      mainContent.classList.remove("lg:pl-[320px]");
      mainContent.classList.add("lg:pl-0");
    }
  }

  function closeMobileSidebar() {
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
  }

  function toggleSidebar() {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      desktopSidebarOpen = !desktopSidebarOpen;
      applyDesktopLayout();
      return;
    }

    sidebar.classList.toggle("-translate-x-full");
    sidebarOverlay.classList.toggle("hidden");
  }

  burgerBtn.addEventListener("click", toggleSidebar);
  sidebarOverlay.addEventListener("click", closeMobileSidebar);

  window.addEventListener("resize", () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      sidebarOverlay.classList.add("hidden");
      applyDesktopLayout();
    } else if (!sidebar.classList.contains("-translate-x-full")) {
      sidebarOverlay.classList.remove("hidden");
    }
  });

  applyDesktopLayout();
}

renderDashboard(dashboardData);
setupSidebarToggle();

// Optional global update function for backend data hydration
window.updateDashboardData = function updateDashboardData(newData) {
  renderDashboard(newData);
};

const logout = () => {
  localStorage.clear();
  location.href = "../Sign-in.html";
};