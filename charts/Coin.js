import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Thumbnail,
  Spinner,
  View
} from "native-base";
import { LineChart } from "react-native-svg-charts";
import { PropTypes } from "prop-types";
import Axios from 'axios'


class Coin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trades: [],
      loading: true,
      percent: null,
      price: null,
      error: null,
      
      
    };
  }

  componentWillMount() {
   
      this.fetchKline();

    
  }

  fetchKline() {
    const { baseAsset, quoteAsset, interval } = this.props;

    fetch(
      `https://api.binance.com/api/v1/klines?symbol=${baseAsset.toUpperCase()}${quoteAsset.toUpperCase()}&interval=${interval}&limit=50`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        const trades = resp.map(interval => parseFloat(interval[1]));
        console.log('This is the Trade '+trades);
        const firstTrade = trades[0];
        // console.log("first trades", firstTrade);
        const lastTrade = trades.slice(-1)[0];
        // console.log("last trades", lastTrade);
        const percent = (((lastTrade - firstTrade) / firstTrade) * 100).toFixed(
          2
        );

        this.setState({
          loading: false,
          trades: trades,
          percent: percent,
          price: lastTrade
        });
      })
      .catch(err => {
        console.log(err);

        this.setState({
          error: true
        });
      });




  
  }





  chooseStyle() {
    const { percent } = this.state;

    if (parseFloat(percent) < 0) {
      return styles.priceDown;
    }

    return styles.priceUp;
  }

  render() {
   
    const { loading, trades, percent, price, error } = this.state;
    const { baseAsset, quoteAsset, interval, rank } = this.props;
    
    // console.log('Name',baseAsset)

    const style = this.chooseStyle();

    const cardHeader = (
      <CardItem style={{ backgroundColor: "#282c34" }}>
        {/* <Left>
          {/* <Text style={{ fontSize: 30, marginRight: 20 }}>{rank}</Text>
        </Left> */}
        <Left>
          <Thumbnail
            source={{
              uri: `https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/${baseAsset}.png`
            }}
          />
          <Body>
            <Text style={{ color: "#FFF", fontWeight: "800" }}>
              {baseAsset.toUpperCase()}/{quoteAsset.toUpperCase()}
            </Text>
            <Text note>{interval}</Text>
          </Body>
        </Left>
      </CardItem>
    );

    let cardBody = <Spinner />; // Loading State
    let cardFooter = false;

    if (error) {
      cardBody = <Text>Error fetching history, please try again.</Text>;
    } else if (!loading) {
      cardBody = (
        <View style={styles.view}>
          <LineChart
            data={trades}
            style={styles.chart}
            svg={{ stroke: style.color, strokeWidth: 3 }}
          />
        </View>
      );

      cardFooter = (
        <CardItem footer style={{ backgroundColor: "#282c34" }}>
          <Left>
            <Text style={style}>{percent}%</Text>
          </Left>
          <Body />
          <Right>
            <Text style={style}>${price.toLocaleString("en-us")}</Text>
          </Right>
        </CardItem>
      );
    }

    

    return (
      <Card style={{ backgroundColor: "#282c34" }}>
        {cardHeader}
        <CardItem style={{ backgroundColor: "#282c34" }}>{cardBody}</CardItem>
        {cardFooter}
      </Card>
    );
  


  

  }
}

export default Coin;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: 75,
    backgroundColor: "#282c34"
  },
  chart: {
    height: 75,
    backgroundColor: "#282c34"
  },
  priceUp: {
    color: "rgb(0,153,51)"
    // color: "#ed6ac3"
  },
  priceDown: {
    // color: 'rgb(204,51,51)',
    color: "#ed6ac3"
  }
});

Coin.propTypes = {
  baseAsset: PropTypes.string,
  quoteAsset: PropTypes.string,
  interval: PropTypes.string
};
