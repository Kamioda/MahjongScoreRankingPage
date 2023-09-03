const CheckSignIn = Lang => {
    const SignInPath = `/${Lang}/signin`;
    const token = sessionStorage.getItem('token');
    if (token == null) {
        location.href = SignInPath;
        return Promise.resolve(null);
    }
    return fetch('/api/account', {
        headers: {
            Authorization: sessionStorage.getItem('token'),
        },
    }).then(result => {
        if (result.status === 200) return result.json();
        location.href = SignInPath;
        return null;
    });
};

export default CheckSignIn;
