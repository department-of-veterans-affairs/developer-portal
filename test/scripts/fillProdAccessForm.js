const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const STEPS = ['1', '2', '3', '4'];
const usage = () => {
  console.log('USAGE\n$ node fillProdAccessForm.js dataFile [step]');
  console.log('  filename: a JSON file with data for the prod access form.');
  console.log('  step: the number of steps to fill out. For example, if I want to test the Basic Information page, I would set the step to 1.');
}

let step;
const validateArgs = () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Too few arguments passed! Filename is required.\n');
    usage();
    process.exit(1);
  }

  // filename
  const filename = args[0];
  const absolutePath = path.join(process.cwd(), filename);
  try {
    fs.readFileSync(absolutePath);
  } catch (error) {
    if (/no such file or directory/.test(error.message)) {
      console.error('Data file does not exist. Please provide a valid data file.\n');
    } else {
      console.error(`Could not validate that data file exists. Error: ${error.message}\n`);
    }

    usage();
    process.exit(1);
  }

  // step
  if (!args[1]) {
    step = 4;
    return;
  }

  if (!STEPS.includes(args[1])) {
    console.error('Please provide a valid step. It can be any integer 1 through 4.\n');
    usage();
    process.exit(1);
  }

  step = parseInt(args[1]);
};

validateArgs();


const execute = async () => {
  await puppeteer.connect({

  })
};

execute();
