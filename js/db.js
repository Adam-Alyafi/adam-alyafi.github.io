var dbPromised = idb.open("matches-club", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("matches", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("matchday", "matchday", { unique: false });
});

function saveForLater(matche) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            console.log(matche.matches);
            store.add(matche.matches[0]);
            store.add(matche.matches[1]);
            store.add(matche.matches[2]);
            store.add(matche.matches[3]);
            store.add(matche.matches[4]);
            store.add(matche.matches[5]);
            return tx.complete;
        })

    .then(function() {
        console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.getAll();
            })
            .then(function(matches) {
                resolve(matches);
            });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.get(id);
            })
            .then(function(matche) {
                resolve(matche);
            });
    });
}

function dbDeleteMatche(id) {
    return new Promise(function(resolve, reject) {
        dbPromised.then(function(db) {
            var tx = db.transaction('matches', 'readwrite');
            var store = tx.objectStore('matches');
            store.clear();
            return tx.complete;
        }).then(function() {
            getSavedMatches();
            console.log('Item deleted');
        });
    })
}