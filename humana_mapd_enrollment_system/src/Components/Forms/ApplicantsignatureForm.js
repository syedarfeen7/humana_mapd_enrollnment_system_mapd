import { Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import '../../Styles/GenearlizeStyle/style.css';
import '../../Styles/EligibilityQuestionsStyling/style.css';
import '../../Styles/ApplicantSignatureStyling/style.css';
import { ApplicantSignature } from '../../Store/Actions/applicantAction';
import { applicantSignatureScheema, applicantAuthorizedScheema } from '../../Helpers/Validator/validator';
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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));
export default function ApplicantSignatureForm() {
    const classes = useStyles();
    const history = useHistory()
    const [appplicantSignatureMMethod, setApplicantSignatureMethod] = useState('');
    const [applicantAuthorized, setApplicantAuthorized] = useState('')
    const [signature, setSignature] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [relationshipToEnrolle, setRelationshiptoEnrolle] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [acknowledge, setAcknowledge] = useState('')
    const [submissionTime, setsubmissionTime] = useState(new Date())
    const dispatch = useDispatch()

    const abc = () => {
        setApplicantAuthorized('')

    }
    //  FUNCTION TO SAVE THE APPLICANT SIGNATURE DETAILS
    const saveApplicantSignature = async (e) => {
        e.preventDefault()
        let data = { appplicantSignatureMMethod, applicantAuthorized, firstName, secondName, submissionTime, relationshipToEnrolle, street, state, city, zipCode, phoneNumber, acknowledge, signature }

        // VALIDATION USING YUP
        await applicantSignatureScheema.strict().validate(data).then(res => {
            console.log(res)

            // AFTER VALIDATE WE DIPATCHED THE DATA TO REDUX STORE
            if (applicantAuthorized) {
                if (applicantAuthorized && firstName && secondName && relationshipToEnrolle && street && state && city && zipCode && acknowledge && signature) {

                    dispatch(ApplicantSignature(res))
                    history.push("/enrollment-completed")
                }
            }
            else {
                dispatch(ApplicantSignature(res))
                history.push("/enrollment-completed")

            }
        })
            .catch(err => {
                console.log(err)
                document.querySelectorAll(".error-msg").forEach((i) => { i.innerHTML = "" })
                if (document.querySelector(`#${err.path}`))
                    document.querySelector(`#${err.path}`).innerHTML = err.message
            })
        if (applicantAuthorized) {
            await applicantAuthorizedScheema.strict().validate(data).then(res => {

            })
                .catch(err => {
                    console.log(err)
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
                        <h1 className="main-section-font-color applicant-text-h1">Application Signature</h1>
                        <p className="font-gray required-text">* Required field</p>
                    </div>
                </Grid>
            </Grid>

            <div className={classes.root}>
                <div className="form-wrapper">
                    <form noValidate autoComplete="off" onSubmit={saveApplicantSignature}>
                        <Grid container className="white-bg-color form-grid">
                            <Grid xs={12} item>
                                <div id="appplicantSignatureMMethod" className="red-text error-msg"></div>
                                <div className="applicant-effective-date-radio">
                                    <label className="labl">
                                        <input type="radio" onClick={abc} name="radioname" value="I am completing this enrollment form on my own" onChange={(e) => { setApplicantSignatureMethod(e.target.value) }} />
                                        <div>
                                            <p className="main-section-font-color radio-option-text">I am completing this enrollment form on my own</p>
                                        </div>
                                    </label>
                                    <label className="labl">
                                        <input type="radio" name="radioname" value="I am an authorized representative to act on behalf of the individual listed on this enrollment application" onChange={(e) => { setApplicantAuthorized(e.target.value) }} />
                                        <div>
                                            <p className="main-section-font-color radio-option-text">I am an authorized representative to act on behalf of the individual listed on this enrollment application</p>

                                        </div>
                                    </label>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} style={{ marginTop: '2rem' }}>
                                <div className={classes.root}>
                                    {applicantAuthorized
                                        ?
                                        <>
                                            <Accordion className="accordion">
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography><h3 className="main-section-font-color accordionHeading">Authorized individual / volunteer</h3></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container>

                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">First name *</FormLabel>

                                                                <TextField value={firstName} className="custom-text-box" placeholder="Enter your first name" variant="outlined" onChange={(e) => { setFirstName(e.target.value) }} />
                                                                <div id="firstName" className="red-text error-msg"></div>
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">Second name *</FormLabel>

                                                                <TextField value={secondName} className="custom-text-box" placeholder="Enter your second name" variant="outlined" onChange={(e) => { setSecondName(e.target.value) }} />
                                                                <div id="secondName" className="red-text error-msg"></div>

                                                            </FormControl>
                                                        </Grid>


                                                        <Grid lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">Relationship to enrollee *</FormLabel>

                                                                <TextField value={relationshipToEnrolle} className="custom-text-box" placeholder="Enter your relationship to enrollee" variant="outlined" onChange={(e) => { setRelationshiptoEnrolle(e.target.value) }} />
                                                                <div id="relationshipToEnrolle" className="red-text error-msg"></div>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid lg={6} sm={6} xs={12} item className="hide-grid-city"></Grid>

                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">Street *</FormLabel>
                                                                <TextField value={street} className="custom-text-box" placeholder="Enter your street" variant="outlined" onChange={(e) => { setStreet(e.target.value) }} />
                                                                <div id="street" className="red-text error-msg"></div>

                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item lg={6} sm={6} xs={12} item>
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">State *</FormLabel>
                                                                <TextField value={state} className="custom-text-box" placeholder="Enter your state" variant="outlined" onChange={(e) => { setState(e.target.value) }} />
                                                                <div id="state" className="red-text error-msg"></div>

                                                            </FormControl>
                                                        </Grid>




                                                        <Grid item lg={6} sm={6} xs={12} >
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">City *</FormLabel>
                                                                <TextField value={city} className="custom-text-box" placeholder="Enter your city" variant="outlined" onChange={(e) => { setCity(e.target.value) }} />
                                                                <div id="city" className="red-text error-msg"></div>
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item lg={6} sm={6} xs={12} >
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">Zip Code *</FormLabel>
                                                                <TextField value={zipCode} className="custom-text-box" placeholder="Enter your zip code" variant="outlined" onChange={(e) => { setZipCode(e.target.value) }} />
                                                                <div id="zipCode" className="red-text error-msg"></div>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item lg={6} sm={6} xs={12} >
                                                            <FormControl className="field-wrapper">
                                                                <FormLabel className="main-section-font-color label">Phone number *</FormLabel>
                                                                <TextField value={phoneNumber} className="custom-text-box" placeholder="Enter your phonr number" variant="outlined" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                                                <div id="phoneNumber" className="red-text error-msg"></div>

                                                            </FormControl>
                                                        </Grid>
                                                        <Grid lg={6} sm={6} xs={12} item className="hide-grid-city"></Grid>

                                                        <Grid xs={12} item>
                                                            <div>
                                                                <p className="main-section-font-color authorizedText">If you have been authorized to complete this application on behalf of the individual listed on this application, under the laws of the state in which this individual resides, you must provide the following information. Upon request, you must be able to present UnitedHealthcare and/or Medicare with documentation of your authority to represent the individual listed on this application.</p>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </>
                                        :
                                        <></>
                                    }

                                </div>
                            </Grid>
                        </Grid>
                        <Grid containerF className="white-bg-color form-grid" style={{ marginTop: '2rem' }}>
                            <Grid item sm={12} style={{ marginTop: '2rem' }}>
                                <div className={classes.root}>
                                    <div className="agreement">
                                        <h3 className="main-section-font-color">Agreement</h3>
                                        <h3>
                                        Enrollment Agreement
                                        </h3>
                                        <p>
                                            <br /><br />
                                            PLEASE READ THIS IMPORTANT INFORMATION
                                            <br /><br />

                                            If you currently have health coverage from an employer or union, joining Humana could affect your employer or union healthcare benefits.
                                            You could lose your employer or union health coverage if you join Humana. Read the communications your employer or union sends you.
                                            If you have questions, visit their website, or contact the office listed in their communications. If there isn’t information on whom to contact,
                                            your benefits administrator or the office that answers questions about your coverage can help.
                                            <br /><br />

                                            Counseling services may be available in your state to provide advice concerning Medicare supplement insurance or
                                            other Medicare Advantage or prescription drug plan options, medical assistance through the state Medicaid program
                                            and a Medicare Savings Program.
                                            <br /><br />

                                            By completing this enrollment form, I agree to the following:
                                            <br /><br />

                                            If I am enrolling in a Medicare Advantage health plan that has a contract with the federal government, I will need to keep my Medicare
                                            Hospital (Part A) and Medical (Part B), and must continue to pay my Medicare Part B premium. I can only be in one Medicare Advantage plan
                                            at a time and I understand that my enrollment in this plan will automatically end my enrollment in another Medicare Advantage health plan or
                                            prescription drug plan. If I am enrolling in a Medicare prescription drug plan in addition to my coverage under Medicare Parts A and B,
                                            I will need to keep my Medicare Parts A and B coverage. It is my responsibility to inform Humana of any prescription drug coverage that
                                            I have or may get in the future. I understand that if I don't have Medicare prescription drug coverage, or creditable prescription drug
                                            coverage (as good as Medicare's), I may have to pay a late enrollment penalty if I enroll in Medicare prescription drug coverage in the future.
                                            I can be in only one Medicare prescription drug plan at a time. Enrollment in this plan is generally for the entire year. Once I enroll, I may
                                            leave this plan or make changes only at certain times of the year when an enrollment period is available (Example: October 15 - December 7
                                            of every year), or under certain special circumstances.
                                            <br /><br />

                                            This Humana plan serves a specific service area. If I move out of the area that this Humana plan serves, I need to notify Humana so
                                            I can disenroll and find a new plan in my new area. Once I am a member of Humana, I have the right to appeal plan decisions about
                                            payment or services if I disagree. I will read the Evidence of Coverage from Humana when I get it to know which rules I must follow
                                            in order to get coverage with this Medicare Advantage or prescription drug plan. I understand that Medicare beneficiaries are generally
                                            not covered under Medicare while out of the country except for limited coverage near the U.S. border.
                                            <br /><br />

                                            Benefits and services provided by [Humana] and contained in my “Evidence of Coverage” document (also known as a member contract or
                                            subscriber agreement) will be covered  NEITHER MEDICARE NOR HUMANA WILL PAY FOR MEDICARE ADVANTAGE HMO SERVICES
                                            WITHOUT AUTHORIZATION.
                                            <br /><br />

                                            I understand that if I am receiving assistance from a sales agent, broker or other individual employed by or contracted with Humana,
                                            he/she may be paid based on my enrollment in a Humana plan.
                                            <br /><br />

                                            Once Humana has received my enrollment form, I may get a verification letter to make sure that I understand how my plan works and
                                            to confirm my intent to enroll. This is not a secondary plan to Medicare Parts A and B. Humana pays instead of Medicare, and I will be
                                            responsible for the amounts that Humana doesn't cover, such as copayments and coinsurances. Medicare Parts A and B won’t pay for my
                                            healthcare while I am enrolled in Humana.
                                            <br /><br />

                                            If you are requesting membership in a Health Maintenance Organization (HMO) plan, the following statement applies: I understand that
                                            on the date HMO coverage begins, I must get all of my healthcare from network providers, except for emergency or urgently needed
                                            services or out-of-area dialysis.
                                            <br /><br />

                                            If you are requesting membership in a Preferred Provider Organization (PPO) plan, the following statement applies: I understand that on
                                            the date PPO coverage begins, using services in-network can cost less than using services out-of-network, except for emergency or urgently
                                            needed services or out-of-area dialysis services. If medically necessary, Humana provides reimbursement for all covered benefits, even
                                            if received out of network.
                                            <br /><br />

                                            If you are requesting membership in a Private Fee For Service (PFFS) plan, the following statement applies: I understand that
                                            this plan is a Medicare Advantage PFFS plan and not a Medicare Supplement, Medigap, Medicare Select or stand-alone prescription
                                            drug plan. PFFS is a Medicare Advantage plan which may have prescription drug coverage built in. Before seeing a provider, I should
                                            verify that the provider will accept this plan before each visit. Your doctor or hospital isn't required to agree to accept the plan's terms
                                            and conditions, and thus may choose not to treat you, except for emergencies. Providers can find the plan's terms and conditions on our
                                            website at Humana.com/provider/medical-resources/medicare-medicaid/. I understand that my healthcare providers have the right to
                                            choose whether to accept a PFFS plan's payment terms and conditions every time I see them. I understand that if my provider decides
                                            not to accept PFFS, I will need to find another provider that will. I understand that if my PFFS plan doesn't offer Medicare prescription
                                            drug coverage, I may obtain coverage from another Medicare prescription drug plan.
                                            <br /><br />

                                            If you are requesting membership in a Chronic Condition Special Needs Plan (C-SNP), the following statement applies: I
                                            understand this plan is a chronic condition special needs plan. My ability to enroll is based on physician verification that
                                            I have the qualifying medical condition(s).
                                            <br /><br />

                                            If you are requesting membership in an Institutional Special Needs Plan (I-SNP), the following statement applies: I understand this
                                            plan is an institutional special needs plan. My ability to enroll is based on verification that my condition makes it likely that either
                                            the length of stay or the need for an institutional level of care would be at least 90 days.
                                            <br /><br />

                                            If you are requesting membership in a Humana prescription drug plan and you are a member of a Medicare Advantage plan
                                            (like an HMO or PPO), you may already have a prescription drug benefit from your Medicare Advantage plan that will meet your needs.
                                            If you join a Humana prescription drug plan, your membership in your Medicare Advantage plan may end. This will affect both your doctor
                                            and hospital coverage as well as your prescription drug benefits. Read the information that your Medicare Advantage plan sends you and
                                            if you have questions, contact your Medicare Advantage plan. I understand that if I leave this plan and don't have or obtain other Medicare
                                            prescription drug coverage or creditable coverage (as good as Medicare's), I may have to pay a late enrollment penalty in addition to my
                                            premium for Medicare prescription drug coverage in the future. I understand that I must use network pharmacies to access Humana
                                            benefits, except under limited, nonroutine circumstances when I can't reasonably use Humana network pharmacies.
                                            <br /><br />

                                            I understand that I am enrolling into a Humana Medicare Advantage plan or a Humana Medicare prescription drug plan and not a
                                            Medicare Supplement, Medigap, Medicare Select or Medicaid plan.
                                            <br /><br />

                                            The information on this enrollment form is correct to the best of my knowledge. I understand that if I intentionally provide false
                                            information on this form, I will be disenrolled from the plan.
                                            <br /><br />

                                            Release of Information:
                                            <br /><br />

                                            By joining this Medicare plan, I acknowledge that Humana will share my information with Medicare, who may use it to track my enrollment,
                                            to make payments, and for other purposes allowed by federal law that authorize the collection of this information
                                            (see Privacy Act Statement below).
                                            <br /><br />

                                            Limited Incomes:
                                            <br /><br />

                                            Individuals with limited incomes may qualify for Extra Help to pay for their prescription drug costs. If eligible, Medicare could pay for
                                            seventy-five (75) percent or more of your drug costs, including monthly prescription drug premiums, annual deductibles and coinsurance.
                                            Additionally, those who qualify will not be subject to the coverage gap or a late enrollment penalty. Many individuals are eligible for these
                                            savings and don't even know it. For more information about this Extra Help, contact your local Social Security office, or call Social Security
                                            at 1-800-772-1213. TTY users should call 1-800-325-0778. You can also apply for Extra Help online at www.socialsecurity.gov/prescriptionhelp.
                                            <br /><br />

                                            If you qualify for Extra Help with your Medicare prescription drug coverage costs, Medicare will pay all or part of your plan premium. If
                                            Medicare pays only a portion of this premium, we will bill you for the amount that Medicare doesn't cover.
                                            <br /><br />

                                            IMPORTANT NOTE about Social Security Administration (SSA) or Railroad Retirement Board (RRB) Benefit Check Deduction:
                                            <br /><br />

                                            Depending on the time of the month that you make this request, your SSA or RRB deduction may be denied for your first premium
                                            payment. Humana will issue you an invoice for the initial payment and resubmit your request to CMS (Medicare) for SSA or RRB
                                            deduction to begin with your second month’s premium. Once processed, it could take up to two benefit checks from the time your
                                            Medicare plan submits the request for the premium deduction to start. This means that the first time premiums are withheld from
                                            your SSA or RRB benefit, an amount equal to two monthly premium payments may be withheld. SSA or RRB will deduct only the
                                            cost of one monthly premium payment from your SSA or RRB benefit each month after that. In some cases, it may take three benefit
                                            checks. You will never have a deduction that is more than three months’ worth of premiums. If for any reason, your deduction is
                                            delayed and more than three months of premiums would need to be deducted, Medicare will stop your request and ask your Medicare
                                            plan to bill you directly for premiums. This protects you from having a large, unexpected deduction from your regular benefit.
                                            <br /><br />

                                            Should you disenroll from the plan, the same lag in processing time may occur. If the SSA or RRB withheld the premium,
                                            SSA or the RRB will refund your premium. You will receive this refund within three benefit checks of your disenrollment date.
                                            <br /><br />

                                            I understand that my signature (or the signature of the person authorized to act on behalf of the individual under the laws of the
                                            state where the individual resides) on this enrollment form means that I have read and understand the contents of this enrollment form.
                                            If signed by an authorized individual (as described above), the signature certifies that: 1) this person is authorized under state law to
                                            complete this enrollment and 2) documentation of this authority is available upon request from Medicare.
                                            <br /><br />

                                            I have read and understand the important information on the preceding pages. I have reviewed and received a copy
                                            of the Summary of Benefits.
                                            <br /><br />

                                            Privacy Act Statement
                                            <br /><br />

                                            The Centers for Medicare & Medicaid Services (CMS) collects information from Medicare plans to track beneficiary enrollment in
                                            Medicare Advantage (MA) Plans, improve care, and for the payment of Medicare benefits. Sections 1851 and 1860D-1 of the Social Security
                                            Act and 42 CFR §§ 422.50 and 422.60 authorize the collection of this information. CMS may use, disclose and exchange enrollment data
                                            from Medicare beneficiaries as specified in the System of Records Notice (SORN) "Medicare Advantage Prescription Drug (MARx)", System
                                            No.09-70-0588. Your response to this form is voluntary. However, failure to respond may affect enrollment in the plan.
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid xs={12} item>
                        <div className="checkBox-wrapper">
                            <div id="acknowledge" className="red-text error-msg"></div>
                            <input type="checkbox" className="custom-checkbox" onChange={(e) => { setAcknowledge(e.target.value) }} />
                            <label className="main-section-font-color">I acknowledge that I have read the disclosures and confirm that all the nformation in this enrollment application is accurate</label>

                        </div>
                    </Grid>
                    <div className="signature-wrapper">
                        <Grid lg={5} md={5} sm={6} xs={12} item >
                            <FormControl className="field-wrapper" >
                                <FormLabel className="main-section-font-color label">Signature (Type fill name) *</FormLabel>
                                <div id="signature" className="red-text error-msg"></div>
                                <TextField className="custom-text-box" placeholder="Enter your signature" value={signature} variant="outlined" onChange={(e) => { setSignature(e.target.value) }} />
                                <div id="signature" className="red-text error-msg"></div>
                            </FormControl>
                        </Grid>
                    </div>
                    <Grid item xs={12} className="home-next-btn-wrapper">
                        <button type="submit" className="home-next-btn" onClick={saveApplicantSignature}><h2 className="next-btn-h2">Submit application</h2></button>
                    </Grid>
                </div>

            </div>
        </div>
    </>
}