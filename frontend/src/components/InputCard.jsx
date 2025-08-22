import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

export default function InputCard(props) {
  return (
    <Card variant="outlined" size="lg">
      <CardContent>
        <Typography textColor="inherit">
          Enter a list of numbers, separated by commas.
        </Typography>
        <Typography textColor="inherit">
          (E.g. 1,2,3,11,8999,16)
        </Typography>
        <Textarea name="Solid" placeholder="Type in here…" variant="solid" />
      </CardContent>
    </Card>
  )
}