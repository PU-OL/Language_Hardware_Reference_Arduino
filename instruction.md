# Instruction

> ## Table of Content
>
> 1. [How to print the markdown and to pdf](#how-to-print-the-markdown-and-to-pdf)
>    - [I. Needed Software](#I.-needed-software)
>    - [II. Convert the markdown to pdf](#II.-convert-the-markdown-to-pdf)
> 2. [How to edit the markdwon or the style](#how-to-edit-the-markdown-or-the-style)
>    - [I. Editing the markdown files](#I.-editing-the-markdown-files)
>    - [II. Editing the syle](#II.-editing-the-style)
> 3. [Footnotes](#footnotes)
>

---

## How to print the markdown and to pdf

### I. Needed software

1. You need to install some software:

    - Node.js [^1]
    - VS Code [^2]
        - Markdown Preview Enhanced [^3]

2. Install Node.js

After you followed the installation agent from Node.js, you have to start the cmd[^4].
Then you have to install jsdom by entering the following line in the cmd:

```bash
npm install jsdom
```

3. Install VS Code and the needed extension

- Follow the installation guide from the VS Code
- Start the programm and open an empty project
- Switch on the left side to extensions and search for: *Markdown Preview Enhanced*
- After this extension is fully installed and started you finished all needed installations

### II. Convert the markdown to pdf

1. Clone and open the project form Github as a project in VS Code[^5]

2. Open the reference you want to print from the folder:
 ``Langauge_Hardware_Reference_Arduino/markdownfile/CHOSEREFERENCE.md``

3. In the markdown file you have press ``strg + shift + v`` to open the markdown preview

4. In the bottom right corner you can find a burger menu. Open it and choose:
 ``export -> HTML -> HTML(offline)``

5. Open your windows PowerShell and add the style:

```bash
#Choose the path to this folder and press enter
cd "C:\Users\YOUR-USERNAME\...\Langauge_Hardware_Reference_Arduino" 

# Add style to your reference as html you generated before
node filesforprint/addstyle.js markdownfile/CHOSEREFERENCE.html 
```

6. Open the ``CHOSENREFERENCE.html`` in your browser over the explorer

7. Press ``strg + p`` on this website and choose the printer and print

> [!NOTE]
> To get a pdf you have to choose the printer: *Microsoft Print to PDF*
>

---

## How to edit the markdown or the style

> [!WARNING]
> Editing the style file could cause multiple style and console errors
> Editing the markdown files is allowed as long as it does not violate the license
>

### I. Editing the markdown files

For editing the markdown files you need an editor like VS Code or the basic editor from windows. All Markdown files you can find in the folder markdownfiles.

### II. Editing the style

> [!NOTE]
> For editing the styles you need CSS and JS. If you are not familiar with these languages it should be avoided to edit the style.
>

For editing you have to distinguish between the style it self via the style sheet in ``../designfiles/pdfstyle.pdf`` and the file, which you can find in ``../fileforprint/addstyle.js`` for automatic add the style to the generated html file. This files have some comments but no fully documentation.

©2025 PU-OL

---

## Footnotes

[^1][Download Node.js](https://nodejs.org/en/download)

[^2][Download VS Code](https://code.visualstudio.com/Download)

[^3] This is an extension in VS Code

[^4] The cmd can be startet during pressing ``win + r`` and enter ``cmd``.

[^5] Under the green fild you can download the software. [Github Repository](https://github.com/PU-OL/Langauge_Hardware_Reference_Arduino)
