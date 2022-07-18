// project contributer prompt.
function renderContributions(confirmHelpers, data) {
    if (!confirmHelpers) {
      return `I will not be accepting contributions from third parties.`;
    } else {
      return `${data}`;
    }
  }
  
// function that takes selected license and provides.
  function renderLicense(license) {
    if (license !== 'no license') {
      return `![badge](https://img.shields.io/badge/license-${license}-blue)`;
    } else {
      return ' ';
    }
  }
  
// funtion that provides license link.
  function renderLink(license) {
    if (license !== 'no license') {
      return `[${license}](https://choosealicense.com/licenses/${license})`;
    } else {
      return ' ';
    }
  }
  
// function that creates license section on README.
  function renderSection(license) {
    if (license !== 'no license') {
      return `
    ## [License](#table-of-contents)
  
    The application is covered under the following license:
  
    ${renderLink(license)}
      `;
    } else {
      return ' ';
    }
  }
  
// function that places license in TOC
  function renderTOC(license) {
    if (license !== 'no license') {
      return `* [License](#license)`;
    } else {
      return ' ';
    }
  }
  
// function to generate README.
  function renderMarkdown(data) {
    return `
    # ${data.title}
    
    ${renderLicense(data.license)}
  
    ## Table-of-Contents
  
    * [Description](#description)
    * [Installation](#installation)
    * [Usage](#usage)
    ${renderTOC(data.license)}
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)
    
    ## [Description](#table-of-contents)
  
    ${data.purpose}
  
    ${data.creation}
  
    ${data.usage}
  
    ## [Installation](#table-of-contents)
  
    ${data.installation}
  
    ## [Usage](#table-of-contents)
  
    ${data.usage}
    
    ${renderSection(data.license)}
  
    ## [Contributing](#table-of-contents)
    
    ${renderContributions(data.confirmHelpers, data.contributions)}
  
    ## [Tests](#table-of-contents)
  
    ${data.testing}
  
    ## [Questions](#table-of-contents)
  
    Please contact me using the following links:
  
    [GitHub](https://github.com/${data.githubUsername})
  
    [Email: ${data.email}](mailto:${data.email})
  `;
  }
  
  module.exports = renderMarkdown;