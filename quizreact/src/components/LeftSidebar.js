import LeftImag from "../assests/images/info_graphic_1.svg";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";

const LeftSidebar = () => {
    return(
        <>
                    <div className="left-side-top-wrapper">
                        <div className="hero-logo">
                            <a href=""><h2>LMS</h2></a>
                            
                        </div>
                        <div className="social-icon">
                            <span><a href=""><i class="fa-brands fa-facebook-f"></i></a></span>
                            <span><a href=""><i class="fa-brands fa-twitter"></i></a></span>
                            <span><a href=""><i class="fa-brands fa-google"></i></a></span>
                            <span><a href=""><i class="fa-brands fa-linkedin-in"></i></a></span>
                        </div>
                    </div>
                    <div className="left-side-wrapper">

                    <img src={LeftImag} />
                    <h3>Lorem Ipusum</h3>
                    <p>Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel.</p>
                    </div>

        </>
    )
}

export default LeftSidebar;
