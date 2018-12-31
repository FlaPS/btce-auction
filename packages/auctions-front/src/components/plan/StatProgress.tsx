import React from 'react'
import {clamp} from 'ramda'
import styled from '../../styles'
import SVGLibrary from '../../styles/SVGLibrary'

export default ({value, icon}: { value: number; icon: any }) => (
    <Layout>
        {React.createElement(icon, {className: 'icon' + addPatchClass(icon)})}
        <div
            className="clipper"
            style={{
                clip:
                    value > 0.5
                        ? 'rect(auto,auto,auto,auto)'
                        : 'rect(0em, 2em, 2em, 1em)',
            }}
        >
            {value > 0.5 && <div className={'first-50'}/>}
            <div
                className="value-bar"
                style={{
                    transform: getRotationStyle(value),
                }}
            />
        </div>
    </Layout>
)

const clampValue = clamp(0, 1)

const getRotationStyle = value => 'rotate(' + 360 * clampValue(value) + 'deg)'

const addPatchClass = (icon: any) =>
    icon === SVGLibrary.Reposts
        ? ' shares'
        : icon === SVGLibrary.Followers
        ? ' followers'
        : ' comments'

const Layout = styled.div`
  margin-right: 0.4em;
  position: relative;
  padding: 0em;
  width: 2em;
  height: 2em;
  background-color: #dadada;
  border-radius: 50%;

  .icon {
    position: absolute;
    text-align: center;
    display: block;
    color: #53777a;
    z-index: 10;
  }
  .followers {
    top: 0.4em;
    left: 0.45em;
    width: 1.1em;
    height: 1.4em;
  }
  .shares {
    top: 0.525em;
    left: 0.125em;
    width: 1.75em;
    height: 0.95em;
  }
  .likes {
    top: 0.5em;
    left: 0.4em;
    width: 1.2em;
    height: 1.1em;
  }
  .comments {
    top: 0.5em;
    left: 0.4em;
    width: 1.2em;
    height: 1.1em;
  }
  .clipper {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    position: absolute;

    .first-50 {
      position: absolute;
      clip: rect(0em, 2em, 2em, 1em);
      background-color: #2a2a2a;
      border-radius: 50%;
      width: 2em;
      height: 2em;
    }
    // made as filled circle instead of ring
    .value-bar {
      position: absolute;
      clip: rect(0em, 1em, 2em, 0);
      width: 2em;
      height: 2em;
      border-radius: 50%;
      border: 1em solid #2a2a2a;

      box-sizing: border-box;
    }
  }
`
