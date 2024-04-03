import React from 'react';
import bewareLogo from './beaware.png';
import { Link, useNavigate } from 'react-router-dom';
import signlanguage from './signlanguage.png'
 
const Dashboard = () => {
  const navigate = useNavigate();
 
  const handleBack = () => {
    navigate('/dashboard');
  };
 
  return (
    <div id="dashboardMain" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
      <div id="topBar">
        <img src={bewareLogo} alt="beaware logo" />
        <button onClick={handleBack}>Profile Page</button>
      </div>
 
      {/* Add your home page content here */}
      <div id="homePageContent">
        <br/>
        <h1 style={{ fontSize: '32px' }}>Every Gesture Tells a Story</h1>
        <p style={{ fontSize: '25px' }}>"Unlock the silent world of communication with the comprehensive guide to sign language."</p>
      </div>
<br/>
      <div id="signLanguageContent">
        {/* <h2>Sign Language Basics</h2> */}
        <div className="contentBetween">
        <p style={{ fontSize: '22px' }}>Sign languages (also known as signed languages) are languages that use the visual-manual modality to convey meaning,
instead of spoken words. Sign languages are expressed through manual articulation in combination with non-manual markers.
Sign languages are full-fledged natural languages with their own grammar and lexicon.
<br/><br/>Sign languages are not universal and are usually not mutually intelligible, although there are also
similarities among different sign languages.
Linguists consider both spoken and signed communication to be types of natural language, meaning that both emerged through
an abstract, protracted aging process and evolved over time without meticulous planning. This is supported by the fact
  that there is substantial overlap between the neural substrates of
sign and spoken language processing, despite the obvious differences in modality.
Sign language should not be confused with body language, a type of nonverbal communication.</p>
        </div><br/>
        <p style={{ fontSize: '22px' }}>
    The image below illustrates common sign language gestures, providing a visual representation of this expressive form of communication.
  </p><br/>
        <div className="imageGallery">
        <img src={signlanguage} alt="Sign Language Image 1" style={{ display: 'block', margin: 'auto', width: '600px', height: 'auto' }} />
        </div><br/>
        <p style={{ fontSize: '22px' }}>Sign languages generally do not have any linguistic relation to the spoken languages of the lands in which they arise. The
            correlation between sign and spoken languages is complex and varies depending on the country more than the spoken language.
            For example, although Australia, English Canada, New Zealand, the U.K. and the U.S. all have English as their dominant language,
             American Sign Language (ASL), derived from French Sign Language, is the main sign language used in the U.S. and
             English Canada, whereas the other three countries use varieties of British, Australian and New Zealand Sign Language, unrelated to ASL.
             Similarly, the sign languages of Spain and Mexico are very different, despite Spanish being the national language in each country,and the sign language used in Bolivia
            is based on ASL rather than any sign language that is used in any other Spanish-speaking country.</p><br/>
        <p style={{ fontSize: '22px' }}>Learn more about sign language in this video.</p>
<br/>
        <div className="videoContainer" style={{ display: 'flex', justifyContent: 'center' }}>
          <iframe
            width="1400"
            height="655"
            src="https://www.youtube.com/embed/cGavOVNDj1s"
            title="Sign Language Basics"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <p style={{ fontSize: '22px' }}> For more such  signs visit this  <Link to= 'https://www.startasl.com/wp-content/uploads/sign-language-flashcards.pdf'> link</Link></p>
      </div>
<br/><br/>
      <div id="footer" style={{ marginTop: 'auto' }}>
        <p>&copy; 2024 BeAware. All rights reserved.</p>
      </div>
    </div>
  );
};
 
export default Dashboard;