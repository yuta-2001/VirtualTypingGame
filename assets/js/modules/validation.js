export const validation = (name, email) => {
    const namePattern = /^[a-zA-Z\s]+$/; 
    const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

    if (name === '' || email === '') {
        alert('Please enter your name and email');
        return false;
    }

    if (!namePattern.test(name)) {
        alert('Please enter a valid name');
        return false;
    }

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email');
        return false;
    }

    return true;
}