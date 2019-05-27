import React, { Component } from 'react'
import { listHighScores } from '../../actions/actions'
import './HighScores.css'

class HighScores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showing: false,
            data: null,
        };
    }

    toggleHighScores = () => {
        if (!this.state.data) {
            listHighScores()
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        data: result,
                        showing: true
                    })
                })
        } else {
            this.setState({
                showing: !this.state.showing
            })
        }
    }

    render() {
        const scores = this.state.data || [];
        return (<>
            <hr className='hr'/>
            <div className='toggleScores'>
                <button onClick={this.toggleHighScores}>
                    {this.state.showing ? 'Hide': 'Show'} higest scores
                </button>
            </div>
            <section hidden={!this.state.showing} className='highscores'>
                <h2>High Scores</h2>
                <div>
                    <div className="table">
                        <div className="tableRow">
                            <div className="tableHead"><strong>Name</strong></div>
                            <div className="tableHead"><strong>Victories</strong></div>
                        </div>
                        {scores.map((winner, index) => (
                            <div className="tableRow" key={index}>
                                <div className="tableCell">{winner.username}</div>
                                <div className="tableCell">{winner.victories}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>)
    }
}

export default HighScores;
