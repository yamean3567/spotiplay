const DisplayLeaderboard = (props) => {
    return (
        <div>
            {props.leaders.map((data, i) => (
                <div key={i}>
                    {i+1}. {data.email}
                </div>
            ))
            }
        </div>
    );
}

export default DisplayLeaderboard