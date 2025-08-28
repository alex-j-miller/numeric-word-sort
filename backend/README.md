# Numeric Word Sort Backend

This is the backend API for the Numeric Word Sort application. It provides an endpoint to convert a list of numbers to their word representations and returns them sorted alphabetically by their spelling.

## Features
- Accepts a comma-separated list of whole numbers (including negatives)
- Converts numbers to English words (custom implementation, no libraries)
- Sorts the results alphabetically by their word representation
- Returns results as JSON
- Handles invalid input gracefully
- Returns a visual cue for numbers greater than 9000 (handled by frontend)

## API

### POST `/numbers`
**Request Body:**
```
{
  "numbers": "1,2,3,11,8999,16"
}
```

**Response:**
```
{
  "result": [
    "Eight Thousand Nine Hundred Ninety Nine",
    "Eleven",
    "One",
    "Sixteen",
    "Three",
    "Two"
  ]
}
```

## Running the Backend

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3001` by default.

## Testing

Run backend tests with:
```sh
npm test
```

## Notes
- Only whole numbers and commas are valid input.
- Negative numbers are prefixed with "Negative" in the output.
- No external libraries are used for number-to-word conversion.
