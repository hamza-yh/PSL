function getPersonId() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) return params.get("id");
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;  // last two digits
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function truncateAtWord(str, maxLength) {
    if (str.length <= maxLength) return str;
    const trimmed = str.substr(0, maxLength);
    return trimmed.substr(0, trimmed.lastIndexOf(' '));
}

function restructureData(data) {
  const result = {
    name: data.name,
    seasonMean: data.seasonMean,
    bestSingle: data.bestSingle,
    elimMean: data.elimMean,
    winLoss: data.winLoss,
    matches: [],
  };

  for (const [matchId, matchData] of Object.entries(data.sets)) {
    const setsMap = new Map();

    // Group solves by game number (set)
    for (const solve of matchData.solves) {
      const setNum = solve.game;
      if (!setsMap.has(setNum)) setsMap.set(setNum, []);
      setsMap.get(setNum).push({
        competitorTime: solve.competitorTime,
        opponentTime: solve.opponentTime,
        win: solve.competitorWins,
      });
    }

    const sets = [];
    let totalSetWins = 0;
    let totalSetLosses = 0;

    for (const [setNum, solves] of setsMap.entries()) {
      let setWins = 0;
      let setLosses = 0;

      for (const solve of solves) {
        if (solve.win === 1) setWins++;
        else if (solve.win === 0) setLosses++;
      }

      totalSetWins += setWins > setLosses ? 1 : 0;
      totalSetLosses += setWins < setLosses ? 1 : 0;

      sets.push({
        set: setNum,
        score: `${setWins}-${setLosses}`,
        win: setWins > setLosses ? 1 : 0,
        solves: solves,
      });
    }

    result.matches.push({
      opponent: matchData.opponent || "N/A",
      score: `${totalSetWins}-${totalSetLosses}`,
      win: totalSetWins > totalSetLosses ? 1 : 0,
      sets,
    });
  }

  return result;
}



function renderMatch(match, data) {
    return `
        <div class="match-item">
            <div class="match-header">
                <div class="comp-name"> 
                    <div class="justify-right">${truncateAtWord(data.name,12)}</div>
                    <div class="match-score ${match.win ?"win":"loss"}">${match.score.split('-')[0]}</div>
                </div>
                <div class="opp-name">
                    <div class="match-score ${match.win ?"loss":"win"}">${match.score.split('-')[1]}</div>
                    <div class="justify-left">${truncateAtWord(match.opponent,12)}</div>
                </div>
            </div>
            <div class="match-sets">
            ${match.sets.map(set => `
                <div class="set glass hover">
                    <div class="set-header">
                        <div class="align-right">${set.score.split('-')[0]}</div>
                        <div class="set-info">
                            <div class="${set.win ?"win":"loss"}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>
                            </div>
                            <div>Set ${set.set}</div>
                            <div class="${set.win ?"loss":"win"}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>                            
                            </div>
                        </div>
                        <div class="align-left">${set.score.split('-')[1]}</div>
                    </div> 
                    <div class="set-solve collapsed">    
                        ${set.solves.map((solve, i) => `
                            <div class="align-right solve-time ${solve.win ?"":"dark"}">${solve.competitorTime?.toFixed(2) ?? "N/A"}</div>
                            <div class="align-center">${i}</div>
                            <div class="align-left solve-time ${solve.win ?"dark":""}">${solve.opponentTime?.toFixed(2) ?? "N/A"}</div>
                        `).join("")}
                    </div>
                </div>
            `).join("")}
            <div class="match-footer">
                <div>Winners Final - PSL Berkeley</div>
                <div class="link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M290.4 19.8C295.4 7.8 307.1 0 320 0L480 0c17.7 0 32 14.3 32 32l0 160c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9L400 157.3 246.6 310.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L354.7 112 297.4 54.6c-9.2-9.2-11.9-22.9-6.9-34.9zM0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"/></svg></div>
            </div>
        </div>
        </div>
    `;
}

async function renderProfile() {
    const id = getPersonId();
    const footer = document.querySelector("#navbar"); // supports <footer> or <div id="footer">
    const addSection = (html) => footer.insertAdjacentHTML("afterend", html);

    //placeholder image and data
    const imageUrl = "https://avatars.worldcubeassociation.org/66ckfr3s1yjcyw4p1mvuke6libhl"
    const season = "1";
    const ranking = 1;

    const response = await fetch(`https://api.timebase.live/psl/competitor-profile?name=${encodeURIComponent(id)}`);
    const data = restructureData(await response.json());
    if (!id) {
        profileDiv.textContent = "No ID provided in the URL.";
        return;
    }

    // profile header
    const sectionHeader = `
    <section class="profile-header">
        <div>
            <h2>Ranked ${ordinal(ranking)} - Season ${season}</h2>
            <h1 class="title name fade-down">${data.name}</h1>
        </div>
        <img src="${imageUrl}" alt="Profile Image" class="profile-image">
    </section>`;

    // profile stats
    const sectionStats = `
    <section class="profile-stats glass">
        <div class="left-stats">
            <div>
                <div class="value solve-time">${data.bestSingle ?? "-"}</div>
                <div class="label">BEST SINGLE</div>
            </div>
            <div >
                <div class="value solve-time">${data.seasonMean ?? "-"}</div>
                <div class="label">SEASON MEAN</div>
            </div>
            <div>
                <div class="value solve-time">${data.clutchFactor ?? "-"}</div>
                <div class="label">CLUTCH FACTOR</div>
            </div>
            <div>
                <div class="value solve-time">${data.solveVariance ?? "-"}</div>
                <div class="label">SOLVE VARIANCE</div>
            </div>
        </div>

        <div class="right-stats">
            <div>
                <div class="value solve-time">${data.bestPlacement ?? "-"}</div>
                <div class="label">BEST PLACEMENT</div>
            </div>
            <div class="stat-item">
                <div class="value solve-time">${data.totalEvents ?? "-"}</div>
                <div class="label">TOTAL EVENTS</div>
            </div>
            <div class="stat-item">
                <div class="value">${data.winLoss ?? "-"}</div>
                <div class="label">WIN LOSS RECORD</div>
            </div>
            <div class="stat-item">
                <div class="value"></div>
                <div class="label"></div>
            </div>
        </div>
    </section>`;

    // profile videos
    const sectionVideos = `
    <section class="videos-section">
        <div>
            <h1 class="title">Best Match Performance</h1>
            <div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OIlCvKddaZk?si=mXzGoScAknyIEYy8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
            <div class="video-footer">Winners Final - PSL Berkeley</div>
        </div>
        <div>
            <h1 class="title">Best Solve - ${data.bestSingle}</h1>
            <div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OIlCvKddaZk?si=mXzGoScAknyIEYy8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
            <div class="video-footer">Winners Final - PSL Berkeley</div>

        </div>
    </section>`;

    // profile matches
    const sectionMatches = `
    <section class="matches-list">
        <h1 class="matches-title title">Recent Matches</h1>
        ${data.matches.map(match=>renderMatch(match, data)).join("")}
    </section>`;

    [sectionHeader, sectionStats, sectionVideos, sectionMatches].reverse().forEach(addSection);
}



document.addEventListener("DOMContentLoaded", async () => {
    // render the profile
    await renderProfile();

    // add event listeners to open and close each set
    document.querySelectorAll('.set.glass').forEach(setDiv => {
        setDiv.addEventListener('click', function(e) {
            const setSolve = setDiv.querySelector('.set-solve');
            if (setSolve) {
                setSolve.classList.toggle('collapsed');
            }
        });
    });
});