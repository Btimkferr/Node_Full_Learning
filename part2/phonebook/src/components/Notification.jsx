const Notification = ({message,positive}) =>{
    const notificationStyle = {
        color: 'green',
        fontSize: 20,
        background: '#aaaaaa',
        borderStyle: 'solid',
        borderRadius: 5,
        padding:10,
        marginBottom:10

    }

    if (message === null){
        return(null)
    }
    
    if(positive){
        notificationStyle.color= 'green';
    }else{
        notificationStyle.color='red'
    }
    return (
        <div style={notificationStyle}>
            <p>{message}</p>
        </div>
    )
}

export default Notification