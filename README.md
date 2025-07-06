# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### Screenshot
![Mortgage Repayment Calculator Screenshot](preview.png)

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [Mortgage-calc](https://github.com/aditya-6655kh/Mortgage-calc/)
- Live Site URL: [Live Mortgage-calc-site](https://aditya-6655kh.github.io/Mortgage-calc/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox for layout
- Mobile-first responsive design
- Vanilla JavaScript for calculations and form validation
- Custom styled radio buttons with checkbox appearance
- Smooth transitions and hover effects

### What I learned

This project helped me reinforce several key concepts:

**Form Validation**: Implemented comprehensive client-side validation with visual feedback
```js
function showError() {
    const amount = document.querySelector("#mortgage-amt").value.trim();
    if(!amount) {
        const wrapper = document.querySelector("#mortgage-amt").parentElement;
        wrapper.classList.add('error');
        createErrorMessage(wrapper, "This field is required");
    }
}
```

**Mortgage Calculations**: Learned to implement both repayment and interest-only mortgage calculations
```js
const monthlyRate = interestRate/12;
monthlyPayment = amount * 
                (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                (Math.pow(1 + monthlyRate, term) - 1);
```

**Custom Radio Button Styling**: Created checkbox-style radio buttons with custom CSS
```css
.mortgage-type input[type="radio"]:checked + label::before {
    background-color: rgb(212, 213, 0);
    border-color: rgb(212, 213, 0);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23212b32'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
}
```

**Responsive Design**: Implemented mobile-first approach with smooth transitions
```css
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    .row {
        flex-direction: column;
        gap: 15px;
    }
}
```

### Continued development

Areas I want to continue focusing on in future projects:

- **Advanced Form Validation**: Implementing real-time validation as users type
- **Accessibility**: Adding ARIA labels and improving keyboard navigation
- **Performance**: Optimizing calculations for larger datasets
- **Error Handling**: Adding more sophisticated error messages and recovery options
- **Animation**: Adding more subtle animations to enhance user experience

### Useful resources

- [MDN Web Docs - Math.pow()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) - Essential for mortgage calculation formulas
- [CSS-Tricks - Custom Radio Buttons](https://css-tricks.com/custom-styling-form-inputs-with-modern-css-features/) - Helped with styling the mortgage type selection
- [MDN - Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) - Used extensively for responsive layout
- [JavaScript Number Formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) - For proper currency display
