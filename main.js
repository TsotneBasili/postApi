const postsDiv = document.querySelector('#posts')
const singlePost = document.querySelector('.main_section');
const next = document.createElement('button')
const previous = document.createElement('button')

const starSOlid = `<i class="fa-solid fa-star"></i>`;
const starNormal = `<i class="fa-regular fa-star"></i>`;



const currentPage = 0;



function fetchFunction(page) {
    const productPerPage = 10;
    postsDiv.innerHTML = '';
    fetch(`https://dummyjson.com/posts?limit=${productPerPage}&skip=${page * productPerPage}`)
        .then(response => response.json())
        // .then(console.log)
        .then(data => {
            data.posts.forEach(post => {
                const postDiv = document.createElement('article');
                postDiv.innerHTML = (`
                        
                        <article class="article_width">
                            <div class="spinner-border mx-auto" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <img id="backgroundImg" src="./images.jpg" alt="">

                            <h2 class="h2">${post.title}</h2>
                            <p class="p">${post.body}</p>
                            <p class="p">${post.reactions}</p>
                            <section>
                                <p class="p">${post.tags}</p>
                                <p class="p">${post.views}</p>
                            </section>
                        </article>
                    `)

                    postDiv.querySelector(`img`).addEventListener('load', () => {
                        postDiv.querySelector('.spinner-border').remove()
                    })
                
                    postDiv.addEventListener('click', () => {
                        
                        // window.location.href = `post.html?post.id=${post.id}`

                        fetch(`https://dummyjson.com/posts/${post.id}`) 
                            .then(response => response.json())
                            .then((singlePost1) => {  
                                backButton = document.createElement('button')
                                backButton.classList.add('.buttons')
                                backButton.addEventListener("click", () => {
                                    fetchFunction(page)
                                }) 
                                                     
                                singlePost.innerHTML = (`
                                    
                                    <article class="article_width">
                                        <h2 class="h2">${singlePost1.title}</h2>
                                        <p class="p">${singlePost1.body}</p>
                                        <p class="p">${singlePost1.reactions}</p>
                                        <section>
                                            <p class="p">${singlePost1.tags}</p>
                                            // <p class="p">${singlePost1.views}</p>
                                        </section>
                                    </article>
                                
                                    `)
                                singlePost.appendChild(backButton);
                            })
                    })   
                

                postsDiv.appendChild(postDiv);
                

            })
           
        
            if (page != 0){
                previous.innerText = ('previous')
                postsDiv.appendChild(previous)
                previous.addEventListener('click', () => {
                    page -= 1
                    postsDiv.removeChild(previous)
                    fetchFunction(page)
                })    
            }



            if (page === Math.ceil(data.total / productPerPage)){
                postsDiv.removeChild(next)
            } else {
                postsDiv.appendChild(next)
            }
            next.innerText = ('Next')
            next.addEventListener('click', () => {
                page += 1
                postsDiv.removeChild(next)

                
                fetchFunction(page)
            })

        

        
        
            
        }) 

    
}

next.classList.add('.buttons')
previous.classList.add('.buttons')


fetchFunction(currentPage)