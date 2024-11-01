const input = document.querySelector('#username');
const btn = document.querySelector('#search-button');
const card = document.querySelector('.card');
const repos_container = document.querySelector('.repos');

async function user(username) {
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const respData = await resp.json();
    return respData;
}

async function repos(username) {
    const resp = await fetch(`https://api.github.com/users/${username}/repos`);
    const respData = await resp.json();
    return respData;
}

async function add_repo(username) {
    const reposData = await repos(username);
    repos_container.innerHTML = reposData.map(repo => {
        return `
            <div class="card glow">  <!-- Add glow class here for each repo card -->
                <h2>${repo.name}</h2>
                <a href="${repo.clone_url}" target="_blank">See more on GitHub ></a>
            </div>
        `;
    }).join('');
}

btn.addEventListener('click', async () => {
    const input_val = input.value.trim(); 
    if (input_val === "") {
        alert('Please enter a username!'); 
        return; 
    }

    const search_result = await user(input_val);

    if (!search_result.login) {
        alert('No user found!');
        card.classList.add('hidden'); 
        repos_container.classList.add('hidden'); 
    } else {
        card.innerHTML = `
            <div class="avatar">
                <img src="${search_result.avatar_url}" alt="">
            </div>
            <div class="info">
                <h2>${search_result.name}</h2>
                <p>${search_result.login}<p>
                <h5>${search_result.bio ? search_result.bio : "No bio available."}</h5>
            </div>

            <div class="website">
                <a href="${search_result.blog}" target="_blank">
                    <span>${search_result.blog ? search_result.blog : "website not available."}</span>
                </a>
            </div>
            
            <div class="follow-info">
                    <div class="single">
                        <span><i class="fas fa-user-friends"></i> &nbsp; Followers : </span>
                        <span>${search_result.followers}</span>
                    </div>

                    <div class="single">
                        <span><i class="fas fa-user-plus"></i> &nbsp; Following : </span>
                        <span>${search_result.following}</span>
                    </div>

                    <div class="single">
                        <span><i class="fas fa-code-branch"></i> &nbsp; Repository : </span>
                        <span>${search_result.public_repos}</span>
                    </div>

                    <div class="single">
                        <span><i class="fas fa-map-marker-alt"></i> &nbsp; Location : </span>
                        <span>${search_result.location || "Unavailable"}</span>
                    </div>
            </div>
            <a href="${search_result.html_url}" target="_blank">Check out the GitHub Profile ></a>
        `;

        card.classList.remove('hidden'); 
        card.classList.add('glow'); 

        await add_repo(input_val); 
        repos_container.classList.remove('hidden'); 
    }
});

const bubbleBackground = document.querySelector('.bubble-background');

const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  bubbleBackground.append(ball); 
}

balls.forEach((el, i) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});

const mouseGradient = document.querySelector(".mouse-gradient");

    document.addEventListener("mousemove", (e) => {
      const x = e.pageX;
      const y = e.pageY;
      mouseGradient.style.left = `${x}px`;
      mouseGradient.style.top = `${y}px`;
    });


