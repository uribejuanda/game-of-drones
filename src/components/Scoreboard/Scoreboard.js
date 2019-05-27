import React from 'react';
import PropTypes from 'prop-types'
import '../Scoreboard/Scoreboard.css'

const Scoreboard = (props) => {
    const scores = props.winnerBattles
    return (
        <>
            <section className='scoreboard'>
                <h3>Scores</h3>
                <div className='scores'>
                    <div className="table">
                        <div className="tableRow">
                            <div className="tableHead"><strong>Round</strong></div>
                            <div className="tableHead"><strong>Winner</strong></div>
                        </div>
                        {scores.map((winner, index) => (
                            <div className="tableRow" key={index}>
                                <div className="tableCell">{index + 1}</div>
                                <div className="tableCell">{winner}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    )
}

Scoreboard.propTypes = {
    winnerBattles: PropTypes.array.isRequired
}

export default Scoreboard;
