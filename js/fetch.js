const API_KEY = "e48e7dfce1934cf7861487ddd5b5361b";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2002;

const ENDPOINT_DETAIL = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const ENDPOINT_STANDING = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

//Match ID
//1. FC Koln
const KOLN_ID = 1;
const KOLN_MATCHES = `${BASE_URL}teams/${KOLN_ID}/matches?status=SCHEDULED`;

//2. TSG 1899 Hoffenheim
const TSG_ID = 2;
const TSG_MATCHES = `${BASE_URL}teams/${TSG_ID}/matches?status=SCHEDULED`;

//3. Bayer 04 Leverkusen
const BAYER_ID = 3;
const BAYER_MATCHES = `${BASE_URL}teams/${BAYER_ID}/matches?status=SCHEDULED`;

//4. BV Borussia 09 Dortmund
const DORTMUND_ID = 4;
const DORTMUND_MATCHES = `${BASE_URL}teams/${DORTMUND_ID}/matches?status=SCHEDULED`;

//5. FC Bayern Munchen
const MUNCHEN_ID = 5;
const MUNCHEN_MATCHES = `${BASE_URL}teams/${MUNCHEN_ID}/matches?status=SCHEDULED`;

//6. FC Schalke 04
const SCHALKE_ID = 6;
const SCHALKE_MATCHES = `${BASE_URL}teams/${SCHALKE_ID}/matches?status=SCHEDULED`;

//7. Hertha BSC
const HERTHA_ID = 9;
const HERTHA_MATCHES = `${BASE_URL}teams/${HERTHA_ID}/matches?status=SCHEDULED`;

//8. VfL Wolfsburg
const WOLFSBURG_ID = 11;
const WOLFSBURG_MATCHES = `${BASE_URL}teams/${WOLFSBURG_ID}/matches?status=SCHEDULED`;

//9. SV Werder Bremen
const BREMEN_ID = 12;
const BREMEN_MATCHES = `${BASE_URL}teams/${BREMEN_ID}/matches?status=SCHEDULED`;

//10. FSV Mainz 05
const MAINZ_ID = 15;
const MAINZ_MATCHES = `${BASE_URL}teams/${MAINZ_ID}/matches?status=SCHEDULED`;

//11. FC Augsburg
const AUGSBURG_ID = 16;
const AUGSBURG_MATCHES = `${BASE_URL}teams/${AUGSBURG_ID}/matches?status=SCHEDULED`;

//12. SC Freiburg
const FREIBURG_ID = 17;
const FREIBURG_MATCHES = `${BASE_URL}teams/${FREIBURG_ID}/matches?status=SCHEDULED`;

//13. Borussia Mönchengladbach
const BORUSSIA_ID = 18;
const BORUSSIA_MATCHES = `${BASE_URL}teams/${BORUSSIA_ID}/matches?status=SCHEDULED`;

//14. Eintracht Frankfurt
const FRANKFURT_ID = 19;
const FRANKFURT_MATCHES = `${BASE_URL}teams/${FRANKFURT_ID}/matches?status=SCHEDULED`;

//15. TSV Fortuna 95 Düsseldorf
const FORTUNA_ID = 24;
const FORTUNA_MATCHES = `${BASE_URL}teams/${FORTUNA_ID}/matches?status=SCHEDULED`;

//16. FC Union Berlin
const BERLIN_ID = 28;
const BERLIN_MATCHES = `${BASE_URL}teams/${BERLIN_ID}/matches?status=SCHEDULED`;

//17. SC Paderborn 07
const PADERBORN_ID = 29;
const PADERBORN_MATCHES = `${BASE_URL}teams/${PADERBORN_ID}/matches?status=SCHEDULED`;

//18. RB Leipzig
const LEIPZIG_ID = 721;
const LEIPZIG_MATCHES = `${BASE_URL}teams/${LEIPZIG_ID}/matches?status=SCHEDULED`;

const fetchAPI = url => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

