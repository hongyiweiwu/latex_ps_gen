# latex-ps-gen

Latex-Ps-Gen is a handy Latex document generator. It predefines a template for college problem sets that I thought looks pretty sleek. You write a configuration
file defining some of the properties of the documents. Then every time you need to start a new problem set, just type `lpg` in your terminal and a new LaTeX file
containing all the boring boilerplates will be created, so you can directly start crunching numbers.

## How to Install
Make sure that you have `node` on your machine (to check, type `npm` in your terminal and see if there's any error). If not, here's how to do it on MacOS and Linux (sorry Windows users, you're on your own):

**Linux**: `sudo apt install nodejs`

**MacOS**: `brew install node`

## Getting Started
Make sure that you have a separate folder for each course. In one such folder, create a file called `.lpg`. This is a standard JSON configuration file that contains the following options. If recommend that you write this file using a text editor like VSCode, which will provide autocomplete functionalities in case of misspelling.



