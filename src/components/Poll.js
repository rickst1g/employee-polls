import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';

export default function Poll() {
    const [optionOneText, setOptionOneText] = useState('');
    const [optionTwoText, setOptionTwoText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(optionOneText, optionTwoText)).then(() =>
            navigate('/')
        );
    };

    const disabled = !optionOneText.trim() || !optionTwoText.trim();

    const questionLeftOptionOne = 150 - optionOneText.length;
    const questionLeftOptionTwo = 150 - optionTwoText.length;

    return (
        <div className="center">
            <form onSubmit={handleSubmit}>
                <div className="center">
                    <div className="h3-font">Would You Rather</div>
                    <div className="h6-font">Create Your Own Poll</div>
                    <div className="h5-font">First Option</div>
                </div>
                <input
                    type="text" 
                    maxLength={150} 
                    size="60"
                    placeholder="Option One"
                    value={optionOneText}
                    onChange={(e) => setOptionOneText(e.target.value)}
                />
                {questionLeftOptionOne <= 150 && <div className="question-length">{questionLeftOptionOne}</div>}
                <p>OR</p>
                <br />
                <div className="h5-font">Second Option</div>
                <input
                    type="text" 
                    maxLength={150} 
                    size="60"
                    placeholder="Option Two"
                    value={optionTwoText}
                    onChange={(e) => setOptionTwoText(e.target.value)}
                />
                {questionLeftOptionTwo <= 150 && <div className="question-length">{questionLeftOptionTwo}</div>}
                <button type="submit" disabled={disabled}>
                    Submit
                </button>
            </form>
        </div>
    );
}

//Reference: Udacity Chiper project - React/Redux course.