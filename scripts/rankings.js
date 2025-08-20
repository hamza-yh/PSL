async function loadRankings() {
  try {
    const response = await fetch("https://api.timebase.live/psl/competitor-rankings");
    const data = await response.json();
    const table = document.querySelector('.table');
    
    data.sort((a, b) => (a.bestSingle || Infinity) - (b.bestSingle || Infinity));

    data.forEach((player, index) => {
      const row = document.createElement("div");
      row.className = "row data";

      const [win, loss] = (player.winLoss?.split("-") || ["0", "0"]);

      row.innerHTML = `
        <div class="rank">${index + 1}</div>
        <div class="stats glass hover">
          <div class="player"> ${player.name || "N/A"}</div>
          <div>${player.bestSingle?.toFixed(3) || "0.00"}</div>
          <div>${player.seasonMean?.toFixed(3) || "0.00"}</div>
          <div>${player.elimMean?.toFixed(3) || "0.00"}</div>
          <div>-</div>
          <div><span class="win">${win}</span> / <span class="loss">${loss}</span></div>
        </div>
      `;

      table.appendChild(row);
    });
    
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  await loadRankings();

  document.querySelectorAll('.stats.glass').forEach(statsDiv => {
    statsDiv.style.cursor = "pointer";
    statsDiv.addEventListener('click', function() {
      // Replace with your actual profile page URL and player id variable
      const playerId = statsDiv.querySelector('.player').textContent.trim();
      window.location.href = `/pages/profile.html?id=${encodeURIComponent(playerId)}`;
    });
  });
});