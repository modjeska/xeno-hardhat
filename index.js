// node modules.
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./tools/generateMarkdown.js');

// Array of objects containing questions regarding README.
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project? *',
    validate: projectTitle => {
      if (projectTitle) {
        return true;
      } else {
        console.log('Title cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your GitHub Username? *',
    validate: gitInput => {
      if (gitInput) {
        return true;
      } else {
        console.log('Github username cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? *',
    validate: userEmail => {
      if (userEmail) {
        return true;
      } else {
        console.log('Email address cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'purpose',
    message: 'What does your project do? *',
    validate: projectPurpose => {
      if (projectPurpose) {
        return true;
      } else {
        console.log('Project premise cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'creation',
    message: 'Why did you create this project? *',
    validate: projectCreation => {
      if (projectCreation) {
        return true;
      } else {
        console.log('Creation premise cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'How can someone use this? *',
    validate: projectUsage => {
      if (projectUsage) {
        return true;
      } else {
        console.log('Project use cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provided installation instructions. *',
    validate: projectInstall => {
      if (projectInstall) {
        return true;
      } else {
        console.log('Installation instructions cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'how to',
    message: 'Provided usage instructions *',
    validate: projectHowTo => {
      if (projectHowTo) {
        return true;
      } else {
        console.log('Usage instructions cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'list',
    name: 'license',
    message: 'Select a license for your project.',
    choices: ['mit', 'apache', 'agpl', 'no license']
  },
  {
    type: 'confirm',
    name: 'confirmHelpers',
    message: 'Can other developers contribute to this project?',
    default: true
  },
  {
    type: 'input',
    name: 'contributions',
    message: 'Provide contribution guidelines. *',
    when: ({ confirmHelpers }) => {
      if (confirmHelpers) {
        return true;
      } else {
        return false;
      }
    },
    validate: guidelinesInput => {
      if (guidelinesInput) {
        return true;
      } else {
        console.log('Guidelines cannot be blank.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'testing',
    message: 'Provide project testing procedures. *',
    validate: projectTesting => {
      if (projectTesting) {
        return true;
      } else {
        console.log('Testing procedures cannot be blank.');
        return false;
      }
    }
  }
];

// README file writer.
const writeFile = fileData => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./output/created-README.md', fileData, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: 'File created successfully.'
      });
    });
  });
};

// function handles user input and questions.
const init = () => {

  return inquirer.prompt(questions)
    .then(readmeFile => {
      return readmeFile;
    })
}

// app initialization.
init()
  .then(readmeFile => {
    console.log(readmeFile);
    return generateMarkdown(readmeFile);
  })
  .then(generator => {
    return writeFile(generator);
  })
  .then(writeFileMessage => {
    console.log(writeFileMessage.message);
  })
  .catch(err => {
    console.log(err);
  })