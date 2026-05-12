# 🧮 Bisection Method Solver – React.js Project

## 🎯 Project Overview
This project is a modern React.js web application that solves nonlinear equations using the **Bisection Method** from Numerical Analysis.  
It provides an interactive scientific calculator-style UI with step-by-step iterations and professional visualization.

---

## ✨ Features

### 1. 👋 Welcome Section
- Display a clean welcome message:
  > Welcome to the Bisection Method Solver
- Add project credit:
  > This project is built by Omar Abu Alsubeh and Amir Abu Alhan

---

### 2. 🧮 Input Panel (Scientific Calculator Style)
A modern right-side panel that includes:

- Function input field `f(x)`
- Interval inputs:
  - `a` (start)
  - `b` (end)
- Epsilon (tolerance) input
- Solve button

---

### 3. ⚡ Function Helper Toolbar (IMPORTANT)
Add a scientific toolbar above the input field with clickable buttons:

#### Supported Functions:
- sin(x)
- cos(x)
- tan(x)
- log(x)
- ln(x)
- sqrt(x)
- x²
- x³
- e^x
- π

#### Behavior:
- Clicking a button inserts the function into the input field
- Example: clicking `sin(x)` → inserts `sin(x)`
- Users can combine expressions freely

---

### 4. 🧠 Smart Input Handling
- Support expressions like:
  - `x^2 - 2`
  - `sin(x) - x/2`
  - `cos(x)`
- If user enters only a value like:
  - `sqrt(2)` or `2`
  - Automatically convert to a valid equation:
    → `f(x) = x^2 - 2`

---

### 5. 🔁 Bisection Method Logic
Implement full algorithm:

- Compute midpoint:
  \[
  c = \frac{a + b}{2}
  \]

- Iterate until:
  - `|f(c)| < epsilon`
  - OR max 20 iterations (default if epsilon not provided)

---

### 6. 📊 Iterations Output Table
Display results in a modern animated table:

Columns:
- Iteration
- a
- b
- Midpoint (c)
- f(c)
- Error

UI Requirements:
- Dark theme
- Blue neon highlights
- Smooth row animations

---

### 7. 🎨 UI Design
- Dark mode theme (black + deep blue)
- Neon blue accents
- Glassmorphism or modern soft UI
- Responsive design (mobile + desktop)
- Smooth transitions and hover effects

---

### 8. ⚠️ Validation Rules
- If `f(a) * f(b) > 0`:
  - Show error message:
    > “Invalid interval: No root detected in this range.”
- If epsilon is missing:
  - Use default max 20 iterations

---

### 9. 📘 Example Inputs Section
Show examples inside UI:

- x^2 - 2
- x^3 - x - 1
- sin(x) - x
- cos(x)

---

### 10. 🧑💻 Technical Requirements
- React.js (functional components)
- useState, useEffect hooks
- Use mathjs library for parsing expressions
- No backend required
- Fully frontend application

---

## 🏁 Final Goal
The application should feel like a **professional scientific engineering tool**, similar to MATLAB or Wolfram Alpha, with a smooth and intuitive user experience.
