import { Grid } from "@material-ui/core";
import '../../Styles/GenearlizeStyle/style.css'
import '../../Styles/HomePageStyling/homePageStyle.css'
import { useState } from 'react'
import ExpandedText from "./ExpandedText";
export default function HealthDisclaimer() {
    const [isExpanded, setIsExpanded] = useState(false)
    // FUNCTION TO SET ISEXAPNDED AS TRUE WHEN USER CLICKED ON READ MORE
    const expandedText = () => {
        setIsExpanded(true)
        document.querySelector(".collapsed-text").classList.add("hide");

    }
    // GETTING EXPENDED PARAGRAPH 
    const getMoreText = () => {
        if (isExpanded) {
            return <div>
                <ExpandedText />
            </div>
        }
        else {
            return null;
        }
    }
    
    let expandedDiv = getMoreText()

    return <>

        <Grid container className="light-gray-bg-color">
            <section className="health-discalimer-wrapper ">
                <Grid item xs={12}>
                    <div className="health-discalimr-heading-wrapper">
                        <h1 className="main-section-font-color health-disalimer-heading">Health Plan Disclaimers</h1>
                    </div>
                    <div className="health-disclaimer-details-wrapper white-bg-color">
                        <p className="collapsed-text main-section-font-color health-disclaimer-details-p">
                            Humana - Humana is a Medicare Advantage (HMO, HMO SNP,  PPO, PPO SNP and PFFS) organization and a stand-alone PDP prescription drug plan with a
Medicare contract. Enrollment in any Humana plan depends on contract renewal.
<br/>
Humana - Humana is a Coordinated Care plan with a Medicare contract and a contract with the state Medicaid program.
Enrollment in this Humana plan depends on contract renewal. or...<span className="read-more font-sky" onClick={expandedText}>Read more</span>
                        </p>
                        {expandedDiv}
                    </div>
                </Grid>
            </section>
        </Grid>
    </>
}