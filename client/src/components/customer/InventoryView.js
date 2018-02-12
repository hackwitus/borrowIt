import React from 'react'
import InventoryTable from './InventoryTable'

class InventoryView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false
    }

    this.updatePredicate = this.updatePredicate.bind(this)
  }

  componentDidMount() {
    this.updatePredicate()
    window.addEventListener("resize", this.updatePredicate)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate)
  }
  updatePredicate() {
    this.setState({ isMobile: window.innerWidth < 576})
  }
  render() {
    return (
      <React.Fragment>
        {
          this.state.isMobile ? (
            <p className="text-danger">Replace me with a mobile component</p>
          ) : (
            <InventoryTable {...this.props} />
          )
        }
      </React.Fragment>
    )
  }
}

export default InventoryView
