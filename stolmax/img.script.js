const fs = require("fs");
const path = require("path");

const directory = __dirname + `/src/assets/gallery`;
start();

const categories = ['biuro', 'sypialnia', 'salon', 'lazienka', 'kuchnia', 'szafy']

async function start() {
    const token = await getToken();

    removeAllFiles(directory);

    categories.forEach(async (category) => {
        generateImgs(category, directory, token);
    })
}

async function getToken() {
    const response = await fetch('https://api.sirv.com/v2/token', {
        body: JSON.stringify({
            "clientId": "HvxYTlDDDPTHiLjMtyKjXnmJqQX",
            "clientSecret": "LX32uMmScb69NegzJIfiEjXFv4+iLnhiROubKc0cVJl5DJtGn5LWSWhyzkaTwK00kuZZWKKg4EH9IHRqtfED0g=="
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

    });
    const body = await response.json();
    return body.token;
}

async function generateImgs(category, directory, token) {
    const response = await fetch('https://api.sirv.com/v2/files/search', {
        body: JSON.stringify({
            "query": `dirname:\\/.${category}`,
            "sort": {
                "filename.raw": "asc"
            },
            "from": 0,
            "size": 100
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },

    });
    const body = await response.json();

    const data = body.hits.map((e) => {
        return {
            url: e._source.filename,
            alt: `${category} gallery image`
        }
    })
    fs.writeFile(`${directory}/${category}.json`, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
}

function removeAllFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
}