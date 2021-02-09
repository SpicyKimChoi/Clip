import styled from 'styled-components';

export const Note = styled.div`
    position: relative;
    margin-top: 50px;
    background-color: #FFFFA5;
    min-width: 180px;
    width: 30%;
    max-width: 380px;
    margin-right: auto;
    margin-left: auto;
    padding: 20px;
    -webkit-transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
    -o-transform: rotate(-1deg);
    -ms-transform: rotate(-1deg);
    transform: rotate(-1deg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`
export const Tape = styled.div`
    text-align: relative;
    background-color: hsla(0,0%,100%,.3);
    box-shadow: inset 0 0 1em .5em hsla(0,0%,100%,.1);
    height: 2em;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    min-width: 100px;
    transform: rotate(1deg);
    width: 40%;
    -webkit-filter: drop-shadow(0 1px 0.7px hsla(0,0%,0%,.3));
`

export const NoteList = styled.div`
    li {
    list-style-type: none;
    &:before {
        content: '-';
        margin-right: 0.75em;
        margin-left: -1.125em;;
    }
  }
`