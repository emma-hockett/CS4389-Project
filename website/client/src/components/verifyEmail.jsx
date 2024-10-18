import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/verify-email?token=${token}`);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error('Error verifying email:', error);
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div>
            <h2>Email Verification</h2>
            {token ? <p>Verifying your email...</p> : <p>Invalid token</p>}
        </div>
    );
};

export default VerifyEmail;