import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../styles/about.css'

export default function About() {

    const listHelp =  ['customer service', 'my account', 'find a store'];

    return (
        <div className="About">
            <div>
                <h3>BECOME A MEMBER</h3>
                <p>Become a member today and get exclusive benefits</p>
            </div>
            <div>
                <h3>HELP</h3>
                <ul>
                    {listHelp.map((element, index) => (
                        <li key={index}>
                        {element}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>CONTACT</h3>
                <InstagramIcon/>
                <WhatsAppIcon/>
            </div>
        </div>
    )
}