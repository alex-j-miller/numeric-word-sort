
# Numeric Word Sort Frontend

This is the frontend for the Numeric Word Sort application. It allows users to enter a comma-separated list of numbers, submit them, and view the numbers as words sorted alphabetically. Numbers greater than 9000 are given a special visual cue.

## Features
- Enter a comma-separated list of whole numbers (including negatives)
- Input validation with helpful error messages and examples
- Results displayed as words, sorted alphabetically
- Numbers greater than 9000 are shown with a special image and hover text
- Clean, modern UI using Material UI and custom styles
- Comprehensive tests for all major scenarios

## Usage

### Prerequisites
- Node.js and npm installed
- Backend server running (see backend/README.md)

### Running the Frontend
1. Install dependencies:
	```sh
	npm install
	```
2. Start the app:
	```sh
	npm start
	```
	The app will run on [http://localhost:3000](http://localhost:3000)

### Running Tests
Run frontend tests with:
```sh
npm test
```

## How It Works
1. Enter a comma-separated list of whole numbers (e.g., `1,2,3,11,8999,16`)
2. Click the **Sort Text** button
3. The app displays the numbers as words, sorted alphabetically
4. If any number is greater than 9000, a special image is shown with the word as hover text
5. Invalid input is handled gracefully, with an example and explanation

## Example
Input:
```
1,2,3,11,8999,16
```
Output:
```
Eight Thousand Nine Hundred Ninety Nine
Eleven
One
Sixteen
Three
Two
```

## Project Structure
- `src/components/NumberInputCard.jsx` — Main input and result display component
- `src/api/numbers.js` — Handles API requests to the backend
- `src/tests/` — Frontend tests

## Notes
- Only whole numbers and commas are valid input
- Negative numbers are supported and prefixed with "Negative"
- No external libraries are used for number-to-word conversion (handled by backend)
