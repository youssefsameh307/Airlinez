import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './AlertDialog';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

class Searchflight extends Component{
  
  constructor(props){
    super(props);
    this.state = {rows:[],state:[]};
  }
  
  submit= async (e) => {
    e.preventDefault();
    const flight = {
      "flightNumber": e.target.fnum.value,
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      // "date": e.target.date.value,
      "from": e.target.fromf.value,
      "to": e.target.to.value,
    }
     
    
    await axios.get('http://localhost:8000/searchFlights', {query:flight}).then((data) => {
      console.log("search successful!");
      console.log(data)

      e.target.fnum.value='';
      e.target.deptime.value='';
      e.target.arrtime.value='';
      e.target.fromf.value='';
      e.target.to.value='';

    }).catch(err => console.log(err));


  }  
  render(){
      return(
        <div>

          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>Search for a Flight</h1>  

        <form onSubmit={this.submit} id="form">
          <TextField
          required
          id="fnum"
          label="Flight Number"
          name="fnum"
          />
          <TextField
          id="deptime"
          label="Departure Time"
          name="deptime"
          type="datetime-local"
          
          />
          <TextField
          id="arrtime"
          label="Arrival Time"
          name="arrtime"
          type="datetime-local"
     
          />
          <TextField
          id="fromf"
          label="From Terminal"
          name="fromf"
          />
          <TextField
          id="to"
          label="To Terminal"
          name="to"
          />
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Flight number</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>ArrivalTime</StyledTableCell>
                  <StyledTableCell>DepartureTime</StyledTableCell>
                  <StyledTableCell>Departure</StyledTableCell>
                  <StyledTableCell>Destination</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.flightNumber}
                    </StyledTableCell>
                    <StyledTableCell>
                      <AlertDialog id={row._id} state={(d) => this.state.rows}/>
                    </StyledTableCell>  
                    <StyledTableCell>
                      {/* <IconButton aria-label="delete" onClick={handleDeleteClick} id={row._id}>
                        <DeleteIcon />
                      </IconButton> */}
                      <Link to={"/updateflight/" + row._id}>
                        <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>{row.arrivalTime}</StyledTableCell>
                    <StyledTableCell>{row.departureTime}</StyledTableCell>
                    <StyledTableCell>{row.from}</StyledTableCell>
                    <StyledTableCell>{row.to}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        </div>

      );
    }
  


}

export default Searchflight ;