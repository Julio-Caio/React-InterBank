import { useState } from "react"
import { Button } from "@chakra-ui/react"
import { Offcanvas } from "react-bootstrap"
import { FaBars, FaHome, FaSignOutAlt, FaChartBar} from "react-icons/fa"
import './style.css'
import { Link } from "react-router-dom"

function SideBar() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <FaBars />
      </Button>

      <Offcanvas show={show}>
        <Offcanvas.Header >
          <Offcanvas.Title ><FaBars id='icon-menu' onClick={handleClose}/></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
          <div className="main-icons">
           <div className="icon-home">
                <Link to={'/'}><FaHome /> Home</Link>
           </div>
           
            <div className="icon-dashboard">
                <Link to={'/api/admin/dashboard'}><FaChartBar /> Dashboard</Link>
            </div>
          </div>

            <div className="icon-logout">
                <Link to={'/users/login'}> <FaSignOutAlt />  Sair </Link>
            </div>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;