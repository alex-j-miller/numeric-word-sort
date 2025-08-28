import './App.css';
import '@fontsource/inter';
import NumberInputCard from './components/NumberInputCard';
import Typography from '@mui/joy/Typography';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography level="h1" sx={{ mb: 4 }}>
          Numbers to Words Converter
        </Typography>
        <NumberInputCard />
      </header>
    </div>
  );
}

export default App;
