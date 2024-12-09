import imageSrc from '../assets/login_page.png'; // Adjust the path to your image file

export default function RegisterImg({ props }) {
    return (
        <div>
            <img 
                src={imageSrc} 
                alt="Register" 
                style={{ width: '100%', height: 'auto' }} // Optional: Add styling
            />
        </div>
    );
}
