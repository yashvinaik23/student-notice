import { useEffect,useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  DialogActions,
  TableHead,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField,
} from "@material-ui/core";

import { GetContact } from "../../../actions/actions";

const useStyles = makeStyles(() => ({
  body: {
    padding: "60px 60px",
    margin: "125px 350px",
  },
  inputBox: {
    width: "300px",
    margin: "-12px",
  },
  submitButton: {
    width: "300px",
    margin: "0px 15px",
    backgroundColor: "#034f84",
    color: "white",
  },
  LinkColor: {
    textDecoration: "none",
    color: "white",
  },
  tableBody: {
    margin: "130px 300px",
  },
  heading: {
    marginBottom: "60px ",
    align: "center",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common,
  fontSize: 14,
  align: "left",
  padding: 20,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AvailableContacts = props => {
  const classes = useStyles();
  //const [contact, setContact] = useState([]);

  const getContact = async () => {
    await props?.GetContact();
  };
  useEffect(() => {
    getContact();
  }, []);

  const [open, setOpen] = useState({ dialog: false, id: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // const contactList = props?.contact.map(meal => (
  //   <ContactItem
  //     key={meal._id}
  //     id={meal._id}
  //     name={meal.name}
  //     description={meal.description}
  //     contact={meal.number}
  //   />
  // ));

  return (
    <div>
      <div className={classes.tableBody}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <div className={classes.heading}>
              <Typography variant="h4" component="h2">
                My Jobs
              </Typography>
            </div>
          </Grid>
          <Grid item></Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sr. No </StyledTableCell>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell>Logo</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Skills</StyledTableCell>
                <StyledTableCell>Salary</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Job Types</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.job?.data?.getJob?.length &&
                props?.job?.data?.getJob?.map((job, id) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {id + 1}
                    </StyledTableCell>
                    <StyledTableCell>{job.companyname}</StyledTableCell>
                    <StyledTableCell>{job.Image}</StyledTableCell>
                    <StyledTableCell>{job.title}</StyledTableCell>
                    <StyledTableCell>{job.skill}</StyledTableCell>
                    <StyledTableCell>{job.salary}</StyledTableCell>
                    <StyledTableCell>{job.position}</StyledTableCell>
                    <StyledTableCell>{job.jobType}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        component={Link}
                        to={`/editjob/${job._id}`}
                        variant="outlined"
                        // onClick={() => {navigate(`/editjob/${job._id}`)}}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        onClick={() => deleteHandler(job._id)}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open.dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm the action"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You Want to Delete Data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={() => aggreDelete(open.id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    contact: state.user.contact,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetContact: () => GetContact(),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableContacts);
