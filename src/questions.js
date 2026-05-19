export const QUESTIONS = [
  {
    id: 1,
    topic: "Variables & Data Types",
    difficulty: "Easy",
    riddle: "I am a box with a name tag. I can hold a number, some text, or even True or False. In Python, you don't tell me what type I am — I figure it out myself. What am I?",
    hint: "You create me with just a name and an = sign.",
    answer: "variable"
  },
  {
    id: 2,
    topic: "Data Types",
    difficulty: "Easy",
    riddle: "I come in four flavours in Python: whole numbers, decimals, words wrapped in quotes, and yes-or-no answers. A student's age, their name, their GPA, and whether they passed — each is a different flavour. Which type stores their NAME?",
    hint: "I always wear quote marks — single or double, I'm not picky.",
    answer: "str"
  },
  {
    id: 3,
    topic: "Basic Input / Output",
    difficulty: "Easy",
    riddle: "I am the Python function that reads whatever the user types and hands it to you. I pause the program, wait patiently, and when they hit Enter — I give you their words as a string. What is my name?",
    hint: "My name makes total sense — I take the INPUT.",
    answer: "input()"
  },
  {
    id: 4,
    topic: "Basic Input / Output",
    difficulty: "Easy",
    riddle: "I am the simplest way to show something on screen in Python. One word, parentheses, and whatever you want to display goes inside. Every beginner meets me on day one. What am I?",
    hint: "Hello, World! was printed using me.",
    answer: "print()"
  },
  {
    id: 5,
    topic: "Operators – Arithmetic",
    difficulty: "Easy",
    riddle: "Two pirates split 17 gold coins equally. Whatever is left after the fair share — that's what I find. I am not division, but I'm division's leftover shadow. Which Python operator am I?",
    hint: "17 divided by 5 leaves a remainder of 2 — that's me.",
    answer: "%"
  },
  {
    id: 6,
    topic: "Operators – Arithmetic",
    difficulty: "Easy",
    riddle: "I raise a number to the power of another. When you want 2 to the power of 10, I deliver 1024 in one go. No math library needed — I'm built right into Python. What am I?",
    hint: "I look like two multiplication signs side by side.",
    answer: "**"
  },
//   {
//     id: 7,
//     topic: "Operators – Relational",
//     difficulty: "Easy",
//     riddle: "I check if two things are EQUAL. But I am NOT the assignment operator. One = sign puts a value in a box. I use TWO = signs to ask a question: 'Are these the same?' What am I?",
//     hint: "Confusing me with = is every beginner's first bug.",
//     answer: "=="
//   },
//   {
//     id: 8,
//     topic: "Operators – Logical",
//     difficulty: "Easy",
//     riddle: "I am the logical operator that returns True ONLY when BOTH conditions are true. One side fails — I fail. Think of me as a strict gate that only opens when both guards say yes. What am I?",
//     hint: "In Python, I'm not a symbol — I'm an actual English word.",
//     answer: "and"
//   },
//   {
//     id: 9,
//     topic: "Conditional Statements",
//     difficulty: "Easy",
//     riddle: "A shopkeeper checks your age. If you are 18 or older, you get in. If you are 13 to 17, you need a guardian. Otherwise, entry is denied. Which Python structure handles all three scenarios cleanly?",
//     hint: "One checks first, one checks next, and one handles everything else.",
//     answer: "if...elif...else"
//   },
//   {
//     id: 10,
//     topic: "Conditional Statements",
//     difficulty: "Easy",
//     riddle: "The temperature outside is 15°C. The rule says: if it's above 30, print Hot. If it's between 20 and 30, print Warm. Otherwise, print Cool. What gets printed?",
//     hint: "15 is below both thresholds — only one block can win.",
//     answer: "Cool"
//   },
//   {
//     id: 11,
//     topic: "Loops – for",
//     difficulty: "Easy",
//     riddle: "A postman delivers letters to exactly 5 houses, numbered 0 to 4. He visits each one in order, no skipping, no repeats. Which Python loop is the BEST fit for his route?",
//     hint: "When you know exactly how many times — use me.",
//     answer: "for loop"
//   },
//   {
//     id: 12,
//     topic: "Loops – while",
//     difficulty: "Easy",
//     riddle: "A security guard keeps checking the door as long as the alarm is ON. The moment the alarm turns OFF, he stops. He doesn't know in advance how many checks he'll do. Which loop fits his job?",
//     hint: "I keep going as long as the condition is true — I don't count rounds.",
//     answer: "while loop"
//   },
//   {
//     id: 13,
//     topic: "Functions",
//     difficulty: "Easy",
//     riddle: "I am a named block of code that does a job. You define me once with the def keyword, and then call me as many times as you like. I save you from copy-pasting the same code everywhere. What am I?",
//     hint: "Think of me as a recipe — written once, cooked anytime.",
//     answer: "function"
//   },
//   {
//     id: 14,
//     topic: "Functions – Return",
//     difficulty: "Easy",
//     riddle: "I am what a function hands back to you after doing its job. Without me, the function does the work but gives you nothing. Which keyword in Python sends me back to the caller?",
//     hint: "I rhyme with 'concern' and every function should have me.",
//     answer: "return"
//   },
//   {
//     id: 15,
//     topic: "Arrays / Lists",
//     difficulty: "Easy",
//     riddle: "I am an ordered collection of items in Python. I allow duplicates. I can hold numbers, strings, or even other lists. Unlike my cousin the tuple, you CAN change me after creation. What am I?",
//     hint: "You create me with square brackets: [ ]",
//     answer: "list"
//   },
//   {
//     id: 16,
//     topic: "Arrays / Lists",
//     difficulty: "Easy",
//     riddle: "My house has 5 rooms numbered 0 to 4. The LAST room is special — you can also reach it using the number -1. If my list is [10, 20, 30, 40, 50], what does index -1 give you?",
//     hint: "Negative indexes count from the back door.",
//     answer: "50"
//   },
//   {
//     id: 17,
//     topic: "Exception Handling",
//     difficulty: "Easy",
//     riddle: "I am the keyword that begins the risky zone in Python. You put dangerous code inside me. If something goes wrong, my partner catches the problem. If all goes well, we move on peacefully. What keyword am I?",
//     hint: "try, ___, finally — I am the first in line.",
//     answer: "try"
//   },
//   {
//     id: 18,
//     topic: "Recursion",
//     difficulty: "Easy",
//     riddle: "I am a function that has a strange habit — I call myself. But I am not reckless. I have a base case that tells me when to stop. Without it, I'd call myself forever and crash the program. What am I called?",
//     hint: "Think of a mirror facing another mirror — but with a stop sign.",
//     answer: "recursive function"
//   },
//   {
//     id: 19,
//     topic: "Variables & Data Types",
//     difficulty: "Medium",
//     riddle: "A magician stores 3.99 in a box, then swaps it for 'hello', then swaps again for True. The box never breaks. Python never complains. How is this sorcery possible?",
//     hint: "Python decides my type at runtime, not at birth.",
//     answer: "dynamic typing"
//   },
//   {
//     id: 20,
//     topic: "Operators – Arithmetic",
//     difficulty: "Medium",
//     riddle: "I am not regular division. I divide two numbers and then THROW AWAY the decimal — keeping only the whole number floor. x = 10, y = 3. What does x // y return?",
//     hint: "10 / 3 = 3.33... but I give you just 3.",
//     answer: "3"
//   },
//   {
//     id: 21,
//     topic: "Operators – Logical",
//     difficulty: "Medium",
//     riddle: "Two truth-tellers walk into a room. A is True, B is False. They vote using the 'or' rule: even one YES is enough to win. What does A or B return?",
//     hint: "'or' only fails when BOTH sides are False.",
//     answer: "True"
//   },
//   {
//     id: 22,
//     topic: "Conditional Statements",
//     difficulty: "Medium",
//     riddle: "A stern grader checks score = 72 against her rulebook: 90+ earns an A, 75+ earns a B, 60+ earns a C, else an F. She reads the rules TOP to BOTTOM and stops at the FIRST match. Which grade does 72 earn?",
//     hint: "72 fails the first two tests but passes the third — trace each elif carefully.",
//     answer: "C"
//   },
//   {
//     id: 23,
//     topic: "Loops – for",
//     difficulty: "Medium",
//     riddle: "A frog leaps along a number line. It starts at 2, jumps by 2 each time, and stops BEFORE it reaches 10. It uses range(2, 10, 2). What is the complete sequence of numbers it touches?",
//     hint: "range(start, stop, step) — stop is excluded.",
//     answer: "2 4 6 8"
//   },
//   {
//     id: 24,
//     topic: "Loops – while",
//     difficulty: "Medium",
//     riddle: "A clock starts at count = 1 and ticks while count <= 4, printing its number then adding 1. How many ticks ring out, and what is the LAST number printed before silence?",
//     hint: "It starts at 1 and goes up — but does it reach 5? Check the condition carefully.",
//     answer: "4"
//   },
//   {
//     id: 25,
//     topic: "Loops – break",
//     difficulty: "Medium",
//     riddle: "A hunter searches numbers 1 to 10 for the first one divisible by BOTH 2 and 3. The moment he spots it, he shouts it out and immediately leaves using break. What number makes him shout?",
//     hint: "Divisible by both 2 and 3 means divisible by 6 — their smallest common multiple.",
//     answer: "6"
//   },
//   {
//     id: 26,
//     topic: "Loops – continue",
//     difficulty: "Medium",
//     riddle: "A bouncer at a number parade lets only ODD numbers through. Even numbers get a 'continue' — skipped. The parade goes from 1 to 5. Which numbers actually make it past the bouncer?",
//     hint: "'continue' skips the rest of the loop body for that round and jumps to the next.",
//     answer: "1 3 5"
//   },
//   {
//     id: 27,
//     topic: "Functions – Default Args",
//     difficulty: "Medium",
//     riddle: "A polite function greet(name, msg='Hello') has a backup greeting ready. You call greet('Sara') and forget to pass a second argument. The function doesn't panic — it uses its preset. What does it print?",
//     hint: "Default parameters are the function's backup plan when you forget to provide one.",
//     answer: "Hello Sara"
//   },
//   {
//     id: 28,
//     topic: "Functions – Return",
//     difficulty: "Medium",
//     riddle: "A function promises to calculate the square of a number, but mysteriously forgets to write return. You call it with 5 and try to print the result. What silent gift does Python hand back?",
//     hint: "Every function returns SOMETHING — even if you didn't ask it to.",
//     answer: "None"
//   },
//   {
//     id: 29,
//     topic: "Arrays / Lists",
//     difficulty: "Medium",
//     riddle: "A list [10, 20, 30, 40, 50] is a hallway of five doors. You slice it with list[1:4] — stepping in at door 1 and stepping OUT before door 4. Which items do you collect on your way through?",
//     hint: "Slicing is like cutting a sandwich — start here, stop BEFORE there. The stop index is never included.",
//     answer: "[20, 30, 40]"
//   },
//   {
//     id: 30,
//     topic: "Exception Handling",
//     difficulty: "Medium",
//     riddle: "A program tries to open a file that doesn't exist. The except block prints 'File not found'. Then the loyal finally block arrives: 'Closing'. What is the exact order of output?",
//     hint: "'finally' is the loyal soldier — it always shows up last, no matter what.",
//     answer: "File not found then Closing"
//   },
//   {
//     id: 31,
//     topic: "Exception Handling – Types",
//     difficulty: "Medium",
//     riddle: "A daring programmer attempts the impossible: dividing a number by zero. Python raises a specific exception with a very descriptive name — as if Python itself is judging the decision. What is this exception called?",
//     hint: "Python names its errors helpfully — this one literally says what went wrong.",
//     answer: "ZeroDivisionError"
//   },
//   {
//     id: 32,
//     topic: "Recursion",
//     difficulty: "Medium",
//     riddle: "A function counts down from n. If n is 0, it stops. Otherwise it prints n FIRST, then calls itself with n-1. You drop the number 4 into it. What sequence of numbers echoes back before silence?",
//     hint: "Each call prints BEFORE calling itself again — so outer calls print first, then dive deeper.",
//     answer: "4 3 2 1"
//   },
//   {
//     id: 33,
//     topic: "Switch / match",
//     difficulty: "Medium",
//     riddle: "Python finally got its own switch-case — but it goes by a different, more mysterious name. It arrived in version 3.10. It matches a value against patterns like a detective matching fingerprints. What keyword does Python use?",
//     hint: "The word suggests you're looking for a pattern that fits — it's not 'switch'.",
//     answer: "match"
//   },
//   {
//     id: 34,
//     topic: "Loops + Lists",
//     difficulty: "Medium",
//     riddle: "A greedy loop travels through [3, 7, 2, 9, 1], stuffing every number into a growing sum that starts at 0. It finishes its journey and hands you the final total. What is it?",
//     hint: "Add them one by one: 3+7+2+9+1 — follow the trail.",
//     answer: "22"
//   },
//   {
//     id: 35,
//     topic: "Functions + Loops",
//     difficulty: "Medium",
//     riddle: "A function receives the number 5 and climbs a staircase — adding 1, then 2, then 3, then 4, then 5 to a growing sum. When it reaches the top, it hands you the total. What does it return?",
//     hint: "1+2+3+4+5 — a classic staircase sum. Or use the formula: n(n+1)/2.",
//     answer: "15"
//   },
//   {
//     id: 36,
//     topic: "Recursion – Factorial",
//     difficulty: "Hard",
//     riddle: "A function calculates factorial by calling its own shadow: fact(0) returns 1; fact(n) returns n × fact(n-1). You launch it with the number 5. How many total function calls are made — including the very first and the final base case?",
//     hint: "fact(5) calls fact(4) which calls fact(3)... count every single call including the base.",
//     answer: "6"
//   },
//   {
//     id: 37,
//     topic: "Recursion – Output Order",
//     difficulty: "Hard",
//     riddle: "A mysterious function mystery(n) calls itself with n-1 FIRST, then prints n after returning. You call mystery(3). The print comes AFTER the recursive dive. What surfaces when the call stack unwinds?",
//     hint: "The print is AFTER the recursive call — so deeper calls finish first, then printing happens on the way BACK UP.",
//     answer: "1 2 3"
//   },
//   {
//     id: 38,
//     topic: "Lists – Mutation",
//     difficulty: "Hard",
//     riddle: "x = [1, 2, 3] sits in memory. Then y = x — a second name tag is stuck on the SAME box. Then y.append(4) adds a new item. When you check len(x) — what do you get?",
//     hint: "In Python, y = x does NOT copy the list. Both names point to the same object in memory.",
//     answer: "4"
//   },
//   {
//     id: 39,
//     topic: "Exception – else clause",
//     difficulty: "Hard",
//     riddle: "Python's try block has a secret: the else clause — it only speaks if NO exception was raised. Code runs: try: x=5/1. except: print('Error'). else: print('Clean'). finally: print('Done'). What is the full output?",
//     hint: "5/1 succeeds — no exception means 'else' gets to speak. 'finally' is always last.",
//     answer: "Clean Done"
//   },
//   {
//     id: 40,
//     topic: "Loops – Nested",
//     difficulty: "Hard",
//     riddle: "Two loops are nested like Russian dolls. The outer doll opens 3 times (0,1,2). For each opening, the inner doll opens 2 times (0,1). Each inner opening prints one star. How many stars light up in total?",
//     hint: "For EACH outer step, the inner loop completes fully. Multiply, don't add.",
//     answer: "6"
//   },
//   {
//     id: 41,
//     topic: "Functions – Scope",
//     difficulty: "Hard",
//     riddle: "x = 10 lives outside as a global. A function is called and secretly writes x = 99 inside — but without using the global keyword. After the function returns, you check x outside. Which x survived?",
//     hint: "Assigning inside a function creates a LOCAL variable by default — the global is untouched.",
//     answer: "10"
//   },
//   {
//     id: 42,
//     topic: "Recursion – Fibonacci",
//     difficulty: "Hard",
//     riddle: "The Fibonacci oracle speaks: fib(1)=1, fib(2)=1, and every number after is the sum of the two before it. The sequence whispers: 1, 1, 2, 3, 5... You ask for fib(6). What does the oracle reveal?",
//     hint: "Build the sequence step by step: 1, 1, 2, 3, 5, 8... count to the 6th position.",
//     answer: "8"
//   },
// //   {
// //     id: 43,
// //     topic: "Lists – Slicing",
// //     difficulty: "Hard",
// //     riddle: "A list [0,1,2,3,4,5,6,7,8,9] stands in a row. You write list[::-1] — no start, no stop, but step -1. The list turns around and walks back toward you. What do you see coming?",
// //     hint: "No start, no stop, step -1 = reverse the ENTIRE list. Every element reverses position.",
// //     answer: "[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]"
// //   },
//   {
//     id: 44,
//     topic: "Exception Handling – Raise",
//     difficulty: "Hard",
//     riddle: "A protective function discovers age = -5. It refuses to accept this insult and decides to THROW an error itself — not wait for one to happen. Which Python keyword fires this self-launched exception?",
//     hint: "You don't just catch exceptions — you can throw them yourself too. Python's keyword is different from Java's.",
//     answer: "raise"
//   },
//   {
//     id: 45,
//     topic: "Loops – while + break",
//     difficulty: "Hard",
//     riddle: "A while True loop plays a guessing game: guess 42 and it shouts 'Correct!' then breaks free. A stubborn player types 10, then 7, then finally 42. How many times did the loop body run?",
//     hint: "Count each attempt including the successful one — every loop body execution counts.",
//     answer: "3"
//   },
//   {
//     id: 46,
//     topic: "Recursion vs Loop",
//     difficulty: "Hard",
//     riddle: "A recursive function sums a list. Base case: empty list returns 0. Recursive case: first element + sum(rest). For the list [1,2,3,4,5], how many total function calls are made before the answer surfaces?",
//     hint: "One call per element, plus one final call that hits the base case — count all of them.",
//     answer: "6"
//   },
// //   {
// //     id: 47,
// //     topic: "Data Types – Type Conversion",
// //     difficulty: "Hard",
// //     riddle: "A user types their age. input() catches it and hands it over. You try to add 1 — Python CRASHES with a TypeError. The user swears they typed a number. What is the ONE line fix?",
// //     hint: "input() always returns a string, even if they typed a number. You must convert it explicitly.",
// //     answer: "int(input())"
// //   },
//   {
//     id: 48,
//     topic: "Loops + Exception Handling",
//     difficulty: "Hard",
//     riddle: "A loop runs 5 times. On iteration 3, a ZeroDivisionError explodes inside the try block. The except block catches it and prints 'Error'. Does the loop continue to iteration 4, or does it collapse entirely?",
//     hint: "Catching an exception means the crash is handled — not that everything stops.",
//     answer: "Loop continues"
//   },
//   {
//     id: 49,
//     topic: "Recursion – Stack Overflow",
//     difficulty: "Hard",
//     riddle: "A reckless function calls itself — no base case, no exit, no mercy. It dives forever into the abyss. Python watches patiently for a while, then puts its foot down. What does Python ultimately do?",
//     hint: "Every function call takes up memory on the call stack. Memory is not infinite — Python has a safety limit.",
//     answer: "RecursionError"
//   },
//   {
//     id: 50,
//     topic: "Mixed Concepts",
//     difficulty: "Hard",
//     riddle: "A power function recurses: power(base, 0) = 1; power(base, exp) = base × power(base, exp-1). You summon power(2, 4). What is the final return value, and how many total function calls were made?",
//     hint: "2^4 = 16. Count calls: power(2,4) → power(2,3) → power(2,2) → power(2,1) → power(2,0). Don't miss the base case.",
//     answer: "16, 5 calls"
//   }
];