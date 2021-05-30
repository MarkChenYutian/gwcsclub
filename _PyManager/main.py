from datetime import datetime

import os
import json
import time

# Window Specific Import
import tkinter
from tkinter import *
# from tkinter.ttk import *
from tkinter import scrolledtext
from tkinter import filedialog
from tkinter.tix import ButtonBox
from tkinter.ttk import Separator
from tkinter.ttk import Progressbar

# Global Var ====================================================================
BIGFONT = ("Arial", 18)
NORMFONT = ("Arial", 12)
SMALLFONT = ("Arial", 10)

NORMPADDING = {"padx": (4, 4), "pady": (6, 4)}

# Define Window =================================================================
window = tkinter.tix.Tk()
window.title("GW Computer Science Club Site Manager")

# Helper Function ===============================================================
def writeText(message, terminal, highlight=False):
    currDate = datetime.now()
    dt_string = currDate.strftime("[%d/%m/%Y %H:%M:%S]  ")
    out['state'] = NORMAL
    if highlight:
        out.insert(END, dt_string + message + "\n", ('exception', 'norm'))
    else:
        out.insert(END, dt_string + message + "\n", ('norm', ))
    out['state'] = DISABLED

def selectFile(out, showBox):
    try:
        file = filedialog.askopenfilename(filetypes = (("md File","*.md"),("Markdown File","*.markdown")))
        writeText("Select File @ " + file, out)
        showBox["text"] = file.split("/")[-1].split("\\")[-1]
    except Exception as e:
        writeText(str(e), out, highlight=True)

def getLayout(out):
    try:
        writeText("Reading Layouts Information from ./_layouts", out)
        res = [fileName[:-5] for fileName in os.listdir("./_layouts")]
        writeText("Layouts: {}".format(res), out)
        return res
    except Exception as e:
        writeText(str(e), out, highlight=True)

def getTags(out):
    try:
        writeText("Reading Tags Information from ./Py-Manager/tags.json", out)
        with open("./Py-Manager/tags.json", "r") as f: data = json.load(f)
        tags = {t for line in data for t in line.split(",")}
        writeText("Tags: {}".format(tags), out)
        return tags
    except Exception as e:
        writeText(str(e), out, highlight=True)

def mainWorker(out, bar):
    for i in range(200):
        bar['val'] += 0.5
        time.sleep(0.01)

# Text Labels ====================================================================
h1 = Label(window, text="Jekyll Site Content Manager, alpha Version", font=("Arial Italic", 18)).pack()

divider = Separator(window, orient="horizontal")
divider.pack(fill="x")

f = LabelFrame(width=600, height=200, highlightthickness = 0, bd = 0)

# Add Content Block ===============================================================
f1 = LabelFrame(f, width=300, height=130, text="Add New Content", font=NORMFONT)
out = scrolledtext.ScrolledText(window, width=120, height=10, state=DISABLED)

fileText = Label(f1, text="", font=NORMFONT)
btn1 = Button(f1, text="Select File", font=NORMFONT, command=lambda: selectFile(out, fileText)).grid(column=0, row=0, **NORMPADDING, sticky=E)
fileText.grid(column=1, row=0, padx=(8, 8), pady=(8, 8))

h5 = Label(f1, text="Page Layout: ", font=NORMFONT).grid(column=0, row=1, **NORMPADDING, sticky=E)
layout = tkinter.ttk.Combobox(f1, font=NORMFONT, width=20)
layout['values'] = tuple(getLayout(out))
layout.grid(column = 1, row = 1, padx=(8, 8), pady=(8, 8))

h6 = Label(f1, text="Author: ", font=NORMFONT).grid(column = 0, row = 2, **NORMPADDING, sticky=E)
author = Entry(f1, width=23, font=NORMFONT).grid(column=1, row=2, **NORMPADDING)

h6 = Label(f1, text="Tags: ", font=NORMFONT).grid(column = 0, row = 3, **NORMPADDING, sticky=E)

# >>> Tag Box ========================================================================
tags = LabelFrame(f1, width=300, height=130, font=NORMFONT, highlightthickness=0, bd=0)

all_tags = getTags(out)
chk_states = [BooleanVar() for _ in range(len(all_tags))]
checkBoxes = [Checkbutton(tags, text=tagText, var=chk_states[i]) for i, tagText in enumerate(all_tags)]
for i, checkBtn in enumerate(checkBoxes): checkBtn.grid(column=i%3, row=i//3, sticky=W)
tags.grid(column = 1, row = 3, **NORMPADDING)

# >>> Tag Box End ==================================================================
pb = Progressbar(window, length=300, style='black.Horizontal.TProgressbar')
addBtn = Button(f1, text="Add Content", font=NORMFONT, background="#BBEFFD", command=lambda: mainWorker(out, pb)).grid(column=3, row=4, **NORMPADDING)

f1.grid(row = 0, column = 0, padx = (0, 16), sticky=N+S)

# Run Jekyll Server Block ==========================================================

f2 = LabelFrame(f, width=300, height=130, text="Run Jekyll Server", font=NORMFONT)

btnbox1 = ButtonBox(f2, bg="#F0F0F0", highlightthickness = 0, bd = 0)
btnbox1.add("r1", text="jekyll serve", font=NORMFONT, command=lambda: selectFile(out, None))
btnbox1.add("r2", text="jekyll with bundle", font=NORMFONT, command=lambda: selectFile(out, None))
btnbox1.pack()

f2.grid(row = 0, column = 1, sticky=N+S)
f.pack()

# Progress Bar Block ===============================================================

pb.pack()

# Python Log Output Box ============================================================

h3 = Label(window, text="Terminal Output", font=NORMFONT).pack()

out.pack()
out.tag_config('exception', background="#FFEE00")
out.tag_config('norm', font=SMALLFONT)

divider2 = Separator(window, orient="horizontal")
divider2.pack(fill="x", pady=(8, 0))

h4 = Label(window, text="By Mark, Powered by Tkinter", font=SMALLFONT).pack(pady=(16, 8))

window.mainloop()