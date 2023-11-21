document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    form.addEventListener('submit', fetchAndPost);
});

function fetchAndPost(event){
    event.preventDefault(); 

    const post = document.querySelector('.post');
    while(post.firstChild){
    post.removeChild(post.firstChild);
    }
    // reference https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript

    const username= document.querySelector('#searchName').value.trim();
    fetch (`https://api.github.com/users/${username}/repos`)

    .then ((response)=>{
        if (!response.ok) throw new Error('Data request failed');
        return response.json();
    })


    .then ((body)=>{
        if (body.length > 0) {
            for(let i=0; i< body.length; i++){
                const repo = body[i];
                const eachRepo = `
                    <li class="repo__li">
                    <p class="repo__name"> <a class="repo__link" href='https://www.github.com/${repo.full_name}' target="_blank"> ${repo.name} </a></p>
                    <img class="repo__pic" src='${repo.owner.avatar_url}'> 
                    <p class="repo__text">Watchers: ${repo.watchers}</p>
                    <p class="repo__text">Open Issues: ${repo.open_issues}</p>
                    </li>`;
                    const repoElement = document.createElement('div');
                    repoElement.classList.add('repo');
                    repoElement.innerHTML = eachRepo;
                    const post = document.querySelector('.post');
                    post.appendChild(repoElement);
            }
        } else {
            const noRepo = document.createElement('p');
            noRepo.classList.add('message');
            noRepo.innerHTML = `No repos for ${username}, please try another username`;
            const post = document.querySelector('.post');
            post.appendChild(noRepo);
        }

    })
    .catch ((err)=>{
        console.error('Unable to fetch:', err);
    });
}


