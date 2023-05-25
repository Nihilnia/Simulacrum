export default GetUser(props){

    fetch(`https://api.github.com/users/${props.userName}`)
    .then(resp => resp.json())
    .then(data => )

    return
}