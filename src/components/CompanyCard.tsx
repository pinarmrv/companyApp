import React, { Props, useState } from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        minWidth: 275,
        margin: 10,
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface CardProp {
    name: string;
    onChange(arg: string, arg2: string): void;
}


export default function CompanyCard(props : CardProp) {
  const classes = useStyles();
  const [background, setBackground] = useState("white");

  function handlePositive(){
        setBackground("green");
        props.onChange(props.name, "positive");

  }

  function handleNegative(){
        setBackground("red");
        props.onChange(props.name, "negative");
    
  }

  function handleClear(){
      setBackground("white");
      props.onChange(props.name, "neutral");

  }

  return (
    <Card className={classes.root} style={{backgroundColor: background}}>
      <CardContent>        
        <Typography variant="h5" component="h2">
         {props.name}
        </Typography>
      </CardContent>
      <CardActions>
            <div className={classes.button}>
                 <IconButton aria-label="check" color="primary" onClick={handlePositive}>
                     <CheckIcon />
                </IconButton>
                <IconButton aria-label="cross"  color="primary" onClick={handleNegative}>
                     <CloseIcon />
                 </IconButton>
                 <Button onClick={handleClear}> CLEAR </Button>
             </div>
      </CardActions>
    </Card>
  );
}
