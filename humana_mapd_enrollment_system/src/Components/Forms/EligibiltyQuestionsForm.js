import {
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    TextField,
    Dialog
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from "@material-ui/core";
import '../../Styles/GenearlizeStyle/style.css';
import '../../Styles/EligibilityQuestionsStyling/style.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { EligibilityQuestions } from '../../Store/Actions/applicantAction';
import { eligibilityQuestionsScheema, eligibilityQuestionMedicardNumberScheema } from '../../Helpers/Validator/validator';
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function EligibilityQuestionsForm() {
    const dispatch = useDispatch();
    const medicareInformation = useSelector(state => state.medicare_information_details)
    const classes = useStyles();
    const [medicareEnrollmentPeriod, setMedicareEnrollmentPeriod] = useState("");
    const [visibleOtherEnrollmentPeriod, setVisibleOtherEnrollmentPeriod] = useState(false)
    const [errorHandling, setErrorHnandling] = useState('');
    const [medicarePartBEffectiveDate, setMedicarePartBEffectiveDate] = useState(null);
    const [dateOfYouEstablishedResidencyOne, setDateOfEstablishedResidencyOne] = useState(null);
    const [endDateOfPreviousCoverageOne, setEndDateOfPreviousCovergeOne] = useState(null);
    const [dateOfYouEstablishedResidencyTwo, setDateOfYouEstablishedResidencyTwo] = useState(null);
    const [endDateOfPreviousCoverageTwo, setEndDateOfPreviousCovergeTwo] = useState(null);
    const [medicareStartDate, setMedicareStartDate] = useState(null);
    const [dateReleasedFromIncarceration, setDateReleasedFromIncarceration] = useState(null);
    const [endDateOfPreviousCoverageThree, setEndDateOfPreviousCovergeThree] = useState(null);
    const [endDateOfPreviousCoverageFour, setEndDateOfPreviousCovergeFour] = useState(null);
    const [endDateOfPreviousCoverageFive, setEndDateOfPreviousCovergeFive] = useState(null);
    const [DateOfCoverageYouAreLeaving, setDateOfCoverageYouAreLeaving] = useState(null);
    const [dateOfYouEstablishedResidencyThree, setDateOfYouEstablishedResidencyThree] = useState(null);
    const [enrolledMedicardProgram, setEnrolledMedicardProgram] = useState('');
    const [medicalHealthCoverage, setMedicalHealthCoverage] = useState('');
    const [spouseWork, setSpouseWork] = useState('');
    const [perciptionDrugCoverage, setPerciptionDrugCoverage] = useState('');
    const [coverageName, setCoverageName] = useState('')
    const [coverageID, setCoverageID] = useState('')
    const [coverageGroup, setCoverageGroup] = useState('')
    const [primaryCarePhysicianFullName, setPrimaryCArePhysicianFullName] = useState('');
    const [primaryCarePhysicianIDNumber, setPrimaryCarePhysicianIDNumber] = useState('');
    const [currentPatient, setCurrentPatient] = useState('');
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const history = useHistory();
    const location = useLocation()
    const editableEligibilityQuestions = location.state

    useEffect(() => {
        if (editableEligibilityQuestions) {
            updateEligibilityQuestions()
        }
    }, [])

    //  FUNCTION TO REMOVE THE DATE AFTER USER SELECTED ONDE DATE IN CASE OF UPDATE FUNCTIONALITY
    const dateRemover = () => {
        setMedicarePartBEffectiveDate(null)
        setDateOfEstablishedResidencyOne(null)
        setEndDateOfPreviousCovergeOne(null)
        setDateOfYouEstablishedResidencyTwo(null)
        setEndDateOfPreviousCovergeTwo(null)
        setMedicareStartDate(null)
        setDateReleasedFromIncarceration(null)
        setEndDateOfPreviousCovergeThree(null)
        setEndDateOfPreviousCovergeFour(null)
        setEndDateOfPreviousCovergeFive(null)
        setDateOfCoverageYouAreLeaving(null)
        setDateOfYouEstablishedResidencyThree(null)
    }

    // HERE WE ARE UPDTAING THE ELIGIBILITY QUESTIONS DETAILS
    const updateEligibilityQuestions = () => {
        setMedicareEnrollmentPeriod(editableEligibilityQuestions.eq.medicareEnrollmentPeriod)
        setVisibleOtherEnrollmentPeriod(editableEligibilityQuestions.eq.visibleOtherEnrollmentPeriod)
        const val = editableEligibilityQuestions.eq.medicareEnrollmentPeriod
        const paymentDefaultOptions = ["Get a monthly bill", "Social Security Benefit Check Deduction (SSA)", "Railroad Retirement Board Benefit Check Deduction (RRB)"]
        const defaultOptions = ["Annual enrollment period (October 15-December7)", "I am new to Medicare", "I сurrently рave a low income subsidy or extra help", "I am leaving employer or union coverage.", "I recently moved outside of the service area for my current plan or I recently moved and this plan is a new option for me.", "I have Medicare and Medicaid", "I am enrolling in a 5-star Medicare Plan.", "I recently had a change in my Extra Help paying for Medicare prescription drug coverage (newly got Extra Help, had a change in the level of Extra Help, or lost Extra Help).", "I do not see an option listed for me"];

        // CONDITIONS TO CHECKED THE ARDIO BOX OF ENROLLMENT PERIOD
        if (defaultOptions.find(opt => opt == val) == undefined) {

            setVisibleOtherEnrollmentPeriod("I do not see an option listed for me");
            document.querySelector(`input[value='I do not see an option listed for me'] + div`).click()

        }
        else {
            console.log(document.querySelector(`input[value='${val}'] + div`).click())
        }
        

        setMedicarePartBEffectiveDate(editableEligibilityQuestions.eq.medicarePartBEffectiveDate)
        setDateOfEstablishedResidencyOne(editableEligibilityQuestions.eq.dateOfYouEstablishedResidencyOne)
        setEndDateOfPreviousCovergeOne(editableEligibilityQuestions.eq.endDateOfPreviousCoverageOne)
        setDateOfYouEstablishedResidencyTwo(editableEligibilityQuestions.eq.dateOfYouEstablishedResidencyTwo)
        setEndDateOfPreviousCovergeTwo(editableEligibilityQuestions.eq.endDateOfPreviousCoverageTwo)
        setMedicareStartDate(editableEligibilityQuestions.eq.medicareStartDate)
        setDateReleasedFromIncarceration(editableEligibilityQuestions.eq.dateReleasedFromIncarceration)
        setEndDateOfPreviousCovergeThree(editableEligibilityQuestions.eq.endDateOfPreviousCoverageThree)
        setEndDateOfPreviousCovergeFour(editableEligibilityQuestions.eq.endDateOfPreviousCoverageFour)
        setEndDateOfPreviousCovergeFive(editableEligibilityQuestions.eq.endDateOfPreviousCoverageFive)
        setDateOfCoverageYouAreLeaving(editableEligibilityQuestions.eq.DateOfCoverageYouAreLeaving)
        setDateOfYouEstablishedResidencyThree(editableEligibilityQuestions.eq.dateOfYouEstablishedResidencyThree)
        setPerciptionDrugCoverage(editableEligibilityQuestions.eq.perciptionDrugCoverage)
        setCoverageName(editableEligibilityQuestions.eq.coverageName)
        setCoverageID(editableEligibilityQuestions.eq.coverageID)
        setSpouseWork(editableEligibilityQuestions.eq.spouseWork)
        setPrimaryCArePhysicianFullName(editableEligibilityQuestions.eq.primaryCarePhysicianFullName)
        setPrimaryCarePhysicianIDNumber(editableEligibilityQuestions.eq.primaryCarePhysicianIDNumber)
        setCurrentPatient(editableEligibilityQuestions.eq.currentPatient)
    }

    // FUNCTION CLOSE THE DIALOG BOXES OF THIS PAGE
    const handleClose = (b) => {
        setOpenInfo(false)
    };

    //  FUNCTION TO CLOSE THE DIALOG BOXES OF THIS PAGE
    const handleClickOpen = (a) => {
        setOpenInfo(true);

    };

    // INFO POPUP CONTENT
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);
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

    // FUNCTION TO SAVE THE ELIGIBILITY QUESTIONS AND DISPATCH IT TO STORE
    const saveEligibilityQuestion = async (e) => {
        e.preventDefault();

        // const medicarePartBEffectiveDate = medicarePartBEffectiveDate.getDate() + "-" + medicarePartBEffectiveDate.getMonth() + "-" + medicarePartBEffectiveDate.getFullYear()
        let data = { medicareEnrollmentPeriod, medicarePartBEffectiveDate, dateOfYouEstablishedResidencyOne, endDateOfPreviousCoverageOne, dateOfYouEstablishedResidencyTwo, endDateOfPreviousCoverageTwo, medicareStartDate, dateReleasedFromIncarceration, endDateOfPreviousCoverageThree, endDateOfPreviousCoverageFour, endDateOfPreviousCoverageFive, DateOfCoverageYouAreLeaving, dateOfYouEstablishedResidencyThree, spouseWork, perciptionDrugCoverage, coverageName, coverageID, coverageGroup, primaryCarePhysicianFullName, primaryCarePhysicianIDNumber, currentPatient }

        // HERE WE ARE VALIDATING THE ELIGIBILITY QUESTION
        await eligibilityQuestionsScheema.strict().validate(data).then(res => {
            console.log("Response====>", res)

            // AFTER SUCCESS WE DSIPATCHED IT TO STORE
            dispatch(EligibilityQuestions(res))
            history.push('/applicant-review')
        })
            .catch((err) => {
                console.log("Error====>", { err })

                // HERE WE ARE ADDING ERRORS BELOW FIELDS
                document.querySelectorAll(".error-msg").forEach((i) => { i.innerHTML = "" })
                if (document.querySelector(`#${err.path}`))
                    if (document.querySelector(`#${err.path}`) === "#medicareEnrollmentPeriod" || document.querySelector(`#${err.path}`) === "#medicardNumber") {
                        document.querySelector(`#${err.path}`).innerHTML = err.message
                    }
                    else {
                        document.querySelector(`#${err.path}`).innerHTML = err.message
                    }
                setErrorHnandling(err.message)
            })

    }
    return <>
        <div className="light-gray-bg-color">

            <Grid container>
                <Grid item xs={12}>
                    <div className="applicant-information">
                        <h1 className="main-section-font-color applicant-text-h1">Eligibility Questions</h1>
                        <p className="font-gray required-text">* Required field</p>
                    </div>
                </Grid>
            </Grid>

            <div className={classes.root}>
                <div className="form-wrapper">
                    <form noValidate autoComplete="off" onSubmit={saveEligibilityQuestion}>
                        <Grid container className="white-bg-color form-grid">

                            <Grid item sm={12}>
                                <div>
                                    <p className="main-section-font-color select-enrollemnt-period-text">Select your enrollment period *</p>
                                </div>
                                <div id="medicareEnrollmentPeriod" className="red-text error-msg error-on-eligibility-question-page"></div>
                            </Grid>
                            <div className="enrollment-period-radio">
                                <label className="labl">
                                    <input type="radio" name="radioname" value="Annual enrollment period (October 15-December7)" onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">Annual enrollment period (October 15-December7)</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I am new to Medicare" onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I am new to Medicare</p>
                                        <p className="learnMore">Learn more</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I сurrently рave a low income subsidy or extra help" onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I сurrently рave a low income subsidy or extra help</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I am leaving employer or union coverage." onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I am leaving employer or union coverage.</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I recently moved outside of the service area for my current plan or I recently moved and this plan is a new option for me." onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I recently moved outside of the service area for my current plan or I recently moved and this plan is a new option for me.</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I have Medicare and Medicaid" onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I have Medicare and Medicaid</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I am enrolling in a 5-star Medicare Plan." onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I am enrolling in a 5-star Medicare Plan.</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I recently had a change in my Extra Help paying for Medicare prescription drug coverage (newly got Extra Help, had a change in the level of Extra Help, or lost Extra Help)." onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p className="main-section-font-color radio-option-text">I recently had a change in my Extra Help paying for Medicare prescription drug coverage (newly got Extra Help, had a change in the level of Extra Help, or lost Extra Help).</p>
                                    </div>
                                </label>
                                <label className="labl">
                                    <input type="radio" name="radioname" value="I do not see an option listed for me" onClick={(e) => { setVisibleOtherEnrollmentPeriod(e.target.value) }} />
                                    <div>
                                        <p>I do not see an option listed for me</p>
                                    </div>
                                </label>
                            </div>

                            {/* TERINANRY OPERATOR TO CHECK IF USER WANTS TO EXPLORE OTHER OPTION IN ENROLLMENT PERIOD */}
                            {visibleOtherEnrollmentPeriod ?

                                <>
                                    <Grid sm={12} item>
                                        <div>
                                            <p className="main-section-font-color other-option-text">Other Medicare enrollment periods</p>
                                        </div>
                                        <div id="date" className="red-text error-msg error-on-eligibility-question-page"></div>

                                    </Grid>

                                    <Grid sm={12} item>

                                        <FormControl component="fieldset" >

                                            <RadioGroup value={medicareEnrollmentPeriod} row aria-label="position" name="position1" defaultValue="top" onChange={(e) => { setMedicareEnrollmentPeriod(e.target.value) }}>

                                                <FormControlLabel value="I already have Hospital (Part A) and recently signed up for Medical (Part B). I want to join a Medicare Advantage Plan." className="radioOptions" control={<Radio color="primary" />} label="I already have Hospital (Part A) and recently signed up for Medical (Part B). I want to join a Medicare Advantage Plan." />
                                                <br />
                                                <Grid item lg={4} md={4} sm={12}>

                                                    <div className="date-purpose-text" >
                                                        <p>Medicare Part B Effective Date</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={medicarePartBEffectiveDate}
                                                                onChange={(e) => { setMedicarePartBEffectiveDate(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I belong to a pharmacy assistance program provided by my state." className="radioOptions" control={<Radio color="primary" />} label="I belong to a pharmacy assistance program provided by my state." />
                                                </Grid>
                                                <Grid sm={12} item>
                                                    <FormControlLabel value="I am moving into, live in, or recently moved out of a Long-Term Care Facility (for example, a nursing home or long-term care facility)." className="radioOptions" control={<Radio color="primary" />} label="I am moving into, live in, or recently moved out of a Long-Term Care Facility (for example, a nursing home or long-term care facility)." />

                                                </Grid>
                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>Date of You Established Residency</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={dateOfYouEstablishedResidencyOne}
                                                                onChange={(e) => { setDateOfEstablishedResidencyOne(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I have had Medicare prior to now, but am now turning 65." className="radioOptions" control={<Radio color="primary" />} label="I have had Medicare prior to now, but am now turning 65." />
                                                </Grid>

                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I was enrolled in a Special Needs Plan (SNP) but I have lost the special needs qualification required to be in that plan." className="radioOptions" control={<Radio color="primary" />} label="I was enrolled in a Special Needs Plan (SNP) but I have lost the special needs qualification required to be in that plan." />

                                                </Grid>
                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>End Date of Previous Coverage</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={endDateOfPreviousCoverageOne}
                                                                onChange={(e) => { setEndDateOfPreviousCovergeOne(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I recently returned to the United States after living permanently outside of the U.S." className="radioOptions" control={<Radio color="primary" />} label="I recently returned to the United States after living permanently outside of the U.S." />

                                                </Grid>
                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>Date of You Established Residency</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={dateOfYouEstablishedResidencyTwo}
                                                                onChange={(e) => { setDateOfYouEstablishedResidencyTwo(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I recently involuntarily lost my creditable prescription drug coverage (coverage as good as Medicare's)." className="radioOptions" control={<Radio color="primary" />} label="I recently involuntarily lost my creditable prescription drug coverage (coverage as good as Medicare's)." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>End Date of Previous Coverage</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={endDateOfPreviousCoverageTwo}
                                                                onChange={(e) => { setEndDateOfPreviousCovergeTwo(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I am new to Medicare, and I was notified about getting Medicare after my Part A and/or Part B coverage started." className="radioOptions" control={<Radio color="primary" />} label="I am new to Medicare, and I was notified about getting Medicare after my Part A and/or Part B coverage started." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>Medicare Start Date</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={medicareStartDate}
                                                                onChange={(e) => { setMedicareStartDate(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I recently was released from incarceration." className="radioOptions" control={<Radio color="primary" />} label="I recently was released from incarceration." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>Date Released From Incarceration</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={dateReleasedFromIncarceration}
                                                                onChange={(e) => { setDateReleasedFromIncarceration(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I lost my coverage because Medicare ended its contract with my plan. I got a letter from Medicare saying I could join another plan." className="radioOptions" control={<Radio color="primary" />} label="I lost my coverage because Medicare ended its contract with my plan. I got a letter from Medicare saying I could join another plan." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>End Date of Previous Coverage</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={endDateOfPreviousCoverageThree}
                                                                onChange={(e) => { setEndDateOfPreviousCovergeThree(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="My plan is ending its contract with Medicare, or Medicare is ending its contract with my plan." className="radioOptions" control={<Radio color="primary" />} label="My plan is ending its contract with Medicare, or Medicare is ending its contract with my plan." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>End Date of Previous Coverage</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={endDateOfPreviousCoverageFour}
                                                                onChange={(e) => { setEndDateOfPreviousCovergeFour(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I recently 'left' a Programs of All-Inclusive Care for the Elderly program." className="radioOptions" control={<Radio color="primary" />} label="I recently 'left' a Programs of All-Inclusive Care for the Elderly program." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>End Date of Previous Coverage</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={endDateOfPreviousCoverageFive}
                                                                onChange={(e) => { setEndDateOfPreviousCovergeFive(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I was enrolled in a plan by Medicare (or my state) and I want to choose a different plan." className="radioOptions" control={<Radio color="primary" />} label="I was enrolled in a plan by Medicare (or my state) and I want to choose a different plan." />

                                                </Grid>

                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>Date of Coverage You Are Leaving</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={DateOfCoverageYouAreLeaving}
                                                                onChange={(e) => { setDateOfCoverageYouAreLeaving(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I live in a long term care facility (for example, a nursing home or rehabilitation hospital)." className="radioOptions" control={<Radio color="primary" />} label="I live in a long term care facility (for example, a nursing home or rehabilitation hospital)." />

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I am in a plan that has had a star rating of less than 3 stars for the last 3 years. I want to join a plan with a star rating of 3 stars   
                                                    or higher." className="radioOptions" control={<Radio color="primary" />} label="I am in a plan that has had a star rating of less than 3 stars for the last 3 years. I want to join a plan with a star rating of 3 stars or higher." />

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I am in a plan that was recently taken over by the state because of financial issues. I want to switch to another plan." className="radioOptions" control={<Radio color="primary" />} label="I am in a plan that was recently taken over by the state because of financial issues. I want to switch to another plan." />

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I was affected by a weather-related emergency or major disaster (as declared by the Federal Emergency Management Agency (FEMA)). One of the other statements here applied to me, but I was unable to make my enrollment because of the natural disaster." className="radioOptions" control={<Radio color="primary" />} label="I was affected by a weather-related emergency or major disaster (as declared by the Federal Emergency Management Agency (FEMA)). One of the other statements here applied to me, but I was unable to make my enrollment because of the natural disaster." />

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I recently obtained lawful presence status in the United States." className="radioOptions" control={<Radio color="primary" />} label="I recently obtained lawful presence status in the United States." />

                                                </Grid>
                                                <Grid item lg={4} md={4} sm={12}>
                                                    <div className="date-purpose-text">
                                                        <p>Date You Established Residency</p>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={8} md={8} sm={12} className="date-picker-grid">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-border">
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="yyyy/MM/dd"
                                                                views={["year", "month", "date"]}
                                                                openTo="year"
                                                                initialFocusedDate="1956,05,04"
                                                                className="datePicker removeDate"
                                                                onClick={dateRemover}
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                placeholder="DD/MM/YYYY"
                                                                value={dateOfYouEstablishedResidencyThree}
                                                                onChange={(e) => { setDateOfYouEstablishedResidencyThree(e) }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>

                                                </Grid>
                                                <Grid sm={12} item>

                                                    <FormControlLabel value="I am enrolled in a Medicare Advantage plan and want to make a change during the Medicare Advantage Open Enrollment Period (MA OEP)" className="radioOptions" control={<Radio color="primary" />} label="I am enrolled in a Medicare Advantage plan and want to make a change during the Medicare Advantage Open Enrollment Period (MA OEP)" />

                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                </>
                                :
                                <></>}
                        </Grid>

                        <Grid container>
                            <Grid item sm={12} style={{ marginTop: '1rem' }}>
                                <div className={classes.root}>
                                    <Accordion className="accordion">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}><h3 className="main-section-font-color accordionHeading">Eligibility questions</h3></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>

                                                <Grid xl={12} lg={12} md={12} sm={12} item>
                                                    <FormControl component="fieldset" className="field-wrapper">
                                                        <FormLabel className="main-section-font-color label">Once enrolled, will you have other medical health coverage where you are the subscriber
                                                            or are covered as a spouse/dependent?</FormLabel>
                                                        <RadioGroup value={medicalHealthCoverage} row aria-label="position2" name="position2" onChange={(e) => { setMedicalHealthCoverage(e.target.value) }}>

                                                            <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                                                            <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />

                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>


                                                <Grid xl={12} lg={12} md={12} sm={12} xs={12} item>
                                                    <FormControl component="fieldset" className="field-wrapper">
                                                        <FormLabel className="main-section-font-color label">Once enrolled, will you or your spouse work?</FormLabel>
                                                        <RadioGroup value={spouseWork} row aria-label="position" name="position" defaultValue="top" onChange={(e) => { setSpouseWork(e.target.value) }}>

                                                            <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                                                            <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />

                                                        </RadioGroup>
                                                        <div id="spouseWork" className="red-text error-msg"></div>
                                                    </FormControl>
                                                </Grid>

                                                <Grid xl={12} lg={12} md={12} sm={12} xs={12} item>
                                                    <FormControl component="fieldset" className="field-wrapper">
                                                        <FormLabel className="main-section-font-color label">Will you have other prescription drug coverage (like VA, TRICARE) in addition to this plan?
                                                            <img src="images/Vector.png" className="alert-vector" onClick={() => { handleClickOpen("openInfo") }} />
                                                        </FormLabel>
                                                        <RadioGroup value={perciptionDrugCoverage} row aria-label="position" name="position" defaultValue="top" onChange={(e) => { setPerciptionDrugCoverage(e.target.value) }}>

                                                            <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                                                            <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />

                                                        </RadioGroup>
                                                        <div id="drugCoverage" className="red-text error-msg"></div>
                                                    </FormControl>
                                                </Grid>
                                                {perciptionDrugCoverage === "Yes"
                                                    ?
                                                    <>
                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">What is the name of other coverage</FormLabel>

                                                                <TextField value={coverageName} className="custom-text-box" placeholder="Enter name of other coverage" variant="outlined" onChange={(e) => { setCoverageName(e.target.value) }} />
                                                                <div id="street" className="red-text error-msg"></div>
                                                            </FormControl>

                                                        </Grid>
                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">What is other coverage ID</FormLabel>

                                                                <TextField value={coverageID} className="custom-text-box" placeholder="Enter ID for this coverage" variant="outlined" onChange={(e) => { setCoverageID(e.target.value) }} />
                                                                <div id="city" className="red-text error-msg"></div>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">What is the group name</FormLabel>

                                                                <TextField value={coverageGroup} className="custom-text-box" placeholder="Enter group for this coverage" variant="outlined" onChange={(e) => { setCoverageGroup(e.target.value) }} />
                                                                <div id="state" className="red-text error-msg"></div>
                                                            </FormControl>

                                                        </Grid>
                                                    </>

                                                    :

                                                    <></>
                                                }

                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="accordion">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}><h3 className="main-section-font-color accordionHeading">Physician name</h3>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid xl={12} xs={12} item>
                                                    <div>
                                                        <p className="main-section-font-color">We strongly recommend that all medical plan applicants include their primary care physician’s
                                                            (PCP) information below. If you are applying for an HMO plan, then you must complete this section.
                                                            Please see your Summary of Benefits to determine if your plan requires a PCP.</p>
                                                        <br />
                                                    </div>
                                                </Grid>
                                                <Grid item lg={6} sm={6} xs={12} item>

                                                    <FormControl className="field-wrapper">
                                                        <FormLabel className="main-section-font-color label">Primary care physician's full name</FormLabel>

                                                        <TextField value={primaryCarePhysicianFullName} className="custom-text-box" placeholder="Enter your primary care physician's full name" variant="outlined" onChange={(e) => { setPrimaryCArePhysicianFullName(e.target.value) }} />
                                                        <div id="primaryPhysicianFullName" className="red-text error-msg"></div>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item lg={6} sm={6} xs={12} item>
                                                    <FormControl className="field-wrapper">
                                                        <FormLabel className="main-section-font-color label">Primary care physician's ID number</FormLabel>

                                                        <TextField value={primaryCarePhysicianIDNumber} className="custom-text-box" placeholder="Enter your primary care physician's ID number" variant="outlined" onChange={(e) => { setPrimaryCarePhysicianIDNumber(e.target.value) }} />
                                                        <div id="primaryPhysicianIDNumber" className="red-text error-msg"></div>
                                                    </FormControl>
                                                </Grid>

                                                <Grid xl={12} lg={12} md={12} sm={12} xs={12} item>
                                                    <FormControl component="fieldset" className="field-wrapper">
                                                        <FormLabel className="main-section-font-color label">Are you a current patient of the above doctor?</FormLabel>
                                                        <RadioGroup value={currentPatient} row aria-label="position" name="position" defaultValue="top" onChange={(e) => { setCurrentPatient(e.target.value) }}>

                                                            <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                                                            <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />

                                                        </RadioGroup>
                                                        <div id="currentPatientOfAboveDoctor" className="red-text error-msg"></div>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>

                                </div>
                            </Grid>
                        </Grid>
                    </form>
                    <div className="btn-container">
                        <div>
                            <Link to={{ pathname: '/medicare-information', state: { mi: medicareInformation } }}>
                                <button type="button" className="back-btn"><h2>Back</h2></button>
                            </Link>
                        </div>
                        <div className="next-btn-wrapper">
                            <button type="submit" className="next-btn" onClick={saveEligibilityQuestion}><h2 className="next-btn-h2">Next</h2></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* DIALOG BOXES CONTENT OF THS PAGE */}
        <div>

            <Dialog onClose={() => { handleClose("closeInfo") }} className="pop-up-dialog" aria-labelledby="customized-dialog-title" open={openInfo}>
                <DialogTitle id="customized-dialog-title" onClose={() => { handleClose("closeInfo") }}>
                    <h3 className="main-section-font-color info-pop-up">You clicked on info button for other drug coverage</h3>
                </DialogTitle>
                <DialogContent >
                    <Typography className="main-section-font-color info-popup-para">
                        Some individuals may have other drug coverage, including other private insurance, TRICARE, Federal employee health benefits coverage, VA benefits, or State pharmaceutical assistance programs.
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>


    </>
}