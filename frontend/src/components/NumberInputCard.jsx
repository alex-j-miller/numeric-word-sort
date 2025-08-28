import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { submitNumbers } from '../api/numbers';

export default function NumberInputCard(props) {
  const [textValue, setTextValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  function validateNumbers(numbers) {
    if (numbers.some(n => !Number.isInteger(n))) {
      return { isValid: false, error: 'All numbers must be integers.' };
    }
    if (numbers.some(n => n > 9000 || n < -9000)) {
      return { isValid: false, error: 'All numbers must be between -9000 and 9000.' };
    }
    return { isValid: true, error: '' };
  }

  function parseNumbers(value) {
    return value
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(Number)
      .filter(n => !isNaN(n));
  }

  function isSubmissionBlocked(isValid, numbers, validation) {
    return (!isValid || numbers.length === 0 || !validation.isValid)
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setTextValue(value);

    // Check for invalid characters (Digits, Spaces, Negative Signs, and Commas)
    if (!/^[\d\s,\-]*$/.test(value)) {
      setError('Only numbers, spaces, commas, and negative signs are allowed.');
      setIsValid(false);

      // Call parent's onChange if provided
      if (props.onChange) {
        props.onChange(value);
      }

      return;
    }

    // Parse and validate on every change
    const numbers = parseNumbers(value);
    const validation = validateNumbers(numbers);
    setError(validation.error);
    setIsValid(validation.isValid);

    // Call parent's onChange if provided
    if (props.onChange) {
      props.onChange(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Parse the text value into an array of numbers
    const numbers = parseNumbers(textValue);
    const validation = validateNumbers(numbers);
    if (isSubmissionBlocked(isValid, numbers, validation)) {
      setError(validation.error);
      setIsValid(false);
      return;
    }

    const data = await submitNumbers(numbers);
    setResult(data);
    if (props.onSubmit) {
      props.onSubmit(data);
    }
  };

  function isSubmitDisabled() {
    return !isValid || textValue.trim() === '';
  }

  function renderError() {
    return (
      <div style={{ minHeight: 28, width: '100%', maxWidth: 360, overflowWrap: 'break-word', margin: '0 auto' }}>
        {error && (
          <Typography color="danger" sx={{ mt: 2, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{error}</Typography>
        )}
      </div>
    );
  }
  
  function sortByAlpha(arr) {
    return [...arr].sort((a, b) => a.alpha.localeCompare(b.alpha));
  }

  function renderResults() {
    if (result && result.result && Array.isArray(result.result)) {
      const sorted = sortByAlpha(result.result);
      return (
        <Card variant="soft" size="lg" sx={{ mt: 4, minWidth: 350, maxWidth: 500 }}>
          <CardContent>
            <Typography level="h4" sx={{ mb: 2 }}>
              Results
            </Typography>
            {sorted.map((item, idx) => (
              <Typography key={idx} sx={{ mb: 1 }}>
                <b>{item.number}:</b> {item.alpha}
              </Typography>
            ))}
          </CardContent>
        </Card>
      );
    }
    return null;
  }

  function renderBackendError() {
    if (result && result.error) {
      return (
        <Typography color="danger" sx={{ mt: 2 }}>{result.error}</Typography>
      );
    }
    return null;
  }

  return (
    <>
      <Card variant="outlined" size="lg" sx={{ width: 400, maxWidth: '100%' }}>
        <CardContent>
          <Typography textColor="inherit">
            Enter a list of numbers, separated by commas.
          </Typography>
          <Typography textColor="inherit">
            (E.g. 1,2,3,11,8999,16)
          </Typography>
          <form onSubmit={handleSubmit}>
            <Textarea
              name="Solid"
              placeholder="Type in here…"
              variant="solid"
              value={textValue}
              onChange={handleChange}
            />
            <Button type="submit" sx={{ mt: 2 }} disabled={isSubmitDisabled()}>
              Submit
            </Button>
          </form>
          {renderError()}
        </CardContent>
      </Card>
      {renderResults()}
      {renderBackendError()}
    </>
  )
}
