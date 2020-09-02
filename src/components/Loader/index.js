import React from "react"
import PropTypes from "prop-types"
import anime from "animejs"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Logo from 'components/Icons/LogoStroked';
import { Container } from "./styled"

class LoaderComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      _isShowing: false,
    }

    this.containerRef = React.createRef()
    this.logoRef = React.createRef()
  }

  componentDidMount() {
    // this.logoAnim = anime({
    //   targets: this.logoRef.current,
    //   strokeDashoffset: [anime.setDashoffset, 0],
    //   easing: 'easeInOutSine',
    //   duration: 1500,
    //   direction: 'alternate',
    //   loop: true,
    //   autoplay: false,
    // });

    if (this.props.isShowing) this.show()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isShowing && this.props.isShowing) this.show()
    if (prevProps.isShowing && !this.props.isShowing) this.hide()
  }

  show() {
    this.setState({ _isShowing: true }, () => {
      // this.logoAnim.restart();
      // this.logoAnim.play();
      anime({
        targets: this.containerRef.current,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
      })
    })
  }

  hide() {
    anime({
      targets: this.containerRef.current,
      opacity: [1, 0],
      duration: 400,
      easing: "linear",
      complete: () => {
        // this.logoAnim.pause();
        this.setState({ _isShowing: false })
      },
    })
  }

  render() {
    const { _isShowing } = this.state
    const { inline, fullscreen, color, size } = this.props

    return (
      <Container
        ref={this.containerRef}
        inline={inline}
        fullscreen={fullscreen}
        isShowing={_isShowing}
      >
        <Loader
          type="TailSpin"
          color={color || "#fff"}
          height={size || 100}
          width={size || 100}
        />
      </Container>
    )
  }
}

LoaderComponent.propTypes = {
  // height: PropTypes.number,
  // width: PropTypes.number,
  // color: PropTypes.string,
  isShowing: PropTypes.bool,
  inline: PropTypes.bool,
  fullscreen: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
}

export default LoaderComponent
