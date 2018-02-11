import React from 'react'
import InventoryTable from './InventoryTable'

class InventoryView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      inventoryItems: []
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
            <InventoryTable {...this.props} inventoryItems={[
              {
                id: "01",
                name: "Raspberry Pi",
                description: "Mini computer",
                quantity: 2,
                owner: "MLH"
              },
              {
                id: "02",
                name: "Raspberry Pi 2",
                description: "Mini computer",
                quantity: 0,
                owner: "IEEE"
              }
            ]} />
          )
        }
      </React.Fragment>
    )
  }
}

export default InventoryView
