import React from "react";
import QuizOptions from "./QuizOptions";

const QuizQuestion = props => {
    const { question, correct, wrong, point } = props.quiz;
    const options = [...correct, ...wrong];
    options.sort(() => 0.5 - Math.random());

<<<<<<< HEAD
	return (
		<div className='card mb-4'>
			<div className='card-body'>
				<h5 className='card-title'>{question}</h5>
				<QuizOptions
					options={options}
					correct={correct}
					onUpdateScore={props.onUpdateScore}
					point={point}
					isLastQuestion={props.isLastQuestion}
				/>
			</div>
		</div>
	)
}
=======
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{question}</h5>
                <QuizOptions
                    options={options}
                    correct={correct}
                    onUpdateScore={props.onUpdateScore}
                    point={point}
                />
            </div>
        </div>
    );
};
>>>>>>> master

export default QuizQuestion;
