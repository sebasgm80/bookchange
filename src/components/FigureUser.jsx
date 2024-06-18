import "./FigureUser.css";

export const FigureUser = (user) => {
    return (
        <figure>
            <img className="userImage" src={user.user.image} alt={'user image'} />
            <figcaption className="figcaption">
            <h4 className="userName">Nombre: {user.user.user}</h4>
            <h4 className="userEmail">Email: {user.user.email}</h4>
            <h4 className="userBookoins">Bookoins: {user.user.bookCoins}</h4>
            </figcaption>
        </figure>
    )
}
