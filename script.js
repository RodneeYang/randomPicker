const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus() //makes the text box focused ready to type

textarea.addEventListener('keyup', (e) => { //when you press down and let go it creates a tag value from what we typed in onto createTags
    createTags(e.target.value)

    if(e.key == 'Enter'){ //clears text choice box
        setTimeout(() => {
            e.target.value = ''
        }, 10)
        
        randomSelect()
    }
})

function createTags(input){
    const tags = input.split(',').filter(tag => tag.trim()  !== '').map(tag => tag.trim()) //gets rid of white space and splits via comma
    console.log(tags) //prints out on console upon inspect elemnt

    tagsEl.innerHTML = ''

    tags.forEach(tag => { // <span class="tag">Choice 1</span> this is being recreated onto the HTML for every tag you input
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect(){ //this causes the random highlighting
    const times = 30  //this determine how many times/ how long it takes for each tag to get highlighted during random select

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100);

    setTimeout(() => {
        clearInterval(interval) //this stops the random highlighting 
        
        setTimeout(() => { //this highlights the final highlighted tag
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)
    }, times * 100)

}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
    tag.classList.add('highlight')
}

function unHighlightTag(tag){
    tag.classList.remove('highlight')
}