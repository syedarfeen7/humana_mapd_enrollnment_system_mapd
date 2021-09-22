import '../../Styles/GenearlizeStyle/style.css';
import { FormControl, FormLabel, FormControlLabel, TextField, RadioGroup, Radio, Dialog, Typography, Grid, InputLabel, MenuItem, FormHelperText, Select } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { ContactInformation } from '../../Store/Actions/applicantAction';
import { contactInfromationScheema, contactInformationMailingAddressScheema } from '../../Helpers/Validator/validator';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ContactInformationForm() {
    const applicantInformtion = useSelector(state => state.applicant_information_details)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [errorHnadling, setErrorHnandling] = useState('')
    const [streetOne, setStreetOne] = useState('');
    const [countryStateZipCode, setCountryStateZipCode] = useState('');
    const [cityOne, setCityOne] = useState('');
    const [Checkbox, setCheckBox] = useState(false)
    const [checkBoxTwo, setCheckBoxTwo] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('')
    const [humanaMemberIDNumber, setHumanaMemberIDNumber] = useState('')
    const [languagePreference, setLanguagePreference] = useState('');
    const [streetTwo, setStreetTwo] = useState('');
    const [state, setState] = useState('');
    const [cityTwo, setCityTwo] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [relationshipToEnrolle, setRelationshipToEnrollee] = useState('');
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');
    const [accessibileFormat, setAccessibileFormat] = useState('')
    const [open, setOpen] = useState(false);
    const [openHMID, setOpenHMID] = useState(false)
    const [openAF, setOpenAF] = useState(false)
    const history = useHistory();
    const location = useLocation()
    const editableContactInformation = location.state

    useEffect(() => {
        if (editableContactInformation && editableContactInformation) {
            updateContactInformation()
        }
    }, [])

    // FUNCTION TO SET THE VALUES FOR UPDATE PURPOSE
    const updateContactInformation = () => {
        setStreetOne(editableContactInformation.ci.streetOne)
        setCountryStateZipCode(editableContactInformation.ci.countryStateZipCode)
        setCityOne(editableContactInformation.ci.cityOne)
        setCheckBox(editableContactInformation.ci.Checkbox)
        setCheckBoxTwo(editableContactInformation.ci.checkBoxTwo)
        setStreetTwo(editableContactInformation.ci.streetTwo)
        setPhoneNumber(editableContactInformation.ci.phoneNumber)
        setEmailAddress(editableContactInformation.ci.emailAddress)
        setHumanaMemberIDNumber(editableContactInformation.ci.humanaMemberIDNumber)
        setLanguagePreference(editableContactInformation.ci.languagePreference)
        setState(editableContactInformation.ci.state)
        setCityTwo(editableContactInformation.ci.cityTwo)
        setFirstName(editableContactInformation.ci.firstName)
        setLastName(editableContactInformation.ci.lastName)
        setZipCode(editableContactInformation.ci.zipCode)
        setRelationshipToEnrollee(editableContactInformation.ci.relationshipToEnrolle)
        setEmergencyPhoneNumber(editableContactInformation.ci.emergencyPhoneNumber)
        setAccessibileFormat(editableContactInformation.ci.accessibileFormat)
    }
    //  TO OPEN INFO POPUP 
    const handleClickOpen = (a) => {
        if (a === "openLP") {
            setOpen(true);
        }
        else if (a === "openHMID") {
            setOpenHMID(true)
        }
        else if(a === "openAF"){
            setOpenAF(true)
        }
    };
    // TO CLOSE INFO POPUP
    const handleClose = (b) => {
        if (b === "closeLP") {
            setOpen(false);
        }
        else if (b === "closeHMID") {
            setOpenHMID(false)
        }
        else if(b === "closeAF"){
            setOpenAF(false)
        }
    };
    // MATRIAL UI THEME STYLING
    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });


    // INFO POPUP CONTENT
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);
    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    // FUNCTION TO SAVE THE CONTACT INFPORMATION AND DISPATCH IT TO STORE
    const saveContactDetails = async (e) => {
        console.log(Checkbox)
        e.preventDefault();
        let data = { streetOne, countryStateZipCode, cityOne, Checkbox, checkBoxTwo, phoneNumber, emailAddress, humanaMemberIDNumber, languagePreference, streetTwo, state, cityTwo, zipCode, firstName, lastName, relationshipToEnrolle, emergencyPhoneNumber, accessibileFormat }

        // HERE WE ARE VALIDATING THE CONTACT INFORMATION
        await contactInfromationScheema.strict().validate(data).then(res => {
            console.log("Response====>", res)
            // AFTER SUCCESS WE DSIPATCHED IT TO STORE
            dispatch(ContactInformation(res))
            if (Checkbox) {

                if (streetOne && cityOne && Checkbox && streetTwo && cityTwo && state && zipCode) {
                    history.push('/medicare-information')
                }
            }
            else {
                history.push('/medicare-information')
            }
        }).catch((err) => {
            console.log({ err })
            console.log("Error====>", err.message)

            // TO ADD THE ERROR MESSAGES BELOW FIELDS
            document.querySelectorAll(".error-msg").forEach((i) => { i.innerHTML = "" })
            if (document.querySelector(`#${err.path}`))
                document.querySelector(`#${err.path}`).innerHTML = err.message
            setErrorHnandling(err.message)
        })
        if (Checkbox) {
            await contactInformationMailingAddressScheema.strict().validate(data).then(res => {
                console.log(res)
            })
                .catch(err => {
                    document.querySelectorAll(".error-msg").forEach((i) => { i.innerHTML = "" })
                    if (document.querySelector(`#${err.path}`))
                        document.querySelector(`#${err.path}`).innerHTML = err.message


                })
        }
    }
    return <>
        <div className="light-gray-bg-color">
            <Grid container>
                <Grid item xs={12}>
                    <div className="applicant-information">
                        <h1 className="main-section-font-color applicant-text-h1">Contact Information</h1>
                        <p className="font-gray required-text">* Required field</p>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.root}>
                <div className="form-wrapper">
                    <form noValidate autoComplete="off" onSubmit={saveContactDetails}>
                        <Grid container className="white-bg-color form-grid">
                            <Grid item xs={12}>
                                <div className="guidelines-text-wrapper">
                                    <h3 className="guidelines-text-h3 main-section-font-color">Physical address (PO Box is not allowed)</h3>
                                </div>
                            </Grid>

                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Street *</FormLabel>

                                    <TextField value={streetOne} className="custom-text-box" placeholder="Enter your street" variant="outlined" onChange={(e) => { setStreetOne(e.target.value) }} />
                                    <div id="streetOne" className="red-text error-msg"></div>
                                </FormControl>
                            </Grid>

                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Country/State/Zip Code </FormLabel>

                                    <TextField value={countryStateZipCode} className="custom-text-box" placeholder="Country, State, Zip Code" variant="outlined" onChange={(e) => { setCountryStateZipCode(e.target.value) }} />

                                </FormControl>
                            </Grid>


                            <Grid lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">City *</FormLabel>

                                    <TextField value={cityOne} className="custom-text-box" placeholder="Enter your city" variant="outlined" onChange={(e) => { setCityOne(e.target.value) }} />
                                    <div id="cityOne" className="red-text error-msg"></div>
                                </FormControl>
                            </Grid>
                            <Grid lg={6} sm={6} xs={12} item className="hide-grid-city"></Grid>
                            <Grid xs={12} item>
                                <div className="checkBox-wrapper">

                                    <input type="checkbox" checked={checkBoxTwo} className="custom-checkbox" onChange={(e) => { setCheckBoxTwo(e.target.checked) }} />
                                    <label>Do you know? You can reduce the amount of mail you get by choosing to receive the communications listed in the enrollment book by email. To choose this option please check this box. you can change your selection at any time.</label>

                                </div>
                            </Grid>
                            <Grid xs={12} item>
                                <div className="checkBox-wrapper">

                                    <input checked={Checkbox} type="checkbox" className="custom-checkbox" onChange={(e) => { setCheckBox(e.target.checked) }} />
                                    <label>I would like to provide a different mailing address</label>

                                </div>
                            </Grid>
                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Home phone number</FormLabel>
                                    <TextField value={phoneNumber} className="custom-text-box" placeholder="Enter your home phone number" variant="outlined" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                </FormControl>
                            </Grid>

                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Email address</FormLabel>
                                    <TextField value={emailAddress} className="custom-text-box" placeholder="Enter email address" variant="outlined" onChange={(e) => { setEmailAddress(e.target.value) }} />
                                    <div id="emailAddress" className="red-text error-msg"></div>

                                </FormControl>
                            </Grid>
                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Humana member id number
                                        <img src="images/Vector.png" className="alert-vector" onClick={() => { handleClickOpen("openHMID") }} />
                                    </FormLabel>
                                    <TextField value={humanaMemberIDNumber} className="custom-text-box" placeholder="Enter your humana member id number" variant="outlined" onChange={(e) => { setHumanaMemberIDNumber(e.target.value) }} />
                                    <div id="emailAddress" className="red-text error-msg"></div>

                                </FormControl>
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <FormControl component="fieldset" className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Language preference
                                        <img src="images/Vector.png" className="alert-vector" onClick={() => { handleClickOpen("openLP") }} />
                                    </FormLabel>
                                    <RadioGroup value={languagePreference} row aria-label="position" name="position" defaultValue="top" onChange={(e) => { setLanguagePreference(e.target.value) }}>
                                        <FormControlLabel value="English" control={<Radio color="primary" />} label="English" />
                                        <FormControlLabel value="Spanish" control={<Radio color="primary" />} label="Spanish" />
                                        <FormControlLabel value="Chinese" control={<Radio color="primary" />} label="Chinese" />
                                        <FormControlLabel value="Other" control={<Radio color="primary" />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                    
                                    <FormLabel className="main-section-font-color accessibileFormatLabel">Accessibile format
                                    <img src="images/Vector.png" className="alert-vector" onClick={() => { handleClickOpen("openAF") }} />
                                    
                                    </FormLabel>
                                <FormControl className="Accessibile-dropDown">
                                    {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={accessibileFormat} 
                                        onChange={(e) => {setAccessibileFormat(e.target.value)}}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid lg={6} sm={6} xs={12} item className="hide-grid-city"></Grid>
                            {Checkbox ?

                                <>
                                    <Grid item xs={12}>
                                        <div>
                                            <h3 className="main-section-font-color mailingAddress">Mailing address</h3>
                                        </div>
                                    </Grid>

                                    <Grid item lg={6} sm={6} xs={12} >
                                        <FormControl className="field-wrapper">
                                            <FormLabel className="main-section-font-color label">Street *</FormLabel>
                                            <TextField value={streetTwo} className="custom-text-box" placeholder="Enter your street" variant="outlined" onChange={(e) => { setStreetTwo(e.target.value) }} />
                                            <div id="streetTwo" className="red-text error-msg"></div>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={6} sm={6} xs={12} >
                                        <FormControl className="field-wrapper">
                                            <FormLabel className="main-section-font-color label">State *</FormLabel>
                                            <TextField value={state} className="custom-text-box" placeholder="Enter your state" variant="outlined" onChange={(e) => { setState(e.target.value) }} />
                                            <div id="state" className="red-text error-msg"></div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} sm={6} xs={12} >
                                        <FormControl className="field-wrapper">
                                            <FormLabel className="main-section-font-color label">City *</FormLabel>
                                            <TextField value={cityTwo} className="custom-text-box" placeholder="Enter your city" variant="outlined" onChange={(e) => { setCityTwo(e.target.value) }} />
                                            <div id="cityTwo" className="red-text error-msg"></div>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={6} sm={6} xs={12} >
                                        <FormControl className="field-wrapper">
                                            <FormLabel className="main-section-font-color label">Zip Code *</FormLabel>
                                            <TextField value={zipCode} className="custom-text-box" placeholder="Enter your zip code" variant="outlined" onChange={(e) => { setZipCode(e.target.value) }} />
                                            <div id="zipCode" className="red-text error-msg"></div>
                                        </FormControl>
                                    </Grid>

                                </>
                                :

                                <></>}

                            {/* <Grid container className="white-bg-color form-grid"> */}
                            <Grid item xs={12}>
                                <div className="guidelines-text-wrapper">
                                    <h3 className="guidelines-text-h3 main-section-font-color">Emergency Contact (Optional)</h3>
                                </div>
                            </Grid>

                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">First name</FormLabel>

                                    <TextField value={firstName} className="custom-text-box" placeholder="Enter your first name" variant="outlined" onChange={(e) => { setFirstName(e.target.value) }} />
                                </FormControl>
                            </Grid>

                            <Grid item lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Last name </FormLabel>

                                    <TextField value={lastName} className="custom-text-box" placeholder="Enter your last name" variant="outlined" onChange={(e) => { setLastName(e.target.value) }} />

                                </FormControl>
                            </Grid>


                            <Grid lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Relationship to enrollee</FormLabel>

                                    <TextField value={relationshipToEnrolle} className="custom-text-box" placeholder="Enter your relationship to enrollee" variant="outlined" onChange={(e) => { setRelationshipToEnrollee(e.target.value) }} />

                                </FormControl>
                            </Grid>
                            <Grid lg={6} sm={6} xs={12} item>
                                <FormControl className="field-wrapper">
                                    <FormLabel className="main-section-font-color label">Phone number</FormLabel>

                                    <TextField value={emergencyPhoneNumber} className="custom-text-box" placeholder="Enter your phone number" variant="outlined" onChange={(e) => { setEmergencyPhoneNumber(e.target.value) }} />

                                </FormControl>
                            </Grid>
                            <Grid lg={6} sm={6} xs={12} item className="hide-grid-city"></Grid>
                            {/* </Grid> */}


                        </Grid>
                    </form>
                    <div className="btn-container">
                        <div>
                            <Link to={{ pathname: '/applicant-information', state: { ap: applicantInformtion } }}>
                                <button type="button" className="back-btn"><h2>Back</h2></button>
                            </Link>
                        </div>
                        <div className="next-btn-wrapper">
                            <button type="submit" className="next-btn" onClick={saveContactDetails}><h2 className="next-btn-h2">Next</h2></button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>

            {/* LANGUAGE PREFERENCE DIALOG CONTENT  */}
            <Dialog onClose={() => { handleClose("closeLP") }} className="pop-up-dialog" aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={() => { handleClose("closeLP") }}>
                    <h3 className="main-section-font-color info-pop-up">You clicked on info button for language preference</h3>
                </DialogTitle>
                <DialogContent >
                    <Typography className="main-section-font-color info-popup-para">
                        Please call a licensed Humana sales agent at 1-800-833-2367 (TTY: 711) if you need information in another format or language.
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
        <div>

            {/* LANGUAGE PREFERENCE DIALOG CONTENT  */}
            <Dialog onClose={() => { handleClose("closeHMID") }} className="pop-up-dialog" aria-labelledby="customized-dialog-title" open={openHMID}>
                <DialogTitle id="customized-dialog-title" onClose={() => { handleClose("closeHMID") }}>
                    <h3 className="main-section-font-color info-pop-up">You clicked on info button for Humana Member ID Number</h3>
                </DialogTitle>
                <DialogContent >
                    <Typography className="main-section-font-color info-popup-para">
                        Current or Past Humana Members can enter their Member ID number beginning with an H.
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
        <div>

            <Dialog onClose={() => {handleClose("closeAF")}} className="pop-up-dialog" aria-labelledby="customized-dialog-title" open={openAF}>
                <DialogTitle id="customized-dialog-title" onClose={() => {handleClose("closeAF")}}>
                    <h3 className="main-section-font-color info-pop-up">You clicked on info button for Accessibile Format</h3>
                </DialogTitle>
                <DialogContent >
                    <Typography className="main-section-font-color info-popup-para">
                    Please call a licensed Humana sales agent at 1-800-833-2367 (TTY: 711) if you need information in another format or language.
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    </>
}