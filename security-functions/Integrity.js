const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const app = express();

app.use(express.json());

// Simulated user roles (for demonstration)
const users = {
    'admin': { role: 'Admin' },
    'manager': { role: 'Manager' },
    'employee': { role: 'Employee' },
};

// Middleware for checking user permissions
const checkPermissions = (role, action) => {
    return (req, res, next) => {
        // Simple role check (this should be more robust in a real application)
        if ((role === 'Admin') || (role === 'Manager' && action === 'write')) {
            return next();
        }
        return res.status(403).json({ error: 'Access denied' });
    };
};

// Log changes to a file
const logChange = (changeDetails) => {
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(changeDetails)}\n`;
    fs.appendFileSync('changes.log', logEntry);
};

// Endpoint for updating customer data
app.post('/updateCustomer', [
    body('customerId').isInt().withMessage('Customer ID must be an integer.'),
    body('email').isEmail().withMessage('Email must be valid.'),
    body('phone').optional().isMobilePhone().withMessage('Phone number is not valid.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customerId, email, phone } = req.body;
    const userId = req.headers['user-id']; // Assume user ID is passed in headers
    const user = users[userId];

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    // Check permissions based on user role
    if (user.role === 'Employee') {
        return res.status(403).json({ error: 'Employees cannot update customer data.' });
    }

    // Log the change
    logChange({
        userId,
        customerId,
        email,
        phone,
        action: 'update'
    });

    res.status(200).json({ message: 'Customer updated successfully' });
});

// Endpoint for customer self-service updates
app.post('/customer/update', [
    body('customerId').isInt().withMessage('Customer ID must be an integer.'),
    body('email').isEmail().withMessage('Email must be valid.'),
    body('phone').optional().isMobilePhone().withMessage('Phone number is not valid.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customerId, email, phone } = req.body;

    // Here you would verify the customer's identity before allowing updates
    // For simplicity, we assume the customer is verified

    // Log the change
    logChange({
        customerId,
        email,
        phone,
        action: 'customer_update'
    });

    res.status(200).json({ message: 'Customer data updated successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});