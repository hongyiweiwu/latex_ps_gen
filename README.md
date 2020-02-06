# latex-ps-gen

Latex-Ps-Gen is a handy Latex document generator. It predefines a template for college problem sets that I thought looks pretty sleek. You write a configuration
file defining some of the properties of the documents. Then every time you need to start a new problem set, just type `lpg` in your terminal and a new LaTeX file
containing all the boring boilerplates will be created, so you can directly start crunching numbers.

## How to Install
Make sure that you have `node` on your machine (to check, type `npm` in your terminal and see if there's any error). If not, here's how to do it on MacOS and Linux (sorry Windows users, you're on your own):

**Linux**: `sudo apt install nodejs`

**MacOS**: `brew install node`

Then run `npm install -g https://github.com/hongyiweiwu/latex_ps_gen.git`
(if in Linux, prefix this command with `sudo`).

## Getting Started
Make sure that you have a separate folder for each course. In one such folder, run `lpg init`. This will create a file `.lpg.json` in the folder that serves as a configuration file. You then need to edit the file so it includes the following properties (I recommend that you write this file using a text editor like VSCode, which will provide autocomplete functionalities to avoid misspelling.)

- `title` -- Title of the course.

- `author` -- Name of the author of these homeworks (i.e. you, *hopefully*).

- `packages` -- Array of packages you want to include in each assignment.

- `psNumberingScheme` -- For the `n`th problem set whether you want to display the `n` in Roman Numeral (`roman`) or arabic numerals (`arabic`).

- `questionNumberingScheme` -- How each question is labeled. Normally professors arrange their problems in two ways:

    1. Each problem set just has problem 1, problem 2, ..., all the way to problem n. In that case you set the property to
    ```json
    {
        "scheme": "enumerate",
        "format": "..."
    }
    ```
    where the format is how you want your label to be like. It can be any LaTeX code. Replace where you want the index of the question to be with `\alph*` if you want lowercase letter representation, `\Alph*` if you want uppercase letter representation, `\arabic*` if you want arabic, and `\roman*` if you want roman representation. Some sample format here (for the 3rd question):
    - `\\textit{\roman*}` -- *iii*
    - `\\textbf{Problem \arabic*}` -- **Problem 3**

    2. If each question has a non-sequential index (i.e. the teacher just assigns questions out of a textbook), set the property to
    ```json
    {
        "scheme": "description",
    }
    ```

Now, save the config file. From now on, for each new assignment, enter this directory and type `lpg`. A new `.tex` file containing all the boilerplate will appear.

NOTE: When writing properties for the config file, you need to escape certain characters inside the quotes: so instead of `"` and `\`, write `\"` and `\\`. Again, just write stuff in VSCode and if you didn't escape certain things you should see an error.



