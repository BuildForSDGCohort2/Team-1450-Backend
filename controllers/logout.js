const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        status: 'success',
        data: 'loged out successfully'
    });

    return;
};

export default logout;