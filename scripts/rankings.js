async function loadRankings() {
  try {
    const response = await fetch("https://api.timebase.live/psl/competitor-rankings");
    const data = await response.json();
    const table = document.querySelector('.table');
    
    data.sort((a, b) => (a.bestSingle || 0) - (b.bestSingle || 0));

    data.forEach((player, index) => {
      const row = document.createElement("div");
      row.className = "row data";

      const [win, loss] = (player.winLoss?.split("-") || ["0", "0"]);

      row.innerHTML = `
        <div class="rank">${index + 1}</div>
        <div class="stats">
          <div class="player">${player.name || "N/A"}</div>
          <div>${player.bestSingle?.toFixed(3) || "0.00"}</div>
          <div>${player.seasonMean?.toFixed(3) || "0.00"}</div>
          <div>${player.elimMean?.toFixed(3) || "0.00"}</div>
          <div>0.00</div>
          <div><span class="win">${win}</span> / <span class="loss">${loss}</span></div>
        </div>
      `;

      table.appendChild(row);
    });
    
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

loadRankings();
