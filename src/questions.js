export const QUESTIONS = [
  {
    id: 1,
    topic: "Functions",
    difficulty: "Easy",
    riddle: "I am a package delivery driver. I take the final result of a block of work and send it back out to whoever called for it.",
    hint: "Every useful function ends with this keyword.",
    answer: "return"
  },
  {
    id: 2,
    topic: "Exception Handling",
    difficulty: "Easy",
    riddle: "I appear when code goes wrong, but I don't always stay for long. If not handled, I break the flow, and crash your program's steady show.",
    hint: "Programs raise me when something unexpected happens.",
    answer: "Exception"
  },
  {
    id: 3,
    topic: "Basic Input / Output",
    difficulty: "Easy",
    riddle: "I am a built-in function. Whatever you place inside my parentheses, I will blast it out onto the screen so the human sitting at the computer can actually see it.",
    hint: "Hello, World! was shown using me.",
    answer: "print"
  },
  {
    id: 4,
    topic: "Loops – while",
    difficulty: "Easy",
    riddle: "I am a loop that loves to run, I stay awake till the job is done. But if you forget to change my condition, I'll run your program on an endless mission!",
    hint: "I keep going as long as the condition stays true.",
    answer: "while"
  },
  {
    id: 5,
    topic: "Operators – Membership",
    difficulty: "Medium",
    riddle: "I check if something belongs inside, in a group where values hide. True or false is what I say, I guide membership every day.",
    hint: "I'm a keyword — try me on a list or a string.",
    answer: "in"
  },
  {
    id: 6,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "I am a number without a point, whole and strong in every joint. No decimals come in my way, I stay complete every day.",
    hint: "The opposite of a float.",
    answer: "integer"
  },
  {
    id: 7,
    topic: "Operators – Logical",
    difficulty: "Easy",
    riddle: "I join conditions side by side; both must match for truth to ride. If one fails, I disappear — I need full truth to stay clear.",
    hint: "Both sides must be True for me to return True.",
    answer: "and"
  },
  {
    id: 8,
    topic: "Exception Handling",
    difficulty: "Easy",
    riddle: "I watch your code with careful eye, where danger lives, I stand nearby. If something fails, I do not cry, I just let handlers clarify.",
    hint: "I wrap risky code — my partner catches what goes wrong.",
    answer: "try"
  },
  {
    id: 9,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "I am a collection, ordered and neat, wrapped in parentheses, I sit in my seat. But try to change me or add something new, and I'll throw a TypeError right back at you!",
    hint: "Like a list, but immutable.",
    answer: "Tuple"
  },
  {
    id: 10,
    topic: "Operators – Arithmetic",
    difficulty: "Easy",
    riddle: "I am a math operator, but I don't give you the sum. I divide two numbers, but the quotient won't come. Instead, I only care about what is left behind.",
    hint: "17 divided by 5 — I give you the remainder.",
    answer: "%"
  },
  {
    id: 11,
    topic: "Conditional Statements",
    difficulty: "Easy",
    riddle: "I stand between if and the final end, multiple checks I help you send. Not first, not last, but in-between — I test conditions yet unseen.",
    hint: "I come after if but before else.",
    answer: "elif"
  },
  {
    id: 12,
    topic: "Arrays / Lists – Slicing",
    difficulty: "Medium",
    riddle: "I am a colon-separated sequence of three, used on a list to grab what you see. But if my third value is negative, I flip the whole sequence before I am done!",
    hint: "start:stop:step — I cut collections.",
    answer: "Slicing"
  },
  {
    id: 13,
    topic: "Operators – Identity",
    difficulty: "Medium",
    riddle: "I check if two names are the same, not value, but memory frame. If objects share identity true, I return truth for you.",
    hint: "I'm not about equality — I'm about being the exact same object.",
    answer: "is"
  },
  {
    id: 14,
    topic: "Syntax",
    difficulty: "Easy",
    riddle: "I sit in your script but I never complain — the interpreter skips me again and again. I start with a sharp little scratch, to explain what your code is attempting to catch.",
    hint: "Programmers use me to explain their logic.",
    answer: "Comment"
  },
  {
    id: 15,
    topic: "Operators – Relational",
    difficulty: "Easy",
    riddle: "I look like a double dose of math's favorite sign, but I don't give values — I just check if two sides match perfectly on a line.",
    hint: "Confusing me with = is every beginner's first bug.",
    answer: "=="
  },
  {
    id: 16,
    topic: "Output",
    difficulty: "Easy",
    riddle: "I break your line without a key, a silent jump you cannot see. Text flows down in a new place, I split output line by space.",
    hint: "I'm a two-character escape sequence — a backslash followed by a letter.",
    answer: "\\n"
  },
  {
    id: 17,
    topic: "Syntax",
    difficulty: "Medium",
    riddle: "I am invisible to the naked eye when you read your code aloud, but omit me or miscount me, and I will make your program crash proud. I replace the curly braces that other languages rely upon.",
    hint: "Python uses me instead of { } to define blocks.",
    answer: "Indentation"
  },
  {
    id: 18,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "Feed me words, feed me paragraphs, or just a single letter — I will hold them all together. I look like a sequence, but once created, you cannot change a part of me.",
    hint: "I'm immutable and always wear quote marks.",
    answer: "String"
  },
  {
    id: 19,
    topic: "Loops – break",
    difficulty: "Easy",
    riddle: "I am a single word found inside a loop's walls, waiting for a condition to answer my calls. The moment I execute, the loop meets its end, shattering the cycle so your code can transcend.",
    hint: "I exit a loop immediately — no questions asked.",
    answer: "break"
  },
  {
    id: 20,
    topic: "Variables & Data Types",
    difficulty: "Medium",
    riddle: "I am a container that holds a secret, but I am not the secret myself. I can change my value whenever you want, but my name must always start with a letter or underscore — never a number.",
    hint: "You create me with just a name and an = sign.",
    answer: "Variable"
  },
  {
    id: 21,
    topic: "Functions – Scope",
    difficulty: "Medium",
    riddle: "Born inside a function's walls, I live a quiet life, hidden from the global world. Try to print my value from the main script outside, and Python throws a NameError because I've gone and died.",
    hint: "I only exist within the function that created me.",
    answer: "Local Variable"
  },
  {
    id: 22,
    topic: "Arrays / Lists",
    difficulty: "Easy",
    riddle: "I am empty at first, but I can grow. I hold many items and keep them in order. You can change my contents anytime.",
    hint: "You create me with square brackets: [ ]",
    answer: "List"
  },
  {
    id: 23,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "I have only two states, yet I control decisions in powerful ways. Everything depends on whether I am true or false.",
    hint: "True or False — that's all I know.",
    answer: "Boolean"
  },
  {
    id: 24,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "I am a fixed value, written exactly as I am seen. No calculations needed, no variables in between. Put quotes around me and I'm text; drop the quotes and I become a number.",
    hint: "I'm a raw value written directly in code.",
    answer: "Literal"
  },
  {
    id: 25,
    topic: "Exception Handling",
    difficulty: "Easy",
    riddle: "I guard your code when danger appears. When errors arise, I calm your fears. If something breaks in the path you trace, I handle the problem in a safer place.",
    hint: "I come right after try — I catch what goes wrong.",
    answer: "except"
  },
  {
    id: 26,
    topic: "Operators – Arithmetic",
    difficulty: "Medium",
    riddle: "I look like division but give no float, I drop the decimals like a boat. Only whole numbers I provide — fractions I always override.",
    hint: "10 / 3 = 3.33... but I give you just 3.",
    answer: "//"
  },
  {
    id: 27,
    topic: "Loops – for",
    difficulty: "Easy",
    riddle: "I travel through each item in sight, one by one, left to right. Lists, strings, or sets I explore, without knowing what's in store.",
    hint: "I'm the go-to loop when you know the collection.",
    answer: "for"
  },
  {
    id: 28,
    topic: "Exception Handling",
    difficulty: "Medium",
    riddle: "I sit with try, but I never complain — even if errors return again and again. Whether success or failure is what you see, I always execute faithfully.",
    hint: "I run no matter what — success or failure.",
    answer: "finally"
  },
  {
    id: 29,
    topic: "Loops – continue",
    difficulty: "Medium",
    riddle: "I skip one step but don't end the race — I move to the next in the looping space. Nothing stops; I just evade one iteration, quietly delayed.",
    hint: "I skip the rest of this round, not the whole loop.",
    answer: "continue"
  },
  {
    id: 30,
    topic: "Functions",
    difficulty: "Easy",
    riddle: "I sleep quietly until someone calls me. When awakened, I perform a task and may return something back before going to sleep again.",
    hint: "You define me once with def and call me anytime.",
    answer: "Function"
  },
  {
    id: 31,
    topic: "Conditional Statements",
    difficulty: "Easy",
    riddle: "I sit beside conditions tight — when things go wrong, I make them right. If all fails and nothing's true, I step in to show what to do.",
    hint: "I'm the last resort when no other condition matched.",
    answer: "else"
  },
  {
    id: 32,
    topic: "Data Types – Casting",
    difficulty: "Medium",
    riddle: "I turn text into numbers so clean — without me, math cannot be seen. If you forget me in your code, TypeErrors will overload.",
    hint: "int(), float(), str() — I'm the process of converting types.",
    answer: "Casting"
  },
  {
    id: 33,
    topic: "Operators – Logical",
    difficulty: "Easy",
    riddle: "I need only one truth to win, even if the other falls in. If one side is true, I light the way — I don't need both to stay.",
    hint: "I return True if at least one condition is True.",
    answer: "or"
  },
  {
    id: 34,
    topic: "Functions – Arguments",
    difficulty: "Easy",
    riddle: "I carry values into a function's door — without me, functions know nothing more. I travel in when you make a call, changing behavior big or small.",
    hint: "You pass me inside the parentheses when calling a function.",
    answer: "arguments"
  },
  {
    id: 35,
    topic: "Conditional Statements",
    difficulty: "Easy",
    riddle: "I test truth in every case, deciding which block gets its place. If the condition is false or true, I guide the program's path for you.",
    hint: "Every decision in Python starts with me.",
    answer: "if"
  },
  {
    id: 36,
    topic: "Syntax",
    difficulty: "Medium",
    riddle: "I cannot be used as a name — Python reserves me in its game. Try to rename me and you'll get pain; a syntax error will remain.",
    hint: "if, for, while, return — I'm one of these protected words.",
    answer: "Keyword"
  },
  {
    id: 37,
    topic: "Basic Input / Output",
    difficulty: "Easy",
    riddle: "I listen silently from the user's side — whatever you type, I do not hide. I capture words from keyboard flow and send them where programs go.",
    hint: "I pause the program and wait for the user to type.",
    answer: "input"
  },
  {
    id: 38,
    topic: "Arrays / Lists",
    difficulty: "Easy",
    riddle: "I never delete what's already there — I add new items with gentle care. Old data stays; I just extend at the collection's very end.",
    hint: "I'm a list method — I add one item to the end.",
    answer: "append"
  },
  {
    id: 39,
    topic: "Syntax",
    difficulty: "Easy",
    riddle: "I appear when rules are broken — a missing colon is a token. Python stops and tells you why before your program can fly.",
    hint: "Python catches me before even running your code.",
    answer: "syntax error"
  },
  {
    id: 40,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "I define what kind of value you store inside — numbers, text, or truth I decide. Without me, confusion will grow; I tell Python how values should flow.",
    hint: "int, str, float, bool — I'm the category.",
    answer: "data type"
  },
  {
    id: 41,
    topic: "Variables",
    difficulty: "Easy",
    riddle: "I give value to your name — without me, variables lose their frame. The right side flows into the left; I perform memory's quiet theft.",
    hint: "One symbol, not two — I assign, not compare.",
    answer: "="
  },
  {
    id: 42,
    topic: "Syntax",
    difficulty: "Easy",
    riddle: "I am a full instruction in a single line, doing tasks in Python's design. Assignments, loops, or prints I be — I tell Python what to see.",
    hint: "Every line of code that does something is one of me.",
    answer: "statement"
  },
  {
    id: 43,
    topic: "Modules",
    difficulty: "Easy",
    riddle: "I call external powers inside — libraries become your guide. Without me, modules stay apart; I connect them from the start.",
    hint: "You use me at the top of your file to bring in a library.",
    answer: "import"
  },
  {
    id: 44,
    topic: "Variables",
    difficulty: "Easy",
    riddle: "I am a name you create with care, to store values anywhere. No spaces, no symbols I allow — I give variables their vow.",
    hint: "Must start with a letter or underscore, never a digit.",
    answer: "identifier"
  },
  {
    id: 45,
    topic: "Python Internals",
    difficulty: "Medium",
    riddle: "I read your code line by line — no waiting for compile time. Step by step I bring it alive and help your program survive.",
    hint: "Python uses me instead of a compiler.",
    answer: "interpreter"
  },
  {
    id: 46,
    topic: "Problem Solving",
    difficulty: "Easy",
    riddle: "I am steps in a logical way, to solve a problem every day. Not Python code but thinking clear — I guide programs year to year.",
    hint: "Flowcharts and pseudocode describe me.",
    answer: "algorithm"
  },
  {
    id: 47,
    topic: "Syntax",
    difficulty: "Easy",
    riddle: "I am a placeholder that does nothing at all. Python needs me when a block is empty — without me, it would simply fall.",
    hint: "Four letters that keep Python from throwing a syntax error in empty blocks.",
    answer: "pass"
  },
  {
    id: 48,
    topic: "File Handling",
    difficulty: "Medium",
    riddle: "I shut the door when work is done, to save resources I'm the one. If you forget me, trouble may grow — memory leaks start to show.",
    hint: "Always call me after you're done with a file.",
    answer: "close()"
  },
  {
    id: 49,
    topic: "GUI",
    difficulty: "Easy",
    riddle: "I cannot click, I cannot type, but I show text that's clean and bright. I display messages on your screen — a static helper, always seen.",
    hint: "A read-only widget in GUI programs like Tkinter.",
    answer: "Label"
  },
  {
    id: 50,
    topic: "Variables & Data Types",
    difficulty: "Medium",
    riddle: "I am a magician's box — I hold a number, then swap to text, then swap again to True. Python never complains. My type is decided not at birth, but at the moment I'm used. What is this power called?",
    hint: "Python figures out my type at runtime, not when the code is written.",
    answer: "dynamic typing"
  }
];