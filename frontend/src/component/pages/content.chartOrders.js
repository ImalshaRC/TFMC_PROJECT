import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import axios from 'axios';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChangeData = this.onChangeData.bind(this);

    this.state = {
      data : [],
      active : 0,
      complete : 0,
      deliver : 0,
      reject : 0
    };
  }

  componentDidMount() {

    axios.get('http://localhost:5000/order/active')
      .then((response) => {
          this.setState({
            active: response.data.length
        })
        console.log(this.state.active)
      })
    
    axios.get('http://localhost:5000/order/complete')
      .then((response) => {
          this.setState({
            complete: response.data.length
        })
        console.log(this.state.complete)
      })

    axios.get('http://localhost:5000/order/deliver')
      .then((response) => {
          this.setState({
            deliver: response.data.length
        })
        console.log(this.state.deliver)
      })

    axios.get('http://localhost:5000/order/reject')
      .then((response) => {
          this.setState({
            reject: response.data.length
        })
        console.log(this.state.reject)
      })
      
  }

  onChangeData() {
    this.setState({
        data : [
            { orderType: 'Active', numOfOrders: this.state.active}
        ]
    })
  }

  render() {

    return (
      <Paper>
        <Chart
          data={[
            {orderType: 'Active', numOfOrders: this.state.active},
            {orderType: 'Complete', numOfOrders: this.state.complete},
            {orderType: 'Deliver', numOfOrders: this.state.deliver},
            {orderType: 'Reject', numOfOrders: this.state.reject}
        ]}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="numOfOrders"
            argumentField="orderType"
          />
          <Title text="Number Of Orders" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}