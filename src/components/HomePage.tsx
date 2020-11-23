import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import CompanyCard from './CompanyCard';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: "center",
      alignItems: "center",  
      marginTop: theme.spacing(20),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface ListProp {
  name: string,
  status: string
}

export default function HomePage() {
    const classes = useStyles();
    const [text, setText] = useState('');
    const [initialView, setInitialView] = useState(true);
    const [companyList, setCompanyList] = useState<Array<ListProp>>([]);

    function handleStart() {
      var list = text.split(/,| |\n/);      
      list.forEach(e => {
        let item: ListProp = { 
          name: e,
          status: ""
         }
        companyList.push(item);
      }
        
        );   
      console.log(companyList);
      setInitialView(false);
    }

    function changeList(key: string, newStatus: string){
      let newArr = companyList.map((item) => {
        if (item.name === key) {
          return { ...item, status: newStatus };
        } else {
          return item;
        }
      });
      setCompanyList(newArr); 
    }
  
    return (
      <div className={classes.root}>
        <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Positive Companies
          </ListSubheader>
        }>
          {companyList.map((element) => (
            (element.status === "positive") ? 
              <ListItem button key={element.name}>
              <ListItemText primary={element.name}/>
               </ListItem>        
            : ""
          ))}
        </List>
        <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Negative Companies
          </ListSubheader>
        }>
        {companyList.map((element) => (
            (element.status === "negative") ? 
              <ListItem button key={element.name}>
              <ListItemText primary={element.name}/>
               </ListItem>        
            : ""
          ))}
        </List>

        {initialView &&   
        <div>
          <TextField
            id="standard-full-width"
            label="Company-List"
            style={{ margin: 8 }}
            placeholder="Please enter company name list!!"
            multiline
            value={text}
            onChange={e => setText(e.target.value)}
            rowsMax={4}
            fullWidth
            variant="filled"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button className={classes.button} variant="contained" color="primary" onClick={handleStart}> Start </Button>
        </div>
        }
      {!initialView && 
        companyList.map((e) => (<div> <CompanyCard name={e.name} onChange={changeList} /> </div>))
      }

      </div>
    );
  }