//Information Tim
function getAllDetails() {
    if ("caches" in window) {
        caches.match(ENDPOINT_DETAIL).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showDetail(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_DETAIL)
        .then(data => {
            showDetail(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showDetail(data) {
    console.log(data);
    var detailHTML = "";

    data.teams.forEach(teams => {
        detailHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="row">
                <div class="col m12 s12">
                    <div class="card">
                        <div class="card-image">
                            <img class="info" src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}"/></td> 
                        </div>
                        <br>
                        <div class="card-content">
                            <h5>${teams.name}</h5>
                            <p>${teams.address}</p>
                            <p>${teams.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("details").innerHTML = detailHTML;
}

//CALLED FROM nav.js
function getDetailsMessage() {
    let detailMessageHTML = "Welcome to Details.html"
    document.getElementById("details").innerHTML = detailMessageHTML;
};


//Standings Tim
function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_STANDING).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_STANDING)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("homeStandings");

    data.standings[0].table.forEach(function(standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

    standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}


//Match Schedule Tim
//1. FC Koln

function getKolnMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(KOLN_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showKolnMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(KOLN_MATCHES)
            .then(data => {
                showKolnMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showKolnMatches(data) {
    console.log(data);
    var kolnHTML = "";

    data.matches.forEach(matches => {
        kolnHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("kolns").innerHTML = kolnHTML;
}


//2. TSG 1899 Hoffenheim

function getTsgMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(TSG_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showTsgMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(TSG_MATCHES)
            .then(data => {
                showTsgMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showTsgMatches(data) {
    console.log(data);
    var tsgHTML = "";

    data.matches.forEach(matches => {
        tsgHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("kolns").innerHTML = tsgHTML;
}


//3. Bayer 04 Leverkusen

function getBayerMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(BAYER_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showBayerMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(BAYER_MATCHES)
            .then(data => {
                showBayerMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showBayerMatches(data) {
    console.log(data);
    var bayerHTML = "";

    data.matches.forEach(matches => {
        bayerHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("bayerns").innerHTML = bayerHTML;
}


//4. BV Borussia 09 Dortmund

function getDortmundMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(DORTMUND_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showDortmundMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(DORTMUND_MATCHES)
            .then(data => {
                showDortmundMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showDortmundMatches(data) {
    console.log(data);
    var dortmundHTML = "";

    data.matches.forEach(matches => {
        dortmundHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("dortmunds").innerHTML = dortmundHTML;
}


//5. FC Bayern Munchen

function getMunchenMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(MUNCHEN_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showMunchenMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(MUNCHEN_MATCHES)
            .then(data => {
                showMunchenMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showMunchenMatches(data) {
    console.log(data);
    var munchenHTML = "";

    data.matches.forEach(matches => {
        munchenHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("munchens").innerHTML = munchenHTML;
}


//6. FC Schalke 04

function getSchalkeMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(SCHALKE_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showSchalkeMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(SCHALKE_MATCHES)
            .then(data => {
                showSchalkeMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showSchalkeMatches(data) {
    console.log(data);
    var schalkeHTML = "";

    data.matches.forEach(matches => {
        schalkeHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("schalkes").innerHTML = schalkeHTML;
}


//7. Hertha BSC

function getHerthaMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(HERTHA_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showHerthaMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(HERTHA_MATCHES)
            .then(data => {
                showHerthaMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showHerthaMatches(data) {
    console.log(data);
    var herthaHTML = "";

    data.matches.forEach(matches => {
        herthaHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("herthas").innerHTML = herthaHTML;
}


//8. VfL Wolfsburg

function getWolfsburgMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(WOLFSBURG_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showWolfsburgMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(WOLFSBURG_MATCHES)
            .then(data => {
                showWolfsburgMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showWolfsburgMatches(data) {
    console.log(data);
    var wolfsburgHTML = "";

    data.matches.forEach(matches => {
        wolfsburgHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("wolfsburgs").innerHTML = wolfsburgHTML;
}


//9. SV Werder Bremen

function getBremenMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(BREMEN_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showBremenMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(BREMEN_MATCHES)
            .then(data => {
                showBremenMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showBremenMatches(data) {
    console.log(data);
    var bremenHTML = "";

    data.matches.forEach(matches => {
        bremenHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("bremens").innerHTML = bremenHTML;
}


//10. FSV Mainz 05

function getMainzMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(MAINZ_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showtMainzMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(MAINZ_MATCHES)
            .then(data => {
                showtMainzMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showtMainzMatches(data) {
    console.log(data);
    var mainzHTML = "";

    data.matches.forEach(matches => {
        mainzHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("mainzs").innerHTML = mainzHTML;
}


//11. FC Augsburg

function getAugsburgMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(AUGSBURG_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showtAugsburgMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(AUGSBURG_MATCHES)
            .then(data => {
                showtAugsburgMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showtAugsburgMatches(data) {
    console.log(data);
    var augsburgHTML = "";

    data.matches.forEach(matches => {
        augsburgHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("augsburgs").innerHTML = augsburgHTML;
}


//12. SC Freiburg

function getFreiburgMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(FREIBURG_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showFreiburgMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(FREIBURG_MATCHES)
            .then(data => {
                showFreiburgMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showFreiburgMatches(data) {
    console.log(data);
    var freiburgHTML = "";

    data.matches.forEach(matches => {
        freiburgHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("freiburgs").innerHTML = freiburgHTML;
}


//13. Borussia Mönchengladbach

function getBorussiaMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(BORUSSIA_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showBorussiaMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(BORUSSIA_MATCHES)
            .then(data => {
                showBorussiaMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showBorussiaMatches(data) {
    console.log(data);
    var borussiaHTML = "";

    data.matches.forEach(matches => {
        borussiaHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("borussias").innerHTML = borussiaHTML;
}


//14. Eintracht Frankfurt

function getFrankfurtMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(FRANKFURT_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showFrankfurtMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(FRANKFURT_MATCHES)
            .then(data => {
                showFrankfurtMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showFrankfurtMatches(data) {
    console.log(data);
    var frankfurtHTML = "";

    data.matches.forEach(matches => {
        frankfurtHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("frankfurts").innerHTML = frankfurtHTML;
}


//15. TSV Fortuna 95 Düsseldorf

function getFortunaMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(FORTUNA_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showFortunaMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(FORTUNA_MATCHES)
            .then(data => {
                showFortunaMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showFortunaMatches(data) {
    console.log(data);
    var fortunaHTML = "";

    data.matches.forEach(matches => {
        fortunaHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("fortunas").innerHTML = fortunaHTML;
}


//16. FC Union Berlin

function getBerlinMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(BERLIN_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showBerlinMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(BERLIN_MATCHES)
            .then(data => {
                showBerlinMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showBerlinMatches(data) {
    console.log(data);
    var berlinHTML = "";

    data.matches.forEach(matches => {
        berlinHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("berlins").innerHTML = berlinHTML;
}


//17. SC Paderborn 07

function getPaderbornMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(PADERBORN_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showPaderbornMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(PADERBORN_MATCHES)
            .then(data => {
                showPaderbornMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showPaderbornMatches(data) {
    console.log(data);
    var paderbornHTML = "";

    data.matches.forEach(matches => {
        paderbornHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("paderborns").innerHTML = paderbornHTML;
}


//18. SRB Leipzig

function getLeipzigMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(LEIPZIG_MATCHES).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log("Competition Data: " + data);
                        showLeipzigMatches(data);
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(LEIPZIG_MATCHES)
            .then(data => {
                showLeipzigMatches(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

function showLeipzigMatches(data) {
    console.log(data);
    var leipzigHTML = "";

    data.matches.forEach(matches => {
        leipzigHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("leipzigs").innerHTML = leipzigHTML;
}

function getSavedMatches() {
    getAll().then(function(matches) {
        console.log(matches);

        var matcheHTML = "";

        matches.forEach(matches => {
            matcheHTML += `<style>
            .info {
                width: 300px;
                height: 300px;
            }
        </style>
            <div class="col m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5>Date: ${matches.utcDate}</h5>
                        <h5>Match day: ${matches.matchday}</h5>
                        <p>${matches.homeTeam.name}</p>
                        <p>VS</p>
                        <p>${matches.awayTeam.name}</p>
                    </div>
                </div>
            </div>
            <div class="fixed-action-btn">
            <a class="btn-floating btn-large red" id="remove" onclick="btnRemove()" class="removeButton">
        <i class="large material-icons">delete</i></a>
        </div>
            
        `;
        });
        document.getElementById("body-content").innerHTML = matcheHTML;
    })
}

let removeButtons = document.querySelectorAll(".removeButton");
for (let button of removeButtons) {
    button.addEventListener("click", function(event) {
        let id = event.target.id;
        dbDeleteMatche(id).then(() => {
            getSavedMatches()
        });
    });
    console.log('button clicked');
}

function btnRemove(id) {
    console.log("tombol remove di klik");
    dbDeleteMatche(id).then(() => {
        getSavedMatches()
    });
}