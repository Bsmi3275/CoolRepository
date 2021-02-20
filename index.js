const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
 
const writeFileAsync = util.promisify(fs.writeFile);

let badgeImg;
let badgeUrl;
const licenseArray = ['MIT', 'GPLv2', 'GPLv3', 'Apache', 'Other', 'None'];
const licenseBadges = [
    {
        license: 'MIT',
        img: 'https://img.shields.io/badge/License-MIT-yellow.svg',
        url: 'https://opensource.org/licenses/MIT'
    },
    {
        license: 'GPLv2',
        img: 'https://img.shields.io/badge/License-GPL%20v2-blue.svg',
        url: 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html'
    },
    {
        license: 'GPLv3',
        img: 'https://img.shields.io/badge/License-GPLv3-blue.svg',
        url: 'https://www.gnu.org/licenses/gpl-3.0'
    },
    {
        license: 'Apache',
        img: 'https://img.shields.io/badge/License-Apache%202.0-blue.svg',
        url: 'https://opensource.org/licenses/Apache-2.0'
    }
]

const promptUser = () => {
    return inquirer.prompt ([
    { 
        type: "input",
        message: "Please enter your title",
        name: "title"
    },
    {
        type: "input",
        message: "Please describe your project (400-800):",
        name: "description"
    },
    {
        type: "input",
        message: "Please enter some basic instructions for the project that this README will be used for",
        name: "instructions1"
    },
    {
        type: "input",
        message: "Please enter some basic instructions for the user once this project is done",
        name: "instructions2"
    },
    {
        type: "input",
        message: "Please enter the names of those who participated in this project:",
        name: "author"
    },
    {
        type: "input",
        message: "Type some instructions for the 'test' section: ",
        name: "tests"
    },
    {
        type: "input",
        message: "Please enter your email: ",
        name: "email"
    },
    {
        type: "input",
        message: "Please enter your github username: ",
        name: "profile"
    },
    {
        type: "input",
        message: "Please enter any instructions so that the user may contact you: ",
        name: "instructions3"
    },
    {
        type: "list",
        message: "Please select a license: ",
        name: "license",
        choices: licenseArray
    },
    {
        type: "input",
        message: "Ask any additional questions for your user here or click the space bar ( ) if inapplicable: ",
        name: "query"
    },


]);

}

const generateMarkdown = (data) => {
    return `

![License](${badgeImg})
# Title: ${data.title.trim()}
## Author (or contributors): ${data.author}


## Table of Contents
* [License](#license)
* [Description](#description)
* [Contributing](#contributing)
* [Tests](#tests)
* [Installation](#installation)
* [Usage](#usage)
* [Questions](#questions)

### License:
#### <p>${data.license}</p>

### Description: 
#### <p>${data.description}</p>

### Contributing:
#### <p>${data.author}</p>

### Tests:
#### <p>${data.tests}</p>

### Installation: 
#### <p>${data.instructions1}</p>

### Usage: 
#### <p>${data.instructions2}</p>

### Questions:
#### <p>${data.instructions3}</p>
* [Github profile](https://github.com/${data.profile})

* Email: ${data.email}
#### <p>${data.query}</p>
`;
}

const licenseBadge = (data) => {

    if(data.license === 'Other'){
        badgeImg = 'Other License';
        badgeUrl = 'Other License';
    } else if(data.license === 'None'){
        badgeImg = 'No License';
        badgeUrl = 'No License';
    } else {
        for (let i = 0; i < licenseBadges.length; i++){
            if(data.license === licenseBadges[i].license){
                badgeImg = licenseBadges[i].img;
                badgeUrl = licenseBadges[i].url;
                break;
            } 
        } 
    } 

}

async function init() {
    try {
        const data = await promptUser();

        licenseBadge(data);
        
        const readMe = generateMarkdown(data)
        await writeFileAsync("README.md", readMe);
        console.log("READme successfully generated");
    } catch (err) {
        console.log(err);
    }
}

init();


