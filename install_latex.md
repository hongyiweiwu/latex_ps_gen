# How Do I Install a Local Distribution of Latex?

It's pretty easy. Here's how it goes.

## MacOS
First make sure you have the command lines tool installed. To check if you have it, type `gcc` in your terminal. If
you don't have it, a prompt will open up that directs you to install.

Now, go to http://www.tug.org/mactex/morepackages.html and download the `BasicTeX.pkg` from the webpage. Open it and follow the directions. After this you'll have the LaTeX distribution on your local disk. You can confirm this by typing `tlmgr` in your terminal and there shouldn't be an `unknown command` error.

The LaTeX distribution in the link above is a minimum distribution. I chose to use this to save disk space. This means it doesn't involve a lot of the fancy packages you might need to do some fancy stuff. To remedy this use LaTeX's in-house package manager, `tlmgr`, which is akin to `npm` for `node`. Whenever you're missing some packages, just type `sudo tlmgr install <package-name>`. Right now, make sure that `tlmgr` is in its latest version by executing `sudo tlmgr update --self`.

Now the installation is done. Whenever you wanna compile a `.tex` file into a `.pdf` file, just type `latexmk -shell-escape -pdf <filename>`. Still, it's a pain in the ass to actually edit things in this way. We now provide a much user-friendlier editing environment using VSCod`.

After installing VSCode, go to the Extensions panel and download `LaTeX Workshop`. We now do some simple setup to make this extension more handy. Press `View` -> `Command Palette` and select `Open Settings (JSON)`. Then add the following fields:
```json
    "latex-workshop.latex.autoClean.run": "onBuilt",
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.fls",
        "*.log",
        "*.fdb_latexmk",
        "*.snm",
        "*.synctex(busy)",
        "*.synctex.gz(busy)",
        "*.nav",
        "*.synctex.gz"
    ]
```
The first property makes sure that VSCode will recompile the `.tex` file you're editing everytime you save it, so basically it will recompile things following your changes in real time as long as you save a lot. The second property automatically removes the temporary files LaTeX uses to compile but refuses to clean afterwards.

Now you can edit LaTeX in VSCode seemlessly. If you do not see a `.pdf` being built after you save it, explicitly make a command by again opening the command palette and select `build with recipe` -> `latexmk`. If you want to preview the pdf file in real time, open the command palette and type `View LaTeX PDF File In New VSCode Tab`, and you can see the result `.pdf` file as you make changes.


## Linux
COMING SOON
## Windows
COMING SOON (or not)