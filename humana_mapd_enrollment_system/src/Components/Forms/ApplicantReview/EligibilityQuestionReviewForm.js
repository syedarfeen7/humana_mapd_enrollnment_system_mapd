import '../../../Styles/GenearlizeStyle/style.css';
import '../../../Styles/ApplicantReviewStyling/style.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
export default function EligibilityQuestionsReviewForm() {
    const classes = useStyles();
    const [date, setDate] = useState('')

    // FETCHINF THE ELIGIBILITY QUESTION DETAILS  FROM REDUX STORE
    const eligibilityQuestions = useSelector(state => state.eligibility_questions_details)
    
    // CREATED ARRAY FOR CHECKING THE DATE FROM THAT WHICH DATE USER SELECTED
    const dateArray = {
        "dateOfYouEstablishedResidencyOne": eligibilityQuestions.dateOfYouEstablishedResidencyOne,
        "medicarePartBEffectiveDate": eligibilityQuestions.medicarePartBEffectiveDate,
        "endDateOfPreviousCoverageOne": eligibilityQuestions.endDateOfPreviousCoverageOne,
        "dateOfYouEstablishedResidencyTwo": eligibilityQuestions.dateOfYouEstablishedResidencyTwo,
        "endDateOfPreviousCoverageTwo": eligibilityQuestions.endDateOfPreviousCoverageTwo,
        "medicareStartDate": eligibilityQuestions.medicareStartDate,
        "dateReleasedFromIncarceration": eligibilityQuestions.dateReleasedFromIncarceration,
        "endDateOfPreviousCoverageThree": eligibilityQuestions.endDateOfPreviousCoverageThree,
        "endDateOfPreviousCoverageFour": eligibilityQuestions.endDateOfPreviousCoverageFour,
        "endDateOfPreviousCoverageFive": eligibilityQuestions.endDateOfPreviousCoverageFive,
        "dateOfYouEstablishedResidencyThree": eligibilityQuestions.dateOfYouEstablishedResidencyThree
    }

    // NOW SETTINF THE DATE THAT CONATINS DATE
    const settingDate = () => {
        for (const key in dateArray) {
            if (dateArray[key] != null) {

                if (typeof dateArray[key] === "object") {
                    setDate(dateArray[key].getFullYear() + "-" + parseInt(dateArray[key].getMonth() + 1) + "-" + dateArray[key].getDate())
                }
                if (typeof dateArray[key] === "string") {
                    console.log("Insid else")
                    setDate(dateArray[key].slice(0, 10))
                }

            }
        }
    }
    useEffect(() => {
       settingDate()
    }, [])
    return <>
        <div className="light-gray-bg-color">
            <Grid container>

            </Grid>
            <div className={classes.root}>
                <div className="form-wrapper applicantReview">
                    <form noValidate autoComplete="off" >
                        <Grid container className="white-bg-color form-grid">
                            <Grid item xs={12}>
                                <div className="section-header">

                                    <div className="guidelines-text-wrapper">
                                        <h3 className="guidelines-text-h3 main-section-font-color">Eligibility questions</h3>
                                    </div>
                                    <div className="edit-image-icon-wrapper">
                                        <Link to={{ pathname: "/eligibility-questions", state: { eq: eligibilityQuestions } }}>
                                            <img src="images/EditVector.png" />

                                        </Link>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>* Enrollment period:</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.medicareEnrollmentPeriod}</span>
                                </div>
                            </Grid>
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>* SEP date:</span>
                                    &nbsp;&nbsp;
                                    <span>{date}</span>
                                </div>
                            </Grid>
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>Once enrolled, will you have other medical health coverage where you are the subscriber
                                                            or are covered as a spouse/dependent?</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.medicalHealthCoverage}</span>
                                </div>
                            </Grid>
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>Once enrolled, will you or your spouse work?</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.spouseWork}</span>
                                </div>
                            </Grid>
                            
                            
                    
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>Will you have other prescription drug coverage (Like VA, Tricare) in addition to this plan?:</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.perciptionDrugCoverage}</span>
                                </div >
                            </Grid>
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>Primary Care Physicians Name:</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.primaryCarePhysicianFullName}</span>
                                </div>
                            </Grid>
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>Primary Care Physicians ID Number:</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.primaryCarePhysicianIDNumber}</span>
                                </div>
                            </Grid>
                            
                            <Grid xs={12} item>
                                <div className="details">
                                    <span>Are you a current patient of the above doctor?:</span>
                                    &nbsp;&nbsp;
                                    <span>{eligibilityQuestions.currentPatient}</span>
                                </div>
                            </Grid>
                           
                        </Grid>
                    </form>
                    <div className="info-correct-btn-wrapper">
                        <Link to="/applicant-effective-date">
                        <button type="submit" className="next-btn" ><h2 className="info-correct-btn">Information is correct</h2></button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    </>
}