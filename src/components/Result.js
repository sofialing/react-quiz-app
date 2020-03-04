import React from "react";

const Result = props => {
    return (
        <div className='container'>
            <h1>
                Your result on the {props.quiz} was {props.score}
            </h1>
        </div>
    );
};

export default Result;
