import React, { Component } from 'react';
import styles from './styles/RunePath.module.scss';

class RunePath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsSpent: 0,
      pointsAvailable: 6,
      talentPathOne: {
        runeOne: false,
        runeTwo: false,
        runeThree: false,
        runeFour: false,
      },
      talentPathTwo: {
        runeOne: false,
        runeTwo: false,
        runeThree: false,
        runeFour: false,
      },
    };
  }

  translateNumber(num){
    switch(num){
      case 1:
        return "One";
      case 2:
        return "Two";
      case 3:
        return "Three";
      case 4:
        return "Four";
      default:
        return "";
    }
  };

  activateRuneHandler(talentPath, rune){
    let selectedPath = `talentPath${this.translateNumber(talentPath)}`
    let selectedRune = `rune${this.translateNumber(rune)}`;
    let previousRune = `rune${this.translateNumber(rune-1)}`;
    // Can't go more than 6
    if (this.state.pointsAvailable === this.state.pointsSpent){
      return null;
    }
    // If it's the first rune in either path
    if (rune === 1 && !this.state[selectedPath][selectedRune]){
      this.setState(
        {
          pointsSpent: this.state.pointsSpent + 1,
          [selectedPath]: {...this.state[selectedPath], [selectedRune]: true}
        }
      );
    // If anything other rune in either path, as long as previous rune is active
    } else if (rune !== 1 && !this.state[selectedPath][selectedRune] && this.state[selectedPath][previousRune]){
      this.setState(
        {
          pointsSpent: this.state.pointsSpent + 1,
          [selectedPath]: {...this.state[selectedPath], [selectedRune]: true}
        }
      );
    };
  };

  deactivateRuneHandler(talentPath, rune){
    let selectedPath = `talentPath${this.translateNumber(talentPath)}`
    let selectedRune = `rune${this.translateNumber(rune)}`;
    // Don't go below zero
    if (this.state.pointsSpent === 0){
      return null;
    }
    if (rune === 4 && this.state[selectedPath][selectedRune]){
      this.setState(
        {
          pointsSpent: this.state.pointsSpent - 1,
          [selectedPath]: {...this.state[selectedPath], [selectedRune]: false}
        }
      );
    // If any other rune that is active
    } else if (this.state[selectedPath][selectedRune]){
      let updatedRunes = {};
      for (let i = rune; i <= 4; i++){
        if (this.state[selectedPath]["rune"+this.translateNumber(i)]){
          updatedRunes["rune"+this.translateNumber(i)] = false;
        }
      };
      this.setState(
        {
          pointsSpent: this.state.pointsSpent - (Object.keys(updatedRunes).length),
          [selectedPath]: {...this.state[selectedPath], ...updatedRunes}
        }
      );
    }
  }

  render() {
    let runeTreeOne = Object.keys(this.state.talentPathOne).map((key, idx) => {
      let specificRune = 'pathOne-' + key;
      if (idx < 3) {
        return (
          <span key={idx}>
            <div
              onClick={() => this.activateRuneHandler(1,idx+1)}
              onContextMenu={(e)=>{e.preventDefault(); this.deactivateRuneHandler(1,idx+1)}}
              className={`${this.state.talentPathOne[key] ? styles["active"] : null } ${styles[specificRune]} ${styles['rune']}`}
            ></div>
            <div className={styles['progress-line']}></div>
          </span>
        )
      } else {
        return (
          <div
            onClick={() =>this.activateRuneHandler(1,idx+1)}
            onContextMenu={(e)=>{e.preventDefault(); this.deactivateRuneHandler(1,idx+1)}}
            key={idx+1}
            className={`${this.state.talentPathOne[key] ? styles["active"] : null } ${styles[specificRune]} ${styles['rune']}`}
          ></div>
        )
      }
    });

    let runeTreeTwo = Object.keys(this.state.talentPathTwo).map((key, idx) => {
      let specificRune = 'pathTwo-' + key;
      if (idx < 3) {
        return (
          <span key={idx}>
            <div
              onClick={() =>this.activateRuneHandler(2,idx+1)}
              onContextMenu={(e)=>{e.preventDefault(); this.deactivateRuneHandler(2,idx+1)}}
              className={`${this.state.talentPathTwo[key] ? styles["active"] : null } ${styles[specificRune]} ${styles['rune']}`}
            ></div>
            <div className={styles['progress-line']}></div>
          </span>
        )
      } else {
        return (
          <div
            onClick={() =>this.activateRuneHandler(2,idx+1)}
            onContextMenu={(e)=>{e.preventDefault(); this.deactivateRuneHandler(2,idx+1)}}
            key={idx+1}
            className={`${this.state.talentPathTwo[key] ? styles["active"] : null } ${styles[specificRune]} ${styles['rune']}`}
          ></div>
        )
      }
    });

    return (
      <div className={styles['bg']}>
        <div className={styles['tree-container']}>
          <h1 className={styles['title']}>TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <h2 className={`${styles['path-title']}`}>Talent Path 1</h2>
                </td>
                <td>
                  {runeTreeOne}
                </td>
                <td rowSpan='2'>
                  <h2 className={styles['points']}>
                    {this.state.pointsSpent} / {this.state.pointsAvailable}
                    <br />
                    <span className={styles['points-spent']}>Points Spent</span>
                  </h2>
                </td>
              </tr>
              <tr>
                <td>
                  <h2 className={`${styles['path-title']}`}>Talent Path 2</h2>
                </td>
                <td>
                  {runeTreeTwo}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

export default RunePath;