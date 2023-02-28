import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/**
 * Copyright footer
 * @returns HTML
 */
export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{mt : 5}}>
      {'Copyright © '}
      <Link color="inherit" href="">
        ChessVariants
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}