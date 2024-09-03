document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const resultText = document.getElementById('result-text');
    const copyButton = document.getElementById('copy-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // URL with user input
        const apiUrl = `https://markdevs-api.onrender.com/api/v2/appstate?e=${encodeURIComponent(email)}&p=${encodeURIComponent(password)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Convert the data to a string and display it
                const jsonData = JSON.stringify(data, null, 2);
                resultText.textContent = jsonData;
                copyButton.disabled = false; // Enable the copy button
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultText.textContent = 'Failed to load data.';
                copyButton.disabled = true; // Disable the copy button if there's an error
            });
    });

    copyButton.addEventListener('click', function() {
        const textToCopy = resultText.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                copyButton.textContent = 'Copied'; // Change button text to "Copied"
                setTimeout(() => {
                    copyButton.textContent = 'Copy'; // Change button text back to "Copy" after 3 seconds
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });
});

function handleRightClick(event) {
    event.preventDefault();
    
    location.reload();
}

document.addEventListener('contextmenu', handleRightClick);
