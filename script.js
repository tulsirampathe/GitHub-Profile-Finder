const btn = document.querySelector('#btn');
const img = document.querySelector('.img');
const name = document.querySelector('.name');
const bio = document.querySelector('.bio');
const created_at = document.querySelector('.created_at');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const public_repos = document.querySelector('.public_repos');
const url = document.querySelector('.url');
const card = document.querySelector('.card');
const errorMessage = document.querySelector('.error-message');

const username = document.querySelector('#username');

btn.addEventListener('click', () => {
    const requestUrl = `https://api.github.com/users/${username.value}`;
    console.log(requestUrl);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const data = JSON.parse(this.responseText);
            if (data.message === "Not Found") {
                card.style.display = 'none';
                errorMessage.textContent = "User Not Found. Please try another username.";
            } else {
                card.style.display = 'block';
                errorMessage.textContent = '';
                img.src = data.avatar_url;
                name.textContent = `${data.name || 'No Name Available'}`;
                bio.textContent = data.bio || 'No bio available';
                created_at.textContent = new Date(data.created_at).toDateString();
                followers.textContent = data.followers;
                following.textContent = data.following;
                public_repos.textContent = data.public_repos;
                url.href = data.html_url;
            }
        }
    };

    xhr.send();
});